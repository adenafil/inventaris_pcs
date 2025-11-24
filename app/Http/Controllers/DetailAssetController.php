<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailAssetController extends Controller
{
    public function index($key) {
        $asset = Asset::with(['documents', 'type', 'location', 'model', 'assignments'])->where('inventory_number', $key)->first();

        if (!$asset) {
            return Inertia::render('assets/view/public/not-found-page');
        }

        return Inertia::render('assets/view/public/page', [
            'asset' => $asset,
            'hostUrl' => env('APP_URL'),
        ]);
    }
}
