<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class AdminOrderController extends Controller
{
    public function index()
    {
        return Order::with('user')
            ->latest()
            ->paginate(10);
    }
    public function show(Order $order)
    {
        return $order->load([
            'user',
            'items.product'
        ]);
    }
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => [
                'required',
                'in:pending,processing,shipped,delivered,cancelled',
            ],
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Order updated successfully.',
            'order' => $order,
        ]);
    }
}
