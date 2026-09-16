import React, { useState } from 'react';
import { 
  ClipboardList, Stethoscope, FileCheck, Shield, HelpCircle, 
  ChevronDown, CheckCircle2, Phone
} from 'lucide-react';

export default function PatientInfoPage({ setActiveTab }) {
  const [activeSection, setActiveSection] = useState('before');
  const [openFaq, setOpenFaq] = useState(null);

  const sections = [
    { id: 'before', label: 'Before Visit', fullLabel: 'Before Your Visit', icon: ClipboardList },
    { id: 'during', label: 'During Visit', fullLabel: 'During Your Visit', icon: Stethoscope },
    { id: 'after', label: 'After Visit', fullLabel: 'After Your Visit', icon: FileCheck },
    { id: 'insurance', label: 'Insurance', fullLabel: 'Insurance & Payment', icon: Shield },
    { id: 'faqs', label: 'FAQs', fullLabel: 'Frequently Asked Questions', icon: HelpCircle },
  ];

  const faqs = [
    {
      q: "What medical reports should I carry for my consultation with Dr. Sagar Sarda?",
      a: "Please bring all recent blood reports (Serum Creatinine, Blood Urea, Electrolytes, CBC, HbA1c/Blood Sugar), Urine Routine/Microscopic reports, Ultrasound Abdomen/KUB scans, and all previous prescription sheets and discharge summaries."
    },
    {
      q: "Do I need to be on an empty stomach (fasting) for my visit?",
      a: "For general nephrology consultations, fasting is not strictly required. However, if you plan to get fasting blood glucose, lipid profile, or specific renal lab work done on the same morning at our diagnostic facility, 8-10 hours of fasting is advised."
    },
    {
      q: "Does Chandrapur Kidney Care perform kidney transplants?",
      a: "No. Chandrapur Kidney Care is dedicated specifically to comprehensive non-transplant medical nephrology, CKD preservation, dialysis management, hypertension, and stone disease. For patients requiring transplant evaluation, Dr. Sagar Sarda provides comprehensive workup, stabilization, and referral guidance to accredited transplant hospitals."
    },
    {
      q: "Can high blood pressure permanently damage the kidneys?",
      a: "Yes. Uncontrolled hypertension is one of the leading causes of chronic kidney damage (nephrosclerosis). Proper blood pressure control under a nephrologist protects your kidneys from progressive loss of function."
    },
    {
      q: "How can I prevent recurrence of kidney stones?",
      a: "General measures include drinking 2.5 to 3 liters of water daily, reducing excess dietary sodium, avoiding excessive animal protein, and undergoing a 24-hour urine metabolic evaluation to pinpoint the exact mineral imbalance."
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-14 pb-12">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/10">
            Patient Support & Guidance
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            Patient Information
          </h1>
          <p className="text-xs sm:text-base text-teal-100 mt-2 font-normal">
            Helpful guides, checklist, and clear answers to make your visit smooth and informative.
          </p>
        </div>
      </section>

      {/* 2. Interactive Mobile-First Tabs & Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Horizontal Scrolling Tabs */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto custom-scrollbar pb-3 mb-4">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[#0F2D59] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-300' : 'text-teal-600'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block lg:col-span-4 bg-white rounded-2xl p-4 shadow-soft border border-slate-100 space-y-1.5 sticky top-28">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Information Guide
            </h3>
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#0F2D59] text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-300' : 'text-teal-600'}`} />
                  <span>{sec.fullLabel}</span>
                </button>
              );
            })}

            <div className="mt-6 pt-4 border-t border-slate-100 p-3 bg-teal-50/60 rounded-xl">
              <p className="text-xs font-bold text-[#0F2D59] mb-1">Need help with preparation?</p>
              <p className="text-[11px] text-slate-600 mb-2">Our reception desk is happy to answer your questions.</p>
              <a
                href="tel:+919876543210"
                className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" /> Call +91 98765 43210
              </a>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-8 shadow-card border border-slate-100 min-h-[380px]">
            
            {/* Before Your Visit */}
            {activeSection === 'before' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">Before Your Visit</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">A simple preparation checklist for your consultation with Dr. Sagar Sarda.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Carry your previous medical reports", desc: "Past kidney function tests (KFT), urine tests, ultrasound KUB scans, and blood pressure logs." },
                    { title: "Bring a complete list of current medications", desc: "Include all prescription drugs, ayurvedic/herbal supplements, pain relievers, and insulin dosages." },
                    { title: "Note down your symptoms and questions", desc: "Write down when swelling started, urine changes, weakness, or questions you wish to ask the doctor." },
                    { title: "Arrive 10-15 minutes early", desc: "Allows sufficient time for registration, blood pressure measurement, and vital signs documentation." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* During Your Visit */}
            {activeSection === 'during' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">During Your Visit</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">What to expect throughout your clinical appointment.</p>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                    <h4 className="font-bold text-[#0F2D59] mb-1">1. Initial Vitals & Clinical Triaging</h4>
                    <p>Our nurse measures your accurate resting blood pressure, pulse, body weight, and oxygen saturation.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                    <h4 className="font-bold text-[#0F2D59] mb-1">2. In-Depth Nephrology Consultation</h4>
                    <p>Dr. Sagar Sarda reviews your history, conducts physical examination (edema check, cardiovascular), and analyzes lab trends.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <h4 className="font-bold text-[#0F2D59] mb-1">3. Clear Treatment Plan & Diet Roadmap</h4>
                    <p>You will receive a step-by-step medication schedule, personalized dietary potassium/sodium guidance, and scheduled follow-ups.</p>
                  </div>
                </div>
              </div>
            )}

            {/* After Your Visit */}
            {activeSection === 'after' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">After Your Visit</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Maintaining your kidney health regimen at home.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Strict Medication Adherence", desc: "Never stop or alter kidney or blood pressure medications without consulting Dr. Sagar Sarda." },
                    { title: "Avoid Over-the-Counter Painkillers (NSAIDs)", desc: "Common pain medications like ibuprofen or diclofenac can cause rapid kidney injury." },
                    { title: "Home Blood Pressure & Fluid Logging", desc: "Record your daily morning BP and monitor foot swelling or sudden weight changes." },
                    { title: "Repeat Lab Tests Ahead of Next Follow-up", desc: "Have follow-up Creatinine and Electrolyte tests done 1-2 days prior to your next OPD appointment." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insurance & Payment */}
            {activeSection === 'insurance' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">Insurance & Payment Support</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Transparent and affordable pricing for kidney care and dialysis.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-[#0F2D59] text-xs sm:text-sm mb-1">Cashless TPA & Mediclaim</h4>
                    <p className="text-xs text-slate-500">We assist patients with reimbursement documentation and cashless processing for covered procedures.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-[#0F2D59] text-xs sm:text-sm mb-1">Government Schemes Guidance</h4>
                    <p className="text-xs text-slate-500">Guidance on state and national health coverage (such as MJPJAY) for eligible dialysis patients.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">Affordable Nephrology Care</h4>
                    <p className="text-[11px] text-emerald-800">Consultation fees and diagnostic services are kept fair and transparent.</p>
                  </div>
                </div>
              </div>
            )}

            {/* FAQs */}
            {activeSection === 'faqs' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">Frequently Asked Questions</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Clear answers to common patient questions regarding kidney health.</p>
                </div>

                <div className="space-y-2.5">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between font-semibold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 transition gap-2"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-teal-600 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 text-xs sm:text-sm text-slate-600 bg-slate-50/60 border-t border-slate-100 leading-relaxed animate-fadeIn">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 3. Bottom Quote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-sky-50 rounded-2xl p-4 sm:p-6 border border-sky-100 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-bold text-[#0F2D59]">
            "Informed Patients Make Healthier Choices."
          </p>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
            We encourage you and your family to ask questions and take an active role in managing your kidney wellness.
          </p>
        </div>
      </section>

    </div>
  );
}