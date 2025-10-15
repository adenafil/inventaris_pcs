<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    protected $table = 'user_logs';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'action',
        'model_type',
        'model_id',
        'description',
        'changes',
        'ip_address',
        'user_agent'
    ];

    protected $casts = [
        'changes' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public static function getRecentByUser($userId, $limit = 10)
    {
        return static::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function toFrontendFormat()
    {
        return [
            'id' => (string) $this->id,
            'timestamp' => $this->created_at->toIso8601String(),
            'action' => $this->getFormattedAction(),
            'detail' => $this->description,
        ];
    }

    private function getFormattedAction()
    {
        $actionMap = [
            'created' => 'Menambahkan',
            'updated' => 'Mengubah',
            'deleted' => 'Menghapus',
        ];

        return ($actionMap[$this->action] ?? $this->action) . ' ' . $this->model_type;
    }
}
