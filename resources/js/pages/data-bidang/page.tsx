import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Edit, Plus, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Bidang',
        href: '/master/org-units',
    },
];

// Dummy data
const initialBidangData = [
  { id: 1, namaBidang: "Teknologi Informasi" },
  { id: 2, namaBidang: "Sumber Daya Manusia" },
  { id: 3, namaBidang: "Keuangan" },
  { id: 4, namaBidang: "Pemasaran" },
  { id: 5, namaBidang: "Operasional" },
]



export default function Page() {
  const [bidangData, setBidangData] = useState(initialBidangData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [namaBidang, setNamaBidang] = useState('');

  const handleEdit = (id: number, namaBidang: string) => {
      console.log('Edit bidang:', { id, namaBidang });
  };

  const handleDelete = (id: number, namaBidang: string) => {
      console.log('Delete bidang:', { id, namaBidang });
      // Optional: Remove from state for demo purposes
      setBidangData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSimpan = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Simpan bidang:', { namaBidang });

      // Add new bidang to the list (demo purposes)
      const newId = Math.max(...bidangData.map((b) => b.id)) + 1;
      setBidangData((prev) => [...prev, { id: newId, namaBidang }]);

      // Reset form and close modal
      setNamaBidang('');
      setIsModalOpen(false);
  };



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Bidang" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Master Bidang
                        </h1>
                        <p className="text-gray-600">
                            Kelola data bidang dalam organisasi Anda di sini.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl font-bold">
                                Master Bidang
                            </CardTitle>
                            <Dialog
                                open={isModalOpen}
                                onOpenChange={setIsModalOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        Tambah Bidang
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Tambah Bidang</DialogTitle>
                                    </DialogHeader>
                                    <form
                                        onSubmit={handleSimpan}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="namaBidang">
                                                Nama Bidang
                                            </Label>
                                            <Input
                                                id="namaBidang"
                                                type="text"
                                                value={namaBidang}
                                                onChange={(e) =>
                                                    setNamaBidang(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Masukkan nama bidang"
                                                required
                                            />
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    setIsModalOpen(false)
                                                }
                                                className="flex flex-1 items-center gap-2"
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="flex flex-1 items-center gap-2"
                                            >
                                                <Save className="h-4 w-4" />
                                                Simpan
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Bidang</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bidangData.map((bidang) => (
                                        <TableRow key={bidang.id}>
                                            <TableCell className="font-medium">
                                                {bidang.namaBidang}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleEdit(
                                                                bidang.id,
                                                                bidang.namaBidang,
                                                            )
                                                        }
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleDelete(
                                                                bidang.id,
                                                                bidang.namaBidang,
                                                            )
                                                        }
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
