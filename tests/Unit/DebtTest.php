<?php

namespace Tests\Unit;

use App\Models\Debt;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DebtTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_debt_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Debt::factory()->create();

        $getModel = Debt::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_debt_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Debt::factory([
            'type' => 'lend',
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
    public function delete_debt_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Debt::factory()->create();

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
    public function debt_belongs_to_an_account()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $attribute = ['name' => 'new Account'];

        $model = Debt::factory()
            ->forAccount($attribute)
            ->create();

        $model->refresh();

        $getModel = debt::find($model->id);

        $this->assertNotNull($getModel->account);

        $this->assertEquals($getModel->account->name, $attribute['name']);

        $this->endTest();
    }
}
