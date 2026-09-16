import React from "react";
import {
  Sparkles,
  Shield,
  HeartPulse,
  Microscope,
  Users,
  CheckCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Interactive3DCard from "../components/Interactive3DCard";
import MarqueeTicker from "../components/MarqueeTicker";

export default function FacilitiesPage({ setActiveTab }) {
  const facilities = [
    {
      title: "Modern Dialysis Unit",
      desc: "Equipped with advanced hemodialysis machines, high-flux dialyzers, ultra-pure water treatment plant (RO), and strict infection control barrier protocols.",
      icon: HeartPulse,
      tag: "Specialized Care",
      visual: "🏥 Dialysis Station",
      features: [
        "High-Flux Dialyzers",
        "Dedicated RO Water System",
        "Individual Patient Monitoring",
        "Emergency Crash Cart Backup",
      ],
    },
    {
      title: "Consultation Rooms",
      desc: "Private, comfortable, and well-lit doctor chambers designed for thorough clinical evaluation, confidential discussions, and patient-family counseling.",
      icon: Users,
      tag: "OPD Excellence",
      visual: "👨‍⚕️ Doctor Chamber",
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
      visual: "🛋️ Waiting Lounge",
      features: [
        "Air Filtered Environment",
        "Comfortable Seating Layout",
        "Drinking Water Station",
        "Wheelchair Accessibility",
      ],
    },
    {
      title: "Pathology & Diagnostic Support",
      desc: "Rapid turn-around diagnostic support for Kidney Function Tests (KFT), Serum Creatinine, Electrolytes, Urine Microalbumin, and Complete Blood Counts.",
      icon: Microscope,
      tag: "Fast Results",
      visual: "🔬 Laboratory Desk",
      features: [
        "Automated Biochemistry Analyzers",
        "Same-Day KFT Reports",
        "Urine Microscopy Correlation",
        "NABL Accredited Quality",
      ],
    },
    {
      title: "Clean & Hygienic Environment",
      desc: "Daily sterilization, biomedical waste segregation, and stringent hospital hygiene standards ensuring safety for immunocompromised kidney patients.",
      icon: Shield,
      tag: "Infection Control",
      visual: "✨ Sanitized Facility",
      features: [
        "Continuous Air Circulation",
        "Daily Multi-surface Sanitization",
        "Touchless Sanitizer Dispensers",
        "Hospital Grade Disinfection",
      ],
    },
    {
      title: "Patient Support Staff",
      desc: "Empathetic nursing team and front desk coordinators trained in nephrology care, ready to assist elderly patients with scheduling, wheelchair support, and billing.",
      icon: Sparkles,
      tag: "Dedicated Team",
      visual: "🤝 Support Desk",
      features: [
        "Trained Dialysis Technicians",
        "Dedicated Patient Helpdesk",
        "Appointment Assistance",
        "Multilingual Support",
      ],
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            Infrastructure & Amenities
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            Our Facilities — Modern Infrastructure for Better Care
          </h1>
          <p className="text-xs sm:text-base text-teal-100 mt-2 font-normal leading-relaxed">
            Designed for patient safety, comfort, and clinical precision in Chandrapur, Maharashtra.
          </p>
        </div>
      </section>

      {/* 2. Facility Gallery Cards (6 Grid with 3D perspective tilt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <Interactive3DCard
                key={idx}
                className="bg-white rounded-3xl overflow-hidden shadow-soft border border-slate-100 hover:shadow-card transition flex flex-col justify-between group"
              >
                {/* Visual Header */}
                <div className="bg-gradient-to-br from-slate-800 to-[#0F2D59] text-white p-6 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="bg-teal-400/20 text-teal-300 text-[11px] font-bold px-3 py-1 rounded-full border border-teal-400/30">
                      {fac.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 text-center py-3">
                    <span className="text-4xl">{fac.visual.split(" ")[0]}</span>
                    <h3 className="text-lg font-bold text-white mt-2">{fac.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{fac.desc}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Facility Highlights:
                    </span>
                    <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                      {fac.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <span>Chandrapur Kidney Care</span>
                  <span className="text-teal-600 font-bold">Standard of Care</span>
                </div>
              </Interactive3DCard>
            );
          })}
        </div>
      </section>

      {/* 3. Safe • Modern • Patient-Friendly Trust Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F2D59]">Safe • Modern • Patient-Friendly</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Because you deserve the best clinical care, every single day.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("appointment")}
            className="bg-[#0F2D59] hover:bg-teal-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-md shrink-0"
          >
            Visit Our Clinic
          </button>
        </div>
      </section>
    </div>
  );
}
