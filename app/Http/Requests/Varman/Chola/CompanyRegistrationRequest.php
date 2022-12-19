<?php

namespace App\Http\Requests\Varman\Chola;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'username' => ['required', 'unique:users,username'],
            'email' => ['nullable', 'unique:users,email'],
            'company' => ['required', 'string'],
            'password' => ['required', 'confirmed', 'string', 'min:6'],
        ];
    }
}
