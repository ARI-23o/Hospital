import React, { useState } from 'react';
import { 
  ClipboardList, Stethoscope, FileCheck, Shield, HelpCircle, 
  ChevronDown, CheckCircle2, Phone, Sparkles, HeartPulse, Search
} from 'lucide-react';
import MarqueeTicker from '../components/MarqueeTicker';

export default function PatientInfoPage({ setActiveTab }) {
  const [activeSection, setActiveSection] = useState('faqs');
  const [openFaq, setOpenFaq] = useState(0); // First FAQ open by default
  const [faqSearch, setFaqSearch] = useState('');

  const sections = [
    { id: 'faqs', label: 'Nephrology FAQs', fullLabel: 'Frequently Asked Questions (Nephrology)', icon: HelpCircle },
    { id: 'before', label: 'Before Visit', fullLabel: 'Before Your Visit Checklist', icon: ClipboardList },
    { id: 'during', label: 'During Visit', fullLabel: 'During Your Visit & OPD Workflow', icon: Stethoscope },
    { id: 'after', label: 'After Visit', fullLabel: 'After Your Visit & Home Care', icon: FileCheck },
    { id: 'insurance', label: 'Insurance', fullLabel: 'Insurance & Payment Support', icon: Shield },
  ];

  // Comprehensive FAQs copied & adapted from Sahyadri Hospitals Nephrology & clinical standards
  const allFaqs = [
    {
      q: "What is the difference between a nephrologist and an urologist?",
      a: "A Nephrologist (like Dr. Sagar Sarda) is a medical specialist focused on the internal function of the kidneys, managing conditions like Chronic Kidney Disease (CKD), acute kidney injury, dialysis, proteinuria, hypertension, and fluid/electrolyte balance to delay or prevent kidney failure without surgery. An Urologist is a surgeon specializing in anatomical and structural problems of the urinary tract and male reproductive system, such as surgical removal of kidney stones, prostate enlargement (BPH), and urinary tract blockages. Both specialties collaborate closely to deliver total kidney and urinary wellness.",
      category: 'general'
    },
    {
      q: "What are the early signs of kidney disease?",
      a: "Kidney problems often develop silently with few symptoms in the early stages. However, common early warning signs include: swelling in the legs, ankles, feet, or face (edema); persistent high blood pressure; unexplained fatigue and weakness; foamy or bubbly urine; changes in urination frequency (especially at night); and mild nausea or loss of appetite.",
      category: 'symptoms'
    },
    {
      q: "Is dialysis the only option for kidney problems?",
      a: "No. Dialysis is not the only option. In fact, most kidney conditions identified early can be effectively managed without immediate dialysis through targeted renoprotective medications (such as SGLT2 inhibitors and RAAS blockers), strict blood pressure and glucose control, individualized low-protein renal diets, and routine monitoring under a nephrologist.",
      category: 'treatment'
    },
    {
      q: "Why is early detection important in kidney care?",
      a: "Because kidney disease often shows no obvious symptoms until 50% to 70% of functional nephrons are damaged, early detection through routine screenings (Serum Creatinine, eGFR, and Urine Microalbumin) is crucial. Early medical intervention can stabilize renal function, delay disease progression for years, and avoid emergency dialysis.",
      category: 'screening'
    },
    {
      q: "What are the main causes of kidney failure?",
      a: "Kidney failure can result from progressive chronic kidney disease (CKD) or sudden acute injury. Globally and in India, the leading causes include: Diabetes Mellitus (Diabetic Nephropathy), Hypertension (High Blood Pressure), Glomerulonephritis (inflammation of kidney filtering units), Polycystic Kidney Disease (genetic), and untreated urinary obstructions or chronic kidney stones.",
      category: 'causes'
    },
    {
      q: "Why is kidney disease often called a 'silent condition'?",
      a: "The kidneys have a remarkable compensatory capacity. They can continue filtering blood and removing wastes even when partially damaged without causing noticeable pain or discomfort. As a result, patients often feel completely normal during Stages 1, 2, and 3 until a routine blood or urine test reveals elevated creatinine or protein leakage.",
      category: 'general'
    },
    {
      q: "How can chronic kidney disease (CKD) progression be delayed?",
      a: "CKD progression is slowed through strict blood pressure control (<130/80 mmHg), tight glycemic control in diabetics, adherence to prescribed renoprotective medicines (SGLT2 inhibitors, ACE/ARBs), reducing dietary sodium and animal protein, maintaining proper hydration, and strictly avoiding over-the-counter painkillers (NSAIDs like Ibuprofen/Diclofenac) which are toxic to kidneys.",
      category: 'treatment'
    },
    {
      q: "What medical reports should I carry for my consultation with Dr. Sagar Sarda?",
      a: "Please bring all recent blood tests (Serum Creatinine, Blood Urea Nitrogen, Serum Electrolytes, Complete Blood Count, HbA1c), Urine Routine & Microalbumin reports, Ultrasound Abdomen/KUB scans, previous prescription sheets, discharge summaries, and home blood pressure/blood sugar logs.",
      category: 'opd'
    },
    {
      q: "Do I need to be on an empty stomach (fasting) for my visit?",
      a: "For general nephrology consultations, fasting is not required. However, if you plan to get fasting blood glucose, lipid profile, or specific diagnostic biochemistry done on the same morning at our in-house laboratory, 8 to 10 hours of overnight fasting is recommended.",
      category: 'opd'
    },
    {
      q: "How can I prevent the recurrence of kidney stones?",
      a: "Key preventive steps include consuming 2.5 to 3 liters of clean water daily (to maintain pale urine), restricting dietary sodium, moderating animal protein, avoiding excess oxalate-rich foods (if diagnosed with calcium oxalate stones), and undergoing a 24-hour urine metabolic evaluation to identify the exact biochemical trigger.",
      category: 'stones'
    },
    {
      q: "What is the role of High-Flux Hemodialysis?",
      a: "High-Flux Hemodialysis utilizes advanced synthetic biocompatible membranes with larger pores and higher clearance rates, effectively removing larger middle-molecule uremic toxins as well as small solutes. This results in superior dialysis adequacy, reduced systemic inflammation, better cardiovascular preservation, and enhanced patient comfort.",
      category: 'dialysis'
    },
    {
      q: "What should I do in case of a sudden spike in blood pressure or sudden swelling?",
      a: "Sudden facial or leg swelling, shortness of breath on lying flat, or severe spikes in blood pressure (systolic >180 mmHg) require immediate clinical attention. Contact our 24/7 hospital helpline (+91 98765 43210) or visit our OPD suite immediately for prompt triaging.",
      category: 'emergency'
    }
  ];

  const filteredFaqs = faqSearch.trim() === ''
    ? allFaqs
    : allFaqs.filter(f => 
        f.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
        f.a.toLowerCase().includes(faqSearch.toLowerCase())
      );

  return (
    <div className="space-y-10 sm:space-y-16 pb-16">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            Patient Support & Knowledge Hub
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            Patient Information & FAQs
          </h1>
          <p className="text-xs sm:text-base text-slate-200 mt-2 font-normal leading-relaxed">
            Clear answers to common questions about Nephrology, Urology, Dialysis, and preparing for your consultation.
          </p>
        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker />

      {/* 2. Interactive Navigation Tabs & Content */}
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
          <div className="hidden lg:block lg:col-span-4 bg-white rounded-3xl p-5 shadow-soft border border-slate-100 space-y-2 sticky top-28">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Patient Guide Sections
            </h3>
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#0F2D59] text-white shadow-md font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-teal-300' : 'text-teal-600'}`} />
                  <span>{sec.fullLabel}</span>
                </button>
              );
            })}

            <div className="mt-6 pt-4 border-t border-slate-100 p-4 bg-teal-50/70 rounded-2xl">
              <p className="text-xs font-bold text-[#0F2D59] mb-1">Have a specific question?</p>
              <p className="text-[11px] text-slate-600 mb-3">Our medical desk is available Mon - Sat (9 AM - 7 PM).</p>
              <a
                href="tel:+919876543210"
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0F2D59] text-white text-xs font-bold py-2.5 px-3 rounded-xl hover:bg-teal-800 transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call +91 98765 43210
              </a>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 min-h-[420px]">
            
            {/* 1. FAQs Section (Copied from Sahyadri Hospital Nephrology + Clinical Essentials) */}
            {activeSection === 'faqs' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">
                      Frequently Asked Questions
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Authentic medical guidance based on hospital nephrology protocols
                    </p>
                  </div>

                  {/* FAQ Search Bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search questions (e.g. dialysis, stones)..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* FAQs Accordion List */}
                <div className="space-y-3">
                  {filteredFaqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all overflow-hidden ${
                          isOpen ? 'border-teal-500 bg-teal-50/20 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-[#0F2D59] gap-3"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-teal-600 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-teal-700' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Before Your Visit */}
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

            {/* 3. During Your Visit */}
            {activeSection === 'during' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">During Your Visit</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">What to expect throughout your clinical appointment.</p>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                    <h4 className="font-bold text-[#0F2D59] mb-1">1. Initial Vitals & Clinical Triaging</h4>
                    <p>Our nurse measures your accurate resting blood pressure, pulse, body weight, and oxygen saturation.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
                    <h4 className="font-bold text-[#0F2D59] mb-1">2. In-Depth Nephrology Consultation</h4>
                    <p>Dr. Sagar Sarda reviews your history, conducts physical examination (edema check, cardiovascular), and analyzes lab trends.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <h4 className="font-bold text-[#0F2D59] mb-1">3. Clear Treatment Plan & Diet Roadmap</h4>
                    <p>You will receive a step-by-step medication schedule, personalized dietary potassium/sodium guidance, and scheduled follow-ups.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. After Your Visit */}
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

            {/* 5. Insurance & Payment */}
            {activeSection === 'insurance' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59]">Insurance & Payment Support</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Transparent and affordable pricing for kidney care and dialysis.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-[#0F2D59] text-xs sm:text-sm mb-1">Cashless TPA & Mediclaim</h4>
                    <p className="text-xs text-slate-500">We assist patients with reimbursement documentation and cashless processing for covered procedures.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-[#0F2D59] text-xs sm:text-sm mb-1">Government Schemes Guidance</h4>
                    <p className="text-xs text-slate-500">Guidance on state and national health coverage for eligible dialysis patients.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">Affordable Nephrology Care</h4>
                    <p className="text-[11px] text-emerald-800">Consultation fees and diagnostic services are kept fair and transparent.</p>
                  </div>
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