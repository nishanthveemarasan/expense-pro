<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToDailyScratchCardSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('daily_scratch_card_sales', function (Blueprint $table) {
            $table->string('price_updated_by', 50)->nullable()->after('close_sale_updated_by');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('daily_scratch_card_sales', function (Blueprint $table) {
            //
        });
    }
}
