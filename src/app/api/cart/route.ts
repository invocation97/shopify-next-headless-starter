import { createCart } from "@/lib/shopify/server/cart";
import { getCart } from "@/lib/shopify/server/cart";
import { deleteCartId, getCartId, setCartId } from "@/lib/utils/cart-cookies";
import { mapCart } from "@/lib/utils/mappers";
import { createCartSchema } from "@/lib/schemas/cart";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const cartId = getCartId(cookieStore);

        if (!cartId) {
            return NextResponse.json({
                cart: null
            })
        }

        const cart = await getCart({ cartId });

        if (!cart) {
            const response = NextResponse.json({ cart: null });
            deleteCartId(cookieStore);
            return response
        }

        const mappedCart = mapCart(cart);
        return NextResponse.json({ cart: mappedCart })
    } catch (error) {
        console.error("[GET /api/cart]", error);

        return NextResponse.json({
            cart: null
        }, {
            status: 500
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate request body
        const validationResult = createCartSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Invalid request",
                    message: "Invalid request body",
                    details: validationResult.error,
                },
                { status: 400 }
            );
        }

        const { lines, attributes } = validationResult.data;

        // Create cart with validated data
        const cart = await createCart({
            lines: lines || undefined,
            attributes: attributes || undefined,
        });

        if (!cart) {
            return NextResponse.json(
                {
                    error: "Failed to create cart",
                    message: "Cart creation returned null",
                },
                { status: 500 }
            );
        }

        // Set cart ID cookie
        const cookieStore = await cookies();
        const response = NextResponse.json({ cart: mapCart(cart) });
        setCartId(cookieStore, cart.id);

        return response;
    } catch (error) {
        console.error("[POST /api/cart]", error);
        return NextResponse.json(
            {
                error: "Failed to create cart",
                message: error instanceof Error ? error.message : "Unknown error occurred",
            },
            {
                status: 500
            }
        )
    }
}