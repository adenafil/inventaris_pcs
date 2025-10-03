import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AssetTable } from './_components/asset-table';
import { QrModal } from './_components/qr-modal';
import { useState } from 'react';
import {
    type Asset,
    assetsIT,
    assetsKantor,
    assetTypes,
} from './_components/lib/assets-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PageProps } from './_types';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Assets',
        href: '/assets',
    },
];

export default function Page({ dataAssets }: PageProps) {
    console.log({ dataAssets });

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
                            <AssetTable
                                pagination={dataAssets}
                                onViewQr={onViewQr}
                                onDelete={onDelete}
                            />
                        </TabsContent>
                        <TabsContent value="kantor" className="mt-4">
                            <AssetTable
                                pagination={dataAssets}
                                onViewQr={onViewQr}
                                onDelete={onDelete}
                            />
                        </TabsContent>
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
