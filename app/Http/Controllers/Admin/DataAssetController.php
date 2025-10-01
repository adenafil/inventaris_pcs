<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataAssetController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('assets/page');
    }

    public function create()
    {
        return Inertia::render('assets/add/page');
    }

    public function view()
    {
        return Inertia::render('assets/view/page');
    }

}
