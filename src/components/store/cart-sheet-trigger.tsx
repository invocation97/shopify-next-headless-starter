"use client";

import { CartSheet } from "@/components/store/cart-sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCartSheet } from "@/components/store/cart-sheet-context";
import { IconShoppingCart } from "@tabler/icons-react";

export function CartSheetTrigger() {
    const { cartCount } = useCart();
    const { isOpen, openCart, closeCart } = useCartSheet();

    return (<>
        <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={openCart}
        >
            <IconShoppingCart size={16} />
            {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {cartCount > 99 ? "99+" : cartCount}
                </span>
            )}
            <span className="sr-only">Shopping cart</span>
        </Button>
        <CartSheet open={isOpen} onOpenChange={(open) => open ? openCart() : closeCart()} />
    </>
    )
}