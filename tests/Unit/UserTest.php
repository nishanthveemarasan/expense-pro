<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_user_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = User::factory()->create();

        $getModel = User::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_user_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = User::factory()->create();

        $updateAttribute = ['email' => 'newemail@test.com'];

        $model->update($updateAttribute);

        $model->refresh();

        $this->assertEquals($model->email, $updateAttribute['email']);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function delete_user_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = User::factory()->create();

        $model->delete();

        $getModel = User::find($model->id);

        $this->assertNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function user_can_have_multiple_accounts()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;
        $parent = User::factory()
            ->hasAccounts($number)
            ->create();

        $parent->refresh();

        $getParent = User::find($parent->id);

        $getAssociatedChilds = $getParent->accounts;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);


        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function user_can_have_multiple_savings()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;
        $parent = User::factory()
            ->hasSavings($number)
            ->create();

        $parent->refresh();

        $getParent = User::find($parent->id);

        $getAssociatedChilds = $getParent->savings;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);


        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function user_can_have_multiple_tasks()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;
        $parent = User::factory()
            ->hasTasks($number)
            ->create();

        $parent->refresh();

        $getParent = User::find($parent->id);

        $getAssociatedChilds = $getParent->tasks;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);


        $this->endTest();
    }
    /**
     * 
     * @return void
     * @test
     */
    public function user_can_have_multiple_recurring_payments()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;
        $parent = User::factory()
            ->hasRecurringPayments($number)
            ->create();

        $parent->refresh();

        $getParent = User::find($parent->id);

        $getAssociatedChilds = $getParent->recurringPayments;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);


        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function user_can_have_multiple_expenses()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;
        $parent = User::factory()
            ->hasExpenses($number)
            ->create();

        $parent->refresh();

        $getParent = User::find($parent->id);

        $getAssociatedChilds = $getParent->expenses;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);


        $this->endTest();
    }

    /**
     * @return void
     * @test
     */
    public function user_can_have_multiple_categories()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;

        $parent = User::factory()
            ->hasCategories($number)
            ->create();
        $parent->refresh();

        $getParent = User::find($parent->id);

        $getAssociatedChilds = $getParent->categories;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);

        $this->endTest();
    }
}
