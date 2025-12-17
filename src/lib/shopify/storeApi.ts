import "server-only";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import {env} from "@/lib/env";
import { storeConfig } from "@/config/store";

const storeDomain = `https://${env.SHOPIFY_STORE_DOMAIN}`;
const apiVersion = storeConfig.apiVersion;
const privateAccessToken = env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

export const storeApi = createStorefrontApiClient({
  storeDomain,
  apiVersion,
  privateAccessToken,
});
