<?php

namespace App\Http\Requests\Mobile;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class CreateMobileExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // return Auth::user()->can('create-expense');
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
            "expense" => ['required', 'array'],
            "expense.*.type" => ['required', 'string'],
            "expense.*.date" => ['required', 'date'],
            "expense.*.day" => ['required', 'numeric'],
            "expense.*.month" => ['required', 'numeric'],
            "expense.*.selectedCategory" => ['required', 'string'],
            "expense.*.week" => ['required', 'numeric'],
            "expense.*.year" => ['required', 'numeric'],
            "expense.*.category" => ['required', 'string'],
            "expense.*.subCategory" => ['required', 'string'],
            "expense.*.amount" => ['required', 'numeric']
        ];
    }
}
