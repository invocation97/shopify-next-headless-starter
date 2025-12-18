"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
    className?: string;
};

export function Pagination({
    hasNextPage,
    hasPreviousPage,
    startCursor,
    endCursor,
    className,
}: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleNextPage = () => {
        if (!hasNextPage || !endCursor) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("after", endCursor);
        // Remove before cursor when going forward
        params.delete("before");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handlePreviousPage = () => {
        if (!hasPreviousPage || !startCursor) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("before", startCursor);
        // Remove after cursor when going backward
        params.delete("after");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    if (!hasNextPage && !hasPreviousPage) {
        return null;
    }

    return (
        <div className={cn("flex items-center justify-center gap-4 mt-8", className)}>
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
