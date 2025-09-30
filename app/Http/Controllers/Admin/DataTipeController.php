<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataTipeRequest;
use App\Models\DataType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataTipeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $page = request()->get('page', 1);
        $types = $search ? DataType::where('name', 'like', '%' . $search . '%')->paginate(20)->withQueryString()
            : DataType::paginate(20);
        $page = request()->get('page', 1);
        if (!request()->header('X-inertia')) {
            $allResults = collect();

            for ($initialPage = 1; $initialPage <= $page; $initialPage++) {
                $pageResults = $search ? DataType::where('name', 'like', '%' . $search . '%')->paginate(20, ['*'], 'page', $initialPage)
                    : DataType::paginate(20, ['*'], 'page', $initialPage);
                $allResults = $allResults->concat($pageResults->items());
            }

            return Inertia::render('data-tipe/page', [
                'dataTypes' => $allResults,
                'pagination' => new \Illuminate\Pagination\LengthAwarePaginator(
                    $allResults,
                    $types->total(),
                    $types->perPage(),
                    $page,
                    ['path' => request()->url(), 'query' => request()->query()]
                ),
                'page' => $page,
            ]);
        }


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

}
