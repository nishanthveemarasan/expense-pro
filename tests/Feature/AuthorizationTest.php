<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthorizationTest extends TestCase
{
    use WithFaker, RefreshDatabase;
    /**
     *@return void
     *@test
     */
    public function unauthorised_user_can_not_access_resources()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $user = User::factory()->create();

        $response = $this->withHeader('Accept', 'application/json')->get(route('api.tasks.index'));

        $response->assertStatus(401);

        $this->endTest();
    }
}
