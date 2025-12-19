"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MappedCart } from "@/lib/utils/mappers";
import type { CartLineInput } from "@/lib/schemas/cart";

type CartResponse = {
    cart: MappedCart | null;
};

type AddToCartInput = {
    lines: CartLineInput[];
    attributes?: Array<{ key: string; value: string }>;
};

type UpdateCartLineInput = {
    lineId: string;
    quantity: number;
    attributes?: Array<{ key: string; value: string }>;
};

/**
 * Unified cart hook that provides cart data and all cart operations
 * @returns Object with cart data, loading states, and mutation methods
 */
export function useCart() {
    const queryClient = useQueryClient();

    // Query for fetching cart
    const cartQuery = useQuery<CartResponse, Error>({
        queryKey: ["cart"],
        queryFn: async () => {
            const response = await fetch("/api/cart");

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `Failed to fetch cart: ${response.statusText}`
                );
            }

            return response.json();
        },
        staleTime: 30_000,
        gcTime: 5 * 60_000,
    });

    // Mutation for adding items to cart
    const addToCartMutation = useMutation<CartResponse, Error, AddToCartInput>({
        mutationFn: async (input) => {
            // First check if cart exists
            const cartResponse = await fetch("/api/cart");
            const cartData = await cartResponse.json();

            let response: Response;

            if (cartData.cart) {
                // Cart exists, add lines to it
                response = await fetch("/api/cart/lines", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        lines: input.lines,
                    }),
                });
            } else {
                // No cart exists, create one
                response = await fetch("/api/cart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        lines: input.lines,
                        attributes: input.attributes,
                    }),
                });
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `Failed to add to cart: ${response.statusText}`
                );
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });

    // Mutation for updating cart line quantity
    const updateLineMutation = useMutation<CartResponse, Error, UpdateCartLineInput>({
        mutationFn: async (input) => {
            const response = await fetch("/api/cart/lines", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lines: [
                        {
                            id: input.lineId,
                            quantity: input.quantity,
                            attributes: input.attributes,
                        },
                    ],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `Failed to update cart line: ${response.statusText}`
                );
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });

    // Mutation for removing cart lines
    const removeLineMutation = useMutation<CartResponse, Error, string | string[]>({
        mutationFn: async (lineIds) => {
            const idsArray = Array.isArray(lineIds) ? lineIds : [lineIds];

            const response = await fetch("/api/cart/lines", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lineIds: idsArray,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || `Failed to remove cart line: ${response.statusText}`
                );
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });


    const cartCount = cartQuery.data?.cart?.totalQuantity ?? 0;

    return {
        // Cart data
        cart: cartQuery.data?.cart ?? null,
        cartCount,
        // Loading states
        isLoading: cartQuery.isLoading,
        isPending: addToCartMutation.isPending || updateLineMutation.isPending || removeLineMutation.isPending,
        isAdding: addToCartMutation.isPending,
        isUpdating: updateLineMutation.isPending,
        isRemoving: removeLineMutation.isPending,

        // Error states
        error: cartQuery.error,
        addError: addToCartMutation.error,
        updateError: updateLineMutation.error,
        removeError: removeLineMutation.error,

        // Mutation methods
        addToCart: addToCartMutation.mutate,
        addToCartAsync: addToCartMutation.mutateAsync,
        updateLine: updateLineMutation.mutate,
        updateLineAsync: updateLineMutation.mutateAsync,
        removeLine: removeLineMutation.mutate,
        removeLineAsync: removeLineMutation.mutateAsync,

        // Refetch method
        refetch: cartQuery.refetch,
    };
}
