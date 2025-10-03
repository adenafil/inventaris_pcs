<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddAccountRequest;
use App\Http\Requests\Admin\EditUserAccountRequest;
use App\Models\OrgUnit;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserAccountController extends Controller
{
    public function index(Request $request)
    {
        $orgUnits = OrgUnit::all();
        $paginationUser = User::with('orgUnit')->withTrashed()->paginate(10);
        return Inertia::render('account-list/page', [
            'orgUnits' => $orgUnits,
            'paginationUser' => Inertia::scroll(fn() => $paginationUser),
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
        $user->save();

        return redirect()->route('accounts.index')->with('success', 'User account created successfully.');
    }

    public function update(EditUserAccountRequest $request)
    {
        $validatedData = $request->validated();

        // check email unique except for current user
        $user = User::where('email', $validatedData['email'])
            ->where('id', '!=', $validatedData['id'])
            ->first();

        if ($user) {
            return redirect()->back()->withErrors(['email' => 'The email has already been taken.'])->withInput();
        }

        $user = User::findOrFail($validatedData['id']);
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        if (!empty($validatedData['password'])) {
            $user->password = bcrypt($validatedData['password']);
        }
        $user->role = $validatedData['role'];
        $user->org_unit_id = $validatedData['org_unit_id'] ?? null;
        $user->save();

        return redirect()->route('accounts.index')->with('success', 'User account updated successfully.');
    }

    public function toggleSoftDelete($id)
    {
        $user = User::withTrashed()->findOrFail($id);

        if ($user->trashed()) {
            $user->restore();
            $message = 'User account restored successfully.';
        } else {
            $user->delete();
            $message = 'User account deleted successfully.';
        }

        return redirect()->route('accounts.index')->with('success', $message);
    }

}
