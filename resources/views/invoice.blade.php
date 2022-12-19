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

        td {
            padding: 10px 20px 10px 4px;
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
                    <span class="mt-1" style="color:#4286B9;font-size:3.5rem;font-weight:bold">Invoice</span>
                </td>
            </tr>
            <tr>
                <td style="text-align: center;" colspan="3">
                    <div style="font-size:1.5rem">
                        <strong>{{$name}}</strong>
                    </div>
                    <div style="font-size:0.95rem">
                        {{$company_address['lineOne']}}, {{$company_address['lineTwo']}}, {{$company_address['linethree']}}, {{$company_address['city']}} {{$company_address['postCode']}}
                    </div>
                    <div style="font-size:0.95rem">
                        Tel: {{$company_contact_info['phone']}}, Email: {{$company_contact_info['email']}}
                    </div>
                </td>
            </tr>
        </table>
        <hr style="margin: 30px 0 30px 0" />
        <table class="mb-3" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            <td width="52%" valign="top">
                <table class="header-table-without-collapse" width="100%">
                    <tr>
                        <th colspan="2" class="th-header-billing" style="font-size: 13px;padding:5px 10px">BILL TO</th>
                    </tr>
                    <tr style="font-size: 13px;">
                        <td style="padding:20px 0 0 10px;" colspan="2">
                            <div><strong>{{$billing_address['billingCompanyName']}} </strong></div>
                            <div>{{$billing_address['lineOne']}}, {{$billing_address['lineTwo']}}</div>
                            <div>{{$billing_address['linethree']}}</div>
                            <div>{{$billing_address['city']}}</div>
                            <div>{{$billing_address['postCode']}}</div>
                        </td>
                    </tr>
                </table>
            </td>
            <td width="47%" valign="top">
                <table class="header-table-without-collapse" width="100%">

                    <tr>
                        <th class="th-header-billing" style="font-size: 13px;padding:5px 5px" colspan="3">INVOICE DETAILS</th>
                    </tr>
                    <tr style="font-size: 11.5px">
                        <table width="100%">
                            <tr>
                                <td style="width:40%">
                                    <strong>Invoice Date </strong>
                                </td>
                                <td style="text-align:left">
                                    <span style="margin-left:5px; margin-right:5px;">
                                        :
                                    </span>
                                    {{$data['invoiceDate']}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width:40%;">
                                    <strong>Invoice Number </strong>
                                </td>
                                <td>
                                    <span style="margin-left:5px; margin-right:5px;">
                                        :
                                    </span>
                                    {{$invoiceNumber}}
                                </td>
                            </tr>
                            <tr>
                                <td style="width:40%">
                                    <strong>Client Reference </strong>
                                </td>
                                <td style="width:59%;text-align:left">
                                    <span style="margin-left:5px; margin-right:5px;">
                                        :
                                    </span>
                                    Transport Service
                                </td>
                            </tr>
                            <tr>
                                <td style="width:40%">
                                    <strong>DUE DATE </strong>
                                </td>
                                <td>
                                    <span style="margin-left:5px; margin-right:5px;">
                                        :
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </tr>
                </table>
            </td>
        </table>
        <div style="margin: 40px 0">
            <table width="100%">
                <tr>
                    <th style="text-align: left">Additional Information</th>
                </tr>
                <tr style="font-size: 13px">
                    <td>
                        For Service provided by {{$name}} to {{$billing_address['billingCompanyName']}}
                    </td>
                </tr>
            </table>
        </div>
        <table class="header-table-with-border" width="100%" style="font-size: 10px;">
            <tr>
                <th class="th-header-invoice">Description</th>
                <th class="th-header-invoice">Service</th>
                <th class="th-header-invoice">Rate</th>
                <th class="th-header-invoice">Service Price</th>
                <th class="th-header-invoice">Total</th>
            </tr>
            @for ($i = 0; $i < count($data['data']); $i++) @if($i==count($data['data']) - 1) <tr>
                <td style="text-align:center;font-size:12px">{{$data['data'][$i]['date']}} ({{$data['data'][$i]['code']}})</td>
                <td style="text-align:center;font-size:12px">1</td>
                <td style="text-align:center;font-size:12px">£{{$data['data'][$i]['rate']}}</td>
                <td style="text-align:center;font-size:12px">£{{$data['data'][$i]['rate']}}</td>
                <td style="text-align: center;padding-right:15px;font-size:12px;background-color: #f2f2f2">£{{$data['data'][$i]['rate']}}</td>
                </tr>
                @else
                <tr>
                    <td style="text-align:center;font-size:12px;border-bottom: 1px solid white;">{{$data['data'][$i]['date']}} ({{$data['data'][$i]['code']}})</td>
                    <td style="text-align:center;font-size:12px;border-bottom: 1px solid white;">1</td>
                    <td style="text-align:center;font-size:12px;border-bottom: 1px solid white;">£{{$data['data'][$i]['rate']}}</td>
                    <td style="text-align:center;font-size:12px;border-bottom: 1px solid white;">£{{$data['data'][$i]['rate']}}</td>
                    <td style="text-align: center;padding-right:15px;font-size:12px;background-color: #f2f2f2;border-bottom: 1px solid #f2f2f2;">£{{$data['data'][$i]['rate']}}</td>
                </tr>
                @endif
                @endfor
                <tr>
                    <td colspan="4" style="text-align: right;padding-right:5px; font-size:12px;background-color: white; border-bottom: 1px solid white;border-left: 1px solid white;"><strong>SUB TOTAL</strong></td>
                    <td style="text-align: center;padding-right:15px;font-size:12px;background-color: #f2f2f2"><strong>£{{$data['total']}}</strong></td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: right;padding-right:5px;font-size:12px;background-color: white;border-left: 1px solid white;border-bottom: 1px solid white;"><strong>TOTAL</strong></td>
                    <td style="text-align: center;padding-right:15px;font-size:12px;background-color: #f2f2f2"><strong>£{{$data['total']}}</strong></td>
                </tr>
        </table>
        <div style="text-align: right;margin-top:2%; font-weight:bold;font-size: 11px;">
            * Payment should be made as per the agreed terms
        </div>
        <div class="page-break"></div>
        <br />
        <hr style="margin: 5px 0 20px 0" />

        <table class="header-table-without-collapse" width="100%">
            <tr>
                <th class="th-header-billing-without-color" style="font-size: 13px;padding:5px 5px">Registered Address</th>
                <th class="th-header-billing-without-color" style="font-size: 13px;padding:5px 5px">Contact Information</th>
                <th class="th-header-billing-without-color" style="font-size: 13px;padding:5px 5px">Payment Details</th>
            </tr>
            <tr style="font-size: 13px;">
                <td width="33%">
                    <div>{{$company_address['lineOne']}} {{$company_address['lineTwo']}}</div>
                    <div>{{$company_address['linethree']}}</div>
                    <div>{{$company_address['city']}}, {{$company_address['postCode']}}</div>
                </td>
                <td width="42%">
                    <div>{{$company_contact_info['ownerName']}}</div>
                    <div>Phone: {{$company_contact_info['phone']}}</div>
                    <div>Email: {{$company_contact_info['email']}}</div>
                </td>
                <td width="25%">
                    <div>Bank Name : {{$payment_details['bankName']}}</div>
                    <div>Sort-Code : {{$payment_details['sortCode']}}</div>
                    <div>Account No : {{$payment_details['accountNumber']}}</div>
                </td>
            </tr>
        </table>
        <div style="text-align: center;margin-top:50px;margin-bottom:35px;font-size:2rem;font-weight:bold">
            Thank you for your business!
        </div>

    </div>
</body>

</html>