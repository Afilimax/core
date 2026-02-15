import { Marketplace } from "../enums"

export const configHelper = {
    domains: {
        [Marketplace.Amazon]: ["amazon.com", "amazon.com.br", "amzn.to", "a.co"],
        [Marketplace.MercadoLivre]: ["mercadolivre.com.br", "mercadolivre.com"],
        [Marketplace.Shopee]: ["shopee.com.br", "shopee.com"],
        [Marketplace.AliExpress]: ["aliexpress.com"],
        [Marketplace.MagazineLuiza]: ["magazineluiza.com.br", "magazinevoce.com.br", "magazineluiza.onelink.me"],
        [Marketplace.Kabum]: ["kabum.com.br"],
        [Marketplace.TerabyteShop]: ["terabyteshop.com.br"],
        [Marketplace.Pichau]: ["pichau.com.br"],
        [Marketplace.Americanas]: ["americanas.com.br"],
        [Marketplace.Temu]: ["temu.com"],
    } satisfies Record<Marketplace, string[]>,
}
