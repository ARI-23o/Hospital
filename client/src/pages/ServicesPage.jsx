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
  ChevronDown,
  CheckCircle2,
  Droplet,
  Calendar,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const SERVICE_ICONS = {
  ckd: Activity,
  dialysis: HeartPulse,
  hypertension: Gauge,
  glomerular: Microscope,
  electrolytes: Scale,
  preventive: ShieldCheck,
  stones: ShieldAlert,
  uti: Stethoscope,
  bladder: Droplet,
};

export default function ServicesPage({ setActiveTab }) {
  const { t } = useLanguage();
  const [activeTabFilter, setActiveTabFilter] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  const services = t("servicesPage.servicesList", []);

  const filtered = Array.isArray(services)
    ? activeTabFilter === "all"
      ? services
      : services.filter(
          (s) =>
            s.category === activeTabFilter ||
            (s.tag && s.tag.toLowerCase().includes(activeTabFilter))
        )
    : [];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            {t("servicesPage.badge")}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            {t("servicesPage.title")}
          </h1>
          <p className="text-xs sm:text-base text-slate-200 mt-2 font-normal leading-relaxed">
            {t("servicesPage.subtitle")}
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[
              { id: "all", label: t("servicesPage.tabAll") },
              { id: "nephrology", label: t("servicesPage.tabNephrology") },
              { id: "urology", label: t("servicesPage.tabUrology") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
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

      {/* 2. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((srv) => {
              const Icon = SERVICE_ICONS[srv.id] || Activity;
              const isExpanded = selectedService === srv.id;

              return (
                <div
                  key={srv.id}
                  className={`bg-white rounded-3xl p-6 shadow-soft border transition-all duration-300 flex flex-col justify-between hover:shadow-card hover:-translate-y-1 ${
                    isExpanded
                      ? "border-teal-500 shadow-card ring-2 ring-teal-500/20"
                      : "border-slate-100 hover:border-teal-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl ${srv.color || "bg-teal-50 text-teal-700"} flex items-center justify-center shadow-xs`}
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

                        {Array.isArray(srv.symptoms) && srv.symptoms.length > 0 && (
                          <div>
                            <span className="font-bold text-slate-800 block mb-1">
                              {t("servicesPage.keySymptoms")}
                            </span>
                            <ul className="space-y-1">
                              {srv.symptoms.map((sym, i) => (
                                <li key={i} className="flex items-center gap-1.5 text-slate-600">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>{" "}
                                  {sym}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {Array.isArray(srv.treatments) && srv.treatments.length > 0 && (
                          <div>
                            <span className="font-bold text-slate-800 block mb-1">
                              {t("servicesPage.clinicalApproach")}
                            </span>
                            <ul className="space-y-1">
                              {srv.treatments.map((tr, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-1.5 text-teal-700 font-medium"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />{" "}
                                  {tr}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(isExpanded ? null : srv.id)}
                      className="text-xs font-bold text-teal-600 hover:text-[#0F2D59] transition flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? t("common.showLess") : t("common.learnMore")}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    <button
                      onClick={() => setActiveTab("appointment")}
                      className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" /> {t("servicesPage.bookConsultation")}
                    </button>
                  </div>
                </div>
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
              {t("servicesPage.reassuranceBadge")}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {t("servicesPage.reassuranceTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              {t("servicesPage.reassuranceSubtitle")}
            </p>
          </div>
          <button
            onClick={() => setActiveTab("appointment")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition shrink-0 cursor-pointer"
          >
            {t("servicesPage.bookConsultation")}
          </button>
        </div>
      </section>
    </div>
  );
}
