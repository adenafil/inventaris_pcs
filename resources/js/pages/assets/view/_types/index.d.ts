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

interface Link {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
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

interface Document {
    id: number;
    asset_id: number;
    file_path: string;
    uploaded_by: number;
    upload_date: string;
    created_at: string;
    updated_at: string;
}

interface DataAsset {
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
    documents: Document[];
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

interface Assignment {
    id: number;
    asset_id: number;
    employee_id: number | null;
    org_unit_id: number | null;
    created_by: number;
    notes: string | null;
    dokument_peminjaman: string | null;
    status: string;
    assigned_at: string;
    returned_at: string | null;
    created_at: string;
    updated_at: string;
    key_qr: string;
    employee: Employee | null;
    org_unit: OrgUnit | null;
    creator: Creator;
}

export interface PageProps {
    dataAsset: DataAsset;
    assignments: Assignment[];
    employees: PaginatedResponse<Employee>;
    orgUnits: PaginatedResponse<OrgUnit>;
    hostUrl: string;
}
