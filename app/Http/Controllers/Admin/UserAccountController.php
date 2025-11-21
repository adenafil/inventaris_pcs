<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AddAccountRequest;
use App\Http\Requests\Admin\EditUserAccountRequest;
use App\Models\OrgUnit;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Inertia\Inertia;

class UserAccountController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $orgUnits = OrgUnit::all();

        // Buat query dengan relasi
        $query = User::with('orgUnit', 'logs')->withTrashed();

        // Tambahkan kondisi search untuk multiple fields
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('role', 'like', '%' . $search . '%')
                    ->orWhereHas('orgUnit', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    });
            });
        }

        $page = request()->get('page', 1);
        $users = $query->paginate(20)->withQueryString();

        $users->getCollection()->transform(function ($user) {
            $user->logs = $user->logs->map->toFrontendFormat();
            return $user;
        });

        return Inertia::render('account-list/page', [
            'users' => Inertia::merge(fn() => $users->items()),
            'paginationUser' => $users,
            'page' => $page,
            'orgUnits' => $orgUnits,
        ]);
    }

    public function store(AddAccountRequest $request)
    {
        $validatedData = $request->validated();

        $user = new User();
        $user->name = $validatedData['name'];
        $user->username = $validatedData['username'];
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
        Logger()->info('Validated Data: ', $validatedData);

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
        $user->username = $validatedData['username'];
        if (!empty($validatedData['password']) && $validatedData['password'] !== null) {
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
