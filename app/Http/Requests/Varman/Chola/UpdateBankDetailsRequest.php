<?php

namespace App\Http\Requests\Varman\Chola;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBankDetailsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
        // return auth()->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'bankName' => ['required', 'string'],
            'sortCode' => ['required', 'string'],
            'accountNumber' => ['required', 'string'],
        ];
    }
}
