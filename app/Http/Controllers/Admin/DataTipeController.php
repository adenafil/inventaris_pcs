<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataTipeRequest;
use App\Http\Requests\Admin\EditDataTipeRequest;
use App\Models\DataType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataTipeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $page = request()->get('page', 1);
        $types = $search ? DataType::where('name', 'like', '%' . $search . '%')->paginate(1)->withQueryString()
            : DataType::paginate(1);
        $page = request()->get('page', 1);


        return Inertia::render('data-tipe/page', [
            'dataTypes' => Inertia::merge(fn() => $types->items()),
            'pagination' => $types,
            'page' => $page,
        ]);
    }

    public function store(AddDataTipeRequest $request)
    {
        $validatedData = $request->validated();

        DataType::create($validatedData);

        return redirect()->back()->with('success', 'Data tipe berhasil ditambahkan.');
    }

    public function destroy(DataType $dataType)
    {
        $dataType->delete();

        return redirect()->back()->with('success', 'Data tipe berhasil dihapus.');
    }

    public function update(EditDataTipeRequest $request, DataType $dataType)
    {
        $validatedData = $request->validated();

        $dataType->update($validatedData);

        return redirect()->back()->with('success', 'Data tipe berhasil diperbarui.');
    }

}
