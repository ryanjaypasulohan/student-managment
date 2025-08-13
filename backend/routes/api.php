<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'environment' => config('app.env'),
        'version' => '1.0.0',
        'database' => 'connected'
    ]);
});

Route::get('/status', function () {
    return response()->json([
        'message' => 'Laravel API is running',
        'time' => now()->toISOString()
    ]);
});

Route::post('/greet', function (Request $request) {
    $name = $request->input('name', 'Guest');

    return response()->json([
        'greeting' => "Hello, $name!",
        'timestamp' => now()->toISOString()
    ]);
});



    