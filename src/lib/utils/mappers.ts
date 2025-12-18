import { CollectionProductsQuery, ListCollectionsQuery } from "@/lib/shopify/types/storefront.generated";
import { Collection, PageInfo, Product } from "@/lib/shopify/types/storefront.types";

type CollectionProductsResponse = NonNullable<
    CollectionProductsQuery["collection"]
>["products"];

type CollectionsResponse = ListCollectionsQuery["collections"];

type MappedProductsResponse = {
    products: Product[];
    pageInfo: CollectionProductsResponse["pageInfo"];
};

type MappedCollectionsResponse = {
    collections: Collection[];
    pageInfo: PageInfo;
};

/**
 * Maps CollectionProductsQuery response to a simpler structure
 * Extracts products from edges and returns them as an array
 */
export function mapCollectionProductsToResponse(
    data: CollectionProductsResponse
): MappedProductsResponse {
    return {
        products: data.edges.map((edge) => edge.node as Product),
        pageInfo: data.pageInfo,
    };
}

/**
 * Maps ListCollectionsQuery collections response to a simpler structure
 * Extracts collections from edges and returns them as an array
 */
export function mapCollectionsToResponse(
    data: CollectionsResponse
): MappedCollectionsResponse {
    return {
        collections: data.edges.map((edge) => edge.node as Collection),
        pageInfo: data.pageInfo,
    };
}
