<?php

namespace App\Http\Requests\Varman\Chola;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user->hasPermissionTo('manage_extra_enpense', 'api');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "data" => ['required', 'array'],
            "data.*.description" => ['required', 'string'],
            "data.*.date" => ['required', 'date'],
            "data.*.amount" => ['required', 'numeric'],
        ];
    }
}
