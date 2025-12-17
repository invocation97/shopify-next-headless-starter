import { Button } from "@/components/ui/button";
import { IconShoppingCart } from "@tabler/icons-react";

export function AddToCartButton() {
    return (
        <Button>
            <IconShoppingCart className="size-4 shrink-0" />
            Add to Cart
        </Button>
    )
}