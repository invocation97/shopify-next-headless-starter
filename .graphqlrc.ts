import { ApiType, pluckConfig, shopifyApiProject } from "@shopify/api-codegen-preset";


const config = {
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2025-10",
      documents: ["./src/**/*.{ts,tsx}"],
      outputDir: "./src/lib/shopify/types",
      enumsAsConst: true,
      declarations: true,
    }),
  },
  extensions: {
    codegen: {
      pluckConfig,
      ignoreNoDocuments: true,
    },
  },
};

export default config;
