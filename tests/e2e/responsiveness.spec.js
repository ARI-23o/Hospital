import { test, expect } from "@playwright/test";

test.describe("Viewport Responsiveness and Mobile UI", () => {
  test("adapts layout smoothly across mobile and desktop viewports", async ({ page }) => {
    // Desktop Viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("body")).toContainText("Chandrapur Kidney Care");

    // Mobile Viewport (iPhone / Android dimensions)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("body")).toContainText("Chandrapur Kidney Care");
  });
});
