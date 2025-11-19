<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataLocationRequest;
use App\Http\Requests\Admin\EditDataLocationRequest;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataLocationController extends Controller
{
public function index(Request $request)
{
    $search = $request->get('search', '');
    $locations = $search ? Location::where('name', 'like', '%' . $search . '%')->paginate(20)->withQueryString()
        : Location::paginate(20);
    $page = request()->get('page', 1);

    return Inertia::render('data-lokasi/page', [
        'locations' => Inertia::merge(fn() => $locations->items()),
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

public function update(EditDataLocationRequest $request, Location $location)
{
    $validatedData = $request->validated();

    $location->update($validatedData);

    return redirect()->back()->with('success', 'Data lokasi berhasil diperbarui.');
}
}
