import { Shipping } from "./shipping.interface"
import { Coupon } from "./coupon.interface"
import { Price } from "./price.interface"
import { Marketplace } from "../enums"

export interface ScrapedProduct {
    marketplace: Marketplace
    externalId: string | null
    title: string
    description: string | null
    brand: string | null
    price: Price
    shipping: Shipping | null
    rating: {
        average: number
        totalReviews: number | null
    }
    availability: {
        inStock: boolean
        quantity: number | null
    }
    images: string[]
    thumbnails: string[] | null
    categories: string[] | null
    features: Record<string, string> | null
    specifications: Record<string, string> | null
    coupons: Coupon[] | null
    scrapedAt: string
}
