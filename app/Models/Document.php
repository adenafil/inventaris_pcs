<?php

namespace App\Models;

use App\Traits\LogsUserActivity;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use LogsUserActivity;

    protected $table = 'documents';

    protected $fillable = [
        'asset_id',
        'file_path',
        'uploaded_by',
        'upload_date'
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class, 'asset_id');
    }

    public function uploadedBy()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
