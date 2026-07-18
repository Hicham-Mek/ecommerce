<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreCartRequest;
use App\Models\CartItem;

class CartController extends Controller
{
    public function index(Request $request)
{
    $cart = $request->user()
        ->cart()
        ->with('items.product')
        ->first();

    return response()->json(
    $cart ?? [
        'items' => [],
    ]
);
}
public function store(StoreCartRequest $request)
{
    $cart = $request->user()->cart()->firstOrCreate([]);

    $item = $cart->items()
        ->where('product_id', $request->product_id)
        ->first();

    if ($item) {
        $item->increment('quantity', $request->quantity);
    } else {
        $cart->items()->create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
        ]);
    }

    return response()->json([
        'message' => 'Product added to cart.',
    ], 201);
}
public function update(Request $request, CartItem $item)
{
    if ($item->cart->user_id !== $request->user()->id) {
        return response()->json([
            'message' => 'Unauthorized.',
        ], 403);
    }

    $request->validate([
        'quantity' => 'required|integer|min:1',
    ]);

    $item->update([
        'quantity' => $request->quantity,
    ]);

    return response()->json([
        'message' => 'Cart updated successfully.',
    ]);
}
public function destroy(Request $request, CartItem $item)
{
    if ($item->cart->user_id !== $request->user()->id) {
        return response()->json([
            'message' => 'Unauthorized.',
        ], 403);
    }

    $item->delete();

    return response()->json([
        'message' => 'Item removed from cart.',
    ]);
}
public function clear(Request $request)
{
    $cart = $request->user()->cart;

    if ($cart) {
        $cart->items()->delete();
    }

    return response()->json([
        'message' => 'Cart cleared successfully.',
    ]);
}
}
