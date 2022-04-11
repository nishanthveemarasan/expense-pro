<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSavingRequest;
use App\Models\Saving;
use Illuminate\Http\Request;
use App\Services\SavingService;
use Exception;
use Illuminate\Support\Facades\DB;

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
        $this->authorize('viewAny', Saving::class);
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
