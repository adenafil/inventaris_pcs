<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'employees';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'nip',
        'name',
        'email',
        'org_unit_id',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function orgUnit()
    {
        return $this->belongsTo(OrgUnit::class, 'org_unit_id');
    }

    public function assets()
    {
        return $this->hasMany(Asset::class, 'owner_employee_id');
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'employee_id');
    }
}
