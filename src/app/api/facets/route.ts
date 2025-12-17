import { storeConfig } from "@/config/store";
import { getCollectionFacets } from "@/lib/shopify/server/facets";
import { CollectionFacetsQuery } from "@/lib/shopify/types/storefront.generated";
import { Filter } from "@/lib/shopify/types/storefront.types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const FacetsQuerySchema = z.object({
    collectionHandle: z.string().optional(),
});

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const queryParams = FacetsQuerySchema.parse({
            collectionHandle: searchParams.get("collectionHandle") || undefined,
        });

        const collectionHandle =
            queryParams.collectionHandle ?? storeConfig.allProductsCollectionHandle;

        if (!storeConfig.enableFacets) {
            return NextResponse.json<{ filters: Filter[] }>(
                { filters: [] },
                {
                    headers: {
                        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
                    },
                }
            );
        }

        const filters = await getCollectionFacets(collectionHandle);

        return NextResponse.json<{ filters: Filter[] }>(
            { filters },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );
    } catch (error) {
        console.error("[GET /api/facets]", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid query parameters", details: error.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
