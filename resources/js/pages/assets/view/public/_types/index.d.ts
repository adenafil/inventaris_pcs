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

interface OrgUnit {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface AssetType {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Model {
    brand: string;
    created_at: string;
    details: string | null;
    id: number;
    model: string;
    type_id: number;
    updated_at: string;
}

interface Asset {
    id: number;
    inventory_number: string;
    type_id: number;
    model_id: number;
    serial_number: string;
    item_name: string;
    documents: Document[];
    type: AssetType;
    model: Model;
    assignments?: Assignment[];
    location: Location;
    purchase_date: string;
    purchase_year: string;
    warranty_expiration: string;
    status: string;
    location_id: number;
    created_by: number;
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

interface Employee {
    id: number;
    name: string;
    email: string | null;
    is_active: boolean;
    org_unit_id: number;
    created_at: string;
    updated_at: string;
}

export interface Assignment {
    id: number;
    asset_id: number;
    employee_id: number | null;
    org_unit_id: number;
    created_by: number;
    notes: string;
    key_qr: string;
    dokument_peminjaman: string;
    status: string;
    assigned_at: string;
    returned_at: string | null;
    created_at: string;
    updated_at: string;
    asset: Asset;
    employee: Employee | null;
    org_unit: OrgUnit;
    creator: Creator;
}
