import { getProductRecommendations } from "@/lib/shopify/server/products";
import { ProductCard } from "@/components/store/product-card";
import type { Product } from "@/lib/shopify/types/storefront.types";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/store/product-grid";

type ProductRecommendationsProps = {
    product: Product;
};

export async function ProductRecommendations({ product }: ProductRecommendationsProps) {
    if (!product.id) {
        return null;
    }

    const recommendations = await getProductRecommendations(product.id);

    // Filter out the current product
    const filteredRecommendations = recommendations.filter(
        (rec) => rec.id !== product.id
    );

    if (filteredRecommendations.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">You May Also Like</h2>
            <Suspense fallback={<ProductGridSkeleton />}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredRecommendations.slice(0, 4).map((rec) => (
                        <ProductCard key={rec.id} product={rec as Product} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
}

