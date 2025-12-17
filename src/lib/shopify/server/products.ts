import { GET_COLLECTION_PRODUCTS_QUERY } from "../queries/product";
import { storeApi } from "../storeApi";
import { PageInfo, ProductCollectionSortKeys, ProductFilter } from "../types/storefront.types";

type Response = {
    collection: {
        products: {
            pageInfo: PageInfo
        }
    } | null
}

type CollectionProductsArgs = {
    handle: string;
    first?: number;
    after?: string;
    filters?: ProductFilter[];
    sortKey?: ProductCollectionSortKeys;
    reverse?: boolean;
}

export async function getCollectionProducts(variables: CollectionProductsArgs) {
    const { data, errors } = await storeApi.request<Response>(GET_COLLECTION_PRODUCTS_QUERY, {
        variables
    })
    if (errors) {
        throw new Error(`[getCollectionProducts]: ${errors}`);
    }
    if (!data?.collection) {
        throw new Error(`[getCollectionProducts]: Collection not found`);
    }
    return data?.collection?.products;
}