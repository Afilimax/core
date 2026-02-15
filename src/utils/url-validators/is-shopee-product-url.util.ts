import { configHelper } from "../../helpers/config.helper"

export function isShopeeProductUrl(url: string) {
    const domainPattern = configHelper.domains.shopee.join("|")

    const shopeeRegex = new RegExp(
        `^https?://(?:www\\.|s\\.)?(?:${domainPattern})/(?:.+-)?i\\.\\d+\\.\\d+|^https://shp\\.ee/[\\w\\d]+`,
        "i"
    )

    return shopeeRegex.test(url)
}
