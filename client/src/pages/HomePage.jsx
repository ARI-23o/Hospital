import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, Shield, UserCheck, Stethoscope, ArrowRight, CheckCircle2, 
  Activity, Award, Building, Calendar, Phone, Sparkles, MapPin, Users, Star, 
  ChevronRight, Microscope, Scale, Gauge, Droplet, ShieldAlert, Clock, Sparkle,
  BedDouble, FileText, Check, Layers, Zap
} from 'lucide-react';
import ThreeKidneyVisualizer from '../components/ThreeKidneyVisualizer';
import Interactive3DCard from '../components/Interactive3DCard';
import KidneyHealthCalculator from '../components/KidneyHealthCalculator';
import LiveOpdQueue from '../components/LiveOpdQueue';
import MarqueeTicker from '../components/MarqueeTicker';
import DoctorScheduleExplorer from '../components/DoctorScheduleExplorer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  }
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

  const stats = [
    { value: '15,000+', label: 'Dialysis Sessions Supervised', icon: HeartPulse },
    { value: '100%', label: 'Doctor-Led Consultations', icon: UserCheck },
    { value: '12+ Yrs', label: 'Nephrology Expertise', icon: Award },
    { value: '24/7', label: 'Emergency Dialysis Support', icon: Clock },
  ];

  const patientReviews = [
    {
      name: 'Rameshwar Patil',
      location: 'Chandrapur',
      rating: 5,
      comment: 'Dr. Sagar Sarda diagnosed my father’s CKD early and tailored his medicine and diet. His creatinine has stabilized without needing immediate dialysis. Truly grateful.',
      tag: 'Nephrology Care'
    },
    {
      name: 'Sunita Deshmukh',
      location: 'Ballarpur',
      rating: 5,
      comment: 'The hemodialysis center is exceptionally clean and comfortable. Staff and Dr. Sarda monitor every session with utmost care and attention.',
      tag: 'Dialysis Unit'
    },
    {
      name: 'Anil Roy',
      location: 'Chandrapur',
      rating: 5,
      comment: 'Suffered from severe recurring kidney stones. Dr. Sarda ran a 24-hr metabolic profile and gave preventive therapy. Zero recurrence for over a year now!',
      tag: 'Kidney Stone Care'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 overflow-hidden">
      
      {/* 1. ULTRA-MODERN HERO SECTION WITH FLOATING GLASS BADGES & 3D VISUALIZER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1D37] via-[#0F2D59] to-[#0A1A2F] text-white pt-8 pb-16 sm:pt-12 sm:pb-24">
        
        {/* Dynamic Multi-Layered Glowing Spheres (like dynografx.com) */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none"></div>

        {/* Floating Glassmorphism Metric Badges on Desktop */}
        <div className="hidden xl:block absolute left-8 top-32 z-20 animate-float-slow">
          <div className="px-4 py-3 rounded-2xl backdrop-blur-xl shadow-2xl border border-white/15 bg-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dialysis Safety</p>
              <p className="text-sm font-bold text-teal-300">High-Flux Dialysis</p>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute right-10 top-28 z-20 animate-float-reverse">
          <div className="px-4 py-3 rounded-2xl backdrop-blur-xl shadow-2xl border border-white/15 bg-white/5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Doctor Led</p>
              <p className="text-sm font-bold text-sky-300">DM Nephrologist</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Hero Content */}
            <motion.div 
              className="lg:col-span-6 space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-teal-500/15 border border-teal-400/30 text-teal-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Chandrapur's Premier Kidney & Urology Center</span>
              </motion.div>

              {/* Headline with animated gradient */}
              <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.18] tracking-tight">
                Complete Kidney & Urology Care. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 animate-gradient-text">
                  Better Health. Brighter Tomorrows.
                </span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p variants={itemVariants} className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
                Comprehensive care for kidney health, urinary conditions, and urological concerns, with a focus on personalized treatment, high-flux dialysis, and patient well-being under Dr. Sagar Sarda.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('appointment')}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book an Appointment</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab('services')}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/20 shadow-xs text-center transition-all backdrop-blur-md"
                >
                  Explore Our Services
                </motion.button>
              </motion.div>

              {/* Doctor Quick Badge */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveTab('doctor')} 
                className="pt-3 border-t border-white/15 flex items-center gap-3.5 cursor-pointer group bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-teal-400/40 transition shadow-xs"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 p-0.5 shadow-sm shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src="/doctor_sagar_sarda.jpg"
                    alt="Dr. Sagar Sarda"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-white text-sm group-hover:text-teal-300 transition">Dr. Sagar Sarda</h4>
                    <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold px-2 py-0.5 rounded">Lead Consultant</span>
                  </div>
                  <p className="text-xs text-slate-300 truncate">MD (General Medicine) • DM (Nephrology)</p>
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

      {/* 2. INFINITE MARQUEE TICKER */}
      <MarqueeTicker />

      {/* 3. LIVE OPD QUEUE TRACKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveOpdQueue setActiveTab={setActiveTab} />
      </section>

      {/* 4. DOCTOR SCHEDULE & OPD TIMINGS EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DoctorScheduleExplorer setActiveTab={setActiveTab} />
      </section>

      {/* 5. TWO SPECIALTY 3D PERSPECTIVE CARDS */}
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
          
          {/* Specialty 01: Nephrology 3D Card */}
          <Interactive3DCard
            onClick={() => {
              setActiveCategory('nephrology');
              setActiveTab('services');
            }}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-44 sm:h-52 bg-gradient-to-tr from-[#0F2D59] via-teal-900 to-[#0A1D37] p-6 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-1 relative z-10">
                <span className="bg-teal-400/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-400/30">
                  Specialty 01
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">Nephrology</h3>
                <p className="text-xs text-teal-200">Kidney Health & Dialysis Care</p>
              </div>

              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl border border-white/20 shadow-inner relative z-10"
              >
                🫘
              </motion.div>

              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
                <HeartPulse className="w-56 h-56 text-teal-300" />
              </div>
            </div>

            <div className="p-6 bg-slate-900 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kidney disease management (CKD 1-5), high-flux hemodialysis supervision, hypertension control, diabetic kidney care, and nephrology consultation under Dr. Sagar Sarda.
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-teal-400 group-hover:text-teal-300 transition">
                <span>Explore Nephrology Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Interactive3DCard>

          {/* Specialty 02: Urology 3D Card */}
          <Interactive3DCard
            onClick={() => {
              setActiveCategory('urology');
              setActiveTab('services');
            }}
            className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 cursor-pointer group flex flex-col justify-between"
          >
            <div className="h-44 sm:h-52 bg-gradient-to-tr from-[#0F2D59] via-blue-950 to-teal-950 p-6 relative overflow-hidden flex items-center justify-between">
              <div className="space-y-1 relative z-10">
                <span className="bg-blue-400/20 text-sky-300 text-xs font-bold px-3 py-1 rounded-full border border-sky-400/30">
                  Specialty 02
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">Urology</h3>
                <p className="text-xs text-sky-200">Urinary System & Voiding Health</p>
              </div>

              <motion.div 
                whileHover={{ scale: 1.15, rotate: -5 }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl border border-white/20 shadow-inner relative z-10"
              >
                🩺
              </motion.div>

              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
                <Stethoscope className="w-56 h-56 text-sky-300" />
              </div>
            </div>

            <div className="p-6 bg-slate-900 space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Specialist evaluation for urinary tract infections (UTI), kidney stone medical dissolution, bladder health, voiding concerns, and coordinated urological guidance.
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300 transition">
                <span>Explore Urology Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Interactive3DCard>

        </div>
      </section>

      {/* 6. CLINICAL eGFR & KIDNEY STONE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <KidneyHealthCalculator setActiveTab={setActiveTab} />
      </section>

      {/* 7. CLINICAL STATS SHOWCASE */}
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

      {/* 8. COMPREHENSIVE SERVICES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Clinical Services Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59]">
            Nephrology & Urology Treatments
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Evidence-based medical care for renal preservation, dialysis supervision, and urinary tract conditions.
          </p>

          {/* Category Toggle Tabs */}
          <div className="flex items-center justify-center gap-2 mt-4">
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
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredServices.map((srv) => {
              const Icon = srv.icon;
              return (
                <Interactive3DCard
                  key={srv.id}
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
                    <span>Clinical Protocols</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </Interactive3DCard>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 9. PATIENT TESTIMONIALS */}
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
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 flex flex-col justify-between">
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
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
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

      {/* 10. REGIONAL IMPACT & LOCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-6 sm:p-10 shadow-xl space-y-6">
          <div className="relative z-10 space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-teal-200 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-teal-300" /> Behind LIC Office, Main Road, Chandrapur
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Serving Chandrapur & Surrounding Districts
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Dedicated nephrology and urology outpatient clinics, daily hemodialysis supervision, and 24/7 emergency renal support.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveTab('appointment')}
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
          </div>
        </div>
      </section>

    </div>
  );
}