import { CollectionProductsQuery, GetCartQuery, ListCollectionsQuery } from "@/lib/shopify/types/storefront.generated";
import { Cart, Collection, PageInfo, Product } from "@/lib/shopify/types/storefront.types";

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

type MappedCartLine = {
    id: string;
    quantity: number;
    attributes: Array<{ key: string; value: string }>;
    merchandise: {
        id: string;
        title: string;
        productTitle: string | null;
        sku: string | null;
        image: {
            url: string;
            altText: string | null;
        } | null;
        selectedOptions: Array<{ name: string; value: string }>;
        price: {
            amount: string;
            currencyCode: string;
        } | null;
    };
};

export type MappedCart = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: {
        subtotalAmount: {
            amount: string;
            currencyCode: string;
        };
        totalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
    lines: Array<MappedCartLine>;
};

/**
 * Maps Cart GraphQL response to a simpler, more usable structure
 * Handles both query responses (GetCartQuery) and mutation responses
 */
export function mapCart(
    cartData: NonNullable<GetCartQuery["cart"]> | Cart | null
): MappedCart | null {
    if (!cartData) {
        return null;
    }

    const checkoutUrl = "checkoutUrl" in cartData ? cartData.checkoutUrl : "";

    const cart: MappedCart = {
        id: cartData.id,
        checkoutUrl,
        totalQuantity: cartData.totalQuantity,
        cost: {
            subtotalAmount: cartData.cost.subtotalAmount,
            totalAmount: cartData.cost.totalAmount,
        },
        lines: cartData.lines.edges.map((edge): MappedCartLine => {
            const node = edge.node;
            const productTitle = node.merchandise.title

            return {
                id: node.id,
                quantity: node.quantity,
                attributes: node.attributes.map((attr) => ({
                    key: attr.key,
                    value: attr.value ?? "",
                })),
                merchandise: {
                    id: node.merchandise.id,
                    title: node.merchandise.title,
                    productTitle,
                    sku: node.merchandise.sku ?? null,
                    image: node.merchandise.image
                        ? {
                            url: node.merchandise.image.url,
                            altText: node.merchandise.image.altText ?? null,
                        }
                        : null,
                    selectedOptions: node.merchandise.selectedOptions.map((opt) => ({
                        name: opt.name,
                        value: opt.value,
                    })),
                    price: node.merchandise.price
                        ? {
                            amount: node.merchandise.price.amount,
                            currencyCode: node.merchandise.price.currencyCode,
                        }
                        : null,
                },
            };
        }),
    };

    return cart;
}