<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddAssignmentRequest;
use App\Http\Requests\Admin\AddDataModelRequest;
use App\Http\Requests\Admin\EditDataAssetModelRequest;
use App\Models\Asset;
use App\Models\AssetModel;
use App\Models\Assignment;
use App\Models\DataType;
use App\Models\Document;
use App\Models\Employee;
use App\Models\Location;
use App\Models\OrgUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DataAssetController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $tipe = $request->get('tipe', '');
        $role = $request->get('role', '');

        // Buat query dengan relasi
        $query = Asset::with('type', 'model', 'location', 'creator');

        // Tambahkan kondisi search untuk multiple fields
        if ($search) {
            $query->where(function ($q) use ($search, $role, $tipe) {
                $q->where('inventory_number', 'like', '%' . $search . '%')
                    ->orWhere('item_name', 'like', '%' . $search . '%')
                    ->orWhereHas('location', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('model', function ($q) use ($search) {
                        $q->where('model', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('model', function ($q) use ($search) {
                        $q->where('brand', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('type', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('creator', function ($q) use ($search) {
                        $q->where('role', 'like', '%' . $search . '%');
                    });
            });
        }

        if ($tipe) {
            $query->whereHas('type', function ($q) use ($tipe) {
                $q->where('name', 'like', '%' . $tipe . '%');
            });
        }

        if ($role) {
            $query->whereHas('creator', function ($q) use ($role) {
                $q->where('role', 'like', '%' . $role . '%');
            });
        }


        $page = request()->get('data_asset_page', 1);
        $dataAssets = $query->paginate(pageName: 'data_asset_page', perPage: 14)->withQueryString();


        if (!request()->header('X-inertia')) {
            $allResults = collect();

            for ($initialPage = 1; $initialPage <= $page; $initialPage++) {
                // Buat query baru dengan relasi untuk setiap halaman
                $pageQuery = Asset::with('type', 'model', 'location', 'creator');

                // Tambahkan kondisi search yang sama
                if ($search) {
                    $pageQuery->where(function ($q) use ($search) {
                        $q->where('inventory_number', 'like', '%' . $search . '%')
                            ->orWhere('item_name', 'like', '%' . $search . '%')
                            ->orWhereHas('location', function ($q) use ($search) {
                                $q->where('name', 'like', '%' . $search . '%');
                            })
                            ->orWhereHas('model', function ($q) use ($search) {
                                $q->where('model', 'like', '%' . $search . '%');
                            })
                            ->orWhereHas('model', function ($q) use ($search) {
                                $q->where('brand', 'like', '%' . $search . '%');
                            })
                            ->orWhereHas('type', function ($q) use ($search) {
                                $q->where('name', 'like', '%' . $search . '%');
                            })
                            ->orWhereHas('creator', function ($q) use ($search) {
                                $q->where('role', 'like', '%' . $search . '%');
                            });
                    });
                }

                if ($tipe) {
                    $pageQuery->whereHas('type', function ($q) use ($tipe) {
                        $q->where('name', 'like', '%' . $tipe . '%');
                    });
                }

                // Filter role secara terpisah
                if ($role) {
                    $pageQuery->whereHas('creator', function ($q) use ($role) {
                        $q->where('role', 'like', '%' . $role . '%');
                    });
                }


                $pageResults = $pageQuery->paginate(14, ['*'], 'data_asset_page', $initialPage);
                $allResults = $allResults->concat($pageResults->items());
            }

            return Inertia::render('assets/page', [
                'dataAssets' => $allResults,
                'pagination' => new \Illuminate\Pagination\LengthAwarePaginator(
                    $allResults,
                    $dataAssets->total(),
                    $dataAssets->perPage(),
                    $page,
                    ['path' => request()->url(), 'query' => request()->query()]
                ),
                'page' => $page,
                'employees' => Inertia::scroll(fn() => Employee::paginate(pageName: 'employee_page')),
                'orgUnits' => Inertia::scroll(fn() => OrgUnit::paginate(pageName: 'org_unit_page')),
                'types' => Inertia::scroll(fn() => DataType::paginate(pageName: 'type_page')),
                'role' => $role,
                'tipe' => $tipe,
            ]);
        }

        return Inertia::render('assets/page', [
            'dataAssets' => Inertia::merge(fn() => $dataAssets->items()),
            'pagination' => $dataAssets,
            'page' => $page,
            'employees' => Inertia::scroll(fn() => Employee::paginate(pageName: 'employee_page')),
            'orgUnits' => Inertia::scroll(fn() => OrgUnit::paginate(pageName: 'org_unit_page')),
            'types' => Inertia::scroll(fn() => DataType::paginate(pageName: 'type_page')),
            'role' => $role,
            'tipe' => $tipe,
        ]);
    }

    public function create()
    {
        return Inertia::render('assets/add/page', [
            'types' => Inertia::scroll(fn() => DataType::paginate(pageName: 'type_page')),
            'models' => Inertia::scroll(fn() => AssetModel::paginate(pageName: 'model_page')),
            'locations' => Inertia::scroll(fn() => Location::paginate(pageName: 'location_page')),
            'employees' => Inertia::scroll(fn() => Employee::paginate(pageName: 'employee_page')),
            'orgUnits' => Inertia::scroll(fn() => OrgUnit::paginate(pageName: 'org_unit_page')),
        ]);
    }

    public function store(AddDataModelRequest $request)
    {
        $validated = $request->validated();
        $asset = new Asset();
        $asset->inventory_number = $validated['nomor_inventaris'];
        $asset->type_id = $validated['tipe'];
        $asset->model_id = $validated['model'];
        $asset->serial_number = $validated['serial_number'];
        $asset->item_name = $validated['item_name'];
        $asset->purchase_date = $validated['tanggal_pembelian'];
        $asset->purchase_year = date('Y', strtotime($validated['tanggal_pembelian']));
        $asset->warranty_expiration = $validated['akhir_garansi'];
        $asset->status = 'active';
        $asset->location_id = $validated['lokasi'];
        $asset->created_by = auth()->user()->id;
        $asset->save();

        // push documents to storage and database
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $document) {
                $path = Storage::put('documents', $document);

                $document = new Document();
                $document->asset_id = $asset->id;
                $document->file_path = $path;
                $document->uploaded_by = auth()->user()->id;
                $document->upload_date = now();
                $document->save();
            }
        }

        return redirect()->route('assets.index')->with('success', 'Data asset created successfully.');
    }

    public function edit(Asset $asset)
    {
        return Inertia::render('assets/edit/page', [
            'asset' => $asset->load(['type', 'model', 'location', 'creator', 'documents']),
            'types' => Inertia::scroll(fn() => DataType::paginate(pageName: 'type_page')),
            'models' => Inertia::scroll(fn() => AssetModel::paginate(pageName: 'model_page')),
            'locations' => Inertia::scroll(fn() => Location::paginate(pageName: 'location_page')),
            'employees' => Inertia::scroll(fn() => Employee::paginate(pageName: 'employee_page')),
            'orgUnits' => Inertia::scroll(fn() => OrgUnit::paginate(pageName: 'org_unit_page')),
        ]);
    }

    public function update(EditDataAssetModelRequest $request, Asset $asset)
    {
        $validated = $request->validated();
        $asset->inventory_number = $validated['nomor_inventaris'];
        $asset->type_id = $validated['tipe'];
        $asset->model_id = $validated['model'];
        $asset->serial_number = $validated['serial_number'];
        $asset->item_name = $validated['item_name'];
        $asset->purchase_date = $validated['tanggal_pembelian'];
        $asset->purchase_year = date('Y', strtotime($validated['tanggal_pembelian']));
        $asset->warranty_expiration = $validated['akhir_garansi'];
        $asset->status = 'active';
        $asset->location_id = $validated['lokasi'];
        $asset->created_by = auth()->user()->id;
        $asset->save();

        // push documents to storage and database
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $document) {
                $path = Storage::put('documents', $document);

                $document = new Document();
                $document->asset_id = $asset->id;
                $document->file_path = $path;
                $document->uploaded_by = auth()->user()->id;
                $document->upload_date = now();
                $document->save();
            }
        }

        return redirect()->route('assets.index')->with('success', 'Data asset updated successfully.');
    }

    public function destroyDocument(Document $document)
    {
        try {
            Storage::delete($document->file_path);
            $document->delete();
            return redirect()->back()->with('success', 'Document deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting document: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete document.');
        }
    }



    public function view($id)
    {
        $dataAsset = Asset::with(['type', 'model', 'location', 'creator', 'documents'])->where('id', $id)->firstOrFail();
        $assignments = Assignment::with(['employee', 'orgUnit', 'creator'])
            ->where('asset_id', $dataAsset->id)
            ->orderBy('assigned_at', 'desc')
            ->get();
        return Inertia::render('assets/view/page', [
            'dataAsset' => $dataAsset,
            'assignments' => $assignments,
            'employees' => Inertia::scroll(fn() => Employee::paginate(pageName: 'employee_page')),
            'orgUnits' => Inertia::scroll(fn() => OrgUnit::paginate(pageName: 'org_unit_page')),
        ]);
    }

    public function assignment(AddAssignmentRequest $request)
    {
        $validated = $request->validated();

        $assignment = new Assignment();
        $assignment->asset_id = $validated['asset_id'];
        $assignment->employee_id = $validated['employee_id'] ?? null;
        $assignment->org_unit_id = $validated['org_unit_id'] ?? null;
        $assignment->created_by = auth()->user()->id;
        $assignment->notes = $validated['notes'] ?? null;
        // up document peminjaman
        if ($request->hasFile('dokument_peminjaman')) {
            $path = Storage::put('documents', $request->file('dokument_peminjaman'));
            $assignment->dokument_peminjaman = $path;
        } else {
            $assignment->dokument_peminjaman = null;
        }
        $assignment->status = $validated['status'];
        $assignment->assigned_at = $validated['assigned_at'] ?? null;
        $assignment->returned_at = $validated['returned_at'] ?? null;
        $assignment->key_qr = Str::uuid();

        $assignment->save();

        // Update asset status based on assignment status
        $asset = Asset::find($validated['asset_id']);
        if ($asset) {
            if ($validated['status'] === 'assigned') {
                $asset->status = 'assigned';
            } elseif ($validated['status'] === 'returned') {
                $asset->status = 'active';
            } elseif ($validated['status'] === 'lost') {
                $asset->status = 'lost';
            }
            $asset->save();
        }

        return redirect()->back()->with('success', 'Asset assigned successfully.');
    }

    public function destroy(Asset $asset)
    {
        try {
            $asset->documents()->each(function ($document) {
                Storage::delete($document->file_path);
            });
            $asset->delete();
            return redirect()->route('assets.index')->with('success', 'Data asset deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting asset: ' . $e->getMessage());
            return redirect()->route('assets.index')->with('error', 'Failed to delete data asset.');
        }
    }

    public function returnTheAsset(Assignment $assignment)
    {
        DB::beginTransaction();
        try {
            $assignment->status = 'returned';
            $assignment->returned_at = now();
            $assignment->save();

            $asset = Asset::find($assignment->asset_id);
            if ($asset) {
                $asset->status = 'active';
                $asset->save();
            }

            DB::commit();
            return redirect()->back()->with('success', 'Asset returned successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error returning asset: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to return asset.');
        }
    }
}
