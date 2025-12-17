import "server-only";
import { cache } from "react";
import { storeApi } from "@/lib/shopify/storeApi";
import {
    COLLECTION_FACETS_QUERY
} from "../queries/facets";
import { Filter } from "../types/storefront.types";


type Response = {
    collection: {
        products: {
            filters: Filter[]
        }
    } | null
}

export const getCollectionFacets = cache(async (handle: string) => {
    const { data, errors } = await storeApi.request<Response>(COLLECTION_FACETS_QUERY, {
        variables: {
            handle
        }
    })
    if (errors) {
        throw new Error(`[getCollectionFacets]: ${errors}`);
    }

    if (!data?.collection) {
        throw new Error(`[getCollectionFacets]: Collection not found`);
    }
    return data?.collection?.products.filters;
})