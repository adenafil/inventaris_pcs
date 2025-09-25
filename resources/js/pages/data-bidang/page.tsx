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
import { Edit, Plus, Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { toast } from 'sonner';
import { OrgUnit, PageProps } from './_types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Bidang',
        href: '/master/org-units',
    },
];

// Dummy data
const initialBidangData = [
    { id: 1, namaBidang: 'Teknologi Informasi' },
    { id: 2, namaBidang: 'Sumber Daya Manusia' },
    { id: 3, namaBidang: 'Keuangan' },
    { id: 4, namaBidang: 'Pemasaran' },
    { id: 5, namaBidang: 'Operasional' },
];

export default function Page({ orgunits, pagination, page }: PageProps) {
    console.log({ orgunits, pagination });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const formAddBidang = useForm('post', '/master/org-units', {
        code: '',
        name: '',
    });
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const uuid = crypto.randomUUID();
        formAddBidang.setData('code', uuid);
        formAddBidang.submit({
            onSuccess: () => {
                setIsModalOpen(false);
                formAddBidang.reset();
                router.reload({
                    onSuccess: () => {
                        toast.success('Bidang berhasil ditambahkan');
                    },
                });
            },
            onValidationError: (error) => {
                console.log({ error });
                toast.error(error.data.message || 'Terjadi kesalahan');
            },
        });
    };

    const handleDelete = (id: number) => {
        router.delete(`/master/org-units/${id}`, {
            preserveScroll: true,
            onBefore: () => setLoading(true),
            onFinish: () => setLoading(false),
            onSuccess: () => {
                console.log('berhasil dihapus');
                toast.success('Bidang berhasil dihapus');
            },
        });
    };

    const handleEditClick = (orgUnit: OrgUnit) => {

    };

    useEffect(() => {
        console.log(formAddBidang.data);
    }, [formAddBidang.data]);

    useEffectOnce(() => {
        if (page && page !== 1) {
            router.visit('/master/org-units', {
                preserveScroll: true,
            });
        }
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Bidang" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Master Bidang
                        </h1>
                        <p className="text-gray-600">
                            Kelola data bidang dalam organisasi Anda di sini.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl font-bold">
                                Master Bidang
                            </CardTitle>
                            <Dialog
                                open={isModalOpen}
                                onOpenChange={setIsModalOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Tambah
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Tambah Bidang</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription asChild>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <Label htmlFor="namaBidang">
                                                    Nama Bidang
                                                </Label>
                                                <Input
                                                    id="namaBidang"
                                                    type="text"
                                                    value={
                                                        formAddBidang.data.name
                                                    }
                                                    onChange={(e) =>
                                                        formAddBidang.setData(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        formAddBidang.validate(
                                                            'name',
                                                        )
                                                    }
                                                    className="w-full"
                                                    placeholder="Masukkan nama bidang"
                                                    required
                                                />
                                                {formAddBidang.invalid(
                                                    'name',
                                                ) && (
                                                    <p className="text-sm text-red-600">
                                                        {
                                                            formAddBidang.errors
                                                                .name
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsModalOpen(false)
                                                    }
                                                    className="flex flex-1 items-center gap-2"
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="flex flex-1 items-center gap-2"
                                                >
                                                    <Save className="h-4 w-4" />
                                                    Simpan
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Bidang</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orgunits.map((bidang) => (
                                        <TableRow key={`bidang-${bidang.id}`}>
                                            <TableCell className="font-medium">
                                                {bidang.name}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        onClick={() => {
                                                            setIsEditModalOpen(true)
                                                         }}
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                        Edit
                                                    </Button>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                className="flex items-center gap-1"
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                                Delete
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Are you sure
                                                                    you want to
                                                                    delete this
                                                                    bidang?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action
                                                                    cannot be
                                                                    undone. This
                                                                    will
                                                                    permanently
                                                                    delete your
                                                                    account and
                                                                    remove your
                                                                    data from
                                                                    our servers.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    disabled={
                                                                        loading
                                                                    }
                                                                    className="flex items-center gap-1"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            bidang.id,
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                    {loading
                                                                        ? 'Loading...'
                                                                        : 'Delete'}
                                                                </Button>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}

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
                                                            'orgunits',
                                                            'pagination',
                                                        ],
                                                    }}
                                                    buffer={0.1}
                                                    fallback={
                                                        <p>data not found.</p>
                                                    }
                                                    as="div"
                                                >
                                                    {pagination.current_page >=
                                                    pagination.last_page ? (
                                                        <div className="p-2 text-center text-sm text-muted-foreground"></div>
                                                    ) : (
                                                        <div className="p-2 text-center text-sm text-muted-foreground">
                                                            Loading more data...
                                                        </div>
                                                    )}
                                                </WhenVisible>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <Dialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                >
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Bidang</DialogTitle>
                        </DialogHeader>
                        <DialogDescription asChild>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="namaBidang">
                                        Nama Bidang
                                    </Label>
                                    <Input
                                        id="namaBidang"
                                        type="text"
                                        value={formAddBidang.data.name}
                                        onChange={(e) =>
                                            formAddBidang.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        onBlur={() =>
                                            formAddBidang.validate('name')
                                        }
                                        className="w-full"
                                        placeholder="Masukkan nama bidang"
                                        required
                                    />
                                    {formAddBidang.invalid('name') && (
                                        <p className="text-sm text-red-600">
                                            {formAddBidang.errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex flex-1 items-center gap-2"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex flex-1 items-center gap-2"
                                    >
                                        <Save className="h-4 w-4" />
                                        Simpan
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
