<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRecurringPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name" => ['required', 'string'],
            "amount" => ['required', 'numeric'],
            "pay_method" => ['required', 'string'],
            "num_of_pay" => ['required', 'numeric'],
            "next_pay_date" => ['required', 'date'],
            "status" => ['required', 'string'],
            "susbscription_type" => ['required', 'string'],
        ];
    }
}
