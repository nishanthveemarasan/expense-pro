<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddonlyPayoutTotalToDialyReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dialy_reports', function (Blueprint $table) {
            $table->double('only_payout_total')->after('total_daily_sale');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dialy_reports', function (Blueprint $table) {
            $table->dropColumn('only_payout_total');
        });
    }
}
