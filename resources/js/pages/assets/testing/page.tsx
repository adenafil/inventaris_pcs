'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
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
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import * as React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Assets',
        href: '/assets',
    },
];


// Types
type AssetType = 'laptop' | 'smartphone';
type CreatedBy = 'admin it' | 'admin kantor';
type ServiceKind = 'service' | 'perbaikan' | 'lainnya';

type ServiceLog = {
    id: string;
    type: ServiceKind;
    date: string;
    note: string;
};

type BorrowLog = {
    id: string;
    employeeName: string;
    emailOrDept: string; // email pegawai / bidang kantor (Umum & IT)
    status: 'dipinjam' | 'dikembalikan';
    borrowDate: string;
    returned: boolean;
};

type Asset = {
    id: string;
    noInvent: string;
    name: string;
    type: AssetType;
    brand: string;
    model: string;
    serial: string;
    location: string;
    purchaseYear: number;
    purchaseDate: string;
    warrantyEnd: string;
    createdBy: CreatedBy;
    imageUrl?: string;
    serviceLogs: ServiceLog[];
    borrowLogs: BorrowLog[];
};

// Dummy data
const DUMMY_ASSETS: Asset[] = [
    {
        id: 'A1',
        noInvent: 'INV-0001',
        name: 'Laptop Kerja Marketing',
        type: 'laptop',
        brand: 'Dell',
        model: 'Latitude 7440',
        serial: 'DL-7440-2023-ABCD',
        location: 'Kantor Pusat',
        purchaseYear: 2023,
        purchaseDate: '2023-03-14',
        warrantyEnd: '2026-03-14',
        createdBy: 'admin it',
        imageUrl: '/laptop-dell-product-shot.jpg',
        serviceLogs: [
            {
                id: 'S1',
                type: 'service',
                date: '2024-01-08',
                note: 'Pembersihan fan dan thermal paste',
            },
            {
                id: 'S2',
                type: 'perbaikan',
                date: '2024-05-22',
                note: 'Ganti keyboard',
            },
        ],
        borrowLogs: [
            {
                id: 'B1',
                employeeName: 'Sinta Dewi',
                emailOrDept: 'sinta@company.com',
                status: 'dipinjam',
                borrowDate: '2024-06-01',
                returned: false,
            },
            {
                id: 'B2',
                employeeName: 'Tim IT',
                emailOrDept: 'Departemen IT',
                status: 'dikembalikan',
                borrowDate: '2024-02-14',
                returned: true,
            },
        ],
    },
    {
        id: 'A2',
        noInvent: 'INV-0002',
        name: 'Smartphone Operasional',
        type: 'smartphone',
        brand: 'Samsung',
        model: 'Galaxy A54',
        serial: 'SM-A54-2024-XYZ',
        location: 'Kantor Cabang',
        purchaseYear: 2024,
        purchaseDate: '2024-02-01',
        warrantyEnd: '2026-02-01',
        createdBy: 'admin kantor',
        imageUrl: '/samsung-galaxy-product-shot.jpg',
        serviceLogs: [
            {
                id: 'S3',
                type: 'lainnya',
                date: '2024-08-10',
                note: 'Penggantian casing pelindung',
            },
        ],
        borrowLogs: [
            {
                id: 'B3',
                employeeName: 'Bagian Umum',
                emailOrDept: 'Umum',
                status: 'dipinjam',
                borrowDate: '2024-08-12',
                returned: false,
            },
        ],
    },
];

// Utility: simple download of a placeholder QR as SVG
function downloadQR(noInvent: string) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><rect width='100%' height='100%' fill='white'/><text x='50%' y='50%' dominantBaseline='middle' textAnchor='middle' fontSize='14' fontFamily='monospace'>QR ${noInvent}</text></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QR-${noInvent}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// Views state
type ViewMode = 'list' | 'view' | 'edit' | 'add';

