import { z } from "zod";

/**
 * Schema for AttributeInput matching Shopify's AttributeInput type
 */
export const attributeInputSchema = z.object({
    key: z.string(),
    value: z.string(),
});

/**
 * Schema for CartLineInput matching Shopify's CartLineInput type
 */
export const cartLineInputSchema = z.object({
    merchandiseId: z.string(),
    quantity: z.number().int().positive().optional(),
    attributes: z.array(attributeInputSchema).optional(),
    sellingPlanId: z.string().optional(),
});

/**
 * Schema for CartLineUpdateInput matching Shopify's CartLineUpdateInput type
 */
export const cartLineUpdateInputSchema = z.object({
    id: z.string(),
    quantity: z.number().int().positive().optional(),
    merchandiseId: z.string().optional(),
    attributes: z.array(attributeInputSchema).optional(),
    sellingPlanId: z.string().optional(),
});

/**
 * Schema for creating a cart (POST /api/cart)
 */
export const createCartSchema = z.object({
    lines: z.array(cartLineInputSchema).optional(),
    attributes: z.array(attributeInputSchema).optional(),
});

/**
 * Schema for adding lines to cart (POST /api/cart/lines)
 */
export const addLinesSchema = z.object({
    lines: z.array(cartLineInputSchema).min(1),
});

/**
 * Schema for updating cart lines (PATCH /api/cart/lines)
 */
export const updateLinesSchema = z.object({
    lines: z.array(cartLineUpdateInputSchema).min(1),
});

/**
 * Schema for removing cart lines (DELETE /api/cart/lines)
 */
export const removeLinesSchema = z.object({
    lineIds: z.array(z.string()).min(1),
});

// Type exports for use in API routes
export type CreateCartInput = z.infer<typeof createCartSchema>;
export type AddLinesInput = z.infer<typeof addLinesSchema>;
export type UpdateLinesInput = z.infer<typeof updateLinesSchema>;
export type RemoveLinesInput = z.infer<typeof removeLinesSchema>;
export type CartLineInput = z.infer<typeof cartLineInputSchema>;
export type CartLineUpdateInput = z.infer<typeof cartLineUpdateInputSchema>;
export type AttributeInput = z.infer<typeof attributeInputSchema>;
