import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { SectionCards } from './_components/section-cards';
import { WelcomeSection } from './_components/welcome-section';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ totalAsset, totalPegawai, totalModel, role }: { totalAsset: number; totalPegawai: number; totalModel: number; role: string }) {
    console.log({ totalAsset, totalPegawai, totalModel, role });


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-3 overflow-x-auto rounded-xl p-4">
                <WelcomeSection />
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards totalAsset={totalAsset} totalPegawai={totalPegawai} totalModel={totalModel} role={role} />
                </div>
            </div>
        </AppLayout>
    );
}
