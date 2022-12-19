<?php

namespace App\Http\Requests\Varman\Chola;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyDetailsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'lineOne' => ['required', 'string'],
            'lineTwo' => ['required', 'string'],
            'linethree' => ['nullable', 'string'],
            'ownerName' => ['required', 'string'],
            'city' => ['required', 'string'],
            'postCode' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'email' => ['required', 'string'],
        ];
    }
}
