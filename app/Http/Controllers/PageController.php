<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TaskService;
use SebastianBergmann\Environment\Console;

class PageController extends Controller
{
    protected $todoService;

    public function __construct(TaskService $todoService)
    {
        $this->todoService = $todoService;
    }
    public function todo()
    {
        $data = $this->todoService->index();
        return view('admin.todo')->with('data', $data);
    }
    public function saving()
    {
        return view('admin.saving');
    }
}
