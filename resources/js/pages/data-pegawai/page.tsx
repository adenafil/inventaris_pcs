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
import { Head, Link } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Pegawai',
        href: '/master/employees',
    },
];

const employees = [
    {
        id: 1,
        nip: 'EMP001',
        nama: 'Ahmad Wijaya',
        email: 'ahmad.wijaya@company.com',
        bidang: 'IT',
        aktif: true,
    },
    {
        id: 2,
        nip: 'EMP002',
        nama: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@company.com',
        bidang: 'HR',
        aktif: true,
    },
    {
        id: 3,
        nip: 'EMP003',
        nama: 'Budi Santoso',
        email: 'budi.santoso@company.com',
        bidang: 'Finance',
        aktif: false,
    },
    {
        id: 4,
        nip: 'EMP004',
        nama: 'Maya Sari',
        email: 'maya.sari@company.com',
        bidang: 'Marketing',
        aktif: true,
    },
];

export default function Page() {
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
                                        placeholder="Cari pegawai..."
                                        value={'something'}
                                        className="pl-10"
                                    />
                                </div>
                                <Link href="/tambah-pegawai">
                                    <Button className="w-full sm:w-auto">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Pegawai
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
                                                Aksi
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
                                                        {employee.nama}
                                                    </TableCell>
                                                    <TableCell>
                                                        {employee.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {employee.bidang}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={
                                                                employee.aktif
                                                                    ? 'default'
                                                                    : 'secondary'
                                                            }
                                                        >
                                                            {employee.aktif
                                                                ? 'Aktif'
                                                                : 'Tidak Aktif'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Link
                                                                href={`/edit-pegawai/${employee.id}`}
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
