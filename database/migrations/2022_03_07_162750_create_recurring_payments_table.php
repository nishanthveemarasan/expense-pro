<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecurringPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recurring_payments', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->foreignId('user_id')->constrained();
            $table->string('name');
            $table->enum('pay_method', ['weekly', 'monthly']);
            $table->double('amount');
            $table->date('start_date');
            $table->date('last_pay_date');
            $table->date('next_pay_date');
            $table->string('category');
            $table->integer('num_of_pay');
            $table->integer('current_pay_num');
            $table->enum('status', ['active', 'completed'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recurring_payments');
    }
}
