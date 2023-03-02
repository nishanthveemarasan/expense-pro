<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDailyScratchCardSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daily_scratch_card_sales', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->date('date');
            $table->foreignId('company_id')->constrained('companies');
            $table->json('sale_data');
            $table->double('total_sale')->nullable();
            $table->string('open_sale_updated_by', 50)->nullable();
            $table->string('close_sale_updated_by', 50)->nullable();
            $table->integer('status')->default(1)->comment('1 = draft , 2 = draft submitted, 3 = approved');
            $table->softDeletes();
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
        Schema::dropIfExists('daily_scratch_card_sales');
    }
}
