'use client';
import { Input } from '@/components/ui/input';
import { FileText, X } from 'lucide-react';

export type UploadItem = {
    id: string;
    file: File;
    previewUrl?: string;
    kind: 'image' | 'pdf' | 'other';
};

type FileUploadProps = {
    value: UploadItem[];
    onChange: (items: UploadItem[]) => void;
};

export function FileUpload({ value, onChange }: FileUploadProps) {
    const onFiles = (files: FileList | null) => {
        if (!files) return;
        const accepted: UploadItem[] = [];
        Array.from(files).forEach((file) => {
            const ext = file.name.toLowerCase();
            const isImage = file.type.startsWith('image/');
            const isPdf =
                file.type === 'application/pdf' || ext.endsWith('.pdf');
            if (!(isImage || isPdf)) {
                console.log('[v0] rejected non-image/pdf:', file.name);
                return;
            }
            const id = `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`;
            if (isImage) {
                const url = URL.createObjectURL(file);
                accepted.push({ id, file, previewUrl: url, kind: 'image' });
            } else if (isPdf) {
                accepted.push({ id, file, kind: 'pdf' });
            }
        });
        const next = [...value, ...accepted];
        onChange(next);
        console.log(
            '[v0] files added:',
            next.map((i) => i.file.name),
        );
    };

    const remove = (id: string) => {
        const next = value.filter((v) => v.id !== id);
        onChange(next);
        console.log('[v0] file removed:', id);
    };

    return (
        <div className="grid gap-3">
            <Input
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={(e) => onFiles(e.target.files)}
            />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {value.map((item) => (
                    <div
                        key={item.id}
                        className="relative rounded-md border bg-card p-2"
                    >
                        <button
                            type="button"
                            aria-label="Remove file"
                            className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background/80"
                            onClick={() => remove(item.id)}
                        >
                            <X className="h-4 w-4" />
                        </button>
                        {item.kind === 'image' && item.previewUrl ? (
                            <img
                                src={item.previewUrl || '/placeholder.svg'}
                                alt={item.file.name}
                                className="h-28 w-full rounded object-cover"
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <div className="flex h-28 w-full items-center justify-center">
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <FileText className="h-8 w-8" />
                                    <span className="text-xs">
                                        {item.file.name}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="text-xs text-muted-foreground">
                Only images and PDFs are allowed.
            </div>
        </div>
    );
}
