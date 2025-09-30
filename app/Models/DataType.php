<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataType extends Model
{
    protected $table = 'data_types';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'code',
        'name'
    ];

}
