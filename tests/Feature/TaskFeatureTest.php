<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\TaskItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TaskFeatureTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * @return void
     * @test
     */
    public function get_all_tasks_of_a_user_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $this->seed();

        $user = User::factory()->create();

        $this->actingAsPassport($user, ['view-todo']);

        $task = Task::factory(['user_id' => $user->id])->create();

        TaskItem::factory(['task_id' => $task->id])->count(5)->create();

        $response = $this->get(route('api.tasks.index'));

        $responseArray = $response->decodeResponseJson();

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'uuid',
                    'title',
                    'completed',
                    'type',
                    'items'
                ]
            ]
        ]);

        $this->assertNotNull($responseArray['data']);

        $this->assertEquals($task->title, $responseArray['data'][0]['title']);

        $this->endTest();
    }

    /**
     * @return void
     * @test
     */
    public function user_does_not_have_permission_not_allowed_to_access_the_tasks()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $this->seed();

        $user = User::factory()->create();

        $this->actingAsPassport($user, []);

        $task = Task::factory(['user_id' => $user->id])->create();

        TaskItem::factory(['task_id' => $task->id])->count(5)->create();

        $response = $this->get(route('api.tasks.index'));

        $response->assertStatus(403);

        $this->endTest();
    }
}
