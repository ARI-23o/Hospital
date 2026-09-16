import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "../../client/src/context/LanguageContext";
import Footer from "../../client/src/components/Footer";
import MarqueeTicker from "../../client/src/components/MarqueeTicker";
import KidneyHealthCalculator from "../../client/src/components/KidneyHealthCalculator";

// Helper component to test LanguageContext consumer
function TestLangConsumer() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{lang}</span>
      <span data-testid="translated-title">{t("common.hospitalName")}</span>
      <button onClick={() => setLang("mr")}>Switch to Marathi</button>
      <button onClick={() => setLang("hi")}>Switch to Hindi</button>
      <button onClick={() => setLang("en")}>Switch to English</button>
    </div>
  );
}

describe("LanguageContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults to English and allows switching to Marathi and Hindi", () => {
    render(
      <LanguageProvider>
        <TestLangConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId("current-lang").textContent).toBe("en");
    expect(screen.getByTestId("translated-title").textContent).toContain("Chandrapur Kidney Care");

    fireEvent.click(screen.getByText("Switch to Marathi"));
    expect(screen.getByTestId("current-lang").textContent).toBe("mr");

    fireEvent.click(screen.getByText("Switch to Hindi"));
    expect(screen.getByTestId("current-lang").textContent).toBe("hi");
  });
});

describe("MarqueeTicker Component", () => {
  it("renders key hospital specialties and doctor highlights", () => {
    render(<MarqueeTicker />);
    expect(screen.getAllByText(/Dr\. Sagar Sarda/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/High-Flux Hemodialysis Unit/i).length).toBeGreaterThan(0);
  });
});

describe("Footer Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders hospital information and handles navigation clicks", () => {
    const mockSetActiveTab = vi.fn();
    render(
      <LanguageProvider>
        <Footer setActiveTab={mockSetActiveTab} />
      </LanguageProvider>
    );

    const logoImg = screen.getByAltText(/Chandrapur Kidney Care/i);
    expect(logoImg).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    fireEvent.click(buttons[0]);
    expect(mockSetActiveTab).toHaveBeenCalled();
  });
});

describe("KidneyHealthCalculator Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders calculation inputs and computes eGFR score", () => {
    const mockSetActiveTab = vi.fn();
    render(
      <LanguageProvider>
        <KidneyHealthCalculator setActiveTab={mockSetActiveTab} />
      </LanguageProvider>
    );

    expect(screen.getByText(/Kidney & Stone Health Calculator/i)).toBeInTheDocument();

    const calcButton = screen.getByRole("button", { name: /Calculate My eGFR & Stage/i });
    expect(calcButton).toBeInTheDocument();
    fireEvent.click(calcButton);

    expect(screen.getByText(/Estimated GFR/i)).toBeInTheDocument();
  });

  it("switches to Stone & Hydration calculator mode", () => {
    const mockSetActiveTab = vi.fn();
    render(
      <LanguageProvider>
        <KidneyHealthCalculator setActiveTab={mockSetActiveTab} />
      </LanguageProvider>
    );

    const stoneTabBtn = screen.getByRole("button", { name: /Stone & Hydration/i });
    fireEvent.click(stoneTabBtn);

    expect(screen.getByText(/Daily Water Intake/i)).toBeInTheDocument();
    const assessBtn = screen.getByRole("button", { name: /Evaluate Stone Risk Profile/i });
    expect(assessBtn).toBeInTheDocument();
    fireEvent.click(assessBtn);

    expect(screen.getByText(/Moderate Risk/i)).toBeInTheDocument();
  });
});
