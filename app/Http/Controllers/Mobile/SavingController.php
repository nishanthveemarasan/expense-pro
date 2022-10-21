<?php

namespace App\Http\Controllers\Mobile;

use Exception;
use App\Models\Saving;
use Illuminate\Http\Request;
use App\Services\Mobile\SavingService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Mobile\CreateSavingRequest;

class SavingController extends Controller
{
    protected $savingService;
    protected $result;

    public function __construct(SavingService $savingService)
    {
        $this->savingService = $savingService;
    }

    public function index()
    {
        // $this->authorize('viewAny', Saving::class);
        try {
            DB::beginTransaction();
            $this->result = $this->savingService->index();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }

    public function store(CreateSavingRequest $request)
    {
        try {
            DB::beginTransaction();
            $this->result = $this->savingService->store($request->validated());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $this->result['error'] = $e->getMessage();
        }

        return $this->result;
    }
}
