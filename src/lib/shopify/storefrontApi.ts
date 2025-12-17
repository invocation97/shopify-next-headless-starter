import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import env from "@/lib/env";

const storeDomain = `https://${env.SHOPIFY_API_URL}.myshopify.com`;
const apiVersion = env.SHOPIFY_API_VERSION ?? "2025-10";

export const storefrontApi = createStorefrontApiClient({
  storeDomain,
  apiVersion,
  publicAccessToken: env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});
