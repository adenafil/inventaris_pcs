<?php

use App\Http\Controllers\Admin\DataBidangController;
use App\Http\Controllers\Admin\DataLocationController;
use App\Http\Controllers\Admin\DataModelController;
use App\Http\Controllers\Admin\DataPegawaiController;
use App\Http\Controllers\Admin\DataTipeController;
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

        Route::get('/employees', [DataPegawaiController::class, 'index'])->name('employees.index');
        Route::get('/employees/create', [DataPegawaiController::class, 'create'])->name('employees.create');

        Route::get('/locations', [DataLocationController::class, 'index'])->name('locations.index');

        Route::get('/models', [DataModelController::class, 'index'])->name('data-model.index');
        Route::get('/models/create', [DataModelController::class, 'create'])->name('data-model.create');

        Route::get('/types', [DataTipeController::class, 'index'])->name('data-tipe.index');
    });


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
