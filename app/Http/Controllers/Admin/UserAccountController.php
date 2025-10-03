<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddAccountRequest;
use App\Models\OrgUnit;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserAccountController extends Controller
{
    public function index(Request $request)
    {
        $orgUnits = OrgUnit::all();
        return Inertia::render('account-list/page', [
            'orgUnits' => $orgUnits
        ]);
    }

    public function store(AddAccountRequest $request)
    {
        $validatedData = $request->validated();

        $user = new User();
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->password = bcrypt($validatedData['password']);
        $user->role = $validatedData['role'];
        $user->org_unit_id = $validatedData['org_unit_id'] ?? null;
        $user->is_active = $validatedData['is_active'];
        $user->save();

        return redirect()->route('accounts.index')->with('success', 'User account created successfully.');

    }
}
