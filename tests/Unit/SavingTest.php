<?php

namespace Tests\Unit;

use App\Models\Saving;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SavingTest extends TestCase
{
    use WithFaker, RefreshDatabase;

    /**
     * 
     * @return void
     * @test
     */
    public function create_savings_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Saving::factory()->create();

        $getModel = Saving::find($model->id);

        $this->assertNotNull($getModel);

        $this->endTest();
    }

    /**
     * 
     * @return void
     * @test
     */
    public function update_savings_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Saving::factory([
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
    public function delete_savings_successfully()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $model = Saving::factory()->create();

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
    public function savings_belongs_to_an_user()
    {
        $this->startTest(get_class(), __FUNCTION__);

        $attribute = ['email' => 'test@test.com'];

        $model = Saving::factory()
            ->forUser($attribute)
            ->create();

        $model->refresh();

        $getModel = Saving::find($model->id);

        $this->assertNotNull($getModel->user);

        $this->assertEquals($getModel->user->email, $attribute['email']);

        $this->endTest();
    }
}
