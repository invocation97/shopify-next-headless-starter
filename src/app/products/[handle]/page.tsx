import { ProductDisplayPageTemplate } from "@/app/products/[handle]/product-display-page-template";
import { storeConfig } from "@/config/store";
import { getProductByHandle, getProductHandles } from "@/lib/shopify/server/products";
import { Product } from "@/lib/shopify/types/storefront.types";
import { ProductFragment } from "@/lib/shopify/types/storefront.generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";


export const revalidate = storeConfig.productPrerenderRefreshInterval;


export async function generateStaticParams() {
    const handles = await getProductHandles();

    return handles.map((handle) => ({ handle }));
}

function getBaseUrl(): string {
    return process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ handle: string }>;
}): Promise<Metadata> {
    const { handle } = await params;
    const product = await cache(getProductByHandle)(handle) as ProductFragment | null;

    if (!product) {
        return {};
    }

    const baseUrl = getBaseUrl();
    const productUrl = `${baseUrl}/products/${handle}`;

    // Use SEO fields if available, otherwise fallback to product fields
    const title = product.seo?.title || product.title;
    const description = product.seo?.description || product.description || "";

    // Get product images
    const images = product.images?.edges?.map((edge) => edge.node.url) || [];
    const featuredImage = product.featuredImage?.url || images[0] || "";
    const allImages = featuredImage ? [featuredImage, ...images.filter(img => img !== featuredImage)] : images;

    // Get price information
    const price = product.priceRange?.minVariantPrice?.amount || "0";
    const currencyCode = product.priceRange?.minVariantPrice?.currencyCode || "USD";
    const compareAtPrice = product.compareAtPriceRange?.maxVariantPrice?.amount;

    // Build structured data (JSON-LD)
    // const structuredData = {
    //     "@context": "https://schema.org/",
    //     "@type": "Product",
    //     name: product.title,
    //     description: product.description || "",
    //     image: allImages,
    //     brand: product.vendor ? {
    //         "@type": "Brand",
    //         name: product.vendor,
    //     } : undefined,
    //     offers: {
    //         "@type": "Offer",
    //         url: productUrl,
    //         priceCurrency: currencyCode,
    //         price: price,
    //         availability: product.availableForSale
    //             ? "https://schema.org/InStock"
    //             : "https://schema.org/OutOfStock",
    //         priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    //     },
    //     ...(compareAtPrice && {
    //         aggregateRating: {
    //             "@type": "AggregateRating",
    //             ratingValue: "4.5",
    //             reviewCount: "1",
    //         },
    //     }),
    // };

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: productUrl,
            siteName: storeConfig.branding.name,
            images: allImages.length > 0 ? allImages.map((url) => ({
                url,
                alt: product.title,
            })) : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: featuredImage ? [featuredImage] : [],
        },
        alternates: {
            canonical: productUrl,
        },
        other: {
            "product:price:amount": price,
            "product:price:currency": currencyCode,
            "product:availability": product.availableForSale ? "in stock" : "out of stock",
            ...(compareAtPrice && {
                "product:price:original": compareAtPrice,
            }),
        },
    };
}

export default async function PDP({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await cache(getProductByHandle)(handle) as ProductFragment | null;

    if (!product) {
        return notFound();
    }

    const baseUrl = getBaseUrl();
    const productUrl = `${baseUrl}/products/${handle}`;

    // Get product images
    const images = product.images?.edges?.map((edge) => edge.node.url) || [];
    const featuredImage = product.featuredImage?.url || images[0] || "";
    const allImages = featuredImage ? [featuredImage, ...images.filter(img => img !== featuredImage)] : images;

    // Get price information
    const price = product.priceRange?.minVariantPrice?.amount || "0";
    const currencyCode = product.priceRange?.minVariantPrice?.currencyCode || "USD";
    // const compareAtPrice = product.compareAtPriceRange?.maxVariantPrice?.amount;

    // Use a fixed "validUntil" date to keep this function pure.
    const validUntil = "2099-12-31";

    // Build structured data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: product.title,
        description: product.description || "",
        image: allImages,
        ...(product.vendor && {
            brand: {
                "@type": "Brand",
                name: product.vendor,
            },
        }),
        offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: currencyCode,
            price: price,
            availability: product.availableForSale
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            priceValidUntil: validUntil,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <ProductDisplayPageTemplate product={product as Product} />
        </>
    );
}
