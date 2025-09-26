import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import { Head, router, WhenVisible } from '@inertiajs/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useForm } from 'laravel-precognition-react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { toast } from 'sonner';
import { Location, PageProps } from './_types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Lokasi',
        href: '/master/locations',
    },
];

export default function Page({ locations, pagination, page }: PageProps) {
    console.log({ locations, pagination, page });
    const [loading, setLoading] = useState(false);
    const formAddLocation = useForm('post', '/master/locations', {
        code: '',
        name: '',
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<Location | null>(
        null,
    );
    const isFirstRender = useRef(true);

    const handleSubmit = () => {
        const uuid = crypto.randomUUID();
        formAddLocation.setData('code', uuid);
        formAddLocation.submit({
            onSuccess: () => {
                setIsAddModalOpen(false);
                console.log('Lokasi berhasil ditambahkan');
                formAddLocation.reset();
                toast.success('Lokasi berhasil ditambahkan');
            },
            onValidationError: (error) => {
                console.log('Terjadi kesalahan validasi:', error);
            },
            onFinish: () => {
                setTimeout(() => {
                    router.visit('/master/locations', {
                        preserveState: true,
                    });
                }, 1000);
            },
        });
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleEditLocation = (location: Location) => {
        setEditingLocation(() => location);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async () => {
        router.patch(
            `/master/locations/${editingLocation?.id}`,
            {
                name: editingLocation?.name,
            },
            {
                onBefore: () => setLoading(true),
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    setEditingLocation(null);
                    toast.success('Lokasi berhasil diperbarui');
                    setLoading(false);
                },
                onError: (error) => {
                    console.log('Terjadi kesalahan:', error);
                },
            },
        );
    };

    const handleDeleteLocation = (id: number) => {
        router.delete(`/master/locations/${id}`, {
            onBefore: () => setLoading(true),
            onSuccess: () => {
                toast.success('Lokasi berhasil dihapus');
                setLoading(false);
            },
        });
    };

    useDebounce(
        () => {
            if (!isFirstRender.current) {
                router.get(
                    '/master/locations',
                    { search: searchTerm },
                    { preserveState: true, replace: true },
                );
            }
            isFirstRender.current = false;
        },
        500,
        [searchTerm],
    );

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
                                            Tambah
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Tambah Lokasi Baru
                                            </DialogTitle>
                                        </DialogHeader>
                                        <DialogDescription asChild>
                                            <div className="space-y-4 pt-4">
                                                <div>
                                                    <Label htmlFor="new-location-name">
                                                        Nama Lokasi
                                                    </Label>
                                                    <Input
                                                        id="new-location-name"
                                                        value={
                                                            formAddLocation.data
                                                                .name
                                                        }
                                                        onChange={(e) =>
                                                            formAddLocation.setData(
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Masukkan nama lokasi"
                                                        onKeyDown={(e) =>
                                                            e.key === 'Enter' &&
                                                            handleSubmit()
                                                        }
                                                        onBlur={() => {
                                                            formAddLocation.validate(
                                                                'name',
                                                            );
                                                        }}
                                                    />
                                                    {formAddLocation.invalid(
                                                        'name',
                                                    ) && (
                                                        <p className="text-sm text-red-600">
                                                            {
                                                                formAddLocation
                                                                    .errors.name
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
                                                            setNewLocationName(
                                                                '',
                                                            );
                                                        }}
                                                    >
                                                        Batal
                                                    </Button>
                                                    <Button
                                                        disabled={
                                                            formAddLocation.processing
                                                        }
                                                        onClick={handleSubmit}
                                                    >
                                                        {formAddLocation.processing
                                                            ? 'Menyimpan...'
                                                            : 'Simpan'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogDescription>
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
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {locations.length === 0 ? (
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
                                            locations.map((location) => (
                                                <TableRow key={location.id}>
                                                    <TableCell className="font-medium">
                                                        {location.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {location.name}
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

                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Are
                                                                            you
                                                                            sure
                                                                            you
                                                                            want
                                                                            to
                                                                            delete
                                                                            this
                                                                            location?
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This
                                                                            action
                                                                            cannot
                                                                            be
                                                                            undone.
                                                                            This
                                                                            will
                                                                            permanently
                                                                            delete
                                                                            your
                                                                            account
                                                                            and
                                                                            remove
                                                                            your
                                                                            data
                                                                            from
                                                                            our
                                                                            servers.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <Button
                                                                            disabled={
                                                                                loading
                                                                            }
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            onClick={() =>
                                                                                handleDeleteLocation(
                                                                                    location.id,
                                                                                )
                                                                            }
                                                                            className="cursor-pointer"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                            {loading
                                                                                ? 'Deleting...'
                                                                                : 'Delete'}
                                                                        </Button>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}

                                        {pagination.current_page <
                                            pagination.last_page && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={2}
                                                    className="text-center"
                                                >
                                                    <WhenVisible
                                                        always={
                                                            pagination.current_page <
                                                            pagination.last_page
                                                        }
                                                        params={{
                                                            data: {
                                                                page:
                                                                    pagination.current_page <
                                                                    pagination.last_page
                                                                        ? pagination.current_page +
                                                                          1
                                                                        : pagination.current_page,
                                                            },
                                                            only: [
                                                                'locations',
                                                                'pagination',
                                                            ],
                                                        }}
                                                        buffer={0.1}
                                                        fallback={
                                                            <p>
                                                                data not found.
                                                            </p>
                                                        }
                                                        as="div"
                                                    >
                                                        {pagination.current_page >=
                                                        pagination.last_page ? (
                                                            <div className="p-2 text-center text-sm text-muted-foreground"></div>
                                                        ) : (
                                                            <div className="p-2 text-center text-sm text-muted-foreground">
                                                                Loading more
                                                                data...
                                                            </div>
                                                        )}
                                                    </WhenVisible>
                                                </TableCell>
                                            </TableRow>
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
                                                value={
                                                    editingLocation?.name || ''
                                                }
                                                onChange={(e) =>
                                                    setEditingLocation(
                                                        (prev) =>
                                                            prev
                                                                ? {
                                                                      ...prev,
                                                                      name: e
                                                                          .target
                                                                          .value,
                                                                  }
                                                                : null,
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
                                                disabled={loading}
                                                onClick={() => {
                                                    setIsEditModalOpen(false);
                                                    setEditingLocation(null);
                                                }}
                                            >
                                                Batal
                                            </Button>
                                            <Button onClick={handleSaveEdit}>
                                                {loading
                                                    ? 'Menyimpan...'
                                                    : 'Simpan'}
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
