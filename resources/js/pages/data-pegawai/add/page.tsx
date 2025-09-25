import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Save, Send, X } from 'lucide-react';

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

export default function Page() {
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
                            <form className="space-y-6">
                                {/* NIP */}
                                <div className="space-y-2">
                                    <Label htmlFor="nip">NIP *</Label>
                                    <Input
                                        id="nip"
                                        placeholder="Masukkan NIP pegawai"
                                        value={''}
                                        onChange={(e) =>
                                            console.log(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* Nama */}
                                <div className="space-y-2">
                                    <Label htmlFor="nama">Nama Lengkap *</Label>
                                    <Input
                                        id="nama"
                                        placeholder="Masukkan nama lengkap"
                                        value={''}
                                        onChange={(e) =>
                                            console.log(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Masukkan alamat email"
                                        value={''}
                                        onChange={(e) =>
                                            console.log(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* Bidang */}
                                <div className="space-y-2">
                                    <Label htmlFor="bidang">Bidang *</Label>
                                    <Select
                                        value={''}
                                        onValueChange={(value) =>
                                            console.log(value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih bidang" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="IT">
                                                IT
                                            </SelectItem>
                                            <SelectItem value="HR">
                                                HR
                                            </SelectItem>
                                            <SelectItem value="Finance">
                                                Finance
                                            </SelectItem>
                                            <SelectItem value="Marketing">
                                                Marketing
                                            </SelectItem>
                                            <SelectItem value="Operations">
                                                Operations
                                            </SelectItem>
                                            <SelectItem value="Sales">
                                                Sales
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Status Aktif */}
                                <div className="space-y-3">
                                    <Label>Status Aktif *</Label>
                                    <RadioGroup
                                        value={'ya'}
                                        onValueChange={(value) =>
                                            console.log(value)
                                        }
                                        className="flex gap-6"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="ya"
                                                id="aktif-ya"
                                            />
                                            <Label htmlFor="aktif-ya">Ya</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="tidak"
                                                id="aktif-tidak"
                                            />
                                            <Label htmlFor="aktif-tidak">
                                                Tidak
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-end pt-4">
                                    <div className="flex gap-3">
                                        <Button variant="outline" asChild>
                                            <Link
                                                href={"#"}
                                            >
                                                Back
                                            </Link>
                                        </Button>
                                        <Button
                                            className="flex items-center gap-2"
                                        >
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
