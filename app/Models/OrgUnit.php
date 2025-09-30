<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrgUnit extends Model
{
    protected $table = 'org_units';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;


    protected $fillable = [
        'code', 'name'
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'org_unit_id');
    }
}
