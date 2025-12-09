'use client';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pencil, Plus, Settings2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { router, useForm } from '@inertiajs/react';
import { Pagination } from '../add/_types';
import { Pagination as PaginationComponent, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

export type InventoryPrefix = {
    code: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
};

type Props = {
    prefixes?: Pagination<{  code: string; name: string; description?: string, created_at: string; updated_at: string }>;
    onPrefixesChange?: (prefixes: InventoryPrefix[]) => void;
};

export function InventoryPrefixManager({ prefixes, onPrefixesChange }: Props) {
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editMode, setEditMode] = useState<'add' | 'edit'>('add');
    const [currentPrefix, setCurrentPrefix] = useState<InventoryPrefix | null>(null);
    const mutationForm = useForm({
        code: '',
        name: '',
        description: '',
    });


    useEffect(() => {
        console.log(mutationForm.data);
    }, [mutationForm.data])

    const handleAdd = () => {
        setEditMode('add');
        mutationForm.setData({ code: '', name: '', description: '' });
        setDialogOpen(true);
    };

    const handleEdit = (prefix: InventoryPrefix) => {
        setEditMode('edit');
        setCurrentPrefix(prefix);
        mutationForm.setData({
            code: prefix.code,
            name: prefix.name,
            description: prefix.description || '',
        });
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        // TODO: Implement delete functionality with backend
        router.delete(`/master/prefixes/${id}`, {
            onSuccess: () => {
                toast.success('Prefix berhasil dihapus!');
            },
            onError: () => {
                toast.error('Gagal menghapus prefix. Silakan coba lagi.');
            }
        });
        console.log('Delete prefix:', id);
    };

    const handleSubmit = () => {
        if (!mutationForm.data.code || !mutationForm.data.name) {
            toast.error('Kode dan nama prefix wajib diisi');
            return;
        }

        // TODO: Implement save functionality with backend
        if (editMode === 'add') {

            mutationForm.post("/master/prefixes", {
                onSuccess: () => {
                    toast.success('Prefix berhasil ditambahkan!');
                },
                onError: () => {
                    toast.error('Gagal menambahkan prefix. Silakan coba lagi.');
                }
            })

            console.log('Add prefix:', mutationForm.data);
        } else {
            mutationForm.post(`/master/prefixes/${currentPrefix?.code}?_method=PATCH`, {
                onSuccess: () => {
                    toast.success('Prefix berhasil diperbarui!');
                },
                onError: () => {
                    toast.error('Gagal memperbarui prefix. Silakan coba lagi.');
                }
            });
            console.log('Update prefix:',  mutationForm.data );
        }

        setDialogOpen(false);
        mutationForm.setData({ code: '', name: '', description: '' });
        setCurrentPrefix(null);
    };

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Settings2 className="mr-2 h-4 w-4" />
                        Kelola Prefix
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-2xl">
                    <SheetHeader>
                        <SheetTitle>Kelola Prefix Nomor Inventaris</SheetTitle>
                        <SheetDescription>
                            Tambah, edit, atau hapus prefix untuk nomor inventaris aset
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-4 m-3">
                        <div className="flex justify-end">
                            <Button onClick={handleAdd} size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Prefix
                            </Button>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Kode</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead className="w-[100px] text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {prefixes?.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-24 text-center"
                                            >
                                                Belum ada prefix. Tambahkan prefix baru.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        
                                        prefixes?.data.map((prefix) => (
                                            <TableRow key={prefix.code}>
                                                <TableCell className="font-mono font-semibold">
                                                    {prefix.code}
                                                </TableCell>
                                                <TableCell>{prefix.name}</TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {prefix.description || '-'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEdit(prefix)}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(prefix.code)}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                                        {(prefixes?.data.length ?? 0) > 0 && (
                                            <div className="flex items-center justify-end p-4">
                                                <PaginationComponent>
                                                    <PaginationContent>
                                                        <PaginationItem>
                                                            <PaginationPrevious
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    router.visit(
                                                                        prefixes?.links[0]
                                                                            .url ?? '#',
                                                                        {
                                                                            preserveScroll: true,
                                                                            preserveState: true
                                                                        },
                                                                    );
                                                                }}
                                                                aria-disabled={
                                                                    prefixes?.prev_page_url ===
                                                                    null
                                                                }
                                                                className={
                                                                    prefixes?.prev_page_url ===
                                                                    null
                                                                        ? 'pointer-events-none opacity-50'
                                                                        : ''
                                                                }
                                                            />
                                                        </PaginationItem>
                                                        {prefixes?.links.map(
                                                            (link, index) =>
                                                                !isNaN(Number(link.label)) && (
                                                                    <PaginationItem key={index}>
                                                                        <PaginationLink
                                                                            isActive={link.active}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                router.visit(
                                                                                    link.url ?? '#',
                                                                                    {
                                                                            preserveScroll: true,
                                                                            preserveState: true
                                                                                    },
                                                                                );
                                                                            }}
                                                                        >
                                                                            {link.label}
                                                                        </PaginationLink>
                                                                    </PaginationItem>
                                                                ),
                                                        )}
                                                        <PaginationItem>
                                                            <PaginationNext
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    router.visit(
                                                                        prefixes?.links[
                                                                            prefixes?.links
                                                                                .length -
                                                                                1
                                                                        ].url ?? '#',
                                                                        {
                                                                            preserveScroll: true,
                                                                            preserveState: true
                                                                        },
                                                                    );
                                                                }}
                                                                aria-disabled={
                                                                    prefixes?.next_page_url ===
                                                                    null
                                                                }
                                                                className={
                                                                    prefixes?.next_page_url ===
                                                                    null
                                                                        ? 'pointer-events-none opacity-50'
                                                                        : ''
                                                                }
                                                            />
                                                        </PaginationItem>
                                                    </PaginationContent>
                                                </PaginationComponent>
                                            </div>
                                        )}
                    
                </SheetContent>
            </Sheet>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editMode === 'add' ? 'Tambah' : 'Edit'} Prefix Inventaris
                        </DialogTitle>
                        <DialogDescription>
                            {editMode === 'add'
                                ? 'Tambahkan prefix baru untuk nomor inventaris'
                                : 'Edit informasi prefix inventaris'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="code">
                                Kode Prefix <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="code"
                                placeholder="HP, PC, LPT, dll"
                                value={mutationForm.data.code}
                                onChange={(e) =>
                                    mutationForm.setData('code', e.target.value.toUpperCase())
                                }
                                className="font-mono uppercase"
                                maxLength={10}
                            />
                            <p className="text-xs text-muted-foreground">
                                Maksimal 10 karakter, akan otomatis uppercase
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Nama <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="Contoh: Handphone, Komputer PC, Laptop"
                                value={mutationForm.data.name}
                                onChange={(e) =>
                                    mutationForm.setData('name', e.target.value)
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Deskripsi (Opsional)</Label>
                            <Input
                                id="description"
                                placeholder="Deskripsi singkat tentang kategori aset"
                                value={mutationForm.data.description}
                                onChange={(e) =>
                                    mutationForm.setData('description', e.target.value)
                                }
                            />
                        </div>

                        <div className="rounded-md bg-muted p-3">
                            <p className="text-sm font-medium">Preview Nomor Inventaris:</p>
                            <p className="mt-1 font-mono text-lg font-semibold">
                                {mutationForm.data.code || 'XXX'}-5bd96268
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setDialogOpen(false);
                                mutationForm.setData({ code: '', name: '', description: '' });
                                setCurrentPrefix(null);
                            }}
                        >
                            Batal
                        </Button>
                        <Button onClick={handleSubmit}>
                            {editMode === 'add' ? 'Tambah' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
