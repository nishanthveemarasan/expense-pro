<?php

namespace App\Http\Requests\Mobile;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class StopRecurringPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user->can('update-expense') && $user->id == $this->recurringPayment->user->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "num_of_pay" => ['required', 'numeric'],
            "status" => ['required', 'string'],
        ];
    }
}
