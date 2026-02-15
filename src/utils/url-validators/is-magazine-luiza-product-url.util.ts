import { configHelper } from "../../helpers/config.helper"

export function isMagazineLuizaProductUrl(url: string) {
    const domainPattern = configHelper.domains.magazine_luiza.join("|")

    const magazineLuizaRegex = new RegExp(`^https?://(?:www\\.)?(?:${domainPattern})/(?:.+)?`, "i")

    return magazineLuizaRegex.test(url)
}
