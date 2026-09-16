import React from 'react';
import { 
  HeartPulse, Shield, UserCheck, Stethoscope, ArrowRight, CheckCircle2, 
  Activity, Award, Building, Calendar, Phone, Sparkles, MapPin, Users
} from 'lucide-react';

export default function HomePage({ setActiveTab }) {
  const quickServices = [
    { title: 'CKD Management', desc: 'Staging, monitoring and nephro-protection to slow progression.', icon: Activity },
    { title: 'Dialysis Care', desc: 'Hemodialysis supervision, fistula care, and adequacy review.', icon: HeartPulse },
    { title: 'Hypertension Care', desc: 'Specialized blood pressure control to safeguard kidneys.', icon: Shield },
    { title: 'Kidney Stone Management', desc: 'Medical metabolic evaluation and recurrence prevention.', icon: Stethoscope },
  ];

  const stats = [
    { number: '1000+', label: 'Patients Treated', icon: Users },
    { number: '12+ Years', label: 'Clinical Experience', icon: Award },
    { number: 'Modern', label: 'Facilities & Dialysis', icon: Building },
    { number: '100%', label: 'Personalized Treatment', icon: UserCheck },
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-800 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Premier Kidney Clinic in Chandrapura, Maharashtra
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2D59] leading-[1.18] tracking-tight">
                Expert Care for <span className="text-[#0D9488]">Healthier Kidneys,</span> Brighter Tomorrows
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                Compassionate, comprehensive, and evidence-based nephrology medical care led by <strong className="text-[#0F2D59]">Dr. Sagar Sadar</strong>. Specialized in slowing kidney disease, dialysis management, and blood pressure control.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('appointment')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5"
                >
                  Book an Appointment <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="bg-white hover:bg-slate-50 text-[#0F2D59] font-bold text-base px-6 py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all"
                >
                  Explore Services
                </button>
              </div>

              {/* Trust Doctor Badge */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0F2D59] to-teal-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-teal-700 font-bold text-lg">
                    🩺
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#0F2D59] text-base">Dr. Sagar Sadar</h4>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">Nephrologist</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">MD (General Medicine), DM (Nephrology) • Consultant Nephrologist</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Medical Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100/80">
                {/* Decorative background glow */}
                <div className="absolute -top-6 -right-6 w-48 h-48 bg-teal-400/15 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-blue-400/15 rounded-full blur-2xl pointer-events-none"></div>

                {/* Kidney Care Illustration Card */}
                <div className="relative rounded-2xl bg-gradient-to-br from-teal-600 via-[#0F2D59] to-[#0A1D37] text-white p-6 overflow-hidden shadow-inner">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-teal-400/20 backdrop-blur-sm text-teal-200 text-xs px-3 py-1 rounded-full font-semibold border border-teal-400/30">
                      Center of Renal Excellence
                    </span>
                    <HeartPulse className="w-7 h-7 text-teal-300 animate-pulse" />
                  </div>

                  <div className="my-6 text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner mb-3">
                      <span className="text-5xl">🫘</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">Renal Health & Protection</h3>
                    <p className="text-xs text-teal-100 mt-1">Non-transplant Specialized Kidney Care</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                    <div className="flex items-center justify-between text-slate-200">
                      <span>✓ Advanced Dialysis Guidance</span>
                      <span className="text-teal-300 font-bold">Available</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-200">
                      <span>✓ Comprehensive CKD Staging</span>
                      <span className="text-teal-300 font-bold">Stages 1-5</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-200">
                      <span>✓ Diabetic Kidney Screening</span>
                      <span className="text-teal-300 font-bold">Daily OPD</span>
                    </div>
                  </div>
                </div>

                {/* Consultation Card snippet */}
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">OPD Consultation</p>
                      <p className="text-[11px] text-slate-500">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('appointment')}
                    className="text-xs bg-[#0F2D59] hover:bg-teal-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    Book Slot
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FOUR PILLARS OF CARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: 'Expert Nephrologist', sub: 'Dr. Sagar Sadar (MD, DM)', icon: UserCheck, color: 'text-blue-600 bg-blue-50' },
            { title: 'Advanced Treatment', sub: 'Evidence-based protocols', icon: Shield, color: 'text-teal-600 bg-teal-50' },
            { title: 'Personalized Care', sub: 'Tailored for each patient', icon: HeartPulse, color: 'text-rose-600 bg-rose-50' },
            { title: 'Trusted by Patients', sub: 'Over 1000+ satisfied visits', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 hover:shadow-card transition-all text-center group">
                <div className={`w-12 h-12 mx-auto rounded-xl ${pillar.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">{pillar.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{pillar.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. COMPREHENSIVE KIDNEY CARE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Specialized Treatments
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59]">
            Comprehensive Kidney Care Services
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Dedicated nephrology care focused on preservation, symptom management, and improving your daily vitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div 
                key={idx} 
                onClick={() => setActiveTab('services')}
                className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100 hover:border-teal-300 hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-[#0F2D59] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-teal-700 transition-colors">{srv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-teal-600 group-hover:text-[#0F2D59]">
                  Learn Details <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setActiveTab('services')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0F2D59] hover:text-teal-600 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl transition"
          >
            View All 8 Nephrology Specializations <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. SERVING THE PEOPLE OF MAHARASHTRA BANNER & STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-teal-200 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-teal-300" /> Chandrapura & Surrounding Regions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Serving the People of Chandrapura, Maharashtra
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
              Better Kidney Health. A Healthier Community. Under the expert direction of Dr. Sagar Sadar, our facility brings modern, accessible, and compassionate kidney care directly to you.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/20">
            {stats.map((st, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">{st.number}</div>
                <div className="text-xs text-slate-200 mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>

          {/* Background artistic pattern */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <HeartPulse className="w-80 h-80 text-white" />
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-50/80 rounded-2xl p-8 border border-teal-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-[#0F2D59]">Early Detection Saves Kidney Function</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              If you have diabetes, high blood pressure, or swelling in the feet, schedule a screening with Dr. Sagar Sadar today.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('appointment')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition"
            >
              Book Consultation Now
            </button>
            <a
              href="tel:+919876543210"
              className="bg-white hover:bg-slate-100 text-[#0F2D59] font-bold text-sm px-4 py-3 rounded-xl border border-slate-200 transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-600" /> +91 98765 43210
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
