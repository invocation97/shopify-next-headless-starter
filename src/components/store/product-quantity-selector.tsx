"use client";

import { QuantitySelector } from "@/components/store/quantity-selector";
import { Label } from "@/components/ui/label";

type ProductQuantitySelectorProps = {
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    min?: number;
    max?: number;
};

export function ProductQuantitySelector({
    value,
    onChange,
    disabled = false,
    min = 1,
    max,
}: ProductQuantitySelectorProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <QuantitySelector
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                disabled={disabled}
                showLabel={false}
            />
        </div>
    );
}

