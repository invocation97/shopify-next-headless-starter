import { StoreConfigSchema, type StoreConfig } from "@/lib/config-schema";

export const storeConfig: StoreConfig = StoreConfigSchema.parse({
  apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION,
  allProductsCollectionHandle:
    process.env.ALL_PRODUCTS_COLLECTION_HANDLE,
  productsPerPage: process.env.PRODUCTS_PER_PAGE,
  enableFacets: process.env.ENABLE_FACETS,
});
