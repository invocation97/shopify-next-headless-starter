"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FilterOption = {
    value: string;
    label: string;
};

type FilterGroupProps = {
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    onValueChange: (values: string[]) => void;
    type?: "checkbox" | "radio";
    defaultOpen?: boolean;
    maxHeight?: string;
};

export function FilterGroup({
    title,
    options,
    selectedValues,
    onValueChange,
    type = "checkbox",
    defaultOpen = true,
    maxHeight = "max-h-64",
}: FilterGroupProps) {
    const handleCheckboxChange = (value: string, checked: boolean) => {
        if (checked) {
            onValueChange([...selectedValues, value]);
        } else {
            onValueChange(selectedValues.filter((v) => v !== value));
        }
    };

    const handleRadioChange = (value: string) => {
        onValueChange([value]);
    };

    const activeCount = selectedValues.length;

    return (
        <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpen ? title : undefined}
            className="border-b last:border-b-0"
        >
            <AccordionItem value={title}>
                <AccordionTrigger className="text-sm font-medium">
                    <span className="flex items-center gap-2">
                        {title}
                        {activeCount > 0 && (
                            <span className="text-xs text-muted-foreground">
                                ({activeCount})
                            </span>
                        )}
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div
                        className={`space-y-3 pt-2 overflow-y-auto ${maxHeight} pr-2`}
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {type === "checkbox"
                            ? options.map((option) => {
                                const isChecked = selectedValues.includes(option.value);
                                const checkboxId = `checkbox-${option.value}`;
                                return (
                                    <Label
                                        key={option.value}
                                        htmlFor={checkboxId}
                                        className="flex items-center gap-2 cursor-pointer group"
                                    >
                                        <Checkbox
                                            id={checkboxId}
                                            checked={isChecked}
                                            onCheckedChange={(checked) =>
                                                handleCheckboxChange(option.value, checked === true)
                                            }
                                        />
                                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                                            {option.label}
                                        </span>
                                    </Label>
                                );
                            })
                            : options.map((option) => {
                                const isSelected = selectedValues.includes(option.value);
                                const radioId = `radio-${option.value}`;
                                return (
                                    <Label
                                        key={option.value}
                                        htmlFor={radioId}
                                        className="flex items-center gap-2 cursor-pointer group"
                                    >
                                        <Input
                                            id={radioId}
                                            type="radio"
                                            name={`radio-group-${title}`}
                                            checked={isSelected}
                                            onChange={() => handleRadioChange(option.value)}
                                            className="size-4 shrink-0 rounded-full border border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                                            {option.label}
                                        </span>
                                    </Label>
                                );
                            })}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}