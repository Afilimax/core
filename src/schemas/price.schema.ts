import { z } from "zod"

export const priceSchema = z.object({
    value: z.number(),
    originalValue: z.number().nullable(),
    currency: z.literal("BRL"),
    pixPrice: z.number().nullable(),
    installment: z
        .object({
            count: z.number(),
            value: z.number(),
        })
        .nullable(),
})
