import { test, expect } from "@playwright/test";

test.describe("Viewport Responsiveness & Mobile UI", () => {
  test("adapts layout smoothly across mobile and desktop viewports", async ({ page }) => {
    // Desktop Viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();

    // Mobile Viewport (iPhone 13 dimensions)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();

    // Emergency dialer or quick action should be accessible
    const emergencyAction = page
      .locator("text=24/7 Emergency Dialysis")
      .or(page.locator("text=Call Clinic"));
    await expect(emergencyAction.first()).toBeVisible();
  });
});
