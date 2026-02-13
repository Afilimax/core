import { z } from "zod"

export const shippingSchema = z.object({
    price: z.number().nullable(),
    currency: z.literal("BRL"),
    freeShipping: z.boolean().nullable(),
    full: z.boolean().nullable(),
    prime: z.boolean().nullable(),
    estimatedDays: z.number().nullable(),
})
