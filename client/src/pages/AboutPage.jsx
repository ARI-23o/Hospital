import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Award, CheckCircle, Clock, Building, Users } from 'lucide-react';

export default function AboutPage({ setActiveTab }) {
  return (
    <div className="space-y-14 pb-16">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] to-[#0D9488] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            About Chandrapura Kidney Care
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 tracking-tight">
            Committed to Better Kidney Health for a Healthier Community
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 font-normal leading-relaxed">
            A doctor-led nephrology center founded with the vision of providing compassionate, evidence-based, and accessible kidney care in Maharashtra.
          </p>
        </div>
      </section>

      {/* 2. Our Journey & Clinic Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-teal-700 bg-teal-50 font-bold text-xs px-3 py-1 rounded-full uppercase">
              Our Journey
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2D59]">
              Pioneering Doctor-Led Kidney Care in Chandrapura
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>Chandrapura Kidney Care</strong> was founded by <strong>Dr. Sagar Sadar (MD, DM Nephrology)</strong> with a deep conviction: every patient facing renal disease deserves prompt, empathetic, and scientifically backed medical guidance without the need for excessive travel.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We specialize in the non-invasive and medical preservation of renal function, meticulous management of chronic kidney disease (CKD), high-flux dialysis supervision, and difficult-to-control hypertension.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Dr. Sagar Sadar Leadership</h4>
                  <p className="text-xs text-slate-500">Every treatment protocol is directly supervised by our Senior Nephrologist.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Dedicated Nephrology Care</h4>
                  <p className="text-xs text-slate-500">Focused non-transplant renal care with personalized dietary and medical regimens.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-4 rounded-3xl shadow-card border border-slate-100">
              <div className="rounded-2xl bg-gradient-to-tr from-[#0F2D59] to-teal-700 text-white p-8 text-center relative overflow-hidden">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4 text-4xl shadow-inner">
                  🏥
                </div>
                <h3 className="text-xl font-extrabold text-white">Chandrapura Kidney Care</h3>
                <p className="text-xs text-teal-200 mt-1">Maharashtra, India</p>
                <div className="mt-6 pt-4 border-t border-white/15 text-xs text-slate-200 text-left space-y-2">
                  <p>✔ ISO-Grade Dialysis Protocols</p>
                  <p>✔ Comprehensive Staging & Delay of Dialysis</p>
                  <p>✔ Patient & Family Counseling</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Mission, Vision, and Values Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Mission */}
          <div className="bg-white rounded-2xl p-7 shadow-soft border border-slate-100 hover:shadow-card transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2D59] mb-2">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To deliver evidence-based, patient-centered kidney care with compassion and integrity, empowering patients with knowledge and tailored therapeutics to safeguard renal function.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-700">
              Compassionate • Scientific • Accessible
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl p-7 shadow-soft border border-slate-100 hover:shadow-card transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2D59] mb-2">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To be the most trusted and respected center for kidney health in Maharashtra, advancing preventive nephrology, enhancing dialysis patient comfort, and eliminating preventable kidney failure.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-teal-700">
              Healthier Kidneys • Stronger Communities
            </div>
          </div>

          {/* Values */}
          <div className="bg-white rounded-2xl p-7 shadow-soft border border-slate-100 hover:shadow-card transition flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F2D59] mb-2">Our Core Values</h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <strong>Patient First:</strong> Uncompromising dedication to comfort.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <strong>Ethical Practice:</strong> Honest, transparent guidance.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <strong>Continuous Learning:</strong> Adopting latest nephrology advances.
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-700">
              Integrity & Clinical Excellence
            </div>
          </div>

        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Have Questions About Your Kidney Health?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Consult with Dr. Sagar Sadar for personalized advice on your reports and treatment path.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('appointment')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-lg shrink-0"
          >
            Schedule Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
