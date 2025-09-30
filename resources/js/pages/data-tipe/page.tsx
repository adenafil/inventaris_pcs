import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Tipe',
        href: '/master/types',
    },
];

interface DataType {
    id: number;
    namaTipe: string;
}

const initialData: DataType[] = [
    { id: 1, namaTipe: 'String' },
    { id: 2, namaTipe: 'Integer' },
    { id: 3, namaTipe: 'Boolean' },
    { id: 4, namaTipe: 'Date' },
    { id: 5, namaTipe: 'Float' },
    { id: 6, namaTipe: 'Text' },
    { id: 7, namaTipe: 'JSON' },
    { id: 8, namaTipe: 'Array' },
];

export default function Page() {
    const [dataTypes, setDataTypes] = useState<DataType[]>(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<DataType | null>(null);
    const [formData, setFormData] = useState({ namaTipe: '' });

    const filteredData = dataTypes.filter((item) =>
        item.namaTipe.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const formAddTipe = useForm('post', '/master/types', {
        code: '',
        name: '',
    }, {

    })

    const handleSubmit = () => {
        const uuid = crypto.randomUUID();
        formAddTipe.setData('code', uuid);
        formAddTipe.submit({
            onSuccess: () => {
                setIsAddModalOpen(false);
                formAddTipe.reset();
                toast.success('Data tipe berhasil ditambahkan');
            },
            onValidationError: (error) => {
                console.log(error);

                toast.error(error.data.message || 'Terjadi kesalahan validasi');
             }
        })
    };

    const handleEdit = () => {
        if (!formData.namaTipe.trim() || !editingItem) {
            console.log('Nama tipe tidak boleh kosong');
            return;
        }

        setDataTypes(
            dataTypes.map((item) =>
                item.id === editingItem.id
                    ? { ...item, namaTipe: formData.namaTipe.trim() }
                    : item,
            ),
        );
        setFormData({ namaTipe: '' });
        setEditingItem(null);
        setIsEditModalOpen(false);
        console.log('Data tipe berhasil diperbarui');
    };

    const handleDelete = (id: number) => {
        setDataTypes(dataTypes.filter((item) => item.id !== id));
        console.log('Data tipe berhasil dihapus');
    };

    const openEditModal = (item: DataType) => {
        setEditingItem(item);
        setFormData({ namaTipe: item.namaTipe });
        setIsEditModalOpen(true);
    };

    const resetForm = () => {
        setFormData({ namaTipe: '' });
        setEditingItem(null);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tipe" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Data Tipe
                        </h1>
                        <p className="text-gray-600">
                            Kelola data tipe perangkat di dalam sistem.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full space-y-4 px-4 sm:px-6 lg:px-8">
                    {/* Search and Add Section */}
                    {/* Data Table */}
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Manajemen Data Tipe
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-4">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                    <Input
                                        placeholder="Cari lokasi..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>

                                {/* Add Data Modal */}
                                <div>
                                    <Dialog
                                        open={isAddModalOpen}
                                        onOpenChange={setIsAddModalOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button className="flex items-center gap-2 w-full">
                                                <Plus className="h-4 w-4" />
                                                Tambah
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Tambah Data Tipe Baru
                                                </DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription asChild>
                                                <div className="space-y-4 pt-4">
                                                    <div>
                                                        <Label htmlFor="new-location-name">
                                                            Nama
                                                        </Label>
                                                        <Input
                                                            id="new-location-name"
                                                            value={formAddTipe.data.name}
                                                            onChange={(e) =>
                                                                formAddTipe.setData(
                                                                    'name',
                                                                    e.target.value,
                                                                )
                                                            }
                                                            className="mt-1 border-border bg-background"
                                                            placeholder="Masukkan nama lokasi"
                                                            onKeyDown={(e) =>
                                                                e.key ===
                                                                    'Enter' &&
                                                                handleSubmit()
                                                            }
                                                            onBlur={() => {
                                                                formAddTipe.validate('name');
                                                            }}
                                                        />
                                                        {formAddTipe.invalid('name') && (
                                                            <p className="mt-1 text-sm text-destructive">
                                                                {
                                                                    formAddTipe.errors.name
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => {
                                                                setIsAddModalOpen(
                                                                    false,
                                                                );
                                                            }}
                                                        >
                                                            Batal
                                                        </Button>
                                                        <Button disabled={formAddTipe.processing} onClick={() => handleSubmit()}>
                                                            {formAddTipe.processing ? 'Menyimpan...' : 'Simpan'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </DialogDescription>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border/50 hover:bg-muted/50">
                                            <TableHead className="font-semibold text-muted-foreground">
                                                ID
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                Nama Tipe
                                            </TableHead>
                                            <TableHead className="text-right font-semibold text-muted-foreground">
                                                Aksi
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredData.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="py-8 text-center text-muted-foreground"
                                                >
                                                    {searchTerm
                                                        ? 'Tidak ada data yang ditemukan'
                                                        : 'Belum ada data tipe'}
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredData.map((item) => (
                                                <TableRow
                                                    key={item.id}
                                                    className="border-border/50 hover:bg-muted/30"
                                                >
                                                    <TableCell className="font-mono text-sm">
                                                        <Badge
                                                            variant="outline"
                                                            className="border-border/50"
                                                        >
                                                            {item.id}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="font-medium text-card-foreground">
                                                        {item.namaTipe}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    openEditModal(
                                                                        item,
                                                                    )
                                                                }
                                                                className="border-border/50 hover:bg-accent"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.id,
                                                                    )
                                                                }
                                                                className="border-destructive/50 text-destructive hover:bg-destructive/10"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Modal */}
                    <Dialog
                        open={isEditModalOpen}
                        onOpenChange={setIsEditModalOpen}
                    >
                        <DialogContent className="border-border bg-card">
                            <DialogHeader>
                                <DialogTitle className="text-card-foreground">
                                    Edit Data Tipe
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="editNamaTipe"
                                        className="text-card-foreground"
                                    >
                                        Nama Tipe
                                    </Label>
                                    <Input
                                        id="editNamaTipe"
                                        placeholder="Masukkan nama tipe..."
                                        value={formData.namaTipe}
                                        onChange={(e) =>
                                            setFormData({
                                                namaTipe: e.target.value,
                                            })
                                        }
                                        className="border-border bg-background"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        resetForm();
                                    }}
                                    className="border-border hover:bg-accent"
                                >
                                    Batal
                                </Button>
                                <Button
                                    onClick={handleEdit}
                                    className="bg-primary hover:bg-primary/90"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    );
}
