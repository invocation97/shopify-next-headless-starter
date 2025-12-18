import { CollectionsList } from "@/components/store/collections-list";
import { storeConfig } from "@/config/store";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Collection } from "@/lib/shopify/types/storefront.types";

type CollectionsPageProps = {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
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

export default async function CollectionsPage({
    searchParams,
}: CollectionsPageProps) {
    const searchParamsObj = await searchParams;
    const searchParamsString = new URLSearchParams(
        Object.entries(searchParamsObj).flatMap(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map((v) => [key, v] as [string, string]);
            }
            return value ? [[key, value] as [string, string]] : [];
        })
    ).toString();

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<CollectionsResponse, Error>({
        queryKey: ["collections", searchParamsString],
        queryFn: async () => {
            const baseUrl =
                process.env.NEXT_PUBLIC_BASE_URL ||
                (process.env.VERCEL_URL
                    ? `https://${process.env.VERCEL_URL}`
                    : "http://localhost:3000");

            const response = await fetch(`${baseUrl}/api/collections`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first: storeConfig.collectionsPerPage,
                    after: searchParamsObj.after as string | undefined,
                    before: searchParamsObj.before as string | undefined,
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

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <CollectionsList initialSearchParams={searchParamsString} />
        </HydrationBoundary>
    );
}
