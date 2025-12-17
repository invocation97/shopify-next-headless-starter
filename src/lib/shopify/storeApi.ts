import "server-only";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import env from "@/lib/env";

const storeDomain = `https://${env.SHOPIFY_API_URL}.myshopify.com`;
const apiVersion = env.SHOPIFY_API_VERSION ?? "2025-10";

export const storeApi = createStorefrontApiClient({
  storeDomain,
  apiVersion,
  privateAccessToken: env.SHOPIFY_API_KEY,
});
