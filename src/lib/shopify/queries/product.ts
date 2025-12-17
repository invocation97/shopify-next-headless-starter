import { PRODUCT_FRAGMENT } from "@/lib/shopify/fragments/product";

export const GET_PRODUCT_QUERY = `
#graphql
  query GetProductQuery($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCTS_QUERY = `
#graphql
query getProductsQuery($sortKey: ProductSortKeys, $reverse: Boolean, $query: String, $cursor: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, after: $cursor) {
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
        edges {
            node {
                ...product
            }
        }
    }
}
    ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_RECOMMENDATIONS_QUERY = `
#graphql
query getProductRecommendationsQuery($productId: ID!) {
    productRecommendations(productId: $productId) {
        ...product
    }
}
    ${PRODUCT_FRAGMENT}
`;