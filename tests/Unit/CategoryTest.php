<?php

namespace Tests\Unit;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_cetegory_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Category::factory()->create();

        $getModel = Category::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_category_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Category::factory()->create();

        $updateAttribute = ['category' => 'Category'];

        $model->update($updateAttribute);

        $model->refresh();

        $this->assertEquals($model->category, $updateAttribute['category']);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function delete_category_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Category::factory()->create();

        $model->delete();
        $model->refresh();

        $this->assertSoftDeleted($model);


        $this->endTest();
    }

    /**
     * @return void
     * @test
     */
    public function category_belongs_to_many_users()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;

        $parent = Category::factory()
            ->hasUsers($number)
            ->create();
        $parent->refresh();

        $getParent = Category::find($parent->id);

        $getAssociatedChilds = $getParent->users;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);

        $this->endTest();
    }
}
