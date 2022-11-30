<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMobileDebtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobile_debts', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->enum('type', ['lend', 'borrow']);
            $table->double('amount');
            $table->text('description')->nullable();
            $table->date('date');
            $table->foreignId('mobile_account_id')->constrained('mobile_accounts');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mobile_debts');
    }
}
