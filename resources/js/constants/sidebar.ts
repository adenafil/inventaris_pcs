import { NavItem } from "@/types";
import { Building2, HardDrive, LayoutGrid, MapPin, Monitor, Tag, UserCog, Users } from "lucide-react";

export const mainNavItemsSuperAdmin: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Data Assets',
        href: '/master/assets',
        icon: HardDrive,
    },
    {
        title: 'Data Tipe',
        href: '/master/types',
        icon: Tag,
    },
    {
        title: 'Data Model',
        href: '/master/models',
        icon: Monitor,
    },
    {
        title: 'Data Lokasi',
        href: '/master/locations',
        icon: MapPin,
    },
    {
        title: 'Data Bidang',
        href: '/master/org-units',
        icon: Building2,
    },
    {
        title: 'Data Pegawai',
        href: '/master/employees',
        icon: Users,
    },
    {
        title: 'Manajemen Akun',
        href: '/master/accounts',
        icon: UserCog,
    },
];

export const mainNavItemsSoSoAdmin: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Data Assets',
        href: '/master/assets',
        icon: HardDrive,
    },
    {
        title: 'Data Tipe',
        href: '/master/types',
        icon: Tag,
    },
    {
        title: 'Data Model',
        href: '/master/models',
        icon: Monitor,
    },
    {
        title: 'Data Lokasi',
        href: '/master/locations',
        icon: MapPin,
    },
];