export default function AssetsPage() {
    const [view, setView] = React.useState<ViewMode>('list');
    const [assets] = React.useState<Asset[]>(DUMMY_ASSETS);
    const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(
        null,
    );
    const [tab, setTab] = React.useState<CreatedBy>('admin it');
    const [search, setSearch] = React.useState('');
    const [filterType, setFilterType] = React.useState<AssetType | 'all'>(
        'all',
    );

    const filtered = React.useMemo(() => {
        return assets
            .filter((a) => a.createdBy === tab)
            .filter((a) =>
                filterType === 'all' ? true : a.type === filterType,
            )
            .filter((a) => {
                const q = search.toLowerCase();
                return (
                    a.noInvent.toLowerCase().includes(q) ||
                    a.name.toLowerCase().includes(q) ||
                    a.brand.toLowerCase().includes(q) ||
                    a.location.toLowerCase().includes(q)
                );
            });
    }, [assets, tab, search, filterType]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Assets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">


                    <ListView
                        tab={tab}
                        onTabChange={setTab}
                        search={search}
                        onSearch={setSearch}
                        filterType={filterType}
                        onFilterType={setFilterType}
                        data={filtered}
                        onView={(asset) => {
                            setSelectedAsset(asset);
                            setView('view');
                        }}
                        onEdit={(asset) => {
                            setSelectedAsset(asset);
                            setView('edit');
                        }}
                    />
                </main>
            </div>
        </AppLayout>

        // <main className="mx-auto w-full max-w-7xl px-4 py-8 font-sans">
        //     <Header
        //         onAdd={() => {
        //             setSelectedAsset(null);
        //             setView('add');
        //         }}
        //     />
        //     {view === 'list' && (
        //         <ListView
        //             tab={tab}
        //             onTabChange={setTab}
        //             search={search}
        //             onSearch={setSearch}
        //             filterType={filterType}
        //             onFilterType={setFilterType}
        //             data={filtered}
        //             onView={(asset) => {
        //                 setSelectedAsset(asset);
        //                 setView('view');
        //             }}
        //             onEdit={(asset) => {
        //                 setSelectedAsset(asset);
        //                 setView('edit');
        //             }}
        //         />
        //     )}
        //     {view === 'view' && selectedAsset && (
        //         <ViewAsset
        //             asset={selectedAsset}
        //             onBack={() => setView('list')}
        //             onEdit={() => setView('edit')}
        //             onDelete={() => {
        //                 // ... logic not required; UI only
        //             }}
        //             onAssign={() => {
        //                 // ... logic not required; handled by Sheet/Dialog in component
        //             }}
        //         />
        //     )}
        //     {(view === 'edit' || view === 'add') && (
        //         <AssetForm
        //             mode={view}
        //             asset={view === 'edit' ? selectedAsset : null}
        //             onBack={() => setView('list')}
        //             onSave={() => setView('list')}
        //         />
        //     )}
        // </main>
    );
}

// Header with title and description
function Header({ onAdd }: { onAdd: () => void }) {
    return (
        <header className="mb-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-balance">
                        Data Assets
                    </h1>
                    <p className="text-pretty text-muted-foreground">
                        Kelola data inventaris perangkat kantor dan IT, termasuk
                        detail, riwayat servis, dan peminjaman.
                    </p>
                </div>
                <Button onClick={onAdd}>Tambah Asset</Button>
            </div>
            <Separator className="mt-4" />
        </header>
    );
}

// List View: Tabs (Admin IT/Kantor), Search, Type Filter, Table with actions
function ListView(props: {
    tab: CreatedBy;
    onTabChange: (v: CreatedBy) => void;
    search: string;
    onSearch: (v: string) => void;
    filterType: AssetType | 'all';
    onFilterType: (v: AssetType | 'all') => void;
    data: Asset[];
    onView: (asset: Asset) => void;
    onEdit: (asset: Asset) => void;
}) {
    const {
        tab,
        onTabChange,
        search,
        onSearch,
        filterType,
        onFilterType,
        data,
        onView,
        onEdit,
    } = props;

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>List Assets</CardTitle>
                <CardDescription>
                    Filter berdasarkan kategori admin, pencarian, dan tipe
                    barang.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Tabs
                    value={tab}
                    onValueChange={(v) => onTabChange(v as CreatedBy)}
                    className="w-full"
                >
                    <TabsList>
                        <TabsTrigger value="admin it">Admin IT</TabsTrigger>
                        <TabsTrigger value="admin kantor">
                            Admin Kantor
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="admin it" className="space-y-4">
                        <ControlsRow
                            search={search}
                            onSearch={onSearch}
                            filterType={filterType}
                            onFilterType={onFilterType}
                        />
                        <AssetsTable
                            data={data}
                            onView={onView}
                            onEdit={onEdit}
                        />
                    </TabsContent>
                    <TabsContent value="admin kantor" className="space-y-4">
                        <ControlsRow
                            search={search}
                            onSearch={onSearch}
                            filterType={filterType}
                            onFilterType={onFilterType}
                        />
                        <AssetsTable
                            data={data}
                            onView={onView}
                            onEdit={onEdit}
                        />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}

