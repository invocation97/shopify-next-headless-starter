import type { Product } from "@/lib/shopify/types/storefront.types";

type ProductAdditionalDetailsProps = {
    product: Product;
};

function parseAdditionalDetails(metafieldValue: string | null | undefined): Record<string, string> {
    if (!metafieldValue) return {};

    try {
        const parsed = JSON.parse(metafieldValue);
        if (typeof parsed === "object" && parsed !== null) {
            return parsed;
        }
    } catch {
        // If not JSON, return empty object
        return {};
    }

    return {};
}

export function ProductAdditionalDetails({ product }: ProductAdditionalDetailsProps) {
    // Try to get additional details from metafields
    const detailsMetafield = product.metafields?.find(
        (m) => m?.namespace === "custom" && m?.key === "additional_details"
    );

    const specificationsMetafield = product.metafields?.find(
        (m) => m?.namespace === "custom" && m?.key === "specifications"
    );

    const details = parseAdditionalDetails(detailsMetafield?.value);
    const specifications = parseAdditionalDetails(specificationsMetafield?.value);

    const allDetails = { ...details, ...specifications };

    if (Object.keys(allDetails).length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Additional Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(allDetails).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                        <dt className="text-sm font-medium text-muted-foreground">
                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
                        </dt>
                        <dd className="text-sm">{value}</dd>
                    </div>
                ))}
            </div>
        </div>
    );
}

