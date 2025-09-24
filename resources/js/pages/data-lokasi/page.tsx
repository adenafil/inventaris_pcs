import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
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
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Lokasi',
        href: '/master/locations',
    },
];

interface Location {
    id: number;
    namaLokasi: string;
}

const initialLocations: Location[] = [
    { id: 1, namaLokasi: 'Jakarta Pusat' },
    { id: 2, namaLokasi: 'Bandung Kota' },
    { id: 3, namaLokasi: 'Surabaya Timur' },
    { id: 4, namaLokasi: 'Medan Utara' },
    { id: 5, namaLokasi: 'Yogyakarta' },
    { id: 6, namaLokasi: 'Semarang Tengah' },
    { id: 7, namaLokasi: 'Malang Kota' },
    { id: 8, namaLokasi: 'Denpasar Selatan' },
];

export default function Page() {
    const [locations, setLocations] = useState<Location[]>(initialLocations);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<Location | null>(
        null,
    );
    const [newLocationName, setNewLocationName] = useState('');
    const [editLocationName, setEditLocationName] = useState('');

    // Filter locations based on search term
    const filteredLocations = locations.filter((location) =>
        location.namaLokasi.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Add new location
    const handleAddLocation = () => {
        if (!newLocationName.trim()) {
            console.log("Nama lokasi tidak boleh kosong");

            return;
        }

        const newId = Math.max(...locations.map((l) => l.id)) + 1;
        const newLocation: Location = {
            id: newId,
            namaLokasi: newLocationName.trim(),
        };

        setLocations([...locations, newLocation]);
        setNewLocationName('');
        setIsAddModalOpen(false);
        console.log("Lokasi berhasil ditambahkan");

    };

    // Edit location
    const handleEditLocation = (location: Location) => {
        setEditingLocation(location);
        setEditLocationName(location.namaLokasi);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        if (!editLocationName.trim()) {
            console.log("Nama lokasi tidak boleh kosong");
            return;
        }

        if (!editingLocation) return;

        setLocations(
            locations.map((location) =>
                location.id === editingLocation.id
                    ? { ...location, namaLokasi: editLocationName.trim() }
                    : location,
            ),
        );

        setIsEditModalOpen(false);
        setEditingLocation(null);
        setEditLocationName('');
        console.log("Perubahan lokasi berhasil disimpan");
    };

    // Delete location
    const handleDeleteLocation = (id: number) => {
        setLocations(locations.filter((location) => location.id !== id));
        console.log("Lokasi berhasil dihapus");
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Lokasi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Data Lokasi
                        </h1>
                        <p className="text-gray-600">
                            Kelola data lokasi dalam organisasi Anda di sini.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Daftar Lokasi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Search and Add Button */}
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

                                {/* Add Location Modal */}
                                <Dialog
                                    open={isAddModalOpen}
                                    onOpenChange={setIsAddModalOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="flex items-center gap-2">
                                            <Plus className="h-4 w-4" />
                                            Tambah Lokasi
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Tambah Lokasi Baru
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 pt-4">
                                            <div>
                                                <Label htmlFor="new-location-name">
                                                    Nama Lokasi
                                                </Label>
                                                <Input
                                                    id="new-location-name"
                                                    value={newLocationName}
                                                    onChange={(e) =>
                                                        setNewLocationName(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Masukkan nama lokasi"
                                                    onKeyDown={(e) =>
                                                        e.key === 'Enter' &&
                                                        handleAddLocation()
                                                    }
                                                />
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsAddModalOpen(
                                                            false,
                                                        );
                                                        setNewLocationName('');
                                                    }}
                                                >
                                                    Batal
                                                </Button>
                                                <Button
                                                    onClick={handleAddLocation}
                                                >
                                                    Simpan
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Locations Table */}
                            <div className="rounded-lg border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-20">
                                                ID
                                            </TableHead>
                                            <TableHead>Nama Lokasi</TableHead>
                                            <TableHead className="w-32 text-center">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredLocations.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={3}
                                                    className="py-8 text-center text-muted-foreground"
                                                >
                                                    {searchTerm
                                                        ? 'Tidak ada lokasi yang ditemukan'
                                                        : 'Belum ada data lokasi'}
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredLocations.map(
                                                (location) => (
                                                    <TableRow key={location.id}>
                                                        <TableCell className="font-medium">
                                                            {location.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                location.namaLokasi
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex justify-center gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleEditLocation(
                                                                            location,
                                                                        )
                                                                    }
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleDeleteLocation(
                                                                            location.id,
                                                                        )
                                                                    }
                                                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Edit Location Modal */}
                            <Dialog
                                open={isEditModalOpen}
                                onOpenChange={setIsEditModalOpen}
                            >
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Lokasi</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 pt-4">
                                        <div>
                                            <Label htmlFor="edit-location-name">
                                                Nama Lokasi
                                            </Label>
                                            <Input
                                                id="edit-location-name"
                                                value={editLocationName}
                                                onChange={(e) =>
                                                    setEditLocationName(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan nama lokasi"
                                                onKeyDown={(e) =>
                                                    e.key === 'Enter' &&
                                                    handleSaveEdit()
                                                }
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsEditModalOpen(false);
                                                    setEditingLocation(null);
                                                    setEditLocationName('');
                                                }}
                                            >
                                                Batal
                                            </Button>
                                            <Button onClick={handleSaveEdit}>
                                                Simpan
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
