export abstract class AffiliateProvider<TOptions> {
    abstract domains: string[]

    constructor(protected readonly options: TOptions) {}

    abstract name: string

    supportsUrl(url: string) {
        const hostname = new URL(url).hostname

        return this.domains.some(domain =>
            hostname === domain || hostname.endsWith(`.${domain}`)
        )
    }

    abstract createAffiliateUrl: (url: string) => Promise<string>
}