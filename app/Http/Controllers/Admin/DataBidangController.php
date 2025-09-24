<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataBidangController extends Controller
{
    public function index()
    {
        return Inertia::render('data-bidang/page');
    }

    public function create()
    {
        return Inertia::render('data-bidang/add/page');
    }
}
