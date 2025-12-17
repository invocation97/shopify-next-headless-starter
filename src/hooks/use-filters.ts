import { storeConfig } from "@/config/store";
import { DynamicFilterConfig } from "@/lib/shopify/filter-options";
import { useQuery } from "@tanstack/react-query";

type UseFiltersParams = {
    collectionHandle?: string;
    enabled?: boolean;
};

export function useFilters({
    collectionHandle = storeConfig.allProductsCollectionHandle,
    enabled = true,
}: UseFiltersParams = {}) {
    return useQuery<DynamicFilterConfig[], Error>({
        queryKey: ["filters", collectionHandle],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (collectionHandle !== storeConfig.allProductsCollectionHandle) {
                params.set("collectionHandle", collectionHandle);
            }

            const response = await fetch(`/api/filters?${params.toString()}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch filters: ${response.statusText}`);
            }
            return response.json();
        },
        enabled: enabled && storeConfig.enableFacets,
        staleTime: 3_600_000, // 1 hour
        gcTime: 86_400_000, // 24 hours
    });
}
