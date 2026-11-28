<a href="https://afilimax.net"><img src="https://raw.githubusercontent.com/Afilimax/.github/main/assets/npm-banner.svg" alt="Afilimax — Encontre a oferta. Gere o link. Divulgue sozinho." width="100%" /></a>

[![npm version](https://img.shields.io/npm/v/%40afilimax%2Fcore?logo=npm)](https://www.npmjs.com/package/@afilimax/core)
[![npm downloads](https://img.shields.io/npm/dm/%40afilimax%2Fcore?logo=npm)](https://www.npmjs.com/package/@afilimax/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Afilimax/core/blob/HEAD/LICENSE)
[![Website](https://img.shields.io/badge/website-afilimax.net-7857FF)](https://afilimax.net)

# @afilimax/core

Contratos compartilhados do ecossistema Afilimax. O pacote reúne tipos de produtos, enumeração de marketplaces, schemas de validação, validadores de URL e as abstrações usadas para conectar provedores de afiliados.

## Recursos

- Interfaces TypeScript para produtos completos e resultados resumidos de pesquisa.
- Contratos de preço, frete, disponibilidade, avaliação e cupons.
- Schemas Zod para validar dados de produtos em tempo de execução.
- Enum `Marketplace` com identificadores estáveis das lojas.
- Validadores de URLs de produto para os marketplaces suportados.
- Classe abstrata `AffiliateProvider` para implementar novos provedores.
- `AffiliateManager` para selecionar automaticamente o provedor compatível com uma URL.

## Instalação

```bash
npm install @afilimax/core
```

O pacote inclui as declarações TypeScript e usa Zod para as validações.

## Como usar

### Definir e validar um produto

```typescript
import { Marketplace, scrapedProductSchema, type ScrapedProduct } from "@afilimax/core"

const product: ScrapedProduct = {
    marketplace: Marketplace.Amazon,
    externalId: "B0D1VHJVS9",
    title: "Wireless Gaming Mouse",
    description: "Wireless mouse with programmable buttons",
    brand: "Example Brand",
    price: {
        value: 149.9,
        originalValue: 199.9,
        currency: "BRL",
        pixPrice: 139.9,
        installment: { count: 3, value: 49.97 },
    },
    shipping: {
        price: 0,
        currency: "BRL",
        freeShipping: true,
        full: null,
        prime: true,
        estimatedTime: null,
    },
    rating: { average: 4.8, totalReviews: 325 },
    availability: { inStock: true, quantity: null },
    images: ["https://example.com/product.jpg"],
    thumbnails: ["https://example.com/thumbnail.jpg"],
    categories: ["Computers", "Accessories"],
    features: { Connection: "Wireless" },
    specifications: { Color: "Black" },
    coupons: [{ value: "SAVE10", feature: null }],
    scrapedAt: new Date().toISOString(),
}

const validatedProduct = scrapedProductSchema.parse(product)

console.log("Validated product:", validatedProduct.title)
```

O schema lança um erro do Zod quando algum campo não obedece ao contrato.

### Criar um provedor de afiliados

```typescript
import { AffiliateProvider } from "@afilimax/core"

interface CustomProviderOptions {
    trackingId: string
}

class CustomProvider extends AffiliateProvider<CustomProviderOptions> {
    readonly name = "Custom Store"
    readonly domains = ["store.example.com"]

    async createAffiliateUrl(url: string): Promise<string> {
        const affiliateUrl = new URL(url)
        affiliateUrl.searchParams.set("tracking_id", this.options.trackingId)

        return affiliateUrl.toString()
    }
}

const provider = new CustomProvider({ trackingId: "your-tracking-id" })
const affiliateUrl = await provider.createAffiliateUrl("https://store.example.com/products/123")

console.log("Affiliate URL:", affiliateUrl)
```

### Selecionar provedores com AffiliateManager

```typescript
import { AffiliateManager } from "@afilimax/core"

const manager = new AffiliateManager([provider])
const affiliateUrl = await manager.createAffiliateUrl("https://store.example.com/products/123")

if (affiliateUrl) {
    console.log("Affiliate URL:", affiliateUrl)
} else {
    console.log("No provider supports this URL")
}
```

O gerenciador usa o primeiro provedor compatível. O método `use` adiciona outro provedor no início da lista e permite encadear chamadas.

## Configuração

O pacote não exige credenciais nem variáveis de ambiente. As opções específicas ficam nos provedores que estendem `AffiliateProvider`.

O objeto `configHelper.domains` reúne os domínios conhecidos por marketplace:

```typescript
import { configHelper, Marketplace } from "@afilimax/core"

const amazonDomains = configHelper.domains[Marketplace.Amazon]

console.log("Amazon domains:", amazonDomains)
```

## Referência da API

### Contratos de dados

| Exportação | Finalidade |
| :--- | :--- |
| `ScrapedProduct` | Produto completo extraído de um marketplace. |
| `ScrapedProductPreview` | Resultado resumido de uma pesquisa de produtos. |
| `Price` | Preço atual, preço original, valor no Pix e parcelamento. |
| `Shipping` | Valor, moeda e características do frete. |
| `Coupon` | Código do cupom e característica opcional associada. |
| `Marketplace` | Identificadores dos marketplaces conhecidos. |

Os schemas `scrapedProductSchema`, `priceSchema`, `shippingSchema` e `couponSchema` validam os respectivos contratos com Zod.

### `AffiliateProvider<TOptions>`

Classe abstrata para provedores de afiliados.

| Membro | Tipo | Descrição |
| :--- | :--- | :--- |
| `name` | `string` | Nome do provedor; deve ser implementado pela subclasse. |
| `domains` | `string[]` | Domínios aceitos; deve ser implementado pela subclasse. |
| `supportsUrl(url)` | `boolean` | Verifica o hostname e seus subdomínios. |
| `createAffiliateUrl(url)` | `Promise<string>` | Gera o link; deve ser implementado pela subclasse. |

`supportsUrl` usa o construtor `URL` do JavaScript e, portanto, espera uma URL válida.

### `AffiliateManager`

| Método | Retorno | Descrição |
| :--- | :--- | :--- |
| `new AffiliateManager(providers)` | `AffiliateManager` | Recebe a lista inicial de provedores. |
| `findProvider(url)` | `AffiliateProvider \| undefined` | Retorna o primeiro provedor compatível. |
| `createAffiliateUrl(url)` | `Promise<string \| null>` | Gera o link ou retorna `null` sem provedor compatível. |
| `use(provider)` | `AffiliateManager` | Insere o provedor no início da lista e retorna o gerenciador. |

### Validadores de URL

`isValidProductUrl(url)` verifica os padrões conhecidos de Amazon, AliExpress, Shopee, Terabyte, KaBuM!, Pichau, Temu, Magazine Luiza e Americanas. Também são exportados validadores individuais, como `isAmazonProductUrl` e `isAliExpressProductUrl`.

```typescript
import { isAmazonProductUrl, isValidProductUrl } from "@afilimax/core"

const url = "https://www.amazon.com.br/dp/B0D1VHJVS9/"

console.log("Amazon product:", isAmazonProductUrl(url))
console.log("Known product URL:", isValidProductUrl(url))
```

## Desenvolvimento

Instale as dependências com `npm install`. Os scripts disponíveis são:

| Comando | Finalidade |
| :--- | :--- |
| `npm run dev` | Executa `src/index.ts` com `ts-node`. |
| `npm run build` | Compila o TypeScript para `dist/`. |
| `npm test` | Executa os testes uma vez com Vitest. |
| `npm run test:watch` | Executa os testes em modo de observação. |
| `npm run test:cov` | Executa os testes com cobertura. |
| `npm run lint` | Executa o ESLint com correção automática. |
| `npm run format` | Formata os arquivos de `src/` com Prettier. |

## Licença

Distribuído sob a licença [MIT](./LICENSE).

---

## Automatize sua operação de afiliados

> Use este pacote para automatizar sua operação de afiliados. Conheça a plataforma Afilimax e transforme ofertas em links e divulgação automática.

[Conheça a Afilimax](https://afilimax.net) · [Pacote no npm](https://www.npmjs.com/package/@afilimax/core) · [Repositório no GitHub](https://github.com/Afilimax/core)
