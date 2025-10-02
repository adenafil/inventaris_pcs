<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetModel extends Model
{
    protected $table = 'asset_models';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'type_id',
        'brand',
        'model',
        'details'
    ];

    public function type()
    {
        return $this->belongsTo(DataType::class, 'type_id');
    }

    public function assets()
    {
        return $this->hasMany(Asset::class, 'model_id');
    }
}
