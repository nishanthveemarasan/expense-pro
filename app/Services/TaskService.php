<?php

namespace App\Services;

use App\Http\Resources\TaskResource;
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

        return ['data' => new TaskResource($task->load('items'))];
    }

    public function index()
    {
        $user = Auth::user();
        $tasks = $user->tasks()->with(['items' => function ($query) {
            $query->orderBy('order', 'asc');
        }])->orderBy('created_at', 'desc')->get();

        return ['data' => TaskResource::collection($tasks)];
    }

    public function updateItem($data, Task $task, TaskItem $item)
    {
        $task->update(["completed" => false]);
        $item->update($data);

        return ['data' => 'Task is updated Successfully'];
    }

    public function updateItemContent($data, Task $task, TaskItem $item)
    {
        $item->update(['name' => $data['content']]);

        return ['data' => 'Task is updated Successfully'];
    }

    public function deleteTaskItem(Task $task, TaskItem $item)
    {
        $item->delete();
        $item->refresh();

        $currentTaskItems = $task->items()->count();
        if ($currentTaskItems == 0) {
            $task->delete();
        }

        return ['data' => 'Task is updated Successfully'];
    }
    public function deleteTask(Task $task)
    {
        $task->delete();
        $task->refresh();

        return ['data' => 'Task is updated Successfully'];
    }

    public function updateItems($data, Task $task)
    {
        foreach ($data['data'] as $item) {
            $task->items()->where('uuid', $item['uuid'])->update(['order' => $item['order']]);
        }

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
