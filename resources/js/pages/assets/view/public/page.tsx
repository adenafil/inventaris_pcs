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
import { QrCodeIcon } from 'lucide-react';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Assignment } from './_types';
import { Head } from '@inertiajs/react';

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

export default function Page({ assignment }: { assignment: Assignment }) {
    console.log(assignment);

    // in the meantime, let the fake data appear, until the api is ready
    const [filter, setFilter] = useState<
        'all' | 'service' | 'repair' | 'other'
    >('all');
    const [qrUrl, setQrUrl] = useState<string>('');

    const filtered = logsDummy.filter(
        (l) => filter === 'all' || l.type === filter,
    );

    const image =
        assignment.asset.documents.find(
            (doc) =>
                doc.file_path.endsWith('.jpg') ||
                doc.file_path.endsWith('.png'),
        )?.file_path ||
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbs0vCHg_BgDHk7PcAG1KlgccMtNurSJ4YDg&s';
    const urlAssetImage = image.startsWith('https')
        ? image
        : `/storage/${image}`;

    return (
        <div className="flex h-full min-h-screen flex-1 flex-col">
            {/* Navbar */}
            <Head title={`Detail Asset - ${assignment.asset.item_name}`} />
            <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
                <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo PCS"
                            className="h-10 w-auto"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
                                Inventaris PCS
                            </h1>
                            <p className="hidden text-xs text-gray-600 sm:block">
                                Petrokopindo Cipta Selaras
                            </p>
                        </div>
                    </div>
                </div>
            </nav>

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
                                        v={assignment.asset.inventory_number}
                                    />
                                    <Row
                                        k="Item"
                                        v={assignment.asset.item_name}
                                    />
                                    <Row
                                        k="Tipe"
                                        v={assignment.asset.type.name}
                                    />
                                    <Row
                                        k="Brand/Model"
                                        v={assignment.asset.model.brand}
                                    />
                                    <Row
                                        k="Serial"
                                        v={assignment.asset.serial_number}
                                    />
                                    <Row
                                        k="Lokasi"
                                        v={assignment.asset.location.name}
                                    />
                                    <Row
                                        k="Tanggal Pembelian"
                                        v={assignment.asset.purchase_date}
                                    />
                                    <Row
                                        k="Akhir Garansi"
                                        v={assignment.asset.warranty_expiration}
                                    />
                                </div>
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
                                                {assignment.employee?.name
                                                    ? assignment.employee.name
                                                    : assignment.org_unit?.name}
                                            </span>
                                            {assignment.employee && (
                                                <Badge variant="outline">
                                                    {assignment.employee.email}
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Status:{' '}
                                            <span className="capitalize">
                                                {assignment.status}
                                            </span>{' '}
                                            • Tgl Pinjam:{' '}
                                            {new Date(
                                                assignment.created_at,
                                            ).toLocaleString()}{' '}
                                            • Kembali:{' '}
                                            {assignment.returned_at || '-'}
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
                                                            information on your
                                                            device.
                                                        </DialogDescription>
                                                    </AlertDialogHeader>
                                                    <div className="flex flex-col items-center justify-center">
                                                        <QRCode
                                                            id="QRCode"
                                                            value={`http://localhost/detail-asset/${assignment.key_qr}`}
                                                            size={256}
                                                            viewBox={`0 0 21 21`}
                                                        />
                                                    </div>
                                                    <DialogFooter className="mt-4">
                                                        <DialogClose asChild>
                                                            <Button variant="outline">
                                                                Back
                                                            </Button>
                                                        </DialogClose>
                                                        <Button
                                                            type="submit"
                                                            onClick={() => {
                                                                const svg =
                                                                    document.getElementById(
                                                                        'QRCode',
                                                                    );
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
                                                                        ctx.drawImage(
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
                                                        >
                                                            <QrCodeIcon />
                                                            Download QR
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </form>
                                        </Dialog>
                                    </div>
                                </div>
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
