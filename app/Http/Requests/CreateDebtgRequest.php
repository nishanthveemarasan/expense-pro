<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDebtgRequest extends FormRequest
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
            "formData" => ['required', 'array'],
            "formData.name" => ['required', 'string'],
            "formData.amount" => ['required', 'numeric'],
            "formData.description" => ['nullable', 'string'],
            "formData.date" => ['required', 'date'],
            "formData.type" => ['required', 'string'],
            "formData.uuid" => ['required', 'string'],
        ];
    }
}
