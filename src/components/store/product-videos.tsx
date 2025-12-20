import type { Product } from "@/lib/shopify/types/storefront.types";

type ProductVideosProps = {
    product: Product;
};

type Video = {
    url: string;
    title?: string;
    thumbnail?: string;
};

function parseVideos(metafieldValue: string | null | undefined): Video[] {
    if (!metafieldValue) return [];

    try {
        const parsed = JSON.parse(metafieldValue);
        if (Array.isArray(parsed)) {
            return parsed.filter((item) => item.url);
        }
    } catch {
        // If not JSON, try to parse as plain text or other formats
        return [];
    }

    return [];
}

function getYouTubeEmbedUrl(url: string): string | null {
    // Extract YouTube video ID from various URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
    }

    return null;
}

export function ProductVideos({ product }: ProductVideosProps) {
    // Try to get videos from metafields
    const videosMetafield = product.metafields?.find(
        (m) => m?.namespace === "custom" && m?.key === "videos"
    );

    const videos = parseVideos(videosMetafield?.value);

    if (videos.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Product Videos</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {videos.map((video, index) => {
                    const embedUrl = getYouTubeEmbedUrl(video.url);

                    if (!embedUrl) {
                        return (
                            <div key={index} className="aspect-video rounded-lg border bg-muted flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">Invalid video URL</p>
                            </div>
                        );
                    }

                    return (
                        <div key={index} className="space-y-2">
                            {video.title && (
                                <h3 className="text-lg font-medium">{video.title}</h3>
                            )}
                            <div className="aspect-video overflow-hidden rounded-lg border">
                                <iframe
                                    src={embedUrl}
                                    title={video.title || `Product video ${index + 1}`}
                                    className="h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

