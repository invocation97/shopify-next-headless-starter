"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CollectionCard } from "@/components/store/collection-card";
import { Collection } from "@/lib/shopify/types/storefront.types";
import { cn } from "@/lib/utils";

type CollectionGridProps = {
    collections: Collection[];
    className?: string;
};

function CollectionSkeleton() {
    return (
        <Card className="flex h-full flex-col overflow-hidden">
            <CardContent className="p-0">
                <Skeleton className="aspect-square w-full rounded-t-lg" />
            </CardContent>
            <div className="flex flex-1 flex-col p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-2/3" />
            </div>
        </Card>
    );
}

export function CollectionGridSkeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                className
            )}
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <CollectionSkeleton key={i} />
            ))}
        </div>
    );
}

export function CollectionGrid({ collections, className }: CollectionGridProps) {
    if (collections.length === 0) {
        return (
            <div
                className={cn(
                    "flex min-h-[400px] items-center justify-center rounded-lg border border-dashed",
                    className
                )}
            >
                <div className="text-center">
                    <p className="text-lg font-semibold text-muted-foreground">
                        No collections found
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        There are no collections available at this time.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <ul
            className={cn(
                "w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
                className
            )}
        >
            {collections.map((collection, index) => (
                <li key={collection.id} className="h-full">
                    <CollectionCard
                        collection={collection}
                        fetchPriority={index < 6 ? "high" : "low"}
                    />
                </li>
            ))}
        </ul>
    );
}
