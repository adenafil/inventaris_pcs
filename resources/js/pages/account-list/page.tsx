'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, WhenVisible } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react';
import { FormEvent, useMemo, useState } from 'react';
import { toast } from 'sonner';

type AccountRole = 'admin' | 'manager' | 'staff';
type AccountLog = {
    id: string;
    timestamp: string;
    action: string;
    detail?: string;
};
type Account = {
    id: string;
    name: string;
    email: string;
    role: AccountRole;
    org_unit_id?: string;
    active: boolean;
    password?: string | null;
    last_active_at: string | null;
    createdAt: string;
    updatedAt: string;
    logs: AccountLog[];
};

function isoNow() {
    return new Date().toISOString();
}

const initialAccounts: Account[] = [
    {
        id: 'u-1001',
        name: 'Siti Rahma',
        email: 'siti.rahma@example.com',
        role: 'admin',
        bidang: 'Operasional',
        active: true,
        online: true,
        createdAt: new Date('2024-11-10T08:20:00Z').toISOString(),
        updatedAt: new Date('2025-01-02T10:15:00Z').toISOString(),
        logs: [
            {
                id: 'l-1',
                timestamp: '2024-11-10T08:20:00Z',
                action: 'Account Created',
                detail: 'Akun dibuat oleh sistem',
            },
            {
                id: 'l-2',
                timestamp: '2024-12-01T09:40:00Z',
                action: 'Role Updated',
                detail: 'Role diubah menjadi admin',
            },
            {
                id: 'l-3',
                timestamp: '2025-01-02T10:15:00Z',
                action: 'Profile Edited',
                detail: 'Perubahan pada bidang',
            },
        ],
    },
    {
        id: 'u-1002',
        name: 'Budi Santoso',
        email: 'budi.santoso@example.com',
        role: 'manager',
        bidang: 'Keuangan',
        active: true,
        online: false,
        createdAt: new Date('2024-12-05T07:00:00Z').toISOString(),
        updatedAt: new Date('2025-02-11T12:05:00Z').toISOString(),
        logs: [
            {
                id: 'l-4',
                timestamp: '2024-12-05T07:00:00Z',
                action: 'Account Created',
            },
            {
                id: 'l-5',
                timestamp: '2025-02-11T12:05:00Z',
                action: 'Password Changed',
            },
        ],
    },
    {
        id: 'u-1003',
        name: 'Dewi Lestari',
        email: 'dewi.lestari@example.com',
        role: 'staff',
        bidang: 'HR',
        active: true,
        online: true,
        createdAt: new Date('2025-01-15T11:25:00Z').toISOString(),
        updatedAt: new Date('2025-03-02T09:10:00Z').toISOString(),
        logs: [
            {
                id: 'l-6',
                timestamp: '2025-01-15T11:25:00Z',
                action: 'Account Created',
            },
            {
                id: 'l-7',
                timestamp: '2025-03-02T09:10:00Z',
                action: 'Profile Edited',
                detail: 'Perubahan email',
            },
        ],
    },
    {
        id: 'u-1004',
        name: 'Andi Pratama',
        email: 'andi.pratama@example.com',
        role: 'staff',
        bidang: 'Operasional',
        active: true,
        online: false,
        createdAt: new Date('2024-10-21T14:00:00Z').toISOString(),
        updatedAt: new Date('2025-02-01T08:00:00Z').toISOString(),
        logs: [
            {
                id: 'l-8',
                timestamp: '2024-10-21T14:00:00Z',
                action: 'Account Created',
            },
            {
                id: 'l-9',
                timestamp: '2025-02-01T08:00:00Z',
                action: 'Role Updated',
                detail: 'Role diubah menjadi staff',
            },
        ],
    },
    {
        id: 'u-1005',
        name: 'Rina Kurnia',
        email: 'rina.kurnia@example.com',
        role: 'manager',
        bidang: 'Produksi',
        active: false,
        online: false,
        createdAt: new Date('2024-09-10T10:10:00Z').toISOString(),
        updatedAt: new Date('2025-04-05T13:30:00Z').toISOString(),
        logs: [
            {
                id: 'l-10',
                timestamp: '2024-09-10T10:10:00Z',
                action: 'Account Created',
            },
            {
                id: 'l-11',
                timestamp: '2025-04-05T13:30:00Z',
                action: 'Account Disabled',
                detail: 'Dinonaktifkan oleh admin',
            },
        ],
    },
    {
        id: 'u-1006',
        name: 'Yoga Mahendra',
        email: 'yoga.mahendra@example.com',
        role: 'admin',
        bidang: 'IT',
        active: true,
        online: false,
        createdAt: new Date('2025-02-20T09:00:00Z').toISOString(),
        updatedAt: new Date('2025-02-28T15:45:00Z').toISOString(),
        logs: [
            {
                id: 'l-12',
                timestamp: '2025-02-20T09:00:00Z',
                action: 'Account Created',
            },
            {
                id: 'l-13',
                timestamp: '2025-02-28T15:45:00Z',
                action: '2FA Enabled',
            },
        ],
    },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manajemen Akun',
        href: '/master/accounts',
    },
];

