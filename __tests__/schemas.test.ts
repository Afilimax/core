import { describe, expect, it } from "vitest"

import { Marketplace, couponSchema, priceSchema, scrapedProductSchema, shippingSchema } from "../src"

const product = {
    marketplace: Marketplace.Amazon,
    externalId: "B08N5WRWNW",
    title: "Produto",
    description: null,
    brand: null,
    price: { value: 10, originalValue: null, currency: "BRL", pixPrice: null, installment: null },
    shipping: null,
    rating: { average: 4.5, totalReviews: null },
    availability: { inStock: true, quantity: null },
    images: [],
    thumbnails: null,
    categories: null,
    features: null,
    specifications: null,
    coupons: null,
    scrapedAt: new Date().toISOString(),
}

describe("schemas", () => {
    it("parses a valid product", () => {
        expect(scrapedProductSchema.safeParse(product).success).toBe(true)
    })

    it("rejects an unknown marketplace", () => {
        expect(scrapedProductSchema.safeParse({ ...product, marketplace: "nope" }).success).toBe(false)
    })

    it("parses price, shipping and coupon", () => {
        expect(
            priceSchema.safeParse({
                value: 1,
                originalValue: 2,
                currency: "BRL",
                pixPrice: 0.9,
                installment: { count: 2, value: 0.5 },
            }).success,
        ).toBe(true)
        expect(priceSchema.safeParse({ ...product.price, currency: "USD" }).success).toBe(false)
        expect(
            shippingSchema.safeParse({
                price: 0,
                currency: "BRL",
                freeShipping: true,
                full: false,
                prime: false,
                estimatedTime: "2 dias",
            }).success,
        ).toBe(true)
        expect(couponSchema.safeParse({ value: "CUPOM10", feature: null }).success).toBe(true)
    })
})
