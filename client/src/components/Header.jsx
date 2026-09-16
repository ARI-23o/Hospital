import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, HeartPulse, LayoutGrid, UserCheck } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenMockupGrid }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'doctor', label: 'Doctor' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'patient-info', label: 'Patient Information' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* Top emergency & clinic announcement bar */}
      <div className="bg-[#0F2D59] text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-teal-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-teal-400" /> Chandrapura, Maharashtra
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-teal-400" /> Mon - Sat: 9:00 AM - 7:00 PM
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 font-semibold text-teal-300 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> OPD Helpline: +91 98765 43210
            </a>
            <button 
              onClick={() => setActiveTab('admin')} 
              className="ml-2 bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-[11px] px-2 py-0.5 rounded flex items-center gap-1 transition"
              title="Doctor Management Portal"
            >
              <UserCheck className="w-3 h-3 text-teal-300" /> Dr. Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Hospital Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0F2D59] via-[#0D9488] to-[#10B981] flex items-center justify-center shadow-md shadow-teal-500/10 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#0F2D59]">Chandrapura</span>
                <span className="text-xl font-extrabold tracking-tight text-[#0D9488]">Kidney Care</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                Nephrology & Dialysis Clinic • Dr. Sagar Sadar
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-[#0F2D59] bg-teal-50/80 shadow-sm border border-teal-100 font-bold'
                    : 'text-slate-600 hover:text-[#0F2D59] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenMockupGrid}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition border border-slate-200"
              title="View 8-in-1 UI/UX Design Mockup Poster"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-teal-600" />
              <span>8-Screen Mockup</span>
            </button>

            <button
              onClick={() => setActiveTab('appointment')}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              Book Appointment
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden border-t border-slate-100 px-4 py-2 bg-slate-50/90 overflow-x-auto custom-scrollbar flex items-center space-x-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-semibold ${
              activeTab === item.id
                ? 'bg-[#0F2D59] text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
