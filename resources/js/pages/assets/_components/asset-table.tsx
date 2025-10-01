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
import { Eye, Pencil, QrCode, Trash2 } from 'lucide-react';
import { Asset } from './lib/assets-data';
import { Link } from '@inertiajs/react';

type Props = {
    data: Asset[];
    onViewQr: (asset: Asset) => void;
    onDelete: (asset: Asset) => void;
};

export function AssetTable({ data, onViewQr, onDelete }: Props) {
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
                        <TableHead>Tahun</TableHead>
                        <TableHead>Create By</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((a) => (
                        <TableRow key={a.id}>
                            <TableCell className="whitespace-nowrap">
                                {a.nomorInvent}
                            </TableCell>
                            <TableCell>{a.item}</TableCell>
                            <TableCell>{a.tipe}</TableCell>
                            <TableCell>{a.brand}</TableCell>
                            <TableCell>{a.pemakai}</TableCell>
                            <TableCell>{a.bidang}</TableCell>
                            <TableCell>{a.lokasi}</TableCell>
                            <TableCell>{a.tahun}</TableCell>
                            <TableCell>{a.pemakai}</TableCell>
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
                    {data.length === 0 && (
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
