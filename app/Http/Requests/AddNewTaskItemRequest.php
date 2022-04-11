<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class AddNewTaskItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();

        return $user->can('update-todo') && $user->id == $this->task->user->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'uuid' => ['required'],
            'name' => ['required', 'string'],
            'order' => ['required', 'numeric'],
            'completed' => ['required', 'boolean'],
        ];
    }
}
