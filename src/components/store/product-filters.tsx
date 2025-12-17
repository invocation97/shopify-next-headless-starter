"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useFilters } from "@/hooks/use-filters";
import { FilterGroup } from "./filter-group";
import { PriceRangeFilter } from "./price-range-filter";

type ProductFiltersProps = {
    collectionHandle?: string;
};

export function ProductFilters({ collectionHandle }: ProductFiltersProps = {}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data: dynamicFilters = [], isLoading: isLoadingFilters } = useFilters(
        { collectionHandle },
    );

    const updateFilter = useCallback(
        (filterId: string, values: string[] | undefined) => {
            const params = new URLSearchParams(searchParams.toString());

            // Remove pagination cursor when filters change
            params.delete("after");

            // Remove existing values for this filter
            params.delete(filterId);

            // Add new values
            if (values && values.length > 0) {
                values.forEach((value) => {
                    params.append(filterId, value);
                });
            }

            const newUrl = `${pathname}?${params.toString()}`;
            router.replace(newUrl, { scroll: false });
        },
        [router, pathname, searchParams],
    );

    const updatePriceRange = useCallback(
        (min?: number, max?: number) => {
            const params = new URLSearchParams(searchParams.toString());

            // Remove pagination cursor when filters change
            params.delete("after");

            // Update price range using legacy format (will be converted by API)
            if (min !== undefined) {
                params.set("priceMin", min.toString());
            } else {
                params.delete("priceMin");
            }

            if (max !== undefined) {
                params.set("priceMax", max.toString());
            } else {
                params.delete("priceMax");
            }

            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams],
    );

    const clearAllFilters = useCallback(() => {
        // Clear all filters - don't set any defaults
        router.replace(pathname, { scroll: false });
    }, [router, pathname]);

    // Get current filter values from search params
    const getFilterValues = useCallback(
        (filterId: string): string[] => {
            return searchParams.getAll(filterId);
        },
        [searchParams],
    );

    // Legacy price range support
    const priceMin = searchParams.get("priceMin")
        ? Number(searchParams.get("priceMin"))
        : undefined;
    const priceMax = searchParams.get("priceMax")
        ? Number(searchParams.get("priceMax"))
        : undefined;

    // Separate filters by type
    const { listFilters, priceRangeFilter, availabilityFilter } = useMemo(() => {
        const list: typeof dynamicFilters = [];
        let priceRange: (typeof dynamicFilters)[0] | undefined;
        let availability: (typeof dynamicFilters)[0] | undefined;

        for (const filter of dynamicFilters) {
            if (filter.type === "range") {
                priceRange = filter;
            } else if (filter.key === "filter.v.availability") {
                availability = filter;
            } else {
                list.push(filter);
            }
        }

        return {
            listFilters: list,
            priceRangeFilter: priceRange,
            availabilityFilter: availability,
        };
    }, [dynamicFilters]);

    // Check if any filters are active
    const hasActiveFilters =
        priceMin !== undefined ||
        priceMax !== undefined ||
        dynamicFilters.some((filter) => getFilterValues(filter.key).length > 0);

    return (
        <div className="w-full space-y-0">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs"
                    >
                        Clear all
                    </Button>
                )}
            </div>

            <div className="space-y-0">
                {/* Availability Filter - from facets */}
                {availabilityFilter && (
                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="availability"
                        className="border-b last:border-b-0"
                    >
                        <AccordionItem value="availability">
                            <AccordionTrigger className="text-sm font-medium">
                                {availabilityFilter.label}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 pt-2">
                                    {availabilityFilter.options.map((option) => {
                                        const isChecked = getFilterValues(
                                            availabilityFilter.key,
                                        ).includes(option.value);
                                        return (
                                            <div
                                                key={option.value}
                                                className="flex items-center justify-between"
                                            >
                                                <label
                                                    htmlFor={`availability-${option.value}`}
                                                    className="text-sm text-foreground cursor-pointer"
                                                >
                                                    {option.label}
                                                </label>
                                                <Switch
                                                    id={`availability-${option.value}`}
                                                    checked={isChecked}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            updateFilter(availabilityFilter.key, [
                                                                option.value,
                                                            ]);
                                                        } else {
                                                            updateFilter(availabilityFilter.key, undefined);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}

                {/* Dynamic LIST Filters */}
                {isLoadingFilters ? (
                    <div className="p-4 text-sm text-muted-foreground">
                        Loading filters...
                    </div>
                ) : (
                    listFilters.map((filter) => {
                        const selectedValues = getFilterValues(filter.key);
                        return (
                            <FilterGroup
                                key={filter.key}
                                title={filter.label}
                                options={filter.options}
                                selectedValues={selectedValues}
                                onValueChange={(values) => updateFilter(filter.key, values)}
                                type={filter.type === "radio" ? "radio" : "checkbox"}
                                maxHeight={filter.options.length > 5 ? "max-h-48" : undefined}
                            />
                        );
                    })
                )}

                {/* Price Range Filter */}
                {priceRangeFilter ? (
                    <PriceRangeFilter
                        priceMin={priceMin}
                        priceMax={priceMax}
                        onPriceChange={updatePriceRange}
                    />
                ) : (
                    // Fallback: show price range filter even if not in facets (for backward compatibility)
                    <PriceRangeFilter
                        priceMin={priceMin}
                        priceMax={priceMax}
                        onPriceChange={updatePriceRange}
                    />
                )}
            </div>
        </div>
    );
}