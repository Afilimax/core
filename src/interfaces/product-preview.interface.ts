import { Marketplace } from "../enums"

export interface ScrapedProductPreview {
    marketplace: Marketplace
    externalId: string | null
    title: string
    url: string
    thumbnail: string | null
    price: {
        value: number | null
        originalValue: number | null
        currency: "BRL"
    }
    rating: {
        average: number | null
        totalReviews: number | null
    } | null
    brand: string | null
    scrapedAt: string
}
