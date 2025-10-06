'use client';
import { Input } from '@/components/ui/input';
import { FileText, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { Document } from '../edit/_types';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export type UploadItem = {
    id: string;
    file: File;
    previewUrl?: string;
    kind: 'image' | 'pdf' | 'other';
};

type FileUploadProps = {
    value: UploadItem[];
    onChange: (items: UploadItem[]) => void;
    documents?: Document[];
};

export function FileUpload({ value, onChange, documents }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onFiles = (files: FileList | null) => {
        if (!files) return;
        const accepted: UploadItem[] = [];
        Array.from(files).forEach((file) => {
            const ext = file.name.toLowerCase();
            const isImage = file.type.startsWith('image/');
            const isPdf =
                file.type === 'application/pdf' || ext.endsWith('.pdf');
            if (!(isImage || isPdf)) {
                console.log('rejected non-image/pdf:', file.name);
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
            'files added:',
            next.map((i) => i.file.name),
        );
    };

    const remove = (id: string) => {
        const next = value.filter((v) => v.id !== id);
        onChange(next);
        console.log('file removed:', id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        onFiles(e.dataTransfer.files);
    };

    return (
        <div className="grid gap-3">
            <div
                className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                    isDragging
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <Input
                    multiple
                    accept="image/*,application/pdf"
                    className="hidden"
                    id="image-upload"
                    type="file"
                    onChange={(e) => onFiles(e.target.files)}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <div className="text-sm text-gray-600">
                            <span className="font-medium text-blue-600 hover:text-blue-500">
                                Click to upload
                            </span>{' '}
                            or drag and drop
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, PDF up to 10MB each
                        </p>
                    </div>
                </label>
            </div>

            {value.length > 0 && (
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
            )}

            {documents && documents.length > 0 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            className="relative rounded-md border bg-card p-2"
                        >
                            <button
                                type="button"
                                aria-label="Remove file"
                                className={`absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background/80 ${
                                    documents.length === 1 || isLoading
                                        ? 'cursor-not-allowed opacity-50'
                                        : ''
                                }`}
                                disabled={documents.length === 1 || isLoading}
                                onClick={() =>
                                    router.delete(
                                        `/master/assets/delete/document/${doc.id}`,
                                        {
                                            preserveScroll: true, onSuccess: () => {
                                                toast.success('Document successfully deleted');
                                                setIsLoading(false);
                                            }
                                        , onBefore: () => setIsLoading(true) }
                                    )
                                }
                            >
                                <X className="h-4 w-4" />
                            </button>
                            {doc.file_path.endsWith('.jpg') ||
                            doc.file_path.endsWith('.jpeg') ||
                            doc.file_path.endsWith('.png') ? (
                                <img
                                    src={
                                        `/storage/${doc.file_path}` ||
                                        '/placeholder.svg'
                                    }
                                    alt={doc.file_path}
                                    className="h-28 w-full rounded object-cover"
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <div className="flex h-28 w-full items-center justify-center">
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <FileText className="h-8 w-8" />
                                        <span className="text-xs">
                                            {doc.file_path.split('/').pop()}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
