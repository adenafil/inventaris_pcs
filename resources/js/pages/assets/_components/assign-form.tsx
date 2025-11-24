import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { InfiniteScroll, usePage } from "@inertiajs/react";
import { useForm } from "laravel-precognition-react";
import { Check, ChevronsUpDown, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Employee, OrgUnit, PaginatedResponse } from "../_types";
import { toast } from "sonner";

export default function AssignForm({
    employees,
    orgUnits,
    asset_id,
    className = 'inline-flex gap-1 bg-transparent',
}: {
    employees: PaginatedResponse<Employee>;
    orgUnits: PaginatedResponse<OrgUnit>;
    asset_id: number;
    className?: string;
}) {
    const [isOpenPegawai, setOpenPegawai] = useState(false);
    const [isOpenBidang, setOpenBidang] = useState(false);
    const [typePengguna, setTypePengguna] = useState<
        'pegawai' | 'bidang' | 'tidak-diassign' | ''
    >('');

    const formAssign = useForm('post', '/master/assets/assignment', {
        asset_id: asset_id.toString(),
        employee_id: '',
        org_unit_id: '',
        notes: '',
        dokument_peminjaman: '',
        status: 'assigned',
        assigned_at: '',
        returned_at: '',
    });


    const handleAssign = () => {
        formAssign.setData(
            'assigned_at',
            new Date().toISOString().split('T')[0],
        );
        formAssign.submit({
            onSuccess: (data) => {
                setTypePengguna('');
                setOpenBidang(false);
                setOpenPegawai(false);
                formAssign.reset();

                toast.success('Asset assigned successfully');
            },
            onValidationError: (error) => {
                toast.error(
                    error.data.message.split('(')[0] ||
                        'Sorry, something went wrong. Please try again later.',
                );
            },
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className={className}
                >
                    <UserCheck className="h-4 w-4" />
                    Assign
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Assignment</SheetTitle>
                    <SheetDescription>
                        Assign this asset to employee or bidang.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className={`grid w-full gap-2 sm:col-span-2`}>
                        <Label>Pengguna</Label>
                        <Select
                            value={typePengguna}
                            onValueChange={(value) => {
                                setTypePengguna(
                                    value as
                                        | 'pegawai'
                                        | 'bidang'
                                        | 'tidak-diassign'
                                        | '',
                                );
                                if (value === 'pegawai') {
                                    setOpenPegawai(true);
                                    setOpenBidang(false);
                                } else if (value === 'bidang') {
                                    setOpenBidang(true);
                                    setOpenPegawai(false);
                                } else {
                                    setOpenBidang(false);
                                    setOpenPegawai(false);
                                }
                                formAssign.setData(
                                    'asset_id',
                                    asset_id.toString(),
                                );
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
                    {typePengguna === 'pegawai' && (
                        <div className="grid w-full gap-2 sm:col-span-2">
                            <Label>Pilih Pegawai</Label>
                            <Popover
                                open={isOpenPegawai}
                                onOpenChange={setOpenPegawai}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={isOpenPegawai}
                                        className="w-full justify-between bg-transparent font-normal"
                                    >
                                        {formAssign.data.employee_id
                                            ? employees.data.find(
                                                  (e) =>
                                                      e.id ===
                                                      Number(
                                                          formAssign.data
                                                              .employee_id,
                                                      ),
                                              )?.name
                                            : 'Pilih pegawai'}
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
                                                <InfiniteScroll
                                                    data="employees"
                                                    buffer={1}
                                                >
                                                    {employees!.data.map(
                                                        (u) => (
                                                            <CommandItem
                                                                key={u.id}
                                                                onSelect={() => {
                                                                    formAssign.setData(
                                                                        'employee_id',
                                                                        u.id,
                                                                    );
                                                                    setOpenPegawai(
                                                                        false,
                                                                    );
                                                                    formAssign.setData(
                                                                        'org_unit_id',
                                                                        '',
                                                                    );
                                                                }}
                                                                value={u.id.toString()}
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
                                                                {u.name}
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
                    {typePengguna === 'bidang' && (
                        <div className="grid w-full gap-2 sm:col-span-2">
                            <Label>Pilih Bidang</Label>
                            <Select
                                value={formAssign.data.org_unit_id}
                                onValueChange={(value) =>
                                    formAssign.setData('org_unit_id', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih bidang" />
                                </SelectTrigger>
                                <SelectContent>
                                    <InfiniteScroll data="employees" buffer={1}>
                                        {orgUnits?.data.map((dept) => (
                                            <SelectItem
                                                key={dept.id}
                                                value={dept.id.toString()}
                                            >
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </InfiniteScroll>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* create me dokuement peminjaman */}
                    <div className="grid w-full gap-2 sm:col-span-2">
                        <Label>
                            Dokumen Peminjaman*
                            <span className="text-destructive">
                                {' '}
                                (jpg, png, pdf)
                            </span>
                        </Label>
                        <Input
                            className="w-full"
                            type="file"
                            accept=".pdf,.jpg,.png"
                            onChange={(e) => {
                                if (e.target.files) {
                                    formAssign.setData(
                                        'dokument_peminjaman',
                                        e.target.files[0],
                                    );
                                }
                            }}
                        />
                    </div>

                    <div className="grid gap-2 sm:col-span-2">
                        <Label>Keterangan (opsional)</Label>
                        <Textarea
                            onChange={(e) =>
                                formAssign.setData('notes', e.target.value)
                            }
                            placeholder="Catatan tambahan…"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <Button
                        disabled={formAssign.processing}
                        type="submit"
                        onClick={() => handleAssign()}
                    >
                        {formAssign.processing ? 'Assigning...' : 'Assign'}
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
