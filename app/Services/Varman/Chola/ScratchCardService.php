<?php

namespace App\Services\Varman\Chola;

use PDF;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\ScratchCard;
use App\Models\CholaInvoice;
use App\Traits\CompanyHelper;
use App\Traits\InvoiceHelper;
use App\Models\CompanyInformation;
use App\Models\DailyScratchCardSale;
use Illuminate\Support\Facades\Auth;

class ScratchCardService
{
    use CompanyHelper;

    private function company(User $user)
    {
        $companyUser = CompanyUser::where('user_id', $user->id)->first();
        $company = $companyUser->company;
        return $company;
    }

    public function list()
    {
        $user = Auth::user();
        $company = $this->company($user);
        return $company->dailyScratchCardSales()->where('status', '!=', '1')->orderBy('id', 'DESC')->paginate(20);
    }

    public function StoreScratchCard($data)
    {
        $user = Auth::user();
        $company = $this->company($user);
        $recordExists = $company->dailyScratchCardSales()->whereIn('status', [1, 2, 3])->first();
        if ($recordExists) {
            $recordExists->delete();
        }
        ScratchCard::updateOrCreate(
            ['company_id' => $company->id],
            $data
        );
        return ['msg' => 'Scratch Cards have been Updated Successfully!!'];
    }
    public function getInfo()
    {
        $user = Auth::user();
        $company = $this->company($user);

        return $company->scratchCard;
    }

    public function getTodayInfo()
    {
        $user = Auth::user();
        $company = $this->company($user);
        $scratchCards = $company->scratchCard;
        if (!$scratchCards) {
            return [];
        }

        $recordExists = $company->dailyScratchCardSales()->whereIn('status', [1, 2, 3])->exists();
        if ($recordExists) {
            return $company->dailyScratchCardSales()->whereIn('status', [1, 2, 3])->first();
        } else {
            //get the last approved data
            $lastApprovedData = DailyScratchCardSale::where('company_id', $company->id)
                ->where('status', 4)
                ->orderBy('created_at', 'DESC')
                ->first();
            $date = Carbon::now()->format('Y-m-d');
            if ($lastApprovedData) {
                $date = Carbon::create($lastApprovedData->date)->addDay()->format('Y-m-d');
            }
            $saleJsonData = $this->constractDailySaleJSonData($company);
            $dailySaleData = $company->dailyScratchCardSales()->Create([
                'date' => $date,
                'sale_data' => $saleJsonData
            ]);
            return $dailySaleData;
        }
    }

    public function updateDailySaleOpenStock($data, DailyScratchCardSale $dailyScratchCardSale)
    {
        $user = Auth::user();
        $company = $this->company($user);
        $reportExists = $company->dailyScratchCardSales()->where('date', $data['date'])->where('status', 4)->exists();
        if (!$reportExists) {
            $dailyScratchCardSale->update([
                'open_sale_updated_by' => $user->name,
                'date' => $data['date'],
                'sale_data' => $this->organiseDailySaleJsonData($data['sale_data']),
                'status' => 2
            ]);
            return ['msg' => 'Open Stock has been Updated Successfully'];
        } else {
            return ['msg' => 'Please Choose the different Date!!'];
        }
    }

    public function updateDailySaleCloseStock($data, DailyScratchCardSale $dailyScratchCardSale)
    {
        $user = Auth::user();
        $company = $this->company($user);

        $dailyScratchCardSale->update();
        $reportExists = $company->dailyScratchCardSales()->where('date', $data['date'])->where('status', 4)->first();
        if (!$reportExists || ($reportExists && $dailyScratchCardSale->uuid == $reportExists->uuid)) {
            $calculateSaleData = $this->calculateDailySaleData($data['sale_data']);
            //next data
            $nextDate = Carbon::create($data['date'])->addDay()->format('Y-m-d');

            $newRecord = $company->dailyScratchCardSales()->where('date', $nextDate)
                ->orWhere('date', null)->first();

            if ($newRecord) {
                if ($newRecord->status == 4) {
                    return ['msg' => "You can not Edit as Record for {$nextDate} has already been approved!!"];
                } else {
                    $newRecord->delete();
                }
            }

            $dailyScratchCardSale->update([
                'close_sale_updated_by' => $user->name,
                'date' => $data['date'],
                'sale_data' => $calculateSaleData['sale_data'],
                'total_sale' => $calculateSaleData['total_amount'],
                'status' => $dailyScratchCardSale->status == 4 ? 4 : 3
            ]);
            $dailyScratchCardSale->refresh();
            $isUserAdmin = $user->hasPermissionTo('manage_daily_scratch_card', 'api');
            $url = $isUserAdmin ? "/chola/company/daily-scratch-card/{$dailyScratchCardSale->uuid}/view-summary" : "/chola/company/daily-scratch-card-user/{$dailyScratchCardSale->uuid}/view-summary";
            return [
                'msg' => 'Close Stock has been Updated Successfully',
                'daily_sale_data' => $dailyScratchCardSale,
                'redirect' => $url
            ];
        } else {
            return ['msg' => 'Please Choose the different Date!!'];
        }
    }

