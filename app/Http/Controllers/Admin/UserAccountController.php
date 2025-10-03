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
    // public function index(Request $request)
    // {
    //     $orgUnits = OrgUnit::all();
    //     return Inertia::render('account-list/page', [
    //         'orgUnits' => $orgUnits,
    //         'paginationUser' => Inertia::scroll(fn() => User::with('orgUnit')->withTrashed()->paginate()),
    //     ]);
    // }

    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $orgUnits = OrgUnit::all();

        // Buat query dengan relasi
        $query = User::with('orgUnit');

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


        if (!request()->header('X-inertia')) {
            $allResults = collect();

            for ($initialPage = 1; $initialPage <= $page; $initialPage++) {
                // Buat query baru dengan relasi untuk setiap halaman
                $pageQuery = User::with('orgUnit');

                // Tambahkan kondisi search yang sama
                if ($search) {
                    $pageQuery->where(function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%')
                            ->orWhere('email', 'like', '%' . $search . '%')
                            ->orWhere('role', 'like', '%' . $search . '%')
                            ->orWhereHas('orgUnit', function ($q) use ($search) {
                                $q->where('name', 'like', '%' . $search . '%');
                            });
                    });
                }

                $pageResults = $pageQuery->paginate(20, ['*'], 'page', $initialPage);
                $allResults = $allResults->concat($pageResults->items());
            }

            return Inertia::render('account-list/page', [
                'users' => $allResults,
                'paginationUser' => new \Illuminate\Pagination\LengthAwarePaginator(
                    $allResults,
                    $users->total(),
                    $users->perPage(),
                    $page,
                    ['path' => request()->url(), 'query' => request()->query()]
                ),
                'page' => $page,
                'orgUnits' => $orgUnits,
            ]);
        }

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
