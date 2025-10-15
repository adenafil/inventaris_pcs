import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { useEffect, type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {

    // setInterval(() => {
    //     fetch('/geez')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('User activity updated:', data);
    //         })
    //         .catch(error => {
    //             console.error('Error updating user activity:', error);
    //         });
    // }, 60 * 1000);

    // useEffect(() => {
    //     const handleActivity = () => {
    //         fetch('/geez')
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log('User activity updated:', data);
    //             })
    //             .catch(error => {
    //                 console.error('Error updating user activity:', error);
    //             });
    //     };

    //     handleActivity();

    // }, []);

    return (
        <>
            <AppShell variant="sidebar">
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>
            <Toaster position="top-center" />
        </>
    );
}
