<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;

use Tests\TestCase;
use App\Models\Account;
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
}
