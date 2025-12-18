"use client";

import { useQuery } from "@tanstack/react-query";
import { CollectionGrid, CollectionGridSkeleton } from "./collection-grid";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { storeConfig } from "@/config/store";
import { Collection } from "@/lib/shopify/types/storefront.types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type CollectionsListProps = {
    initialSearchParams?: string;
};

type CollectionsResponse = {
    collections: Collection[];
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | null;
        endCursor: string | null;
    };
};

export function CollectionsList({ initialSearchParams }: CollectionsListProps) {
    const searchParams = useSearchParams();

    const searchParamsString = useMemo(() => {
        const currentUrlParams = searchParams.toString();
        return currentUrlParams !== initialSearchParams
            ? currentUrlParams
            : initialSearchParams ?? currentUrlParams;
    }, [searchParams, initialSearchParams]);

    const { data, isLoading, error } = useQuery<CollectionsResponse, Error>({
        queryKey: ["collections", searchParamsString],
        queryFn: async () => {
            const response = await fetch("/api/collections", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first: storeConfig.collectionsPerPage,
                    after: searchParams.get("after") || undefined,
                    before: searchParams.get("before") || undefined,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error ||
                    `Failed to fetch collections: ${response.statusText}`
                );
            }

            return response.json();
        },
        staleTime: 60_000,
        gcTime: 300_000,
    });

    if (isLoading) {
        return (
            <div className="container mx-auto py-12">
                <div className="mb-8">
                    <Skeleton className="h-9 w-48" />
                    <Skeleton className="mt-2 h-5 w-64" />
                </div>
                <CollectionGridSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-12">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-lg font-medium text-destructive mb-2">
                        Error loading collections
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {error instanceof Error
                            ? error.message
                            : "Unknown error occurred"}
                    </p>
                </div>
            </div>
        );
    }

    if (!data || !data.collections || data.collections.length === 0) {
        return (
            <div className="container mx-auto py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
                    <p className="mt-2 text-muted-foreground">
                        Browse all our product collections
                    </p>
                </div>
                <CollectionGrid collections={[]} />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Collections</h1>
                <p className="mt-2 text-muted-foreground">
                    Browse all our product collections
                </p>
            </div>

            <CollectionGrid collections={data.collections} />
            {data.pageInfo && (
                <Pagination
                    hasNextPage={data.pageInfo.hasNextPage}
                    hasPreviousPage={data.pageInfo.hasPreviousPage}
                    startCursor={data.pageInfo.startCursor}
                    endCursor={data.pageInfo.endCursor}
                />
            )}
        </div>
    );
}
