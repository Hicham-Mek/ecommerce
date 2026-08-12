<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderCreationTest extends TestCase
{
    use RefreshDatabase;

    private function createAuthenticatedUser(): User
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        return $user;
    }

    private function createProductWithStock(int $stock = 10, float $price = 99.99): Product
    {
        $category = Category::factory()->create();
        return Product::factory()->create([
            'category_id' => $category->id,
            'stock' => $stock,
            'price' => $price,
            'is_active' => true,
        ]);
    }

    private function addToCart(User $user, Product $product, int $quantity): void
    {
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);
        CartItem::create([
            'cart_id' => $cart->id,
            'product_id' => $product->id,
            'quantity' => $quantity,
        ]);
    }

    // ─── Successful order ────────────────────────────────────────────

    public function test_successful_order_creates_order_and_deducts_stock(): void
    {
        $user = $this->createAuthenticatedUser();
        $product = $this->createProductWithStock(stock: 20, price: 50.00);
        $this->addToCart($user, $product, quantity: 3);

        $response = $this->postJson('/api/orders');

        $response->assertStatus(201)
            ->assertJsonPath('message', 'Order placed successfully.')
            ->assertJsonPath('order.status', 'pending')
            ->assertJsonPath('order.payment_method', 'cash_on_delivery');

        // Stock should be reduced from 20 to 17
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'stock' => 17,
        ]);

        // Order total should be calculated server-side: 3 × 50.00 = 150.00
        $order = Order::where('user_id', $user->id)->first();
        $this->assertEquals(150.00, (float) $order->total);

        // Cart should be cleared
        $this->assertDatabaseMissing('cart_items', [
            'product_id' => $product->id,
        ]);
    }

    // ─── Insufficient stock ──────────────────────────────────────────

    public function test_order_fails_when_stock_is_insufficient(): void
    {
        $user = $this->createAuthenticatedUser();
        $product = $this->createProductWithStock(stock: 2, price: 50.00);
        $this->addToCart($user, $product, quantity: 5);

        $response = $this->postJson('/api/orders');

        $response->assertStatus(422)
            ->assertJsonFragment(['message' => "Insufficient stock for \"{$product->name}\". Available: 2, requested: 5."]);

        // Stock should NOT have changed
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'stock' => 2,
        ]);

        // No order should have been created
        $this->assertDatabaseCount('orders', 0);

        // Cart should still contain the item
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 5,
        ]);
    }

    // ─── Empty cart ──────────────────────────────────────────────────

    public function test_order_fails_when_cart_is_empty(): void
    {
        $this->createAuthenticatedUser();

        $response = $this->postJson('/api/orders');

        $response->assertStatus(400)
            ->assertJsonPath('message', 'Your cart is empty.');
    }

    // ─── Inactive product ────────────────────────────────────────────

    public function test_order_fails_when_product_is_inactive(): void
    {
        $user = $this->createAuthenticatedUser();
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'stock' => 50,
            'price' => 25.00,
            'is_active' => false,
        ]);
        $this->addToCart($user, $product, quantity: 1);

        $response = $this->postJson('/api/orders');

        $response->assertStatus(422);

        // Stock should NOT have changed
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'stock' => 50,
        ]);

        // No order should have been created
        $this->assertDatabaseCount('orders', 0);
    }

    // ─── Rollback: partial stock deduction on multi-product failure ──

    public function test_stock_rolls_back_when_second_product_has_insufficient_stock(): void
    {
        $user = $this->createAuthenticatedUser();
        $product1 = $this->createProductWithStock(stock: 10, price: 30.00);
        $product2 = $this->createProductWithStock(stock: 1, price: 20.00);

        $this->addToCart($user, $product1, quantity: 2);
        $this->addToCart($user, $product2, quantity: 5); // exceeds stock

        $response = $this->postJson('/api/orders');

        $response->assertStatus(422);

        // BOTH products should retain original stock (transaction rolled back)
        $this->assertDatabaseHas('products', [
            'id' => $product1->id,
            'stock' => 10,
        ]);
        $this->assertDatabaseHas('products', [
            'id' => $product2->id,
            'stock' => 1,
        ]);

        // No order should exist
        $this->assertDatabaseCount('orders', 0);
    }

    // ─── Server-side price calculation ───────────────────────────────

    public function test_order_total_uses_database_price_not_client(): void
    {
        $user = $this->createAuthenticatedUser();
        $product = $this->createProductWithStock(stock: 10, price: 100.00);
        $this->addToCart($user, $product, quantity: 2);

        $response = $this->postJson('/api/orders');

        $response->assertStatus(201);

        $order = Order::where('user_id', $user->id)->first();
        // Total must be 2 × 100.00 = 200.00 regardless of what any client might send
        $this->assertEquals(200.00, (float) $order->total);
    }
}
