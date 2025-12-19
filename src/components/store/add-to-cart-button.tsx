import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCartSheet } from "@/components/store/cart-sheet-context";
import { IconLoader2, IconShoppingCart } from "@tabler/icons-react";
import { toast } from "sonner";
import { useMemo, useState } from "react";


type Props = {
    variantId?: string;
    quantity?: number;
    disabled?: boolean;
    className?: string;
    onAddToCart?: () => void;
}

export function AddToCartButton({
    variantId,
    quantity = 1,
    disabled = false,
    className,
    onAddToCart,
}: Props) {
    const { addToCartAsync, isAdding, isPending } = useCart();
    const { openCart } = useCartSheet();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAddToCart = async () => {
        if (!variantId) {
            toast.error("Please select a variant");
            return;
        }

        try {
            setIsSuccess(false);
            await addToCartAsync({
                lines: [{
                    merchandiseId: variantId,
                    quantity,
                }],
            });

            // Show success toast with action to open cart
            toast.success("Added to cart", {
                action: {
                    label: "View Cart",
                    onClick: () => openCart(),
                },
            });

            setIsSuccess(true);
            onAddToCart?.();

            // Reset success state after a delay
            setTimeout(() => setIsSuccess(false), 2000);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add item to cart");
            setIsSuccess(false);
        }
    }

    const isButtonDisabled = useMemo(() => {
        return disabled || isPending || !variantId || isAdding;
    }, [disabled, isPending, variantId, isAdding]);

    return (
        <Button disabled={isButtonDisabled} onClick={handleAddToCart} className={className}>
            {isPending || isAdding ? (
                <>
                    <IconLoader2 className="size-4 shrink-0 animate-spin" />
                    Adding...
                </>
            ) : isSuccess ? (
                <>
                    <IconShoppingCart className="size-4 shrink-0" />
                    Added!
                </>
            ) : (
                <>
                    <IconShoppingCart className="size-4 shrink-0" />
                    Add to Cart
                </>
            )}
        </Button>
    )
}