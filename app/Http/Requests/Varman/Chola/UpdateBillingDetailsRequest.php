<?php

namespace App\Http\Requests\Varman\Chola;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBillingDetailsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // return auth()->user();
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
            'billingCompanyName' => ['required', 'string'],
            'lineOne' => ['required', 'string'],
            'lineTwo' => ['required', 'string'],
            'linethree' => ['nullable', 'string'],
            'city' => ['required', 'string'],
            'postCode' => ['required', 'string'],
        ];
    }
}
