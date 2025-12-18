import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Collection } from "@/lib/shopify/types/storefront.types";
import { cn } from "@/lib/utils";

type CollectionCardProps = {
    collection: Collection;
    fetchPriority?: "high" | "low" | "auto";
    className?: string;
};

export function CollectionCard({
    collection,
    fetchPriority = "auto",
    className,
}: CollectionCardProps) {
    return (
        <Card className={cn("flex h-full flex-col overflow-hidden", className)}>
            <Link href={`/collection/${collection.handle}`} className="group">
                <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                        {collection.image ? (
                            <Image
                                src={collection.image.url || "/placeholder.svg"}
                                alt={collection.image.altText || collection.title}
                                width={500}
                                height={500}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                priority={fetchPriority === "high"}
                                fetchPriority={fetchPriority}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                No image
                            </div>
                        )}
                    </div>
                </CardContent>
            </Link>

            <div className="flex flex-1 flex-col p-4">
                <Link href={`/collection/${collection.handle}`} className="group">
                    <h3 className="line-clamp-2 text-base font-medium transition-colors group-hover:text-primary">
                        {collection.title}
                    </h3>
                </Link>

                {collection.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {collection.description}
                    </p>
                )}
            </div>
        </Card>
    );
}
