import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Activity, Droplets } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function KidneyHealthCalculator({ setActiveTab }) {
  const { t } = useLanguage();
  const [toolMode, setToolMode] = useState("egfr"); // 'egfr' | 'stone'

  // eGFR Form State
  const [creatinine, setCreatinine] = useState("1.1");
  const [age, setAge] = useState("48");
  const [gender, setGender] = useState("male"); // 'male' | 'female'
  const [egfrResult, setEgfrResult] = useState(null);

  // Stone Risk State
  const [dailyWater, setDailyWater] = useState("1.5");
  const [saltIntake, setSaltIntake] = useState("moderate");
  const [historyOfStones, setHistoryOfStones] = useState("no");
  const [stoneRiskResult, setStoneRiskResult] = useState(null);

  // eGFR Calculation (CKD-EPI Formula approximation)
  const calculateEGFR = (e) => {
    e.preventDefault();
    const scr = parseFloat(creatinine);
    const a = parseFloat(age);
    if (!scr || !a || scr <= 0 || a <= 0) return;

    let k = gender === "female" ? 0.7 : 0.9;
    let alpha = gender === "female" ? -0.241 : -0.302;
    let genderFactor = gender === "female" ? 1.012 : 1.0;

    let minRatio = Math.min(scr / k, 1);
    let maxRatio = Math.max(scr / k, 1);

    let egfr =
      142 *
      Math.pow(minRatio, alpha) *
      Math.pow(maxRatio, -1.2) *
      Math.pow(0.9938, a) *
      genderFactor;
    egfr = Math.round(egfr);

    let stageKey = "stage1";
    let adviceKey = "stage1Advice";
    let stageColor = "text-emerald-500 bg-emerald-50 border-emerald-200";

    if (egfr >= 90) {
      stageKey = "stage1";
      adviceKey = "stage1Advice";
      stageColor = "text-emerald-500 bg-emerald-50 border-emerald-200";
    } else if (egfr >= 60) {
      stageKey = "stage2";
      adviceKey = "stage2Advice";
      stageColor = "text-teal-600 bg-teal-50 border-teal-200";
    } else if (egfr >= 45) {
      stageKey = "stage3a";
      adviceKey = "stage3aAdvice";
      stageColor = "text-amber-600 bg-amber-50 border-amber-200";
    } else if (egfr >= 30) {
      stageKey = "stage3b";
      adviceKey = "stage3bAdvice";
      stageColor = "text-orange-600 bg-orange-50 border-orange-200";
    } else if (egfr >= 15) {
      stageKey = "stage4";
      adviceKey = "stage4Advice";
      stageColor = "text-rose-600 bg-rose-50 border-rose-200";
    } else {
      stageKey = "stage5";
      adviceKey = "stage5Advice";
      stageColor = "text-red-700 bg-red-50 border-red-200";
    }

    setEgfrResult({
      egfr,
      stage: t(`calculator.${stageKey}`),
      stageColor,
      advice: t(`calculator.${adviceKey}`),
    });
  };

  // Calculate Stone Risk
  const calculateStoneRisk = (e) => {
    e.preventDefault();
    const water = parseFloat(dailyWater);
    let riskKey = "riskLow";
    let adviceKey = "riskLowAdvice";
    let color = "text-emerald-600 bg-emerald-50 border-emerald-200";

    if (water < 1.5 || historyOfStones === "yes" || saltIntake === "high") {
      riskKey = "riskHigh";
      adviceKey = "riskHighAdvice";
      color = "text-rose-600 bg-rose-50 border-rose-200";
    } else if (water < 2.2 || saltIntake === "moderate") {
      riskKey = "riskMod";
      adviceKey = "riskModAdvice";
      color = "text-amber-600 bg-amber-50 border-amber-200";
    }

    setStoneRiskResult({
      risk: t(`calculator.${riskKey}`),
      color,
      recommendations: t(`calculator.${adviceKey}`),
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-100 overflow-hidden">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-teal-600" /> {t("calculator.badge")}
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0F2D59] mt-1">
            {t("calculator.title")}
          </h3>
          <p className="text-xs text-slate-500">{t("calculator.subtitle")}</p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setToolMode("egfr")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              toolMode === "egfr"
                ? "bg-[#0F2D59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("calculator.tabEgfr")}
          </button>
          <button
            onClick={() => setToolMode("stone")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              toolMode === "stone"
                ? "bg-[#0F2D59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("calculator.tabStone")}
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="pt-4">
        {toolMode === "egfr" && (
          <form onSubmit={calculateEGFR} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("calculator.creatinineLabel")}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.2"
                  max="20"
                  value={creatinine}
                  onChange={(e) => setCreatinine(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium"
                  placeholder="e.g. 1.2"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {t("calculator.creatinineHint")}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("calculator.ageLabel")}
                </label>
                <input
                  type="number"
                  min="18"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium"
                  placeholder="e.g. 50"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="calculator-gender"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  {t("calculator.genderLabel")}
                </label>
                <select
                  id="calculator-gender"
                  aria-label={t("calculator.genderLabel")}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium bg-white"
                >
                  <option value="male">{t("calculator.male")}</option>
                  <option value="female">{t("calculator.female")}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Activity className="w-4 h-4" /> {t("calculator.calcBtn")}
              </button>
              <span className="text-[11px] text-slate-400 text-center sm:text-right">
                {t("calculator.formulaNote")}
              </span>
            </div>

            {/* Result Box */}
            <AnimatePresence>
              {egfrResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-2xl border ${egfrResult.stageColor} space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider block">
                        {t("calculator.estGfr")}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold">
                        {egfrResult.egfr}{" "}
                        <span className="text-xs font-normal">{t("calculator.unit")}</span>
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 border shadow-xs">
                      {egfrResult.stage.split(":")[0]}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm">{egfrResult.stage}</h4>
                  <p className="text-xs leading-relaxed opacity-90">{egfrResult.advice}</p>

                  <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-semibold">
                      {t("homePage.bookConsultation")}:
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("appointment")}
                      className="bg-[#0F2D59] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-700 transition cursor-pointer"
                    >
                      {t("common.bookAppointment")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}

        {toolMode === "stone" && (
          <form onSubmit={calculateStoneRisk} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t("calculator.waterLabel")}
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="10"
                  value={dailyWater}
                  onChange={(e) => setDailyWater(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium"
                  placeholder="e.g. 2.0"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="calculator-salt"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  {t("calculator.saltLabel")}
                </label>
                <select
                  id="calculator-salt"
                  aria-label={t("calculator.saltLabel")}
                  value={saltIntake}
                  onChange={(e) => setSaltIntake(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium bg-white"
                >
                  <option value="low">{t("calculator.saltLow")}</option>
                  <option value="moderate">{t("calculator.saltMod")}</option>
                  <option value="high">{t("calculator.saltHigh")}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="calculator-history"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  {t("calculator.stoneHistLabel")}
                </label>
                <select
                  id="calculator-history"
                  aria-label={t("calculator.stoneHistLabel")}
                  value={historyOfStones}
                  onChange={(e) => setHistoryOfStones(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium bg-white"
                >
                  <option value="no">{t("calculator.histNo")}</option>
                  <option value="yes">{t("calculator.histYes")}</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Droplets className="w-4 h-4" /> {t("calculator.evalBtn")}
              </button>
            </div>

            {/* Stone Result */}
            <AnimatePresence>
              {stoneRiskResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-2xl border ${stoneRiskResult.color} space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold">{stoneRiskResult.risk}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{stoneRiskResult.recommendations}</p>

                  <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] font-semibold">
                      {t("homePage.bookConsultation")}:
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("appointment")}
                      className="bg-[#0F2D59] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-700 transition cursor-pointer"
                    >
                      {t("common.bookAppointment")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
        {t("calculator.disclaimer")}
      </div>
    </div>
  );
}
