<?php

namespace App\Http\Controllers\Varman\Chola;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Services\APIResponseService;
use App\Services\Varman\Chola\UserService;
use App\Http\Requests\UpdateRoleUserRequest;
use App\Http\Requests\UpdateStatusUserRequest;
use App\Http\Requests\Varman\Chola\AuthRequest;
use App\Http\Requests\UpdatePasswordUserRequest;
use App\Http\Requests\Varman\Chola\ViewChildUserRequest;
use App\Http\Requests\Varman\Chola\CreateChildUserRequest;
use App\Http\Requests\Varman\Chola\CompanyRegistrationRequest;

class UserController extends Controller
{
    public $service;
    public $apiResponseService;
    public function __construct(UserService $service, APIResponseService $apiResponseService)
    {
        $this->service = $service;
        $this->apiResponseService = $apiResponseService;
    }

    public function registration(CompanyRegistrationRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->registration($request->validated());
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function login(AuthRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->login($request->validated());
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function createChild(CreateChildUserRequest $request)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->createChild($request->validated());
            DB::commit();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function getUser(ViewChildUserRequest $request, User $user)
    {
        try {
            $result = $this->service->getUser($user);
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function childList(ViewChildUserRequest $request)
    {
        try {
            $result = $this->service->childList();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function roleList(ViewChildUserRequest $request)
    {
        try {
            $result = $this->service->roleList();
            $response = $this->apiResponseService->success(200, $result);
            return $response;
        } catch (Exception $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function userRole(UpdateRoleUserRequest $request, User $user)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->userRole($request->validated(), $user);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function userStatus(UpdateStatusUserRequest $request, User $user)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->userStatus($request->validated(), $user);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function userPassword(UpdatePasswordUserRequest $request, User $user)
    {
        try {
            DB::beginTransaction();
            $result = $this->service->userPassword($request->validated(), $user);
            $response = $this->apiResponseService->success(200, $result);
            DB::commit();
            return $response;
        } catch (Exception $e) {
            DB::rollBack();
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
