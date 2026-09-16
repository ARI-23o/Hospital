import React from 'react';
import { X, ExternalLink, Sparkles, Eye, CheckCircle } from 'lucide-react';

export default function DesignGridModal({ isOpen, onClose, onSelectPage }) {
  if (!isOpen) return null;

  const screens = [
    {
      number: '1',
      id: 'home',
      name: 'Home Page',
      tagline: 'Hero, doctor trust badge, core services, Maharashtra stats & CTA',
      color: 'from-blue-600 to-teal-600',
      highlights: ['Hero: "Expert Care for Healthier Kidneys"', 'Nephrology 4-pillar overview', 'Maharashtra community banner', 'Direct OPD booking button']
    },
    {
      number: '2',
      id: 'about',
      name: 'About Us',
      tagline: 'Mission, vision, core clinical values & Dr. Sagar Sadar leadership',
      color: 'from-teal-600 to-emerald-600',
      highlights: ['Doctor-led non-transplant kidney clinic', 'Patient-first ethical care ethos', 'Modern clinical timeline', 'Accessible regional healthcare']
    },
    {
      number: '3',
      id: 'services',
      name: 'Kidney Care Services',
      tagline: 'Complete 8-specialization nephrology suite with symptom guides',
      color: 'from-indigo-600 to-blue-600',
      highlights: ['CKD Stages 1-5 management', 'High-flux dialysis supervision', 'Renal hypertension protocols', 'Kidney stone & UTI treatments']
    },
    {
      number: '4',
      id: 'doctor',
      name: 'Doctor Profile',
      tagline: 'Senior Nephrologist Dr. Sagar Sadar (MD, DM Nephrology)',
      color: 'from-teal-700 to-navy-900',
      highlights: ['MD & DM Nephrology credentials', 'Consultant Nephrologist badge', 'Areas of expertise summary', 'Compassionate personal quote']
    },
    {
      number: '5',
      id: 'patient-info',
      name: 'Patient Information',
      tagline: 'Before/during/after visit guides, insurance support & interactive FAQs',
      color: 'from-sky-600 to-teal-600',
      highlights: ['Pre-visit medical checklist', 'In-clinic consultation process', 'Mediclaim & Cashless TPA info', 'Nephrology FAQ accordion']
    },
    {
      number: '6',
      id: 'facilities',
      name: 'Facilities',
      tagline: 'Dialysis unit, consultation chambers, pathology & sanitized wards',
      color: 'from-emerald-600 to-teal-800',
      highlights: ['Modern high-flux dialysis unit', 'Sterilized clinical environment', 'Comfortable waiting lounge', 'In-house diagnostic support']
    },
    {
      number: '7',
      id: 'contact',
      name: 'Contact Us',
      tagline: 'Maharashtra clinic location, phone lines, timings & inquiry form',
      color: 'from-slate-700 to-teal-700',
      highlights: ['Behind LIC Office, Chandrapura', 'OPD helpline: +91 98765 43210', 'Interactive Google Map card', 'Direct inquiry submission']
    },
    {
      number: '8',
      id: 'appointment',
      name: 'Appointment Booking',
      tagline: 'Slot scheduler, instant token receipt with SQLite persistence',
      color: 'from-emerald-700 to-[#0F2D59]',
      highlights: ['Preferred date & time selector', 'Reason for consultation choice', 'Instant booking reference number', 'Why Choose Us trust card']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-6xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700 max-h-[92vh] overflow-y-auto custom-scrollbar">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30">
                UI/UX Design Mockup Showcase
              </span>
              <span className="text-xs text-slate-400">4 × 2 Panoramic Grid</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              Chandrapura Kidney Care — 8 Website Page Screens
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4x2 Grid of Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {screens.map((screen) => (
            <div
              key={screen.id}
              onClick={() => {
                onSelectPage(screen.id);
                onClose();
              }}
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-teal-400/50 rounded-2xl p-5 cursor-pointer transition transform hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                {/* Screen badge header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center border border-teal-500/30">
                    {screen.number}
                  </span>
                  <span className="text-[11px] text-teal-400 font-semibold flex items-center gap-1 group-hover:underline">
                    Live Preview <ExternalLink className="w-3 h-3" />
                  </span>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-teal-300 transition">
                  {screen.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                  {screen.tagline}
                </p>

                {/* Key Layout Features */}
                <div className="space-y-1.5 pt-3 border-t border-slate-700/60 text-[11px] text-slate-300">
                  {screen.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-teal-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-bold text-teal-300">
                <span>Navigate Screen #{screen.number}</span>
                <Eye className="w-4 h-4 text-teal-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer info in Modal */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <p>Designed for Dr. Sagar Sadar (MD, DM Nephrology) • Chandrapura, Maharashtra, India</p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2 rounded-xl transition"
            >
              Close & Browse Live Site
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
