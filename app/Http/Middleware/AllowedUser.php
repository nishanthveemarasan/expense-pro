<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\CompanyUser;
use Illuminate\Http\Request;

class AllowedUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        //check if the user belongs to company
        $companyUser = CompanyUser::where('user_id', $user->id)->first();

        if ($user->status == 1 && $companyUser) {
            $company = $companyUser->company;
            if ($company->status == 2) {
                return $next($request);
            }
        }
        return response()->json([
            'success' => false,
            'http_status' => 401,
            'error' => 'Unauthorized Access'
        ], 401);
    }
}
