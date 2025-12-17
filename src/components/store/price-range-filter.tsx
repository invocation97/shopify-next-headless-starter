"use client";

import { useEffect, useRef, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type PriceRangeFilterProps = {
    priceMin?: number;
    priceMax?: number;
    onPriceChange: (min?: number, max?: number) => void;
    currencyCode?: string;
    defaultOpen?: boolean;
    minPrice?: number;
    maxPrice?: number;
};

const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export function PriceRangeFilter({
    priceMin,
    priceMax,
    onPriceChange,
    currencyCode = "USD",
    defaultOpen = true,
    minPrice = 0,
    maxPrice = 5000,
}: PriceRangeFilterProps) {
    const [localMin, setLocalMin] = useState<number | undefined>(priceMin);
    const [localMax, setLocalMax] = useState<number | undefined>(priceMax);

    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setLocalMin(priceMin);
        setLocalMax(priceMax);
    }, [priceMin, priceMax]);

    const debouncedPriceChange = (min?: number, max?: number) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            onPriceChange(min, max);
        }, 800);
    };

    // Get current slider values
    const sliderValues: [number, number] = [
        localMin ?? minPrice,
        localMax ?? maxPrice,
    ];

    const handleSliderChange = (values: number[]) => {
        const newMin = values[0] !== minPrice ? values[0] : undefined;
        const newMax = values[1] !== maxPrice ? values[1] : undefined;

        setLocalMin(newMin);
        setLocalMax(newMax);

        debouncedPriceChange(newMin, newMax);
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();

        if (value === "") {
            // Allow empty input while typing
            setLocalMin(undefined);
            debouncedPriceChange(undefined, localMax);
            return;
        }

        const numValue = Number(value);
        if (Number.isNaN(numValue)) {
            return; // Invalid input, ignore
        }

        const clampedValue = Math.max(minPrice, Math.min(maxPrice, numValue));

        // Ensure min doesn't exceed max
        const finalMin =
            localMax !== undefined ? Math.min(clampedValue, localMax) : clampedValue;

        setLocalMin(finalMin);
        debouncedPriceChange(finalMin, localMax);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();

        if (value === "") {
            // Allow empty input while typing
            setLocalMax(undefined);
            debouncedPriceChange(localMin, undefined);
            return;
        }

        const numValue = Number(value);
        if (Number.isNaN(numValue)) {
            return; // Invalid input, ignore
        }

        const clampedValue = Math.max(minPrice, Math.min(maxPrice, numValue));

        // Ensure max doesn't go below min
        const finalMax =
            localMin !== undefined ? Math.max(clampedValue, localMin) : clampedValue;

        setLocalMax(finalMax);
        debouncedPriceChange(localMin, finalMax);
    };

    // Cleanup debounce timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const hasActiveFilter = localMin !== undefined || localMax !== undefined;

    return (
        <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen ? "price" : undefined}
            className="border-b last:border-b-0"
        >
            <AccordionItem value="price">
                <AccordionTrigger className="text-sm font-medium">
                    <span className="flex items-center gap-2">
                        Price Range
                        {hasActiveFilter && (
                            <span className="text-xs text-muted-foreground">(active)</span>
                        )}
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 pt-2">
                        <div className="px-1">
                            <Slider
                                value={sliderValues}
                                onValueChange={handleSliderChange}
                                min={minPrice}
                                max={maxPrice}
                                step={10}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>{formatCurrency(minPrice, currencyCode)}</span>
                                <span>{formatCurrency(maxPrice, currencyCode)}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="price-min"
                                    className="text-xs text-muted-foreground"
                                >
                                    Min Price
                                </Label>
                                <Input
                                    id="price-min"
                                    type="number"
                                    placeholder="Min"
                                    value={localMin ?? ""}
                                    onChange={handleMinChange}
                                    min={minPrice}
                                    max={localMax ?? maxPrice}
                                    step={10}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="price-max"
                                    className="text-xs text-muted-foreground"
                                >
                                    Max Price
                                </Label>
                                <Input
                                    id="price-max"
                                    type="number"
                                    placeholder="Max"
                                    value={localMax ?? ""}
                                    onChange={handleMaxChange}
                                    min={localMin ?? minPrice}
                                    max={maxPrice}
                                    step={10}
                                />
                            </div>
                        </div>
                        {hasActiveFilter && (
                            <button
                                type="button"
                                onClick={() => {
                                    setLocalMin(undefined);
                                    setLocalMax(undefined);
                                    onPriceChange(undefined, undefined);
                                }}
                                className="text-xs text-muted-foreground hover:text-foreground underline"
                            >
                                Clear price filter
                            </button>
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}