import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

async function gotoWithNavigationRetry(page: Page, route: string) {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await page.goto(route, { waitUntil: "load" });
      return;
    } catch (error) {
      lastError = error;
      if (!(error instanceof Error) || !/ERR_ABORTED|interrupted by another navigation/.test(error.message)) throw error;
      await page.waitForTimeout(150);
    }
  }
  throw lastError;
}

async function expectNoSeriousAccessibilityViolations(page: Page) {
  await page.addScriptTag({ path: path.join(process.cwd(), "node_modules", "axe-core", "axe.min.js") });
  const violations = await page.evaluate(async () => {
    const axe = (window as typeof window & {
      axe: {
        run: (root: Document) => Promise<{
          violations: Array<{ id: string; impact: string | null; nodes: Array<{ target: unknown }> }>;
        }>;
      };
    }).axe;
    const result = await axe.run(document);
    return result.violations
      .filter((violation) => violation.impact === "critical" || violation.impact === "serious")
      .map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map((node) => node.target) }));
  });
  expect(violations).toEqual([]);
}

test("empty catalog presents the official storefront without demo commerce", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "商品情報を準備しています" })).toBeVisible();
  await expect(page.getByRole("link", { name: "お問い合わせ" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "商品一覧" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /カートを開く/ })).toHaveCount(0);
  await expect(page.getByText(/デモ|demo/i)).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText(/顧客|電話番号|お届け先/);
});

test("retired product collection redirects to the truthful official catalog", async ({ page }) => {
  await page.goto("/products");

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1, name: "商品情報を準備しています" })).toBeVisible();
  await expect(page.locator('a[href^="/products/"]')).toHaveCount(0);
  await expect(page.getByText(/イタリアンスパイス OF NO3|ガーリックハーブミックス/)).toHaveCount(0);
});

test("legacy commerce routes are removed", async ({ page, request }) => {
  for (const route of ["/cart", "/checkout", "/track-order", "/order-success/MSP-20260812-ABC123"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  }
  expect((await request.post("/api/orders", { data: {} })).status()).toBe(404);
  expect((await request.post("/api/checkout/quote", { data: {} })).status()).toBe(404);
});

test("key catalog pages have no serious accessibility violations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Desktop Chromium covers the semantic audit.");
  for (const route of ["/", "/products", "/contact", "/recipes"]) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expectNoSeriousAccessibilityViolations(page);
  }
});

test("mobile navigation closes when tapping outside", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const openMenu = page.getByRole("button", { name: "メニューを開く" });
  await openMenu.click();
  await expect(page.getByRole("navigation", { name: "モバイルナビゲーション" })).toBeVisible();

  await page.locator("main").click({ position: { x: 380, y: 200 } });
  await expect(page.getByRole("navigation", { name: "モバイルナビゲーション" })).toHaveCount(0);
  await expect(openMenu).toBeVisible();
});

test("clicking the current navigation item returns to the top", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 500 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await page
    .getByRole("navigation", { name: "メインナビゲーション" })
    .getByRole("link", { name: "ホーム" })
    .click();

  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(0);
});

test("storefront does not overflow at required responsive widths", async ({ page }, testInfo) => {
  test.setTimeout(150_000);
  test.skip(testInfo.project.name !== "chromium", "One browser project covers the viewport matrix.");

  for (const route of [
    "/",
    "/products",
    "/about",
    "/recipes",
    "/recipes/pasta-magic-aglio-olio",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/admin/login",
  ]) {
    await gotoWithNavigationRetry(page, route);
    await expect(route.startsWith("/admin") ? page.locator("form") : page.locator("main")).toBeVisible();
    for (const viewport of [
      { width: 320, height: 568 },
      { width: 360, height: 800 },
      { width: 390, height: 844 },
      { width: 430, height: 932 },
      { width: 576, height: 900 },
      { width: 768, height: 1024 },
      { width: 1024, height: 1366 },
      { width: 1122, height: 1402 },
      { width: 1440, height: 1200 },
    ]) {
      await page.setViewportSize(viewport);
      await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${route} overflows at ${viewport.width}px`).toBeLessThanOrEqual(1);
    }
  }
});
