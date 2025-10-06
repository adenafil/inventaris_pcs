interface Link {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
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

interface AssetType {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface AssetModel {
    id: number;
    type_id: number;
    brand: string;
    model: string;
    details: string | null;
    created_at: string;
    updated_at: string;
}

interface Location {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Creator {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_confirmed_at: string | null;
    role: string;
    org_unit_id: number | null;
    last_active_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

interface Asset {
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
    created_by: number;
    created_at: string;
    updated_at: string;
    type: AssetType;
    model: AssetModel;
    location: Location;
    creator: Creator;
}

interface Employee {
    id: number;
    nip: string;
    name: string;
    email: string;
    org_unit_id: number;
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
}

interface OrgUnit {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    dataAssets: PaginatedResponse<Asset>;
    employees: PaginatedResponse<Employee>;
    orgUnits: PaginatedResponse<OrgUnit>;
}
