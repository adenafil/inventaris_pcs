'use client';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Eye, Pencil, QrCode, Trash2 } from 'lucide-react';
import { DataAssets } from '../_types';
import { AssignmentSheet } from './assignment-sheet';

type Props = {
    pagination: DataAssets;
    onViewQr: (asset: Asset) => void;
    onDelete: (asset: Asset) => void;
};

export function AssetTable({ pagination, onViewQr, onDelete }: Props) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No. Invent</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Pemakai</TableHead>
                        <TableHead>Bidang</TableHead>
                        <TableHead>Lokasi</TableHead>
                        <TableHead>Tahun Pembelian</TableHead>
                        <TableHead>Create By</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pagination.data.map((a) => (
                        <TableRow key={a.id}>
                            <TableCell className="whitespace-nowrap">
                                {a.inventory_number}
                            </TableCell>
                            <TableCell>{a.item_name}</TableCell>
                            <TableCell>{a.type.name}</TableCell>
                            <TableCell>{a.model.brand}</TableCell>
                            <TableCell>
                                {a.owner_type === 'bidang'
                                    ? a.owner_org_unit?.name
                                    : a.owner_employee?.name}
                            </TableCell>
                            <TableCell>{a.owner_type}</TableCell>
                            <TableCell>{a.location.name}</TableCell>
                            <TableCell>{a.purchase_year}</TableCell>
                            <TableCell>{''}</TableCell>
                            <TableCell className="space-x-1 text-right">
                                <Link href={`/assets/${a.id}`}>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="inline-flex gap-1 bg-transparent"
                                    >
                                        <Eye className="h-4 w-4" />
                                        View
                                    </Button>
                                </Link>
                                <Link href={`/assets/${a.id}/edit`}>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="inline-flex gap-1 bg-transparent"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="inline-flex gap-1 bg-transparent"
                                    onClick={() => onViewQr(a)}
                                >
                                    <QrCode className="h-4 w-4" />
                                    QR
                                </Button>
                                <AssignmentSheet
                                    asset={a}
                                    onAssign={(payload) => {
                                        console.log(
                                            '[v0] assigned asset:',
                                            payload,
                                        );
                                    }}
                                />

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="inline-flex gap-1"
                                    onClick={() => onDelete(a)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {pagination.data.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={10}
                                className="text-center text-muted-foreground"
                            >
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
