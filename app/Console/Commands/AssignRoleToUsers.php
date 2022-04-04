<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class AssignRoleToUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:assign-roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign Roles to Users';

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
        $this->info('Process Started');
        $role = Role::firstOrCreate([
            'name' => 'user',
            'guard_name' => 'api'
        ]);


        $users = User::all();
        foreach ($users as $user) {
            $user->assignRole($role);
        };
        $this->info('Process Finished');
    }
}
