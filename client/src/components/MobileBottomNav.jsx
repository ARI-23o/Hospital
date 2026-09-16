import React from 'react';
import { Phone, Calendar, MapPin, MessageCircle } from 'lucide-react';

export default function MobileBottomNav({ setActiveTab }) {
  const MAP_URL = "https://maps.app.goo.gl/f1P5sEp6G8aWFc39A";
  const PHONE_NUMBER = "tel:+919876543210";
  const WHATSAPP_URL = "https://wa.me/919876543210?text=Hello%20Chandrapur%20Kidney%20Care,%20I%20would%20like%20to%20inquire%20about%20a%20nephrology%20consultation.";

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-2xl px-3 py-2">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        
        {/* 1. Call Now */}
        <a
          href={PHONE_NUMBER}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-95 transition"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Call OPD</span>
        </a>

        {/* 2. WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 active:scale-95 transition"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-1 shadow-sm">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        {/* 3. Directions */}
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-95 transition"
        >
          <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-1">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Directions</span>
        </a>

        {/* 4. Book Appointment */}
        <button
          onClick={() => {
            setActiveTab('appointment');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#0F2D59] text-white active:scale-95 transition shadow-md"
        >
          <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center mb-1 shadow-sm">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold">Book OPD</span>
        </button>

      </div>
    </div>
  );
}