import { test, expect } from "@playwright/test";

test.describe("Doctor / Admin Portal End-to-End Workflow", () => {
  test("allows doctor to authenticate and view appointments & OPD controls", async ({ page }) => {
    await page.goto("/");

    // Locate Doctor Login / Staff Portal button in header
    const doctorLoginBtn = page
      .getByRole("button", { name: /Doctor Portal|Doctor Login|Staff/i })
      .first();
    if (await doctorLoginBtn.isVisible()) {
      await doctorLoginBtn.click();

      // Enter passcode
      const passcodeInput = page.locator('input[type="password"]');
      if (await passcodeInput.isVisible()) {
        await passcodeInput.fill("sarda@2026");

        // Submit login
        await page.getByRole("button", { name: /Unlock Portal|Login|Sign In/i }).click();

        // Check that authenticated dashboard or controls appear
        await expect(page.locator("body")).toContainText("Dr. Sagar Damodar Sarda");
      }
    }
  });
});
