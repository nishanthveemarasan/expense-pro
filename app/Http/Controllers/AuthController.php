<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use SebastianBergmann\Environment\Console;

class AuthController extends Controller
{
    protected $result;
    public function register(AuthRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);
        $user->categories()->syncWithoutDetaching([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        $role = Role::firstOrCreate([
            'name' => 'user',
            'guard_name' => 'api'
        ]);
        $user->assignRole($role);
        if (Auth::attempt([
            'email' => $data['email'],
            'password' => $data['password']
        ])) {
            $user  = Auth::user();
            $token = $user->createToken('api-application')->accessToken;
            return ['token' => $token];
        } else {

            return [
                'error' => 'Authentication Failed!! try again with correct details'
            ];
        }
    }

    public function auth(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt([
            'email' => $request['email'],
            'password' => $request['password']
        ])) {
            $user  = Auth::user();
            $token = $user->createToken('api-application')->accessToken;
            return ['token' => $token];
        } else {
            return [
                'error' => 'Authentication Failed!! try again with correct details'
            ];
        }
    }
}
