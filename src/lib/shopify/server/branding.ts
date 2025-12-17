import "server-only";
import { storeApi } from "../storeApi";
import { GetStoreBrandingQuery } from "../types/storefront.generated";
import { STORE_BRANDING_QUERY } from "../queries/branding";


export type Branding = Awaited<ReturnType<typeof getStoreBranding>>;


export async function getStoreBranding() {
    const { data, errors } = await storeApi.request<GetStoreBrandingQuery>(STORE_BRANDING_QUERY, {
        headers: {
            "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
        }
    });

    if (errors) {
        throw new Error(`[getStoreBranding]: ${errors}`);
    }
    if (!data?.shop?.brand) {
        throw new Error(`[getStoreBranding]: Brand not found`);
    }
    return data.shop.brand;
}