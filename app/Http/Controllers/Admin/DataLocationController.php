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
        $locations = Location::paginate(20);
        $page = request()->get('page', 1);
        if (!request()->header('X-inertia')) {
            $allResults = collect();

            for ($initialPage = 1; $initialPage <= $page; $initialPage++) {
                $pageResults = Location::paginate(20, ['*'], 'page', $initialPage);
                $allResults = $allResults->concat($pageResults->items());
            }

            return Inertia::render('data-lokasi/page', [
                'locations' => $allResults,
                'pagination' => new \Illuminate\Pagination\LengthAwarePaginator(
                    $allResults,
                    $locations->total(),
                    $locations->perPage(),
                    $page,
                    ['path' => request()->url(), 'query' => request()->query()]
                ),
                'page' => $page,
            ]);
        }

        return Inertia::render('data-lokasi/page', [
            'locations' => Inertia::merge(fn () => $locations->items()),
            'pagination' => $locations,
            'page' => $page,
        ]);
    }

    public function store(AddDataLocationRequest $request)
    {
        $validatedData = $request->validated();

        Location::create($validatedData);

        return redirect()->back()->with('success', 'Data lokasi berhasil ditambahkan.');
    }

    public function destroy(Location $location)
    {
        $location->delete();

        return redirect()->back()->with('success', 'Data lokasi berhasil dihapus.');
    }
}
