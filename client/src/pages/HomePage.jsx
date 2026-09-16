import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartPulse, Shield, UserCheck, Stethoscope, ArrowRight, CheckCircle2, 
  Activity, Award, Building, Calendar, Phone, Sparkles, MapPin, Users, Star, ChevronRight
} from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const cardStaggerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export default function HomePage({ setActiveTab }) {
  const quickServices = [
    { 
      title: 'CKD Management', 
      desc: 'Early staging, monitoring, and nephro-protective medical therapy to slow progression.', 
      icon: Activity 
    },
    { 
      title: 'Dialysis Care & Guidance', 
      desc: 'High-flux hemodialysis supervision, vascular access care, and adequacy monitoring.', 
      icon: HeartPulse 
    },
    { 
      title: 'Hypertension Care', 
      desc: 'Specialized blood pressure evaluation and management to preserve kidney health.', 
      icon: Shield 
    },
    { 
      title: 'Kidney Stone Management', 
      desc: 'Metabolic evaluation, recurrence prevention strategies, and medical therapies.', 
      icon: Stethoscope 
    },
  ];

  const trustPillars = [
    { 
      title: 'Expert Nephrologist', 
      desc: 'Doctor-led kidney care by Dr. Sagar Sarda (MD, DM).', 
      icon: UserCheck, 
      color: 'text-blue-600 bg-blue-50' 
    },
    { 
      title: 'Advanced Therapeutics', 
      desc: 'Evidence-based protocols and renoprotective treatments.', 
      icon: Shield, 
      color: 'text-teal-600 bg-teal-50' 
    },
    { 
      title: 'Personalized Care', 
      desc: 'Individualized medical and renal dietary planning.', 
      icon: HeartPulse, 
      color: 'text-rose-600 bg-rose-50' 
    },
    { 
      title: 'Compassionate Guidance', 
      desc: 'Clear, transparent counseling for patients and families.', 
      icon: CheckCircle2, 
      color: 'text-emerald-600 bg-emerald-50' 
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-8 overflow-hidden">
      
      {/* 1. HERO SECTION (Framer-Motion Smooth Staggered Entrance) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50/80 pt-6 pb-10 sm:pt-10 sm:pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Hero Content with Staggered Motion */}
            <motion.div 
              className="lg:col-span-6 space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200/80 text-teal-800 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Premier Kidney Clinic • Chandrapur, Maharashtra</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={itemVariants} className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0F2D59] leading-[1.2] tracking-tight">
                Expert Care for Healthier Kidneys. <br />
                <span className="text-[#0D9488]">Brighter Tomorrows.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
                Compassionate, comprehensive, and evidence-based nephrology medical care led by <strong className="text-[#0F2D59]">Dr. Sagar Sarda</strong>. Dedicated to slowing kidney disease progression, dialysis guidance, and specialized blood pressure management.
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
                  Explore Services
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

            {/* Right Column: Doctor Visual Showcase (Motion Entrance) */}
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
                    className="w-full h-64 sm:h-80 md:h-[350px] lg:h-[380px] object-cover object-top transition duration-700 ease-out group-hover:scale-105"
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

      {/* 2. TRUST PILLARS SECTION (Scroll Reveal + Stagger) */}
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

      {/* 3. COMPREHENSIVE SERVICES SECTION (Scroll Reveal + Card Hover Lift) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Specialized Care
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#0F2D59]">
            Comprehensive Kidney Care Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Personalized nephrology protocols focused on native kidney preservation, dialysis support, and metabolic balance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div 
                key={idx} 
                custom={idx}
                variants={cardStaggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => setActiveTab('services')}
                className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between group hover:shadow-card"
              >
                <div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3.5 group-hover:bg-[#0F2D59] group-hover:text-white transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 group-hover:text-teal-700 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-teal-600 group-hover:text-[#0F2D59] transition-colors">
                  <span>Learn Details</span> <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('services')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#0F2D59] bg-slate-100 hover:bg-slate-200 px-6 py-3 rounded-xl transition-colors shadow-xs"
          >
            <span>View All 8 Nephrology Specializations</span> <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* 4. REGIONAL IMPACT & LOCATION SECTION (Scroll-Triggered) */}
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
              Better Kidney Health. A Healthier Community. Bringing specialized nephrology care and high-flux dialysis guidance directly to you.
            </p>
          </div>

          {/* Value Highlights */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/15 text-xs text-slate-200">
            {[
              { title: 'Doctor-Led', sub: 'Direct care by Senior Nephrologist' },
              { title: 'Dialysis Support', sub: 'High-flux hemodialysis supervision' },
              { title: 'CKD Staging', sub: 'Evidence-based delay of dialysis' },
              { title: 'Ethical Care', sub: 'Personalized care for every patient' },
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

      {/* 5. CALL TO ACTION SECTION (Scroll-Triggered) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="bg-teal-50 border border-teal-200/80 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs"
        >
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[#0F2D59]">Early Detection Saves Kidney Function</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              If you have diabetes, elevated blood pressure, or swelling in feet, consult Dr. Sagar Sarda today.
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