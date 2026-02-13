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

## Licença

Este projeto está sob a licença MIT.
