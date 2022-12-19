<?php

namespace App\Http\Requests\Varman\Chola;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreDailySaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $user = Auth::user();
        return $user->hasPermissionTo('view_daily_sale', 'api') || $user->hasPermissionTo('create_daily_sale', 'api');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "date" => ['required', 'date'],
            "shopSale" => ['required', 'numeric'],
            "payPoint" => ['required', 'numeric'],
            "lottery" => ['required', 'numeric'],
            "lottery" => ['required', 'numeric'],
            "scratch" => ['required', 'numeric'],
            "cash" => ['required', 'numeric'],
            "payout" => ['required', 'array'],
            "payout.*.type" => ['required', 'string'],
            "payout.*.amount" => ['required', 'numeric'],
            "cards" => ['required', 'array'],
            "cards.*.type" => ['required', 'string'],
            "cards.*.amount" => ['required', 'numeric'],
            "totalDailySale" => ['required', 'numeric'],
            "totalPayouts" => ['required', 'numeric'],
            "balance" => ['required', 'numeric'],
        ];
    }
}
