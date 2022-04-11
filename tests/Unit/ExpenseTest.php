<?php

namespace Tests\Unit;

use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExpenseTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_expense_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Expense::factory()->create();

        $getModel = Expense::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_expense_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Expense::factory([
            'type' => 'income',
            'amount' => 200
        ])->create();

        $updateAttribute = ['amount' => 1000];

        $model->update($updateAttribute);

        $model->refresh();

        $this->assertEquals($model->amount, $updateAttribute['amount']);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function delete_expense_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Expense::factory()->create();

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
    public function expense_belongs_to_an_user()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $attribute = ['email' => 'test@test.com'];

        $model = Expense::factory()
            ->forUser($attribute)
            ->create();

        $model->refresh();

        $getModel = Expense::find($model->id);

        $this->assertNotNull($getModel->user);

        $this->assertEquals($getModel->user->email, $attribute['email']);

        $this->endTest();
    }
}
