<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminUserController;



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

});

Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
Route::apiResource('products', ProductController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/cart', [CartController::class, 'index']);

    Route::post('/cart', [CartController::class, 'store']);

    Route::put('/cart/{item}', [CartController::class, 'update']);

    Route::delete('/cart/{item}', [CartController::class, 'destroy']);

    Route::delete('/cart', [CartController::class, 'clear']);






    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);


    Route::apiResource('wishlist', WishlistController::class)->only(['index', 'store', 'destroy']);


    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);

});

Route::middleware([
    'auth:sanctum',
    'admin'
])->prefix('admin')->group(function () {

    // dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);
    // products
    Route::apiResource('products', ProductController::class);
    // categories
    Route::apiResource('categories', CategoryController::class);
    // orders
    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::get('/orders/{order}', [AdminOrderController::class, 'show']);
    Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus']);
    // users
    Route::get('/users', [AdminUserController::class, 'index']);
    Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole']);
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy']);


});
