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
import { Auth, SharedData, User, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    LayoutGrid,
    HardDrive,
    Tag,
    Monitor,
    MapPin,
    Building2,
    Users,
    Folder,
    UserCog
} from 'lucide-react';
import AppLogo from './app-logo';
import { mainNavItemsSoSoAdmin, mainNavItemsSuperAdmin } from '@/constants/sidebar';

// const mainNavItemsSuperAdmin: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: dashboard(),
//         icon: LayoutGrid,
//     },
//     {
//         title: 'Data Assets',
//         href: '/master/assets',
//         icon: HardDrive,
//     },
//     {
//         title: 'Data Tipe',
//         href: '/master/types',
//         icon: Tag,
//     },
//     {
//         title: 'Data Model',
//         href: '/master/models',
//         icon: Monitor,
//     },
//     {
//         title: 'Data Lokasi',
//         href: '/master/locations',
//         icon: MapPin,
//     },
//     {
//         title: 'Data Bidang',
//         href: '/master/org-units',
//         icon: Building2,
//     },
//     {
//         title: 'Data Pegawai',
//         href: '/master/employees',
//         icon: Users,
//     },
//     {
//         title: 'Manajemen Akun',
//         href: '/master/accounts',
//         icon: UserCog,
//     }
// ];

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
    const auth = (usePage().props as unknown as SharedData).auth;

    if (auth.user.role === 'superadmin') {
        var mainNavItems = mainNavItemsSuperAdmin;
    } else {
        var mainNavItems = mainNavItemsSoSoAdmin;
    }
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
