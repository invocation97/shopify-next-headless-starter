"use client";

import { useProducts } from "@/hooks/use-products";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { ProductGrid, ProductGridSkeleton } from "./product-grid";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { IconShoppingCart } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { ProductPagination } from "./product-pagination";
import { ProductFilters } from "./product-filters";

type FilterableProductsProps = {
    searchParams: URLSearchParams;
    collectionHandle?: string;
}

export function FilterableProducts({
    searchParams,
    collectionHandle
}: FilterableProductsProps) {

    const { data, isLoading, error } = useProducts({
        collectionHandle,
        initialSearchParams: searchParams.toString(),
    });
    const router = useRouter();
    const pathname = usePathname();

    const clearAllFilters = useCallback(() => {
        router.replace(pathname);
    }, [router, pathname]);

    if (isLoading) {
        return (
            <div className="container mx-auto py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-4">
                            <Skeleton className="w-full h-10" />
                        </div>
                    </aside>
                    <main className="flex-1 min-w-0">
                        <ProductGridSkeleton />
                    </main>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-12">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-lg font-medium text-destructive mb-2">
                        Error loading products
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {error instanceof Error ? error.message : "Unknown error occurred"}
                    </p>
                </div>
            </div>
        );
    }

    if (!data || !data.products || data.products.length === 0) {
        return (
            <div className="container mx-auto py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-4">
                            <ProductFilters collectionHandle={collectionHandle} />
                        </div>
                    </aside>
                    <main className="flex-1 min-w-0">
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant={"icon"}>
                                    <IconShoppingCart className="size-10" />
                                </EmptyMedia>
                                <EmptyTitle>No products found</EmptyTitle>
                                <EmptyDescription>
                                    Try adjusting your filters to see more results.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <Button onClick={clearAllFilters}>Clear Filters</Button>
                            </EmptyContent>
                        </Empty>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <aside className="w-full lg:w-64 shrink-0">
                    <div className="sticky top-4">
                        <ProductFilters collectionHandle={collectionHandle} />
                    </div>
                </aside>

                {/* Products Grid */}
                <main className="flex-1 min-w-0">
                    <ProductGrid products={data.products} />
                    {data.pageInfo && (
                        <ProductPagination
                            hasNextPage={data.pageInfo.hasNextPage}
                            hasPreviousPage={data.pageInfo.hasPreviousPage}
                            startCursor={data.pageInfo.startCursor ?? null}
                            endCursor={data.pageInfo.endCursor ?? null}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}