import { StoreConfigSchema, type StoreConfig } from "@/lib/config-schema";

export const storeConfig: StoreConfig = StoreConfigSchema.parse({
  apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION,
  allProductsCollectionHandle:
    process.env.ALL_PRODUCTS_COLLECTION_HANDLE,
  productsPerPage: process.env.PRODUCTS_PER_PAGE,
  collectionsPerPage: process.env.COLLECTIONS_PER_PAGE,
  enableFacets: process.env.ENABLE_FACETS,
  branding: {
    name: process.env.BRANDING_NAME,
    socialLinks: [
      {
        name: "Facebook",
        href: "https://www.facebook.com/yourstore",
      },
      {
        name: "Instagram",
        href: "https://www.instagram.com/yourstore",
      },
      {
        name: "Twitter",
        href: "https://twitter.com/yourstore",
      },
    ],
  },
  promotionBar: {
    enabled: process.env.PROMOTION_BAR_ENABLED,
    message: process.env.PROMOTION_BAR_MESSAGE,
    link: process.env.PROMOTION_BAR_LINK,
  },
  headerMenu: [
    {
      label: "Products",
      href: "/products",
      items: [
        {
          label: "All Products",
          href: "/products",
        },
        {
          label: "Collections",
          href: "/collections",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  footerMenu: [
    {
      header: {
        label: "Legal",
      },
      links: [
        {
          label: "Terms and Conditions",
          href: "#",
        },
        {
          label: "Privacy Policy",
          href: "#",
        },
        {
          label: "Warranty Terms",
          href: "#",
        },
        {
          label: "Right of Withdrawal",
          href: "#",
        },
      ],
    },
    {
      header: {
        label: "Company",
        href: "/about",
      },
      links: [
        {
          label: "About Us",
          href: "/about",
        },
        {
          label: "Contact",
          href: "/contact",
        },
        {
          label: "Careers",
          href: "/careers",
        },
      ],
    },
  ],
  cart: {
    cartCookieName: process.env.CART_COOKIE_NAME,
    cartCookieMaxAge: process.env.CART_COOKIE_MAX_AGE,
  },
  productPage: {
    enableFaqs: process.env.PRODUCT_PAGE_ENABLE_FAQS,
    enableVideos: process.env.PRODUCT_PAGE_ENABLE_VIDEOS,
    enableRecommendations: process.env.PRODUCT_PAGE_ENABLE_RECOMMENDATIONS,
    enableReviews: process.env.PRODUCT_PAGE_ENABLE_REVIEWS,
    enableAdditionalDetails: process.env.PRODUCT_PAGE_ENABLE_ADDITIONAL_DETAILS,
    sectionsOrder: process.env.PRODUCT_PAGE_SECTIONS_ORDER,
  },
});
