import { CollectionProductsQuery } from "@/lib/shopify/types/storefront.generated";
import { Product } from "@/lib/shopify/types/storefront.types";

type CollectionProductsResponse = NonNullable<
    CollectionProductsQuery["collection"]
>["products"];

type MappedProductsResponse = {
    products: Product[];
    pageInfo: CollectionProductsResponse["pageInfo"];
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
