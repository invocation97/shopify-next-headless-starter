import { z } from "zod";

const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),

    SHOPIFY_STORE_DOMAIN: z.string().min(1),
    SHOPIFY_STOREFRONT_API_VERSION: z.string().default("2025-10"),

    SHOPIFY_STOREFRONT_PUBLIC_TOKEN: z.string().min(1),
    SHOPIFY_STOREFRONT_PRIVATE_TOKEN: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
