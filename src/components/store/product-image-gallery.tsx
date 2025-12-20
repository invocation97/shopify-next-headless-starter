"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImage = {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
};

type ProductImageGalleryProps = {
    images: ProductImage[];
    productTitle: string;
};

export function ProductImageGallery({ images, productTitle }: ProductImageGalleryProps) {
    const allImages = images.length > 0 ? images : [];
    const [selectedImage, setSelectedImage] = useState(allImages[0]?.url || "");

    if (allImages.length === 0) {
        return (
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">No image available</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt={productTitle}
                        width={800}
                        height={800}
                        className="h-full w-full object-contain p-8"
                        priority
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        No image available
                    </div>
                )}
            </div>

            {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {allImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image.url)}
                            className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${selectedImage === image.url
                                    ? "border-primary"
                                    : "border-border hover:border-primary/50"
                                }`}
                            type="button"
                        >
                            <Image
                                src={image.url}
                                alt={image.altText || `${productTitle} ${index + 1}`}
                                width={200}
                                height={200}
                                className="h-full w-full object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

