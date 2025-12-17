import { parseAsFloat, parseAsString, parseAsBoolean, createParser } from "nuqs";
import { z } from "zod";


export const ProductCollectionSortKeys = {
    /** Sort by the `best-selling` value. */
    BestSelling: 'BEST_SELLING',
    /** Sort by the `collection-default` value. */
    CollectionDefault: 'COLLECTION_DEFAULT',
    /** Sort by the `created` value. */
    Created: 'CREATED',
    /** Sort by the `id` value. */
    Id: 'ID',
    /** Sort by the `manual` value. */
    Manual: 'MANUAL',
    /** Sort by the `price` value. */
    Price: 'PRICE',
    /**
     * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
     * Don't use this sort key when no search query is specified.
     *
     */
    Relevance: 'RELEVANCE',
    /** Sort by the `title` value. */
    Title: 'TITLE'
} as const;

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

export const parseAsFilterValue = parseAsString.withOptions({
    clearOnDefault: true,
});
