import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Shield,
  UserCheck,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Activity,
  Award,
  Building,
  Calendar,
  Phone,
  Sparkles,
  MapPin,
  Users,
  Star,
  ChevronRight,
  ChevronDown,
  Microscope,
  Scale,
  Gauge,
  Droplet,
  ShieldAlert,
  Clock,
  Sparkle,
  BedDouble,
  FileText,
  Check,
  Layers,
  Zap,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import ThreeKidneyVisualizer from "../components/ThreeKidneyVisualizer";
import KidneyHealthCalculator from "../components/KidneyHealthCalculator";
import LiveOpdQueue from "../components/LiveOpdQueue";
import MarqueeTicker from "../components/MarqueeTicker";
import DoctorScheduleExplorer from "../components/DoctorScheduleExplorer";
import { useLanguage } from "../context/LanguageContext";
import { fullFaqsList } from "../data/faqsData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomePage({ setActiveTab }) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all"); // 'all' | 'nephrology' | 'urology'
  const [faqCategory, setFaqCategory] = useState("nephrology");
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs = fullFaqsList.filter((f) => f.category === faqCategory).slice(0, 6);

  const allServices = [
    // Nephrology
    {
      id: "ckd",
      category: "nephrology",
      title: "Chronic Kidney Disease (CKD)",
      desc: "Comprehensive staging (Stages 1-5), monitoring, and renoprotective medical therapies to slow disease progression.",
      icon: Activity,
      tag: "Nephrology",
    },
    {
      id: "dialysis",
      category: "nephrology",
      title: "Dialysis Care & Guidance",
      desc: "High-flux hemodialysis supervision, vascular access (AV fistula) monitoring, and adequacy optimization.",
      icon: HeartPulse,
      tag: "Nephrology",
    },
    {
      id: "hypertension",
      category: "nephrology",
      title: "Hypertension & Kidney Health",
      desc: "Targeted management of secondary and resistant high blood pressure to safeguard native renal function.",
      icon: Gauge,
      tag: "Nephrology",
    },
    {
      id: "stones",
      category: "both",
      title: "Kidney Stone Medical Care",
      desc: "Metabolic urine evaluation (24-hour chemistry), medical dissolution protocols, and recurrence prevention.",
      icon: ShieldAlert,
      tag: "Nephrology & Urology",
    },
    // Urology & Urinary Care
    {
      id: "uti",
      category: "urology",
      title: "Urinary Tract Infections (UTI)",
      desc: "Accurate culture-guided antibiotic therapy, recurrence prevention regimens, and structural evaluation.",
      icon: Stethoscope,
      tag: "Urology",
    },
    {
      id: "glomerular",
      category: "nephrology",
      title: "Glomerular Diseases & Proteinuria",
      desc: "Nephrotic & Nephritic syndrome evaluation, kidney biopsy review, and targeted immunotherapy.",
      icon: Microscope,
      tag: "Nephrology",
    },
    {
      id: "electrolytes",
      category: "nephrology",
      title: "Electrolyte & Mineral Balance",
      desc: "Prompt correction of potassium, sodium, calcium, and bone-mineral disorders (CKD-MBD).",
      icon: Scale,
      tag: "Nephrology",
    },
    {
      id: "bladder",
      category: "urology",
      title: "Bladder & Voiding Health",
      desc: "Clinical evaluation of urinary frequency, urgency, painful voiding, and non-surgical lower urinary symptoms.",
      icon: Droplet,
      tag: "Urology",
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? allServices
      : allServices.filter((s) => s.category === activeCategory || s.category === "both");

  const facilities = [
    {
      title: "Modern Dialysis Unit",
      desc: "Equipped with advanced hemodialysis machines, high-flux dialyzers, ultra-pure water treatment plant (RO), and strict infection control barrier protocols.",
      icon: HeartPulse,
      tag: "Specialized Care",
      features: [
        "High-Flux Dialyzers",
        "Dedicated RO Water System",
        "Individual Patient Monitoring",
        "Emergency Backup",
      ],
    },
    {
      title: "Consultation Suites",
      desc: "Private, comfortable, and well-lit doctor chambers designed for thorough clinical evaluation and patient-family counseling.",
      icon: Users,
      tag: "OPD Excellence",
      features: [
        "Ergonomic Examination Bed",
        "Digital Health Record Station",
        "Private Counseling Space",
        "Air Conditioned Comfort",
      ],
    },
    {
      title: "Patient Waiting Area",
      desc: "Spacious, clean, and tranquil reception lounge designed to minimize stress and waiting time for patients and accompanying relatives.",
      icon: Clock,
      tag: "Patient Comfort",
      features: [
        "Air Filtered Environment",
        "Comfortable Seating Layout",
        "Drinking Water Station",
        "Wheelchair Accessibility",
      ],
    },
    {
      title: "Pathology & Diagnostic Support",
      desc: "Rapid turn-around diagnostic support for Kidney Function Tests (KFT), Serum Creatinine, Electrolytes, Urine Microalbumin, and Blood Counts.",
      icon: Microscope,
      tag: "Fast Results",
      features: [
        "Kidney Function Tests (KFT)",
        "Serum Electrolytes (Na/K)",
        "Spot Urine Protein:Creatinine",
        "Complete Hemogram & Blood Sugar",
      ],
    },
  ];

  const stats = [
    { value: "15,000+", label: "Dialysis Sessions Supervised", icon: HeartPulse },
    { value: "100%", label: "Doctor-Led Consultations", icon: UserCheck },
    { value: "12+ Yrs", label: "Nephrology Expertise", icon: Award },
    { value: "24/7", label: "Emergency Dialysis Support", icon: Clock },
  ];

  const patientReviews = [
    {
      name: "Rameshwar Patil",
      location: "Chandrapur",
      rating: 5,
      comment:
        "Dr. Sagar Sarda diagnosed my father’s CKD early and tailored his medicine and diet. His creatinine has stabilized without needing immediate dialysis. Truly grateful.",
      tag: "Nephrology Care",
    },
    {
      name: "Sunita Deshmukh",
      location: "Ballarpur",
      rating: 5,
      comment:
        "The hemodialysis center is exceptionally clean and comfortable. Staff and Dr. Sarda monitor every session with utmost care and attention.",
      tag: "Dialysis Unit",
    },
    {
      name: "Anil Roy",
      location: "Chandrapur",
      rating: 5,
      comment:
        "Suffered from severe recurring kidney stones. Dr. Sarda ran a 24-hr metabolic profile and gave preventive therapy. Zero recurrence for over a year now!",
      tag: "Kidney Stone Care",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 overflow-hidden">
      {/* 1. HERO SECTION WITH 3D VISUALIZER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1D37] via-[#0F2D59] to-[#0A1A2F] text-white pt-8 pb-16 sm:pt-12 sm:pb-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Hero Content */}
            <motion.div
              className="lg:col-span-6 space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-400/30 text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm"
              >
                <Sparkles
                  className="w-3.5 h-3.5 text-teal-300 animate-spin"
                  style={{ animationDuration: "6s" }}
                />
                <span>{t("hero.badge")}</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.18] tracking-tight"
              >
                {t("hero.mainTitle1")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 animate-gradient-text">
                  {t("hero.mainTitle2")}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl"
              >
                {t("hero.subtitle")}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab("appointment")}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t("common.bookAppointment")}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const el = document.getElementById("services-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else setActiveTab("services");
                  }}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/20 shadow-xs text-center transition-all backdrop-blur-md"
                >
                  {t("common.exploreServices")}
                </motion.button>
              </motion.div>

              {/* Doctor Quick Badge */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  const el = document.getElementById("doctor-profile-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else setActiveTab("doctor");
                }}
                className="pt-3 border-t border-white/15 flex items-center gap-3.5 cursor-pointer group bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-teal-400/40 transition shadow-xs"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 p-0.5 shadow-sm shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src="/doctor_sagar_sarda.jpg"
                    alt="Dr. Sagar Damodar Sarda"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-white text-sm group-hover:text-teal-300 transition">
                      Dr. Sagar Damodar Sarda
                    </h4>
                    <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                      Lead Consultant
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 truncate">
                    MBBS, MD Medicine, DM Nephrology • Transplant Physician
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.div>

            {/* Right Column: 3D Interactive Organ Visualizer */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ThreeKidneyVisualizer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. LIVE OPD QUEUE TRACKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <LiveOpdQueue setActiveTab={setActiveTab} />
      </section>

      {/* 3. MARQUEE CLINICAL TICKER */}
      <section className="w-full overflow-hidden">
        <MarqueeTicker />
      </section>

      {/* 4. DOCTOR PROFILE & CLINICAL LEADERSHIP SPOTLIGHT */}
      <section id="doctor-profile-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Doctor Photo and Quick Stats */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-teal-500/30 bg-slate-100 aspect-4/5 max-w-sm mx-auto">
                <img
                  src="/doctor_sagar_sarda.jpg"
                  alt="Dr. Sagar Damodar Sarda"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/90 via-[#0A1D37]/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300">
                    Lead Consultant & Director
                  </span>
                  <h3 className="text-lg font-extrabold">Dr. Sagar Damodar Sarda</h3>
                  <p className="text-xs text-slate-200">MBBS, MD Medicine, DM Nephrology</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center max-w-sm mx-auto">
                <div className="bg-teal-50 p-2.5 rounded-xl border border-teal-100">
                  <span className="text-lg font-black text-[#0F2D59]">12+ Yrs</span>
                  <p className="text-[10px] text-slate-600 font-semibold">Clinical Experience</p>
                </div>
                <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-100">
                  <span className="text-lg font-black text-teal-700">15,000+</span>
                  <p className="text-[10px] text-slate-600 font-semibold">Dialysis Supervised</p>
                </div>
              </div>
            </div>

            {/* Right: Detailed Biography, Expertise & Credentials */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-teal-600" /> Super-Specialist Leadership
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59] tracking-tight">
                  Dedicated, Evidence-Based Renal Care in Chandrapur
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Dr. Sagar Damodar Sarda is a super-specialist Consultant Nephrologist & Kidney
                  Transplant Physician with extensive clinical experience across top-tier tertiary
                  institutes. He provides dedicated evaluation and personalized renoprotection for
                  patients suffering from acute and chronic kidney disorders.
                </p>
              </div>

              {/* Core Qualifications & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <Award className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      MD (General Medicine) & DM (Nephrology)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Super-specialty training from apex medical institutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Transplant Physician Guidance
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Pre-transplant workup, donor matching, and post-transplant follow-up.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <Activity className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      High-Flux Hemodialysis Supervision
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Vascular access (AV fistula) monitoring and adequacy optimization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Kidney Stone Metabolic Workup
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      24-hour urine chemistry and medical recurrence prevention protocols.
                    </p>
                  </div>
                </div>
              </div>

              {/* OPD Consultation Timings Badge */}
              <div className="bg-gradient-to-r from-teal-50 to-sky-50 p-4 rounded-2xl border border-teal-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    <strong>OPD Timings:</strong> Mon - Sat (09:00 AM - 01:30 PM & 04:30 PM - 07:30
                    PM)
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("appointment")}
                  className="bg-[#0F2D59] hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-sm shrink-0"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TWO CORE SPECIALTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Our Core Specialties
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59] mt-1.5">
            Two Specialties. One Dedicated Center.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specialty 01: Nephrology Card */}
          <div
            onClick={() => {
              setActiveCategory("nephrology");
              const el = document.getElementById("services-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 hover:border-teal-500/50 cursor-pointer group flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
          >
            <div className="h-44 sm:h-52 bg-gradient-to-tr from-[#0F2D59] via-teal-900 to-[#0A1D37] p-6 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-1 relative z-10">
                <span className="bg-teal-400/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-400/30">
                  Specialty 01
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">Nephrology</h3>
                <p className="text-xs text-teal-200">Kidney Health & Dialysis Care</p>
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl border border-white/20 shadow-inner relative z-10 transition-transform duration-300 group-hover:scale-105">
                🫘
              </div>

              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
                <HeartPulse className="w-56 h-56 text-teal-300" />
              </div>
            </div>

            <div className="p-6 bg-slate-900 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kidney disease management (CKD 1-5), high-flux hemodialysis supervision,
                hypertension control, diabetic kidney care, and nephrology consultation under Dr.
                Sagar Sarda.
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-teal-400 group-hover:text-teal-300 transition">
                <span>Explore Nephrology Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Specialty 02: Urology Card */}
          <div
            onClick={() => {
              setActiveCategory("urology");
              const el = document.getElementById("services-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 hover:border-sky-500/50 cursor-pointer group flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
          >
            <div className="h-44 sm:h-52 bg-gradient-to-tr from-[#0F2D59] via-blue-950 to-teal-950 p-6 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-1 relative z-10">
                <span className="bg-blue-400/20 text-sky-300 text-xs font-bold px-3 py-1 rounded-full border border-sky-400/30">
                  Specialty 02
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">Urology</h3>
                <p className="text-xs text-sky-200">Urinary System & Voiding Health</p>
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl border border-white/20 shadow-inner relative z-10 transition-transform duration-300 group-hover:scale-105">
                🩺
              </div>

              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
                <Stethoscope className="w-56 h-56 text-sky-300" />
              </div>
            </div>

            <div className="p-6 bg-slate-900 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Specialist evaluation for urinary tract infections (UTI), kidney stone medical
                dissolution, bladder health, voiding concerns, and coordinated urological guidance.
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300 transition">
                <span>Explore Urology Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPREHENSIVE SERVICES DIRECTORY */}
      <section id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Clinical Services Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59]">
            Nephrology & Urology Treatments
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Evidence-based medical care for renal preservation, dialysis supervision, and urinary
            tract conditions.
          </p>

          {/* Category Toggle Tabs */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[
              { id: "all", label: "All Services" },
              { id: "nephrology", label: "Nephrology" },
              { id: "urology", label: "Urology" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeCategory === tab.id
                    ? "bg-[#0F2D59] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={srv.id}
                  onClick={() => setActiveTab("services")}
                  className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-[#0F2D59] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 group-hover:text-teal-700 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600 group-hover:text-[#0F2D59] transition-colors">
                    <span>Clinical Protocols</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 7. HOSPITAL FACILITIES & DIALYSIS UNIT SHOWCASE */}
      <section id="facilities-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block text-[11px] font-bold text-teal-300 bg-teal-500/20 border border-teal-400/30 px-3 py-1 rounded-full uppercase tracking-wider">
              Advanced Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              State-of-the-Art Renal & Dialysis Facilities
            </h2>
            <p className="text-xs sm:text-slate-300">
              Meticulously designed clinical spaces prioritizing patient safety, sterile protocols,
              and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-4 hover:border-teal-500/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{fac.title}</h3>
                        <span className="text-[10px] font-semibold text-teal-400">{fac.tag}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{fac.desc}</p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/80">
                    {fac.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-1.5 text-[11px] text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CLINICAL eGFR & KIDNEY STONE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <KidneyHealthCalculator setActiveTab={setActiveTab} />
      </section>

      {/* 9. DOCTOR SCHEDULE & OPD TIMINGS EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DoctorScheduleExplorer setActiveTab={setActiveTab} />
      </section>

      {/* 10. CLINICAL STATS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2D59]">{s.value}</h3>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. PATIENT GUIDE & CATEGORIZED FAQS ACCORDION */}
      <section id="faqs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Patient Help & Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-slate-600">
              Clear clinical answers regarding kidney health, dialysis routines, and urology care.
            </p>

            {/* Category Switcher for FAQs */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setFaqCategory("nephrology")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  faqCategory === "nephrology"
                    ? "bg-[#0F2D59] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Nephrology FAQs
              </button>
              <button
                onClick={() => setFaqCategory("urology")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  faqCategory === "urology"
                    ? "bg-[#0F2D59] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Urology FAQs
              </button>
            </div>
          </div>

          {/* Accordion FAQ items */}
          <div className="max-w-3xl mx-auto space-y-3 pt-2">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all bg-slate-50/50"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-[#0F2D59] hover:text-teal-700 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-teal-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActiveTab("faqs")}
              className="text-xs font-bold text-teal-700 hover:text-[#0F2D59] inline-flex items-center gap-1 transition"
            >
              <span>View All Clinical FAQs & Patient Checklists</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. PATIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-50 to-teal-50/50 rounded-3xl p-6 sm:p-10 border border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-teal-700 bg-teal-100/60 px-3 py-1 rounded-full uppercase tracking-wider">
              Patient Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59] mt-1.5">
              Trusted by Patients Across Chandrapur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {patientReviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {rev.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{rev.name}</span>
                  <span className="text-slate-400 text-[11px]">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. REGIONAL IMPACT, CLINIC LOCATION & DIRECT ACTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-6 sm:p-10 shadow-xl space-y-6">
          <div className="relative z-10 space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-teal-200 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-teal-300" /> Behind LIC Office, Main Road,
              Chandrapur
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Serving Chandrapur & Surrounding Districts
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Dedicated nephrology and urology outpatient clinics, daily hemodialysis supervision,
              and 24/7 emergency renal support.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab("appointment")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Consultation Slot
            </button>
            <a
              href="https://maps.app.goo.gl/f1P5sEp6G8aWFc39A"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-teal-300" /> Open in Google Maps
            </a>
            <button
              onClick={() => setActiveTab("contact")}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-300" /> Contact Clinic
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
