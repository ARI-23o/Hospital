import { describe, it, expect } from "vitest";

// Pure function implementation of CKD-EPI Formula used in KidneyHealthCalculator
export function calculateCKDEPI({ creatinine, age, gender }) {
  const scr = parseFloat(creatinine);
  const a = parseFloat(age);
  if (!scr || !a || scr <= 0 || a <= 0) return null;

  const k = gender === "female" ? 0.7 : 0.9;
  const alpha = gender === "female" ? -0.241 : -0.302;
  const genderFactor = gender === "female" ? 1.012 : 1.0;

  const minRatio = Math.min(scr / k, 1);
  const maxRatio = Math.max(scr / k, 1);

  let egfr =
    142 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.2) * Math.pow(0.9938, a) * genderFactor;
  egfr = Math.round(egfr);

  let stage = "";
  if (egfr >= 90) stage = "Stage 1";
  else if (egfr >= 60) stage = "Stage 2";
  else if (egfr >= 45) stage = "Stage 3A";
  else if (egfr >= 30) stage = "Stage 3B";
  else if (egfr >= 15) stage = "Stage 4";
  else stage = "Stage 5";

  return { egfr, stage };
}

describe("Kidney Function (eGFR) Calculator Logic", () => {
  it("should calculate Stage 1 normal function for healthy young male", () => {
    const result = calculateCKDEPI({ creatinine: "0.9", age: "30", gender: "male" });
    expect(result).not.toBeNull();
    expect(result.egfr).toBeGreaterThanOrEqual(90);
    expect(result.stage).toBe("Stage 1");
  });

  it("should calculate Stage 3/4 reduced function for elevated creatinine", () => {
    const result = calculateCKDEPI({ creatinine: "2.5", age: "65", gender: "male" });
    expect(result).not.toBeNull();
    expect(result.egfr).toBeLessThan(60);
    expect(["Stage 3B", "Stage 4", "Stage 5"]).toContain(result.stage);
  });

  it("should calculate Stage 5 (ESRD) for severe renal failure", () => {
    const result = calculateCKDEPI({ creatinine: "7.0", age: "55", gender: "female" });
    expect(result).not.toBeNull();
    expect(result.egfr).toBeLessThan(15);
    expect(result.stage).toBe("Stage 5");
  });

  it("should reject negative or zero values safely", () => {
    expect(calculateCKDEPI({ creatinine: "-1.0", age: "40", gender: "male" })).toBeNull();
    expect(calculateCKDEPI({ creatinine: "0", age: "40", gender: "male" })).toBeNull();
    expect(calculateCKDEPI({ creatinine: "1.2", age: "0", gender: "male" })).toBeNull();
  });
});
