import { Shipping } from "./shipping.interface"
import { Price } from "./price.interface"
import { Marketplace } from "../enums"

export interface ScrapedProduct {
    marketplace: Marketplace
    externalId?: string
    title: string
    description?: string
    brand?: string
    price: Price
    shipping?: Shipping
    rating?: {
        average: number
        totalReviews?: number
    }
    availability: {
        inStock: boolean
        quantity?: number
    }
    images: string[]
    thumbnails?: string[]
    categories?: string[]
    features?: Record<string, string>
    specifications?: Record<string, string>
    scrapedAt: string
}
