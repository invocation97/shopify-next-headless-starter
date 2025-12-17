const env = {
    /* General */
    NODE_ENV: process.env.NODE_ENV!,

    /* Shopify */
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY!,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET!,
    SHOPIFY_API_URL: process.env.SHOPIFY_API_URL!,
    SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION!,
    SHOPIFY_STOREFRONT_PUBLIC_TOKEN: process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN!,
}


export default env;