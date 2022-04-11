<?php

namespace Tests\Unit;

use App\Models\RepeatPayment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RepeatPaymentTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_repeat_payment_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = RepeatPayment::factory()->create();

        $getModel = RepeatPayment::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_repeat_payment_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = RepeatPayment::factory([
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
    public function delete_repeat_payment_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = RepeatPayment::factory()->create();

        $model->delete();

        $getModel = RepeatPayment::find($model->id);

        $this->assertNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function repeat_payment_belongs_to_an_user()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $attribute = ['name' => 'new name'];

        $model = RepeatPayment::factory()
            ->forRecurringPayment($attribute)
            ->create();

        $model->refresh();

        $getModel = RepeatPayment::find($model->id);

        $this->assertNotNull($getModel->recurringPayment);

        $this->assertEquals($getModel->recurringPayment->name, $attribute['name']);

        $this->endTest();
    }
}
