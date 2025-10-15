<?php

namespace App\Models;

use App\Traits\LogsUserActivity;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use LogsUserActivity;

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
