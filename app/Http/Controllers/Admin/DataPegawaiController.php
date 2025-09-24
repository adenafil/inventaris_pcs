<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataPegawaiController extends Controller
{
    public function index()
    {
        return Inertia::render('data-pegawai/page');
    }

    public function create()
    {
        return Inertia::render('data-pegawai/add/page');
    }
}
