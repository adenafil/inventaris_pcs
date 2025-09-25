<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataBidangRequest;
use App\Models\OrgUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataBidangController extends Controller
{
    public function index()
    {
        $orgUnits = OrgUnit::orderBy('created_at', 'desc')->paginate(20);
        $page = request()->get('page', 1);
        return Inertia::render('data-bidang/page', [
            'orgunits' => Inertia::merge($orgUnits->items()),
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
}
