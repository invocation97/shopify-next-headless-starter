import { storeConfig } from "@/config/store";
import { buildProductFiltersFromState, parseSearchParamsToState } from "@/lib/filters/filter-state";
import { getCollectionFacets } from "@/lib/shopify/server/facets";
import { getCollectionProducts } from "@/lib/shopify/server/products";
import { CollectionProductsQuery } from "@/lib/shopify/types/storefront.generated";
import { ProductCollectionSortKeys } from "@/lib/shopify/types/storefront.types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ProductsRequestSchema = z.object({
    collectionHandle: z.string().optional(),
    first: z.coerce.number().int().min(1).max(250).optional(),
    searchParams: z.string().optional(),
});

type ProductsResponse = NonNullable<
    CollectionProductsQuery["collection"]
>["products"];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedBody = ProductsRequestSchema.parse(body);

        const collectionHandle =
            validatedBody.collectionHandle ?? storeConfig.allProductsCollectionHandle;
        const first = validatedBody.first ?? storeConfig.productsPerPage;

        const state = validatedBody.searchParams
            ? parseSearchParamsToState(new URLSearchParams(validatedBody.searchParams))
            : { selected: {} };

        const facets = storeConfig.enableFacets
            ? await getCollectionFacets(collectionHandle)
            : [];
        const filters = storeConfig.enableFacets
            ? buildProductFiltersFromState(facets, state)
            : [];

        const products = await getCollectionProducts({
            handle: collectionHandle,
            first,
            after: state.after,
            filters: filters.length ? filters : undefined,
            sortKey: state.sortKey as ProductCollectionSortKeys | undefined,
            reverse: state.reverse,
        }) as ProductsResponse;

        return NextResponse.json<ProductsResponse>(products, {
            headers: {
                "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            },
        });
    } catch (error) {
        console.error("[POST /api/products]", error);

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