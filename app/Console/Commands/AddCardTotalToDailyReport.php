<?php

namespace App\Console\Commands;

use App\Models\DailySaleReport;
use App\Traits\CompanyHelper;
use Illuminate\Console\Command;

class AddCardTotalToDailyReport extends Command
{
    use CompanyHelper;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'add:card-total';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $dailySales = DailySaleReport::where('status', 2)->orderBy('date', 'DESC')->get();
        foreach ($dailySales as $dailySale) {
            $array  = $dailySale->toArray();
            $cards = $array['sale_summary']['cards'];
            $totalCards = $this->totalCardPayments($cards);

            $dailySale->cards_total = $this->formatAmount($totalCards);
            $dailySale->save();
        }
        $this->info('stop');
    }
}
