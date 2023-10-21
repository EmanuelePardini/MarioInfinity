<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// User Registration
Route::post('/register', 'AuthController@register');

// User Login
Route::post('/login', 'AuthController@login');

// User Logout
Route::post('/logout', 'AuthController@logout');

// Score Insertion
Route::post('/scores', 'ScoreController@store');

// Top 10 Users with Highest Scores
Route::get('/ranks', 'ScoreController@topScores');
