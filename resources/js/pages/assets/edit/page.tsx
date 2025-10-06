import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { AssetForm } from '../_components/asset-form';
import { Card } from '@/components/ui/card';
import { PageProps } from './_types/index';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Assets',
        href: '/master/assets',
    },
    {
        title: 'Add New Asset',
        href: '/master/assets/create',
    },
];

export default function Page({
    types,
    models,
    locations,
    employees,
    orgUnits,
    asset,
}: PageProps) {
    console.log({ types, models, locations, employees, orgUnits, asset });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Data Asset" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Edit Data Assets
                        </h1>
                        <p className="text-gray-600">
                            Use this form to edit the asset details.
                            Fill in the details below and click "Save" to
                            submit.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full space-y-4 px-4 sm:px-6 lg:px-8">
                    <Card className="p-4">
                        <AssetForm
                            mode="edit"
                            url="/master/assets"
                            asset={asset}
                            typesPagination={types}
                            modelsPagination={models}
                            locationsPagination={locations}
                            employeesPagination={employees}
                            orgUnitsPagination={orgUnits}
                        />
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
