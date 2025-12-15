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
use App\Models\Prefix;
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
        $dataAssets = $query->paginate(pageName: 'data_asset_page', perPage: 20)->withQueryString();


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

        $uniqueId = bin2hex(random_bytes(4));
        return Inertia::render('assets/add/page', [
            'uniqueId' => $uniqueId,
            'types' => Inertia::scroll(fn() => DataType::paginate(pageName: 'type_page')),
            'models' => Inertia::scroll(fn() => AssetModel::paginate(pageName: 'model_page')),
            'locations' => Inertia::scroll(fn() => Location::paginate(pageName: 'location_page')),
            'employees' => Inertia::scroll(fn() => Employee::paginate(pageName: 'employee_page')),
            'orgUnits' => Inertia::scroll(fn() => OrgUnit::paginate(pageName: 'org_unit_page')),
            'prefixes' => fn() => Prefix::paginate(pageName: 'prefix_page', perPage: 8),
            'prexisesSelectBox' => fn() => Prefix::all()
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
        try {
            $asset->save();
        } catch (\Exception $e) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'nomor_inventaris' => ['Nomor inventaris sudah ada.'],
            ]);
        }

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
        // check if inventory number is count more two, which means it is unique
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

        try {
            $asset->save();
        } catch (\Exception $e) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'nomor_inventaris' => ['Nomor inventaris sudah ada.'],
            ]);
        }
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
            'hostUrl' => env('APP_URL'),
        ]);
    }

    public function assignment(AddAssignmentRequest $request)
    {
        $validated = $request->validated();

        // MY Todo:
        // check the constraint first
        // only one employee could be assigned to one asset at the same time
        // and also only one org unit could be assigned to one asset at the same time
        // but both can be assigned simultaneously (1 employee + 1 org unit)
        
        // Check if trying to assign an employee
        if (isset($validated['employee_id'])) {
            $existingEmployeeAssignment = Assignment::where('asset_id', $validated['asset_id'])
                ->where('status', 'assigned')
                ->whereNotNull('employee_id')
                ->first();

            if ($existingEmployeeAssignment) {
                $employee = Employee::find($existingEmployeeAssignment->employee_id);
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'employee_id' => ['This asset is already assigned to employee: ' . ($employee ? $employee->name : 'Unknown') . '. Please return the asset from this employee first before assigning to another employee.'],
                ]);
            }
        }

        // Check if trying to assign an organization
        if (isset($validated['org_unit_id'])) {
            $existingOrgAssignment = Assignment::where('asset_id', $validated['asset_id'])
                ->where('status', 'assigned')
                ->whereNotNull('org_unit_id')
                ->first();

            if ($existingOrgAssignment) {
                $orgUnit = OrgUnit::find($existingOrgAssignment->org_unit_id);
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'org_unit_id' => ['This asset is already assigned to organizational unit: ' . ($orgUnit ? $orgUnit->name : 'Unknown') . '. Please return the asset from this organizational unit first before assigning to another organizational unit.'],
                ]);
            }
        }

        logger()->info('No conflicting assignment found, proceeding to create a new assignment.');

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


    public function updateKeyQr(Assignment $assignment, Request $request)
    {
        if ($request->has('key_qr')) {
            $request->validate([
                'key_qr' => 'required|string|unique:assignments,key_qr,' . $assignment->id,
            ]);

            $assignment->key_qr = $request->input('key_qr');
            $assignment->save();

            return redirect()->back()->with('success', 'QR key updated successfully.');
        } else {
            return redirect()->back()->with('error', 'QR key is required.');
        }
    }
}
