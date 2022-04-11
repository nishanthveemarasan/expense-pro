<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;

use Tests\TestCase;
use App\Models\Account;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AccountTest extends TestCase
{
    use WithFaker, RefreshDatabase;
    /**
     * 
     * @return void
     * @test
     */
    public function create_account_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Account::factory()->create();

        $getModel = Account::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_account_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Account::factory()->create();

        $updateAttribute = ['name' => 'new account'];

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
    public function delete_account_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Account::factory()->create();

        $model->delete();

        $getModel = Account::find($model->id);

        $this->assertNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function account_belons_to_an_user()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $attribute = ['email' => 'test@test.com'];

        $model = Account::factory()
            ->forUser($attribute)
            ->create();

        $model->refresh();

        $getModel = Account::find($model->id);

        $this->assertNotNull($getModel->user);

        $this->assertEquals($getModel->user->email, $attribute['email']);

        $this->endTest();
    }

    /**
     * @return void
     * @test
     */
    public function account_can_have_more_than_one_debt_records()
    {
        $this->startTest(get_class(), __FUNCTION__);
        $number = 4;
        $parent = Account::factory()
            ->hasDebts($number)
            ->create();
        $parent->refresh();
        $getParent = Account::find($parent->id);

        $getAssociatedChilds = $getParent->debts;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);

        $this->endTest();
    }

    /**
     * @return void
     * @test
     */
    public function check_if_attributes_have_been_appended_correctly_with_account()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $account = Account::factory()
            ->hasDebts(4)
            ->create();

        $account->refresh();

        $this->assertClassHasAttribute('appends', Account::class);

        $this->assertTrue(
            method_exists(Account::class, 'getLendTotalAttribute'),
            'Class does not have function getLendTotalAttribute'
        );

        $this->assertTrue(
            method_exists(Account::class, 'getBorrowTotalAttribute'),
            'Class does not have function getBorrowTotalAttribute'
        );

        $this->endTest();
    }
}
