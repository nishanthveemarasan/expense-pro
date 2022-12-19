<?php

namespace App\Services\Varman\Chola;

use PDF;
use App\Models\User;
use App\Models\CholaInvoice;
use App\Traits\InvoiceHelper;
use App\Models\CompanyInformation;

class InvoiceService
{
    use InvoiceHelper;

    public function generateInvoicePdf($data, CompanyInformation $companyInformation)
    {
        $total = 0;
        $i = 0;
        $array = [
            'data' => [],
            'invoiceDate' => null,
            'total' => 0,
            'invoiceFileDate' => null
        ];
        foreach ($data['invoiceData'] as $row) {
            $element = [
                'date' => $this->getDate($row['date']),
                'code' => $row['code'],
                'rate' => $this->getAmountFormat($row['rate'])
            ];
            if ($i == 0) {
                $array['invoiceDate'] = $element['date'];
                $array['invoiceFileDate'] = $this->getFileDate($row['date']);
            } else {
                if ($array['invoiceDate'] < $element['date']) {
                    $array['invoiceDate'] = $element['date'];
                    $array['invoiceFileDate'] = $this->getFileDate($row['date']);
                }
            }
            $total += (float)$row['rate'];
            array_push($array['data'], $element);
            $i++;
        }
        $array['total'] = $this->getAmountFormat($total);
        //store into invoice details table
        $companyInformation->cholaInvoices()->create([
            'invoice_number' => (int)$data['invoiceNumber'],
            'invoiceData' => $array
        ]);

        $invoice = [
            'name' => $companyInformation->company_name,
            'invoiceNumber' => $data['invoiceNumber'],
            'company_address' => $companyInformation->company_address,
            'company_contact_info' => $companyInformation->company_contact_info,
            'billing_address' => $companyInformation->billing_address,
            'payment_details' => $companyInformation->payment_details,
            'data' => $array
        ];
        $pdf = PDF::loadView('invoice', $invoice);
        $pdf->setPaper('A4', 'portrait');
        $fileName = "invoice_chola_transport_{$array['invoiceFileDate']}.pdf";
        return $pdf->download($fileName);
    }
    public function downloadPdf(CompanyInformation $companyInformation, CholaInvoice $cholaInvoice)
    {
        $invoiceData = $cholaInvoice['invoiceData'];
        $invoice = [
            'name' => $companyInformation->company_name,
            'invoiceNumber' => $cholaInvoice->invoice_number,
            'company_address' => $companyInformation->company_address,
            'company_contact_info' => $companyInformation->company_contact_info,
            'billing_address' => $companyInformation->billing_address,
            'payment_details' => $companyInformation->payment_details,
            'data' => $invoiceData
        ];
        $pdf = PDF::loadView('invoice', $invoice);
        $pdf->setPaper('A4', 'portrait');
        $fileName = "invoice_chola_transport_{$invoiceData['invoiceFileDate']}.pdf";
        return $pdf->download($fileName);
    }

    public function list()
    {
        $user = User::find(10);
        if ($user->CompanyInformation) {
            return $user->CompanyInformation->cholaInvoices()->paginate(15);
        }
        return [];
    }
}
