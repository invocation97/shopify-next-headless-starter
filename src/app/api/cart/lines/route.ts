import { addLinesToCart, removeCartLines, updateCartLines } from "@/lib/shopify/server/cart";
import { getCartId } from "@/lib/utils/cart-cookies";
import { mapCart } from "@/lib/utils/mappers";
import { addLinesSchema, updateLinesSchema, removeLinesSchema } from "@/lib/schemas/cart";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { Cart } from "@/lib/shopify/types/storefront.types";

/**
 * POST /api/cart/lines
 * Add lines to an existing cart
 * Body: { lines: [{ merchandiseId, quantity?, attributes? }] }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validationResult = addLinesSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Invalid request",
                    message: "Invalid request body",
                    details: validationResult.error,
                },
                { status: 400 },
            );
        }

        const { lines } = validationResult.data;

        const cookieStore = await cookies();
        const cartId = getCartId(cookieStore);

        if (!cartId) {
            return NextResponse.json(
                {
                    error: "No cart found",
                    message: "Cart ID not found. Please create a cart first.",
                },
                { status: 404 },
            );
        }

        // Add lines to cart - the mutation variables should include cartId
        const cart = await addLinesToCart({
            cartId,
            lines: lines as Array<{ merchandiseId: string; quantity?: number; attributes?: Array<{ key: string; value: string }> }>,
        });

        if (!cart) {
            return NextResponse.json(
                {
                    error: "Failed to add lines to cart",
                    message: "Cart update returned null",
                },
                { status: 500 },
            );
        }

        return NextResponse.json({ cart: mapCart(cart as Cart) });
    } catch (error) {
        console.error("[API /cart/lines] Error adding lines to cart:", {
            error,
            errorMessage: error instanceof Error ? error.message : "Unknown error",
        });

        return NextResponse.json(
            {
                error: "Failed to add lines to cart",
                message:
                    error instanceof Error ? error.message : "Unknown error occurred",
            },
            { status: 500 },
        );
    }
}

/**
 * PATCH /api/cart/lines
 * Update cart line quantities
 * Body: { lines: [{ id, quantity, merchandiseId?, attributes? }] }
 */
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validationResult = updateLinesSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Invalid request",
                    message: "Invalid request body",
                    details: validationResult.error,
                },
                { status: 400 },
            );
        }

        const { lines } = validationResult.data;

        const cookieStore = await cookies();
        const cartId = getCartId(cookieStore);

        if (!cartId) {
            return NextResponse.json(
                {
                    error: "No cart found",
                    message: "Cart ID not found. Please add items to cart first.",
                },
                { status: 404 },
            );
        }

        // Update cart lines - the mutation variables should include cartId
        const cart = await updateCartLines({
            cartId,
            lines: lines as Array<{ id: string; quantity?: number; merchandiseId?: string; attributes?: Array<{ key: string; value: string }> }>,
        });

        if (!cart) {
            return NextResponse.json(
                {
                    error: "Failed to update cart lines",
                    message: "Cart update returned null",
                },
                { status: 500 },
            );
        }

        return NextResponse.json({ cart: mapCart(cart as Cart) });
    } catch (error) {
        console.error("[API /cart/lines] Error updating cart lines:", {
            error,
            errorMessage: error instanceof Error ? error.message : "Unknown error",
        });

        return NextResponse.json(
            {
                error: "Failed to update cart lines",
                message:
                    error instanceof Error ? error.message : "Unknown error occurred",
            },
            { status: 500 },
        );
    }
}

/**
 * DELETE /api/cart/lines
 * Remove cart lines
 * Body: { lineIds: [string] }
 */
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate request body
        const validationResult = removeLinesSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Invalid request",
                    message: "Invalid request body",
                    details: validationResult.error,
                },
                { status: 400 },
            );
        }

        const { lineIds } = validationResult.data;

        const cookieStore = await cookies();
        const cartId = getCartId(cookieStore);

        if (!cartId) {
            return NextResponse.json(
                {
                    error: "No cart found",
                    message: "Cart ID not found. Please add items to cart first.",
                },
                { status: 404 },
            );
        }

        // Remove cart lines - the mutation variables should include cartId
        const cart = await removeCartLines({
            cartId,
            lineIds: lineIds as string[],
        });

        if (!cart) {
            return NextResponse.json(
                {
                    error: "Failed to remove cart lines",
                    message: "Cart removal returned null",
                },
                { status: 500 },
            );
        }

        return NextResponse.json({ cart: mapCart(cart as Cart) });
    } catch (error) {
        console.error("[API /cart/lines] Error removing cart lines:", {
            error,
            errorMessage: error instanceof Error ? error.message : "Unknown error",
        });

        return NextResponse.json(
            {
                error: "Failed to remove cart lines",
                message:
                    error instanceof Error ? error.message : "Unknown error occurred",
            },
            { status: 500 },
        );
    }
}