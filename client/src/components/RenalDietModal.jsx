import React, { useState } from "react";
import {
  X,
  Printer,
  Apple,
  AlertTriangle,
  Droplets,
  ShieldAlert,
  CheckCircle2,
  Salad,
  Info,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function RenalDietModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("favor"); // 'favor' | 'avoid' | 'fluid' | 'salt'

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const tabs = [
    { id: "favor", label: t("dietGuide.tabToEat", "🟢 Foods to Favor"), icon: Apple },
    { id: "avoid", label: t("dietGuide.tabToAvoid", "🔴 Foods to Avoid"), icon: AlertTriangle },
    { id: "fluid", label: t("dietGuide.tabFluid", "💧 Fluid & Water"), icon: Droplets },
    { id: "salt", label: t("dietGuide.tabSalt", "🧂 Salt & Sodium"), icon: ShieldAlert },
  ];

  const favorItems = t("dietGuide.favorItems", [
    {
      category: "Fruits",
      items:
        "Apples, Papaya, Guava (seeds removed), Pears, Pineapple, Berries, Watermelon (moderate portion).",
    },
    {
      category: "Vegetables",
      items:
        "Bottle Gourd (Lauki/Doodhi), Ridge Gourd (Turai/Dodka), Bitter Gourd (Karela), Cabbage, Cauliflower, Cucumber, Capsicum.",
    },
    {
      category: "Grains & Cereals",
      items:
        "White Rice, Poha, Semolina (Rava), Refined Wheat Flour (in moderation), Sago (Sabudana).",
    },
    {
      category: "Proteins (As Prescribed)",
      items:
        "Egg whites (boiled), Paneer (fresh/homemade, controlled portion), Washed and well-boiled Moong Dal.",
    },
  ]);

  const avoidItems = t("dietGuide.avoidItems", [
    {
      category: "High Potassium Fruits",
      items:
        "Coconut Water (Nariyal Pani), Bananas, Mangoes, Oranges/Mausambi, Pomegranate, Dry Fruits (Almonds, Cashews, Raisins).",
    },
    {
      category: "High Potassium Vegetables",
      items:
        "Spinach (Palak), Raw Tomatoes (excess), Potatoes & Sweet Potatoes (unless boiled & leached), Green Leafy Vegetables.",
    },
    {
      category: "Processed & Salty Foods",
      items:
        "Pickles (Achar), Papad, Commercial Namkeen, Potato Chips, Instant Noodles, Canned Soups, Bakery items with baking soda.",
    },
    {
      category: "Phosphorus-Rich Items",
      items:
        "Cola drinks/sodas, Processed cheese, Organ meats, Packaged chocolate drinks, Beer and alcohol.",
    },
  ]);

  const fluidCards = t("dietGuide.fluidCards", [
    {
      stage: "CKD Stages 1-3 & Kidney Stone Patients",
      target: "2.5 – 3.0 Liters / Day",
      advice:
        "Good hydration prevents crystal deposition and helps flush metabolic waste. Maintain steady fluid intake throughout the day.",
    },
    {
      stage: "Dialysis & CKD Stage 4-5 (With Swelling / Low Urine)",
      target: "1.0 – 1.2 Liters / Day (Or Urine Output + 500 mL)",
      advice:
        "Strict fluid restriction is essential to prevent dangerous water accumulation in lungs (pulmonary edema) and high blood pressure.",
    },
  ]);

  const fluidTips = t("dietGuide.fluidTips", [
    "Measure daily water in a dedicated 1-liter bottle so you know exact consumption.",
    "Include tea, milk, dal water, soups, and fruit juices in your total daily fluid count.",
    "Use ice cubes or gargle with cold water to quench dry mouth without swallowing excess volume.",
  ]);

  const saltRules = t("dietGuide.saltRules", [
    {
      title: "Limit to 1 Small Teaspoon (3-4g) Daily",
      desc: "Add minimal salt while cooking. Do not keep a salt shaker on the dining table.",
    },
    {
      title: "Avoid 'Rock Salt / Sendha Namak' & Low-Sodium Salt Substitutes",
      desc: "Crucial Warning: Low-sodium 'diet salts' replace sodium with Potassium, which can cause lethal potassium buildup (Hyperkalemia) in kidney patients.",
    },
    {
      title: "Use Natural Flavor Enhancers",
      desc: "Enhance taste with lemon juice (small amount), cumin, coriander, ginger, garlic, and fresh mint instead of extra salt.",
    },
  ]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-scaleUp print:max-h-none print:shadow-none print:border-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold bg-white/10 px-3 py-0.5 rounded-full text-teal-300 border border-white/10 uppercase tracking-wider">
              <Salad className="w-3.5 h-3.5" />
              {t("dietGuide.badge", "Clinical Renal Nutrition Guide")}
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold mt-2 tracking-tight">
              {t("dietGuide.title", "Kidney Diet & Fluid Management Chart")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 font-normal leading-relaxed max-w-xl">
              {t(
                "dietGuide.subtitle",
                "Evidence-based dietary recommendations for CKD, Hemodialysis, and Kidney Stone prevention under Dr. Sagar Sarda."
              )}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:py-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Bar (Hidden in Print) */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0 print:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-[#0F2D59] text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
          {/* TAB 1: Foods to Favor */}
          {activeTab === "favor" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
                <h3 className="font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-2">
                  <Apple className="w-5 h-5 text-emerald-600" />
                  {t("dietGuide.favorHeading", "Foods to Favor (Low Potassium / Low Sodium)")}
                </h3>
                <p className="text-xs text-emerald-800 mt-1">
                  {t(
                    "dietGuide.favorDesc",
                    "These foods help maintain kidney balance without overloading potassium or phosphorus."
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {favorItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition shadow-xs"
                  >
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide block mb-1">
                      {item.category}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {item.items}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Foods to Restrict / Avoid */}
          {activeTab === "avoid" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4">
                <h3 className="font-bold text-rose-950 text-sm sm:text-base flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  {t(
                    "dietGuide.avoidHeading",
                    "Foods to Restrict / Avoid (High Potassium & Phosphorus)"
                  )}
                </h3>
                <p className="text-xs text-rose-800 mt-1">
                  {t(
                    "dietGuide.avoidDesc",
                    "High potassium foods can cause dangerous cardiac arrhythmias in kidney impairment."
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {avoidItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-rose-50/30 border border-rose-100 hover:border-rose-300 transition shadow-xs"
                  >
                    <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wide block mb-1">
                      {item.category}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {item.items}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Fluid & Water */}
          {activeTab === "fluid" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4">
                <h3 className="font-bold text-sky-950 text-sm sm:text-base flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-sky-600" />
                  {t("dietGuide.fluidHeading", "Daily Fluid & Water Management")}
                </h3>
                <p className="text-xs text-sky-800 mt-1">
                  {t(
                    "dietGuide.fluidDesc",
                    "Fluid intake must match your kidney filtering capacity and urine output."
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {fluidCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft space-y-2"
                  >
                    <span className="text-xs font-bold text-slate-800 block">{card.stage}</span>
                    <div className="inline-block bg-sky-100 text-sky-800 text-xs font-extrabold px-3 py-1 rounded-lg">
                      {card.target}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{card.advice}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                  {t("dietGuide.fluidTipsHeading", "Golden Rules for Fluid Restriction:")}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {fluidTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: Salt & Sodium */}
          {activeTab === "salt" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                <h3 className="font-bold text-amber-950 text-sm sm:text-base flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  {t("dietGuide.saltHeading", "Salt & Sodium Control Protocol")}
                </h3>
                <p className="text-xs text-amber-800 mt-1">
                  {t(
                    "dietGuide.saltDesc",
                    "Excess sodium elevates blood pressure and worsens swelling around ankles and face."
                  )}
                </p>
              </div>

              <div className="space-y-3">
                {saltRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1"
                  >
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{rule.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer Banner */}
          <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p>{t("dietGuide.disclaimer")}</p>
          </div>
        </div>

        {/* Modal Footer (Action Buttons) */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <span className="text-[11px] text-slate-500 text-center sm:text-left">
            {t("common.hospitalName", "Chandrapur Kidney Care")} • Dr. Sagar Damodar Sarda
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              {t("dietGuide.printBtn", "Print / Save Diet Chart")}
            </button>

            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition"
            >
              {t("dietGuide.closeBtn", "Close")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
