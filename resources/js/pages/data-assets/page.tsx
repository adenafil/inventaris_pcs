import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
import {
    DropdownMenuCheckboxItem,
    DropdownMenuCheckboxItemProps,
} from '@radix-ui/react-dropdown-menu';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Aset',
        href: '/master/assets',
    },
];

interface DataType {
    id: number;
    nomorInventaris: string;
    item: string;
    tipe: string;
    brand: string;
    pemakai: string;
    bidang: string;
    lokasi: string;
    tahun: string;
}

// const initialData: DataType[] = [
//     { id: 1, namaTipe: 'String' },
//     { id: 2, namaTipe: 'Integer' },
//     { id: 3, namaTipe: 'Boolean' },
//     { id: 4, namaTipe: 'Date' },
//     { id: 5, namaTipe: 'Float' },
//     { id: 6, namaTipe: 'Text' },
//     { id: 7, namaTipe: 'JSON' },
//     { id: 8, namaTipe: 'Array' },
// ];

const initialDataTipe: { id: number; tipe: string }[] = [
    { id: 1, tipe: 'Tipe 1' },
    { id: 2, tipe: 'Tipe 1' },
    { id: 3, tipe: 'Tipe 2' },
    { id: 4, tipe: 'Tipe 2' },
    { id: 5, tipe: 'Tipe 3' },
    { id: 6, tipe: 'Tipe 3' },
    { id: 7, tipe: 'Tipe 4' },
    { id: 8, tipe: 'Tipe 4' },
];

const initialDataAset: DataType[] = [
    {
        id: 1,
        nomorInventaris: 'String',
        item: 'Item 1',
        tipe: 'Tipe 1',
        brand: 'Brand 1',
        pemakai: 'Pemakai 1',
        bidang: 'Bidang 1',
        lokasi: 'Lokasi 1',
        tahun: '2021',
    },
    {
        id: 2,
        nomorInventaris: 'Integer',
        item: 'Item 2',
        tipe: 'Tipe 2',
        brand: 'Brand 2',
        pemakai: 'Pemakai 2',
        bidang: 'Bidang 2',
        lokasi: 'Lokasi 2',
        tahun: '2022',
    },
    {
        id: 3,
        nomorInventaris: 'Boolean',
        item: 'Item 3',
        tipe: 'Tipe 3',
        brand: 'Brand 3',
        pemakai: 'Pemakai 3',
        bidang: 'Bidang 3',
        lokasi: 'Lokasi 3',
        tahun: '2023',
    },
    {
        id: 4,
        nomorInventaris: 'Date',
        item: 'Item 4',
        tipe: 'Tipe 4',
        brand: 'Brand 4',
        pemakai: 'Pemakai 4',
        bidang: 'Bidang 4',
        lokasi: 'Lokasi 4',
        tahun: '2024',
    },
    {
        id: 5,
        nomorInventaris: 'Float',
        item: 'Item 5',
        tipe: 'Tipe 5',
        brand: 'Brand 5',
        pemakai: 'Pemakai 5',
        bidang: 'Bidang 5',
        lokasi: 'Lokasi 5',
        tahun: '2025',
    },
    {
        id: 6,
        nomorInventaris: 'Text',
        item: 'Item 6',
        tipe: 'Tipe 6',
        brand: 'Brand 6',
        pemakai: 'Pemakai 6',
        bidang: 'Bidang 6',
        lokasi: 'Lokasi 6',
        tahun: '2026',
    },
    {
        id: 7,
        nomorInventaris: 'JSON',
        item: 'Item 7',
        tipe: 'Tipe 7',
        brand: 'Brand 7',
        pemakai: 'Pemakai 7',
        bidang: 'Bidang 7',
        lokasi: 'Lokasi 7',
        tahun: '2027',
    },
    {
        id: 8,
        nomorInventaris: 'Array',
        item: 'Item 8',
        tipe: 'Tipe 8',
        brand: 'Brand 8',
        pemakai: 'Pemakai 8',
        bidang: 'Bidang 8',
        lokasi: 'Lokasi 8',
        tahun: '2028',
    },
];
type Checked = DropdownMenuCheckboxItemProps['checked'];

