<?php

namespace Tests\Unit;

use App\Models\Task;
use App\Models\TaskItem;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_task_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Task::factory()->create();

        $getModel = Task::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_task_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Task::factory()->create();

        $updateAttribute = ['title' => 'new title'];

        $model->update($updateAttribute);

        $model->refresh();

        $this->assertEquals($model->title, $updateAttribute['title']);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function delete_task_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Task::factory()->create();

        $model->delete();
        $model->refresh();

        $this->assertSoftDeleted($model);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function task_belongs_to_an_user()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $attribute = ['email' => 'test@test.com'];

        $model = Task::factory()
            ->forUser($attribute)
            ->create();

        $model->refresh();

        $getModel = Task::find($model->id);

        $this->assertNotNull($getModel->user);

        $this->assertEquals($getModel->user->email, $attribute['email']);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function task_can_have_multiple_task_items()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;
        $parent = Task::factory()
            ->hasItems($number)
            ->create();

        $parent->refresh();

        $getParent = Task::find($parent->id);

        $getAssociatedChilds = $getParent->items;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);


        $this->endTest();
    }
}
