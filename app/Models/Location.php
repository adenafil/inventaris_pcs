<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $table = 'locations';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;


    protected $fillable = [
        'code',
        'name'
    ];

    public function assets()
    {
        return $this->hasMany(Asset::class, 'location_id');
    }
}
