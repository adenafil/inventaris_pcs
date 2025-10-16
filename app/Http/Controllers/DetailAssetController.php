<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailAssetController extends Controller
{
    public function index($key) {
        $assignment = \App\Models\Assignment::with(['asset', 'asset.documents', 'asset.type', 'asset.location', 'asset.model', 'employee', 'orgUnit', 'creator'])->where('key_qr', $key)->first();

        if (!$assignment) {
            return Inertia::render('assets/view/public/not-found-page');
        }

        return Inertia::render('assets/view/public/page', [
            'assignment' => $assignment,
            'hostUrl' => env('APP_URL'),
        ]);
    }
}
