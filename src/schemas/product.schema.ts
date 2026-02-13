import { z } from "zod"

import { shippingSchema } from "./shipping.schema"
import { couponSchema } from "./coupon.schema"
import { priceSchema } from "./price.schema"
import { Marketplace } from "../enums"

export const scrapedProductSchema = z.object({
    marketplace: z.enum(Marketplace),
    externalId: z.string().nullable(),
    title: z.string(),
    description: z.string().nullable(),
    brand: z.string().nullable(),
    price: priceSchema,
    shipping: shippingSchema.nullable(),
    rating: z.object({
        average: z.number(),
        totalReviews: z.number().nullable(),
    }),
    availability: z.object({
        inStock: z.boolean(),
        quantity: z.number().nullable(),
    }),
    images: z.array(z.string()),
    thumbnails: z.array(z.string()).nullable(),
    categories: z.array(z.string()).nullable(),
    features: z.record(z.string(), z.string()).nullable(),
    specifications: z.record(z.string(), z.string()).nullable(),
    coupons: z.array(couponSchema).nullable(),
    scrapedAt: z.string(),
})
