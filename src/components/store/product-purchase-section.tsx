"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { ProductOptionsSelector } from "@/components/store/product-options-selector";
import { ProductQuantitySelector } from "@/components/store/product-quantity-selector";
import { ProductAddToCart } from "@/components/store/product-add-to-cart";
import type { Product } from "@/lib/shopify/types/storefront.types";

type ProductPurchaseSectionProps = {
    product: Product;
};

export function ProductPurchaseSection({ product }: ProductPurchaseSectionProps) {
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);

    const selectedVariant = useMemo(() => {
        return product?.variants?.edges?.find((edge) => {
            return edge.node.selectedOptions.every((option) => {
                return selectedOptions[option.name] === option.value;
            });
        })?.node;
    }, [product, selectedOptions]);

    const currentVariant = selectedVariant || product?.variants?.edges?.[0]?.node;

    const price = currentVariant
        ? formatPrice(currentVariant.price.amount, currentVariant.price.currencyCode)
        : formatPrice(
            product?.priceRange?.minVariantPrice?.amount || "0",
            product?.priceRange?.minVariantPrice?.currencyCode || "USD",
        );

    const compareAtPrice = currentVariant?.compareAtPrice || product?.compareAtPriceRange?.maxVariantPrice;

    const handleOptionChange = (optionName: string, value: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionName]: value,
        }));
    };

    const isAvailable = product.availableForSale && currentVariant?.availableForSale !== false;

    return (
        <div className="space-y-6">
            {/* Price */}
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{price}</span>
                {compareAtPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                    </span>
                )}
            </div>

            {/* Availability */}
            <div>
                <Badge variant={isAvailable ? "default" : "secondary"}>
                    {isAvailable ? "In Stock" : "Out of Stock"}
                </Badge>
            </div>

            <Separator />

            {/* Options Selector */}
            {product.options && product.options.length > 0 && (
                <ProductOptionsSelector
                    options={product.options}
                    selectedOptions={selectedOptions}
                    onOptionChange={handleOptionChange}
                />
            )}

            {/* Quantity Selector */}
            <ProductQuantitySelector
                value={quantity}
                onChange={setQuantity}
                disabled={!isAvailable}
            />

            {/* Add to Cart Button */}
            <ProductAddToCart
                variantId={currentVariant?.id}
                quantity={quantity}
                disabled={!isAvailable}
                className="w-full lg:w-auto"
            />
        </div>
    );
}

