import { storeConfig } from "@/config/store";
import { GET_COLLECTION_PRODUCTS_QUERY, GET_PRODUCT_QUERY, GET_PRODUCT_RECOMMENDATIONS_QUERY, PRODUCT_HANDLES_QUERY } from "@/lib/shopify/queries/product";
import { storeApi } from "@/lib/shopify/storeApi";
import { PageInfo, ProductCollectionSortKeys, ProductFilter } from "@/lib/shopify/types/storefront.types";
import { GetProductRecommendationsQueryQuery, ProductHandlesQuery, ProductQuery } from "@/lib/shopify/types/storefront.generated";

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


export async function getProductByHandle(handle: string) {
    const { data, errors } = await storeApi.request<ProductQuery>(GET_PRODUCT_QUERY, {
        variables: {
            handle,
        }
    })
    if (errors) {
        throw new Error(`[getProductByHandle]: ${errors}`);
    }
    if (!data?.product) {
        throw new Error(`[getProductByHandle]: Product not found`);
    }
    return data?.product;
}

export async function getProductHandles() {
    const { data, errors } = await storeApi.request<ProductHandlesQuery>(PRODUCT_HANDLES_QUERY, {
        variables: {
            handle: storeConfig.allProductsCollectionHandle,
            first: storeConfig.productToPrerender,
        }
    })
    if (errors) {
        throw new Error(`[getProductHandles]: ${errors}`);
    }
    if (!data?.collection) {
        throw new Error(`[getProductHandles]: Collection not found`);
    }
    return data?.collection?.products?.edges.map((edge) => edge.node.handle);
}

export async function getProductRecommendations(productId: string) {
    const { data, errors } = await storeApi.request<GetProductRecommendationsQueryQuery>(GET_PRODUCT_RECOMMENDATIONS_QUERY, {
        variables: {
            productId,
        }
    })
    if (errors) {
        throw new Error(`[getProductRecommendations]: ${errors}`);
    }
    return data?.productRecommendations || [];
}