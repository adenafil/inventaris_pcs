import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetClose,
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
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, InfiniteScroll, Link } from '@inertiajs/react';
import { Check, ChevronsUpDown, Eye, Pencil, QrCode, Trash2, UserCheck } from 'lucide-react';
import { useState } from 'react';
import {
    type Asset,
    assetsIT,
    assetsKantor,
    assetTypes,
} from './_components/lib/assets-data';
import { QrModal } from './_components/qr-modal';
import { PageProps } from './_types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Assets',
        href: '/assets',
    },
];

export default function Page({ dataAssets, employees, orgUnits }: PageProps) {
    console.log({ dataAssets, employees, orgUnits });

    const [isOpenPegawai, setOpenPegawai] = useState(false);
    const [isOpenBidang, setOpenBidang] = useState(false);
    const [typePengguna, setTypePengguna] = useState<'pegawai' | 'bidang' | 'tidak-diassign' | ''>('');

    const [tab, setTab] = useState<'it' | 'kantor'>('it');
    const [search, setSearch] = useState('');
    const [tipe, setTipe] = useState<string>('all'); // Updated default value
    const [qrAsset, setQrAsset] = useState<Asset | null>(null);

    const dataSrc = tab === 'it' ? assetsIT : assetsKantor;
    const filtered = dataSrc.filter((a) => {
        const q = search.toLowerCase();
        const matchQ =
            !q ||
            a.nomorInvent.toLowerCase().includes(q) ||
            a.item.toLowerCase().includes(q) ||
            a.brand.toLowerCase().includes(q) ||
            a.pemakai.toLowerCase().includes(q) ||
            a.lokasi.toLowerCase().includes(q);
        const matchTipe = !tipe || a.tipe === tipe;
        return matchQ && matchTipe;
    });

    const onViewQr = (asset: Asset) => {
        console.log('[v0] open qr for asset:', asset.id);
        setQrAsset(asset);
    };

    const onDelete = (asset: Asset) => {
        console.log('[v0] delete asset clicked:', asset);
        alert('Dummy: delete action logged to console.');
    };

    const qrValue = qrAsset
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${qrAsset.id}`
        : '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Assets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                Data Assets
                            </h1>
                            <p className="text-gray-600">
                                Kelola data aset perangkat di dalam sistem.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Pencarian…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-48 md:w-64"
                            />
                            <Select value={tipe} onValueChange={setTipe}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Tipe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua</SelectItem>{' '}
                                    {/* Updated value prop */}
                                    {assetTypes.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Link preserveScroll href="/master/assets/create">
                                <Button>Add Asset</Button>
                            </Link>
                        </div>
                    </div>

                    <Tabs
                        value={tab}
                        onValueChange={(v) => setTab(v as 'it' | 'kantor')}
                    >
                        <TabsList>
                            <TabsTrigger value="it">Admin IT</TabsTrigger>
                            <TabsTrigger value="kantor">Kantor</TabsTrigger>
                        </TabsList>
                        <TabsContent value="it" className="mt-4">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No. Invent</TableHead>
                                            <TableHead>Item</TableHead>
                                            <TableHead>Tipe</TableHead>
                                            <TableHead>Brand</TableHead>
                                            <TableHead>Lokasi</TableHead>
                                            <TableHead>Created By</TableHead>
                                            <TableHead className="text-center">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dataAssets.data.map((data) => (
                                            <TableRow>
                                                <TableCell className="whitespace-nowrap">
                                                    {data.inventory_number}
                                                </TableCell>
                                                <TableCell>
                                                    {data.item_name}
                                                </TableCell>
                                                <TableCell>
                                                    {data.type.name}
                                                </TableCell>
                                                <TableCell>
                                                    {data.model.brand}
                                                </TableCell>
                                                <TableCell>
                                                    Umum Dan IT
                                                </TableCell>
                                                <TableCell>
                                                    {data.creator.name}
                                                </TableCell>
                                                <TableCell className="space-x-2 text-center">
                                                    <Link href={`/`}>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="inline-flex gap-1 bg-transparent"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/master/assets/${data.id}/edit`}>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="inline-flex gap-1 bg-transparent"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="inline-flex gap-1 bg-transparent"
                                                    >
                                                        <QrCode className="h-4 w-4" />
                                                        QR
                                                    </Button>
                                                    <Sheet>
                                                        <SheetTrigger asChild>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="inline-flex gap-1 bg-transparent"
                                                            >
                                                                <UserCheck className="h-4 w-4" />
                                                                Assign
                                                            </Button>
                                                        </SheetTrigger>
                                                        <SheetContent>
                                                            <SheetHeader>
                                                                <SheetTitle>
                                                                    Assignment
                                                                </SheetTitle>
                                                                <SheetDescription>
                                                                    Assign this
                                                                    asset to
                                                                    employee or
                                                                    bidang.
                                                                </SheetDescription>
                                                            </SheetHeader>
                                                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                                                <div
                                                                    className={`grid w-full gap-2 sm:col-span-2`}
                                                                >
                                                                    <Label>
                                                                        Pengguna
                                                                    </Label>
                                                                    <Select
                                                                        value={
                                                                            typePengguna
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) => {
                                                                            setTypePengguna(
                                                                                value as
                                                                                    | 'pegawai'
                                                                                    | 'bidang'
                                                                                    | 'tidak-diassign'
                                                                                    | '',
                                                                            );
                                                                            if (
                                                                                value ===
                                                                                'pegawai'
                                                                            ) {
                                                                                setOpenPegawai(
                                                                                    true,
                                                                                );
                                                                                setOpenBidang(
                                                                                    false,
                                                                                );
                                                                            } else if (
                                                                                value ===
                                                                                'bidang'
                                                                            ) {
                                                                                setOpenBidang(
                                                                                    true,
                                                                                );
                                                                                setOpenPegawai(
                                                                                    false,
                                                                                );
                                                                            } else {
                                                                                setOpenBidang(
                                                                                    false,
                                                                                );
                                                                                setOpenPegawai(
                                                                                    false,
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Pilih tipe pengguna" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="pegawai">
                                                                                Pegawai
                                                                            </SelectItem>
                                                                            <SelectItem value="bidang">
                                                                                Bidang
                                                                            </SelectItem>
                                                                            <SelectItem value="tidak-diassign">
                                                                                Tidak
                                                                                Diassign
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                {typePengguna ===
                                                                    'pegawai' && (
                                                                    <div className="grid w-full gap-2 sm:col-span-2">
                                                                        <Label>
                                                                            Pilih
                                                                            Pegawai
                                                                        </Label>
                                                                        <Popover
                                                                            open={
                                                                                isOpenPegawai
                                                                            }
                                                                            onOpenChange={
                                                                                setOpenPegawai
                                                                            }
                                                                        >
                                                                            <PopoverTrigger
                                                                                asChild
                                                                            >
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    aria-expanded={
                                                                                        isOpenPegawai
                                                                                    }
                                                                                    className="w-full justify-between bg-transparent font-normal"
                                                                                >
                                                                                    {`Pilih pegawai...`}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent
                                                                                className="w-full p-0"
                                                                                align="start"
                                                                            >
                                                                                <Command>
                                                                                    <CommandInput placeholder="Cari pegawai..." />
                                                                                    <CommandList>
                                                                                        <CommandEmpty>
                                                                                            Tidak
                                                                                            ditemukan.
                                                                                        </CommandEmpty>
                                                                                        <CommandGroup>
                                                                                            <InfiniteScroll
                                                                                                data="employees"
                                                                                                buffer={
                                                                                                    1
                                                                                                }
                                                                                            >
                                                                                                {employees!.data.map(
                                                                                                    (
                                                                                                        u,
                                                                                                    ) => (
                                                                                                        <CommandItem
                                                                                                            key={
                                                                                                                u.id
                                                                                                            }
                                                                                                            value={u.name.toString()}
                                                                                                            onSelect={() => {
                                                                                                                setOpenPegawai(
                                                                                                                    false,
                                                                                                                );
                                                                                                            }}
                                                                                                        >
                                                                                                            <Check
                                                                                                                className={cn(
                                                                                                                    'mr-2 h-4 w-4',
                                                                                                                    employees
                                                                                                                        .data
                                                                                                                        .length ===
                                                                                                                        u.id
                                                                                                                        ? 'opacity-100'
                                                                                                                        : 'opacity-0',
                                                                                                                )}
                                                                                                            />
                                                                                                            {
                                                                                                                u.name
                                                                                                            }
                                                                                                        </CommandItem>
                                                                                                    ),
                                                                                                )}
                                                                                            </InfiniteScroll>
                                                                                        </CommandGroup>
                                                                                    </CommandList>
                                                                                </Command>
                                                                            </PopoverContent>
                                                                        </Popover>
                                                                    </div>
                                                                )}
                                                                {typePengguna ===
                                                                    'bidang' && (
                                                                    <div className="grid w-full gap-2 sm:col-span-2">
                                                                        <Label>
                                                                            Pilih
                                                                            Bidang
                                                                        </Label>
                                                                        <Select
                                                                            value={
                                                                                ''
                                                                            }
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Pilih bidang" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <InfiniteScroll
                                                                                    data="employees"
                                                                                    buffer={
                                                                                        1
                                                                                    }
                                                                                >
                                                                                    {orgUnits?.data.map(
                                                                                        (
                                                                                            dept,
                                                                                        ) => (
                                                                                            <SelectItem
                                                                                                key={
                                                                                                    dept.id
                                                                                                }
                                                                                                value={dept.id.toString()}
                                                                                            >
                                                                                                {
                                                                                                    dept.name
                                                                                                }
                                                                                            </SelectItem>
                                                                                        ),
                                                                                    )}
                                                                                </InfiniteScroll>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                )}

                                                                {/* create me dokuement peminjaman */}
                                                                <div className="grid w-full gap-2 sm:col-span-2">
                                                                    <Label>
                                                                        Dokumen
                                                                        Peminjaman*
                                                                        <span className="text-destructive">
                                                                            {' '}
                                                                            (jpg,
                                                                            png,
                                                                            pdf)
                                                                        </span>
                                                                    </Label>
                                                                    <Input
                                                                        className="w-full"
                                                                        type="file"
                                                                        accept=".pdf,.jpg,.png"
                                                                    />
                                                                </div>

                                                                <div className="grid gap-2 sm:col-span-2">
                                                                    <Label>
                                                                        Keterangan
                                                                        (opsional)
                                                                    </Label>
                                                                    <Textarea placeholder="Catatan tambahan…" />
                                                                </div>
                                                            </div>
                                                            <SheetFooter>
                                                                <Button type="submit">
                                                                    Assign
                                                                </Button>
                                                                <SheetClose
                                                                    asChild
                                                                >
                                                                    <Button variant="outline">
                                                                        Close
                                                                    </Button>
                                                                </SheetClose>
                                                            </SheetFooter>
                                                        </SheetContent>
                                                    </Sheet>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="inline-flex gap-1"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                        \{' '}
                    </Tabs>
                </main>

                <QrModal
                    open={!!qrAsset}
                    onOpenChange={(v) => !v && setQrAsset(null)}
                    value={qrValue}
                    title={qrAsset ? `QR - ${qrAsset.nomorInvent}` : 'QR'}
                />
            </div>
        </AppLayout>
    );
}
