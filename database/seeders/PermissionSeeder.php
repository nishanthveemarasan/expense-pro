<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = $this->permissions();
        $role = Role::where('name', 'user')->first();

        foreach ($permissions as $permission) {
            $permission = Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'api'
            ]);
            $role->givePermissionTo($permission);
        }
    }

    private function permissions()
    {
        return [
            'view-expense',
            'create-expense',
            'update-expense',
            'delete-expense',
            'view-debt',
            'create-debt',
            'update-debt',
            'delete-debt',
            'view-todo',
            'create-todo',
            'update-todo',
            'delete-todo',
            'view-saving',
            'create-saving',
            'update-saving',
            'delete-saving',
        ];
    }
}
