<?php

namespace Tests\Unit;

use App\Models\RecurringPayment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RecurringPaymentTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_recurring_payment_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = RecurringPayment::factory()->create();

        $getModel = RecurringPayment::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_recurring_payment_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = RecurringPayment::factory([
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
    public function delete_recurring_payment_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = RecurringPayment::factory()->create();

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
    public function recurring_payment_belongs_to_an_user()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $attribute = ['email' => 'test@test.com'];

        $model = RecurringPayment::factory()
            ->forUser($attribute)
            ->create();

        $model->refresh();

        $getModel = RecurringPayment::find($model->id);

        $this->assertNotNull($getModel->user);

        $this->assertEquals($getModel->user->email, $attribute['email']);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function recurring_payment_can_have_multiple_repeat_payments()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $number = 4;
        $parent = RecurringPayment::factory()
            ->hasRepeatPayments($number)
            ->create();
        $parent->refresh();
        $getParent = RecurringPayment::find($parent->id);

        $getAssociatedChilds = $getParent->repeatPayments;
        $this->assertNotNull($getAssociatedChilds);

        $noOfAssociatedChildsRecords = $getAssociatedChilds->count();
        $this->assertTrue($noOfAssociatedChildsRecords == $number);


        $this->endTest();
    }
}
