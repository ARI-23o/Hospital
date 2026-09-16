import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  ShieldCheck,
  HeartPulse,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calendar,
  Sparkles,
  Building,
  Activity,
  Users,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutPage({ setActiveTab }) {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16 overflow-hidden">
      {/* 1. TOP HERO SECTION (Refined Dual-Specialty Focus & Smooth Motion) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50/80 py-10 sm:py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-teal-700 bg-teal-50 border border-teal-200/80 font-bold text-[11px] sm:text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs"
            >
              About Chandrapur Kidney Care
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-4xl font-extrabold text-[#0F2D59] tracking-tight leading-[1.2]"
            >
              Comprehensive Kidney & Urology Care for Our Community
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-base text-slate-600 mt-2 font-normal leading-relaxed max-w-2xl mx-auto"
            >
              Providing compassionate, evidence-based care for kidney and urinary health in
              Chandrapur, Maharashtra.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR JOURNEY & CLINIC OVERVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Journey Narrative & Dual Specialty Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50 font-bold text-xs px-3 py-1 rounded-full uppercase">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Our Story & Purpose
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59] leading-snug">
              Building Better Kidney & Urology Care in Chandrapur
            </h2>

            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                <strong>Chandrapur Kidney Care</strong> is dedicated to providing accessible,
                compassionate, and patient-centered care for kidney and urinary health in
                Chandrapur, Maharashtra.
              </p>
              <p>
                Founded under the guidance of{" "}
                <strong className="text-[#0F2D59]">Dr. Sagar Damodar Sarda</strong> (MBBS, MD
                Medicine, DM Nephrology - Consultant Nephrologist & Kidney Transplant Physician),
                our goal is to help patients understand their conditions, receive world-class
                specialist care, and make informed decisions about their health.
              </p>
              <p>
                Our services cover Nephrology and Urology, with care tailored to the needs of each
                patient. From kidney disease management and dialysis guidance to urological
                consultations, we aim to make quality healthcare easier to access.
              </p>
            </div>

            {/* 3. TWO FEATURE CARDS (Nephrology Care & Urology Care) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                whileHover={{ y: -3 }}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-card transition flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Nephrology Care</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kidney disease evaluation, medical management, and dialysis guidance.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 }}
                whileHover={{ y: -3 }}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-card transition flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Urology Care</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Specialist evaluation and treatment for urinary system conditions.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Verified Doctor Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-card border border-slate-100 max-w-md mx-auto">
              <div className="rounded-2xl overflow-hidden bg-slate-900 relative shadow-md group">
                <img
                  src="/doctor_sagar_sarda.jpg"
                  alt="Dr. Sagar Damodar Sarda Consultant Nephrologist & Kidney Transplant Physician"
                  className="w-full h-80 sm:h-96 object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D59] via-[#0F2D59]/20 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold bg-teal-500 text-white px-2.5 py-0.5 rounded-full uppercase">
                    Lead Consultant
                  </span>
                  <h3 className="text-xl font-bold mt-1">Dr. Sagar Damodar Sarda</h3>
                  <p className="text-xs text-teal-200">MBBS, MD Medicine, DM Nephrology</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Consultant Nephrologist & Kidney Transplant Physician
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. MISSION, VISION & CORE VALUES (Consistent Heights & Staggered Motion) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* 01 Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-sm font-extrabold text-slate-300">01</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F2D59] mb-2">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To provide compassionate, evidence-based kidney and urology care that supports
                patient well-being, informed decisions, and accessible specialist consultations.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-700 flex items-center gap-1">
              <span>Compassionate • Evidence-Based</span>
            </div>
          </motion.div>

          {/* 02 Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-sm font-extrabold text-slate-300">02</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F2D59] mb-2">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To build a trusted center for kidney and urinary health in Chandrapur, offering
                coordinated specialist care and a patient-friendly healthcare experience.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-semibold text-teal-700 flex items-center gap-1">
              <span>Trusted Healthcare Partner</span>
            </div>
          </motion.div>

          {/* 03 Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-extrabold text-slate-300">03</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F2D59] mb-2">
                Our Core Values
              </h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Patient-centered care</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Ethical and transparent practice</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Respect and compassion</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Evidence-based medical guidance</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <span>Integrity & Clinical Excellence</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. NEW SECTION: OUR SPECIALTIES (Two Specialties. One Commitment.) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-teal-300 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Our Specialties
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white">
              Two Specialties. One Commitment to Care.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Dedicated care for kidney and urinary health, under one hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nephrology Box */}
            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Nephrology</h3>
              <p className="text-xs text-teal-200 font-semibold">
                Kidney health and medical kidney care
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                CKD management, dialysis care, hypertension-related kidney care, glomerular
                diseases, and medical renal evaluation.
              </p>
            </div>

            {/* Urology Box */}
            <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-sky-300 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Urology</h3>
              <p className="text-xs text-sky-200 font-semibold">
                Urinary system and urological care
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Urological consultations and treatment for conditions of the urinary tract, stone
                medical evaluation, and voiding health.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("services")}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md inline-flex items-center gap-2"
            >
              <span>Explore All Specialties & Services</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* 6. UPDATED CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-50 border border-teal-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <span className="text-teal-700 text-[11px] font-bold uppercase tracking-wider block">
              Need Specialist Care?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">
              Questions About Your Kidney or Urinary Health?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Connect with the appropriate specialist at Chandrapur Kidney Care and understand your
              next steps.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("appointment")}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book an Appointment
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className="bg-white hover:bg-slate-100 text-[#0F2D59] font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-slate-200 transition text-center"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
