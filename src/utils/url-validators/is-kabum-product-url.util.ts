import { configHelper } from "../../helpers/config.helper"

export function isKabumProductUrl(url: string) {
    return configHelper.domains.kabum.some((domain) => url.includes(domain))
}
