<?php

namespace Tests;

use App\Models\User;
use Laravel\Passport\Client;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function startTest($class, $function)
    {

        echo "\n\n" . $class . ' => ' . $function . " - start ";
    }

    public function endTest()
    {
        echo "- completed";
    }

    /**
     * Acting as passport client to have access to application
     * @param User|null $user
     * @return Client
     */
    protected function actingAsPassportClient(User $user)
    {

        return Passport::actingAsClient(
            Client::factory()->create(['user_id' => $user->id]),
        );
    }

    /**
     * @param User|null $user
     * @param array     $accountPermissions
     * @return User|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|mixed
     */
    protected function actingAsPassport(User $user, $accountPermissions = [])
    {

        $this->actingAsPassportClient($user);

        foreach ($accountPermissions as $permission) {

            $user->account->givePermissionTo($permission);
        }

        Passport::actingAs($user);

        return $user;
    }
}