export default function Page() {
    const [dataTypes, setDataTypes] = useState<DataType[]>(initialDataAset);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<DataType | null>(null);
    const [formData, setFormData] = useState({ nomorInventaris: '' });
    const [selectedTipe, setSelectedTipe] = useState<string>('Semua');

    const filteredData = dataTypes.filter(
        (item) =>
            (selectedTipe === 'Semua' || item.tipe === selectedTipe) &&
            (item.nomorInventaris
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
                item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.pemakai.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.bidang.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tahun.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    // const handleAdd = () => {
    //     if (!formData.nomorInventaris.trim()) {
    //         console.log('Nomor inventaris tidak boleh kosong');
    //         return;
    //     }
    //     if (!formData.item.trim()) {
    //         console.log('Item tidak boleh kosong');
    //         return;
    //     }
    //     if (!formData.tipe.trim()) {
    //         console.log('Tipe tidak boleh kosong');
    //         return;
    //     }
    //     if (!formData.brand.trim()) {
    //         console.log('Brand tidak boleh kosong');
    //         return;
    //     }
    //     if (!formData.pemakai.trim()) {
    //         console.log('Pemakai tidak boleh kosong');
    //         return;
    //     }
    //     if (!formData.bidang.trim()) {
    //         console.log('Bidang tidak boleh kosong');
    //         return;
    //     }
    //     if (!formData.lokasi.trim()) {
    //         console.log('Lokasi tidak boleh kosong');
    //         return;
    //     }
    //     if (!formData.tahun.trim()) {
    //         console.log('Tahun tidak boleh kosong');
    //         return;
    //     }

    //     const newId = Math.max(...dataTypes.map((item) => item.id)) + 1;
    //     const newDataType: DataType = {
    //         id: newId,
    //         nomorInventaris: formData.nomorInventaris.trim(),
    //         item: formData.item.trim(),
    //         tipe: formData.tipe.trim(),
    //         brand: formData.brand.trim(),
    //         pemakai: formData.pemakai.trim(),
    //         bidang: formData.bidang.trim(),
    //         lokasi: formData.lokasi.trim(),
    //         tahun: formData.tahun.trim(),
    //     };

    //     setDataTypes([...dataTypes, newDataType]);
    //     setFormData({ nomorInventaris: '' });
    //     setIsAddModalOpen(false);
    //     console.log('Data tipe berhasil ditambahkan');
    // };

    // const handleEdit = () => {
    //     if (!formData.nomorInventaris.trim() || !editingItem) {
    //         console.log('Nomor inventaris tidak boleh kosong');
    //         return;
    //     }

    //     setDataTypes(
    //         dataTypes.map((item) =>
    //             item.id === editingItem.id
    //                 ? { ...item, nomorInventaris: formData.nomorInventaris.trim() }
    //                 : item,
    //         ),
    //     );
    //     setFormData({ nomorInventaris: '' });
    //     setEditingItem(null);
    //     setIsEditModalOpen(false);
    //     console.log('Data tipe berhasil diperbarui');
    // };

    // const handleDelete = (id: number) => {
    //     setDataTypes(dataTypes.filter((item) => item.id !== id));
    //     console.log('Data tipe berhasil dihapus');
    // };

    // const openEditModal = (item: DataType) => {
    //     setEditingItem(item);
    //     setFormData({ namaTipe: item.namaTipe });
    //     setIsEditModalOpen(true);
    // };

    // const resetForm = () => {
    //     setFormData({ namaTipe: '' });
    //     setEditingItem(null);
    // };

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
    const [showActivityBar, setShowActivityBar] =
        React.useState<Checked>(false);
    const [showPanel, setShowPanel] = React.useState<Checked>(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Model" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Data Aset
                        </h1>
                        <p className="text-gray-600">
                            Kelola data aset perangkat di dalam sistem.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full space-y-4 px-4 sm:px-6 lg:px-8">
                    {/* Search and Add Section */}
                    <Card className="border-border/50">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Manajemen Data Aset
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                <div className="relative max-w-md flex-1">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                    <Input
                                        placeholder="Cari data aset..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="border-border bg-background pl-10"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                {selectedTipe.length === 0
                                                    ? 'Tipe'
                                                    : selectedTipe}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>
                                                Pilih tipe
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem
                                                checked={
                                                    selectedTipe === 'Semua'
                                                }
                                                onCheckedChange={() =>
                                                    setSelectedTipe('Semua')
                                                }
                                            >
                                                Semua
                                            </DropdownMenuCheckboxItem>
                                            {Array.from(
                                                new Set(
                                                    initialDataTipe.map(
                                                        (t) => t.tipe,
                                                    ),
                                                ),
                                            ).map((tipe) => (
                                                <DropdownMenuCheckboxItem
                                                    key={tipe}
                                                    checked={
                                                        selectedTipe === tipe
                                                    }
                                                    onCheckedChange={() =>
                                                        setSelectedTipe(tipe)
                                                    }
                                                >
                                                    {tipe}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                Filter
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>
                                                Appearance
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem
                                                checked={showStatusBar}
                                                onCheckedChange={
                                                    setShowStatusBar
                                                }
                                            >
                                                Status Bar
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem
                                                checked={showActivityBar}
                                                onCheckedChange={
                                                    setShowActivityBar
                                                }
                                                disabled
                                            >
                                                Activity Bar
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem
                                                checked={showPanel}
                                                onCheckedChange={setShowPanel}
                                            >
                                                Panel
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Dialog
                                        open={isAddModalOpen}
                                        onOpenChange={setIsAddModalOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Tambah Data Aset
                                            </Button>
                                        </DialogTrigger>
                                        {/* <DialogContent className="border-border bg-card">
                                        <DialogHeader>
                                            <DialogTitle className="text-card-foreground">
                                                Tambah Data Tipe Baru
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="namaTipe"
                                                    className="text-card-foreground"
                                                >
                                                    Nama Tipe
                                                </Label>
                                                <Input
                                                    id="namaTipe"
                                                    placeholder="Masukkan nama tipe..."
                                                    value={formData.namaTipe}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            namaTipe:
                                                                e.target.value,
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
                                                    setIsAddModalOpen(false);
                                                    resetForm();
                                                }}
                                                className="border-border hover:bg-accent"
                                            >
                                                Batal
                                            </Button>
                                            <Button
                                                onClick={handleAdd}
                                                className="bg-primary hover:bg-primary/90"
                                            >
                                                Simpan
                                            </Button>
                                        </div>
                                    </DialogContent> */}
                                    </Dialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Table */}
                    <Card className="border-border/50">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border/50 hover:bg-muted/50">
                                            <TableHead className="font-semibold text-muted-foreground">
                                                ID
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                No. Iventaris
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                Item
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                Tipe
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                Brand/Model
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                Pemakai
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                Bidang
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                Lokasi
                                            </TableHead>
                                            <TableHead className="font-semibold text-muted-foreground">
                                                Tahun
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
                                                        {item.nomorInventaris}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-card-foreground">
                                                        {item.item}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-card-foreground">
                                                        {item.tipe}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-card-foreground">
                                                        {item.brand}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-card-foreground">
                                                        {item.pemakai}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-card-foreground">
                                                        {item.bidang}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-card-foreground">
                                                        {item.lokasi}
                                                    </TableCell>
                                                    <TableCell className="font-medium text-card-foreground">
                                                        {item.tahun}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                // onClick={() =>
                                                                //     openEditModal(
                                                                //         item,
                                                                //     )
                                                                // }
                                                                className="border-border/50 hover:bg-accent"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                // onClick={() =>
                                                                //     handleDelete(
                                                                //         item.id,
                                                                //     )
                                                                // }
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
                        {/* <DialogContent className="border-border bg-card">
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
                        </DialogContent> */}
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    );
}
