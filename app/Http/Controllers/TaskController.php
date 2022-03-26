<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddNewTaskItemRequest;
use Exception;
use Illuminate\Http\Request;
use App\Services\TaskService;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateItemsRequest;
use App\Http\Requests\UpdateTaskItemContent;
use App\Http\Requests\UpdateTaskItemRequest;
use App\Models\Task;
use App\Models\TaskItem;

class TaskController extends Controller
{
    protected $taskService;
    protected $result;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function index()
    {
        try {
            DB::beginTransaction();
            $this->result = $this->taskService->index();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function store(CreateTaskRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->taskService->store($request->validated());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function updateItem(UpdateTaskItemRequest $request, Task $task, TaskItem $item)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->taskService->updateItem($request->validated(), $task, $item);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function updateItems(UpdateItemsRequest $request, Task $task)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->taskService->updateItems($request->validated(), $task);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function deleteTaskItem(Task $task, TaskItem $item)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->taskService->deleteTaskItem($task, $item);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }


    public function completeTask(Task $task)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->taskService->completeTask($task);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function addSubTaskItem(AddNewTaskItemRequest $request, Task $task)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->taskService->addSubTaskItem($request->validated(), $task);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function updateItemContent(UpdateTaskItemContent $request, Task $task, TaskItem $item)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->taskService->updateItemContent($request->validated(), $task, $item);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
}
