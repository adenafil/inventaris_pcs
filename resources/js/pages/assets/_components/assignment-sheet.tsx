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
import { Textarea } from '@/components/ui/textarea';
import type { Asset } from './lib/assets-data';
import { cn } from '@/lib/utils';
import { Building2, Check, ChevronsUpDown, UserRound } from 'lucide-react';
import * as React from 'react';

type AssignmentType = 'pegawai' | 'bidang' | 'none';

type Props = {
    asset: Asset;
    onAssign?: (payload: {
        assetId: string;
        type: AssignmentType;
        userId?: string | null;
        bidang?: string | null;
        tanggalSerah?: string | null;
        keterangan?: string | null;
    }) => void;
};

const DUMMY_USERS = [
    { id: 'u1', name: 'Budi Santoso' },
    { id: 'u2', name: 'Siti Aminah' },
    { id: 'u3', name: 'Andi Wijaya' },
];

const DUMMY_BIDANG = [
    'Keuangan',
    'Umum',
    'IT',
    'SDM',
    'Pemasaran',
    'Operasional',
];

export function AssignmentSheet({ asset, onAssign }: Props) {
    const [type, setType] = React.useState<AssignmentType>('none');
    const [openUser, setOpenUser] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
        null,
    );
    const [selectedBidang, setSelectedBidang] = React.useState<string | null>(
        null,
    );
    const [tanggalSerah, setTanggalSerah] = React.useState<string>('');
    const [keterangan, setKeterangan] = React.useState<string>('');

    const selectedUser = DUMMY_USERS.find((u) => u.id === selectedUserId);

    const reset = () => {
        setType('none');
        setSelectedUserId(null);
        setSelectedBidang(null);
        setTanggalSerah('');
        setKeterangan('');
        setOpenUser(false);
    };

    const handleSubmit = () => {
        const payload = {
            assetId: String(asset.id),
            type,
            userId: type === 'pegawai' ? selectedUserId : null,
            bidang: type === 'bidang' ? selectedBidang : null,
            tanggalSerah: tanggalSerah || null,
            keterangan: keterangan || null,
        };
        console.log('[v0] assignment submit:', payload);
        onAssign?.(payload);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="inline-flex gap-1 bg-transparent"
                >
                    Assign
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Assignment Asset</SheetTitle>
                    <SheetDescription>
                        Atur assignment untuk asset ini. Pilih tipe assignment,
                        tanggal serah, dan keterangan jika perlu.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-4 grid gap-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            Tipe Assignment
                        </label>
                        <Select
                            value={type}
                            onValueChange={(v) => {
                                const t = v as AssignmentType;
                                setType(t);
                                // reset dependent fields on type switch
                                setSelectedUserId(null);
                                setSelectedBidang(null);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pegawai">Pegawai</SelectItem>
                                <SelectItem value="bidang">Bidang</SelectItem>
                                <SelectItem value="none">
                                    Tidak Diassign
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {type === 'pegawai' && (
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">
                                Pegawai
                            </label>
                            <Popover open={openUser} onOpenChange={setOpenUser}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openUser}
                                        className="w-full justify-between bg-transparent"
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <UserRound className="h-4 w-4 text-muted-foreground" />
                                            {selectedUser
                                                ? selectedUser.name
                                                : 'Cari & pilih pegawai'}
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                                    <Command>
                                        <CommandInput placeholder="Ketik nama pegawai..." />
                                        <CommandList>
                                            <CommandEmpty>
                                                Tidak ditemukan.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {DUMMY_USERS.map((u) => (
                                                    <CommandItem
                                                        key={u.id}
                                                        value={u.name}
                                                        onSelect={() => {
                                                            setSelectedUserId(
                                                                u.id,
                                                            );
                                                            setOpenUser(false);
                                                        }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'h-4 w-4',
                                                                selectedUserId ===
                                                                    u.id
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0',
                                                            )}
                                                        />
                                                        {u.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}

                    {type === 'bidang' && (
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">
                                Bidang
                            </label>
                            <Select
                                value={selectedBidang ?? ''}
                                onValueChange={(v) => setSelectedBidang(v)}
                            >
                                <SelectTrigger>
                                    <span className="inline-flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <SelectValue placeholder="Pilih bidang" />
                                    </span>
                                </SelectTrigger>
                                <SelectContent>
                                    {DUMMY_BIDANG.map((b) => (
                                        <SelectItem key={b} value={b}>
                                            {b}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            Tanggal Serah
                        </label>
                        <Input
                            type="date"
                            value={tanggalSerah}
                            onChange={(e) => setTanggalSerah(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">
                            Keterangan
                        </label>
                        <Textarea
                            placeholder="Tulis keterangan assignment (opsional)…"
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                            className="min-h-24"
                        />
                    </div>
                </div>

                <SheetFooter className="mt-6">
                    <SheetClose asChild>
                        <Button variant="outline" onClick={reset}>
                            Batal
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            onClick={() => {
                                handleSubmit();
                                reset();
                            }}
                        >
                            Simpan
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
