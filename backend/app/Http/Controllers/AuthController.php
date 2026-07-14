<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
{
    $user = User::create([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => $request->input('password'),
        'role' => 'customer',
    ]);

    return response()->json([
        'message' => 'User registered successfully.',
        'user' => $user,
    ], 201);
}
}
