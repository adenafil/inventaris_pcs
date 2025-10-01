export type Asset = {
    id: string;
    nomorInvent: string;
    item: string;
    tipe: string;
    brand: string;
    pemakai: string;
    bidang: string;
    lokasi: string;
    tahun: number;
    serial: string;
    tanggalPembelian: string; // ISO date
    akhirGaransi: string; // ISO date
    tanggalSerahTerima?: string; // ISO datetime
    images?: string[]; // urls or data urls (for demo we won't persist uploads)
};

export type ServiceLog = {
    id: string;
    type: 'service' | 'repair' | 'other';
    title: string;
    description: string;
    at: string; // ISO datetime
};

export const assetTypes = [
    'Laptop',
    'PC',
    'Printer',
    'Scanner',
    'Router',
    'Switch',
] as const;
export const models = [
    'ThinkPad X1',
    'MacBook Pro',
    'Dell Latitude',
    'HP EliteBook',
    'Canon LBP',
] as const;
export const locations = [
    'Kantor Pusat',
    'Gudang',
    'Cabang A',
    'Cabang B',
] as const;
export const users = ['Andi', 'Budi', 'Siti', 'Rina', 'Admin IT'] as const;
export const bidangOptions = ['IT', 'Keuangan', 'Operasional', 'HR'] as const;

const base: Omit<Asset, 'id'>[] = [
    {
        nomorInvent: 'INV-2024-0001',
        item: 'Laptop',
        tipe: 'Laptop',
        brand: 'ThinkPad X1',
        pemakai: 'Andi',
        bidang: 'IT',
        lokasi: 'Kantor Pusat',
        tahun: 2024,
        serial: 'SN-ABC-001',
        tanggalPembelian: '2024-02-15',
        akhirGaransi: '2026-02-15',
        tanggalSerahTerima: '2024-02-20T09:30:00.000Z',
        images: ['/asset-laptop-photo.jpg'],
    },
    {
        nomorInvent: 'INV-2023-0132',
        item: 'Printer',
        tipe: 'Printer',
        brand: 'Canon LBP',
        pemakai: 'Rina',
        bidang: 'Operasional',
        lokasi: 'Cabang A',
        tahun: 2023,
        serial: 'SN-PRN-132',
        tanggalPembelian: '2023-07-01',
        akhirGaransi: '2025-07-01',
        tanggalSerahTerima: '2023-07-05T13:00:00.000Z',
        images: ['/asset-printer-photo.jpg'],
    },
    {
        nomorInvent: 'INV-2022-0020',
        item: 'Router',
        tipe: 'Router',
        brand: 'MikroTik',
        pemakai: 'Admin IT',
        bidang: 'IT',
        lokasi: 'Gudang',
        tahun: 2022,
        serial: 'SN-RT-020',
        tanggalPembelian: '2022-03-10',
        akhirGaransi: '2024-03-10',
        tanggalSerahTerima: '2022-03-12T10:15:00.000Z',
        images: ['/asset-router-photo.jpg'],
    },
];

function withIds(prefix: string, items: Omit<Asset, 'id'>[]): Asset[] {
    return items.map((a, i) => ({ ...a, id: `${prefix}-${i + 1}` }));
}

export const assetsIT: Asset[] = withIds('it', base);
export const assetsKantor: Asset[] = withIds('kantor', [
    {
        nomorInvent: 'INV-2023-0200',
        item: 'PC',
        tipe: 'PC',
        brand: 'Dell Latitude',
        pemakai: 'Budi',
        bidang: 'Keuangan',
        lokasi: 'Kantor Pusat',
        tahun: 2023,
        serial: 'SN-PC-200',
        tanggalPembelian: '2023-05-12',
        akhirGaransi: '2026-05-12',
        images: ['/asset-pc-photo.jpg'],
    },
    {
        nomorInvent: 'INV-2021-0888',
        item: 'Scanner',
        tipe: 'Scanner',
        brand: 'Fujitsu',
        pemakai: 'Siti',
        bidang: 'HR',
        lokasi: 'Cabang B',
        tahun: 2021,
        serial: 'SN-SC-888',
        tanggalPembelian: '2021-11-20',
        akhirGaransi: '2024-11-20',
        images: ['/asset-scanner-photo.jpg'],
    },
]);

export function getAssetById(id: string): Asset | undefined {
    return [...assetsIT, ...assetsKantor].find((a) => a.id === id);
}

export function getLogsForAsset(id: string): ServiceLog[] {
    // dummy logs
    return [
        {
            id: `${id}-log-1`,
            type: 'service',
            title: 'Perawatan Berkala',
            description: 'Pembersihan internal dan update firmware.',
            at: '2024-08-10T08:30:00.000Z',
        },
        {
            id: `${id}-log-2`,
            type: 'repair',
            title: 'Perbaikan Keyboard',
            description: 'Penggantian keycap dan pembersihan switch.',
            at: '2024-12-02T14:00:00.000Z',
        },
        {
            id: `${id}-log-3`,
            type: 'other',
            title: 'Peminjaman Sementara',
            description: 'Dipinjam oleh tim proyek selama 2 minggu.',
            at: '2025-01-15T09:00:00.000Z',
        },
    ];
}
