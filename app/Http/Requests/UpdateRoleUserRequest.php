<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRoleUserRequest extends FormRequest
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
     * Get the va;lidation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "role" => ['required'],
            'email' => ['nullable', 'unique:users,email'],
        ];
    }
}
