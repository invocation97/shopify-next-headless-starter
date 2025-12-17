import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { env } from "@/lib/env";

const storeDomain = `https://${env.SHOPIFY_STORE_DOMAIN}`;
const apiVersion = env.SHOPIFY_STOREFRONT_API_VERSION;

export const storefrontApi = createStorefrontApiClient({
  storeDomain,
  apiVersion,
  publicAccessToken: env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN,
});
