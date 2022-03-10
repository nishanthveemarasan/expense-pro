<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRecurringPaymentRequest extends FormRequest
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
