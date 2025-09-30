<?php

use App\Http\Controllers\Admin\DataBidangController;
use App\Http\Controllers\Admin\DataLocationController;
use App\Http\Controllers\Admin\DataModelController;
use App\Http\Controllers\Admin\DataPegawaiController;
use App\Http\Controllers\Admin\DataTipeController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
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

        Route::get('/types', [DataTipeController::class, 'index'])->name('data-tipe.index');
        Route::post('/types', [DataTipeController::class, 'store'])->name('data-tipe.store')->middleware([
            HandlePrecognitiveRequests::class
        ]);
        Route::delete('/types/{dataType}', [DataTipeController::class, 'destroy'])->name('data-tipe.destroy');
    });


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
