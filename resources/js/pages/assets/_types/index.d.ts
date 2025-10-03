export interface Asset {
    id: number;
    inventory_number: string;
    type_id: number;
    model_id: number;
    serial_number: string;
    item_name: string;
    purchase_date: string;
    purchase_year: string;
    warranty_expiration: string;
    status: string;
    location_id: number;
    owner_type: 'pegawai' | 'bidang';
    owner_employee_id: number | null;
    owner_org_unit_id: number | null;
    created_at: string;
    updated_at: string;
    type: AssetType;
    model: AssetModel;
    location: AssetLocation;
    owner_employee: OwnerEmployee | null;
    owner_org_unit: OwnerOrgUnit | null;
}

export interface AssetType {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface AssetModel {
    id: number;
    type_id: number;
    brand: string;
    model: string;
    details: string | null;
    created_at: string;
    updated_at: string;
}

export interface AssetLocation {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface OwnerEmployee {
    id: number;
    nip: string;
    name: string;
    email: string;
    org_unit_id: number;
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface OwnerOrgUnit {
    id: number;
    code: string;
    name: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface Link {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface DataAssets {
    current_page: number;
    data: Asset[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface PageProps {
    dataAssets: DataAssets;
}
