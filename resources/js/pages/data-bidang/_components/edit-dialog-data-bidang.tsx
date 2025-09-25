import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { OrgUnit } from "../_types";

interface PageProps {
    loading: boolean;
    isEditModalOpen: boolean;
    setIsEditModalOpen: (open: boolean) => void;
    activeOrgUnit: OrgUnit | null;
    handleEdit: () => void;
    setActiveOrgUnit: (orgUnit: OrgUnit | null) => void;
    setIsModalOpen: (open: boolean) => void;
}


export default function EditDialogDataBidang({ loading, isEditModalOpen, setIsEditModalOpen, activeOrgUnit, handleEdit, setActiveOrgUnit, setIsModalOpen }: PageProps) {
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Bidang</DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="namaBidang">Nama Bidang</Label>
                            <Input
                                id="namaBidang"
                                type="text"
                                value={activeOrgUnit?.name || ''}
                                onChange={(e) =>
                                    setActiveOrgUnit(
                                        activeOrgUnit
                                            ? {
                                                  ...activeOrgUnit,
                                                  name: e.target.value,
                                              }
                                            : null
                                    )
                                }
                                className="w-full"
                                placeholder="Masukkan nama bidang"
                                required
                            />
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
                                onClick={handleEdit}
                                type="submit"
                                className="flex flex-1 items-center gap-2"
                                disabled={loading}
                            >
                                <Save className="h-4 w-4" />
                                {loading ? 'Loading...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
