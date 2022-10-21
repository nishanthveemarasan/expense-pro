<?php

namespace App\Services\Mobile;

use App\Models\Expense;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ExepenseResource;
use App\Http\Resources\RecurringPaymentResource;
use App\Models\User;

class ExpenseService
{
    protected $user;
    public function __construct()
    {
        $this->user = User::find(1);
    }
    public function store($data)
    {
        // $user->categories()->syncWithoutDetaching([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        $collection = collect();
        foreach ($data['expense'] as $expense) {
            $item = $this->user->expenses()->create($expense);
            $collection->push(new ExepenseResource($item));
        }
        return ['data' => $collection];
    }

    public function index()
    {
        $data =  $this->user->load(['expenses' => function ($query) {
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
            $category = $this->user->categories()->create($data);
            $this->user->categories()->syncWithoutDetaching($category->id);
            return ['data' => new CategoryResource($category)];
        }
    }

    public function delete(Expense $expense)
    {
        $expense->delete();
        return ['data' => 'Expense is Deleted Successfully'];
    }
    public function update($data, Expense $expense)
    {
        $expense->update($data);
        return ['data' => 'Expense is updated Successfully'];
    }
}
