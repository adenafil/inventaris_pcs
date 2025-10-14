<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin IT',
            'username' => 'adminit',
            'email' => 'adminit@pcs.com',
            'password' => bcrypt('rahasiadong'),
            'role' => 'admin_it',
        ]);

        User::create([
            'name' => 'Admin Kantor',
            'username' => 'adminkantor',
            'email' => 'admin.kantor@pcs.com',
            'password' => bcrypt('rahasiadong'),
            'role' => 'admin_kantor',
        ]);

        User::create([
            'name' => 'superadmin',
            'username' => 'superadmin',
            'email' => 'superadmin@pcs.com',
            'password' => bcrypt('rahasiadong'),
            'role' => 'superadmin',
    ]);
    }
}
