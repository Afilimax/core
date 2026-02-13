export interface Shipping {
    price: number | null
    currency: "BRL"
    freeShipping: boolean | null
    full: boolean | null
    prime: boolean | null
    estimatedTime: string | null
}
