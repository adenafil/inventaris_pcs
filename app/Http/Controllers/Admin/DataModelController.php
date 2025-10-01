<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddAssetModelRequest;
use App\Models\AssetModel;
use App\Models\DataType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataModelController extends Controller
{
    public function index()
    {
        return Inertia::render('data-model/page');
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
}
