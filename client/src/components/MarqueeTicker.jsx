import React from 'react';
import { HeartPulse, Stethoscope, Shield, Sparkles, Activity, Award, CheckCircle2 } from 'lucide-react';

export default function MarqueeTicker() {
  const items = [
    { label: 'Dr. Sagar Sarda (MD, DM Nephrology)', icon: Award, color: '#0D9488' },
    { label: 'High-Flux Hemodialysis Unit', icon: HeartPulse, color: '#0284C7' },
    { label: 'Chronic Kidney Disease (CKD) Stages 1-5', icon: Activity, color: '#10B981' },
    { label: 'Kidney Stone Metabolic Workup', icon: Shield, color: '#F59E0B' },
    { label: 'Urology & Urinary Tract Care', icon: Stethoscope, color: '#6366F1' },
    { label: 'Hypertension & Renoprotection', icon: CheckCircle2, color: '#EC4899' },
    { label: 'Glomerular Disease & Proteinuria', icon: Sparkles, color: '#14B8A6' },
    { label: '24/7 Emergency Renal Support', icon: HeartPulse, color: '#EF4444' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-3 bg-[#071322] border-y border-white/10 select-none">
      {/* Side Fade Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-[#071322] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-[#071322] to-transparent"></div>

      <div className="animate-marquee flex items-center gap-4 whitespace-nowrap">
        {items.concat(items).map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-slate-300 hover:border-teal-400/40 hover:text-white transition cursor-default"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              ></span>
              <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}