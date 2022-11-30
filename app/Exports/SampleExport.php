<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class SampleExport implements FromView, ShouldAutoSize, WithEvents, WithTitle
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }
    public function view(): View
    {
        return view('excel.sample-excel', $this->data);
    }


    public function registerEvents(): array
    {
        return [
            // AfterSheet::class => function (AfterSheet $event) {
            //     $event->sheet->getDelegate()->getRowDimension('2')->setRowHeight(50);
            // },
        ];
    }

    public function title(): string
    {
        return "REport of Active Users";
    }
}
