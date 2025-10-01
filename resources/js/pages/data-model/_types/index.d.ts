export interface DataType {
    code: string;
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
}

export interface AssetModel {
    id: number;
    type_id: number;
    brand: string;
    model: string;
    details: string | null;
    created_at: string | null;
    updated_at: string | null;
    type: DataType;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface Pagination {
    current_page: number;
    data: AssetModel[];
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
    assetModels: AssetModel[];
    pagination: Pagination;
    page: number;
}
