import { AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Edit, QrCodeIcon } from 'lucide-react';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import AssignForm from '../_components/assign-form';
import DeleteAssetBtn from '../_components/delete-asset-btn';
import ReturnBtn from './_components/return-btn';
import { PageProps } from './_types';

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

export default function Page({
    dataAsset,
    assignments,
    employees,
    orgUnits,
    hostUrl,
}: PageProps) {
    console.log({ dataAsset, assignments, employees, orgUnits, hostUrl });

    // in the meantime, let the fake data appear, until the api is ready
    const [filter, setFilter] = useState<
        'all' | 'service' | 'repair' | 'other'
    >('all');
    const [qrUrl, setQrUrl] = useState<string>('');

    const filtered = logsDummy.filter(
        (l) => filter === 'all' || l.type === filter,
    );

    const [qrKey, setQrKey] = useState<string>();

    const image =
        dataAsset.documents.find(
            (doc) =>
                doc.file_path.endsWith('.jpg') ||
                doc.file_path.endsWith('.png'),
        )?.file_path ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbs0vCHg_BgDHk7PcAG1KlgccMtNurSJ4YDg&s';
    const urlAssetImage = image.startsWith('https')
        ? image
        : `/storage/${image}`;

    const handleUpdateQR = (id: number) => {
        router.post(
            `/master/assets/assignment/${id}/update-qr?_method=PATCH`,
            {
                key_qr: qrKey,
            },
            {
                onSuccess: () => {
                    toast.success('QR Key updated');
                },
                onError: (errors) => {
                    toast.error(errors.key_qr || 'Failed to update QR Key');
                },
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`View Asset ${dataAsset.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                            View Data Assets
                        </h1>
                        <p className="text-gray-600 dark:text-muted-foreground">
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
                            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        <img
                                            src={urlAssetImage}
                                            alt={`asset image`}
                                            className="rounded-md border"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2 text-sm">
                                    <Row
                                        k="Nomor Inventaris"
                                        v={dataAsset.inventory_number}
                                    />
                                    <Row k="Item" v={dataAsset.item_name} />
                                    <Row k="Tipe" v={dataAsset.type.name} />
                                    <Row
                                        k="Brand/Model"
                                        v={dataAsset.model.brand}
                                    />
                                    <Row
                                        k="Serial"
                                        v={dataAsset.serial_number}
                                    />
                                    <Row
                                        k="Lokasi"
                                        v={dataAsset.location.name}
                                    />
                                    <Row
                                        k="Tanggal Pembelian"
                                        v={dataAsset.purchase_date}
                                    />
                                    <Row
                                        k="Akhir Garansi"
                                        v={dataAsset.warranty_expiration}
                                    />
                                </div>
                                <div className="mt-4 flex flex-wrap justify-start gap-2 sm:justify-end md:col-span-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full sm:w-auto"
                                        onClick={() =>
                                            router.visit('/master/assets', {
                                                preserveScroll: true,
                                            })
                                        }
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full sm:w-auto"
                                        onClick={() =>
                                            router.visit(
                                                `/master/assets/${dataAsset.id}/edit`,
                                                { preserveScroll: true },
                                            )
                                        }
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>

                                    <AssignForm
                                        key={dataAsset.id}
                                        asset_id={dataAsset.id}
                                        employees={employees}
                                        orgUnits={orgUnits}
                                        className="w-full sm:w-auto"
                                    />
                                    <DeleteAssetBtn assetId={dataAsset.id} />
                                </div>{' '}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>
                                    Riwayat Servis & Perbaikan
                                </CardTitle>
                                <div className="w-40">
                                    <Select>
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
                                <CardTitle>Informasi Pengguna</CardTitle>
                                <CardDescription>
                                    Riwayat peminjaman pengguna dan status
                                    pengembalian pengguna.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {assignments.map((a) => (
                                    <div
                                        key={a.id}
                                        className="flex flex-col gap-2 rounded-md border p-3 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    {a.employee?.name
                                                        ? a.employee.name
                                                        : a.org_unit?.name}
                                                </span>
                                                {a.employee && (
                                                    <Badge variant="outline">
                                                        {a.employee.email}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Status:{' '}
                                                <span className="capitalize">
                                                    {a.status}
                                                </span>{' '}
                                                • Tgl Pinjam:{' '}
                                                {new Date(
                                                    a.created_at,
                                                ).toLocaleString()}{' '}
                                                • Kembali:{' '}
                                                {a.returned_at || '-'}
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            {a.status === 'assigned' && (
                                                <ReturnBtn
                                                    assignmentId={a.id}
                                                />
                                            )}

                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <QrCodeIcon />
                                                            QR
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <AlertDialogHeader>
                                                            <DialogTitle>
                                                                QR Code
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Scan this QR to
                                                                access the asset
                                                                information on
                                                                your device. You
                                                                can also edit
                                                                the asset link
                                                                if the QR has
                                                                been
                                                                accidentally
                                                                spreaded.
                                                            </DialogDescription>
                                                        </AlertDialogHeader>
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div
                                                                style={{
                                                                    background:
                                                                        'white',
                                                                    padding:
                                                                        '16px',
                                                                }}
                                                            >
                                                                <QRCode
                                                                    id="QRCode"
                                                                    value={
                                                                        hostUrl +
                                                                        '/detail-asset/' +
                                                                        a.key_qr
                                                                    }
                                                                    size={256}
                                                                    viewBox={`0 0 21 21`}
                                                                />
                                                            </div>

                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    const svg =
                                                                        document.getElementById(
                                                                            'QRCode',
                                                                        );
                                                                    if (!svg)
                                                                        return;
                                                                    const svgData =
                                                                        new XMLSerializer().serializeToString(
                                                                            svg,
                                                                        );
                                                                    const canvas =
                                                                        document.createElement(
                                                                            'canvas',
                                                                        );
                                                                    const ctx =
                                                                        canvas.getContext(
                                                                            '2d',
                                                                        );
                                                                    const img =
                                                                        new Image();
                                                                    img.onload =
                                                                        () => {
                                                                            canvas.width =
                                                                                img.width;
                                                                            canvas.height =
                                                                                img.height;
                                                                            ctx?.drawImage(
                                                                                img,
                                                                                0,
                                                                                0,
                                                                            );
                                                                            const pngFile =
                                                                                canvas.toDataURL(
                                                                                    'image/png',
                                                                                );
                                                                            const downloadLink =
                                                                                document.createElement(
                                                                                    'a',
                                                                                );
                                                                            downloadLink.download =
                                                                                'QRCode';
                                                                            downloadLink.href = `${pngFile}`;
                                                                            downloadLink.click();
                                                                        };
                                                                    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
                                                                }}
                                                                size="sm"
                                                                className="mt-2"
                                                            >
                                                                Download QR
                                                            </Button>

                                                            <div className="w-full space-y-2 pt-4">
                                                                <Label htmlFor="qr-key">
                                                                    QR Key
                                                                </Label>
                                                                <Input
                                                                    id="qr-key"
                                                                    name="qr-key"
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setQrKey(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    defaultValue={
                                                                        a.key_qr
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose
                                                                asChild
                                                            >
                                                                <Button variant="outline">
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>
                                                            <Button
                                                                onClick={() =>
                                                                    handleUpdateQR(
                                                                        a.id,
                                                                    )
                                                                }
                                                                type="submit"
                                                            >
                                                                Save changes
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>
                                        </div>
                                    </div>
                                ))}
                                {assignments.length === 0 && (
                                    <div className="text-sm text-muted-foreground">
                                        Belum ada riwayat peminjaman.
                                    </div>
                                )}
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
