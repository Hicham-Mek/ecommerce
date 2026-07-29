<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Faker\Generator as Faker;



class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
        // Customers
        User::factory(30)->create();

        // Categories
        $categories = [
            'Electronics',
            'Fashion',
            'Gaming',
            'Home & Kitchen',
            'Beauty',
            'Sports',
            'Books',
            'Accessories',
            'Baby',
            'Grocery',
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => Str::slug($category)],
                [
                    'name' => $category,
                    'is_active' => true,
                ]
            );
        }

        // Products
        $response = Http::timeout(20)->get('https://fakestoreapi.com/products');
        $apiProducts = $response->successful() ? $response->json() : [];

        foreach ($apiProducts as $item) {
            $mappedCategory = $this->mapProductCategory($item['category'] ?? '');
            $category = Category::where('name', $mappedCategory)->first();

            if (!$category) {
                continue;
            }

            Product::create([
                'category_id' => $category->id,
                'name' => $item['title'] ?? 'Product',
                'slug' => Str::slug($item['title'] ?? 'product'),
                'description' => $item['description'] ?? fake()->paragraph(),
                'price' => (float) ($item['price'] ?? 0),
                'stock' => rand(1, 100),
                'image' => $item['image'] ?? null,
                'is_active' => true,
            ]);
        }

        Order::factory(100)->create()->each(function ($order) {

            $products = Product::inRandomOrder()
                ->take(rand(1, 5))
                ->get();

            $total = 0;

            foreach ($products as $product) {

                $qty = rand(1, 3);

                $price = $product->price;

                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'price' => $price,
                ]);

                $total += $qty * $price;
            }

            $order->update([
                'total' => $total,
            ]);
        });

    }

    private function mapProductCategory(string $category): string
    {
        $normalized = strtolower($category);

        if (str_contains($normalized, 'jewelery') || str_contains($normalized, 'men') || str_contains($normalized, 'women')) {
            return 'Fashion';
        }

        if (str_contains($normalized, 'electronics')) {
            return 'Electronics';
        }

        return 'Accessories';
    }
}
