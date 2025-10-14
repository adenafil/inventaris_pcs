import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { Head, Link, router, WhenVisible } from '@inertiajs/react';
import { Eye, Pencil } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import AssignForm from './_components/assign-form';
import DeleteAssetBtn from './_components/delete-asset-btn';
import { type Asset } from './_components/lib/assets-data';
import { QrModal } from './_components/qr-modal';
import { PageProps } from './_types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Assets',
        href: '/assets',
    },
];

export default function Page({
    dataAssets,
    pagination,
    page,
    employees,
    orgUnits,
    types,
    role,
    typeReq,
}: PageProps) {
    console.log({
        dataAssets,
        pagination,
        page,
        employees,
        orgUnits,
        types,
        role,
        typeReq,
    });

    const [searchTerm, setSearchTerm] = useState('');
    const isFirstRenderSearch = useRef(true);
    const isFirstRenderTipe = useRef(true);
    const isFirstRenderTab = useRef(true);

const [tab, setTab] = useState<string>(role ?? 'superadmin');
    const [tipe, setTipe] = useState<string>(typeReq ?? ''); // Updated default value
    const [qrAsset, setQrAsset] = useState<Asset | null>(null);

    const qrValue = qrAsset
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${qrAsset.id}`
        : '';

    useDebounce(
        () => {
            if (isFirstRenderSearch.current) {
                isFirstRenderSearch.current = false;
                return;
            }

            router.get(
                `/master/assets?search=${searchTerm}`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        },
        500,
        [searchTerm],
    );

    useDebounce(
        () => {
            if (isFirstRenderTipe.current) {
                isFirstRenderTipe.current = false;
                return;
            }

            router.get(
                `/master/assets?tipe=${tipe === 'all' ? '' : tipe}`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        },
        500,
        [tipe],
    );

    useDebounce(
        () => {
            if (isFirstRenderTab.current) {
                isFirstRenderTab.current = false;
                return;
            }

            router.get(
                `/master/assets?role=${tab}`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        },
        500,
        [tab],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Assets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                                Data Assets
                            </h1>
                            <p className="text-sm text-gray-600 md:text-base dark:text-muted-foreground">
                                Kelola data aset perangkat di dalam sistem.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <Input
                                placeholder="Pencarian…"
                                value={searchTerm}
                                onChange={(e) => {
                                    if (e.target.value === 'all') {
                                        setSearchTerm('');
                                    } else {
                                        setSearchTerm(e.target.value);
                                    }
                                }}
                                className="w-full sm:w-48 md:w-64"
                            />
                            <div className="flex items-center gap-2">
                                <Select
                                    value={tipe}
                                    onValueChange={(v) => {
                                        setTipe(v);
                                    }}
                                >
                                    <SelectTrigger className="w-full sm:w-40">
                                        <SelectValue placeholder="Tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Semua
                                        </SelectItem>
                                        {types.data.map((t) => (
                                            <SelectItem
                                                key={t.id}
                                                value={t.name}
                                            >
                                                {t.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Link
                                    preserveScroll
                                    href="/master/assets/create"
                                >
                                    <Button className="w-full sm:w-auto">
                                        Add Asset
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Tabs
                        value={tab}
                        onValueChange={(v) => setTab(v as 'it' | 'kantor')}
                    >
                        <TabsList>
                            <TabsTrigger value="superadmin">
                                Superadmin
                            </TabsTrigger>
                            <TabsTrigger value="admin_it">Admin IT</TabsTrigger>
                            <TabsTrigger value="admin_kantor">
                                Kantor
                            </TabsTrigger>
                        </TabsList>

                        {dataAssets.length === 0 && (
                            <div className="mt-8 rounded-lg border border-dashed p-12 text-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Tidak ada data aset yang ditemukan.
                                </p>
                            </div>
                        )}

                        {dataAssets.length > 0 && (
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
                                        {dataAssets.map((data) => (
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
                                                    {data.location.name}
                                                </TableCell>
                                                <TableCell>
                                                    {data.creator.name}
                                                </TableCell>
                                                <TableCell className="space-x-2 text-center">
                                                    <Link
                                                        preserveScroll
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
                                                    <AssignForm
                                                        key={data.id}
                                                        asset_id={data.id}
                                                        employees={employees}
                                                        orgUnits={orgUnits}
                                                    />

                                                    <DeleteAssetBtn
                                                        assetId={data.id}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {pagination.current_page <
                                            pagination.last_page && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={7}
                                                    className="text-center"
                                                >
                                                    <WhenVisible
                                                        always={
                                                            pagination.current_page <
                                                            pagination.last_page
                                                        }
                                                        params={{
                                                            data: {
                                                                data_asset_page:
                                                                    pagination.current_page <
                                                                    pagination.last_page
                                                                        ? pagination.current_page +
                                                                          1
                                                                        : pagination.current_page,
                                                            },
                                                            only: [
                                                                'dataAssets',
                                                                'pagination',
                                                            ],
                                                        }}
                                                        buffer={0.1}
                                                        fallback={
                                                            <p>
                                                                data not found.
                                                            </p>
                                                        }
                                                        as="div"
                                                    >
                                                        {pagination.current_page >=
                                                        pagination.last_page ? (
                                                            <div className="p-2 text-center text-sm text-muted-foreground"></div>
                                                        ) : (
                                                            <div className="w-full p-2 text-center text-sm text-muted-foreground">
                                                                Loading more
                                                                data...
                                                            </div>
                                                        )}
                                                    </WhenVisible>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
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
