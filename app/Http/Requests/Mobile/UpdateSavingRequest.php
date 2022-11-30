<?php

namespace App\Http\Requests\Mobile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateSavingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user && $user->id == $this->mobileSaving->user->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'description' => ['nullable', 'string'],
            'date'  => ['required', 'date'],
            'type' => ['required', 'string'],
            'amount' => ['required', 'numeric'],
            "day" => ['required', 'numeric'],
            "month" => ['required', 'numeric'],
            "week" => ['required', 'numeric'],
            "year" => ['required', 'numeric'],
        ];
    }
}
