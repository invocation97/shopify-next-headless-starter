"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { CartContent } from "./cart-content";
import { useCart } from "@/hooks/use-cart";

type CartSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
    const { cart, isLoading } = useCart();

    const handleOpenChange = (newOpen: boolean) => {
        onOpenChange(newOpen);
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="right" className="flex flex-col w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription className="sr-only">
                        Manage your cart and checkout
                    </SheetDescription>
                </SheetHeader>
                <CartContent cart={cart || null} isLoading={isLoading} />
            </SheetContent>
        </Sheet>
    );
}
