<?php

namespace App\Services\Varman\Chola;

use App\Http\Resources\CholaUserResource;
use App\Mail\ActivationAwaitingEmail;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\User;
use Exception;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserService
{
    private function company(User $user)
    {
        $companyUser = CompanyUser::where('user_id', $user->id)->first();
        $company = $companyUser->company;
        return $company;
    }

    public function createChild($data)
    {
        $user = Auth::user();
        $company = $this->company($user);

        $userData = [
            'email' => isset($data['email']) ? $data['email'] : "{$data['username']}@varman.uk",
            'username' => $data['username'],
            'name' => $data['name'],
            'password' => Hash::make($data['password'])
        ];
        $child = User::create($userData);

        $role = Role::firstOrCreate([
            'name' => $data['role'],
            'guard_name' => 'api'
        ]);
        $child->assignRole($role);

        CompanyUser::create([
            'company_id' => $company->id,
            'user_id' => $child->id
        ]);

        return [
            'msg' => "User has been created Successfully!!"
        ];
    }

    public function getUser(User $user)
    {
        return new CholaUserResource($user->load(['roles:name']));
    }



    public function childList()
    {
        $user = Auth::user();
        $company = $this->company($user);
        $users = CompanyUser::where('company_id', $company->id)->with(['user', 'user.roles:name'])->paginate(10);
        return $users;
        // return $company->children()->with(['roles:name'])->paginate(10);
    }

    public function roleList()
    {
        return [
            [
                "value" => 'chola_admin',
                "name" => 'Admin',
            ],
            [
                "value" => 'chola_user',
                "name" => 'User',
            ],
        ];
    }

    public function userRole($data, User $user)
    {
        $role = Role::firstOrCreate([
            'name' => $data['role'],
            'guard_name' => 'api'
        ]);
        $user->syncRoles([$role]);
        return [
            'msg' => "User Role has been Updated Successfully!!"
        ];
    }

    public function userStatus($data, User $user)
    {
        $user->status = $data['status'];
        $user->save();
        return [
            'msg' => "User Status has been Updated Successfully!!"
        ];
    }

    public function userPassword($data, User $user)
    {
        $user->password = Hash::make($data['password']);
        $user->save();
        return [
            'msg' => "User Password has been updated Successfully!!"
        ];
    }

    public function registration($data)
    {
        $company = Company::create(['name' => $data['company']]);

        $userData = [
            'email' => $data['email'],
            'username' => $data['username'],
            'name' => $data['name'],
            'password' => Hash::make($data['password'])
        ];

        $user = User::create($userData);

        $role = Role::firstOrCreate([
            'name' => 'chola_admin',
            'guard_name' => 'api'
        ]);
        $user->assignRole($role);

        CompanyUser::create([
            'company_id' => $company->id,
            'user_id' => $user->id
        ]);
        try {
            Mail::to($userData['email'])
                ->send(new ActivationAwaitingEmail(['name' => $userData['name']]));
        } catch (Exception $e) {
        }

        dd('hi');

        return [
            'msg' => "Your Account is Created Succssfully!! you will receive an email once we Activate your account. Thanks for your patience!!"
        ];
    }

    public function login($data)
    {
        // return ['token' => '12345'];
        $user = User::where('username', $data['username'])->first();
        $email = $user->email;
        $companyUser = CompanyUser::where('user_id', $user->id)->first();
        $company = $companyUser->company;
        if ($company->status == 2) {
            if (Auth::attempt([
                'email' => $email,
                'password' => $data['password']
            ])) {
                $user  = Auth::user();
                $token = $user->createToken('api-application')->accessToken;
                return ['token' => $token];
            } else {
                return [
                    'error' => 'Incorrect Login details'
                ];
            }
        } else {
            return [
                'error' => 'Incorrect Login details'
            ];
        }
    }
}
