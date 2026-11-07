import { describe, expect, it, vi } from "vitest"

import { AffiliateManager, AffiliateProvider } from "../src"

class FakeProvider extends AffiliateProvider<{ tag: string }> {
    readonly name: string
    readonly domains: string[]

    constructor(name: string, domains: string[]) {
        super({ tag: name })
        this.name = name
        this.domains = domains
    }

    createAffiliateUrl = vi.fn(async (url: string) => `${url}?tag=${this.options.tag}`)
}

describe("AffiliateProvider.supportsUrl", () => {
    const provider = new FakeProvider("shop", ["example.com"])

    it("accepts the exact domain", () => {
        expect(provider.supportsUrl("https://example.com/item")).toBe(true)
    })

    it("accepts subdomains", () => {
        expect(provider.supportsUrl("https://www.example.com/item")).toBe(true)
    })

    it("rejects lookalike domains", () => {
        expect(provider.supportsUrl("https://notexample.com/item")).toBe(false)
        expect(provider.supportsUrl("https://example.com.evil.io/item")).toBe(false)
    })
})

describe("AffiliateManager", () => {
    it("finds the first provider that supports the url", () => {
        const a = new FakeProvider("a", ["a.com"])
        const b = new FakeProvider("b", ["b.com"])
        const manager = new AffiliateManager([a, b])

        expect(manager.findProvider("https://b.com/x")).toBe(b)
        expect(manager.findProvider("https://c.com/x")).toBeUndefined()
    })

    it("creates an affiliate url with the matching provider", async () => {
        const a = new FakeProvider("a", ["a.com"])
        const manager = new AffiliateManager([a])

        await expect(manager.createAffiliateUrl("https://a.com/x")).resolves.toBe("https://a.com/x?tag=a")
        expect(a.createAffiliateUrl).toHaveBeenCalledWith("https://a.com/x")
    })

    it("returns null when no provider supports the url", async () => {
        const manager = new AffiliateManager([new FakeProvider("a", ["a.com"])])

        await expect(manager.createAffiliateUrl("https://z.com/x")).resolves.toBeNull()
    })

    it("use() puts the provider at the start of the chain and is chainable", async () => {
        const first = new FakeProvider("first", ["a.com"])
        const override = new FakeProvider("override", ["a.com"])
        const manager = new AffiliateManager([first])

        expect(manager.use(override)).toBe(manager)
        await expect(manager.createAffiliateUrl("https://a.com/x")).resolves.toBe("https://a.com/x?tag=override")
    })
})
