'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import * as React from 'react';

type QrModalProps = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    value: string;
    title?: string;
};

export function QrModal({
    open,
    onOpenChange,
    value,
    title = 'QR Code',
}: QrModalProps) {
    const [dataUrl, setDataUrl] = React.useState<string>('');


    const onDownload = () => {
        if (!dataUrl) return;
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'asset-qr.png';
        a.click();
        console.log('[v0] Download QR for:', value);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="flex items-center justify-center rounded-md border bg-card p-4">
                        {dataUrl ? (
                            <img
                                src={dataUrl || '/placeholder.svg'}
                                alt="QR code"
                                className="h-auto w-56"
                            />
                        ) : (
                            <div className="text-sm text-muted-foreground">
                                Generating QR…
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm">Encoded Value</label>
                        <Input readOnly value={value} />
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                    <Button onClick={onDownload}>Download</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
