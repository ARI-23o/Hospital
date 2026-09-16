import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Activity,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export default function KidneyHealthCalculator({ setActiveTab }) {
  const [toolMode, setToolMode] = useState("egfr"); // 'egfr' | 'stone' | 'symptoms'

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

    let stage = "";
    let stageColor = "";
    let advice = "";

    if (egfr >= 90) {
      stage = "Stage 1: Normal / Optimal Kidney Function";
      stageColor = "text-emerald-500 bg-emerald-50 border-emerald-200";
      advice =
        "Kidney filtration is healthy. Maintain balanced hydration, annual screening if diabetic or hypertensive, and regular checkups.";
    } else if (egfr >= 60) {
      stage = "Stage 2: Mildly Reduced Kidney Function";
      stageColor = "text-teal-600 bg-teal-50 border-teal-200";
      advice =
        "Mild filtration reduction. Monitor blood pressure, blood glucose, and avoid unauthorized painkiller (NSAID) overuse.";
    } else if (egfr >= 45) {
      stage = "Stage 3A: Mild to Moderate Kidney Disease";
      stageColor = "text-amber-600 bg-amber-50 border-amber-200";
      advice =
        "Specialist nephrology evaluation by Dr. Sagar Sarda is recommended to slow disease progression and protect remaining nephrons.";
    } else if (egfr >= 30) {
      stage = "Stage 3B: Moderate to Severe Kidney Disease";
      stageColor = "text-orange-600 bg-orange-50 border-orange-200";
      advice =
        "Active medical nephrology management required. Strict BP control, renal diet, and regular metabolic monitoring.";
    } else if (egfr >= 15) {
      stage = "Stage 4: Severely Reduced Kidney Function";
      stageColor = "text-rose-600 bg-rose-50 border-rose-200";
      advice =
        "Advanced renal care. Discussion of renoprotective therapy, vascular access preparation, and specialized nutritional therapy.";
    } else {
      stage = "Stage 5: Kidney Failure / End-Stage (ESRD)";
      stageColor = "text-red-700 bg-red-50 border-red-200";
      advice =
        "Immediate consultation with Dr. Sagar Sarda for dialysis care planning or kidney replacement therapy.";
    }

    setEgfrResult({ egfr, stage, stageColor, advice });
  };

  // Calculate Stone Risk
  const calculateStoneRisk = (e) => {
    e.preventDefault();
    const water = parseFloat(dailyWater);
    let risk = "Low";
    let color = "text-emerald-600 bg-emerald-50 border-emerald-200";
    let recommendations =
      "Good hydration levels. Continue consuming 2.5 - 3 liters daily with balanced dietary calcium.";

    if (water < 1.5 || historyOfStones === "yes" || saltIntake === "high") {
      risk = "High Risk of Crystal Formation";
      color = "text-rose-600 bg-rose-50 border-rose-200";
      recommendations =
        "Increase fluid intake to >3 liters/day, reduce dietary sodium, and undergo a 24-hr urine metabolic analysis under Dr. Sagar Sarda.";
    } else if (water < 2.2 || saltIntake === "moderate") {
      risk = "Moderate Risk";
      color = "text-amber-600 bg-amber-50 border-amber-200";
      recommendations =
        "Aim for at least 2.5 to 3 liters of water daily, especially in Chandrapur’s warm climate, and limit excessive animal protein.";
    }

    setStoneRiskResult({ risk, color, recommendations });
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-100 overflow-hidden">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-teal-600" /> Clinical Self-Assessment Tools
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0F2D59] mt-1">
            Kidney & Stone Health Calculator
          </h3>
          <p className="text-xs text-slate-500">
            Instant evidence-based clinical estimates based on standard nephrology formulas
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setToolMode("egfr")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              toolMode === "egfr"
                ? "bg-[#0F2D59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            eGFR / CKD Stage
          </button>
          <button
            onClick={() => setToolMode("stone")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              toolMode === "stone"
                ? "bg-[#0F2D59] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Stone & Hydration
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
                  Serum Creatinine (mg/dL)
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
                  From recent blood report
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Age (Years)
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium bg-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" /> Calculate My eGFR & Stage
              </button>
              <span className="text-[11px] text-slate-400 text-center sm:text-right">
                Formula: CKD-EPI (2021) Non-race equation
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
                        Estimated GFR
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold">
                        {egfrResult.egfr} <span className="text-xs font-normal">mL/min/1.73m²</span>
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
                      Consult Dr. Sagar Sarda for clinical evaluation:
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("appointment")}
                      className="bg-[#0F2D59] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-700 transition"
                    >
                      Book OPD Consultation
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
                  Daily Water Intake (Liters)
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dietary Salt / Sodium Intake
                </label>
                <select
                  value={saltIntake}
                  onChange={(e) => setSaltIntake(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium bg-white"
                >
                  <option value="low">Low (Fresh cooked, minimal salt)</option>
                  <option value="moderate">Moderate (Standard Indian diet)</option>
                  <option value="high">High (Pickles, papad, processed foods)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Previous Kidney Stone Episode?
                </label>
                <select
                  value={historyOfStones}
                  onChange={(e) => setHistoryOfStones(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none font-medium bg-white"
                >
                  <option value="no">No Prior Stones</option>
                  <option value="yes">Yes (1 or more episodes)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Droplets className="w-4 h-4" /> Evaluate Stone Risk Profile
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
                      Schedule stone evaluation & prevention plan:
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("appointment")}
                      className="bg-[#0F2D59] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-700 transition"
                    >
                      Book Specialist Visit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}
      </div>
    </div>
  );
}
