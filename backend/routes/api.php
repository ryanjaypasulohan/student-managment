<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/greet', function (Request $request) {
    $name = $request->input('name', 'Guest');

    return response()->json([
        'greeting' => "Hello, $name!",
    ]);
});



    