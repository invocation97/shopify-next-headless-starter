import { z } from "zod";

export const StoreConfigSchema = z.object({
  /** Shopify Storefront API version */
  apiVersion: z.string().default("2025-10"),

  /** Handle of the collection used for /products */
  allProductsCollectionHandle: z.string().default("all"),

  /** Products per page */
  productsPerPage: z.coerce.number().int().min(1).max(48).default(24),

  /** Enable product facets (filters) */
  enableFacets: z.coerce.boolean().default(true),
});

export type StoreConfig = z.infer<typeof StoreConfigSchema>;
