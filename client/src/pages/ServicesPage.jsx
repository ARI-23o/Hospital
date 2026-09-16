import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  HeartPulse,
  Gauge,
  ShieldAlert,
  Microscope,
  Scale,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Droplet,
  Calendar,
  Sparkles,
} from "lucide-react";
import MarqueeTicker from "../components/MarqueeTicker";
import Interactive3DCard from "../components/Interactive3DCard";

export default function ServicesPage({ setActiveTab }) {
  const [activeTabFilter, setActiveTabFilter] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    // Nephrology
    {
      id: "ckd",
      category: "nephrology",
      title: "Chronic Kidney Disease (CKD) Management",
      tagline: "Early detection, staging, and renoprotective care to slow progression.",
      icon: Activity,
      color: "bg-teal-50 text-teal-700",
      tag: "Nephrology",
      details:
        "Comprehensive staging (Stages 1 to 5), personalized nephro-protective therapies (SGLT2i/RAAS blockade), dietary renal planning, blood pressure and proteinuria management to preserve native kidney function as long as possible.",
      symptoms: [
        "Swelling in feet or ankles",
        "Persistent fatigue & weakness",
        "Changes in urination frequency",
        "Metallic taste in mouth",
      ],
      treatments: [
        "SGLT2i & ACE/ARB renoprotective drugs",
        "Anemia & iron management",
        "Low-protein renal diet plans",
        "Creatinine & eGFR trend analysis",
      ],
    },
    {
      id: "dialysis",
      category: "nephrology",
      title: "Dialysis Care & Guidance",
      tagline: "Hemodialysis supervision and guidance for higher quality of life.",
      icon: HeartPulse,
      color: "bg-blue-50 text-blue-700",
      tag: "Nephrology",
      details:
        "Specialized vascular access (AV fistula/graft/catheter) planning, hemodialysis prescription optimization, adequacy monitoring (Kt/V), and continuous guidance for patients and families.",
      symptoms: [
        "Severe fluid retention",
        "Shortness of breath on lying down",
        "Uremic nausea & vomiting",
        "High potassium levels",
      ],
      treatments: [
        "High-flux hemodialysis supervision",
        "Dialysis adequacy (Kt/V) monitoring",
        "AV fistula preservation advice",
        "Cardiovascular health management",
      ],
    },
    {
      id: "hypertension",
      category: "nephrology",
      title: "Hypertension & Kidney Health",
      tagline: "Targeted blood pressure management to safeguard renal vessels.",
      icon: Gauge,
      color: "bg-indigo-50 text-indigo-700",
      tag: "Nephrology",
      details:
        "Investigation of secondary causes of hypertension, renal artery Doppler evaluation, 24-hour ambulatory BP tracking, and tailored multi-drug regimens for resistant hypertension.",
      symptoms: [
        "Morning headaches",
        "Blurred vision or dizziness",
        "Uncontrolled BP on 3+ medications",
        "Elevated home BP logs",
      ],
      treatments: [
        "Secondary hypertension workup",
        "Renal artery Doppler correlation",
        "Sodium restriction education",
        "Targeted combination pharmacotherapy",
      ],
    },
    {
      id: "glomerular",
      category: "nephrology",
      title: "Glomerular Diseases & Proteinuria",
      tagline: "Diagnosis and targeted management of protein leak and complex renal conditions.",
      icon: Microscope,
      color: "bg-emerald-50 text-emerald-700",
      tag: "Nephrology",
      details:
        "Expert diagnostic evaluation for Nephrotic and Nephritic syndromes, IgA nephropathy, Membranous nephropathy, Lupus nephritis, with kidney biopsy correlation and targeted immunosuppression.",
      symptoms: [
        "Foamy or bubbly urine",
        "Severe facial puffiness upon waking",
        "Rapid weight gain from fluid",
        "High cholesterol with low albumin",
      ],
      treatments: [
        "Kidney biopsy review & staging",
        "Targeted immunosuppressive protocols",
        "Antiproteinuric therapies",
        "Strict lipid & edema control",
      ],
    },
    {
      id: "electrolytes",
      category: "nephrology",
      title: "Electrolyte & Mineral Balance",
      tagline: "Treatment for potassium, sodium, calcium, and bone-mineral disorders.",
      icon: Scale,
      color: "bg-cyan-50 text-cyan-700",
      tag: "Nephrology",
      details:
        "Prompt evaluation and correction of hyperkalemia, hypokalemia, hyponatremia, hypercalcemia, metabolic acidosis, and renal osteodystrophy / bone mineral disorders (CKD-MBD).",
      symptoms: [
        "Muscle spasms or cramps",
        "Irregular heart rhythm / palpitations",
        "Mental confusion or lethargy",
        "Bone aches and weakness",
      ],
      treatments: [
        "Potassium binders & dietary adjustments",
        "Controlled sodium correction",
        "Phosphate binders & active Vit D",
        "Bicarbonate therapy for acidosis",
      ],
    },
    {
      id: "preventive",
      category: "nephrology",
      title: "Preventive Kidney Screening",
      tagline:
        "Proactive screening for diabetics, hypertensive patients, and high-risk individuals.",
      icon: ShieldCheck,
      color: "bg-teal-50 text-teal-700",
      tag: "Nephrology",
      details:
        "Annual screening packages for diabetic individuals, elderly family members, and those with a family history of renal impairment. Medication safety audits to avoid nephrotoxicity.",
      symptoms: [
        "Often silent in early stages",
        "Recommended for all diabetics >1 yr",
        "Family history of kidney disease",
        "Regular painkiller users",
      ],
      treatments: [
        "Annual microalbuminuria urine test",
        "Serum creatinine & eGFR calculation",
        "Medication safety review (NSAID avoidance)",
        "Customized renal diet plan",
      ],
    },
    // Urology & Urinary Care
    {
      id: "stones",
      category: "urology",
      title: "Kidney Stone Medical Care",
      tagline: "Medical evaluation, dissolution protocols, and recurrence prevention.",
      icon: ShieldAlert,
      color: "bg-amber-50 text-amber-700",
      tag: "Nephrology & Urology",
      details:
        "Metabolic evaluation (24-hour urine stone chemistry), medical expulsive therapy, recurrence prevention diets, and clinical consultation for stone-induced renal impairment.",
      symptoms: [
        "Severe flank or lower back pain",
        "Blood in urine (hematuria)",
        "Burning or painful urination",
        "Nausea and fever during stone passage",
      ],
      treatments: [
        "Metabolic urine workup",
        "Citrate & hydration therapy",
        "Uric acid & calcium balance",
        "Nephrotoxic prevention protocol",
      ],
    },
    {
      id: "uti",
      category: "urology",
      title: "Urinary Tract Infections (UTI)",
      tagline: "Accurate diagnosis, culture-guided therapy and long-term prevention.",
      icon: Stethoscope,
      color: "bg-rose-50 text-rose-700",
      tag: "Urology",
      details:
        "Systematic investigation of complicated and recurrent UTIs, pyelonephritis (kidney infection), structural evaluation, and customized non-antibiotic and targeted prophylactic strategies.",
      symptoms: [
        "Intense burning sensation",
        "Urgent need to urinate frequently",
        "Cloudy or foul-smelling urine",
        "Pelvic or flank tenderness",
      ],
      treatments: [
        "Urine culture-guided targeted antibiotics",
        "Preventive non-antibiotic regimens",
        "Structural ultrasound evaluation",
        "Hydration & hygiene protocols",
      ],
    },
    {
      id: "bladder",
      category: "urology",
      title: "Bladder & Voiding Health",
      tagline: "Evaluation of urinary frequency, urgency, and lower urinary tract symptoms.",
      icon: Droplet,
      color: "bg-sky-50 text-sky-700",
      tag: "Urology",
      details:
        "Clinical assessment of overactive bladder, urinary retention, benign prostatic hyperplasia (BPH) symptom evaluation, and non-invasive medical management roadmaps.",
      symptoms: [
        "Frequent urination at night (nocturia)",
        "Weak urine stream or hesitation",
        "Incomplete bladder emptying",
        "Urinary urgency",
      ],
      treatments: [
        "Urinary flow & post-void residual evaluation",
        "Bladder retraining guidance",
        "Medical pharmacotherapy (Alpha-blockers/5-ARI)",
        "Specialist surgical referral when indicated",
      ],
    },
  ];

  const filtered =
    activeTabFilter === "all"
      ? services
      : services.filter(
          (s) => s.category === activeTabFilter || s.tag.toLowerCase().includes(activeTabFilter)
        );

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            Specialized Care Directory
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            Our Services — Complete Kidney & Urology Care
          </h1>
          <p className="text-xs sm:text-base text-slate-200 mt-2 font-normal leading-relaxed">
            From CKD staging and hemodialysis supervision to kidney stone evaluation and urinary
            wellness.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[
              { id: "all", label: "All Services" },
              { id: "nephrology", label: "Nephrology" },
              { id: "urology", label: "Urology & Urinary Health" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeTabFilter === tab.id
                    ? "bg-white text-[#0F2D59] shadow-md font-extrabold"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Services Grid with 3D Perspective Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((srv) => {
              const Icon = srv.icon;
              const isExpanded = selectedService === srv.id;

              return (
                <Interactive3DCard
                  key={srv.id}
                  className={`bg-white rounded-3xl p-6 shadow-soft border transition-all flex flex-col justify-between ${
                    isExpanded
                      ? "border-teal-500 shadow-card ring-2 ring-teal-500/20"
                      : "border-slate-100 hover:border-teal-200 hover:shadow-card"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl ${srv.color} flex items-center justify-center shadow-xs`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="font-bold text-[#0F2D59] text-base sm:text-lg mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{srv.tagline}</p>

                    {isExpanded && (
                      <div className="space-y-3.5 pt-3 border-t border-slate-100 text-xs text-slate-600 animate-fadeIn">
                        <p className="text-slate-700 leading-relaxed">{srv.details}</p>

                        <div>
                          <span className="font-bold text-slate-800 block mb-1">Key Symptoms:</span>
                          <ul className="space-y-1">
                            {srv.symptoms.map((sym, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-slate-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>{" "}
                                {sym}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-bold text-slate-800 block mb-1">
                            Clinical Approach:
                          </span>
                          <ul className="space-y-1">
                            {srv.treatments.map((t, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-1.5 text-teal-700 font-medium"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" /> {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(isExpanded ? null : srv.id)}
                      className="text-xs font-bold text-teal-600 hover:text-[#0F2D59] transition flex items-center gap-1"
                    >
                      {isExpanded ? "Show Less" : "Learn More"}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    <button
                      onClick={() => setActiveTab("appointment")}
                      className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Book Consultation
                    </button>
                  </div>
                </Interactive3DCard>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. Reassurance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-800 to-[#0F2D59] text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-teal-300 text-xs font-bold uppercase tracking-wider">
              Early Care. Better Outcomes.
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Because Your Kidneys & Urinary Health Deserve the Best.
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Schedule a comprehensive medical assessment with Dr. Sagar Sarda in Chandrapur.
            </p>
          </div>
          <button
            onClick={() => setActiveTab("appointment")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition shrink-0"
          >
            Book a Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
