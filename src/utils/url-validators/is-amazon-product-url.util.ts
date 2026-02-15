import { configHelper } from "../../helpers/config.helper"

export function isAmazonProductUrl(url: string) {
    const domainPattern = configHelper.domains.amazon.join("|")

    const amazonProductRegex = new RegExp(
        `https?://(?:www\\.)?(?:${domainPattern})/(?:.+/)?(?:gp/product|dp|exec/obidos/tg/detail|gp/aw/d|gp/offer-listing|d)/[\\w\\d]+|https://amzn\\.to/[\\w\\d]+`,
        "i",
    )

    return amazonProductRegex.test(url)
}
