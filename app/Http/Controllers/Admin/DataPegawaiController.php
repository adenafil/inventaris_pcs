<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddEmployeeRequest;
use App\Http\Requests\Admin\EditEmployeeRequest;
use App\Models\Employee;
use App\Models\OrgUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataPegawaiController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');

        // Buat query dengan relasi
        $query = Employee::with('orgUnit');

        // Tambahkan kondisi search untuk multiple fields
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nip', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhereHas('orgUnit', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    });
            });
        }

        $page = request()->get('page', 1);
        $employees = $query->paginate(20)->withQueryString();


        return Inertia::render('data-pegawai/page', [
            'employees' => Inertia::merge(fn() => $employees->items()),
            'pagination' => $employees,
            'page' => $page,
        ]);
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

    public function edit(Employee $employee)
    {
        $orgUnits = OrgUnit::all();
        return Inertia::render('data-pegawai/edit/page', [
            'employee' => $employee->load('orgUnit'),
            'orgUnits' => $orgUnits
        ]);
    }

    public function update(EditEmployeeRequest $request, Employee $employee)
    {
        $validated = $request->validated();

        $employee->update([
            'id' => $employee->id,
            'nip' => $validated['nip'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'org_unit_id' => $validated['org_unit_id'],
            'is_active' => $validated['status'],
        ]);

        return redirect()->route('employees.index')->with('success', 'Data pegawai berhasil diperbarui.');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')->with('success', 'Data pegawai berhasil dihapus.');
    }

}
