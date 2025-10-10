import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { Loader2, Undo2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ReturnBtn({ assignmentId }: { assignmentId: number }) {
    const [loading, setLoading] = useState(false);

    const handleReturn = (assignmentId: number) => {
        router.post(
            `/master/assets/assignment/${assignmentId}?_method=PATCH`,
            {},
            {
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: () => {
                    toast.success('Asset returned successfully');
                },
                preserveScroll: true,
            },
        );
    };

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={() => handleReturn(assignmentId)}
        >
            {loading ? (
                <>
                    <Loader2 className="ml-2 animate-spin" />
                    returning...
                </>
            ) : (
                <>
                    <Undo2 />
                    return
                </>
            )}
        </Button>
    );
}
