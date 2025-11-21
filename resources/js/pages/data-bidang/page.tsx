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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react';
import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AddDialogDataBidang from './_components/add-dialog-data-bidang';
import EditDialogDataBidang from './_components/edit-dialog-data-bidang';
import { OrgUnit, PageProps } from './_types';
import orgUnits from '@/routes/org-units';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Bidang',
        href: '/master/org-units',
    },
];

export default function Page({ orgunits, pagination, page }: PageProps) {
    console.log({ orgunits, pagination, page });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const formAddBidang = useForm('post', '/master/org-units', {
        code: '',
        name: '',
    });
    const [activeOrgUnit, setActiveOrgUnit] = useState<OrgUnit | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const uuid = crypto.randomUUID();
        formAddBidang.setData('code', uuid);
        formAddBidang.submit({
            onSuccess: () => {
                setIsModalOpen(false);
                formAddBidang.reset();
                setTimeout(() => {
                    toast.success('Bidang berhasil ditambahkan');
                }, 1000);

                router.visit('/master/org-units', {
                    preserveScroll: true,
                });
            },
            onValidationError: (error) => {
                console.log({ error });
                toast.error(error.data.message || 'Terjadi kesalahan');
            },
        });
    };

    const handleEditModalOpen = (orgUnit: OrgUnit) => {
        setActiveOrgUnit(orgUnit);
        setIsEditModalOpen(true);
    };

    const handleEdit = () => {
        if (!activeOrgUnit) return;

        router.patch(
            `/master/org-units/${activeOrgUnit.id}`,
            {
                name: activeOrgUnit.name,
            },
            {
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: () => {
                    setIsEditModalOpen(false);
                    setTimeout(() => {
                        toast.success('Bidang berhasil diupdate');
                    }, 1000);
                    router.visit('/master/org-units', {
                        preserveScroll: true,
                    });
                },
                onError: (error) => {
                    toast.error(error.message || 'Terjadi kesalahan');
                },
            },
        );
    };

    const handleDelete = (id: number) => {
        router.delete(`/master/org-units/${id}`, {
            preserveScroll: true,
            onBefore: () => setLoading(true),
            onFinish: () => setLoading(false),
            onSuccess: () => {
                console.log('berhasil dihapus');
                router.visit('/master/org-units', {
                    onSuccess: () => {
                        toast.success('Bidang berhasil dihapus');
                    },
                    preserveScroll: true,
                });
            },
        });
    };

    useEffect(() => {
        console.log(formAddBidang.data);
    }, [formAddBidang.data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Bidang" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                            Master Bidang
                        </h1>
                        <p className="text-gray-600 dark:text-muted-foreground">
                            Kelola data bidang dalam organisasi Anda di sini.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl font-bold">
                                Master Bidang ({orgunits.length})
                            </CardTitle>
                            <AddDialogDataBidang
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                formAddBidang={formAddBidang}
                                handleSubmit={handleSubmit}
                            />
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
                                    {orgunits.length === 0 && (
                                        <TableRow className="">
                                            <TableCell
                                                colSpan={2}
                                                className="text-center"
                                            >
                                                <div className="mt-6">
                                                    Data tidak ditemukan.
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {orgunits.map((bidang) => (
                                        <TableRow key={`bidang-${bidang.id}`}>
                                            <TableCell className="font-medium">
                                                {bidang.name}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        onClick={() =>
                                                            handleEditModalOpen(
                                                                bidang,
                                                            )
                                                        }
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
                                                                    bidang from
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
                                </TableBody>
                            </Table>

                            {orgunits.length > 0 && (
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={
                                                    pagination.links[0].url ??
                                                    '#'
                                                }
                                                aria-disabled={
                                                    pagination.prev_page_url ===
                                                    null
                                                }
                                                className={
                                                    pagination.prev_page_url ===
                                                    null
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                }
                                            />
                                        </PaginationItem>
                                        {pagination.links.map(
                                            (link, index) =>
                                                !isNaN(Number(link.label)) && (
                                                    <PaginationItem key={index}>
                                                        <PaginationLink
                                                            href={
                                                                link.url ?? '#'
                                                            }
                                                            isActive={
                                                                link.active
                                                            }
                                                        >
                                                            {link.label}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ),
                                        )}
                                        <PaginationItem>
                                            <PaginationNext
                                                href={
                                                    pagination.links[
                                                        pagination.links
                                                            .length - 1
                                                    ].url ?? '#'
                                                }
                                                aria-disabled={
                                                    pagination.next_page_url ===
                                                    null
                                                }
                                                className={
                                                    pagination.next_page_url ===
                                                    null
                                                        ? 'pointer-events-none opacity-50'
                                                        : ''
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <EditDialogDataBidang
                    loading={loading}
                    isEditModalOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    activeOrgUnit={activeOrgUnit}
                    handleEdit={handleEdit}
                    setActiveOrgUnit={setActiveOrgUnit}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
        </AppLayout>
    );
}
