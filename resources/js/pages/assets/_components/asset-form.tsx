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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

type Props = {
    defaultValue?: Partial<Asset>;
    mode: 'create' | 'edit';
    assetId?: string;
};

const departments = [
    'IT & Teknologi',
    'Keuangan',
    'SDM',
    'Operasional',
    'Marketing',
    'Produksi',
];


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
  const [openTipe, setOpenTipe] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);
  const [openLokasi, setOpenLokasi] = React.useState(false);
  const [assignmentType, setAssignmentType] = React.useState<
      'pegawai' | 'bidang' | 'tidak-diassign' | ''
  >('');
  const [assignmentDetail, setAssignmentDetail] = React.useState('');
  const [openPegawai, setOpenPegawai] = React.useState(false);

  const change = (k: keyof typeof form, v: string) =>
      setForm((s) => ({ ...s, [k]: v }));

  const onSave = () => {
      console.log('[v0] save asset', {
          mode,
          assetId,
          form,
          files,
          assignmentType,
          assignmentDetail,
      });
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
                    <Popover open={openTipe} onOpenChange={setOpenTipe}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openTipe}
                                className="w-full justify-between bg-transparent font-normal"
                            >
                                {form.tipe || 'Pilih tipe'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput placeholder="Cari tipe..." />
                                <CommandList>
                                    <CommandEmpty>
                                        Tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {assetTypes.map((t) => (
                                            <CommandItem
                                                key={t}
                                                value={t}
                                                onSelect={() => {
                                                    change('tipe', t);
                                                    setOpenTipe(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        form.tipe === t
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                                {t}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid gap-2">
                    <Label>Model</Label>
                    <Popover open={openModel} onOpenChange={setOpenModel}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openModel}
                                className="w-full justify-between bg-transparent font-normal"
                            >
                                {form.model || 'Pilih model'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput placeholder="Cari model..." />
                                <CommandList>
                                    <CommandEmpty>
                                        Tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {models.map((m) => (
                                            <CommandItem
                                                key={m}
                                                value={m}
                                                onSelect={() => {
                                                    change('model', m);
                                                    setOpenModel(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        form.model === m
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                                {m}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
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
                    <Popover open={openLokasi} onOpenChange={setOpenLokasi}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openLokasi}
                                className="w-full justify-between bg-transparent font-normal"
                            >
                                {form.lokasi || 'Pilih lokasi'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput placeholder="Cari lokasi..." />
                                <CommandList>
                                    <CommandEmpty>
                                        Tidak ditemukan.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {locations.map((l) => (
                                            <CommandItem
                                                key={l}
                                                value={l}
                                                onSelect={() => {
                                                    change('lokasi', l);
                                                    setOpenLokasi(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 h-4 w-4',
                                                        form.lokasi === l
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                                {l}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className={`grid gap-2 w-full ${assignmentType && assignmentType !== "tidak-diassign" ? '' : 'sm:col-span-2'}`}>
                    <Label>Pengguna</Label>
                    <Select
                        value={assignmentType}
                        onValueChange={(value) => {
                            setAssignmentType(value as typeof assignmentType);
                            setAssignmentDetail('');
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe pengguna" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pegawai">Pegawai</SelectItem>
                            <SelectItem value="bidang">Bidang</SelectItem>
                            <SelectItem value="tidak-diassign">
                                Tidak Diassign
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {assignmentType === 'pegawai' && (
                    <div className="grid gap-2">
                        <Label>Pilih Pegawai</Label>
                        <Popover
                            open={openPegawai}
                            onOpenChange={setOpenPegawai}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openPegawai}
                                    className="w-full justify-between bg-transparent font-normal"
                                >
                                    {assignmentDetail || 'Cari pegawai'}
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
                                            Tidak ditemukan.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {users.map((u) => (
                                                <CommandItem
                                                    key={u}
                                                    value={u}
                                                    onSelect={() => {
                                                        setAssignmentDetail(u);
                                                        setOpenPegawai(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            assignmentDetail ===
                                                                u
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                    {u}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
                {assignmentType === 'bidang' && (
                    <div className="grid gap-2">
                        <Label>Pilih Bidang</Label>
                        <Select
                            value={assignmentDetail}
                            onValueChange={setAssignmentDetail}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih bidang" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
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
