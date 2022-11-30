<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\TaskItem;
use App\Models\User;
use Carbon\Carbon;
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
    public function validate_input_before_storing_and_throw_error_if_missing()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $this->seed();

        $user = User::factory()->create();

        $this->actingAsPassport($user, ['create-todo']);

        $storeData = $this->attributes();

        unset($storeData['title']);
        unset($storeData['type']);

        $response = $this->post(route('api.tasks.store'), $storeData);

        $response->assertJsonValidationErrors(['title', 'type']);

        $this->endTest();
    }

    /**
     * @return void
     * @test
     */
    public function create_task_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $this->seed();

        $user = User::factory()->create();

        $this->actingAsPassport($user, ['create-todo']);

        $storeData = $this->attributes();

        $response = $this->post(route('api.tasks.store'), $storeData);
        $responseArray = $response->decodeResponseJson();

        $response->assertStatus(200);

        $this->assertArrayHasKey('data', $responseArray);

        $task = Task::latest()->first();

        $this->assertEquals($storeData['title'], $task->title);

        $this->endTest();
    }

    private function attributes()
    {
        return [

            "date" => Carbon::now()->format('Y-m-d'),
            "title" => "title",
            "items" => [
                [
                    "uuid" => "95bd25c9-570d-4608-868d-f9f8add5ee16",
                    "name" => "sub task 1",
                    "order" => 1,
                    "completed" => false
                ],
                [
                    "uuid" => 1646226589245,
                    "name" => "asdasdsad",
                    "order" => 2,
                    "completed" => false
                ]
            ],
            "completed" => false,
            "type" => "work",
            "uuid" => "95bd25c9-570d-4608-868d-f9f8add5ee15"

        ];
    }
}
