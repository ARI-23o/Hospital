import React from 'react';
import { 
  HeartPulse, Shield, UserCheck, Stethoscope, ArrowRight, CheckCircle2, 
  Activity, Award, Building, Calendar, Phone, Sparkles, MapPin, Users, Star, MessageCircle
} from 'lucide-react';

export default function HomePage({ setActiveTab }) {
  const quickServices = [
    { title: 'CKD Management', desc: 'Staging, monitoring and nephro-protection to slow progression.', icon: Activity },
    { title: 'Dialysis Care', desc: 'Hemodialysis supervision, fistula care, and adequacy review.', icon: HeartPulse },
    { title: 'Hypertension Care', desc: 'Specialized blood pressure control to safeguard kidneys.', icon: Shield },
    { title: 'Kidney Stone Care', desc: 'Medical metabolic evaluation and recurrence prevention.', icon: Stethoscope },
  ];

  const stats = [
    { number: '1,500+', label: 'Patients Treated', icon: Users },
    { number: '12+ Years', label: 'Clinical Experience', icon: Award },
    { number: 'Modern', label: 'Dialysis Facility', icon: Building },
    { number: '100%', label: 'Personalized Care', icon: UserCheck },
  ];

  return (
    <div className="space-y-10 sm:space-y-16 pb-8">
      
      {/* 1. HERO SECTION (Mobile-First) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-6 pb-10 sm:pt-12 sm:pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Column 1: Hero Text */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-800 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Premier Kidney Clinic in Chandrapur</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2D59] leading-[1.2] tracking-tight">
                Expert Care for <span className="text-[#0D9488]">Healthier Kidneys,</span> Brighter Tomorrows
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Compassionate, comprehensive, and evidence-based nephrology medical care led by <strong className="text-[#0F2D59]">Dr. Sagar Sarda</strong>. Dedicated to slowing kidney disease, dialysis management, and blood pressure control.
              </p>

              {/* Action Buttons - Full width on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  onClick={() => setActiveTab('appointment')}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>

                <button
                  onClick={() => setActiveTab('services')}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 active:scale-95 text-[#0F2D59] font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-slate-200 shadow-sm transition text-center"
                >
                  Explore Services
                </button>
              </div>

              {/* Doctor Quick Badge */}
              <div 
                onClick={() => setActiveTab('doctor')} 
                className="pt-3 border-t border-slate-200/80 flex items-center gap-3.5 cursor-pointer group bg-white/60 p-3 rounded-2xl border border-slate-100"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0F2D59] to-teal-500 p-0.5 shadow-md shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src="/doctor_sagar_sarda.jpg"
                    alt="Dr. Sagar Sarda"
                    className="w-12 h-12 sm:w-13 sm:h-13 object-cover object-top rounded-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-[#0F2D59] text-sm sm:text-base group-hover:text-teal-700 transition">Dr. Sagar Sarda</h4>
                    <span className="bg-teal-100 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded">Consultant Nephrologist</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">MD (General Medicine), DM (Nephrology)</p>
                </div>
              </div>

            </div>

            {/* Column 2: Doctor Visual Card (Responsive) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-100">
                
                {/* Doctor Image Frame */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md group">
                  <img
                    src="/doctor_sagar_sarda.jpg"
                    alt="Dr. Sagar Sarda Nephrologist"
                    className="w-full h-72 sm:h-96 md:h-[420px] object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37] via-[#0A1D37]/15 to-transparent"></div>
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#0F2D59] px-3 py-1 rounded-full shadow border border-white/40 flex items-center gap-1.5 text-[11px] font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>12+ Yrs Experience</span>
                  </div>

                  {/* Bottom Doctor Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Senior Consultant
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                      Dr. Sagar Sarda
                    </h3>
                    <p className="text-xs font-semibold text-teal-200">
                      MD (Gen. Med), DM (Nephrology)
                    </p>
                  </div>
                </div>

                {/* Mobile Consultation Bar */}
                <div className="mt-3.5 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-800">OPD: Mon - Sat</p>
                      <p className="text-[11px] text-slate-500">9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('appointment')}
                    className="bg-[#0F2D59] hover:bg-teal-700 active:scale-95 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition shrink-0"
                  >
                    Book Slot
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FOUR PILLARS OF CARE (2x2 Grid on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {[
            { title: 'Expert Nephrologist', sub: 'Dr. Sagar Sarda (MD, DM)', icon: UserCheck, color: 'text-blue-600 bg-blue-50' },
            { title: 'Advanced Treatment', sub: 'Evidence-based care', icon: Shield, color: 'text-teal-600 bg-teal-50' },
            { title: 'Personalized Care', sub: 'Tailored for each patient', icon: HeartPulse, color: 'text-rose-600 bg-rose-50' },
            { title: 'Trusted Clinic', sub: '1500+ satisfied visits', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 shadow-soft border border-slate-100 text-center flex flex-col justify-center items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${pillar.color} flex items-center justify-center mb-2 sm:mb-3`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-base leading-snug">{pillar.title}</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">{pillar.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. COMPREHENSIVE KIDNEY CARE SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Specialized Treatments
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#0F2D59]">
            Comprehensive Kidney Care Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 sm:mt-2">
            Dedicated nephrology care focused on renal preservation, dialysis management, and blood pressure control.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div 
                key={idx} 
                onClick={() => setActiveTab('services')}
                className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 active:scale-98 hover:border-teal-300 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">{srv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-teal-600">
                  <span>Learn Details</span> <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setActiveTab('services')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#0F2D59] bg-slate-100 hover:bg-slate-200 px-5 py-3 rounded-xl transition"
          >
            View All 8 Nephrology Specializations <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. SERVING THE PEOPLE OF MAHARASHTRA BANNER & STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white p-6 sm:p-10 shadow-xl space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[11px] font-semibold text-teal-200">
              <MapPin className="w-3.5 h-3.5 text-teal-300" /> Chandrapur & Vidarbha Region
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Serving the People of Chandrapur, Maharashtra
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              Better Kidney Health. A Healthier Community. Bringing specialized nephrology and dialysis care directly to your neighborhood.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/20">
            {stats.map((st, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-extrabold text-teal-300">{st.number}</div>
                <div className="text-[11px] sm:text-xs text-slate-200">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base sm:text-xl font-bold text-[#0F2D59]">Early Detection Saves Kidney Function</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Schedule a screening with Dr. Sagar Sarda today for personalized care.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => setActiveTab('appointment')}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow transition"
            >
              Book Consultation Now
            </button>
            <a
              href="tel:+919876543210"
              className="bg-white hover:bg-slate-100 text-[#0F2D59] font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" /> +91 98765 43210
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}