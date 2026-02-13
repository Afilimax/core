export interface Price {
    value: number
    originalValue: number | null
    currency: "BRL"
    pixPrice: number | null
    installment: {
        count: number
        value: number
    } | null
}
