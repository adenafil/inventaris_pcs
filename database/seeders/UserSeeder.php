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
            'email' => 'adminit@pcs.com',
            'password' => bcrypt('rahasiadong'),
            'role' => 'admin_it',
        ]);

        User::create([
            'name' => 'Staff IT',
            'email' => 'staffit@pcs.com',
            'password' => bcrypt('rahasiadong'),
            'role' => 'staff_it',
        ]);
    }
}
