import { configHelper } from "../../helpers/config.helper"

export function isTemuProductUrl(url: string) {
    return configHelper.domains.temu.some((domain) => url.includes(domain))
}
