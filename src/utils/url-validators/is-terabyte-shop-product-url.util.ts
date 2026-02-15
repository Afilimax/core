import { configHelper } from "../../helpers/config.helper"

export function isTerabyteShopProductUrl(url: string) {
    return configHelper.domains.terabyte_shop.some((domain) => url.includes(domain))
}
