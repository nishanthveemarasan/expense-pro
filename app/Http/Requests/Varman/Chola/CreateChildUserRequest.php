<?php

namespace App\Http\Requests\Varman\Chola;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class CreateChildUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user->hasPermissionTo('view_users', 'api');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [

            'username' => ['required', 'unique:users,username'],
            'email' => ['nullable', 'unique:users,email'],
            'name' => ['required'],
            'role' => ['required'],
            'password' => ['required', 'confirmed', 'string', 'min:6'],

        ];
    }
}
