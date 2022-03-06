<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;
use App\Models\TaskItem;
use Illuminate\Support\Facades\Auth;
use SebastianBergmann\Environment\Console;

class TaskService
{

    public function store($data)
    {
        $user = Auth::user();
        $taskItems = $data['items'];
        unset($data['items']);

        $task = $user->tasks()->create($data);

        $task->items()->createMany($taskItems);

        $task->refresh();



        return ['data' => $task->load('items')];
    }

    public function index()
    {
        $user = Auth::user();
        return $user->tasks()->orderBy('created_at', 'desc')->get();
    }

    public function updateItem($data, Task $task, TaskItem $item)
    {
        $task->update(["completed" => false]);
        $item->update($data);

        return ['data' => 'Task is updated Successfully'];
    }

    public function completeTask(Task $task)
    {
        $completed = true;
        $data = [];
        // $task->items()->get()->map(function ($item) use (&$completed) {
        //     if (!$item->completed) {
        //         $completed = false;
        //     }
        // });
        if ($completed) {
            $task->update(["completed" => true]);
            $data =  ['data' => 'Task is Completed Successfully'];
        } else {
            $data =  ['error' => 'Task is not updated Successfully'];
        }
        return $data;
    }

    public function addSubTaskItem($data, Task $task)
    {
        $task->items()->create($data);

        return [
            'data' => 'updated successfully'
        ];
    }
}
