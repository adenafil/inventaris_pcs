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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
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
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { toast } from 'sonner';
import { PageProps } from './_types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Model',
        href: '/master/models',
    },
];

export default function Page({ assetModels, pagination, page }: PageProps) {
    console.log({ assetModels, pagination, page });

    const [searchTerm, setSearchTerm] = useState('');
    const isFirstRender = useRef(true);
    const [loading, setLoading] = useState(false);

    const handleDelete = (id: number) => {
        console.log('Deleting model with ID:', id);

        router.delete(`/master/models/${id}`, {
            onBefore: () => {
                setLoading(true);
            },
            onSuccess: () => {
                router.visit('/master/models', {
                    method: 'get',
                    preserveState: true,
                    preserveScroll: true,
                });

                setTimeout(() => {
                    toast.success('Model deleted successfully!');
                    setLoading(false);
                }, 1000);
            },
            onError: (error) => {
                console.error('Delete error:', error);
            },
        });
    };

    useDebounce(
        () => {
            if (!isFirstRender.current) {
                router.get(
                    '/master/models',
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
            <Head title="Data Model" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                            Data Model
                        </h1>
                        <p className="text-gray-600 dark:text-muted-foreground">
                            Manage your data models here. You can add, edit, or
                            delete models as needed.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full space-y-4 px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Model List ({assetModels.length} items)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                <div className="flex items-center space-x-2">
                                    <Button
                                        onClick={() =>
                                            router.visit(
                                                '/master/models/create',
                                            )
                                        }
                                        className="flex w-full items-center gap-2 md:w-auto"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Tambah
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-16">
                                                ID
                                            </TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Brand</TableHead>
                                            <TableHead>Model</TableHead>
                                            <TableHead className="w-32">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {assetModels.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
                                                    className="py-8 text-center text-muted-foreground"
                                                >
                                                    No models found matching
                                                    your criteria
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            assetModels.map((model) => (
                                                <TableRow key={model.id}>
                                                    <TableCell className="font-medium">
                                                        {model.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary">
                                                            {model.type.name}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {model.brand}
                                                    </TableCell>
                                                    <TableCell>
                                                        {model.model}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Link
                                                                href={`/master/models/${model.id}/edit`}
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-8 w-8 bg-transparent p-0"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="h-8 w-8 bg-transparent p-0 text-destructive hover:text-destructive"
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
                                                                            model?
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
                                                                            model
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
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            disabled={
                                                                                loading
                                                                            }
                                                                            className="flex items-center gap-1"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    model.id,
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
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>

                        {assetModels.length > 0 && (
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.visit(
                                                    pagination.links[0].url ??
                                                        '#',
                                                    {
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }}
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
                                                        isActive={link.active}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            router.visit(
                                                                link.url ?? '#',
                                                                {
                                                                    preserveScroll: true,
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
                                                    pagination.links[
                                                        pagination.links
                                                            .length - 1
                                                    ].url ?? '#',
                                                    {
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }}
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
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
