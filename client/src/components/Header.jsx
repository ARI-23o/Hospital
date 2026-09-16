import React, { useState } from 'react';
import { Phone, MapPin, Clock, HeartPulse, UserCheck, Menu, X, Calendar, ChevronRight } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'doctor', label: 'Doctor Profile' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'patient-info', label: 'Patient Information' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      
      {/* Top emergency & clinic announcement bar */}
      <div className="bg-[#0F2D59] text-white text-[11px] sm:text-xs py-2 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4 truncate">
            <a 
              href="https://maps.app.goo.gl/f1P5sEp6G8aWFc39A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-teal-300 font-medium hover:underline truncate"
            >
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">Chandrapur, Maharashtra</span>
            </a>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" /> Mon - Sat: 9:00 AM - 7:00 PM
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <a 
              href="tel:+919876543210" 
              className="flex items-center gap-1 font-semibold text-teal-300 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">OPD Helpline:</span> +91 98765 43210
            </a>
            <button 
              onClick={() => handleNavClick('admin')} 
              className="hidden sm:flex bg-slate-700/80 hover:bg-slate-700 text-slate-200 text-[11px] px-2 py-0.5 rounded items-center gap-1 transition"
              title="Doctor Management Portal"
            >
              <UserCheck className="w-3 h-3 text-teal-300" /> Dr. Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Hospital Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-[#0F2D59] via-[#0D9488] to-[#10B981] flex items-center justify-center shadow-md shadow-teal-500/10 group-hover:scale-105 transition-transform shrink-0">
              <HeartPulse className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#0F2D59]">Chandrapur</span>
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#0D9488]">Kidney Care</span>
              </div>
              <p className="text-[9px] sm:text-[11px] font-medium text-slate-500 tracking-wider uppercase truncate max-w-[200px] sm:max-w-none">
                Nephrology Clinic • Dr. Sagar Sarda
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
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

          {/* Action CTAs & Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => handleNavClick('appointment')}
              className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-md shadow-emerald-600/20 transition-all items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              Book Appointment
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Fullscreen / Slide Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[104px] z-40 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-b border-slate-200 shadow-2xl p-4 sm:p-6 max-h-[80vh] overflow-y-auto custom-scrollbar space-y-3 animate-slideDown">
            
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              Menu Navigation
            </div>

            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition ${
                    activeTab === item.id
                      ? 'bg-[#0F2D59] text-white shadow-md'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${activeTab === item.id ? 'text-teal-300' : 'text-slate-400'}`} />
                </button>
              ))}
            </div>

            {/* Mobile Quick Action Buttons inside Drawer */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => handleNavClick('appointment')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4" /> Book an Appointment
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs"
              >
                <UserCheck className="w-4 h-4 text-teal-600" /> Doctor Admin Portal
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}