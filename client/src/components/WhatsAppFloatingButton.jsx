import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  FileText,
  HeartPulse,
  HelpCircle,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function WhatsAppFloatingButton() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const popupRef = useRef(null);

  const WHATSAPP_NUMBER = "919422835923";
  const PHONE_NUMBER = "+919422835923";

  // Show subtle badge / tooltip for first-time visitors after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const openWhatsApp = (msg) => {
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div
      ref={popupRef}
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Floating Action Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[90vw] max-w-[340px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden text-slate-800"
          >
            {/* Header with WhatsApp Branding */}
            <div className="bg-gradient-to-r from-[#0F2D59] to-[#0D9488] p-4 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-tight">
                      {t("whatsappFloat.title", "Chandrapura Kidney Care")}
                    </h3>
                    <p className="text-[11px] text-teal-200 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      {t("whatsappFloat.onlineStatus", "Dr. Sagar Sarda • Online")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close WhatsApp Menu"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick-action message options */}
            <div className="p-3.5 space-y-2 bg-slate-50/60">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">
                {t("whatsappFloat.subtitle", "Direct Doctor & OPD Support")}
              </p>

              {/* Action 1: Share Reports for 2nd Opinion */}
              <button
                onClick={() =>
                  openWhatsApp(
                    t(
                      "whatsappFloat.shareReportMsg",
                      "Hello Dr. Sagar Sarda, I want to share my kidney function / ultrasound reports for a clinical second opinion."
                    )
                  )
                }
                className="w-full p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-left transition flex items-center justify-between group shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F2D59] group-hover:text-emerald-800">
                      {t("whatsappFloat.shareReportBtn", "Share Reports for 2nd Opinion")}
                    </h4>
                    <span className="text-[10px] text-slate-400">KFT, Creatinine, Ultrasound</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Action 2: Urgent Dialysis / OPD Slot */}
              <button
                onClick={() =>
                  openWhatsApp(
                    t(
                      "whatsappFloat.dialysisInquiryMsg",
                      "Hello Chandrapura Kidney Care, I need urgent assistance regarding dialysis / OPD appointment slots."
                    )
                  )
                }
                className="w-full p-3 rounded-2xl bg-white hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-left transition flex items-center justify-between group shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-[#0F2D59] group-hover:text-white transition">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F2D59] group-hover:text-teal-800">
                      {t("whatsappFloat.dialysisInquiryBtn", "Emergency Dialysis / OPD Slot")}
                    </h4>
                    <span className="text-[10px] text-slate-400">Immediate Slot Support</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Action 3: General Inquiry */}
              <button
                onClick={() =>
                  openWhatsApp(
                    t(
                      "whatsappFloat.generalInquiryMsg",
                      "Hello, I have an inquiry about Chandrapura Kidney Care hospital services and OPD timings."
                    )
                  )
                }
                className="w-full p-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200/80 text-left transition flex items-center justify-between group shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-700 group-hover:text-white transition">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      {t("whatsappFloat.generalInquiryBtn", "General Question / Location")}
                    </h4>
                    <span className="text-[10px] text-slate-400">Timings & Directions</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Direct Telephone Helpline Call */}
            <div className="p-3 bg-white border-t border-slate-100 space-y-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t("whatsappFloat.callHelpline", "Direct Emergency Call")}</span>
              </a>

              <p className="text-[10px] text-slate-400 text-center leading-tight">
                {t(
                  "whatsappFloat.disclaimer",
                  "For life-threatening emergencies, please call the emergency hotline directly."
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2.5">
        {/* Helper Prompt Pill */}
        {!isOpen && hasPrompted && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="hidden sm:flex items-center gap-1.5 bg-white text-slate-800 text-xs font-bold py-2 px-3.5 rounded-full shadow-lg border border-slate-200/90 whitespace-nowrap cursor-pointer hover:border-emerald-400 transition"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>{t("whatsappFloat.buttonLabel", "Chat with Doctor")}</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp Chat & Second Opinion Dialog"
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer relative ${
            isOpen
              ? "bg-slate-800 text-white rotate-90 shadow-slate-900/30"
              : "bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-emerald-600/40"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 fill-white text-white" />
              {/* Pulsing indicator ring */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
              </span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
