<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
                Route::get('/user', [AuthController::class, 'user']);

});

Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/cart', [CartController::class, 'index']);

    Route::post('/cart', [CartController::class, 'store']);

    Route::put('/cart/{item}', [CartController::class, 'update']);

    Route::delete('/cart/{item}', [CartController::class, 'destroy']);

    Route::delete('/cart', [CartController::class, 'clear']);






    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
});
