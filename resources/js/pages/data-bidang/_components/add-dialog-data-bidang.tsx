import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "laravel-precognition-react";
import { Plus, Save } from "lucide-react";

interface PageProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    formAddBidang: Form<{
        code: string;
        name: string;
    }>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AddDialogDataBidang({ isModalOpen, setIsModalOpen, formAddBidang, handleSubmit }: PageProps) {
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tambah Bidang</DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="namaBidang">Nama Bidang</Label>
                            <Input
                                id="namaBidang"
                                type="text"
                                value={formAddBidang.data.name}
                                onChange={(e) =>
                                    formAddBidang.setData(
                                        'name',
                                        e.target.value,
                                    )
                                }
                                onBlur={() => formAddBidang.validate('name')}
                                className="w-full"
                                placeholder="Masukkan nama bidang"
                                required
                            />
                            {formAddBidang.invalid('name') && (
                                <p className="text-sm text-red-600">
                                    {formAddBidang.errors.name}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="flex flex-1 items-center gap-2"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="flex flex-1 items-center gap-2"
                                disabled={formAddBidang.processing}
                            >
                                <Save className="h-4 w-4" />
                                {formAddBidang.processing
                                    ? 'Loading...'
                                    : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
