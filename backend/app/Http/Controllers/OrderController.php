<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // 1. Import the Auth Facade
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $cart = $request->user()
            ->cart()
            ->with('items.product')
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json([
                'message' => 'Your cart is empty.',
            ], 400);
        }

        $order = DB::transaction(function () use ($cart, $request) {
            $total = $cart->items->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });

            $order = Order::create([
                'user_id' => $request->user()->id,
                'total' => $total,
                'payment_method' => 'cash_on_delivery',
                'status' => 'pending',
            ]);

            $order->items()->createMany($cart->items->map(function ($item) {
                return [
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ];
            })->toArray());

            $cart->items()->delete();

            return $order;
        });

        return response()->json([
            'message' => 'Order placed successfully.',
            'order' => $order->load('items.product'),
        ], 201);
    }

    public function index()
    {
        return Order::with('items.product')
            ->where('user_id', Auth::id()) // 2. Use Auth::id()
            ->latest()
            ->get();
    }

    public function show(Order $order)
    {
        abort_if($order->user_id != Auth::id(), 403); // 2. Use Auth::id()

        return $order->load('items.product');
    }
}
