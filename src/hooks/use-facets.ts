import { storeConfig } from "@/config/store";
import { Filter } from "@/lib/shopify/types/storefront.types";
import { useQuery } from "@tanstack/react-query";

type UseFacetsParams = {
    collectionHandle?: string;
    enabled?: boolean;
};

type FacetsResponse = {
    filters: Filter[];
};

export function useFacets({
    collectionHandle = storeConfig.allProductsCollectionHandle,
    enabled = true,
}: UseFacetsParams = {}) {
    return useQuery<FacetsResponse, Error>({
        queryKey: ["facets", collectionHandle],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (collectionHandle !== storeConfig.allProductsCollectionHandle) {
                params.set("collectionHandle", collectionHandle);
            }

            const response = await fetch(`/api/facets?${params.toString()}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch facets: ${response.statusText}`);
            }
            return response.json();
        },
        enabled: enabled && storeConfig.enableFacets,
        staleTime: 1000 * 60 * 60, // 1 hour
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
