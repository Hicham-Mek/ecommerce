<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;

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
public function login(LoginRequest $request)
{
    if (! Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'message' => 'Invalid credentials.',
        ], 401);
    }

    // $request->session()->regenerate();

    return response()->json([
        'message' => 'Login successful.',
        'user' => Auth::user(),
    ], 200);
}
public function logout()
{
    Auth::logout();

    return response()->json([
        'message' => 'Logout successful.',
    ], 200);
}
public function user()
{
    return response()->json([
        'user' => Auth::user(),
    ]);
}
}
