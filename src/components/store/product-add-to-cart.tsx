"use client";

import { AddToCartButton } from "@/components/store/add-to-cart-button";

type ProductAddToCartProps = {
    variantId?: string;
    quantity: number;
    disabled?: boolean;
    className?: string;
    onAddToCart?: () => void;
};

export function ProductAddToCart({
    variantId,
    quantity,
    disabled = false,
    className,
    onAddToCart,
}: ProductAddToCartProps) {
    return (
        <AddToCartButton
            variantId={variantId}
            quantity={quantity}
            disabled={disabled}
            className={className}
            onAddToCart={onAddToCart}
        />
    );
}

