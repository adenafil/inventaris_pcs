import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteAssetBtn({
    assetId,
    className = 'w-full sm:w-auto',
}: {
    assetId: number;
    className?: string;
}) {
    const [loading, setLoading] = useState(false);

    const handleDelete = (assetId: number) => {
        router.delete(`/master/assets/${assetId}`, {
            onBefore: () => setLoading(true),
            onFinish: () => setLoading(false),
            onSuccess: () => {
                toast.success('Asset deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete asset');
            },
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    variant="destructive"
                    className={className}
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure want to delete this Asset?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the asset from the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        disabled={loading}
                        onClick={() => handleDelete(assetId)}
                        variant="destructive"
                    >
                        {loading ? 'Deleting...' : 'Sure'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
