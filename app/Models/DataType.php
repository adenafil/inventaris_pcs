<?php

namespace App\Models;

use App\Traits\LogsUserActivity;
use Illuminate\Database\Eloquent\Model;

class DataType extends Model
{
    use LogsUserActivity;
    
    protected $table = 'data_types';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'code',
        'name'
    ];

    public function assetModels()
    {
        return $this->hasMany(AssetModel::class, 'type_id');
    }

    public function assets()
    {
        return $this->hasMany(Asset::class, 'type_id');
    }

}
