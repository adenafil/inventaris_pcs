<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddEmployeeRequest;
use App\Models\Employee;
use App\Models\OrgUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataPegawaiController extends Controller
{
    public function index()
    {
        return Inertia::render('data-pegawai/page');
    }

    public function create()
    {
        $orgUnits = OrgUnit::all();
        return Inertia::render('data-pegawai/add/page', [
            'orgUnits' => $orgUnits
        ]);
    }

    public function store(AddEmployeeRequest $request)
    {
        $validated = $request->validated();

        Employee::create([
            'nip' => $validated['nip'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'org_unit_id' => $validated['org_unit_id'],
            'is_active' => $validated['status'],
        ]);

        return redirect()->route('employees.index')->with('success', 'Data pegawai berhasil ditambahkan.');
    }
}
