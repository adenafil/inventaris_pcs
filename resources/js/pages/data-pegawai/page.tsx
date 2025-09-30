import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Head, Link, router, WhenVisible } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { PageProps } from './_types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Pegawai',
        href: '/master/employees',
    },
];

export default function Page({ employees, pagination, page }: PageProps) {
    console.log({ employees, pagination, page });
    const [searchTerm, setSearchTerm] = useState('');
    const isFirstRender = useRef(true);

    useDebounce(
        () => {
            if (!isFirstRender.current) {
                router.get(
                    '/master/employees',
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
            <Head title="Master Pegawai" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Master Pegawai
                        </h1>
                        <p className="text-gray-600">
                            Daftar pegawai yang terdaftar dalam sistem.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">
                                Daftar Pegawai
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Search and Add Button */}
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                                    <Input
                                        placeholder="Cari NIP, nama, email, atau bidang..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Link href="/master/employees/create">
                                    <Button className="w-full sm:w-auto">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah
                                    </Button>
                                </Link>
                            </div>

                            {/* Employee Table */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>NIP</TableHead>
                                            <TableHead>Nama</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Bidang</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {employees.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="py-8 text-center text-muted-foreground"
                                                >
                                                    Tidak ada pegawai yang
                                                    ditemukan
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            employees.map((employee) => (
                                                <TableRow key={employee.id}>
                                                    <TableCell className="font-medium">
                                                        {employee.nip}
                                                    </TableCell>
                                                    <TableCell>
                                                        {employee.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {employee.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {employee.org_unit.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                employee.is_active
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                        >
                                                            {employee.is_active
                                                                ? 'Aktif'
                                                                : 'Tidak Aktif'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                preserveScroll
                                                                href={`/master/employees/${employee.id}/edit`}
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-destructive hover:text-destructive"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}

                                        {pagination.current_page <
                                            pagination.last_page && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
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
                                                                'employees',
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
                                                            <div className="w-full p-2 text-center text-sm text-muted-foreground">
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
