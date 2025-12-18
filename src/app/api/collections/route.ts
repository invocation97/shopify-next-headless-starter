import { storeConfig } from "@/config/store";
import { listCollections } from "@/lib/shopify/server/collection";
import { CollectionSortKeys } from "@/lib/shopify/types/storefront.types";
import { mapCollectionsToResponse } from "@/lib/utils/mappers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CollectionsRequestSchema = z.object({
    first: z.coerce.number().int().min(1).max(250).optional(),
    last: z.coerce.number().int().min(1).max(250).optional(),
    after: z.string().optional(),
    before: z.string().optional(),
    sortKey: z.string().optional(),
    reverse: z.coerce.boolean().optional(),
    query: z.string().optional(),
});

type CollectionsResponse = ReturnType<typeof mapCollectionsToResponse>;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedBody = CollectionsRequestSchema.parse(body);

        const first = validatedBody.first ?? storeConfig.collectionsPerPage;

        const collectionsData = await listCollections({
            first: validatedBody.last ? undefined : first,
            last: validatedBody.last,
            after: validatedBody.after,
            before: validatedBody.before,
            sortKey: validatedBody.sortKey
                ? (validatedBody.sortKey as CollectionSortKeys)
                : undefined,
            reverse: validatedBody.reverse,
            query: validatedBody.query,
        });

        const collections = mapCollectionsToResponse(collectionsData);

        return NextResponse.json<CollectionsResponse>(collections, {
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch (error) {
        console.error("[POST /api/collections]", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid request body", details: error.issues },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
