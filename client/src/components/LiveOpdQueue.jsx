import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  PauseCircle,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LiveOpdQueue({ setActiveTab }) {
  const { lang, t } = useLanguage();
  const [queueData, setQueueData] = useState({
    current_token: 14,
    next_token: 18,
    estimated_wait_mins: 20,
    status: "active",
  });

  const fetchQueue = async () => {
    try {
      const res = await fetch("/api/opd/queue");
      if (res.ok) {
        const data = await res.json();
        setQueueData(data);
      }
    } catch (err) {
      console.error("Failed to load OPD queue:", err);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 8000); // Live poll every 8 seconds
    return () => clearInterval(interval);
  }, []);

  const { current_token, next_token, estimated_wait_mins, status } = queueData;

  return (
    <div className="bg-gradient-to-br from-[#0F2D59] via-[#0A1D37] to-[#040D1A] rounded-3xl p-5 sm:p-7 text-white shadow-xl border border-teal-500/30 overflow-hidden relative">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          {status === "active" && (
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>
                🟢 {t("queue.statusActive")} • {t("common.doctorName")}
              </span>
            </div>
          )}
          {status === "break" && (
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <PauseCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>🟡 {t("queue.statusBreak")}</span>
            </div>
          )}
          {status === "closed" && (
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>🔴 {t("queue.statusClosed")}</span>
            </div>
          )}

          <h3 className="text-xl font-extrabold text-white mt-1.5">{t("queue.tokenHeading")}</h3>
          <p className="text-xs text-slate-300">
            {t("common.hospitalName")} • {t("common.hospitalAddress")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-teal-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-white/15 transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-teal-400" /> {t("queue.callClinic")}
          </a>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5 relative z-10">
        {/* Token In Consultation */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-extrabold text-xl shrink-0 border border-teal-500/30">
            #{current_token}
          </div>
          <div>
            <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider block">
              {t("queue.nowServing")}
            </span>
            <h4 className="text-sm font-bold text-white">{t("queue.nowServing")}</h4>
            <p className="text-[10px] text-slate-400">{t("common.doctorName")} OPD</p>
          </div>
        </div>

        {/* Next Available Token */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-extrabold text-xl shrink-0 border border-sky-500/30">
            #{next_token}
          </div>
          <div>
            <span className="text-[10px] text-sky-300 font-bold uppercase tracking-wider block">
              {t("queue.nextInLine")}
            </span>
            <h4 className="text-sm font-bold text-white">{t("queue.nextInLine")}</h4>
            <p className="text-[10px] text-slate-400">{t("schedule.sessions.statusBookingOpen")}</p>
          </div>
        </div>

        {/* Approx Wait Time */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
              {t("queue.estWait")}
            </span>
            <h4 className="text-sm font-bold text-white">
              ~{estimated_wait_mins} {t("queue.mins")}
            </h4>
            <p className="text-[10px] text-slate-400">Average 12-15m / patient</p>
          </div>
        </div>
      </div>

      {/* Quick Action Footer Bar */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{t("queue.notice")}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab("appointment")}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-xl transition shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <span>{t("common.bookAppointment")}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
