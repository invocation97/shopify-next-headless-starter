"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "@/components/store/product-card"
import { Product } from "@/lib/shopify/types/storefront.types"
import { cn } from "@/lib/utils";

type ProductGridProps = {
    products: Product[]
    className?: string;

}

function ProductSkeleton() {
    return (
        <Card className="flex h-full flex-col overflow-hidden">
            <CardContent className="p-0">
                <Skeleton className="aspect-square w-full rounded-t-lg" />
            </CardContent>
            <div className="flex flex-1 flex-col p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-5 w-1/2" />
                <Skeleton className="mt-4 h-6 w-1/3" />
                <CardFooter className="mt-auto p-0 pt-4">
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </div>
        </Card>
    )
}

export function ProductGridSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
            {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    )
}

export function ProductGrid({ products, className }: ProductGridProps) {




    if (products.length === 0) {
        return (
            <div className={cn("flex min-h-[400px] items-center justify-center rounded-lg border border-dashed", className)}>
                <div className="text-center">
                    <p className="text-lg font-semibold text-muted-foreground">No products found</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Try adjusting your search or filter to find what you&apos;re looking for.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product, index) => (
                <li key={product.id} className="h-full">
                    <ProductCard
                        product={product}
                        fetchPriority={index < 6 ? "high" : "low"}
                    />
                </li>
            ))}
        </ul>
    )
}
