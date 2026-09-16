import { describe, it, expect } from "vitest";
import { fullFaqsList } from "../../client/src/data/faqsData.js";

describe("FAQs Data Dictionary", () => {
  it("should contain distinct Nephrology and Urology FAQ sets", () => {
    expect(fullFaqsList).toBeDefined();
    expect(Array.isArray(fullFaqsList)).toBe(true);
    expect(fullFaqsList.length).toBeGreaterThan(0);

    fullFaqsList.forEach((item) => {
      expect(item).toHaveProperty("q");
      expect(item).toHaveProperty("a");
      expect(item).toHaveProperty("category");
      expect(["nephrology", "urology"]).toContain(item.category);
    });
  });

  it("should contain kidney and dialysis specific FAQs", () => {
    const allQuestions = fullFaqsList.map((f) => f.q.toLowerCase()).join(" ");
    expect(allQuestions).toMatch(/dialysis|kidney|nephrol/i);
  });
});
