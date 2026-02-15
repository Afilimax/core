import { configHelper } from "../../helpers/config.helper"

export function isMercadoLivreProductUrl(url: string) {
    const domainPattern = configHelper.domains.mercado_livre.join("|")

    const mercadoLivreProductRegex = new RegExp(
        `^https?://(?:www\\.|lista\\.|produto\\.)?(?:${domainPattern})/(?:[^/]+/)?(ML[AB]-?\\d{7,}|p/[\\w\\d]+|sec/[\\w\\d]+)`,
        "i",
    )

    return mercadoLivreProductRegex.test(url)
}
