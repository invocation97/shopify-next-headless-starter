"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ProductOption = {
    id: string;
    name: string;
    values: string[];
};

type ProductOptionsSelectorProps = {
    options: ProductOption[];
    selectedOptions: Record<string, string>;
    onOptionChange: (optionName: string, value: string) => void;
};

export function ProductOptionsSelector({
    options,
    selectedOptions,
    onOptionChange,
}: ProductOptionsSelectorProps) {
    if (!options || options.length === 0) {
        return null;
    }

    return (
        <>
            {options.map((option) => (
                <div key={option.id} className="space-y-2">
                    <Label htmlFor={`option-${option.id}`}>{option.name}</Label>
                    <Select
                        onValueChange={(value) => onOptionChange(option.name, value)}
                        value={selectedOptions[option.name] || ""}
                    >
                        <SelectTrigger id={`option-${option.id}`}>
                            <SelectValue placeholder={`Select ${option.name}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {option.values.map((value) => (
                                <SelectItem key={value} value={value}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            ))}
        </>
    );
}

