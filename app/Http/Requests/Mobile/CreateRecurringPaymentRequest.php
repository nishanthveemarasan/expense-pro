<?php

namespace App\Http\Requests\Mobile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateRecurringPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->can('create-expense');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "uuid" => ['required', 'string'],
            "type" => ['required', 'string'],
            "name" => ['required', 'string'],
            "amount" => ['required', 'numeric'],
            "pay_method" => ['required', 'string'],
            "num_of_pay" => ['required', 'numeric'],
            "start_date" => ['required', 'date'],
            "category" => ['required', 'string'],
            "current_pay_num" => ['required', 'numeric'],
            "status" => ['required', 'string'],
            "susbscription_type" => ['required', 'string'],
        ];
    }
}
