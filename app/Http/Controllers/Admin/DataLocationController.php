<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataLocationRequest;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataLocationController extends Controller
{
    public function index()
    {
        return Inertia::render('data-lokasi/page');
    }

    public function store(AddDataLocationRequest $request)
    {
        $validatedData = $request->validated();

        Location::create($validatedData);

        return redirect()->back()->with('success', 'Data lokasi berhasil ditambahkan.');
    }
}
