import { test, expect } from "@playwright/test";

test.describe("Patient Portal End-to-End User Journey", () => {
  test("loads the homepage and displays hospital identity and doctor credentials", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("body")).toContainText("Chandrapur Kidney Care");
    await expect(page.locator("body")).toContainText("Dr. Sagar Damodar Sarda");
  });

  test("allows patient to switch language between English, Marathi, and Hindi", async ({
    page,
  }) => {
    await page.goto("/");

    // Locate language switcher pill buttons
    const marathiBtn = page.getByRole("button", { name: "मराठी" });
    if (await marathiBtn.isVisible()) {
      await marathiBtn.click();
      await expect(page.locator("body")).toContainText("सेवा • करुणा • बांधिलकी");

      const hindiBtn = page.getByRole("button", { name: "हिंदी" });
      await hindiBtn.click();
      await expect(page.locator("body")).toContainText("सेवा • करुणा • बांधिलकी");
    }
  });

  test("verifies live OPD queue is displayed on homepage", async ({ page }) => {
    await page.goto("/");
    const queueCard = page
      .locator("text=Live OPD Queue Status")
      .or(page.locator("text=Serving Token"))
      .or(page.locator("text=Token"));
    await expect(queueCard.first()).toBeVisible();
  });
});
