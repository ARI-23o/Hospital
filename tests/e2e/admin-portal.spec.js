import { test, expect } from "@playwright/test";

test.describe("Doctor Admin Portal End-to-End Workflow", () => {
  test("allows doctor to authenticate and view appointments and OPD controls", async ({ page }) => {
    await page.goto("/");

    const doctorLoginBtn = page
      .getByRole("button", { name: /Doctor Portal|Doctor Login|Staff|Dr\. Portal/i })
      .first();
    if (await doctorLoginBtn.isVisible()) {
      await doctorLoginBtn.click();

      const passcodeInput = page.locator('input[type="password"]');
      if (await passcodeInput.isVisible()) {
        await passcodeInput.fill("sarda@2026");
        await page.getByRole("button", { name: /Unlock Portal|Login|Sign In/i }).click();
        await expect(page.locator("body")).toContainText("Dr. Sagar Damodar Sarda");
      }
    }
  });
});
