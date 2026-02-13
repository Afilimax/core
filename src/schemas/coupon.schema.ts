import { z } from "zod"

export const couponSchema = z.object({
    value: z.string(),
    feature: z.string().nullable(),
})
