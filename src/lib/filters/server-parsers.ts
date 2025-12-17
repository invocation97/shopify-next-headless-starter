import "server-only";
import { parseAsFloat, parseAsString, parseAsBoolean, createParser } from "nuqs/server";
import { z } from "zod";
import { ProductCollectionSortKeys } from "../shopify/types/storefront.types";

const validSortKeys = Object.values(ProductCollectionSortKeys) as [string, ...string[]];
const SortKeySchema = z.enum(validSortKeys);

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

export const parseAsPriceMin = parseAsFloat.withOptions({
    clearOnDefault: true,
});

export const parseAsPriceMax = parseAsFloat.withOptions({
    clearOnDefault: true,
});

export const parseAsReverse = parseAsBoolean.withOptions({
    clearOnDefault: true,
});

export const parseAsAfter = parseAsString.withOptions({
    clearOnDefault: true,
});

export const productParsers = {
    priceMin: parseAsPriceMin,
    priceMax: parseAsPriceMax,
    sortKey: parseAsSortKey,
    reverse: parseAsReverse,
    after: parseAsAfter,
};
