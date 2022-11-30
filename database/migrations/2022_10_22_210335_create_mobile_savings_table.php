<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMobileSavingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobile_savings', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->text('description')->nullable();
            $table->enum('type', ['add', 'pay']);
            $table->date('date');
            $table->integer('day');
            $table->integer('month');
            $table->integer('year');
            $table->integer('week');
            $table->double('amount');
            $table->foreignId('user_id')->constrained();
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
        Schema::dropIfExists('mobile_savings');
    }
}
