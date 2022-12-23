<?php

namespace App\Http\Requests\Varman\Chola;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateDailySaleRequest extends FormRequest
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
            "shopSale" => ['required', 'array'],
            "shopSale.shop_sales" => ['required', 'numeric'],
            "shopSale.p_discounts" => ['required', 'numeric'],
            "shopSale.g_discounts" => ['required', 'numeric'],
            "payPoint" => ['required', 'numeric'],
            "lottery" => ['required', 'numeric'],
            "lottery" => ['required', 'numeric'],
            "scratch" => ['required', 'numeric'],
            "cash" => ['required', 'numeric'],
            "payout" => ['nullable', 'array'],
            "payout.*.type" => ['nullable', 'string'],
            "payout.*.amount" => ['nullable', 'numeric'],
            "cards" => ['required', 'array'],
            "cards.*.type" => ['required', 'string'],
            "cards.*.amount" => ['required', 'numeric'],
        ];
    }
}
