<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->can('create-todo');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required'],
            'completed' => ['required', 'boolean'],
            'date'  => ['required', 'date'],
            'type' => ['required', 'string'],
            'items.*.name' => ['required'],
            'items.*.order' => ['required'],
            'items.*.completed' => ['required', 'boolean'],
        ];
    }
}
