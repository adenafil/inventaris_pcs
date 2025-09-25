export interface OrgUnit {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface Pagination {
    current_page: number;
    data: OrgUnit[];
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

export interface PageProps {
    orgunits: OrgUnit[];
    pagination: Pagination;
    page: number;
}
