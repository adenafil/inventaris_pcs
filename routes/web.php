<?php

use App\Http\Controllers\Admin\DataAssetController;
use App\Http\Controllers\Admin\DataBidangController;
use App\Http\Controllers\Admin\DataLocationController;
use App\Http\Controllers\Admin\DataModelController;
use App\Http\Controllers\Admin\DataPegawaiController;
use App\Http\Controllers\Admin\DataTipeController;
use App\Http\Controllers\Admin\UserAccountController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('master')->group(function () {
        Route::get('/org-units', [DataBidangController::class, 'index'])->name('org-units.index');
        Route::post('/org-units', [DataBidangController::class, 'store'])->name('org-units.store')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::delete('/org-units/{orgunit}', [DataBidangController::class, 'destroy'])->name('org-units.destroy');
        Route::patch('/org-units/{orgunit}', [DataBidangController::class, 'update'])->name('org-units.update')->middleware([
            HandlePrecognitiveRequests::class
        ]);

        Route::get('/employees', [DataPegawaiController::class, 'index'])->name('employees.index');
        Route::get('/employees/create', [DataPegawaiController::class, 'create'])->name('employees.create');
        Route::get('/employees/{employee}/edit', [DataPegawaiController::class, 'edit'])->name('employees.edit');
        Route::patch('/employees/{employee}', [DataPegawaiController::class, 'update'])->name('employees.update')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::post('/employees', [DataPegawaiController::class, 'store'])->name('employees.store')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::delete('/employees/{employee}', [DataPegawaiController::class, 'destroy'])->name('employees.destroy');

        Route::get('/locations', [DataLocationController::class, 'index'])->name('locations.index');
        Route::post('/locations', [DataLocationController::class, 'store'])->name('locations.store')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::delete('/locations/{location}', [DataLocationController::class, 'destroy'])->name('locations.destroy');
        Route::patch('/locations/{location}', [DataLocationController::class, 'update'])->name('locations.update')->middleware([
            HandlePrecognitiveRequests::class
        ]);

        Route::get('/models', [DataModelController::class, 'index'])->name('data-model.index');
        Route::get('/models/create', [DataModelController::class, 'create'])->name('data-model.create');
        Route::post('/models', [DataModelController::class, 'store'])->name('data-model.store')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::get('/models/{assetModel}/edit', [DataModelController::class, 'edit'])->name('data-model.edit');
        Route::patch('/models/{assetModel}', [DataModelController::class, 'update'])->name('data-model.update')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::delete('/models/{assetModel}', [DataModelController::class, 'destroy'])->name('data-model.destroy');

        Route::get('/types', [DataTipeController::class, 'index'])->name('data-tipe.index');
        Route::post('/types', [DataTipeController::class, 'store'])->name('data-tipe.store')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::delete('/types/{dataType}', [DataTipeController::class, 'destroy'])->name('data-tipe.destroy');
        Route::patch('/types/{dataType}', [DataTipeController::class, 'update'])->name('data-tipe.update')->middleware([
            HandlePrecognitiveRequests::class
        ]);

        Route::get('/assets', [DataAssetController::class, 'index'])->name('assets.index');
        Route::get('/assets/create', [DataAssetController::class, 'create'])->name('assets.create');
        Route::get('/assets/{asset}/edit', [DataAssetController::class, 'edit'])->name('assets.edit');
        Route::delete('/assets/delete/document/{document}', [DataAssetController::class, 'destroyDocument'])->name('assets.delete-document');
        Route::post('/assets', [DataAssetController::class, 'store'])->name('assets.store')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::get('/assets/view', [DataAssetController::class, 'view'])->name('assets.view');

        Route::get('/assets/testing', [DataAssetController::class, 'testing'])->name('assets.testing');

        Route::get('accounts', [UserAccountController::class, 'index'])->name('accounts.index');
        Route::post('accounts', [UserAccountController::class, 'store'])->name('accounts.store')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::patch('accounts', [UserAccountController::class, 'update'])->name('accounts.update')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::patch('accounts/{id}/toggle', [UserAccountController::class, 'toggleSoftDelete'])->name('accounts.toggle-soft-delete');
    });
});

// a special goddamn route for updating activity user so we know that user is online
Route::get('/geez', function (Request $request) {
    $user = $request->user();
    $user->last_active_at = now();
    $user->save();

    return response()->json(['message' => 'Genesis 1:1']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
