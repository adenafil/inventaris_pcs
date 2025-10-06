export type Link = {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
};

export type PaginatedResponse<T> = {
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
};

export type AssetType = {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
};

export type AssetModel = {
    id: number;
    type_id: number;
    brand: string;
    model: string;
    details: string | null;
    created_at: string;
    updated_at: string;
};

export type Location = {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
};

export type Employee = {
    id: number;
    nip: string;
    name: string;
    email: string;
    org_unit_id: number;
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
};

export type OrgUnit = {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
};

export type Asset = {
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
    owner_type: string;
    owner_employee_id: number | null;
    owner_org_unit_id: number | null;
    created_at: string;
    updated_at: string;
    type: AssetType;
    model: AssetModel;
    location: Location;
    owner_employee: Employee | null;
    owner_org_unit: OrgUnit | null;
};

export export type PageProps = {
    dataAssets: PaginatedResponse<Asset>;
    employees: PaginatedResponse<Employee>;
    orgUnits: PaginatedResponse<OrgUnit>;
};
