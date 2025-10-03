interface OrgUnit {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_secret: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_confirmed_at: string | null;
    role: string;
    org_unit_id: number | null;
    is_active: boolean;
    last_active_at: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    org_unit: OrgUnit | null;
}

interface PaginationUser {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface PageProps {
    orgUnits: OrgUnit[];
    paginationUser: PaginationUser;
    users: User[];
    page: number;
}
