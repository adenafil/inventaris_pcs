'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { InfiniteScroll, Link } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react';
import { Check, ChevronsUpDown, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
    Employee,
    Location,
    Model,
    OrgUnit,
    Pagination,
    Type,
} from '../add/_types';
import { Asset } from '../edit/_types';
import { FileUpload, type UploadItem } from './file-upload';

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
    asset?: Asset;
    uniqueId?: string;
};

const departments = [
    'IT & Teknologi',
    'Keuangan',
    'SDM',
    'Operasional',
    'Marketing',
    'Produksi',
];

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
    asset,
    uniqueId,
}: Props) {
    const formAsset = useForm('post', url, {
        nomor_inventaris: asset?.inventory_number ?? uniqueId ?? '',
        item_name: asset?.item_name ?? '',
        tipe: asset?.type.id.toString() ?? '',
        model: asset?.model.id.toString() ?? '',
        serial_number: asset?.serial_number ?? '',
        tanggal_pembelian: asset?.purchase_date ?? '',
        akhir_garansi: asset?.warranty_expiration ?? '',
        lokasi: asset?.location.id.toString() ?? '',
        documents: [],
    });

    const [files, setFiles] = useState<UploadItem[]>([]);
    const [openTipe, setOpenTipe] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openLokasi, setOpenLokasi] = useState(false);

    const handleSave = () => {
        formAsset.submit({
            onSuccess: () => {
                toast.success('Asset saved successfully!');
            },
            onValidationError: (error) => {
                toast.error(error.data.message);
            },
        });
    };

    useEffect(() => {
        formAsset.setData(
            'documents',
            files.map((f) => f.file),
        );
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
                    <div className="grid w-full gap-6">
                        <ButtonGroup className="w-full">
                            <ButtonGroupText asChild>
                                <Label htmlFor="url">INV</Label>
                            </ButtonGroupText>
                            <InputGroup>
                                <InputGroupInput
                                    id="url"
                                    value={formAsset.data.nomor_inventaris}
                                    disabled
                                />
                            </InputGroup>
                            {mode === 'create' && (
                                <ButtonGroupText asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const uniqueId = window.crypto
                                                .getRandomValues(
                                                    new Uint8Array(4),
                                                )
                                                .reduce(
                                                    (str, byte) =>
                                                        str +
                                                        byte
                                                            .toString(16)
                                                            .padStart(2, '0'),
                                                    '',
                                                );
                                            formAsset.setData(
                                                'nomor_inventaris',
                                                uniqueId,
                                            );
                                        }}
                                    >
                                        <RefreshCcw className="mr-2 h-4 w-4" />
                                    </Button>
                                </ButtonGroupText>
                            )}
                        </ButtonGroup>
                    </div>

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
                                    ? (typesPagination?.data.find(
                                          (t) =>
                                              t.id.toString() ===
                                              formAsset.data.tipe,
                                      )?.name ?? asset?.type.name)
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
                    {formAsset.invalid('tipe') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.tipe}
                        </p>
                    )}
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
                                    ? (modelsPagination?.data.find(
                                          (m) =>
                                              m.id.toString() ===
                                              formAsset.data.model,
                                      )?.brand ?? asset?.model.brand)
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
                    {formAsset.invalid('model') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.model}
                        </p>
                    )}
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
                    {formAsset.invalid('serial_number') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.serial_number}
                        </p>
                    )}
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
                    {formAsset.invalid('tanggal_pembelian') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.tanggal_pembelian}
                        </p>
                    )}
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
                    {formAsset.invalid('akhir_garansi') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.akhir_garansi}
                        </p>
                    )}
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
                                    ? (locationsPagination?.data.find(
                                          (l) =>
                                              l.id.toString() ===
                                              formAsset.data.lokasi,
                                      )?.name ?? asset?.location.name)
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
                    {formAsset.invalid('lokasi') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.lokasi}
                        </p>
                    )}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <Label>Dokumen & Foto (multiple)</Label>
                    {asset?.documents && asset.documents.length > 0 ? (
                        <FileUpload
                            value={files}
                            onChange={setFiles}
                            documents={asset.documents}
                        />
                    ) : (
                        <FileUpload value={files} onChange={setFiles} />
                    )}
                    {formAsset.invalid('documents') && (
                        <p className="mt-1 text-sm text-red-600">
                            {formAsset.errors.documents}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button type="submit" disabled={formAsset.processing}>
                    {formAsset.processing ? 'Saving...' : 'Save'}
                </Button>
                <Link href={'/master/assets'} preserveScroll>
                    <Button
                        type="button"
                        className="cursor-pointer"
                        variant="secondary"
                    >
                        Back
                    </Button>
                </Link>
            </div>
        </form>
    );
}
