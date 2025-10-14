<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\AssetModel;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalAsset = Asset::count();
        $role = auth()->user()->role;
        $totalPegawai = Employee::count();
        $totalModel = AssetModel::count();

        return Inertia::render('dashboard', [
            'totalAsset' => $totalAsset,
            'totalPegawai' => $totalPegawai,
            'totalModel' => $totalModel,
            'role' => $role,
        ]);
    }
}
