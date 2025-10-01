"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { ServiceLog, Asset } from "./lib/assets-data"
import { useState } from "react"

type Props = {
  asset: Asset
  logs: ServiceLog[]
  publicUrl: string
}

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

export function AssetDetail({ asset, logs = logsDummy, publicUrl }: Props) {
    const [filter, setFilter] = useState<
        'all' | 'service' | 'repair' | 'other'
    >('all');
    const [qrUrl, setQrUrl] = useState<string>('');

    const filtered = logs.filter((l) => filter === 'all' || l.type === filter);

    const downloadQR = () => {
        if (!qrUrl) return;
        const a = document.createElement('a');
        a.href = qrUrl;
        a.download = `qr-${asset.id}.png`;
        a.click();
        console.log('[v0] download detail QR', asset.id);
    };

    return (
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
                        <Row k="Nomor Inventaris" v={'INV-2024-0001'} />
                        <Row k="Item" v={'Laptop'} />
                        <Row k="Tipe" v={'Laptop'} />
                        <Row k="Brand/Model" v={'ThinkPad X1'} />
                        <Row k="Serial" v={'SN-ABC-001'} />
                        <Row k="Lokasi" v={'Kantor Pusat'} />
                        <Row k="Pemakai" v={'Andi'} />
                        <Row k="Bidang" v={'IT'} />
                        <Row k="Tahun" v={String('2024')} />
                        <Row k="Tanggal Pembelian" v={String('2024-01-01')} />
                        <Row k="Akhir Garansi" v={String('2025-01-01')} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Riwayat Servis & Perbaikan</CardTitle>
                    <div className="w-40">
                        <Select
                            value={filter}
                            onValueChange={(v) => setFilter(v as any)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="service">Service</SelectItem>
                                <SelectItem value="repair">
                                    Perbaikan
                                </SelectItem>
                                <SelectItem value="other">Lainnya</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {filtered.map((l) => (
                        <div key={l.id} className="rounded-md border p-3">
                            <div className="text-sm font-medium">{l.title}</div>
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

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>QR Code</CardTitle>
                    <Button onClick={downloadQR}>Download QR</Button>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center p-4">
                        {qrUrl ? (
                            <img
                                src={qrUrl || '/placeholder.svg'}
                                alt="QR code"
                                className="h-auto w-40"
                            />
                        ) : (
                            <div className="text-sm text-muted-foreground">
                                Generating QR…
                            </div>
                        )}
                    </div>
                    <div className="text-center text-xs break-all text-muted-foreground">
                        {publicUrl}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-muted-foreground">{k}</div>
      <div className="col-span-2">{v}</div>
    </div>
  )
}
