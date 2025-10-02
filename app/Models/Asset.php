<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Schema::create('assets', function (Blueprint $table) {
//     $table->id();
//     $table->string('inventory_number')->unique();
//     $table->unsignedBigInteger('type_id');
//     $table->unsignedBigInteger('model_id');
//     $table->string('serial_number')->nullable();
//     $table->string('item_name')->nullable();
//     $table->date('purchase_date')->nullable();
//     $table->date('purchase_year')->nullable();
//     $table->date('warranty_expiration')->nullable();
//     $table->string('status')->default('active');
//     $table->unsignedBigInteger('location_id')->nullable();
//     $table->string('owner_type')->default('org');
//     $table->unsignedBigInteger('owner_employee_id')->nullable();
//     $table->unsignedBigInteger('owner_org_unit_id')->nullable();
//     $table->timestamps();

//     $table->foreign('type_id')->references('id')->on('data_types')->onDelete('cascade');
//     $table->foreign('model_id')->references('id')->on('asset_models')->onDelete('cascade');
//     $table->foreign('location_id')->references('id')->on('locations')->onDelete('set null');
//     $table->foreign('owner_employee_id')->references('id')->on('employees')->onDelete('set null');
//     $table->foreign('owner_org_unit_id')->references('id')->on('org_units')->onDelete('set null');
// });


class Asset extends Model
{
    protected $table = 'assets';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'inventory_number',
        'type_id',
        'model_id',
        'serial_number',
        'item_name',
        'purchase_date',
        'purchase_year',
        'warranty_expiration',
        'status',
        'location_id',
        'owner_type',
        'owner_employee_id',
        'owner_org_unit_id'
    ];

    public function type()
    {
        return $this->belongsTo(DataType::class, 'type_id');
    }

    public function model()
    {
        return $this->belongsTo(AssetModel::class, 'model_id');
    }

    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

    public function ownerEmployee()
    {
        return $this->belongsTo(Employee::class, 'owner_employee_id');
    }

    public function ownerOrgUnit()
    {
        return $this->belongsTo(OrgUnit::class, 'owner_org_unit_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'asset_id');
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'asset_id');
    }

    public function assignedUsers()
    {
        return $this->belongsToMany(User::class, 'assignments', 'asset_id', 'employee_id')
            ->withPivot(['assigned_at', 'returned_at', 'created_by'])
            ->withTimestamps();
    }
}

