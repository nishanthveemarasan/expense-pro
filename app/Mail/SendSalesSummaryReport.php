<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendSalesSummaryReport extends Mailable
{
    use Queueable, SerializesModels;

    protected $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = "Sales Summary report for Last Week!";
        return $this->subject($subject)
            ->view('cholaAdmin.summary-report')
            ->with([
                'fromDate' => $this->data['from_date'],
                'toDate' => $this->data['to_date']
            ])
            ->attach($this->data['file'], [
                'as' => $this->data['name'],
                'mime' => 'application/pdf',
            ]);
    }
}
