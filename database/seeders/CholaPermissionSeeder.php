<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class CholaPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $guards = ['api'];

        $roles = $this->buildRoles();

        foreach ($roles as $roleName => $permissions) {
            $rolePermissions = [];
            foreach ($permissions as $permission) {
                $permission = Permission::firstOrcreate([
                    'guard_name' => $guards[0],
                    'name' => $permission
                ]);
                $rolePermissions[] = $permission;
            }

            $modelRole = Role::firstOrcreate([
                'guard_name' => $guards[0],
                'name' => $roleName
            ]);
            $modelRole->givePermissionTo($rolePermissions);
        }
    }

    private function buildRoles()
    {
        $cholaAdminPermissions = [
            'view_users',
            'view_daily_sale',
            'view_cash_and_carry',
            'view_salary_and_extra',
            'manage_cash_and_carry',
            'manage_extra_enpense',
            'manage_summary_report',
            'view_shop_items',
            'manage_daily_scratch_card'
        ];

        $cholaUsersPermissions = [
            'view_admin_panel'
        ];

        $onlyUsersPermissions = [
            'create_daily_sale',
            'create_daily_scratch_card'
        ];

        $roles = [
            'chola_admin' => array_merge($cholaAdminPermissions, $cholaUsersPermissions),
            'chola_user' =>  array_merge($cholaUsersPermissions, $onlyUsersPermissions)
        ];
        return $roles;
    }
}
