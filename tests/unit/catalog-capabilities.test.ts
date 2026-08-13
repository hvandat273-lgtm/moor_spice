import { afterEach, describe, expect, it, vi } from "vitest";

import { getCatalogBackend, getPublicSiteUrl, isCommerceEnabled, isSiteIndexingEnabled } from "@/lib/server/env";

describe("catalog capabilities", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("defaults local development and tests to local JSON", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("DEPLOYMENT_MODE", "catalog");
    delete process.env.CATALOG_BACKEND;
    delete process.env.DATABASE_URL;
    delete process.env.VERCEL;
    expect(getCatalogBackend()).toBe("local-json");
  });

  it("uses the read-only bundled catalogue on Vercel when storage is not configured", () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("DEPLOYMENT_MODE", "catalog");
    delete process.env.CATALOG_BACKEND;
    delete process.env.DATABASE_URL;
    expect(getCatalogBackend()).toBe("bundled-json");
  });

  it("never enables commerce for a JSON catalog", () => {
    vi.stubEnv("DEPLOYMENT_MODE", "catalog");
    vi.stubEnv("CATALOG_BACKEND", "vercel-blob");
    delete process.env.DATABASE_URL;
    expect(isCommerceEnabled()).toBe(false);
  });

  it("never enables commerce even when legacy database variables are present", () => {
    vi.stubEnv("DEPLOYMENT_MODE", "production");
    vi.stubEnv("CATALOG_BACKEND", "postgres");
    vi.stubEnv("DATABASE_URL", "postgresql://example.invalid/moor_spice");
    vi.stubEnv("COMMERCIAL_HOSTING_CONFIRMED", "true");
    expect(isCommerceEnabled()).toBe(false);
  });

  it("only enables search indexing through an explicit HTTPS configuration", () => {
    vi.stubEnv("SITE_INDEXING_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
    expect(isSiteIndexingEnabled()).toBe(false);
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://moor-spice.example");
    expect(isSiteIndexingEnabled()).toBe(true);
  });

  it("derives the public URL from Vercel when no custom URL is configured", () => {
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "moon-spice.example");
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getPublicSiteUrl().origin).toBe("https://moon-spice.example");
  });
});
