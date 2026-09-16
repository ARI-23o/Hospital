import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle, ArrowRight, ShieldCheck, Activity, PhoneCall } from 'lucide-react';

export default function LiveOpdQueue({ setActiveTab }) {
  // Simulated dynamic OPD live counter for Dr. Sagar Sarda
  const [currentToken, setCurrentToken] = useState(14);
  const [nextAvailableToken, setNextAvailableToken] = useState(18);
  const [estimatedWaitMins, setEstimatedWaitMins] = useState(25);

  return (
    <div className="bg-gradient-to-br from-[#0F2D59] via-[#0A1D37] to-[#040D1A] rounded-3xl p-5 sm:p-7 text-white shadow-xl border border-teal-500/30 overflow-hidden relative">
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live OPD Status • Dr. Sagar Sarda</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mt-1.5">
            Real-Time OPD Queue & Token Counter
          </h3>
          <p className="text-xs text-slate-300">
            Current consultation status at Chandrapur Kidney Care OPD Suite
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-teal-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-white/15 transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-teal-400" /> Reception Helpdesk
          </a>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-5 relative z-10">
        
        {/* Token In Consultation */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-extrabold text-xl shrink-0 border border-teal-500/30">
            #{currentToken}
          </div>
          <div>
            <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider block">Currently Inside</span>
            <h4 className="text-sm font-bold text-white">Token in Consultation</h4>
            <p className="text-[10px] text-slate-400">Dr. Sagar Sarda OPD</p>
          </div>
        </div>

        {/* Next Available Token */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-extrabold text-xl shrink-0 border border-sky-500/30">
            #{nextAvailableToken}
          </div>
          <div>
            <span className="text-[10px] text-sky-300 font-bold uppercase tracking-wider block">Next Walk-In Slot</span>
            <h4 className="text-sm font-bold text-white">Next Available Token</h4>
            <p className="text-[10px] text-slate-400">Online & Counter Booking</p>
          </div>
        </div>

        {/* Approx Wait Time */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Estimated Wait</span>
            <h4 className="text-sm font-bold text-white">~{estimatedWaitMins} Minutes</h4>
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
          onClick={() => setActiveTab('appointment')}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-xl transition shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <span>Reserve Next Token Online</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

    </div>
  );
}