"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type CartSheetContextType = {
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
};

const CartSheetContext = createContext<CartSheetContextType | undefined>(undefined);

export function CartSheetProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen((prev) => !prev);

    return (
        <CartSheetContext.Provider value={{ isOpen, openCart, closeCart, toggleCart }}>
            {children}
        </CartSheetContext.Provider>
    );
}

export function useCartSheet() {
    const context = useContext(CartSheetContext);
    if (context === undefined) {
        throw new Error("useCartSheet must be used within a CartSheetProvider");
    }
    return context;
}
