import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    LayoutGrid,
    HardDrive,
    Tag,
    Monitor,
    MapPin,
    Building2,
    Users,
    Folder
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Data Assets',
        href: '#',
        icon: HardDrive, // Icon untuk aset/perangkat keras
    },
    {
        title: 'Data Tipe',
        href: '#',
        icon: Tag, // Icon untuk kategori/tipe
    },
    {
        title: 'Data Model',
        href: '#',
        icon: Monitor, // Icon untuk model perangkat
    },
    {
        title: 'Data Lokasi',
        href: '#',
        icon: MapPin, // Icon untuk lokasi
    },
    {
        title: 'Data Bidang',
        href: '/master/org-units',
        icon: Building2, // Icon untuk departemen/bidang
    },
    {
        title: 'Data Pegawai',
        href: '/master/employees',
        icon: Users, // Icon untuk pegawai/pengguna
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
