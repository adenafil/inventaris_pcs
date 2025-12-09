<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\AddPrefixRequest;
use App\Http\Requests\Admin\UpdatePrefixRequest;
use App\Models\Prefix;

class PrefixInventarsisController extends Controller
{
    /**
     *  add a new prefix to the inventory system.
     */
    public function addPrefix(AddPrefixRequest $request)
    {
        $validated = $request->validated();

        $prefix = Prefix::create($validated);

        return redirect()->back()->with('success', 'Prefix berhasil ditambahkan.');
    }

    /**
     *  update an existing prefix in the inventory system.
     */
    public function updatePrefix(UpdatePrefixRequest $request, Prefix $prefix) {
        $validated = $request->validated();

        $prefix->update($validated);

        return redirect()->back()->with('success', 'Prefix berhasil diperbarui.');
    }

    /**
     *  delete a prefix from the inventory system.
     */
    public function deletePrefix(Prefix $prefix)
    {
        $prefix->delete();

        return redirect()->back()->with('success', 'Prefix berhasil dihapus.');
    }

}
