import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Product } from "@/lib/shopify/types/storefront.types"
import { formatPrice } from "@/lib/utils"
import { AddToCartButton } from "@/components/store/add-to-cart-button"


type ProductCardProps = {
    product: Product;
    fetchPriority?: "high" | "low" | "auto"
    className?: string
}

export function ProductCard({ product, fetchPriority = "auto", className }: ProductCardProps) {
    const { minVariantPrice } = product.priceRange
    const price = formatPrice(minVariantPrice.amount, minVariantPrice.currencyCode)

    return (
        <Card className={`flex h-full flex-col overflow-hidden ${className || ""}`}>
            <Link href={`/products/${product.handle}`} className="group">
                <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        {product.featuredImage ? (
                            <Image
                                src={product.featuredImage.url || "/placeholder.svg"}
                                alt={product.featuredImage.altText || product.title}
                                width={product.featuredImage.width || 500}
                                height={product.featuredImage.height || 500}
                                className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                priority={fetchPriority === "high"}
                                fetchPriority={fetchPriority}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">No image</div>
                        )}
                    </div>
                </CardContent>
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <Link href={`/products/${product.handle}`} className="group">
                    <h3 className="line-clamp-2 text-base font-medium transition-colors group-hover:text-primary">
                        {product.title}
                    </h3>
                </Link>

                <p className="mt-2 text-lg font-semibold">{price}</p>

                <CardFooter className="mt-auto p-0 pt-4">
                    <AddToCartButton
                        variantId={product.variants?.edges?.[0]?.node?.id}
                        disabled={!product.variants?.edges?.[0]?.node?.id}
                    />
                </CardFooter>
            </div>
        </Card>
    )
}
