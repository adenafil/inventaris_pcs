import { TableCell, TableRow } from "@/components/ui/table";
import { Asset, Employee, OrgUnit, PaginatedResponse } from "../_types";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import AssignForm from "./assign-form";
import DeleteAssetBtn from "./delete-asset-btn";

export default function TableDataAsset({
    data,
    employees,
    orgUnits,
}: {
    data: Asset;
    employees: PaginatedResponse<Employee>;
    orgUnits: PaginatedResponse<OrgUnit>;
}) {
    return (
        <TableRow key={data.id}>
            <TableCell className="whitespace-nowrap">
                {data.inventory_number}
            </TableCell>
            <TableCell>{data.item_name}</TableCell>
            <TableCell>{data.type.name}</TableCell>
            <TableCell>{data.model.brand}</TableCell>
            <TableCell>{data.location.name}</TableCell>
            <TableCell>{data.creator.name}</TableCell>
            <TableCell className="space-x-2 text-center">
                <Link preserveScroll href={`/master/assets/view/${data.id}`}>
                    <Button
                        size="sm"
                        variant="outline"
                        className="inline-flex gap-1 bg-transparent"
                    >
                        <Eye className="h-4 w-4" />
                        View
                    </Button>
                </Link>
                <Link href={`/master/assets/${data.id}/edit`}>
                    <Button
                        size="sm"
                        variant="outline"
                    className="inline-flex gap-1 bg-transparent"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Button>
                </Link>
                <AssignForm
                    key={data.id}
                    asset_id={data.id}
                    employees={employees}
                    orgUnits={orgUnits}
                />

                <DeleteAssetBtn
                    className="inline-flex gap-1"
                    assetId={data.id}
                />
            </TableCell>
        </TableRow>
    );
}
