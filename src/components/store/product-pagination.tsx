"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type ProductPaginationProps = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string | null;
};

export function ProductPagination({
    hasNextPage,
    hasPreviousPage,
    endCursor,
}: ProductPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleNextPage = () => {
        if (!hasNextPage || !endCursor) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("after", endCursor);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handlePreviousPage = () => {
        if (!hasPreviousPage) return;

        // For previous page, we need to remove the after cursor
        // This will reset to the first page
        const params = new URLSearchParams(searchParams.toString());
        params.delete("after");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    if (!hasNextPage && !hasPreviousPage) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <Button
                variant="outline"
                onClick={handlePreviousPage}
                disabled={!hasPreviousPage}
                className="flex items-center gap-2"
            >
                <IconChevronLeft className="size-4" />
                Previous
            </Button>
            <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={!hasNextPage}
                className="flex items-center gap-2"
            >
                Next
                <IconChevronRight className="size-4" />
            </Button>
        </div>
    );
}