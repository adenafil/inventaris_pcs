'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { InfiniteScroll } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
    Employee,
    Location,
    Model,
    OrgUnit,
    Pagination,
    Type,
} from '../add/_types';
import { FileUpload, type UploadItem } from './file-upload';
import { models, type Asset } from './lib/assets-data';
import { toast } from 'sonner';

type Props = {
    defaultValue?: Partial<Asset>;
    mode: 'create' | 'edit';
    assetId?: string;
    url: string;
    typesPagination?: Pagination<Type>;
    modelsPagination?: Pagination<Model>;
    locationsPagination?: Pagination<Location>;
    employeesPagination?: Pagination<Employee>;
    orgUnitsPagination?: Pagination<OrgUnit>;
};

const departments = [
    'IT & Teknologi',
    'Keuangan',
    'SDM',
    'Operasional',
    'Marketing',
    'Produksi',
];

// 'nomor_inventaris' => 'required|string|max:255',
// 'item_name' => 'required|string|max:255',
// 'tipe' => 'required|string|max:255',
// 'model' => 'required|string|max:255',
// 'serial_number' => 'required|string|max:255',
// 'tanggal_pembelian' => 'required|date',
// 'akhir_garansi' => 'required|date',
// 'lokasi' => 'required|string|max:255',
// 'pengguna' => 'required|string|max:255',
// 'pegawai' => 'nullable|string|max:255',
// 'bidang' => 'nullable|string|max:255',
// 'tanggal_serah_terima' => 'nullable|date',
// 'keterangan' => 'nullable|string',
// 'documents' => 'nullable|array',
// 'documents.*' => 'file|mimes:pdf,jpg,jpeg,png|max:2048',

