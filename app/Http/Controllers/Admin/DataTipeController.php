<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataTipeRequest;
use App\Models\DataType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataTipeController extends Controller
{
    public function index()
    {
        return Inertia::render('data-tipe/page');
    }

    public function store(AddDataTipeRequest $request)
    {
        $validatedData = $request->validated();

        DataType::create($validatedData);

        return redirect()->back()->with('success', 'Data tipe berhasil ditambahkan.');
    }

}
