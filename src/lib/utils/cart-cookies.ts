import { storeConfig } from "@/config/store";
import { ReadonlyRequestCookies, ResponseCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const CART_COOKIE_NAME = storeConfig.cart.cartCookieName;


export function getCartId(cookies: ReadonlyRequestCookies | ResponseCookies): string | undefined {
    return cookies.get(CART_COOKIE_NAME)?.value;
}


export function setCartId(cookies: ResponseCookies, cartId: string): void {
    cookies.set(CART_COOKIE_NAME, cartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: storeConfig.cart.cartCookieMaxAge,
    });
}

export function deleteCartId(cookies: ResponseCookies): void {
    cookies.delete(CART_COOKIE_NAME);
}