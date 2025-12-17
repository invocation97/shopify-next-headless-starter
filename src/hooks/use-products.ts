"use client";

import { storeConfig } from "@/config/store";
import { CollectionProductsQuery } from "@/lib/shopify/types/storefront.generated";
import { useQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import {
    parseAsAfter,
    parseAsPriceMax,
    parseAsPriceMin,
    parseAsReverse,
    parseAsSortKey,
} from "@/lib/filters/parsers";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type UseProductsParams = {
    collectionHandle?: string;
    enabled?: boolean;
    initialSearchParams?: string;
};

type ProductsResponse = NonNullable<
    CollectionProductsQuery["collection"]
>["products"];

export function useProducts({
    collectionHandle = storeConfig.allProductsCollectionHandle,
    enabled = true,
    initialSearchParams,
}: UseProductsParams = {}) {
    const [filterState, setFilterState] = useQueryStates(
        {
            priceMin: parseAsPriceMin,
            priceMax: parseAsPriceMax,
            sortKey: parseAsSortKey,
            reverse: parseAsReverse,
            after: parseAsAfter,
        },
        {
            history: "push",
            shallow: false,
        }
    );

    const searchParams = useSearchParams();

    const searchParamsString = useMemo(() => {
        return initialSearchParams ?? searchParams.toString();
    }, [searchParams, initialSearchParams]);

    const query = useQuery<ProductsResponse, Error>({
        queryKey: ["products", collectionHandle, searchParamsString],
        queryFn: async () => {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    collectionHandle,
                    first: storeConfig.productsPerPage,
                    searchParams: searchParamsString,
                }),
                next: {
                    tags: ["products"],
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `Failed to fetch products: ${response.statusText}`
                );
            }

            return response.json();
        },
        enabled,
        staleTime: 60_000,
        gcTime: 300_000,
    });

    return {
        ...query,
        filterState,
        setFilterState,
    };
}