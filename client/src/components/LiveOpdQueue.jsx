import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Activity,
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
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const res = await fetch("/api/opd/queue");
      if (res.ok) {
        const data = await res.json();
        setQueueData(data);
      }
    } catch (err) {
      console.error("Failed to load OPD queue:", err);
    } finally {
      setLoading(false);
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
                🟢{" "}
                {lang === "mr"
                  ? "ओपीडी सुरू आहे • डॉ. सागर सारडा"
                  : lang === "hi"
                    ? "ओपीडी जारी है • डॉ. सागर सारडा"
                    : "Live OPD in Session • Dr. Sagar Sarda"}
              </span>
            </div>
          )}
          {status === "break" && (
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <PauseCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>
                🟡{" "}
                {lang === "mr"
                  ? "डॉक्टर राउंड्स / विश्रांतीवर आहेत"
                  : lang === "hi"
                    ? "डॉक्टर राउंड्स / ब्रेक पर हैं"
                    : "Doctor on Rounds / Break"}
              </span>
            </div>
          )}
          {status === "closed" && (
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>
                🔴{" "}
                {lang === "mr"
                  ? "आजची ओपीडी समाप्त झाली आहे"
                  : lang === "hi"
                    ? "आज की ओपीडी समाप्त हो चुकी है"
                    : "OPD Closed for the Day (24/7 Dialysis Open)"}
              </span>
            </div>
          )}

          <h3 className="text-xl font-extrabold text-white mt-1.5">
            {lang === "mr"
              ? "रिअल-टाइम ओपीडी टोकन व रांग व्यवस्था"
              : lang === "hi"
                ? "रियल-टाइम ओपीडी टोकन एवं कतार ट्रैकर"
                : "Real-Time OPD Queue & Token Counter"}
          </h3>
          <p className="text-xs text-slate-300">
            {lang === "mr"
              ? "चंद्रपूर किडनी केअरमधील थेट तपासणी स्थिती"
              : lang === "hi"
                ? "चंद्रपुर किडनी केयर में वर्तमान परामर्श स्थिति"
                : "Current consultation status at Chandrapur Kidney Care OPD Suite"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-teal-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-white/15 transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-teal-400" />{" "}
            {lang === "mr"
              ? "रिसेप्शन हेल्पडेस्क"
              : lang === "hi"
                ? "रिसेप्शन हेल्पडेस्क"
                : "Reception Helpdesk"}
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
              {lang === "mr" ? "सध्या आत" : lang === "hi" ? "वर्तमान में अंदर" : "Currently Inside"}
            </span>
            <h4 className="text-sm font-bold text-white">
              {lang === "mr"
                ? "तपासणी सुरू असलेले टोकन"
                : lang === "hi"
                  ? "परामर्श में टोकन"
                  : "Token in Consultation"}
            </h4>
            <p className="text-[10px] text-slate-400">Dr. Sagar Sarda OPD</p>
          </div>
        </div>

        {/* Next Available Token */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-extrabold text-xl shrink-0 border border-sky-500/30">
            #{next_token}
          </div>
          <div>
            <span className="text-[10px] text-sky-300 font-bold uppercase tracking-wider block">
              {lang === "mr"
                ? "पुढील टोकन क्रमांक"
                : lang === "hi"
                  ? "अगला उपलब्ध टोकन"
                  : "Next Available Token"}
            </span>
            <h4 className="text-sm font-bold text-white">
              {lang === "mr" ? "पुढील टोकन" : lang === "hi" ? "अगला टोकन" : "Next Available Token"}
            </h4>
            <p className="text-[10px] text-slate-400">Online & Counter Booking</p>
          </div>
        </div>

        {/* Approx Wait Time */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
              {lang === "mr" ? "अंदाजे वेळ" : lang === "hi" ? "अनुमानित समय" : "Estimated Wait"}
            </span>
            <h4 className="text-sm font-bold text-white">
              ~{estimated_wait_mins} {lang === "mr" ? "मिनिटे" : lang === "hi" ? "मिनट" : "Minutes"}
            </h4>
            <p className="text-[10px] text-slate-400">Average 12-15m / patient</p>
          </div>
        </div>
      </div>

      {/* Quick Action Footer Bar */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>Priority slots reserved for Dialysis patients and emergency consultations.</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveTab("appointment")}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-xl transition shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <span>Reserve Next Token Online</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
