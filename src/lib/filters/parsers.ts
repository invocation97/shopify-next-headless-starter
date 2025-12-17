import { parseAsFloat, parseAsString, parseAsBoolean, createParser } from "nuqs";
import { z } from "zod";
import { ProductCollectionSortKeys } from "../shopify/types/storefront.types";

// Valid sort keys from GraphQL schema
const validSortKeys = Object.values(ProductCollectionSortKeys) as [string, ...string[]];

// Zod schema for sort key validation
const SortKeySchema = z.enum(validSortKeys);

// Custom parser for sort key with Zod validation
export const parseAsSortKey = createParser({
    parse: (value: string | null): string | null => {
        if (!value) return null;
        const result = SortKeySchema.safeParse(value);
        return result.success ? result.data : null;
    },
    serialize: (value: string | null): string => value ?? "",
}).withOptions({
    clearOnDefault: true,
});

// Price parsers
export const parseAsPriceMin = parseAsFloat.withOptions({
    clearOnDefault: true,
});

export const parseAsPriceMax = parseAsFloat.withOptions({
    clearOnDefault: true,
});

// Boolean parser for reverse
export const parseAsReverse = parseAsBoolean.withOptions({
    clearOnDefault: true,
});

// String parser for pagination cursor
export const parseAsAfter = parseAsString.withOptions({
    clearOnDefault: true,
});

// Parser for filter values (array of strings)
// Note: nuqs handles arrays automatically when multiple values are present
export const parseAsFilterValue = parseAsString.withOptions({
    clearOnDefault: true,
});
