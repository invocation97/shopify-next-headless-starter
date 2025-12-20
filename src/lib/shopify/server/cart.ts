import "server-only";
import type { AddLinesToCartMutation, AddLinesToCartMutationVariables, CreateCartMutation, CreateCartMutationVariables, GetCartQuery, GetCartQueryVariables, RemoveCartLinesMutation, RemoveCartLinesMutationVariables, UpdateCartLinesMutation, UpdateCartLinesMutationVariables } from "@/lib/shopify/types/storefront.generated";
import { ADD_LINES_MUTATION, CREATE_CART_MUTATION, GET_CART_QUERY, REMOVE_LINES_MUTATION, UPDATE_LINES_MUTATION } from "@/lib/shopify/queries/cart";
import { storeApi } from "@/lib/shopify/storeApi";


export async function createCart(variables: CreateCartMutationVariables) {
    const { data, errors } = await storeApi.request<CreateCartMutation>(CREATE_CART_MUTATION, { variables });

    if (errors) {
        throw new Error(`[createCart]: ${errors}`);
    }

    if (!data?.cartCreate) {
        throw new Error(`[createCart]: Failed to create cart`);
    }

    if (data.cartCreate.userErrors?.length > 0) {
        const errorMessages = data.cartCreate.userErrors
            .map((e: { message: string }) => e.message)
            .join(", ");
        throw new Error(`Cart creation failed: ${errorMessages}`);
    }

    return data.cartCreate.cart;
}

export async function getCart(variables: GetCartQueryVariables) {
    const { data, errors } = await storeApi.request<GetCartQuery>(GET_CART_QUERY, { variables });

    if (errors) {
        throw new Error(`[getCart]: ${errors}`);
    }

    if (!data?.cart) {
        throw new Error(`[getCart]: Failed to get cart`);
    }

    return data.cart;
}

export async function addLinesToCart(variables: AddLinesToCartMutationVariables) {
    const { data, errors } = await storeApi.request<AddLinesToCartMutation>(ADD_LINES_MUTATION, { variables });

    if (errors) {
        throw new Error(`[addLinesToCart]: ${errors}`);
    }

    if (!data?.cartLinesAdd) {
        throw new Error(`[addLinesToCart]: Failed to add lines to cart`);
    }

    if (data.cartLinesAdd.userErrors?.length > 0) {
        const errorMessages = data.cartLinesAdd.userErrors
            .map((e: { message: string }) => e.message)
            .join(", ");
        throw new Error(`Cart line addition failed: ${errorMessages}`);
    }

    return data.cartLinesAdd.cart;
}


export async function updateCartLines(variables: UpdateCartLinesMutationVariables) {

    const { data, errors } = await storeApi.request<UpdateCartLinesMutation>(UPDATE_LINES_MUTATION, { variables });

    if (errors) {
        throw new Error(`[updateCartLines]: ${errors}`);
    }

    if (!data?.cartLinesUpdate) {
        throw new Error(`[updateCartLines]: Failed to update cart lines`);
    }

    if (data.cartLinesUpdate.userErrors?.length > 0) {
        const errorMessages = data.cartLinesUpdate.userErrors
            .map((e: { message: string }) => e.message)
            .join(", ");
        throw new Error(`Cart line update failed: ${errorMessages}`);
    }

    return data.cartLinesUpdate.cart;
}


export async function removeCartLines(variables: RemoveCartLinesMutationVariables) {
    const { data, errors } = await storeApi.request<RemoveCartLinesMutation>(REMOVE_LINES_MUTATION, { variables });


    if (errors) {
        throw new Error(`[removeCartLines]: ${errors}`);
    }

    if (!data?.cartLinesRemove) {
        throw new Error(`[removeCartLines]: Failed to remove cart lines`);
    }

    if (data.cartLinesRemove.userErrors?.length > 0) {
        const errorMessages = data.cartLinesRemove.userErrors
            .map((e: { message: string }) => e.message)
            .join(", ");
        throw new Error(`Cart line removal failed: ${errorMessages}`);
    }

    return data.cartLinesRemove.cart;
}

