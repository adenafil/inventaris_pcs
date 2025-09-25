<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        return Inertia::render('data-model/add/page');
    }
}
