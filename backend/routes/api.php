<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'timestamp' => now()->toISOString(),
        'environment' => config('app.env')
    ]);
});

Route::post('/greet', function (Request $request) {
    $name = $request->input('name', 'Guest');

    return response()->json([
        'greeting' => "Hello, $name!",
    ]);
});



    