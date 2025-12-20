import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/shopify/types/storefront.types";
import { ProductImageGallery } from "@/components/store/product-image-gallery";
import { ProductPurchaseSection } from "@/components/store/product-purchase-section";
import { ProductFaqs } from "@/components/store/product-faqs";
import { ProductVideos } from "@/components/store/product-videos";
import { ProductRecommendations } from "@/components/store/product-recommendations";
import { ProductAdditionalDetails } from "@/components/store/product-additional-details";
import { storeConfig } from "@/config/store";

type ProductDisplayPageTemplateProps = {
    product: Product;
};

function shouldShowSection(section: string): boolean {
    const config = storeConfig.productPage;

    switch (section) {
        case "description":
            return true; // Always show description
        case "faqs":
            return config.enableFaqs;
        case "videos":
            return config.enableVideos;
        case "recommendations":
            return config.enableRecommendations;
        case "reviews":
            return config.enableReviews;
        case "additionalDetails":
            return config.enableAdditionalDetails;
        default:
            return false;
    }
}

export function ProductDisplayPageTemplate({ product }: ProductDisplayPageTemplateProps) {
    const images = product?.images?.edges?.map((edge) => edge.node) || [];
    const allImages = product?.featuredImage
        ? [product.featuredImage, ...images.filter((img) => img.url !== product.featuredImage?.url)]
        : images;

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex min-h-[400px] items-center justify-center">
                    <p className="text-lg text-muted-foreground">Product not found</p>
                </div>
            </div>
        );
    }

    const sectionsOrder = storeConfig.productPage.sectionsOrder;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Image Gallery */}
                <ProductImageGallery images={allImages} productTitle={product.title} />

                {/* Product Info */}
                <Card>
                    <CardContent className="p-6 lg:p-8">
                        <div className="space-y-6">
                            {/* Title and Vendor */}
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{product.title}</h1>
                                {product.vendor && (
                                    <p className="mt-2 text-sm text-muted-foreground">by {product.vendor}</p>
                                )}
                            </div>

                            {/* Purchase Section (Price, Availability, Options, Quantity, Add to Cart) */}
                            <ProductPurchaseSection product={product} />

                            <Separator />

                            {/* Product Description */}
                            {(product.descriptionHtml || product.description) && (
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold">Description</h2>
                                    {product.descriptionHtml ? (
                                        <div
                                            className="prose prose-sm max-w-none dark:prose-invert"
                                            dangerouslySetInnerHTML={{
                                                __html: product.descriptionHtml,
                                            }}
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground">{product.description}</p>
                                    )}
                                </div>
                            )}

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold">Tags</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Sections Below */}
            <div className="mt-12 space-y-12">
                {sectionsOrder.map((section) => {
                    if (!shouldShowSection(section)) {
                        return null;
                    }

                    switch (section) {
                        case "description":
                            // Already shown above
                            return null;
                        case "faqs":
                            return <ProductFaqs key="faqs" product={product} />;
                        case "videos":
                            return <ProductVideos key="videos" product={product} />;
                        case "recommendations":
                            return <ProductRecommendations key="recommendations" product={product} />;
                        case "reviews":
                            // Reviews component not implemented yet
                            return null;
                        case "additionalDetails":
                            return <ProductAdditionalDetails key="additionalDetails" product={product} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
}
