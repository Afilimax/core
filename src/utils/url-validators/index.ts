import { isMagazineLuizaProductUrl } from "./is-magazine-luiza-product-url.util"
import { isTerabyteShopProductUrl } from "./is-terabyte-shop-product-url.util"
import { isAmericanasProductUrl } from "./is-americanas-product-url.util"
import { isAliExpressProductUrl } from "./is-aliexpress-product-url.util"
import { isShopeeProductUrl } from "./is-shopee-product-url.util"
import { isPichauProductUrl } from "./is-pichau-product-url.util"
import { isAmazonProductUrl } from "./is-amazon-product-url.util"
import { isKabumProductUrl } from "./is-kabum-product-url.util"
import { isTemuProductUrl } from "./is-temu-product-url.util"

export * from "./is-amazon-product-url.util"
export * from "./is-aliexpress-product-url.util"
export * from "./is-shopee-product-url.util"
export * from "./is-terabyte-shop-product-url.util"
export * from "./is-kabum-product-url.util"
export * from "./is-pichau-product-url.util"
export * from "./is-temu-product-url.util"
export * from "./is-magazine-luiza-product-url.util"
export * from "./is-americanas-product-url.util"

export function isValidProductUrl(url: string) {
    return (
        isAmazonProductUrl(url) ||
        isAliExpressProductUrl(url) ||
        isShopeeProductUrl(url) ||
        isTerabyteShopProductUrl(url) ||
        isKabumProductUrl(url) ||
        isPichauProductUrl(url) ||
        isTemuProductUrl(url) ||
        isMagazineLuizaProductUrl(url) ||
        isAmericanasProductUrl(url)
    )
}
