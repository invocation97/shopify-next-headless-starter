import { unstable_cache } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import type { FilterOption } from "@/components/store/filter-group";
import { getCollectionFacets } from "@/lib/shopify/server/facets";
import { DynamicFilterConfig } from "@/lib/shopify/filter-options";

/**
 * Determine the filter UI type based on filter type and ID
 */
function getFilterUIType(
    filterType: "LIST" | "PRICE_RANGE",
    filterId: string,
): "checkbox" | "radio" | "range" {
    // Price range filters -> range slider
    if (filterType === "PRICE_RANGE") {
        return "range";
    }

    // Availability filters -> radio (single selection)
    if (filterId === "filter.v.availability") {
        return "radio";
    }

    // All other LIST filters -> checkbox (multiple selection)
    return "checkbox";
}

/**
 * Extract value from filter input JSON for use as option value
 * For LIST filters, we use the label as the value (since that's what users see and select)
 * The label will be matched back to the input JSON when building ProductFilters
 * For PRICE_RANGE, we return the input JSON string
 */
function extractOptionValue(
    inputJson: string,
    filterType: "LIST" | "PRICE_RANGE",
    label: string,
): string {
    if (filterType === "PRICE_RANGE") {
        // For price range, return the input JSON as-is
        return inputJson;
    }

    // For LIST filters, use the label as the value
    // This ensures users select by what they see, and we match it back to the input JSON
    return label;
}

/**
 * Convert filter values to FilterOption array
 */
function valuesToFilterOptions(
    values: Array<{ label: string; count: number; input: string }>,
    filterType: "LIST" | "PRICE_RANGE",
): FilterOption[] {
    const options: FilterOption[] = [];

    for (const value of values) {
        // Skip values with count 0 (no products match)
        if (value.count === 0) {
            continue;
        }

        const optionValue = extractOptionValue(
            value.input,
            filterType,
            value.label,
        );
        options.push({
            value: optionValue,
            label: value.label,
        });
    }

    // Sort options appropriately
    options.sort((a, b) => {
        // Try to sort numbers numerically
        const numA = Number.parseFloat(a.value);
        const numB = Number.parseFloat(b.value);
        if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
            return numA - numB;
        }
        // Otherwise sort alphabetically by label
        return a.label.localeCompare(b.label);
    });

    return options;
}

/**
 * GET /api/filters
 * Returns dynamic filter options based on collection facets
 * Query params:
 * - collectionHandle: collection handle (default: "all-products")
 * Results are cached server-side for 1 hour with revalidation tag
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const collectionHandle =
            searchParams.get("collectionHandle") || "all-products";

        // Use unstable_cache with revalidation tag
        const getCachedFilterOptions = unstable_cache(
            async () => {
                const facets = await getCollectionFacets(collectionHandle);
                const configs: DynamicFilterConfig[] = [];

                for (const filter of facets) {
                    // Skip filters with no values
                    if (filter.values.length === 0) {
                        continue;
                    }

                    // Skip BOOLEAN filters as they're not supported in the UI
                    if (filter.type === "BOOLEAN") {
                        continue;
                    }

                    const filterType = getFilterUIType(filter.type, filter.id);
                    const options = valuesToFilterOptions(filter.values, filter.type);

                    // Skip if no valid options after filtering
                    if (options.length === 0) {
                        continue;
                    }

                    configs.push({
                        key: filter.id, // Use filter ID as key
                        label: filter.label,
                        type: filterType,
                        options,
                        metafieldType: filter.type, // Keep for backward compatibility if needed
                    });
                }

                // Sort configs by label for consistent ordering
                configs.sort((a, b) => a.label.localeCompare(b.label));

                return configs;
            },
            [`filters-${collectionHandle}`],
            {
                tags: ["filters"],
                revalidate: 3600, // 1 hour
            },
        );

        const filterOptions = await getCachedFilterOptions();

        return NextResponse.json(filterOptions, {
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Error fetching filter options:", error);
        const message =
            error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json(
            { error: "Failed to fetch filter options", message },
            { status: 500 },
        );
    }
}