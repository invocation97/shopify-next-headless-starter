"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconMinus, IconPlus } from "@tabler/icons-react";

type QuantitySelectorProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    disabled?: boolean;
    className?: string;
    inputClassName?: string;
    showLabel?: boolean;
    label?: string;
};

export function QuantitySelector({
    value,
    onChange,
    min = 1,
    max,
    disabled = false,
    className,
    inputClassName,
    showLabel = false,
    label = "Quantity",
}: QuantitySelectorProps) {
    const handleDecrease = () => {
        if (disabled) return;
        const newValue = Math.max(min, value - 1);
        onChange(newValue);
    };

    const handleIncrease = () => {
        if (disabled) return;
        const newValue = max ? Math.min(max, value + 1) : value + 1;
        onChange(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const inputValue = parseInt(e.target.value, 10) || min;
        let newValue = inputValue;

        if (newValue < min) {
            newValue = min;
        } else if (max && newValue > max) {
            newValue = max;
        }

        onChange(newValue);
    };

    const isDecreaseDisabled = disabled || value <= min;
    const isIncreaseDisabled = disabled || (max !== undefined && value >= max);

    return (
        <div className={className}>
            {showLabel && (
                <Label>{label}</Label>
            )}
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={handleDecrease}
                    disabled={isDecreaseDisabled}
                    type="button"
                >
                    <IconMinus size={16} />
                    <span className="sr-only">Decrease quantity</span>
                </Button>
                <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={min}
                    max={max}
                    value={value.toString()}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className={`w-16 text-center ${inputClassName || ""}`}
                />
                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={handleIncrease}
                    disabled={isIncreaseDisabled}
                    type="button"
                >
                    <IconPlus size={16} />
                    <span className="sr-only">Increase quantity</span>
                </Button>
            </div>
        </div>
    );
}

