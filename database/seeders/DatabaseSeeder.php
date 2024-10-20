<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Clients;
use App\Models\Customer;
use App\Models\Job;
use App\Models\Role;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $client = Clients::create([
            'name' => 'Bagus'
        ]);

        $admin_role = Role::create(['name' => 'Admin', 'code' => 'ADM']);
        $employee_role = Role::create(['name' => 'Employee', 'code' => 'EMP']);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
            // 'client_id' => $client->id
        ]);
        $admin->roles()->attach($admin_role->id);

        $employee = User::create([
            'name' => 'Employee',
            'email' => 'employee@gmail.com',
            'password' => bcrypt('employee123')
        ]);
        $employee->roles()->attach($employee_role->id);

        $customer = Customer::create(['name' => 'Bangkit']);

        $service = Service::create(['name' => 'Cleaning', 'default_price' => '50000']);
        $job = Job::create([
            'description' => 'test',
            'customer_id' => $customer->id,
            'created_by' => $employee->id,
        ]);
        $job->services()->attach([
            $service->id => ['price' => 100000]
        ]);
    }
}
