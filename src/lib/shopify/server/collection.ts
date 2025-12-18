import "server-only";
import { COLLECTIONS_QUERY } from "../queries/collection";
import { storeApi } from "../storeApi";
import { ListCollectionsQuery } from "../types/storefront.generated";
import { CollectionSortKeys } from "../types/storefront.types";

type PaginationParams = {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
    sortKey?: CollectionSortKeys;
    reverse?: boolean;
    query?: string;
}

export async function listCollections(variables: PaginationParams) {
    const { data, errors } = await storeApi.request<ListCollectionsQuery>(COLLECTIONS_QUERY, {
        variables
    });

    if (errors) {
        throw new Error(`[listCollections]: ${errors}`);
    }

    if (!data?.collections) {
        throw new Error(`[listCollections]: Failed to fetch collections`);
    }

    return data.collections;
}