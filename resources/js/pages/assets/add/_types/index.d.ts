export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface Pagination<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface Type {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Model {
    id: number;
    type_id: number;
    brand: string;
    model: string;
    details: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export interface Location {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Employee {
    id: number;
    nip: string;
    name: string;
    email: string;
    org_unit_id: number;
    is_active: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface OrgUnit {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    uniqueId: string;
    types: Pagination<Type>;
    models: Pagination<Model>;
    locations: Pagination<Location>;
    employees: Pagination<Employee>;
    orgUnits: Pagination<OrgUnit>;
    prefixes: Pagination<{ code: string; name: string; description?: string; created_at: string; updated_at: string }>;
    prexisesSelectBox: { code: string; name: string; description?: string; created_at: string; updated_at: string }[];
}