    public function approveDailySale(DailyScratchCardSale $dailyScratchCardSale)
    {
        $user = Auth::user();
        $company = $this->company($user);

        $dailyScratchCardSale->update([
            'status' => 4
        ]);
        $dailyScratchCardSale->refresh();
        $isUserAdmin = $user->hasPermissionTo('manage_daily_scratch_card', 'api');
        $url = $isUserAdmin ? '/chola/company/daily-scratch-card' : '/chola/company/daily-scratch-card-user/create';
        return [
            'msg' => 'Daily Scratch Card Sale has been Approved Successfully!!!',
            'daily_sale_data' => $dailyScratchCardSale,
            'redirect' => $url
        ];
    }

    public function deleteDailySale(DailyScratchCardSale $dailyScratchCardSale)
    {
        $dailyScratchCardSale->delete();
        return ['msg' => 'Daily Sale for SCRATCH CARD REMOVED Successfully!!'];
    }

    public function updateCardPrice($data, DailyScratchCardSale $dailyScratchCardSale)
    {
        $user = Auth::user();
        $company = $this->company($user);

        $reportExists = $company->dailyScratchCardSales()->where('date', $data['date'])->where('status', 4)->first();
        if (!$reportExists) {
            $saleData = $data['sale_data'];
            $priceData = [];
            //update the peice in daily sale table
            foreach ($saleData as $key => $row) {
                $saleData[$key]['open_stock'] = $row['open_stock'] ?? '';
                $saleData[$key]['close_stock'] = $row['close_stock'] ?? '';

                $price = [
                    'box_number' => $row['box_number'],
                    'amount' => $row['amount'],
                ];
                array_push($priceData, $price);
            }

            //update scratch card
            $company->scratchCard()->update([
                'cards' => $priceData
            ]);

            //update the record in daily sale table
            $dailyScratchCardSale->update([
                'price_updated_by' => $user->name,
                'sale_data' => $saleData,
                'status' => 2
            ]);
            return ['msg' => 'Prices have been updated Successfully!!'];
        } else {
            return ['msg' => 'Please Choose the different Date!!'];
        }
    }

    private function constractDailySaleJSonData(Company $company)
    {

        // $lastApprovedData = $company->dailyScratchCardSales->where('status', 3)->orderBy('created_at', 'DESC')->latest();
        $lastApprovedData = DailyScratchCardSale::where('company_id', $company->id)
            ->where('status', 4)
            ->orderBy('created_at', 'DESC')
            ->first();

        $scratchCards = $company->scratchCard->cards ?? null;
        $jsonData = [];
        foreach ($scratchCards as $scratchCard) {
            $openStock = "";
            if ($lastApprovedData) {
                $saleData = $lastApprovedData->sale_data;
                $openStock = $this->getCloseStock($scratchCard['box_number'], $saleData);
            }
            $element = [
                'open_stock' => $openStock,
                'close_stock' => ''
            ];
            $element = array_merge($scratchCard, $element);
            array_push($jsonData, $element);
        }
        return $jsonData;
    }

    private function getCloseStock($boxNumber, $saleData)
    {
        $closeStock = "";
        for ($i = 0; $i < count($saleData); $i++) {
            if ($boxNumber == $saleData[$i]['box_number']) {
                $closeStock = $saleData[$i]['close_stock'] == -1 ? '' : $saleData[$i]['close_stock'];
                break;
            }
        }
        return $closeStock;
    }

    private function organiseDailySaleJsonData(&$data)
    {
        foreach ($data as $key => $value) {
            $data[$key]['open_stock'] = $data[$key]['open_stock'] ?? '';
            $data[$key]['close_stock'] = $data[$key]['close_stock'] ?? '';
        }
        return $data;
    }

    private function calculateDailySaleData(&$data)
    {
        $totalAmount = 0;
        foreach ($data as $key => $row) {
            $openStock = $row['open_stock'] ?? 0;
            $closeStock = $row['close_stock'] ?? 0;
            $temp['open_stock'] = $row['open_stock'] ?? '';
            $temp['close_stock'] = $row['close_stock'] ?? '';
            $temp['daily_sale'] = $openStock - $closeStock;
            $temp['daily_sale_amount'] = $row['amount'] * $temp['daily_sale'];
            $totalAmount += $temp['daily_sale_amount'];
            $data[$key] = array_merge($data[$key], $temp);
        }

        return [
            'sale_data' => $data,
            'total_amount' => $this->formatAmount($totalAmount)
        ];
    }

    public function formatAmount($amount)
    {
        return $amount >= 0 ? abs(round($amount, 2)) : -abs(round($amount, 2));
    }

    public function getDailyReportData(DailyScratchCardSale $dailyScratchCardSale)
    {
        return $dailyScratchCardSale;
    }
}
