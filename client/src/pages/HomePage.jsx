import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, Shield, UserCheck, Stethoscope, ArrowRight, CheckCircle2, 
  Activity, Award, Building, Calendar, Phone, Sparkles, MapPin, Users, Star, 
  ChevronRight, Microscope, Scale, Gauge, Droplet, ShieldAlert
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const cardStaggerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function HomePage({ setActiveTab }) {
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'nephrology' | 'urology'

  const allServices = [
    // Nephrology
    { 
      id: 'ckd',
      category: 'nephrology',
      title: 'Chronic Kidney Disease (CKD)', 
      desc: 'Comprehensive staging (Stages 1-5), monitoring, and renoprotective medical therapies to slow disease progression.', 
      icon: Activity,
      tag: 'Nephrology'
    },
    { 
      id: 'dialysis',
      category: 'nephrology',
      title: 'Dialysis Care & Guidance', 
      desc: 'High-flux hemodialysis supervision, vascular access (AV fistula) monitoring, and adequacy optimization.', 
      icon: HeartPulse,
      tag: 'Nephrology'
    },
    { 
      id: 'hypertension',
      category: 'nephrology',
      title: 'Hypertension & Kidney Health', 
      desc: 'Targeted management of secondary and resistant high blood pressure to safeguard native renal function.', 
      icon: Gauge,
      tag: 'Nephrology'
    },
    { 
      id: 'stones',
      category: 'both',
      title: 'Kidney Stone Medical Care', 
      desc: 'Metabolic urine evaluation (24-hour chemistry), medical dissolution protocols, and recurrence prevention.', 
      icon: ShieldAlert,
      tag: 'Nephrology & Urology'
    },
    // Urology & Urinary Care
    { 
      id: 'uti',
      category: 'urology',
      title: 'Urinary Tract Infections (UTI)', 
      desc: 'Accurate culture-guided antibiotic therapy, recurrence prevention regimens, and structural evaluation.', 
      icon: Stethoscope,
      tag: 'Urology'
    },
    { 
      id: 'glomerular',
      category: 'nephrology',
      title: 'Glomerular Diseases & Proteinuria', 
      desc: 'Nephrotic & Nephritic syndrome evaluation, kidney biopsy review, and targeted immunotherapy.', 
      icon: Microscope,
      tag: 'Nephrology'
    },
    { 
      id: 'electrolytes',
      category: 'nephrology',
      title: 'Electrolyte & Mineral Balance', 
      desc: 'Prompt correction of potassium, sodium, calcium, and bone-mineral disorders (CKD-MBD).', 
      icon: Scale,
      tag: 'Nephrology'
    },
    { 
      id: 'bladder',
      category: 'urology',
      title: 'Bladder & Voiding Health', 
      desc: 'Clinical evaluation of urinary frequency, urgency, painful voiding, and non-surgical lower urinary symptoms.', 
      icon: Droplet,
      tag: 'Urology'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(s => s.category === activeCategory || s.category === 'both');

  const trustPillars = [
    { 
      title: 'Expert Nephrologist', 
      desc: 'Doctor-led medical kidney care by Dr. Sagar Sarda (MD, DM).', 
      icon: UserCheck, 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      title: 'Kidney & Urinary Care', 
      desc: 'Comprehensive nephrology, dialysis support & urinary wellness.', 
      icon: Shield, 
      color: 'text-teal-600 bg-teal-50' 
    },
    { 
      title: 'Personalized Treatment', 
      desc: 'Individualized medical and renal dietary planning for each patient.', 
      icon: HeartPulse, 
      color: 'text-rose-600 bg-rose-50' 
    },
    { 
      title: 'Compassionate Guidance', 
      desc: 'Clear, transparent counseling for patients and their families.', 
      icon: CheckCircle2, 
      color: 'text-emerald-600 bg-emerald-50' 
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-8 overflow-hidden">
      
      {/* 1. HERO SECTION (Updated Headline & Dual Specialty Copy) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50/80 pt-6 pb-10 sm:pt-10 sm:pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Hero Content */}
            <motion.div 
              className="lg:col-span-6 space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/80 text-teal-800 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Premier Kidney & Urology Care • Chandrapur, Maharashtra</span>
              </motion.div>

              {/* Exact Requested Headline */}
              <motion.h1 variants={itemVariants} className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0F2D59] leading-[1.18] tracking-tight">
                Complete Kidney & Urology Care. <br />
                <span className="text-[#0D9488]">Better Health. Brighter Tomorrows.</span>
              </motion.h1>

              {/* Exact Requested Supporting Text */}
              <motion.p variants={itemVariants} className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
                Comprehensive care for kidney health, urinary conditions, and urological concerns, with a focus on personalized treatment and patient well-being.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('appointment')}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  <span>Book an Appointment</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab('services')}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-[#0F2D59] font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-200 shadow-xs text-center transition-colors"
                >
                  Explore Our Services
                </motion.button>
              </motion.div>

              {/* Doctor Quick Badge */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.01, y: -2 }}
                onClick={() => setActiveTab('doctor')} 
                className="pt-3 border-t border-slate-200/80 flex items-center gap-3.5 cursor-pointer group bg-white/80 p-3 rounded-2xl border border-slate-100 hover:border-teal-200 transition shadow-xs"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0F2D59] to-teal-500 p-0.5 shadow-sm shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src="/doctor_sagar_sarda.jpg"
                    alt="Dr. Sagar Sarda"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-[#0F2D59] text-sm group-hover:text-teal-700 transition">Dr. Sagar Sarda</h4>
                    <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">Consultant Nephrologist</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">MD (General Medicine) • DM (Nephrology)</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition" />
              </motion.div>

            </motion.div>

            {/* Right Column: Doctor Showcase Card */}
            <motion.div 
              className="lg:col-span-6 relative"
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative mx-auto max-w-lg bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100">
                
                {/* Doctor Portrait Container with subtle hover zoom */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md group">
                  <img
                    src="/doctor_sagar_sarda.jpg"
                    alt="Dr. Sagar Sarda Consultant Nephrologist"
                    className="w-full h-64 sm:h-80 md:h-[350px] lg:h-[380px] object-cover object-top transition duration-700 ease-out group-hover:scale-103"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37] via-[#0A1D37]/15 to-transparent"></div>
                  
                  {/* Doctor Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-teal-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Consultant Nephrologist
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                      Dr. Sagar Sarda
                    </h3>
                    <p className="text-xs font-semibold text-teal-200">
                      MD (Gen. Med), DM (Nephrology)
                    </p>
                  </div>
                </div>

                {/* Consultation Booking Bar */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-800">OPD Consultation</p>
                      <p className="text-[11px] text-slate-500">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('appointment')}
                    className="bg-[#0F2D59] hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shrink-0 shadow-xs"
                  >
                    Book Slot
                  </motion.button>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. TWO SPECIALTY CARDS (Directly Below Hero Section with Scroll Reveal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Our Core Specialties
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2D59] mt-1.5">
            Specialized Care Under One Roof
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Specialty 01: Nephrology (Fades in from left) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            onClick={() => {
              setActiveCategory('nephrology');
              setActiveTab('services');
            }}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 cursor-pointer group flex flex-col justify-between"
          >
            {/* Artistic Medical Banner */}
            <div className="h-44 sm:h-52 bg-gradient-to-tr from-[#0F2D59] via-teal-900 to-[#0A1D37] p-6 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-1 relative z-10">
                <span className="bg-teal-400/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-400/30">
                  Specialty 01
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">Nephrology</h3>
                <p className="text-xs text-teal-200">Kidney Health & Dialysis</p>
              </div>

              {/* Kidney Graphic */}
              <motion.div 
                whileHover={{ scale: 1.12 }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl border border-white/20 shadow-inner relative z-10"
              >
                🫘
              </motion.div>

              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
                <HeartPulse className="w-56 h-56 text-teal-300" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 bg-slate-900 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kidney health, chronic kidney disease (CKD Stages 1-5) management, hypertension control, and dialysis care under Dr. Sagar Sarda.
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-teal-400 group-hover:text-teal-300 transition">
                <span>Explore Nephrology Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Specialty 02: Urology (Fades in from right) */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            onClick={() => {
              setActiveCategory('urology');
              setActiveTab('services');
            }}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 cursor-pointer group flex flex-col justify-between"
          >
            {/* Artistic Medical Banner */}
            <div className="h-44 sm:h-52 bg-gradient-to-tr from-[#0F2D59] via-blue-950 to-teal-950 p-6 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-1 relative z-10">
                <span className="bg-blue-400/20 text-sky-300 text-xs font-bold px-3 py-1 rounded-full border border-sky-400/30">
                  Specialty 02
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">Urology</h3>
                <p className="text-xs text-sky-200">Urinary System & Health</p>
              </div>

              {/* Urology / Urinary Anatomy Icon Graphic */}
              <motion.div 
                whileHover={{ scale: 1.12 }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl border border-white/20 shadow-inner relative z-10"
              >
                🩺
              </motion.div>

              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
                <Stethoscope className="w-56 h-56 text-sky-300" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 bg-slate-900 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Care for urinary tract conditions, recurrent infections, stone medical evaluation, bladder wellness, and urological health guidance.
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300 transition">
                <span>Explore Urology Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. TRUST PILLARS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={idx} 
                custom={idx}
                variants={cardStaggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-soft border border-slate-100 flex flex-col justify-between transition-shadow hover:shadow-card cursor-default"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${pillar.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{pillar.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. COMPREHENSIVE SERVICES SECTION (Categorized with Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Our Specialized Care
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#0F2D59]">
            Nephrology & Urology Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Evidence-based medical care for renal preservation, dialysis supervision, and urinary tract conditions.
          </p>

          {/* Category Toggle Tabs */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'nephrology', label: 'Nephrology' },
              { id: 'urology', label: 'Urology' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeCategory === tab.id
                    ? 'bg-[#0F2D59] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <motion.div 
                  key={srv.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => setActiveTab('services')}
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
                    <span>Learn Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-6">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('services')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#0F2D59] bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-xl transition-colors shadow-xs"
          >
            <span>View Complete Directory & Treatments</span> <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* 5. REGIONAL IMPACT & LOCATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-6 sm:p-10 shadow-xl space-y-6"
        >
          
          <div className="relative z-10 space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-teal-200 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-teal-300" /> Chandrapur, Maharashtra
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Serving the People of Chandrapur, Maharashtra
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Better Kidney & Urinary Health. A Healthier Community. Bringing specialized nephrology care and urological consultation support directly to you.
            </p>
          </div>

          {/* Value Highlights */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/15 text-xs text-slate-200">
            {[
              { title: 'Nephrology Focus', sub: 'Doctor-led kidney care by Dr. Sagar Sarda' },
              { title: 'Dialysis Support', sub: 'High-flux hemodialysis supervision' },
              { title: 'Urinary Health', sub: 'Evaluation of stone disease & infections' },
              { title: 'Patient-First', sub: 'Personalized treatment roadmap' },
            ].map((box, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10"
              >
                <span className="font-bold text-teal-300 block text-sm">{box.title}</span>
                {box.sub}
              </motion.div>
            ))}
          </div>

          {/* Background watermark */}
          <div className="absolute right-0 bottom-0 top-0 w-1/4 opacity-5 pointer-events-none flex items-center justify-center">
            <HeartPulse className="w-64 h-64 text-white" />
          </div>

        </motion.div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="bg-teal-50 border border-teal-200/80 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs"
        >
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[#0F2D59]">Early Diagnosis Protects Renal Health</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Schedule a comprehensive kidney & urinary consultation with Dr. Sagar Sarda today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('appointment')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              Book Consultation Now
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="tel:+919876543210"
              className="bg-white hover:bg-slate-100 text-[#0F2D59] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" /> +91 98765 43210
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}