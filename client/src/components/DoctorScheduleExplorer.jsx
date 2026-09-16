import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Phone, ShieldCheck, UserCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function DoctorScheduleExplorer({ setActiveTab }) {
  const { t } = useLanguage();
  const [selectedDay, setSelectedDay] = useState("today");

  const days = [
    { id: "today", label: t("schedule.tabToday") },
    { id: "mon-wed", label: t("schedule.tabMonWed") },
    { id: "thu-sat", label: t("schedule.tabThuSat") },
    { id: "sunday", label: t("schedule.tabSun") },
  ];

  const scheduleData = {
    today: [
      {
        session: t("schedule.sessions.morningOpd"),
        time: "09:00 AM - 01:30 PM",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.morningOpdDesc"),
        status: t("schedule.sessions.statusActive"),
        statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      },
      {
        session: t("schedule.sessions.dialysisRounds"),
        time: "02:00 PM - 04:00 PM",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.dialysisRoundsDesc"),
        status: t("schedule.sessions.statusOngoing"),
        statusColor: "text-teal-300 bg-teal-500/10 border-teal-500/20",
      },
      {
        session: t("schedule.sessions.eveningOpd"),
        time: "04:30 PM - 07:30 PM",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.eveningOpdDesc"),
        status: t("schedule.sessions.statusBookingOpen"),
        statusColor: "text-sky-300 bg-sky-500/10 border-sky-500/20",
      },
    ],
    "mon-wed": [
      {
        session: t("schedule.sessions.morningOpd"),
        time: "09:00 AM - 01:30 PM",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.monWedMorningDesc"),
        status: t("schedule.sessions.statusRegular"),
        statusColor: "text-teal-300 bg-teal-500/10 border-teal-500/20",
      },
      {
        session: t("schedule.sessions.eveningOpd"),
        time: "04:30 PM - 07:30 PM",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.monWedEveningDesc"),
        status: t("schedule.sessions.statusRegular"),
        statusColor: "text-teal-300 bg-teal-500/10 border-teal-500/20",
      },
    ],
    "thu-sat": [
      {
        session: t("schedule.sessions.morningOpd"),
        time: "09:00 AM - 01:30 PM",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.thuSatMorningDesc"),
        status: t("schedule.sessions.statusRegular"),
        statusColor: "text-teal-300 bg-teal-500/10 border-teal-500/20",
      },
      {
        session: t("schedule.sessions.eveningOpd"),
        time: "04:30 PM - 07:30 PM",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.thuSatEveningDesc"),
        status: t("schedule.sessions.statusRegular"),
        statusColor: "text-teal-300 bg-teal-500/10 border-teal-500/20",
      },
    ],
    sunday: [
      {
        session: t("schedule.sessions.sunEmergency"),
        time: "24 Hours On-Call",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.sunEmergencyDesc"),
        status: t("schedule.sessions.statusEmergencyOnly"),
        statusColor: "text-rose-300 bg-rose-500/10 border-rose-500/20",
      },
      {
        session: t("schedule.sessions.sunAppt"),
        time: "10:00 AM - 01:00 PM",
        location: t("common.hospitalAddress"),
        type: t("schedule.sessions.sunApptDesc"),
        status: t("schedule.sessions.statusPriorAppt"),
        statusColor: "text-amber-300 bg-amber-500/10 border-amber-500/20",
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-[#0B1E3B] via-[#08172D] to-[#040E1D] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-teal-500/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-teal-300 bg-teal-500/15 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-400/20">
            <UserCheck className="w-3.5 h-3.5 text-teal-300" /> {t("schedule.badge")}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
            {t("schedule.title")}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">{t("schedule.subtitle")}</p>
        </div>

        {/* Day Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/10 p-1 rounded-2xl border border-white/10">
          {days.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDay(d.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedDay === d.id
                  ? "bg-teal-500 text-white shadow-md font-extrabold"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 relative z-10">
        <AnimatePresence mode="wait">
          {scheduleData[selectedDay].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-teal-400/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                  <div className="flex items-center gap-1 text-teal-300 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white">{item.session}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.type}</p>

                <div className="flex items-start gap-1.5 text-slate-400 text-xs pt-2 border-t border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              <div className="pt-4 mt-3">
                <button
                  onClick={() => setActiveTab("appointment")}
                  className="w-full bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-white border border-teal-500/40 font-bold py-2 px-3 rounded-xl transition text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t("schedule.bookSlotBtn")}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Emergency Help Bar */}
      <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{t("schedule.emergencyNote")}</span>
        </div>
        <a
          href="tel:+919876543210"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0"
        >
          <Phone className="w-3.5 h-3.5" /> {t("common.callUs")}: {t("common.hospitalPhone")}
        </a>
      </div>
    </div>
  );
}
