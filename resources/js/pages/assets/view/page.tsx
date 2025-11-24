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
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
import { Head, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Edit, QrCodeIcon } from 'lucide-react';
import { domToPng } from 'modern-screenshot';
import { QRCode } from 'react-qrcode-logo';
import { toast } from 'sonner';
import AssignForm from '../_components/assign-form';
import DeleteAssetBtn from '../_components/delete-asset-btn';
import ReturnBtn from './_components/return-btn';
import { PageProps } from './_types';
import CustomeQr from './_components/custome-qr';
import { useRef, useState } from 'react';
import { logoPCS } from '@/constants/app';

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
    const qrRef = useRef<any>(null);

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

    const [qrConfig, setQrConfig] = useState({
        logoImage: '/assets/images/logo-pcs.png',
        imageBinary: logoPCS,
        ecLevel: 'M',
        enableCors: true,
        size: 290,
        quietZone: 2,
        bgColor: '#ffffff',
        fgColor: '#000000',
        logoWidth: 85,
        logoHeight: 85,
        logoOpacity: 1,
        qrStyle: 'squares',
        removeQrCodeBehindLogo: false,
        logoPadding: 0,
        logoPaddingStyle: 'square',
        logoPaddingRadius: 0,
    });

    const [isQrConfigEnabled, setIsQrConfigEnabled] = useState(false);

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
                                                                your device or
                                                                download it
                                                            </DialogDescription>
                                                        </AlertDialogHeader>
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div
                                                                style={{
                                                                    background:
                                                                        'white',
                                                                }}
                                                                id={`qr-code-container-${dataAsset.inventory_number}`}
                                                                className="bg-white"
                                                            >
                                                                <QRCode
                                                                    ref={qrRef}
                                                                    id={`QRCode-${dataAsset.inventory_number}`}
                                                                    value={
                                                                        hostUrl +
                                                                        '/detail-asset/' +
                                                                        dataAsset.inventory_number
                                                                    }
                                                                    size={
                                                                        qrConfig.size
                                                                    }
                                                                    logoImage={
                                                                        qrConfig.imageBinary
                                                                            ? qrConfig.imageBinary
                                                                            : '/assets/images/logo-pcs.png'
                                                                    }
                                                                    logoWidth={
                                                                        qrConfig.logoWidth
                                                                    }
                                                                    logoHeight={
                                                                        qrConfig.logoHeight
                                                                    }
                                                                    ecLevel={
                                                                        qrConfig.ecLevel as
                                                                            | 'L'
                                                                            | 'M'
                                                                            | 'Q'
                                                                            | 'H'
                                                                    }
                                                                    enableCORS={
                                                                        qrConfig.enableCors
                                                                    }
                                                                    quietZone={
                                                                        qrConfig.quietZone
                                                                    }
                                                                    bgColor={
                                                                        qrConfig.bgColor
                                                                    }
                                                                    fgColor={
                                                                        qrConfig.fgColor
                                                                    }
                                                                    logoOpacity={
                                                                        qrConfig.logoOpacity
                                                                    }
                                                                    qrStyle={
                                                                        qrConfig.qrStyle as
                                                                            | 'squares'
                                                                            | 'dots'
                                                                            | 'fluid'
                                                                    }
                                                                    removeQrCodeBehindLogo={
                                                                        qrConfig.removeQrCodeBehindLogo
                                                                    }
                                                                    logoPadding={
                                                                        qrConfig.logoPadding
                                                                    }
                                                                    logoPaddingStyle={
                                                                        qrConfig.logoPaddingStyle as
                                                                            | 'square'
                                                                            | 'circle'
                                                                    }
                                                                    logoPaddingRadius={
                                                                        qrConfig.logoPaddingRadius
                                                                    }
                                                                />

                                                                <p className="text-center">
                                                                    Inventaris
                                                                    ID:{' '}
                                                                    {
                                                                        dataAsset.inventory_number
                                                                    }
                                                                </p>
                                                            </div>
                                                            `
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    const qrContainer =
                                                                        document.querySelector(
                                                                            `#qr-code-container-${a.id}`,
                                                                        );

                                                                    if (
                                                                        qrContainer
                                                                    ) {
                                                                        domToPng(
                                                                            qrContainer,
                                                                        )
                                                                            .then(
                                                                                (
                                                                                    dataUrl,
                                                                                ) => {
                                                                                    const link =
                                                                                        document.createElement(
                                                                                            'a',
                                                                                        );
                                                                                    link.download = `QRCode-${dataAsset.inventory_number}.png`;
                                                                                    link.href =
                                                                                        dataUrl;
                                                                                    link.click();
                                                                                },
                                                                            )
                                                                            .catch(
                                                                                (
                                                                                    error,
                                                                                ) => {
                                                                                    console.error(
                                                                                        'Failed to download QR code:',
                                                                                        error,
                                                                                    );
                                                                                    toast.error(
                                                                                        'Failed to download QR code',
                                                                                    );
                                                                                },
                                                                            );
                                                                    } else {
                                                                        toast.error(
                                                                            'QR code container not found',
                                                                        );
                                                                    }
                                                                }}
                                                                size="sm"
                                                            >
                                                                Download QR
                                                            </Button>
                                                            <div className="mt-4 flex w-full items-center justify-end gap-3">
                                                                <Label
                                                                    htmlFor="custome-qr"
                                                                    className="mt-4 text-xs"
                                                                >
                                                                    Enable QR
                                                                    Config
                                                                </Label>
                                                                <Checkbox
                                                                    id="custome-qr"
                                                                    className="mt-4"
                                                                    checked={
                                                                        isQrConfigEnabled
                                                                    }
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) => {
                                                                        setIsQrConfigEnabled(
                                                                            checked ===
                                                                                true,
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                            {isQrConfigEnabled && (
                                                                <CustomeQr
                                                                    qrConfig={
                                                                        qrConfig
                                                                    }
                                                                    setQrConfig={
                                                                        setQrConfig
                                                                    }
                                                                />
                                                            )}
                                                        </div>
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
