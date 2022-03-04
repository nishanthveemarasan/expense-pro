<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    /*
        -"type": "income",
        -"date": "2022-03-03",
        -"day": 3,
        -"month": 3,
        -"selectedCategory": "income",
        -"week": 1,
        -"year": 2022,
        -"category":"income",
         -"subCategory": "income",
        "amount": 234

    */
    public function up()
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->enum('type', ['expense', 'income']);
            $table->date('date');
            $table->integer('day');
            $table->integer('month');
            $table->integer('year');
            $table->integer('week');
            $table->string('selectedCategory');
            $table->string('category');
            $table->string('subCategory');
            $table->double('amount');
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
        Schema::dropIfExists('expenses');
    }
}