function ControlsRow(props: {
    search: string;
    onSearch: (v: string) => void;
    filterType: AssetType | 'all';
    onFilterType: (v: AssetType | 'all') => void;
}) {
    const { search, onSearch, filterType, onFilterType } = props;
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full flex-1 items-center gap-2">
                <div className="w-full max-w-md">
                    <Label htmlFor="search" className="sr-only">
                        Pencarian
                    </Label>
                    <Input
                        id="search"
                        placeholder="Cari (No. invent, nama, brand, lokasi)"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
                <div className="w-full max-w-xs">
                    <Label className="sr-only">Tipe</Label>
                    <Select
                        value={filterType}
                        onValueChange={(v) =>
                            onFilterType(v as AssetType | 'all')
                        }
                    >
                        <SelectTrigger aria-label="Filter tipe barang">
                            <SelectValue placeholder="Pilih tipe barang" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Tipe</SelectItem>
                            <SelectItem value="laptop">Laptop</SelectItem>
                            <SelectItem value="smartphone">
                                Smartphone
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}

function AssetsTable(props: {
    data: Asset[];
    onView: (asset: Asset) => void;
    onEdit: (asset: Asset) => void;
}) {
    const { data, onView, onEdit } = props;
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No. Invent</TableHead>
                        <TableHead>Nama Item</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Tahun Pembelian</TableHead>
                        <TableHead>Create By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((a) => (
                        <TableRow key={a.id}>
                            <TableCell className="font-medium">
                                {a.noInvent}
                            </TableCell>
                            <TableCell>{a.name}</TableCell>
                            <TableCell className="capitalize">
                                {a.type}
                            </TableCell>
                            <TableCell>{a.brand}</TableCell>
                            <TableCell>{a.location}</TableCell>
                            <TableCell>{a.purchaseYear}</TableCell>
                            <TableCell className="capitalize">
                                {a.createdBy}
                            </TableCell>
                            <TableCell className="space-x-2 text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onView(a)}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(a)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => downloadQR(a.noInvent)}
                                >
                                    View QR
                                </Button>
                                <AssignSheet
                                    trigger={<Button size="sm">Assign</Button>}
                                    asset={a}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    {data.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="text-center text-muted-foreground"
                            >
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

// Assign Sheet (UI placeholder)
function AssignSheet({
    trigger,
    asset,
}: {
    trigger: React.ReactNode;
    asset: Asset;
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md">
                <SheetHeader>
                    <SheetTitle>Assign Asset</SheetTitle>
                    <SheetDescription>
                        Assign asset ke pegawai atau bagian.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-3">
                    <div>
                        <Label>No. Inventaris</Label>
                        <Input value={asset.noInvent} readOnly />
                    </div>
                    <div>
                        <Label>Nama Pegawai</Label>
                        <Input placeholder="Nama pegawai" />
                    </div>
                    <div>
                        <Label>Email/Bidang</Label>
                        <Input placeholder="email@company.com atau Departemen" />
                    </div>
                    <div>
                        <Label>Tanggal Peminjaman</Label>
                        <Input type="date" />
                    </div>
                </div>
                <SheetFooter className="mt-6">
                    <Button>Assign</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

// View Asset Detail
function ViewAsset(props: {
    asset: Asset;
    onBack: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onAssign: () => void;
}) {
    const { asset, onBack, onEdit } = props;
    const [serviceFilter, setServiceFilter] = React.useState<
        ServiceKind | 'all'
    >('all');

    const filteredLogs = React.useMemo(
        () =>
            serviceFilter === 'all'
                ? asset.serviceLogs
                : asset.serviceLogs.filter((l) => l.type === serviceFilter),
        [asset.serviceLogs, serviceFilter],
    );

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <CardTitle>Detail Asset</CardTitle>
                        <CardDescription>
                            Informasi lengkap asset dan tindakan.
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onBack}>
                            Kembali
                        </Button>
                        <Button variant="outline" onClick={onEdit}>
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                        >
                            Delete
                        </Button>
                        <AssignSheet
                            trigger={<Button>Assign</Button>}
                            asset={asset}
                        />
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-start gap-4">
                        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted md:max-w-[320px]">
                            <img
                                src={
                                    asset.imgUrl ||
                                    '/placeholder.svg?height=200&width=320&query=product%20img'
                                }
                                alt={`Gambar ${asset.name}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="grid flex-1 grid-cols-2 gap-3 text-sm">
                            <Info
                                label="No. Inventaris"
                                value={asset.noInvent}
                            />
                            <Info label="Nama Item" value={asset.name} />
                            <Info label="Tipe" value={asset.type} />
                            <Info
                                label="Brand/Model"
                                value={`${asset.brand} / ${asset.model}`}
                            />
                            <Info label="Serial" value={asset.serial} />
                            <Info label="Lokasi" value={asset.location} />
                            <Info
                                label="Tgl. Pembelian"
                                value={asset.purchaseDate}
                            />
                            <Info
                                label="Akhir Garansi"
                                value={asset.warrantyEnd}
                            />
                            <Info label="Create By" value={asset.createdBy} />
                            <div className="col-span-2 flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => downloadQR(asset.noInvent)}
                                >
                                    View QR
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="secondary">
                                            Download QR
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Download QR Code
                                            </DialogTitle>
                                            <DialogDescription>
                                                Unduh QR untuk {asset.noInvent}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center justify-center">
                                            <div className="relative h-40 w-40 overflow-hidden rounded bg-card">
                                                <img
                                                    src="/imgs/app-qrcode.png"
                                                    alt="QR Placeholder"
                                                    fill
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                onClick={() =>
                                                    downloadQR(asset.noInvent)
                                                }
                                            >
                                                Download
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Service & Repair history */}
            <Card>
                <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <CardTitle>Riwayat Servis & Perbaikan</CardTitle>
                        <CardDescription>
                            Catatan layanan pada asset.
                        </CardDescription>
                    </div>
                    <div className="w-full max-w-xs">
                        <Label className="sr-only">Filter Log</Label>
                        <Select
                            value={serviceFilter}
                            onValueChange={(v) =>
                                setServiceFilter(v as ServiceKind | 'all')
                            }
                        >
                            <SelectTrigger aria-label="Filter log servis">
                                <SelectValue placeholder="Pilih kategori log" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="service">Service</SelectItem>
                                <SelectItem value="perbaikan">
                                    Perbaikan
                                </SelectItem>
                                <SelectItem value="lainnya">Lainnya</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {filteredLogs.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Belum ada catatan.
                        </p>
                    )}
                    {filteredLogs.map((log) => (
                        <div
                            key={log.id}
                            className="flex items-start justify-between rounded-md border p-3"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="capitalize"
                                    >
                                        {log.type}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        {log.date}
                                    </span>
                                </div>
                                <p className="text-sm">{log.note}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                                Detail
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Borrowers / Assignees */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Peminjam (Assigned)</CardTitle>
                    <CardDescription>
                        Riwayat peminjaman dan status pengembalian.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {asset.borrowLogs.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Belum ada peminjam.
                        </p>
                    )}
                    {asset.borrowLogs.map((b) => (
                        <div
                            key={b.id}
                            className="flex flex-col gap-2 rounded-md border p-3 md:flex-row md:items-center md:justify-between"
                        >
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-medium">
                                        {b.employeeName}
                                    </span>
                                    <Badge variant="outline">
                                        {b.emailOrDept}
                                    </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Status:{' '}
                                    <span className="capitalize">
                                        {b.status}
                                    </span>{' '}
                                    • Tgl Pinjam: {b.borrowDate} • Kembali:{' '}
                                    {b.returned ? 'Ya' : 'Belum'}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => downloadQR(b.id)}
                                >
                                    View QR
                                </Button>
                                <Button variant="secondary">Return</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

function Info({ label, value }: { label: string; value?: React.ReactNode }) {
    return (
        <div>
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="text-sm font-medium">{value ?? '-'}</div>
        </div>
    );
}

// Form for Add/Edit
function AssetForm(props: {
    mode: 'add' | 'edit';
    asset: Asset | null;
    onBack: () => void;
    onSave: () => void;
}) {
    const { mode, asset, onBack, onSave } = props;

    const [type, setType] = React.useState<AssetType>(asset?.type ?? 'laptop');
    const [location, setLocation] = React.useState<string>(
        asset?.location ?? '',
    );
    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<
        { name: string; url?: string; isPdf?: boolean }[]
    >([]);

    React.useEffect(() => {
        if (files.length === 0) {
            setPreviews([]);
            return;
        }
        const next = files.map((f) => ({
            name: f.name,
            url: f.type.startsWith('img/')
                ? URL.createObjectURL(f)
                : undefined,
            isPdf: f.type === 'application/pdf',
        }));
        setPreviews(next);
        return () => {
            next.forEach((p) => p.url && URL.revokeObjectURL(p.url));
        };
    }, [files]);

    return (
        <Card>
            <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>
                        {mode === 'add' ? 'Tambah Asset' : 'Edit Asset'}
                    </CardTitle>
                    <CardDescription>
                        Isi form asset. Untuk demo, data tidak disimpan.
                    </CardDescription>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={onBack}>
                        Back
                    </Button>
                    <Button onClick={onSave}>Save</Button>
                </div>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                    <div>
                        <Label htmlFor="noInvent">Nomor Inventaris</Label>
                        <Input
                            id="noInvent"
                            defaultValue={asset?.noInvent}
                            placeholder="Contoh: INV-0003"
                        />
                    </div>
                    <div>
                        <Label htmlFor="itemName">Nama Item</Label>
                        <Input
                            id="itemName"
                            defaultValue={asset?.name}
                            placeholder="Nama item"
                        />
                    </div>
                    <div>
                        <Label>Tipe Barang</Label>
                        <Select
                            value={type}
                            onValueChange={(v) => setType(v as AssetType)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="laptop">Laptop</SelectItem>
                                <SelectItem value="smartphone">
                                    Smartphone
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="model">Model Barang</Label>
                        <Input
                            id="model"
                            defaultValue={asset?.model}
                            placeholder="Contoh: Latitude 7440"
                        />
                    </div>
                    <div>
                        <Label htmlFor="serial">Serial Number</Label>
                        <Input
                            id="serial"
                            defaultValue={asset?.serial}
                            placeholder="Nomor seri"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label htmlFor="purchaseDate">
                                Tanggal Pembelian
                            </Label>
                            <Input
                                id="purchaseDate"
                                type="date"
                                defaultValue={asset?.purchaseDate}
                            />
                        </div>
                        <div>
                            <Label htmlFor="warrantyEnd">Akhir Garansi</Label>
                            <Input
                                id="warrantyEnd"
                                type="date"
                                defaultValue={asset?.warrantyEnd}
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Lokasi</Label>
                        <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih lokasi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Kantor Pusat">
                                    Kantor Pusat
                                </SelectItem>
                                <SelectItem value="Kantor Cabang">
                                    Kantor Cabang
                                </SelectItem>
                                <SelectItem value="Gudang">Gudang</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="attachments">
                            Foto / Dokumen (pdf)
                        </Label>
                        <Input
                            id="attachments"
                            type="file"
                            multiple
                            accept="img/*,application/pdf"
                            onChange={(e) =>
                                setFiles(Array.from(e.target.files || []))
                            }
                        />
                        {previews.length > 0 && (
                            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                                {previews.map((p, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 rounded-md border p-2"
                                    >
                                        <div className="relative h-12 w-12 overflow-hidden rounded bg-muted">
                                            {p.isPdf ? (
                                                <span className="flex h-full w-full items-center justify-center text-xs">
                                                    PDF
                                                </span>
                                            ) : (
                                                p.url && (
                                                    <img
                                                        src={
                                                            p.url ||
                                                            '/placeholder.svg'
                                                        }
                                                        alt={p.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="truncate text-sm font-medium">
                                                {p.name}
                                            </div>
                                            <div className="truncate text-xs text-muted-foreground">
                                                {p.isPdf
                                                    ? 'Dokumen PDF'
                                                    : 'Gambar'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="notes">Catatan</Label>
                        <Textarea
                            id="notes"
                            placeholder="Catatan tambahan (opsional)"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onSave}>Save</Button>
            </CardFooter>
        </Card>
    );
}
