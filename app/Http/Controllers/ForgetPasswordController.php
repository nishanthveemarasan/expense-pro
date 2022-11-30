<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ForgetPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendForgetPasswordEmail;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\UpdateResetPasswordRequest;
use App\Http\Requests\CreateForgetPasswordRequest;

class ForgetPasswordController extends Controller
{
    public $result;
    public function store(CreateForgetPasswordRequest $request)
    {
        try {
            $data = $request->validated();
            $email  = $data['email'];
            $code = substr(number_format(time() * rand(), 0, '', ''), 0, 6);

            $checkActiveCode = ForgetPassword::where([
                ['email', $email],
                ['status', 1]
            ])->first();

            if ($checkActiveCode) {
                $checkActiveCode->update(['status' => 2]);
            }
            ForgetPassword::create([
                'code' => $code,
                'email' => $email
            ]);
            $this->result['data']['message'] = 'We sent an EMAIL with the verification code to the specified Email. Use that code to retrieve your password!!';

            Mail::to($email)
                ->send(new SendForgetPasswordEmail(['code' => $code]));
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }

    public function resetPasswordCheck(ResetPasswordRequest $request)
    {
        try {
            $data = $request->validated();
            $code = $data['code'];

            $checkCode = ForgetPassword::where([
                ['code', $code],
                ['status', 1]
            ])->first();
            if ($checkCode) {
                $created = $checkCode->created_at;
                $now = Carbon::now()->addMinutes();
                $addMinutesToCodeCreated = $created->addMinutes(10);
                if ($addMinutesToCodeCreated->greaterThan($now)) {
                    $this->result['data']['email'] = $checkCode->email;
                } else {
                    $this->result['error'] = 'The given CODE is either expired or not correct!. Please enter for Valid Code or Request for Another one.';
                }
            } else {
                $this->result['error'] = 'The given CODE is either expired or not correct!. Please enter for Valid Code or Request for Another one.';
            }
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }

    public function updatePassword(UpdateResetPasswordRequest $request)
    {
        try {
            $data = $request->validated();
            $email = $data['email'];
            $password = $data['password'];

            $getCodeRecord = ForgetPassword::where([
                ['email', $email],
                ['status', 1],
            ])->first();

            $user = User::where('email', $email)->first();

            $user->update(['password' => Hash::make($password)]);

            $getCodeRecord->update(['status' => 2]);
            $this->result['data']['message'] = "Congratualtions! Your password has been reset successfully!!";
        } catch (Exception $e) {
            $this->result['error'] = $e->getMessage();
        }
        return $this->result;
    }
}
