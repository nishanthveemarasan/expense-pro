<?php

namespace App\Http\Requests\Varman\Chola;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class GenerateSummaryReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user->hasPermissionTo('manage_summary_report', 'api');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "from_date" => ['required', 'date'],
            "to_date" => ['required', 'date'],
        ];
    }
}
