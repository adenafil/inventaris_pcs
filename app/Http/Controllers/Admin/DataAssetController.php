<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddDataModelRequest;
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

class DataAssetController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('assets/page', [
            'dataAssets' => Inertia::scroll(fn() => Asset::with(['type', 'model', 'location', 'ownerEmployee', 'ownerOrgUnit'])->paginate(pageName: 'data_asset_page')
        ),
            'employees' => Inertia::scroll(fn() => Employee::paginate(pageName: 'employee_page')),
            'orgUnits' => Inertia::scroll(fn() => OrgUnit::paginate(pageName: 'org_unit_page')),
        ]);
    }

    public function testing()
    {
        return Inertia::render('assets/testing/page');
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


            // $table->id();
            // $table->string('inventory_number')->unique();
            // $table->unsignedBigInteger('type_id');
            // $table->unsignedBigInteger('model_id');
            // $table->string('serial_number')->nullable();
            // $table->string('item_name')->nullable();
            // $table->date('purchase_date')->nullable();
            // $table->year('purchase_year')->nullable();
            // $table->date('warranty_expiration')->nullable();
            // $table->string('status')->default('active');
            // $table->unsignedBigInteger('location_id')->nullable();
            // $table->timestamps();

            // $table->foreign('type_id')->references('id')->on('data_types')->onDelete('cascade');
            // $table->foreign('model_id')->references('id')->on('asset_models')->onDelete('cascade');
            // $table->foreign('location_id')->references('id')->on('locations')->onDelete('set null');


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



    public function view()
    {
        return Inertia::render('assets/view/page');
    }
}
