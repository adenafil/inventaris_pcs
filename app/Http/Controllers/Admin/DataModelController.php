<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddAssetModelRequest;
use App\Http\Requests\Admin\EditAssetModelRequest;
use App\Models\AssetModel;
use App\Models\DataType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataModelController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');

        // Buat query dengan relasi
        $query = AssetModel::with('type');

        // Tambahkan kondisi search untuk multiple fields
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('brand', 'like', '%' . $search . '%')
                    ->orWhere('model', 'like', '%' . $search . '%')
                    ->orWhere('details', 'like', '%' . $search . '%')
                    ->orWhereHas('type', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    });
            });
        }

        $page = request()->get('page', 1);
        $assetModels = $query->paginate(20)->withQueryString();


        return Inertia::render('data-model/page', [
            'assetModels' => Inertia::merge(fn() => $assetModels->items()),
            'pagination' => $assetModels,
            'page' => $page,
        ]);
    }

    public function create()
    {
        $types = DataType::all();
        return Inertia::render('data-model/add/page', [
            'types' => $types
        ]);
    }

    public function store(AddAssetModelRequest $request)
    {
        $validatedData = $request->validated();
        $assetModel = new AssetModel();
        $assetModel->type_id = $validatedData['type_id'];
        $assetModel->brand = $validatedData['brand'];
        $assetModel->model = $validatedData['model'];
        $assetModel->details = $validatedData['details'] ?? null;
        $assetModel->save();

        return redirect()->route('data-model.index')->with('success', 'Asset model created successfully.');

    }

    public function edit(AssetModel $assetModel)
    {
        $types = DataType::all();
        return Inertia::render('data-model/edit/page', [
            'assetModel' => $assetModel,
            'types' => $types
        ]);
    }

    public function update(EditAssetModelRequest $request, AssetModel $assetModel)
    {
        $validatedData = $request->validated();
        $assetModel->type_id = $validatedData['type_id'];
        $assetModel->brand = $validatedData['brand'];
        $assetModel->model = $validatedData['model'];
        $assetModel->details = $validatedData['details'] ?? null;
        $assetModel->save();

        return redirect()->route('data-model.index')->with('success', 'Asset model updated successfully.');
    }

    public function destroy(AssetModel $assetModel)
    {
        $assetModel->delete();
        return redirect()->route('data-model.index')->with('success', 'Asset model deleted successfully.');
    }

}
