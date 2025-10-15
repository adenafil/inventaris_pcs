<?php

namespace App\Traits;

use App\Models\UserLog;

trait LogsUserActivity
{
    protected static function bootLogsUserActivity()
    {
        static::created(function ($model) {
            self::logActivity('created', $model);
        });

        static::updated(function ($model) {
            self::logActivity('updated', $model, $model->getChanges());
        });

        static::deleted(function ($model) {
            self::logActivity('deleted', $model);
        });
    }

    protected static function logActivity($action, $model, $changes = null)
    {
        if (!auth()->check()) {
            return;
        }

        $description = self::generateDescription($action, $model, $changes);

        UserLog::create([
            'user_id' => auth()->id(),
            'action' => $action,
            'model_type' => class_basename($model),
            'model_id' => $model->id ?? null,
            'description' => $description,
            'changes' => $changes,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);

        self::pruneOldLogs(auth()->id());
    }

    protected static function generateDescription($action, $model, $changes = null)
    {
        $modelName = class_basename($model);
        $identifier = $model->name ?? $model->inventory_number ?? $model->id;

        $descriptions = [
            'created' => "Menambahkan {$modelName}: {$identifier}",
            'updated' => "Mengubah {$modelName}: {$identifier}",
            'deleted' => "Menghapus {$modelName}: {$identifier}",
        ];

        return $descriptions[$action] ?? "Melakukan {$action} pada {$modelName}";
    }

    protected static function pruneOldLogs($userId)
    {
        $logs = UserLog::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        if ($logs->count() > 10) {
            $logsToDelete = $logs->slice(10);
            UserLog::whereIn('id', $logsToDelete->pluck('id'))->delete();
        }
    }
}
