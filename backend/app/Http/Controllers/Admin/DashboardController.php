<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $monthlyRevenue = Order::selectRaw("
        MONTH(created_at) as month,
        SUM(total) as revenue
    ")
            ->whereYear('created_at', now()->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $ordersByStatus = Order::selectRaw("
        status,
        COUNT(*) as total
    ")
            ->groupBy('status')
            ->get();
        return response()->json([

            "statistics" => [

                "users" => User::count(),

                "products" => Product::count(),

                "categories" => Category::count(),

                "orders" => Order::count(),

                "revenue" => Order::where('status', 'delivered')
                    ->sum('total'),

            ],

            "latest_orders" => Order::with('user')
                ->latest()
                ->take(5)
                ->get(),

            "low_stock_products" => Product::where('stock', '<=', 5)
                ->latest()
                ->take(5)
                ->get(),

            "recent_users" => User::latest()
                ->take(5)
                ->get(),
            "monthly_revenue" => $monthlyRevenue,

            "orders_by_status" => $ordersByStatus,

        ]);

    }

}
