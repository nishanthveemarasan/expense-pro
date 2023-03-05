<?php

namespace App\Services\Varman\Chola;

use PDF;
use Error;
use Carbon\Carbon;
use App\Models\User;
use App\Models\PayOut;
use App\Models\Salary;
use App\Models\CardPayment;
use App\Models\CompanyUser;
use App\Traits\ErrorHelper;
use Illuminate\Support\Str;
use App\Models\CashAndCarry;
use App\Models\OtherExpense;
use App\Mail\SendDailyReport;
use App\Traits\CompanyHelper;
use App\Models\DailySaleReport;
use App\Models\CompanyInformation;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class CompanyService
{
    use CompanyHelper;

    private function company(User $user)
    {
        $companyUser = CompanyUser::where('user_id', $user->id)->first();
        $company = $companyUser->company;
        return $company;
    }

    public function setCompanyName($data)
    {
        // $user = Auth::user();
        $user = User::find(10);

        $companyInvoice = $user->CompanyInformation()->create([
            'company_name' => $data['companyName']
        ]);

        return array('msg' => "Company Name has been Updated Successfully!", 'uuid' => $companyInvoice->uuid, 'name' => $data['companyName']);
    }
    public function updateCompanyName($data, CompanyInformation $companyInformation)
    {
        $oldName = $companyInformation->company_name;

        $companyInformation->update([
            'company_name' => $data['companyName']
        ]);

        return array('msg' => "{$oldName} has been changed to {$data['companyName']}");
    }

    public function updateCompanyAddress($data, CompanyInformation $companyInformation)
    {
        $companyInformation->update([
            'company_address' => $data
        ]);

        $companyInformation->refresh();
        $sompanyName = Str::ucfirst(Str::lower($companyInformation->company_name));

        return array('msg' => "{$sompanyName}'s Address has been updated Successfully!");
    }

    public function updateCompanyInfo($data, CompanyInformation $companyInformation)
    {
        $companyInformation->update([
            'company_contact_info' => $data
        ]);

        $companyInformation->refresh();
        $sompanyName = Str::ucfirst(Str::lower($companyInformation->company_name));

        return array('msg' => "{$sompanyName}'s Contact details has been updated Successfully!");
    }

    public function updateBillingDetails($data, CompanyInformation $companyInformation)
    {
        $companyInformation->update([
            'billing_address' => $data
        ]);

        $companyInformation->refresh();
        $sompanyName = Str::ucfirst(Str::lower($data['billingCompanyName']));

        return array('msg' => "Billing address for {$sompanyName} has been updated Successfully!");
    }

    public function updateBankDetails($data, CompanyInformation $companyInformation)
    {
        $companyInformation->update([
            'payment_details' => $data
        ]);

        $companyInformation->refresh();
        $sompanyName = Str::ucfirst(Str::lower($companyInformation->company_name));

        return array('msg' => "{$sompanyName}'s Bank details has been updated Successfully!");
    }

    public function info()
    {
        $user = Auth::user();
        $company = $this->company($user);
        $today = Carbon::now()->format('Y-m-d');

        $isAdmin = $user->hasRole('chola_admin');
        $data['permissions'] = $user->getAllPermissions()->pluck('name');
        $data['payOuts'] = $company->payOuts()->count() > 0 ? $this->makeSelectArray($company->payOuts()->pluck('name')) : [];
        $data['cards'] = $company->cardPayments()->count() > 0 ? $this->makeSelectArray($company->cardPayments()->pluck('name')) : [];
        $data['user_role'] = $isAdmin ? 'admin' : 'user';

        if ($isAdmin) {
            $data['roles'] = [
                [
                    "value" => 'chola_admin',
                    "name" => 'Admin',
                ],
                [
                    "value" => 'chola_user',
                    "name" => 'User',
                ],
            ];
            $data['stores'] = $company->stores()->count() > 0 ? $this->makeSelectArray($company->stores()->pluck('name')) : [];
            $users = CompanyUser::where('company_id', $company->id)->count();
            $data['users'] = [];
            if ($users > 0) {
                $list = CompanyUser::where('company_id', $company->id)->with(['user'])->get();
                $array = [];
                foreach ($list as $user) {
                    array_push($array, ["value" => $user->user->name, "label" => $user->user->name]);
                }
                $data['users'] = $array;
            }
        } else {
            $data['roles'] = [];
            $data['stores'] = [];
            $data['users'] = [];
        }
        return $data;
    }
    public function scratchCardSaleSpecificDate($data)
    {
        $user = Auth::user();
        $company = $this->company($user);
        $date = $data['date'];
        $response['scratch_sale'] = $company->dailyScratchCardSales()->where('date', $date)->where('status', 4)->select('total_sale', 'uuid', 'date')->first();
        return $response;
    }
    public function getDailySale(DailySaleReport $dailySaleReport)
    {
        return $dailySaleReport;
    }

    public function dailySaleList()
    {
        $user = Auth::user();
        $company = $this->company($user);
        return $company->dailyReports()->without('user')->orderBy('date', 'DESC')->paginate(20);
    }

    public function calculateDailySale($data)
    {
        $user = Auth::user();
        //check if the user is chola_user
        $isUser = $user->hasRole('chola_user');
        $company = $this->company($user);

        //check if the record already exists for report day
        $reportExists = $company->dailyReports()->where('date', $data['date'])->exists();
        if ($reportExists) {
            $error = "Report Already Exists for {$data['date']}";
            throw new Exception($error);
        }

        if ($isUser) {
            $now = Carbon::now()->format('Y-m-d');
            $today = Carbon::create($now);
            $reportDate = Carbon::create($data['date']);
            $checkReportDate = $reportDate->eq($today);
            if (!$checkReportDate) {
                throw new Exception("You are only allowed to do the report for {$now}");
            }
            //check if he 
        }


        $data = $this->calculate($data, $company, $user);

        $dailyReport = $company->dailyReports()->create([
            'date' => $data['date'],
            'sale_summary' => $data,
            'cards_total' => $data['totalCards'],
            'total_daily_sale' => $data['totalDailySale'],
            'only_payout_total' => $data['onlyPayoutTotal'],
            'total_payouts' => $data['totalPayouts'],
            'balance' => $data['balance'],
            'user_id' => $user->id,
            'user_name' => $user->name,
            'status' => 1
        ]);

        $isUserAdmin = $user->hasPermissionTo('view_daily_sale', 'api');
        $url = $isUserAdmin ? "/chola/company/daily-sales/report/{$dailyReport->uuid}/view" : "/chola/company/daily-sale-report-user/{$dailyReport->uuid}";

        return ['report' => $dailyReport, 'redirect' => $url, 'uuid' => $dailyReport->uuid, 'status' => $dailyReport->status];
    }

    public function storeDailySale($data)
    {
        $user = Auth::user();
        $company = $this->company($user);


        $company->dailyReports()->create([
            'date' => $data['date'],
            'sale_summary' => $data,
            'total_daily_sale' => $data['totalDailySale'],
            'total_payouts' => $data['totalPayouts'],
            'balance' => $data['balance'],
            'user_id' => $user->id,
            'user_name' => $user->name
        ]);

        $isUserAdmin = $user->hasPermissionTo('view_daily_sale', 'api');
        $url = $isUserAdmin ? '/chola/company/manage-daily-report' : '/chola/company/daily-sale-user';
        return ['msg' => 'Daily report has been stored Successfully!!', 'redirect' => $url];
    }

    public function updateDailySale($data, DailySaleReport $dailySaleReport)
    {
        $user = Auth::user();
        $company = $this->company($user);
        $data = $this->calculate($data, $company, $user);

        $updateData = [
            'date' => $data['date'],
            'sale_summary' => $data,
            'total_daily_sale' => $data['totalDailySale'],
            'total_payouts' => $data['totalPayouts'],
            'balance' => $data['balance'],
            'updated_by' => $user->name
        ];

        $dailySaleReport->update($updateData);

        $isUserAdmin = $user->hasPermissionTo('view_daily_sale', 'api');
        $url = $isUserAdmin ? "/chola/company/daily-sales/report/{$dailySaleReport->uuid}/view" : "/chola/company/daily-sale-report-user/{$dailySaleReport->uuid}";

        return ['msg' => 'Daily report has been UPDATED Successfully!!', 'report' => $dailySaleReport, 'redirect' => $url, 'status' => $dailySaleReport->status];
    }

    public function confirmDailySale(DailySaleReport $dailySaleReport)
    {
        $user = Auth::user();
        $company = $this->company($user);

        $updateData = [
            'status' => 2
        ];

        $dailySaleReport->update($updateData);
        $dailySaleReport->refresh();

        $adminEmails = $this->getAdmins($company);

        try {
            foreach ($adminEmails as $email) {
                Mail::to($email)
                    ->send(new SendDailyReport(['report' => $dailySaleReport->toArray(), 'date' => $dailySaleReport->date]));
            }
        } catch (\Exception $e) {
            Log::info("{$e->getMessage()} {$e->getFile()} {$e->getLine()}");
        }


        $isUserAdmin = $user->hasPermissionTo('view_daily_sale', 'api');
        $url = $isUserAdmin ? '/chola/company/daily-sales' : '/chola/company/daily-sale-user/';
        return ['msg' => 'Daily report has been APPROVED Successfully!!', 'redirect' => $url, 'status' => 2];
    }

    public function deleteDailySale(DailySaleReport $dailySaleReport)
    {
        $user = Auth::user();

        $updateData = [
            'updated_by' => $user->name
        ];

        $dailySaleReport->update($updateData);
        $dailySaleReport->refresh();

        $dailySaleReport->delete();

        $url = '/chola/company/daily-sales';
        return ['msg' => 'Daily report has been REMOVED Successfully!!', 'redirect' => $url];
    }

    public function storeCashAndCarry($data)
    {
        $user = Auth::user();
        $company = $this->company($user);
        $this->createStore($data['data'], $company);

        foreach ($data['data'] as $data) {
            $createDate = [
                "date" => $data['date'],
                "store" => $data['store'],
                "amount" => $data['amount'],
                'created_by' => $user->name
            ];
            $company->cashAndCarries()->create($createDate);
        }

        return ['msg' => 'data has been CREATED successfully!!'];
    }

    public function getCashAndCarry(CashAndCarry $cashAndCarry)
    {
        return $cashAndCarry;
    }


    public function cashAndCarryList()
    {
        $user = Auth::user();
        $company = $this->company($user);

        return $company->cashAndCarries()->orderBy('date', 'DESC')->paginate(20);
    }

    public function updateCashAndCarry($data, CashAndCarry $cashAndCarry)
    {
        $user = Auth::user();
        $company = $this->company($user);

        $this->createStore([$data], $company);

        $update = [
            "date" => $data['date'],
            "store" => $data['store'],
            "amount" => $data['amount'],
            'updated_by' => $user->name
        ];
        $cashAndCarry->update($update);

        return ['msg' => 'data has been UPDATED successfully!!'];
    }

    public function deleteCashAndCarry(CashAndCarry $cashAndCarry)
    {
        $user = Auth::user();

        $updateData = [
            'updated_by' => $user->name
        ];

        $cashAndCarry->update($updateData);
        $cashAndCarry->refresh();

        $cashAndCarry->delete();

        return ['msg' => 'Data has been REMOVED Successfully!!'];
    }

    /**
     * SALARY
     */

    public function createSalary($data)
    {
        $user = Auth::user();
        $company = $this->company($user);
        foreach ($data['data'] as $data) {
            $createDate = [
                "date" => $data['date'],
                "employee" => $data['employee'],
                "amount" => $data['amount'],
                'created_by' => $user->name
            ];
            $company->salaries()->create($createDate);
        }
        return ['msg' => 'Data has been STORED Successfully!!'];
    }

    public function getSalary(Salary $salary)
    {
        return $salary;
    }

    public function listSalary()
    {
        $user = Auth::user();
        $company = $this->company($user);
        return $company->salaries()->orderBy('date', 'DESC')->paginate(20);
    }

    public function updateSalary($data, Salary $salary)
    {
        $user = Auth::user();

        $update = [
            "date" => $data['date'],
            "employee" => $data['employee'],
            "amount" => $data['amount'],
            'updated_by' => $user->name
        ];

        $salary->update($update);

        return ['msg' => 'DATA has been UPDATED successfully!!'];
    }

    public function deleteSalary(Salary $salary)
    {
        $user = Auth::user();

        $updateData = [
            'updated_by' => $user->name
        ];

        $salary->update($updateData);
        $salary->refresh();

        $salary->delete();

        return ['msg' => 'Data has been REMOVED Successfully!!'];
    }

    /**
     * EXPENSE
     */

    public function createExpense($data)
    {
        $user = Auth::user();
        $company = $this->company($user);
        foreach ($data['data'] as $data) {
            $createDate = [
                "date" => $data['date'],
                "description" => $data['description'],
                "amount" => $data['amount'],
                'created_by' => $user->name
            ];
            $company->otherExpenses()->create($createDate);
        }
        return ['msg' => 'Data has been STORED Successfully!!'];
    }

    public function listExpense()
    {
        $user = Auth::user();
        $company = $this->company($user);
        return $company->otherExpenses()->orderBy('date', 'DESC')->paginate(20);
    }

    public function getExpense(OtherExpense $otherExpense)
    {
        return $otherExpense;
    }

    public function updateExpense($data, OtherExpense $otherExpense)
    {
        $user = Auth::user();

        $update = [
            "date" => $data['date'],
            "description" => $data['description'],
            "amount" => $data['amount'],
            'updated_by' => $user->name
        ];

        $otherExpense->update($update);

        return ['msg' => 'DATA has been UPDATED successfully!!'];
    }

    public function deleteExpense(OtherExpense $otherExpense)
    {
        $user = Auth::user();

        $updateData = [
            'updated_by' => $user->name
        ];

        $otherExpense->update($updateData);
        $otherExpense->refresh();

        $otherExpense->delete();

        return ['msg' => 'Data has been REMOVED Successfully!!'];
    }
}
