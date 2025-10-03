<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataModelRequest;
use App\Models\Asset;
use App\Models\AssetModel;
use App\Models\Assignment;
use App\Models\DataType;
use App\Models\Employee;
use App\Models\Location;
use App\Models\OrgUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DataAssetController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('assets/page', [
            'dataAssets' => Inertia::scroll(fn() => Asset::with(['type', 'model', 'location', 'ownerEmployee', 'ownerOrgUnit'])->paginate(pageName: 'data_asset_page')),
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
        try {
            DB::beginTransaction();


            Log::info('Asset creation started', [
                'user_id' => auth()->id(),
                'data' => $request->all()
            ]);

            $validatedData = $request->validated();

            // save asset
            $asset = new Asset();
            $asset->inventory_number = $validatedData['nomor_inventaris'];
            $asset->item_name = $validatedData['item_name'];
            $asset->type_id = $validatedData['tipe'];
            $asset->model_id = $validatedData['model'];
            $asset->serial_number = $validatedData['serial_number'];
            $asset->purchase_date = $validatedData['tanggal_pembelian'];
            $asset->purchase_year = date('Y', strtotime($validatedData['tanggal_pembelian']));
            $asset->warranty_expiration = $validatedData['akhir_garansi'];
            $asset->status = 'active';
            $asset->location_id = $validatedData['lokasi'];
            $asset->owner_type = $validatedData['pengguna'];
            $asset->owner_employee_id = $validatedData['pegawai'] ?? null;
            $asset->owner_org_unit_id = $validatedData['bidang'] ?? null;
            $asset->save();

            // do the assignment
            $assignment = new Assignment();
            $assignment->asset_id = $asset->id;
            $assignment->employee_id = $validatedData['pegawai'] ?? null;
            $assignment->org_unit_id = $validatedData['bidang'] ?? null;
            $assignment->created_by = auth()->user()->id;
            $assignment->assigned_at = $validatedData['tanggal_serah_terima'] ?? null;
            $assignment->returned_at = null;
            $assignment->save();

            // up the document
            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $file) {
                    $path = $file->store('documents', 'public');
                    $asset->documents()->create(['file_path' => $path]);
                }
            }
            DB::commit();
            Log::info('Asset created successfully', [
                'user_id' => auth()->id(),
                'asset_id' => $asset->id
            ]);
            return redirect()->route('assets.index')->with('success', 'Asset added successfully.');
        } catch (\Exception $e) {
            Log::error('Error adding asset', [
                'user_id' => auth()->id(),
                'error' => $e->getMessage(),
                'data' => $request->all()
            ]);
            DB::rollBack();
            return back()->withErrors(['error' => 'An error occurred while adding the asset: ' . $e->getMessage()])->withInput();
        }
    }

    public function view()
    {
        return Inertia::render('assets/view/page');
    }
}
