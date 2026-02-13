export interface Price {
    value: number
    originalValue?: number
    currency: "BRL"
    pixPrice?: number
    installment?: {
        count: number
        value: number
    }
}
