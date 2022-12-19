<?php

namespace App\Http\Requests\Varman\Chola;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class CreateCashAndCarryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user->hasPermissionTo('view_cash_and_carry', 'api');
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
            "data.*.store" => ['required', 'string'],
            "data.*.date" => ['required', 'date'],
            "data.*.amount" => ['required', 'numeric'],
        ];
    }
}
