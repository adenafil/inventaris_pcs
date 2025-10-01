'use client';

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
import { Textarea } from '@/components/ui/textarea';
import {
    assetTypes,
    locations,
    models,
    users,
    type Asset,
} from './lib/assets-data';
import * as React from 'react';
import { FileUpload, type UploadItem } from './file-upload';

type Props = {
    defaultValue?: Partial<Asset>;
    mode: 'create' | 'edit';
    assetId?: string;
};

export function AssetForm({ defaultValue, mode, assetId }: Props) {
    const [form, setForm] = React.useState({
        nomorInventaris: defaultValue?.nomorInvent ?? '',
        itemName: defaultValue?.item ?? '',
        tipe: defaultValue?.tipe ?? '',
        model: defaultValue?.brand ?? '',
        serialNumber: defaultValue?.serial ?? '',
        tanggalPembelian: defaultValue?.tanggalPembelian ?? '',
        akhirGaransi: defaultValue?.akhirGaransi ?? '',
        lokasi: defaultValue?.lokasi ?? '',
        pengguna: defaultValue?.pemakai ?? '',
        tanggalSerahTerima: defaultValue?.tanggalSerahTerima ?? '',
        keterangan: '',
    });
    const [files, setFiles] = React.useState<UploadItem[]>([]);

    const change = (k: keyof typeof form, v: string) =>
        setForm((s) => ({ ...s, [k]: v }));

    const onSave = () => {
        console.log('[v0] save asset', { mode, assetId, form, files });
    };
    const onBack = () => {
        console.log('[v0] back from form');
    };

    return (
        <form
            className="grid gap-6"
            onSubmit={(e) => {
                e.preventDefault();
                onSave();
            }}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label>Nomor Inventaris</Label>
                    <Input
                        placeholder="INV-2025-0001"
                        value={form.nomorInventaris}
                        onChange={(e) =>
                            change('nomorInventaris', e.target.value)
                        }
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Item Name</Label>
                    <Input
                        placeholder="Laptop / Printer / Router"
                        value={form.itemName}
                        onChange={(e) => change('itemName', e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Tipe</Label>
                    <Select
                        value={form.tipe}
                        onValueChange={(v) => change('tipe', v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe" />
                        </SelectTrigger>
                        <SelectContent>
                            {assetTypes.map((t) => (
                                <SelectItem key={t} value={t}>
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>Model</Label>
                    <Select
                        value={form.model}
                        onValueChange={(v) => change('model', v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih model" />
                        </SelectTrigger>
                        <SelectContent>
                            {models.map((m) => (
                                <SelectItem key={m} value={m}>
                                    {m}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>Serial Number</Label>
                    <Input
                        placeholder="SN-XXXXX"
                        value={form.serialNumber}
                        onChange={(e) => change('serialNumber', e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Tanggal Pembelian</Label>
                    <Input
                        type="date"
                        value={form.tanggalPembelian}
                        onChange={(e) =>
                            change('tanggalPembelian', e.target.value)
                        }
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Akhir Garansi</Label>
                    <Input
                        type="date"
                        value={form.akhirGaransi}
                        onChange={(e) => change('akhirGaransi', e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Lokasi</Label>
                    <Select
                        value={form.lokasi}
                        onValueChange={(v) => change('lokasi', v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih lokasi" />
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map((l) => (
                                <SelectItem key={l} value={l}>
                                    {l}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label>Pengguna</Label>
                    <Select
                        value={form.pengguna}
                        onValueChange={(v) => change('pengguna', v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih pengguna" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((u) => (
                                <SelectItem key={u} value={u}>
                                    {u}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Tanggal Serah Terima (Date & Time)</Label>
                    <Input
                        type="datetime-local"
                        value={form.tanggalSerahTerima}
                        onChange={(e) =>
                            change('tanggalSerahTerima', e.target.value)
                        }
                    />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Keterangan (opsional)</Label>
                    <Textarea
                        placeholder="Catatan tambahan…"
                        value={form.keterangan}
                        onChange={(e) => change('keterangan', e.target.value)}
                    />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Dokumen & Foto (multiple)</Label>
                    <FileUpload value={files} onChange={setFiles} />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button type="submit">Save</Button>
                <Button type="button" variant="secondary" onClick={onBack}>
                    Back
                </Button>
            </div>
        </form>
    );
}
