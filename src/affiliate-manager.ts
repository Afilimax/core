import { AffiliateProvider } from "./interfaces/affiliate-provider.interface"

export class AffiliateManager {
    constructor(private readonly providers: AffiliateProvider<any>[]) {}

    /**
     * Encontra o primeiro provedor que suporta a URL fornecida.
     */
    findProvider(url: string): AffiliateProvider<any> | undefined {
        return this.providers.find((provider) => provider.supportsUrl(url))
    }

    /**
     * Cria uma URL de afiliado usando o primeiro provedor compatível encontrado.
     * Caso nenhum provedor seja encontrado, retorna null.
     */
    async createAffiliateUrl(url: string): Promise<string | null> {
        const provider = this.findProvider(url)

        if (!provider) {
            return null
        }

        return provider.createAffiliateUrl(url)
    }

    /**
     * Adiciona um provedor ao início da cadeia.
     */
    use(provider: AffiliateProvider<any>) {
        this.providers.unshift(provider)
        return this
    }
}
