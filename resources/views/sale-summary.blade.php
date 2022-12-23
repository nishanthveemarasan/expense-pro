<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$name}}</title>
    <style>
        * {
            font-family: "Source Sans Pro", sans-serif;
            /* font-size: 10px; */
        }

        .th-header-billing {
            background-color: #f2f2f2;
            text-align: left;
            padding: 5px 0 5px 4px;
        }

        .th-header-billing-without-color {
            background-color: #f2f2f2;
            text-align: left;
            padding: 5px 0 5px 4px;
        }

        .header-table {
            border-collapse: collapse;
        }

        .header-table-with-border {
            border-collapse: collapse;
        }

        .header-table-with-border td,
        .header-table-with-border th {
            border: 1px solid black;

        }

        .header-table-without-collapse {
            border-collapse: collapse;
        }

        .border-table {
            border: 1px solid;
            width: 100%;
        }

        .header-table tr td {
            /* border: 1px solid #f2f2f2; */
            padding: 10px 0 10px 4px;
            /* font-size: 0.8rem; */

        }

        td div {
            padding: 0.2rem 0 0.2rem 0.2rem;
            /* font-size:1rem; */
        }

        .heading {
            font-weight: bold;
            /* font-size: 1rem; */
            margin-bottom: 10px;
        }

        .header-table tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        .header-table-with-border tr:nth-child(even) {
            background-color: #f2f2f2;
        }


        .th-header-invoice {
            background-color: lightblue;
            text-align: center;
            font-size: 0.9rem;
            padding: 10px 0 10px 0;
            border-color: black;
        }

        .th-header-invoice-small {
            background-color: lightpink;
            text-align: center;
            font-size: 0.7rem;
            padding: 4px 0;
            border-color: black;
        }

        .tr-small {
            text-align: center;
            font-size: 0.7rem;
            padding: 4px 0;
            border-color: black;
        }

        .sum-td {
            padding: 10px 20px 10px 10px;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
</head>

<body>
    <div>
        <table style="width:100%;margin-bottom:20px">
            <tr>
                <td style="text-align: center" colspan="3">
                    <span class="mt-1" style="color:#4286B9;font-size:2.5rem;font-weight:bold">SALES SUMMARY</span>
                </td>
            </tr>
            <tr>
                <td style="text-align: center;" colspan="3">
                    <div style="font-size:1.5rem">
                        <strong>{{$name}}</strong>
                    </div>
                </td>
            </tr>
        </table>
        <hr style="margin: 30px 0 30px 0" />

        <table class="header-table-without-collapse" width="70%">

            <tr>
                <th class="th-header-billing" style="font-size: 1.3rem;padding:10px 10px" colspan="3">SUMMARY</th>
            </tr>
            <tr style="font-size: 1.3rem">
                <table width="100%">
                    <tr>
                        <td class="sum-td" width="70%">
                            FROM
                        </td>
                        <td style="text-align:left" width="30%">
                            {{$period['from']}}
                        </td>
                    </tr>
                    <tr>
                        <td class="sum-td" width="70%">
                            TO
                        </td>
                        <td style="text-align:left" width="30%">
                            {{$period['to']}}
                        </td>
                    </tr>
                    <tr>
                        <td class="sum-td" width="70%">
                            TOTAL SALE
                        </td>
                        <td style="text-align:left" width="30%">
                            £{{$summary['total_earning']}}
                        </td>
                    </tr>
                    <tr>
                        <td class="sum-td" style="border-bottom: 3px double black" width="70%">
                            TOTAL PAYOUT
                        </td>
                        <td style="text-align:left;border-bottom: 3px double black" width="30%">
                            £{{$summary['total_spending']}}
                        </td>
                    </tr>
                    <tr>
                        <td class="sum-td" width="70%">
                            BALANCE
                        </td>
                        @if($summary['balance'] < 0) <td style="text-align:left;color:red" width="30%">
                            <strong>£{{$summary['balance']}}</strong>
                            </td>
                            @else
                            <td style="text-align:left;color:green" width="30%">
                                <strong>£{{$summary['balance']}}</strong>
                            </td>
                            @endif
                    </tr>
                </table>
            </tr>
        </table>

        <div style="margin: 40px 0">
        </div>
        @if(count($tableData['daily_sale']) > 0)
        <div style="text-align: left;">
            DAILY SALE REPORT
        </div>
        <hr style="margin: 10px 0 30px 0" />
        <table class="header-table-with-border" width="100%" style="font-size: 10px;">
            <tr>
                <th class="th-header-invoice">SaleDate</th>
                <th class="th-header-invoice">Shop Sale</th>
                <th class="th-header-invoice">Pay Point</th>
                <th class="th-header-invoice">Lottery</th>
                <th class="th-header-invoice">Scratch</th>
                <th class="th-header-invoice">Payout</th>
                <th class="th-header-invoice">Cards</th>
                <th class="th-header-invoice">Cash</th>
                <th class="th-header-invoice">Total Payouts</th>
                <th class="th-header-invoice">Balance</th>
                <th class="th-header-invoice">Total Sale</th>
            </tr>
            @foreach($tableData['daily_sale'] as $dailySale)
            <tr>
                <td style="text-align:center;font-size:10px;">{{$dailySale['date']}}</td>
                <td style="text-align:center;font-size:10px;">{{$dailySale['sale_summary']['shopSale']['shop_sales']}}</td>
                <td style="text-align:center;font-size:10px;">{{$dailySale['sale_summary']['payPoint']}}</td>
                <td style="text-align:center;font-size:10px;">{{$dailySale['sale_summary']['lottery']}}</td>
                <td style="text-align:center;font-size:10px;">{{$dailySale['sale_summary']['scratch']}}</td>
                @if(count($dailySale['sale_summary']['payout']) > 0)
                <td style="vertical-align: top;padding:5px;">
                    <table class="header-table-with-border" width="100%">
                        <tr>
                            <th class="th-header-invoice-small">Type</th>
                            <th class="th-header-invoice-small">Sale</th>
                        </tr>
                        @foreach($dailySale['sale_summary']['payout'] as $payout)
                        <tr>
                            <td class="tr-small">{{$payout['type']}}</td>
                            <td class="tr-small">{{$payout['amount']}}</td>
                        </tr>
                        @endforeach
                    </table>
                </td>
                @else
                <td style="text-align:center;font-size:10px;">0</td>
                @endif
                <td style="vertical-align: top;padding:5px;">
                    <table class="header-table-with-border" width="100%">
                        <tr>
                            <th class="th-header-invoice-small">Type</th>
                            <th class="th-header-invoice-small">Sale</th>
                        </tr>
                        @foreach($dailySale['sale_summary']['cards'] as $card)
                        <tr>
                            <td class="tr-small">{{$card['type']}}</td>
                            <td class="tr-small">{{$card['amount']}}</td>
                        </tr>
                        @endforeach
                    </table>
                </td>
                <td style="text-align:center;font-size:10px;">{{$dailySale['sale_summary']['cash']}}</td>
                <td style="text-align:center;font-size:10px;">{{$dailySale['total_payouts']}}</td>
                @if($dailySale['balance'] < 0) <td style="text-align:center;font-size:10px;color:red">{{$dailySale['balance']}}</td>
                    @else
                    <td style="text-align:center;font-size:10px;color:green">{{$dailySale['balance']}}</td>
                    @endif
                    <td style="text-align:center;font-size:10px;">{{$dailySale['total_daily_sale']}}</td>

            </tr>
            @endforeach
            <tr>
                <td colspan="10" style="text-align: right;padding-right:5px; font-size:12px;background-color: white; border-bottom: 1px solid white;border-left: 1px solid white;padding-top:15px;padding-bottom:15px"><strong>TOTAL</strong></td>
                <td style="text-align: center;font-size:12px;background-color: #f2f2f2"><strong>£{{$categoryWise['total_daily_sale']}}</strong></td>
            </tr>
        </table>
        @endif
        <div style="margin: 40px 0">
        </div>
        @if(count($tableData['purchase']) > 0)
        <div style="text-align: left;">
            CASH AND CARRY REPORT
        </div>
        <hr style="margin: 10px 0 30px 0" />
        <table class="header-table-with-border" width="40%" style="font-size: 10px;">
            <tr>
                <th class="th-header-invoice">Date</th>
                <th class="th-header-invoice">Store</th>
                <th class="th-header-invoice">Amount</th>
            </tr>
            @foreach($tableData['purchase'] as $purchase)
            <tr>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">{{$purchase['date']}}</td>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">{{$purchase['store']}}</td>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">£{{$purchase['amount']}}</td>
            </tr>
            @endforeach
            <tr>
                <td colspan="2" style="text-align: right;padding-right:5px; font-size:12px;background-color: white; border-bottom: 1px solid white;border-left: 1px solid white;padding-top:15px;padding-bottom:15px"><strong>TOTAL</strong></td>
                <td style="text-align: center;font-size:12px;background-color: #f2f2f2"><strong>£{{$categoryWise['total_purchase']}}</strong></td>
            </tr>
        </table>
        @endif
        <div style="margin: 40px 0">
        </div>
        @if(count($tableData['salary']) > 0)
        <div style="text-align: left;">
            EMPLOYEE SALARY REPORT
        </div>
        <hr style="margin: 10px 0 30px 0" />
        <table class="header-table-with-border" width="40%" style="font-size: 10px;">
            <tr>
                <th class="th-header-invoice">Date</th>
                <th class="th-header-invoice">Employee</th>
                <th class="th-header-invoice">Amount</th>
            </tr>
            @foreach($tableData['salary'] as $salary)
            <tr>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">{{$salary['date']}}</td>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">{{$salary['employee']}}</td>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">£{{$salary['amount']}}</td>
            </tr>
            @endforeach
            <tr>
                <td colspan="2" style="text-align: right;padding-right:5px; font-size:12px;background-color: white; border-bottom: 1px solid white;border-left: 1px solid white;padding-top:15px;padding-bottom:15px"><strong>TOTAL</strong></td>
                <td style="text-align: center;font-size:12px;background-color: #f2f2f2"><strong>£{{$categoryWise['total_salary']}}</strong></td>
            </tr>
        </table>
        @endif
        <div style="margin: 40px 0">
        </div>
        @if(count($tableData['extra_expense']) > 0)
        <div style="text-align: left;">
            OTHER EXPENSE REPORT
        </div>
        <hr style="margin: 10px 0 30px 0" />
        <table class="header-table-with-border" width="40%" style="font-size: 10px;">
            <tr>
                <th class="th-header-invoice">Date</th>
                <th class="th-header-invoice">Description</th>
                <th class="th-header-invoice">Amount</th>
            </tr>
            @foreach($tableData['extra_expense'] as $expense)
            <tr>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">{{$expense['date']}}</td>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">{{$expense['description']}}</td>
                <td style="text-align:center;font-size:12px;font-weight:bold;padding:10px 0px">£{{$expense['amount']}}</td>
            </tr>
            @endforeach
            <tr>
                <td colspan="2" style="text-align: right;padding-right:5px; font-size:12px;background-color: white; border-bottom: 1px solid white;border-left: 1px solid white;padding-top:15px;padding-bottom:15px"><strong>TOTAL</strong></td>
                <td style="text-align: center;font-size:12px;background-color: #f2f2f2"><strong>£{{$categoryWise['total_other_expense']}}</strong></td>
            </tr>
        </table>
        @endif
    </div>
</body>

</html>