"use client";

import { Pagination } from "@/components/ui/pagination";

type ProductPaginationProps = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
};

export function ProductPagination({
    hasNextPage,
    hasPreviousPage,
    startCursor,
    endCursor,
}: ProductPaginationProps) {
    return (
        <Pagination
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            startCursor={startCursor}
            endCursor={endCursor}
        />
    );
}