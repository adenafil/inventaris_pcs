import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AssetDetail } from '../_components/asset-detail';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, QrCode, Trash2, Undo2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PageProps } from './_types';
import AssignForm from '../_components/assign-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Assets',
        href: '/master/assets',
    },
    {
        title: 'View Assets',
        href: '#',
    },
];


const logsDummy = [
    {
        id: `hello-log-1`,
        type: 'service',
        title: 'Perawatan Berkala',
        description: 'Pembersihan internal dan update firmware.',
        at: '2024-08-10T08:30:00.000Z',
    },
    {
        id: `hello-log-2`,
        type: 'repair',
        title: 'Perbaikan Keyboard',
        description: 'Penggantian keycap dan pembersihan switch.',
        at: '2024-12-02T14:00:00.000Z',
    },
    {
        id: `hello-log-3`,
        type: 'other',
        title: 'Peminjaman Sementara',
        description: 'Dipinjam oleh tim proyek selama 2 minggu.',
        at: '2025-01-15T09:00:00.000Z',
    },
];


export default function Page({ dataAsset, assignments, employees, orgUnits }: PageProps) {
    console.log({dataAsset, assignments, employees, orgUnits});

    const [filter, setFilter] = useState<
        'all' | 'service' | 'repair' | 'other'
    >('all');
    const [qrUrl, setQrUrl] = useState<string>('');

    const filtered = logsDummy.filter((l) => filter === 'all' || l.type === filter);

    const downloadQR = () => {
        if (!qrUrl) return;
        const a = document.createElement('a');
        a.href = qrUrl;
        a.download = `qr-${asset.id}.png`;
        a.click();
        console.log('[v0] download detail QR', asset.id);
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`View Asset ${dataAsset.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            View Data Assets
                        </h1>
                        <p className="text-gray-600">
                            Use this form to view and manage asset details. You
                            can edit or delete assets as needed.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full space-y-4 px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Asset</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <img
                                            src={
                                                'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/asset-pc-photo-59sUbgRzrIIAmPsRFmc47VKvDsTMm3.jpg'
                                            }
                                            alt={`asset image`}
                                            className="rounded-md border"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2 text-sm">
                                    <Row
                                        k="Nomor Inventaris"
                                        v={'INV-2024-0001'}
                                    />
                                    <Row k="Item" v={'Laptop'} />
                                    <Row k="Tipe" v={'Laptop'} />
                                    <Row k="Brand/Model" v={'ThinkPad X1'} />
                                    <Row k="Serial" v={'SN-ABC-001'} />
                                    <Row k="Lokasi" v={'Kantor Pusat'} />
                                    <Row
                                        k="Tanggal Pembelian"
                                        v={String('2024-01-01')}
                                    />
                                    <Row
                                        k="Akhir Garansi"
                                        v={String('2025-01-01')}
                                    />
                                </div>
                                <div className="mt-4 flex justify-end gap-2 md:col-span-2">
                                    <Button variant="outline" size="sm">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <QrCode />
                                        QR
                                    </Button>
                                    <AssignForm key={dataAsset.id} asset_id={dataAsset.id} employees={employees} orgUnits={orgUnits} />
                                    <Button variant="destructive" size="sm">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>
                                    Riwayat Servis & Perbaikan
                                </CardTitle>
                                <div className="w-40">
                                    <Select
                                        value={filter}
                                        onValueChange={(v) =>
                                            setFilter(v as any)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filter" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                Semua
                                            </SelectItem>
                                            <SelectItem value="service">
                                                Service
                                            </SelectItem>
                                            <SelectItem value="repair">
                                                Perbaikan
                                            </SelectItem>
                                            <SelectItem value="other">
                                                Lainnya
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {filtered.map((l) => (
                                    <div
                                        key={l.id}
                                        className="rounded-md border p-3"
                                    >
                                        <div className="text-sm font-medium">
                                            {l.title}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {l.description}
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {new Date(l.at).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                                {filtered.length === 0 && (
                                    <div className="text-sm text-muted-foreground">
                                        Tidak ada riwayat dengan filter ini.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Borrowers / Assignees */}
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Informasi Peminjam (Assigned)
                                </CardTitle>
                                <CardDescription>
                                    Riwayat peminjaman dan status pengembalian.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex flex-col gap-2 rounded-md border p-3 md:flex-row md:items-center md:justify-between">
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-medium">
                                                {'Sinta Dewi'}
                                            </span>
                                            <Badge variant="outline">
                                                {'sinta@company.com'}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Status:{' '}
                                            <span className="capitalize">
                                                {'dipinjam'}
                                            </span>{' '}
                                            • Tgl Pinjam: {'2024-06-01'} •
                                            Kembali: {'Ya'}
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="destructive">
                                            {/* gimme return icon */}
                                            <Undo2 />
                                            Return
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function Row({ k, v }: { k: string; v: string }) {
    return (
        <div className="grid grid-cols-3 gap-2">
            <div className="text-muted-foreground">{k}</div>
            <div className="col-span-2">{v}</div>
        </div>
    );
}
