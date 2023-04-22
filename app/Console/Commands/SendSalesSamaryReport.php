<?php

namespace App\Console\Commands;

use PDF;
use Carbon\Carbon;
use App\Models\Company;
use App\Traits\ErrorHelper;
use App\Traits\CompanyHelper;
use App\Mail\sendStatementMail;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Mail\SendSalesSummaryReport;
use App\Models\CheckSaleReport;
use App\Services\Varman\Chola\DropboxService;
use Illuminate\Support\Facades\Mail;

class SendSalesSamaryReport extends Command
{
    use CompanyHelper, ErrorHelper;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'report:sales-summary';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate report every monday';
    public $dropbboxService;

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
        $currentDay = Carbon::now();
        $dayOfWeek = $currentDay->dayOfWeek;

        Log::info("Day of the week of ( " . $currentDay->format('Y-m-d') . " ) is : " . $dayOfWeek);
        if ($dayOfWeek == 1) {
            $yerterDay = $currentDay->subDay();
            $toDay = $yerterDay->format('Y-m-d');
            $fromDay = $yerterDay->subDays(6)->format('Y-m-d');
            $data['from_date'] = $fromDay;
            $data['to_date'] = $toDay;
            $this->info("date from {$fromDay} to {$toDay}");
            $activeCompanies = Company::where('status', 2)->get();

            foreach ($activeCompanies as $company) {
                $this->info($company->name);
                $pdfData = $this->calculateSummary($data, $company);
                $adminEmails = $this->getAdmins($company);

                $timeStamp = Carbon::now()->timestamp;
                $fileName = "sale_report_{$timeStamp}_{$data['from_date']}_{$data['to_date']}";

                $pdf = PDF::loadView('sale-summary', $pdfData);
                $pdf->setPaper('A4', 'portrait');

                if ($company->id == 5) {
                    $reportDate = Carbon::create($data['from_date']);
                    $filePath = "{$reportDate->year}/{$reportDate->format('F')}";
                    $dropboxFilePath = "{$filePath}/{$fileName}.pdf";
                    $this->dropbboxService->storePDFintoDropbox($pdfData, $filePath, $fileName, $dropboxFilePath);
                    $company->saleReports()->create([
                        'from_date' => $data['from_date'],
                        'to_date' => $data['to_date'],
                        'total_sale' => $pdfData['summary']['total_earning'],
                        'total_expemse' => $pdfData['summary']['total_spending'],
                        'total_balance' => $pdfData['summary']['balance'],
                        'dropbox_file_url' => $dropboxFilePath
                    ]);
                    $this->info('file has been generated');
                } else {

                    $publicPath = public_path("/z/b/d/reports/{$fileName}.pdf");
                    $pdf->save($publicPath);

                    $company->saleReports()->create([
                        'from_date' => $data['from_date'],
                        'to_date' => $data['to_date'],
                        'total_sale' => $pdfData['summary']['total_earning'],
                        'total_expemse' => $pdfData['summary']['total_spending'],
                        'total_balance' => $pdfData['summary']['balance'],
                        'file_url' => '/z/b/d/reports',
                        'file_name' => $fileName
                    ]);
                    $this->info('file has been generated');
                }

                foreach ($adminEmails as $email) {
                    try {
                        $this->info($email);
                        Mail::to($email)
                            ->send(new SendSalesSummaryReport([
                                'file' => $publicPath,
                                'name' => "{$fileName}.pdf",
                                'from_date' => $data['from_date'],
                                'to_date' => $data['to_date']
                            ]));
                        $this->info('Email sent!!');
                        sleep(2);
                    } catch (\Exception $e) {
                        $error = $e->getMessage() . " GET FILE : " . $e->getFile() . " GET LINE : " . $e->getLine();
                        $this->storeError([], $error);
                    }
                }
            }
        } else {
            Log::info("Unfortunately today is not monday");
        }
        $this->info('finished!!');
    }
}
