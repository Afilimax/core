<a href="https://afilimax.net"><img src="https://raw.githubusercontent.com/Afilimax/.github/main/assets/npm-banner.svg" alt="Afilimax — Encontre a oferta. Gere o link. Divulgue sozinho." width="100%" /></a>

[![npm version](https://img.shields.io/npm/v/%40afilimax%2Fcore?logo=npm)](https://www.npmjs.com/package/@afilimax/core)
[![npm downloads](https://img.shields.io/npm/dm/%40afilimax%2Fcore?logo=npm)](https://www.npmjs.com/package/@afilimax/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Afilimax/core/blob/HEAD/LICENSE)
[![Website](https://img.shields.io/badge/website-afilimax.net-7857FF)](https://afilimax.net)

# @afilimax/core

Este é o pacote core da Afilimax, ele é responsável por carregar nossas tipagens e enums que são compartilhados por outros pacotes do nosso ecossistema. Somos focados apenas no mercado brasileiro, então, este README é escrito em português.

## Instalação

```bash
npm install @afilimax/core
```

## Uso

```typescript
import { Marketplace, Price, Shipping, ScrapedProduct } from "@afilimax/core"

console.log(Marketplace.Amazon)

const product: ScrapedProduct = {
    marketplace: Marketplace.Amazon,
    title: "Produto",
    price: {
        value: 10,
        currency: "BRL"
    },
    shipping: {
        price: 2,
        currency: "BRL",
        freeShipping: true
    },
    rating: {
        average: 4,
        totalReviews: 10
    },
    availability: {
        inStock: true,
        quantity: 10
    },
    images: ["https://example.com/image.jpg"],
    thumbnails: ["https://example.com/thumbnail.jpg"],
    categories: ["Categoria"],
    features: {
        "Característica": "Valor"
    },
    specifications: {
        "Especificação": "Valor"
    },
    scrapedAt: new Date().toISOString()
}
```

### Validação de dados

```typescript
import { scrapedProductSchema, couponSchema, priceSchema, shippingSchema } from "@afilimax/core"

const product = scrapedProductSchema.parse({
    marketplace: "Amazon",
    title: "Produto",
    price: {
        value: 10,
        currency: "BRL"
    },
    shipping: {
        price: 2,
        currency: "BRL",
        freeShipping: true
    },
    rating: {
        average: 4,
        totalReviews: 10
    },
    availability: {
        inStock: true,
        quantity: 10
    },
    images: ["https://example.com/image.jpg"],
    thumbnails: ["https://example.com/thumbnail.jpg"],
    categories: ["Categoria"],
    features: {
        "Característica": "Valor"
    },
    specifications: {
        "Especificação": "Valor"
    },
    scrapedAt: new Date().toISOString()
})
```

### Provedores de Afiliados

O `AffiliateProvider` é uma classe abstrata fundamental para estender as capacidades de afiliação do ecossistema Afilimax.

```typescript
import { AffiliateProvider } from "@afilimax/core"

interface CustomOptions {
    trackingId: string
}

class MyProvider extends AffiliateProvider<CustomOptions> {
    name = "Meu Provedor"
    domains = ["loja-exemplo.com.br"]

    // Implementação obrigatória para gerar o link
    async createAffiliateUrl(url: string) {
        return `https://link-afiliado.com?id=${this.options.trackingId}&url=${url}`
    }
}

const provider = new MyProvider({ trackingId: "user-123" })

// Verifica se uma URL pertence ao provedor
if (provider.supportsUrl("https://loja-exemplo.com.br/item")) {
    const affiliateUrl = await provider.createAffiliateUrl("https://loja-exemplo.com.br/item")
    console.log(affiliateUrl)
}
```

### Gerenciamento de Provedores (Encadeamento)

O `AffiliateManager` permite agrupar múltiplos provedores e encontrar automaticamente o correto para uma determinada URL.

```typescript
import { AffiliateManager } from "@afilimax/core"

const manager = new AffiliateManager([
    new AmazonProvider(options),
    new ShopeeProvider(options),
    new MagaluProvider(options)
])

// O manager encontrará o provedor correto baseado nos domínios suportados.
// Caso nenhum provedor suporte a URL, retornará null.
const url = "https://www.amazon.com.br/dp/B088GHHR6K"
const affiliateUrl = await manager.createAffiliateUrl(url)

if (affiliateUrl) {
    console.log("URL de afiliado:", affiliateUrl)
}

// Você também pode adicionar novos provedores dinamicamente
manager.use(new CustomProvider())
```

## Licença

Este projeto está sob a licença MIT.
---

## Automatize sua operação de afiliados

> Use este pacote para automatizar sua operação de afiliados. Conheça a plataforma Afilimax e transforme ofertas em links e divulgação automática.

[Conheça a Afilimax](https://afilimax.net) · [Pacote no npm](https://www.npmjs.com/package/@afilimax/core) · [Repositório no GitHub](https://github.com/Afilimax/core)
