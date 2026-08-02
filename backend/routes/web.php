<?php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'API is running',
        'status' => 200
    ]);
});

Route::get('/session-test', function () {
    session(['test' => 'ok']);

    return response()->json([
        'session' => session('test'),
    ]);
});
