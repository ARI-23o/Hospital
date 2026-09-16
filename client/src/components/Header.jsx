import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, HeartPulse, UserCheck, Menu, X, Calendar, ChevronRight } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Specialties & Services' },
    { id: 'doctor', label: 'Doctor Profile' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'patient-info', label: 'Patient Info' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all duration-300 animate-fade-in">
      
      {/* 1. Essential Top Announcement Bar */}
      <div className="bg-[#0F2D59] text-white text-[11px] py-1.5 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          
          <div className="flex items-center space-x-3 truncate">
            <a 
              href="https://maps.app.goo.gl/f1P5sEp6G8aWFc39A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-teal-300 hover:text-white transition truncate font-medium"
            >
              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
              <span className="truncate">Behind LIC Office, Chandrapur, Maharashtra</span>
            </a>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-teal-400 shrink-0" /> Mon - Sat: 9:00 AM - 7:00 PM
            </span>
          </div>

          <div className="flex items-center space-x-3 shrink-0 text-[11px]">
            <a 
              href="tel:+919876543210" 
              className="flex items-center gap-1 font-bold text-teal-300 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>+91 98765 43210</span>
            </a>
            <button 
              onClick={() => handleNavClick('admin')} 
              className="hidden sm:inline-flex bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] px-2 py-0.5 rounded items-center gap-1 transition border border-slate-700"
              title="Doctor Management Portal"
            >
              <UserCheck className="w-3 h-3 text-teal-300" /> Dr. Portal
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Desktop / Mobile Navigation Bar (Height ~72px) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-[72px]'}`}>
          
          {/* Clinic Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 overflow-hidden">
              <img
                src="/hospital_logo.png"
                alt="Chandrapur Kidney Care"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1 leading-none">
                <span className="text-lg font-extrabold tracking-tight text-[#0F2D59]">Chandrapur</span>
                <span className="text-lg font-extrabold tracking-tight text-[#0D9488]">Kidney Care</span>
              </div>
              <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                Care • Compassion • Commitment
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                  activeTab === item.id
                    ? 'text-[#0F2D59] bg-teal-50/90 font-bold border border-teal-100/80 shadow-xs'
                    : 'text-slate-600 hover:text-[#0F2D59] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Button & Mobile Toggle */}
          <div className="flex items-center space-x-2">
            
            {/* Single-line Book Appointment Button */}
            <button
              onClick={() => handleNavClick('appointment')}
              className="hidden sm:inline-flex bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 btn-hover-effect whitespace-nowrap items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
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

      {/* 3. Mobile Slide-Out Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[100px] z-40 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-b border-slate-200 shadow-2xl p-4 sm:p-6 max-h-[82vh] overflow-y-auto custom-scrollbar space-y-3">
            
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
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

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => handleNavClick('appointment')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4" /> Book Appointment
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