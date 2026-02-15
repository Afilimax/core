import { configHelper } from "../../helpers/config.helper"

export function isAmericanasProductUrl(url: string) {
    return configHelper.domains.americanas.some((domain) => url.includes(domain))
}
