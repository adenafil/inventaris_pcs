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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { QrCodeIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Asset, Assignment } from './_types';
import { domToPng } from 'modern-screenshot';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import CustomeQr from '../_components/custome-qr';
import { toast } from 'sonner';
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
    asset,
    hostUrl,
}: {
    asset: Asset;
    hostUrl: string;
}) {
    console.log(asset);

    // in the meantime, let the fake data appear, until the api is ready
    const [filter, setFilter] = useState<
        'all' | 'service' | 'repair' | 'other'
    >('all');
    const [qrUrl, setQrUrl] = useState<string>('');

    const filtered = logsDummy.filter(
        (l) => filter === 'all' || l.type === filter,
    );

    const image =
        asset.documents.find(
            (doc) =>
                doc.file_path.endsWith('.jpg') ||
                doc.file_path.endsWith('.png'),
        )?.file_path ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbs0vCHg_BgDHk7PcAG1KlgccMtNurSJ4YDg&s';
    const urlAssetImage = image.startsWith('https')
        ? image
        : `/storage/${image}`;

        const qrRef = useRef<any>(null);

        const [qrConfig, setQrConfig] = useState({
            logoImage: '/assets/images/logo-pcs.png',
            ecLevel: 'M',
            enableCors: true,
            size: 290,
            imageBinary: logoPCS,
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
        <div className="flex h-full min-h-screen flex-1 flex-col">
            {/* Navbar */}
            <Head title={`Detail Asset - ${asset.item_name}`} />
            <nav className="sticky top-0 z-50 border-b bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo PCS"
                            className="h-10 w-auto dark:hidden"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-gray-100">
                                Inventaris PCS
                            </h1>
                            <p className="hidden text-xs text-gray-600 sm:block dark:text-gray-400">
                                Petrokopindo Cipta Selaras
                            </p>
                        </div>
                    </div>
                </div>
            </nav>{' '}
            {/* Main Content */}
            <div className="flex flex-1 flex-col gap-4 overflow-x-auto p-4">
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
                                        v={asset.inventory_number}
                                    />
                                    <Row k="Item" v={asset.item_name} />
                                    <Row k="Tipe" v={asset.type.name} />
                                    <Row
                                        k="Brand/Model"
                                        v={asset.model.brand}
                                    />
                                    <Row k="Serial" v={asset.serial_number} />
                                    <Row k="Lokasi" v={asset.location.name} />
                                    <Row
                                        k="Tanggal Pembelian"
                                        v={asset.purchase_date}
                                    />
                                    <Row
                                        k="Akhir Garansi"
                                        v={asset.warranty_expiration}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat Servis & Perbaikan</CardTitle>
                                <CardDescription>
                                    Pelacakan maintenance dan perbaikan aset
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 rounded-lg border border-dashed py-12">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
                                        <svg
                                            className="h-6 w-6 text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="space-y-1.5 text-center">
                                        <p className="text-sm font-medium">
                                            Fitur Dalam Pengembangan
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Riwayat servis dan perbaikan akan segera tersedia, stay tuned!
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Borrowers / Assignees */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Pengguna</CardTitle>
                                <CardDescription>
                                    Riwayat penggunaan aset dan status pengembalian.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {asset.assignments?.map((a) => (
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
                                                • Tgl dibuat:{' '}
                                                {new Date(
                                                    a.created_at,
                                                ).toLocaleString()}{' '}
                                                • Kembali:{' '}
                                                {a.returned_at || '-'}
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2">
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
                                                                id={`qr-code-container-${asset.inventory_number}`}
                                                                className="bg-white"
                                                            >
                                                                <QRCode
                                                                    ref={qrRef}
                                                                    id={`QRCode-${asset.inventory_number}`}
                                                                    value={
                                                                        hostUrl +
                                                                        '/detail-asset/' +
                                                                        asset.inventory_number
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
                                                                        asset.inventory_number
                                                                    }
                                                                </p>
                                                            </div>
                                                            `
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    const qrContainer =
                                                                        document.querySelector(
                                                                            `#qr-code-container-${asset.inventory_number}`,
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
                                                                                    link.download = `QRCode-${asset.inventory_number}.png`;
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
                                {asset?.assignments?.length === 0 && (
                                    <div className="text-sm text-muted-foreground">
                                        Belum ada riwayat peminjaman.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
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
