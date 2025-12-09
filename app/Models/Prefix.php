<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\LogsUserActivity;

class Prefix extends Model
{
    use LogsUserActivity;

    protected $table = 'prefixes';
    protected $primaryKey = 'code';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'code', 'name', 'description'
    ];

}