export function AssetForm({
    defaultValue,
    mode,
    assetId,
    url,
    typesPagination,
    modelsPagination,
    locationsPagination,
    employeesPagination,
    orgUnitsPagination,
}: Props) {
    const formAsset = useForm('post', url, {
        nomor_inventaris: '',
        item_name: '',
        tipe: '',
        model: '',
        serial_number: '',
        tanggal_pembelian: '',
        akhir_garansi: '',
        lokasi: '',
        documents: [],
    });

    const [form, setForm] = useState({
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
    const [files, setFiles] = useState<UploadItem[]>([]);
    const [openTipe, setOpenTipe] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openLokasi, setOpenLokasi] = useState(false);
    const [assignmentType, setAssignmentType] = useState<
        'pegawai' | 'bidang' | 'tidak-diassign' | ''
    >('');
    const [assignmentDetail, setAssignmentDetail] = useState('');
    const [openPegawai, setOpenPegawai] = useState(false);

    const handleSave = () => {
        formAsset.submit({
            onSuccess: () => {
                toast.success('Asset saved successfully!');
            },
            onValidationError: (error) => {
                toast.error(error.data.message)
            }
        })
    };
    const onBack = () => {
        console.log('[v0] back from form');
    };

    useEffect(() => {
        console.log(formAsset.data);
    }, [formAsset]);

    useEffect(() => {
        formAsset.setData('documents', files.map((f) => f.file));
    }, [files]);

    return (
        <form
            className="grid gap-6"
            onSubmit={(e) => {
                e.preventDefault();
                handleSave();
            }}
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Nomor Inventaris</Label>
                    <Input
                        placeholder="INV-2025-0001"
                        value={formAsset.data.nomor_inventaris}
                        onChange={(e) =>
                            formAsset.setData(
                                'nomor_inventaris',
                                e.target.value,
                            )
                        }
                        onBlur={() => formAsset.validate('nomor_inventaris')}
                    />
                    {formAsset.invalid('nomor_inventaris') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.nomor_inventaris}
                        </p>
                    )}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Item Name</Label>
                    <Input
                        placeholder="Laptop / Printer / Router"
                        value={formAsset.data.item_name}
                        onChange={(e) =>
                            formAsset.setData('item_name', e.target.value)
                        }
                        onBlur={() => formAsset.validate('item_name')}
                    />
                    {formAsset.invalid('item_name') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.item_name}
                        </p>
                    )}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Tipe</Label>
                    <Popover open={openTipe} onOpenChange={setOpenTipe}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openTipe}
                                className="w-full justify-between bg-transparent font-normal"
                            >
                                {formAsset.data.tipe
                                    ? typesPagination?.data.find(
                                          (t) =>
                                              t.id.toString() ===
                                              formAsset.data.tipe,
                                      )?.name
                                    : 'Pilih tipe'}
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
                                        <InfiniteScroll data="types">
                                            {typesPagination!.data.map((t) => (
                                                <CommandItem
                                                    key={t.id}
                                                    value={t.name.toString()}
                                                    onSelect={() => {
                                                        formAsset.setData(
                                                            'tipe',
                                                            t.id.toString(),
                                                        );
                                                        setOpenTipe(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            formAsset.data
                                                                .tipe ===
                                                                t.id.toString()
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                    {t.name}
                                                </CommandItem>
                                            ))}
                                        </InfiniteScroll>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Model</Label>
                    <Popover open={openModel} onOpenChange={setOpenModel}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openModel}
                                className="w-full justify-between bg-transparent font-normal"
                            >
                                {formAsset.data.model
                                    ? modelsPagination?.data.find(
                                          (m) =>
                                              m.id.toString() ===
                                              formAsset.data.model,
                                      )?.brand
                                    : 'Pilih model'}
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
                                        <InfiniteScroll data="models">
                                            {modelsPagination!.data.map((m) => (
                                                <CommandItem
                                                    key={m.id}
                                                    value={m.brand.toString()}
                                                    onSelect={() => {
                                                        formAsset.setData(
                                                            'model',
                                                            m.id.toString(),
                                                        );
                                                        setOpenModel(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            formAsset.data
                                                                .model ===
                                                                m.id.toString()
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                    {m.brand}
                                                </CommandItem>
                                            ))}
                                        </InfiniteScroll>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Serial Number</Label>
                    <Input
                        placeholder="SN-XXXXX"
                        value={formAsset.data.serial_number}
                        onChange={(e) =>
                            formAsset.setData('serial_number', e.target.value)
                        }
                    />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Tanggal Pembelian</Label>
                    <Input
                        type="date"
                        value={formAsset.data.tanggal_pembelian}
                        onChange={(e) =>
                            formAsset.setData(
                                'tanggal_pembelian',
                                e.target.value,
                            )
                        }
                    />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Akhir Garansi</Label>
                    <Input
                        type="date"
                        value={formAsset.data.akhir_garansi}
                        onChange={(e) =>
                            formAsset.setData('akhir_garansi', e.target.value)
                        }
                    />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Lokasi</Label>
                    <Popover open={openLokasi} onOpenChange={setOpenLokasi}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openLokasi}
                                className="w-full justify-between bg-transparent font-normal"
                            >
                                {formAsset.data.lokasi
                                    ? locationsPagination?.data.find(
                                          (l) =>
                                              l.id.toString() ===
                                              formAsset.data.lokasi,
                                      )?.name
                                    : 'Pilih lokasi'}
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
                                        <InfiniteScroll data="locations">
                                            {locationsPagination!.data.map(
                                                (l) => (
                                                    <CommandItem
                                                        key={l.id}
                                                        value={l.name.toString()}
                                                        onSelect={() => {
                                                            formAsset.setData(
                                                                'lokasi',
                                                                l.id.toString(),
                                                            );
                                                            setOpenLokasi(
                                                                false,
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                formAsset.data
                                                                    .lokasi ===
                                                                    l.id.toString()
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0',
                                                            )}
                                                        />
                                                        {l.name}
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
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Dokumen & Foto (multiple)</Label>
                    <FileUpload value={files} onChange={setFiles} />
                    {formAsset.invalid('documents') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.documents}
                        </p>
                    )}
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
