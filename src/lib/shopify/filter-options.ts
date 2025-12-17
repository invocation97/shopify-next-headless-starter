import type { FilterOption } from "@/components/store/filter-group";
import type { FilterType } from "./types/storefront.types";

/**
 * Configuration for a dynamic filter UI component
 */
export type DynamicFilterConfig = {
    /** The filter ID (e.g., "filter.v.availability") */
    key: string;
    /** Human-friendly label for the filter */
    label: string;
    /** UI component type to render */
    type: "checkbox" | "radio" | "range";
    /** Available filter options */
    options: FilterOption[];
    /** Original Shopify filter type (LIST, PRICE_RANGE, etc.) */
    metafieldType: FilterType;
};
