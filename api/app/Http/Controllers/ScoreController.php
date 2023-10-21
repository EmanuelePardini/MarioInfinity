<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Rank;

class ScoreController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'id_user' => 'required|exists:users,id',
            'score' => 'required|integer',
        ]);

        $score = Rank::create([
            'id_user' => $request->input('id_user'),
            'score' => $request->input('score'),
        ]);

        return response()->json(['score' => $score, 'message' => 'Score inserted successfully'], 201);
    }

    public function topScores()
    {
        $topScores = DB::table('ranks')
            ->select('users.username', DB::raw('MAX(ranks.score) as max_score'))
            ->join('users', 'ranks.id_user', '=', 'users.id')
            ->groupBy('users.id')
            ->orderBy('max_score', 'desc')
            ->take(10)
            ->get();
    
        return response()->json(['top_scores' => $topScores], 200);
    }
    
    
}
