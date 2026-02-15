import { configHelper } from "../../helpers/config.helper"

export function isAliExpressProductUrl(url: string) {
    return configHelper.domains.aliexpress.some((domain) => url.includes(domain))
}
