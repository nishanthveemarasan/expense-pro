<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;

class AuthController extends Controller
{
    protected $result;
    public function register(AuthRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['email'])
        ]);
        $user->categories()->syncWithoutDetaching([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        if (Auth::attempt([
            'email' => $data['email'],
            'password' => $data['email']
        ])) {
            $user  = Auth::user();
            $token = $user->createToken('api-application')->accessToken;
            Cache::put('expense_token', $token, now()->addMinutes(180));
            return redirect()->intended('/');
        } else {
            session()->flash('error', ' Authentication Failed!! try again with correct details');
            return redirect()->back();
        }
    }

    public function auth(Request $request)
    {

        $request->validate([
            'code' => 'required',
        ]);

        if (Auth::attempt([
            'email' => $request['code'],
            'password' => $request['code']
        ])) {
            $user  = Auth::user();
            $token = $user->createToken('api-application')->accessToken;
            Cache::put('expense_token', $token, now()->addMinutes(180));
            return redirect()->intended('/');
        } else {
            session()->flash('error', ' Authentication Failed!! try again with correct details');
            return redirect()->back();
        }
    }
}
