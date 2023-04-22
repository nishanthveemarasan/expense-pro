<?php

namespace App\Console\Commands;

use App\Events\StoreWeeklyReportDropbox;
use App\Models\Company;
use App\Models\SaleReport;
use App\Services\Varman\Chola\DropboxAccessTokenService;
use App\Services\Varman\Chola\DropboxService;
use App\Traits\CompanyHelper;
use Carbon\Carbon;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use PDF;

class TestCommand extends Command
{
    use CompanyHelper;
    public $dropbboxService;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:command';

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
        $this->dropbboxService = new DropboxService();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $reports = SaleReport::all();
        foreach ($reports as $report) {
            if ($report->company_id == 5) {
                $data['from_date'] = $report->from_date->format('Y-m-d');
                $data['to_date'] = $report->to_date->format('Y-m-d');
                $this->info("date from {$data['from_date']} to {$data['to_date']}");
                $company = Company::find(5);
                $pdfData = $this->calculateSummary($data, $company);
                $reportDate = Carbon::create($data['from_date']);

                $filePath = "{$reportDate->year}/{$reportDate->format('F')}";
                $timeStamp = Carbon::create($data['from_date'])->timestamp;
                $fileName = "sale_report_{$timeStamp}_{$data['from_date']}_{$data['to_date']}";

                $dropboxFilePath = "{$filePath}/{$fileName}.pdf";
                $this->dropbboxService->storePDFintoDropbox($pdfData, $filePath, $fileName, $dropboxFilePath);
                $report->update([
                    'dropbox_file_url' => $dropboxFilePath
                ]);
                $this->info('stopped');
            }
        }
        $this->info('finished');

        // $reportDate = Carbon::create($data['from_date']);
        // $filePath = "{$reportDate->year}/{$reportDate->format('F')}";

    }
}
