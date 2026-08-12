<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $cart = $request->user()
            ->cart()
            ->with('items')
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json([
                'message' => 'Your cart is empty.',
            ], 400);
        }

        try {
            $order = DB::transaction(function () use ($cart, $request) {
                $total = 0;
                $orderItems = [];

                foreach ($cart->items as $cartItem) {
                    // Lock the product row to prevent concurrent stock modifications
                    $product = Product::lockForUpdate()->find($cartItem->product_id);

                    // Validate product still exists and is active
                    if (!$product || !$product->is_active) {
                        throw new \Exception(
                            "Product \"{$cartItem->product_id}\" is no longer available."
                        );
                    }

                    // Validate quantity is a positive integer
                    if ($cartItem->quantity < 1) {
                        throw new \Exception(
                            "Invalid quantity for \"{$product->name}\"."
                        );
                    }

                    // Validate sufficient stock
                    if ($product->stock < $cartItem->quantity) {
                        throw new \Exception(
                            "Insufficient stock for \"{$product->name}\". Available: {$product->stock}, requested: {$cartItem->quantity}."
                        );
                    }

                    // Deduct stock (the lockForUpdate prevents race conditions)
                    $product->decrement('stock', $cartItem->quantity);

                    // Use the database price, never trust the client
                    $orderItems[] = [
                        'product_id' => $product->id,
                        'quantity' => $cartItem->quantity,
                        'price' => $product->price,
                    ];

                    $total += $cartItem->quantity * $product->price;
                }

                $order = Order::create([
                    'user_id' => $request->user()->id,
                    'total' => $total,
                    'payment_method' => 'cash_on_delivery',
                    'status' => 'pending',
                ]);

                $order->items()->createMany($orderItems);

                // Clear cart only after everything succeeded
                $cart->items()->delete();

                return $order;
            });
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }

        return response()->json([
            'message' => 'Order placed successfully.',
            'order' => $order->load('items.product'),
        ], 201);
    }

    public function index()
    {
        return Order::with('items.product')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();
    }

    public function show(Order $order)
    {
        abort_if($order->user_id != Auth::id(), 403);

        return $order->load('items.product');
    }
}

