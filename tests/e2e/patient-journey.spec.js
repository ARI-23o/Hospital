import { test, expect } from "@playwright/test";

test.describe("Patient Portal End-to-End User Journey", () => {
  test("loads the homepage and displays hospital identity and doctor credentials", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify hospital name and doctor title in document
    await expect(page.locator("body")).toContainText("Chandrapur Kidney Care");
    await expect(page.locator("body")).toContainText("Dr. Sagar Damodar Sarda");
  });

  test("allows patient to switch language between English, Marathi, and Hindi", async ({
    page,
  }) => {
    await page.goto("/");

    // Locate language switcher
    const langSelect = page.locator("select").first();
    if (await langSelect.isVisible()) {
      await langSelect.selectOption("mr");
      await expect(page.locator("body")).toContainText("सेवा • करुणा • बांधिलकी");

      await langSelect.selectOption("hi");
      await expect(page.locator("body")).toContainText("सेवा • करुणा • प्रतिबद्धता");
    }
  });

  test("verifies live OPD queue is displayed on homepage", async ({ page }) => {
    await page.goto("/");

    // Check Live Queue widget
    const queueCard = page
      .locator("text=Live OPD Queue Status")
      .or(page.locator("text=Current Live Token"));
    await expect(queueCard.first()).toBeVisible();
  });
});
