<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataBidangRequest;
use App\Http\Requests\Admin\EditDataBidangRequest;
use App\Models\OrgUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataBidangController extends Controller
{
    public function index()
    {
        $orgUnits = OrgUnit::paginate(20);
        $page = request()->get('page', 1);
        return Inertia::render('data-bidang/page', [
            'orgunits' => Inertia::merge(fn () => $orgUnits->items()),
            'pagination' => $orgUnits,
            'page' => $page,
        ]);
    }

    public function store(AddDataBidangRequest $request)
    {
        $validatedData = $request->validated();

        OrgUnit::create($validatedData);

        return redirect()->back()->with('success', 'Data bidang berhasil ditambahkan.');
    }

    public function destroy(OrgUnit $orgunit)
    {
        $orgunit->delete();

        return redirect()->back()->with('success', 'Data bidang berhasil dihapus.');
    }

    public function update(EditDataBidangRequest $request, OrgUnit $orgunit)
    {
        $validatedData = $request->validated();

        $orgunit->update($validatedData);

        return redirect()->back()->with('success', 'Data bidang berhasil diperbarui.');
    }
}
