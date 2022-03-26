<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;

class AddOrderToTaskItems extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order:existing-tasks-items';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('process started');
        $tasks = Task::all();
        foreach ($tasks as $task) {
            $i = 0;
            foreach ($task->items as $item) {
                $i++;
                $item->update(['order' => $i]);
            }
        }
        $this->info('process finished');
    }
}
