<?php

namespace Tests\Unit;

use App\Models\TaskItem;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskItemTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_task_item_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = TaskItem::factory()->create();

        $getModel = TaskItem::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_task_item_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = TaskItem::factory()->create();

        $updateAttribute = ['name' => 'new name'];

        $model->update($updateAttribute);

        $model->refresh();

        $this->assertEquals($model->name, $updateAttribute['name']);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function delete_task_item_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = TaskItem::factory()->create();

        $model->delete();

        $getModel = TaskItem::find($model->id);

        $this->assertNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function task_item_belongs_to_a_task()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $attribute = ['title' => 'new title'];

        $model = TaskItem::factory()
            ->forTask($attribute)
            ->create();

        $model->refresh();

        $getModel = TaskItem::find($model->id);

        $this->assertNotNull($getModel->task);

        $this->assertEquals($getModel->task->title, $attribute['title']);

        $this->endTest();
    }
}
