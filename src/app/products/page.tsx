import { ProductGrid } from "@/components/store/product-grid";
import { storeConfig } from "@/config/store";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { CollectionProductsQuery } from "@/lib/shopify/types/storefront.generated";

type ProductsPageProps = {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

type ProductsResponse = NonNullable<
    CollectionProductsQuery["collection"]
>["products"];

export default async function ProductsPage({
    searchParams
}: ProductsPageProps) {
    const searchParamsObj = await searchParams;
    const searchParamsString = new URLSearchParams(
        Object.entries(searchParamsObj).flatMap(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(v => [key, v] as [string, string]);
            }
            return value ? [[key, value] as [string, string]] : [];
        })
    ).toString();

    const collectionHandle = storeConfig.allProductsCollectionHandle;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<ProductsResponse, Error>({
        queryKey: ["products", collectionHandle, searchParamsString],
        queryFn: async () => {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

            const response = await fetch(`${baseUrl}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    collectionHandle,
                    first: storeConfig.productsPerPage,
                    searchParams: searchParamsString,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `Failed to fetch products: ${response.statusText}`
                );
            }

            return response.json();
        },
        staleTime: 60_000,
        gcTime: 300_000,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <ProductGrid initialSearchParams={searchParamsString} />
        </HydrationBoundary>
    );
}