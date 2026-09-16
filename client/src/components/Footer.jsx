import React from 'react';
import { HeartPulse, Phone, Mail, MapPin, Clock, ShieldCheck, ChevronRight, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const MAP_URL = "https://maps.app.goo.gl/f1P5sEp6G8aWFc39A";

  const quickNav = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Nephrology Services', id: 'services' },
    { label: 'Doctor Profile', id: 'doctor' },
    { label: 'Facilities', id: 'facilities' },
    { label: 'Patient Information', id: 'patient-info' },
    { label: 'Book Appointment', id: 'appointment' },
    { label: 'Contact Us', id: 'contact' },
  ];

  const keyTreatments = [
    'Chronic Kidney Disease (CKD)',
    'Hemodialysis Care & Guidance',
    'Hypertension Management',
    'Kidney Stone Evaluation',
    'Glomerular & Proteinuria Care',
    'Preventive Diabetic Screening'
  ];

  const handleNav = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A1D37] text-slate-300 pt-12 sm:pt-16 pb-8 border-t-4 border-teal-500 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Clean Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-800">
          
          {/* Column 1: Hospital Info (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold shadow-md shadow-teal-500/20 shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Chandrapur <span className="text-teal-400">Kidney Care</span>
                </span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Dr. Sagar Sarda • Nephrologist
                </p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Comprehensive non-transplant kidney clinic and hemodialysis center in Chandrapur, Maharashtra. Dedicated to evidence-based renal preservation and patient-centered medical care.
            </p>

            <div className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] text-teal-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Doctor-Led Specialized Kidney Care</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              {quickNav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="text-slate-400 hover:text-white transition flex items-center gap-1.5 py-0.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-teal-500 group-hover:translate-x-1 transition-transform" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Kidney Care Services (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Specialized Care
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {keyTreatments.map((t, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-teal-400 shrink-0"></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Clinic Details (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              Clinic & Location
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-teal-300 transition group"
              >
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="leading-relaxed">
                  Behind LIC Office, Main Road, Chandrapur, Maharashtra
                  <span className="text-[10px] text-teal-400 block font-semibold flex items-center gap-0.5 mt-0.5">
                    Open in Google Maps <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </p>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white font-medium">+91 98765 43210</a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href="mailto:info@chandrapurakidneycare.in" className="hover:text-white truncate">info@chandrapurakidneycare.in</a>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-slate-800">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">OPD: Mon - Sat (9 AM - 7 PM)</p>
                  <p className="text-[11px] text-slate-400">Sunday: By Prior Appointment</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Chandrapur Kidney Care • Dr. Sagar Sarda (MD, DM Nephrology)</p>
          <div className="flex items-center space-x-3">
            <span>Chandrapur, Maharashtra</span>
            <span>•</span>
            <span className="text-teal-400 font-medium">Caring Today for Healthier Tomorrows</span>
          </div>
        </div>

      </div>
    </footer>
  );
}