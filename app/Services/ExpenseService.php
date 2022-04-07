<?php

namespace App\Services;

use App\Models\Expense;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ExepenseResource;
use App\Http\Resources\RecurringPaymentResource;

class ExpenseService
{
    public function store($data)
    {
        $user = Auth::user();
        // $user->categories()->syncWithoutDetaching([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        $collection = collect();
        foreach ($data['expense'] as $expense) {
            $item = $user->expenses()->create($expense);
            $collection->push(new ExepenseResource($item));
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
        return ['data' => [
            'expense' => ExepenseResource::collection($data->expenses),
            'category' => CategoryResource::collection($data->categories),
            'recurring' => RecurringPaymentResource::collection($data->recurringPayments)
        ]];
    }

    public function category($data)
    {
        $user = Auth::user();
        $category = null;
        $checkCategory = Category::where('category', 'like', '%' . $data['category'] . '%')->first();
        if ($checkCategory) {
            $category = $checkCategory->toArray();
            $categoryArray = $category['items'];
            $categoryArray = array_merge($categoryArray, $data['items']);
            $checkCategory->update(['items' => $categoryArray]);
            $checkCategory->refresh();
            return ['data' => new CategoryResource($checkCategory)];
        } else {
            $category = $user->categories()->create($data);
            $user->categories()->syncWithoutDetaching($category->id);
            return ['data' => new CategoryResource($category)];
        }
    }

    public function delete(Expense $expense)
    {
        $expense->delete();
        return ['data' => 'Expense is updated Successfully'];
    }
    public function update($data, Expense $expense)
    {
        $expense->update($data);
        return ['data' => 'Expense is updated Successfully'];
    }
}
