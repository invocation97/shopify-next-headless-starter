import { z } from "zod";

/** Header menu item schema - supports nested submenus for megamenus */
/* eslint-disable @typescript-eslint/no-explicit-any */
const HeaderMenuItemSchema: z.ZodType<any> = z.lazy(() =>
    z.object({
        label: z.string(),
        href: z.string(),
        items: z.array(HeaderMenuItemSchema).optional(),
    })
);

/** Footer menu link schema */
const FooterMenuLinkSchema = z.object({
    label: z.string(),
    href: z.string(),
});

/** Footer menu group schema */
const FooterMenuGroupSchema = z.object({
    header: z.object({
        label: z.string(),
        href: z.string().optional(),
    }).optional(),
    links: z.array(FooterMenuLinkSchema),
});

export const StoreConfigSchema = z.object({
    /** Shopify Storefront API version */
    apiVersion: z.string().default("2025-10"),

    /** Handle of the collection used for /products */
    allProductsCollectionHandle: z.string().default("all-products"),

    /** Products per page */
    productsPerPage: z.coerce.number().int().min(1).max(48).default(24),

    /** Collections per page */
    collectionsPerPage: z.coerce.number().int().min(1).max(48).default(12),

    /** Enable product facets (filters) */
    enableFacets: z.coerce.boolean().default(true),

    navigation: z.object({
        mainMenu: z.object({
            handle: z.string().default("main-menu"),
        }),
        footerMenu: z.object({
            handle: z.string().default("footer-menu"),
        }),
    }).default({
        mainMenu: { handle: "main-menu" },
        footerMenu: { handle: "footer-menu" },
    }),

    /** Header menu configuration */
    headerMenu: z.array(HeaderMenuItemSchema).default([]),

    /** Footer menu configuration */
    footerMenu: z.array(FooterMenuGroupSchema).default([]),

    branding: z.object({
        name: z.string().default("Shopify Headless Starter"),
        socialLinks: z.array(z.object({
            name: z.string(),
            href: z.string(),
        })).default([]),
    }),

    promotionBar: z.object({
        enabled: z.coerce.boolean().default(true),
        message: z.string().default("Check out our latest products"),
        link: z.string().default("/collections/all-products"),
    }),

    cart: z.object({
        cartCookieName: z.string().default("next-shopify-starter-template-cart-cookie"),
        cartCookieMaxAge: z.coerce.number().int().min(0).default(60 * 60 * 24 * 30), // 30 days
    })
});

export type StoreConfig = z.infer<typeof StoreConfigSchema>;
