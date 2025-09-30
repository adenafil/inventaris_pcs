import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { error } from 'console';
import { useForm } from 'laravel-precognition-react';
import { Save, Send, X } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Pegawai',
        href: '/master/employees',
    },
    {
        title: 'Tambah Pegawai',
        href: '/master/employees/create',
    },
];

type OrgUnit = {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
};


export default function Page({ orgUnits }: { orgUnits: OrgUnit[] }) {
    console.log({ orgUnits });

    const formAddEmployee = useForm('post', '/master/employees', {
        nip: '',
        name: '',
        email: '',
        org_unit_id: '',
        status: false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formAddEmployee.submit({
            onSuccess: () => {
                router.visit('/master/employees', { preserveScroll: true });

                setTimeout(() => {
                    toast.success('Pegawai berhasil ditambahkan');
                }, 1000);
            },
            onValidationError: (errors) => {
                console.log('Validation errors:', errors);
                toast.error(errors.data.message || 'Terjadi kesalahan validasi');
            }
        });
    }

    useEffect(() => {
        console.log(formAddEmployee.data);

    }, [formAddEmployee.data])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pegawai" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Tambah Pegawai
                        </h1>
                        <p className="text-gray-600">
                            Tambah data pegawai baru ke dalam sistem.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Pegawai</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* NIP */}
                                <div className="space-y-2">
                                    <Label htmlFor="nip">NIP *</Label>
                                    <Input
                                        id="nip"
                                        placeholder="Masukkan NIP pegawai"
                                        value={formAddEmployee.data.nip}
                                        onChange={(e) =>
                                            formAddEmployee.setData(
                                                'nip',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {formAddEmployee.invalid('nip') && (
                                        <p className="text-sm text-red-600">
                                            {formAddEmployee.errors.nip}
                                        </p>
                                    )}
                                </div>

                                {/* Nama */}
                                <div className="space-y-2">
                                    <Label htmlFor="nama">Nama Lengkap *</Label>
                                    <Input
                                        id="nama"
                                        placeholder="Masukkan nama lengkap"
                                        value={formAddEmployee.data.name}
                                        onChange={(e) =>
                                            formAddEmployee.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {formAddEmployee.invalid('name') && (
                                        <p className="text-sm text-red-600">
                                            {formAddEmployee.errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Masukkan alamat email"
                                        value={formAddEmployee.data.email}
                                        onChange={(e) =>
                                            formAddEmployee.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {formAddEmployee.invalid('email') && (
                                        <p className="text-sm text-red-600">
                                            {formAddEmployee.errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Bidang */}
                                <div className="space-y-2">
                                    <Label htmlFor="bidang">Bidang *</Label>
                                    <Select
                                        value={formAddEmployee.data.org_unit_id}
                                        onValueChange={(value) =>
                                            formAddEmployee.setData(
                                                'org_unit_id',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih bidang" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {orgUnits.map((unit) => (
                                                <SelectItem
                                                    key={unit.id}
                                                    value={unit.id.toString()}
                                                >
                                                    {unit.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {formAddEmployee.invalid('org_unit_id') && (
                                        <p className="text-sm text-red-600">
                                            {formAddEmployee.errors.org_unit_id}
                                        </p>
                                    )}
                                </div>

                                {/* Status Aktif */}
                                <div className="space-y-2">
                                    <Label htmlFor="status-aktif">
                                        Status Aktif *
                                    </Label>
                                    <Select
                                        value={formAddEmployee.data.status ? 'true' : 'false'}
                                        onValueChange={(value) =>
                                            formAddEmployee.setData(
                                                'status',
                                                value === 'true',
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status aktif" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">
                                                Aktif
                                            </SelectItem>
                                            <SelectItem value="false">
                                                Tidak Aktif
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {formAddEmployee.invalid('status') && (
                                        <p className="text-sm text-red-600">
                                            {formAddEmployee.errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-end pt-4">
                                    <div className="flex gap-3">
                                        <Button variant="outline" asChild>
                                            <Link
                                                preserveScroll
                                                href={'/master/employees'}
                                            >
                                                Back
                                            </Link>
                                        </Button>
                                        <Button className="flex items-center gap-2">
                                            <Send className="h-4 w-4" />
                                            Add Pegawai
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
