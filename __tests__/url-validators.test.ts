import { describe, expect, it } from "vitest"

import {
    isAliExpressProductUrl,
    isAmazonProductUrl,
    isAmericanasProductUrl,
    isKabumProductUrl,
    isMagazineLuizaProductUrl,
    isPichauProductUrl,
    isShopeeProductUrl,
    isTemuProductUrl,
    isTerabyteShopProductUrl,
    isValidProductUrl,
} from "../src"
import { isMercadoLivreProductUrl } from "../src/utils/url-validators/is-mercado-livre-product-url.util"

describe("url validators", () => {
    it.each([
        ["amazon", isAmazonProductUrl, "https://www.amazon.com.br/produto/dp/B08N5WRWNW", "https://www.amazon.com.br/"],
        ["amazon short link", isAmazonProductUrl, "https://amzn.to/3abcDEF", "https://example.com/dp/123"],
        ["aliexpress", isAliExpressProductUrl, "https://pt.aliexpress.com/item/1.html", "https://example.com"],
        ["shopee", isShopeeProductUrl, "https://shopee.com.br/produto-i.123.456", "https://shopee.com.br/"],
        ["shopee short link", isShopeeProductUrl, "https://shp.ee/abc123", "https://shp.ee/"],
        ["terabyte", isTerabyteShopProductUrl, "https://www.terabyteshop.com.br/produto/1", "https://example.com"],
        ["kabum", isKabumProductUrl, "https://www.kabum.com.br/produto/1", "https://example.com"],
        ["pichau", isPichauProductUrl, "https://www.pichau.com.br/produto", "https://example.com"],
        ["temu", isTemuProductUrl, "https://www.temu.com/produto.html", "https://example.com"],
        ["magalu", isMagazineLuizaProductUrl, "https://www.magazineluiza.com.br/p/123", "https://example.com/p"],
        ["americanas", isAmericanasProductUrl, "https://www.americanas.com.br/produto/1", "https://example.com"],
        [
            "mercado livre",
            isMercadoLivreProductUrl,
            "https://produto.mercadolivre.com.br/MLB-1234567890-item",
            "https://www.mercadolivre.com.br/",
        ],
    ])("%s", (_name, validator, valid, invalid) => {
        expect(validator(valid)).toBe(true)
        expect(validator(invalid)).toBe(false)
    })

    it("isValidProductUrl accepts a url from any supported marketplace", () => {
        const urls = [
            "https://www.amazon.com.br/produto/dp/B08N5WRWNW",
            "https://pt.aliexpress.com/item/1.html",
            "https://shopee.com.br/produto-i.123.456",
            "https://www.terabyteshop.com.br/produto/1",
            "https://www.kabum.com.br/produto/1",
            "https://www.pichau.com.br/produto",
            "https://www.temu.com/produto.html",
            "https://www.magazineluiza.com.br/p/123",
            "https://www.americanas.com.br/produto/1",
        ]

        for (const url of urls) {
            expect(isValidProductUrl(url)).toBe(true)
        }
    })

    it("isValidProductUrl rejects unsupported urls", () => {
        expect(isValidProductUrl("https://example.com/produto")).toBe(false)
    })
})
