import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, InfiniteScroll, Link } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react';
import {
    Check,
    ChevronsUpDown,
    Eye,
    Pencil,
    QrCode,
    Trash2,
    UserCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    type Asset,
    assetsIT,
    assetsKantor,
    assetTypes,
} from './_components/lib/assets-data';
import { QrModal } from './_components/qr-modal';
import { PageProps } from './_types';
import { toast } from 'sonner';
import AssignForm from './_components/assign-form';

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
    const [typePengguna, setTypePengguna] = useState<
        'pegawai' | 'bidang' | 'tidak-diassign' | ''
    >('');

    const [tab, setTab] = useState<'it' | 'kantor'>('it');
    const [search, setSearch] = useState('');
    const [tipe, setTipe] = useState<string>('all'); // Updated default value
    const [qrAsset, setQrAsset] = useState<Asset | null>(null);

    const dataSrc = tab === 'it' ? assetsIT : assetsKantor;
    const qrValue = qrAsset
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${qrAsset.id}`
        : '';

    const formAssign = useForm('post', 'assets/assignment', {
        asset_id: '',
        employee_id: '',
        org_unit_id: '',
        notes: '',
        dokument_peminjaman: '',
        status: 'assigned',
        assigned_at: '',
        returned_at: '',
    });

    const handleAssign = () => {
        formAssign.setData('assigned_at', new Date().toISOString().split('T')[0]);
        formAssign.submit({
            onSuccess: () => {
                setTypePengguna('');
                setOpenBidang(false);
                setOpenPegawai(false);
                formAssign.reset();
                toast.success('Asset assigned successfully');
            },
            onValidationError: (error) => {
                toast.error(error.data.message.split('(')[0] || 'Sorry, something went wrong. Please try again later.');
            }
        })
    };

    useEffect(() => {
        console.log(formAssign.data);
    }, [formAssign.data]);

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
                                            <TableRow key={data.id}>
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
                                                    <Link preserveScroll
                                                        href={`/master/assets/view/${data.id}`}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="inline-flex gap-1 bg-transparent"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={`/master/assets/${data.id}/edit`}
                                                    >
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
                                                    <AssignForm key={data.id} asset_id={data.id} employees={employees} orgUnits={orgUnits} />
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
                        </TabsContent>{' '}
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
