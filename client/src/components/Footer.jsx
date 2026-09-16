import React from 'react';
import { HeartPulse, Phone, Mail, MapPin, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#0A1D37] text-slate-300 pt-16 pb-8 border-t-4 border-teal-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: About Hospital */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/30">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Chandrapura <span className="text-teal-400">Kidney Care</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Specialized kidney care clinic and nephrology center led by <strong className="text-white">Dr. Sagar Sadar (MD, DM Nephrology)</strong>. Dedicated to compassionate, evidence-based renal treatments in Maharashtra.
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-teal-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dedicated Non-Transplant Nephrology Care</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-4 bg-teal-400 rounded-sm"></span> Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home Page', id: 'home' },
                { label: 'About Dr. Sagar Sadar', id: 'doctor' },
                { label: 'Our Nephrology Services', id: 'services' },
                { label: 'Modern Facilities', id: 'facilities' },
                { label: 'Patient Information & FAQs', id: 'patient-info' },
                { label: 'Book Appointment', id: 'appointment' },
                { label: 'Contact Us', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-teal-300 transition flex items-center gap-1.5 text-slate-400"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Treatments */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-4 bg-teal-400 rounded-sm"></span> Specialized Care
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="p-2 rounded bg-slate-800/50 hover:bg-slate-800 transition">
                <strong className="text-slate-200 block text-sm">CKD Staging & Management</strong>
                Slowing kidney disease progression
              </li>
              <li className="p-2 rounded bg-slate-800/50 hover:bg-slate-800 transition">
                <strong className="text-slate-200 block text-sm">Hemodialysis Guidance</strong>
                Safe, high-flux dialysis supervision
              </li>
              <li className="p-2 rounded bg-slate-800/50 hover:bg-slate-800 transition">
                <strong className="text-slate-200 block text-sm">Renal Hypertension Care</strong>
                Targeted BP control for renal preservation
              </li>
              <li className="p-2 rounded bg-slate-800/50 hover:bg-slate-800 transition">
                <strong className="text-slate-200 block text-sm">Kidney Stone Prevention</strong>
                Metabolic evaluation & medication
              </li>
            </ul>
          </div>

          {/* Col 4: Clinic Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-4 bg-teal-400 rounded-sm"></span> Clinic Details
            </h3>
            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Behind LIC Office, Main Road, Chandrapura, Maharashtra, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-white">+91 98765 43210 / +91 98233 33537</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs">info@chandrapurakidneycare.in</span>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-white">OPD Hours:</p>
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-teal-400">Sunday: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Chandrapura Kidney Care. All rights reserved. Dr. Sagar Sadar - Consultant Nephrologist.</p>
          <div className="flex items-center space-x-4">
            <span>Chandrapura, Maharashtra</span>
            <span>•</span>
            <span className="text-teal-400">Caring Today for Healthier Tomorrows</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
