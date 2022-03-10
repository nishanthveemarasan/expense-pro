<?php

namespace App\Services;

use App\Models\User;
use App\Models\Saving;
use App\Models\Expense;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class ExpenseService
{
    public function store($data)
    {
        $user = Auth::user();
        // $user->categories()->syncWithoutDetaching([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        $collection = collect();
        foreach ($data['expense'] as $expense) {
            $item = $user->expenses()->create($expense);
            $collection->push($item);
        }
        return ['data' => $collection];
    }

    public function index()
    {
        $user = Auth::user();
        $data =  $user->load(['expenses' => function ($query) {
            $query->orderBy('date', 'desc');
        }], ['categories' => function ($query) {
            $query->orderBy('category', 'asc');
        }], ['recurringPayments' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }]);
        return ['data' => ['expense' => $data->expenses, 'category' => $data->categories, 'recurring' => $data->recurringPayments]];
    }

    public function category($data)
    {
        $user = Auth::user();
        $category = $user->categories()->create($data);
        $user->categories()->syncWithoutDetaching($category->id);
        return ['data' => $category];
    }
}
