import { z } from "zod";
import { Filter, ProductFilter } from "../shopify/types/storefront.types";

export const FilterStateSchema = z.object({
    selected: z.record(z.string(), z.array(z.string())).default({}),
    price: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
    }).optional(),
    after: z.string().optional(),
    sortKey: z.string().optional(),
    reverse: z.boolean().optional(),
});

export type FilterState = z.infer<typeof FilterStateSchema>;

const ProductFilterSchema = z.object({
    available: z.boolean().optional(),
    price: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
    }).optional(),
    productVendor: z.string().optional(),
    productType: z.string().optional(),
    tag: z.string().optional(),
    productMetafield: z.object({
        namespace: z.string(),
        key: z.string(),
        value: z.string(),
    }).optional(),
    variantMetafield: z.object({
        namespace: z.string(),
        key: z.string(),
        value: z.string(),
    }).optional(),
    category: z.string().optional(),
    variantOption: z.string().optional(),
    taxonomyMetafield: z.object({
        namespace: z.string(),
        key: z.string(),
        value: z.string(),
    }).optional(),
});

function parseFilterInput(inputJson: string): ProductFilter | null {
    try {
        const parsed = JSON.parse(inputJson);
        const res = ProductFilterSchema.safeParse(parsed);
        return res.success ? (res.data as ProductFilter) : null;
    } catch (error) {
        console.error("Error parsing filter input:", error);
        return null;
    }
}

export function parseSearchParamsToState(searchParams: URLSearchParams): FilterState {
    const selected: Record<string, string[]> = {};
    const state: Partial<FilterState> = { selected };

    for (const [key, value] of searchParams.entries()) {
        if (key.startsWith("filter.")) {
            const existing = selected[key] || [];
            if (!existing.includes(value)) {
                selected[key] = [...existing, value];
            }
            continue;
        }
        if (key === "after") {
            state.after = value;
        }
        if (key === "sortKey") {
            state.sortKey = value;
        }
        if (key === "reverse") {
            state.reverse = value === "true";
        }
        if (key === "priceMin") {
            const min = Number(value);
            if (!Number.isNaN(min)) {
                state.price = {
                    ...(state.price ?? {}),
                    min,
                };
            }
        }
        if (key === "priceMax") {
            const max = Number(value);
            if (!Number.isNaN(max)) {
                state.price = {
                    ...(state.price ?? {}),
                    max,
                };
            }
        }
    }

    const result = FilterStateSchema.safeParse(state);
    return result.success ? result.data : { selected };
}

export function buildProductFiltersFromState(facets: Filter[], state: FilterState): ProductFilter[] {
    const out: ProductFilter[] = [];

    if (state.price?.min !== undefined || state.price?.max !== undefined) {
        out.push({
            price: {
                min: state.price.min,
                max: state.price.max,
            }
        });
    }

    for (const facet of facets) {
        const selectedValueLabels = state.selected[facet.id];

        if (!selectedValueLabels?.length) continue;

        if (facet.type === "LIST") {
            // Match by label since /api/filters uses labels as values
            for (const valueLabel of selectedValueLabels) {
                const val = facet.values.find((v) => v.label === valueLabel);
                if (!val) continue;
                const parsed = parseFilterInput(val.input);
                if (parsed) {
                    out.push(parsed);
                }
            }
        }
    }

    return out;
}