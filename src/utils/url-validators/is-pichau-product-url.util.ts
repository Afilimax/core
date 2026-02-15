import { configHelper } from "../../helpers/config.helper"

export function isPichauProductUrl(url: string) {
    return configHelper.domains.pichau.some((domain) => url.includes(domain))
}
