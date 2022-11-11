<?php

namespace App\Http\Requests\mobile;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDebtRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user->can('update-debt') && $user->id == $this->mobileDebt->mobileAccount->user->id;
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