function formatDate(value: string) {
    try {
        return new Date(value).toLocaleString();
    } catch {
        return value;
    }
}

function isUserOnline(lastActiveAt: string | null): boolean {
    if (!lastActiveAt) return false;
    const lastActive = new Date(lastActiveAt);
    const now = new Date();
    const diff = now.getTime() - lastActive.getTime();
    console.log({ lastActiveAt, diff });
    console.log(diff < 1 * 60 * 1000);

    return diff < 1 * 60 * 1000;
}

export default function AccountsPage({
    orgUnits,
    paginationUser,
    users,
    page,
}: PageProps) {
    console.log({ orgUnits, paginationUser, users, page });

    const addAccountForm = useForm('post', '/master/accounts', {
        name: '',
        email: '',
        password: '',
        role: '',
        org_unit_id: '',
        is_active: true,
    });

    const updateAccountForm = useForm(
        'post',
        '/master/accounts?_method=PATCH',
        {
            id: '',
            name: '',
            email: '',
            password: null,
            role: '',
            org_unit_id: '',
            is_active: true,
        },
    );

    const [query, setQuery] = useState('');
    const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

    // Add Dialog state
    const [openAdd, setOpenAdd] = useState(false);

    // Edit Dialog state
    const [openEdit, setOpenEdit] = useState(false);
    const [editing, setEditing] = useState<Account | null>(null);

    // View Log Sheet state
    const [openLog, setOpenLog] = useState(false);
    const [logAccount, setLogAccount] = useState<Account | null>(null);

    // Disable AlertDialog state
    const [openDisable, setOpenDisable] = useState(false);
    const [disableTarget, setDisableTarget] = useState<Account | null>(null);

    // Form states (single page, reuse for add/edit)
    const [fName, setFName] = useState('');
    const [fEmail, setFEmail] = useState('');
    const [fRole, setFRole] = useState<AccountRole>('staff');
    const [fBidang, setFBidang] = useState('');
    const [fActive, setFActive] = useState(true);
    const [fOnline, setFOnline] = useState(false);

    function resetForm() {
        setFName('');
        setFEmail('');
        setFRole('staff');
        setFBidang('');
        setFActive(true);
        setFOnline(false);
    }

    function fillFormFromAccount(acc: Account) {
        setFName(acc.name);
        setFEmail(acc.email);
        setFRole(acc.role);
        setFBidang(acc.bidang);
        setFActive(acc.active);
        setFOnline(acc.online);
    }

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return accounts;
        return accounts.filter((a) => {
            return (
                a.name.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q) ||
                a.role.toLowerCase().includes(q) ||
                a.bidang.toLowerCase().includes(q)
            );
        });
    }, [query, accounts]);

    function openAddDialog() {
        resetForm();
        setOpenAdd(true);
    }

    function onSubmitAdd(e: FormEvent) {
        e.preventDefault();
        addAccountForm.submit({
            onSuccess: () => {
                toast.success('Akun berhasil ditambahkan');
                setOpenAdd(false);
                addAccountForm.reset();
            },
            onValidationError: (error) => {
                toast.error(error.data.message);
            },
        });
    }

    function onClickEdit(acc: Account) {
        setEditing(acc);
        updateAccountForm.reset();
        updateAccountForm.setData('id', acc.id);
        updateAccountForm.setData('name', acc.name);
        updateAccountForm.setData('email', acc.email);
        updateAccountForm.setData('password', acc.password ?? null);
        updateAccountForm.setData('org_unit_id', acc.org_unit_id ?? '');
        updateAccountForm.setData('role', acc.role);
        updateAccountForm.setData('is_active', acc.active);
        console.log('acc', acc);

        fillFormFromAccount(acc);
        setOpenEdit(true);
    }

    function onSubmitEdit(e: FormEvent) {
        e.preventDefault();
        if (!editing) return;
        updateAccountForm.submit({
            onSuccess: () => {
                toast.success('Akun berhasil diperbarui');
                updateAccountForm.reset();
                setOpenEdit(false);
            },
            onValidationError: (error) => {
                toast.error(error.data.message);
            },
        });
    }

    function onClickViewLog(acc: Account) {
        setLogAccount(acc);
        setOpenLog(true);
    }

    function onClickDisable(acc: Account) {
        router.post(
            `/master/accounts/${acc.id}/toggle?_method=PATCH`,
            {},
            {
                onSuccess: () => {
                    toast.success('Akun berhasil dinonaktifkan');
                },
                onError: () => {
                    toast.error('Gagal menonaktifkan akun');
                },
            },
        );
    }

    function confirmDisable() {
        if (!disableTarget) return;
        const now = isoNow();
        setAccounts((prev) =>
            prev.map((a) =>
                a.id === disableTarget.id
                    ? {
                          ...a,
                          active: false,
                          online: false,
                          updatedAt: now,
                          logs: [
                              ...a.logs,
                              {
                                  id: `l-${Date.now()}`,
                                  timestamp: now,
                                  action: 'Account Disabled',
                                  detail: 'Dinonaktifkan oleh admin',
                              },
                          ],
                      }
                    : a,
            ),
        );
        setOpenDisable(false);
        setDisableTarget(null);
    }

    function roleBadgeVariant(
        role: string,
    ): 'default' | 'secondary' | 'outline' | 'destructive' {
        switch (role) {
            case 'superadmin':
                return 'default';
            case 'admin_it':
                return 'secondary';
            case 'admin_kantor':
            default:
                return 'outline';
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List Account" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <header className="mb-6 flex flex-col gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-balance">
                                List Account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola akun: cari, tambah, ubah, lihat log
                                aktivitas, dan nonaktifkan akun.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="flex w-full items-center gap-3 md:max-w-md">
                                <Label htmlFor="search" className="sr-only">
                                    Pencarian
                                </Label>
                                <Input
                                    id="search"
                                    placeholder="Cari nama, email, role, atau bidang..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button onClick={openAddDialog}>
                                    Add Account
                                </Button>
                            </div>
                        </div>
                    </header>

                    {/* Table */}
                    <section className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Bidang</TableHead>
                                    <TableHead>Active</TableHead>
                                    <TableHead>Online</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Updated At</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.map((acc) => (
                                    <TableRow
                                        key={acc.id}
                                        className={
                                            !acc.is_active ? 'opacity-75' : ''
                                        }
                                    >
                                        <TableCell className="font-medium">
                                            {acc.name}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {acc.email}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={roleBadgeVariant(
                                                    acc.role,
                                                )}
                                                className="capitalize"
                                            >
                                                {acc.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {acc.org_unit?.name}
                                        </TableCell>
                                        <TableCell>
                                            {acc.deleted_at === null ? (
                                                <Badge variant="outline">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">
                                                    Disabled
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {isUserOnline(
                                                acc.last_active_at,
                                            ) ? (
                                                <Badge variant="secondary">
                                                    Online
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline">
                                                    Offline
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatDate(acc.createdAt)}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {formatDate(acc.updatedAt)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        onClickViewLog(acc)
                                                    }
                                                >
                                                    View Log
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() =>
                                                        onClickEdit(acc)
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        onClickDisable(acc)
                                                    }
                                                    disabled={
                                                        acc.deleted_at !== null
                                                    }
                                                >
                                                    Disable
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell colSpan={9} className="p-0">
                                        <WhenVisible
                                            always={
                                                paginationUser.current_page <
                                                paginationUser.last_page
                                            }
                                            params={{
                                                data: {
                                                    page:
                                                        paginationUser.current_page <
                                                        paginationUser.last_page
                                                            ? paginationUser.current_page +
                                                              1
                                                            : paginationUser.current_page,
                                                },
                                                only: [
                                                    'users',
                                                    'paginationUser',
                                                ],
                                            }}
                                            buffer={0.1}
                                            fallback={<p>data not found.</p>}
                                            as="div"
                                        >
                                            {paginationUser.current_page >=
                                            paginationUser.last_page ? (
                                                <div className="p-2 text-center text-sm text-muted-foreground"></div>
                                            ) : (
                                                <div className="w-full p-2 text-center text-sm text-muted-foreground">
                                                    Loading more data...
                                                </div>
                                            )}
                                        </WhenVisible>
                                    </TableCell>
                                </TableRow>

                                {paginationUser.data.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={9}
                                            className="text-center text-muted-foreground"
                                        >
                                            Tidak ada data yang cocok.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </section>

                    {/* Add Dialog */}
                    <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Akun</DialogTitle>
                                <DialogDescription>
                                    Isi data akun baru lalu simpan.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={onSubmitAdd} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Nama lengkap"
                                        value={addAccountForm.data.name}
                                        onChange={(e) =>
                                            addAccountForm.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        onBlur={() =>
                                            addAccountForm.validate('name')
                                        }
                                        required
                                    />
                                    {addAccountForm.invalid('name') && (
                                        <div className="text-sm text-red-600">
                                            {addAccountForm.errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={addAccountForm.data.email}
                                        onChange={(e) =>
                                            addAccountForm.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        onBlur={() =>
                                            addAccountForm.validate('email')
                                        }
                                        required
                                    />
                                    {addAccountForm.invalid('email') && (
                                        <div className="text-sm text-red-600">
                                            {addAccountForm.errors.email}
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="********"
                                        value={addAccountForm.data.password}
                                        onChange={(e) =>
                                            addAccountForm.setData(
                                                'password',
                                                e.target.value,
                                            )
                                        }
                                        onBlur={() =>
                                            addAccountForm.validate('password')
                                        }
                                        required
                                    />
                                    {addAccountForm.invalid('password') && (
                                        <div className="text-sm text-red-600">
                                            {addAccountForm.errors.password}
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label>Role</Label>
                                    <Select
                                        value={addAccountForm.data.role}
                                        onValueChange={(v) =>
                                            addAccountForm.setData(
                                                'role',
                                                v as AccountRole,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin_it">
                                                admin it
                                            </SelectItem>
                                            <SelectItem value="admin_kantor">
                                                admin kantor
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {addAccountForm.invalid('role') && (
                                        <div className="text-sm text-red-600">
                                            {addAccountForm.errors.role}
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bidang">Bidang</Label>
                                    <Select
                                        value={addAccountForm.data.org_unit_id}
                                        onValueChange={(v) =>
                                            addAccountForm.setData(
                                                'org_unit_id',
                                                v as string,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih bidang" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {orgUnits.map((ou) => (
                                                <SelectItem
                                                    key={ou.id}
                                                    value={ou.id.toString()}
                                                >
                                                    {ou.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {addAccountForm.invalid('org_unit_id') && (
                                        <div className="text-sm text-red-600">
                                            {addAccountForm.errors.org_unit_id}
                                        </div>
                                    )}
                                </div>
                                <DialogFooter className="gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpenAdd(false)}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit">Simpan</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Dialog */}
                    <Dialog
                        open={openEdit}
                        onOpenChange={(v) => {
                            setOpenEdit(v);
                            if (!v) setEditing(null);
                        }}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Akun</DialogTitle>
                                <DialogDescription>
                                    Perbarui data akun lalu simpan.
                                </DialogDescription>
                            </DialogHeader>
                            <form
                                onSubmit={onSubmitEdit}
                                className="grid gap-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="ename">Name</Label>
                                    <Input
                                        id="ename"
                                        value={updateAccountForm.data.name}
                                        onChange={(e) =>
                                            updateAccountForm.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        onBlur={() =>
                                            updateAccountForm.validate('name')
                                        }
                                        required
                                    />
                                    {updateAccountForm.invalid('name') && (
                                        <div className="text-sm text-red-600">
                                            {updateAccountForm.errors.name}
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="eemail">Email</Label>
                                    <Input
                                        id="eemail"
                                        type="email"
                                        value={updateAccountForm.data.email}
                                        onChange={(e) =>
                                            updateAccountForm.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        onBlur={() =>
                                            updateAccountForm.validate('email')
                                        }
                                        required
                                    />
                                    {updateAccountForm.invalid('email') && (
                                        <div className="text-sm text-red-600">
                                            {updateAccountForm.errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="********"
                                        value={updateAccountForm.data.password}
                                        onChange={(e) =>
                                            updateAccountForm.setData(
                                                'password',
                                                e.target.value,
                                            )
                                        }
                                        onBlur={() =>
                                            addAccountForm.validate('password')
                                        }
                                    />
                                    {addAccountForm.invalid('password') && (
                                        <div className="text-sm text-red-600">
                                            {addAccountForm.errors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label>Role</Label>
                                    <Select
                                        value={fRole}
                                        onValueChange={(v) =>
                                            updateAccountForm.setData('role', v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin_it">
                                                admin it
                                            </SelectItem>
                                            <SelectItem value="admin_kantor">
                                                admin kantor
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="ebidang">Bidang</Label>
                                    <Select
                                        value={
                                            updateAccountForm.data.org_unit_id
                                        }
                                        onValueChange={(v) =>
                                            updateAccountForm.setData(
                                                'org_unit_id',
                                                v,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih bidang" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {orgUnits.map((ou) => (
                                                <SelectItem
                                                    key={ou.id}
                                                    value={ou.name}
                                                >
                                                    {ou.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {updateAccountForm.invalid(
                                        'org_unit_id',
                                    ) && (
                                        <div className="text-sm text-red-600">
                                            {
                                                updateAccountForm.errors
                                                    .org_unit_id
                                            }
                                        </div>
                                    )}
                                </div>
                                <DialogFooter className="gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpenEdit(false)}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit">Simpan</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* View Log Sheet */}
                    <Sheet open={openLog} onOpenChange={setOpenLog}>
                        <SheetContent
                            side="right"
                            className="w-full sm:max-w-lg"
                        >
                            <SheetHeader>
                                <SheetTitle>Aktivitas Akun</SheetTitle>
                                <SheetDescription>
                                    Log apa saja yang dilakukan oleh akun{' '}
                                    {logAccount?.name ?? '-'}.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-4 grid gap-3">
                                {logAccount?.logs?.length ? (
                                    logAccount.logs
                                        .slice()
                                        .sort((a, b) =>
                                            a.timestamp < b.timestamp ? 1 : -1,
                                        )
                                        .map((log) => (
                                            <div
                                                key={log.id}
                                                className="rounded-md border p-3"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium">
                                                        {log.action}
                                                    </p>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatDate(
                                                            log.timestamp,
                                                        )}
                                                    </span>
                                                </div>
                                                {log.detail ? (
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {log.detail}
                                                    </p>
                                                ) : null}
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Belum ada aktivitas.
                                    </p>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Disable Account Confirm */}
                    <AlertDialog
                        open={openDisable}
                        onOpenChange={setOpenDisable}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Nonaktifkan akun?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Akun{' '}
                                    <span className="font-medium">
                                        {disableTarget?.name}
                                    </span>{' '}
                                    akan dinonaktifkan. Anda dapat
                                    mengaktifkannya kembali melalui Edit.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={confirmDisable}>
                                    Nonaktifkan
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </main>
            </div>
        </AppLayout>
    );
}
