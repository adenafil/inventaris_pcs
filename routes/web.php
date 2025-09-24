<?php

use App\Http\Controllers\Admin\DataBidangController;
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

        Route::get('/employees', [DataBidangController::class, 'index'])->name('employees.index');
        Route::get('/employees/create', [DataBidangController::class, 'create'])->name('employees.create');
    });


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
