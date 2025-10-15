<?php

namespace App\Models;

use App\Traits\LogsUserActivity;
use Illuminate\Database\Eloquent\Model;

class OrgUnit extends Model
{
    use LogsUserActivity;

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

    public function assets()
    {
        return $this->hasMany(Asset::class, 'org_unit_id');
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'org_unit_id');
    }
}
