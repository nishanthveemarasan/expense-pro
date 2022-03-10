<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTypeColumnToRecurringPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recurring_payments', function (Blueprint $table) {
            $table->enum('susbscription_type', ['limited', 'unlimited'])->after('category');
            $table->enum('type', ['income','expense'])->after('uuid');
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
        Schema::table('recurring_payments', function (Blueprint $table) {
            $table->dropColumn('susbscription_type');
            $table->dropColumn('deleted_at');
        });
    }
}
