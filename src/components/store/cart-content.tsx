"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import type { MappedCart } from "@/lib/utils/mappers";
import { IconTrash } from "@tabler/icons-react";
import { formatPrice } from "@/lib/utils";
import { CartEmpty } from "@/components/store/cart-empty";
import { QuantitySelector } from "@/components/store/quantity-selector";

type CartContentProps = {
    cart: MappedCart | null;
    isLoading?: boolean;
    showCheckout?: boolean;
};

export function CartContent({
    cart,
    isLoading = false,
    showCheckout = true,
}: CartContentProps) {
    const { updateLine, removeLine, isUpdating, isRemoving } = useCart();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="text-muted-foreground">Loading cart...</div>
            </div>
        );
    }

    if (!cart || cart.lines.length === 0) {
        return (
            <CartEmpty />
        );
    }

    const handleQuantityChange = (lineId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            return;
        }
        updateLine(
            { lineId, quantity: newQuantity },
            {
                onSuccess: () => {
                    toast.success("Cart updated");
                },
                onError: () => {
                    toast.error("Failed to update cart");
                },
            },
        );
    };

    const handleRemove = (lineId: string) => {
        const line = cart.lines.find((l: MappedCart["lines"][number]) => l.id === lineId);
        const productTitle = line?.merchandise.productTitle ||
            (line?.merchandise.title !== "Default Title" ? line?.merchandise.title : null) ||
            "Item";
        removeLine(lineId, {
            onSuccess: () => {
                toast.success(`${productTitle} removed from cart`);
            },
            onError: () => {
                toast.error("Failed to remove item");
            },
        });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-4 p-4">
                    {cart.lines.map((line: MappedCart["lines"][number]) => (
                        <div key={line.id} className="flex gap-4">
                            {/* Product Image */}
                            <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-md border">
                                {line.merchandise.image ? (
                                    <Image
                                        src={line.merchandise.image.url}
                                        alt={
                                            line.merchandise.image.altText ||
                                            line.merchandise.productTitle ||
                                            "Product image"
                                        }
                                        fill
                                        sizes="96px"
                                        className="object-contain p-2"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-sm font-medium">
                                            {line.merchandise.productTitle ||
                                                (line.merchandise.title !== "Default Title" ? line.merchandise.title : "Product")}
                                        </h3>
                                        {(() => {
                                            const hasSelectedOptions = line.merchandise.selectedOptions.length > 0;
                                            const variantTitle = line.merchandise.title !== "Default Title" &&
                                                line.merchandise.productTitle &&
                                                line.merchandise.title !== line.merchandise.productTitle
                                                ? line.merchandise.title
                                                : null;

                                            if (hasSelectedOptions || variantTitle) {
                                                return (
                                                    <p className="text-muted-foreground text-xs mt-1">
                                                        {hasSelectedOptions && (
                                                            line.merchandise.selectedOptions
                                                                .map((opt: { name: string; value: string }) => `${opt.name}: ${opt.value}`)
                                                                .join(", ")
                                                        )}
                                                        {hasSelectedOptions && variantTitle && " • "}
                                                        {variantTitle}
                                                    </p>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        onClick={() => handleRemove(line.id)}
                                        disabled={isRemoving}
                                        className="shrink-0"
                                    >
                                        <IconTrash size={16} />
                                        <span className="sr-only">Remove item</span>
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <QuantitySelector
                                        value={line.quantity}
                                        onChange={(newQuantity) => handleQuantityChange(line.id, newQuantity)}
                                        min={1}
                                        disabled={isUpdating || isRemoving}
                                    />
                                    <div className="text-right">
                                        {line.merchandise.price && (
                                            <>
                                                <p className="text-sm font-medium">
                                                    {formatPrice(
                                                        (
                                                            parseFloat(line.merchandise.price.amount) *
                                                            line.quantity
                                                        ).toString(),
                                                        line.merchandise.price.currencyCode,
                                                    )}
                                                </p>
                                                <p className="text-muted-foreground text-xs">
                                                    {formatPrice(
                                                        line.merchandise.price.amount,
                                                        line.merchandise.price.currencyCode,
                                                    )}{" "}
                                                    each
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Summary */}
            {showCheckout && (
                <>
                    <Separator />
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium">
                                {formatPrice(
                                    cart.cost.subtotalAmount.amount,
                                    cart.cost.subtotalAmount.currencyCode,
                                )}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-base font-semibold">
                            <span>Total</span>
                            <span>
                                {formatPrice(
                                    cart.cost.totalAmount.amount,
                                    cart.cost.totalAmount.currencyCode,
                                )}
                            </span>
                        </div>
                        <Button
                            className="w-full"
                            onClick={() => {
                                if (cart.checkoutUrl) {
                                    window.location.href = cart.checkoutUrl;
                                }
                            }}
                            disabled={!cart.checkoutUrl}
                        >
                            Checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}