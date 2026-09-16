import { describe, it, expect } from "vitest";
import { translations } from "../../client/src/translations/translations.js";

describe("Translation Dictionary Integrity", () => {
  const supportedLanguages = ["en", "mr", "hi"];

  it("should define all three official languages (English, Marathi, Hindi)", () => {
    supportedLanguages.forEach((lang) => {
      expect(translations).toHaveProperty(lang);
      expect(typeof translations[lang]).toBe("object");
    });
  });

  it("should contain standard common keys across all languages", () => {
    const commonKeys = [
      "hospitalName",
      "doctorName",
      "doctorDegree",
      "doctorTitle",
      "hospitalAddress",
      "hospitalPhone",
      "opdHours",
      "bookAppointment",
    ];

    supportedLanguages.forEach((lang) => {
      expect(translations[lang]).toHaveProperty("common");
      commonKeys.forEach((key) => {
        expect(translations[lang].common).toHaveProperty(key);
        expect(translations[lang].common[key]).toBeTruthy();
        expect(typeof translations[lang].common[key]).toBe("string");
      });
    });
  });

  it("should contain navigation links for all languages", () => {
    const navKeys = ["home", "about", "services", "doctor", "contact"];

    supportedLanguages.forEach((lang) => {
      expect(translations[lang]).toHaveProperty("nav");
      navKeys.forEach((key) => {
        expect(translations[lang].nav).toHaveProperty(key);
        expect(translations[lang].nav[key]).toBeTruthy();
      });
    });
  });

  it("should have correct doctor name and qualifications in English", () => {
    expect(translations.en.common.doctorName).toBe("Dr. Sagar Damodar Sarda");
    expect(translations.en.common.doctorDegree).toContain("DM (Nephrology)");
  });
});
