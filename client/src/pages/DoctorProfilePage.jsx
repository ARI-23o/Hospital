import React from 'react';
import { 
  Award, GraduationCap, Clock, CheckCircle2, HeartHandshake, ShieldCheck, 
  Calendar, Phone, MapPin, Quote
} from 'lucide-react';

export default function DoctorProfilePage({ setActiveTab }) {
  const areasOfExpertise = [
    'Chronic Kidney Disease (CKD) Management',
    'Dialysis & Advanced Renal Care',
    'Hypertension & Renal Vascular Control',
    'Kidney Stone Medical Treatment & Prevention',
    'Glomerular Diseases & Nephrotic Syndrome',
    'Preventive Nephrology & Diabetic Screening',
  ];

  const credentials = [
    'MD (General Medicine) — Top Tier Medical College',
    'DM (Nephrology) — Super-specialty Gold Standard Training',
    'Extensive experience managing 1,500+ Nephrology & Dialysis Patients',
    'Specialist in Delaying Dialysis & Non-Transplant Kidney Care',
    'Member of Indian Society of Nephrology (ISN)'
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            Meet Our Senior Consultant
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 tracking-tight">
            Dr. Sagar Sarda
          </h1>
          <p className="text-sm sm:text-base text-teal-100 mt-2 font-medium">
            MD (General Medicine) • DM (Nephrology) • Consultant Nephrologist
          </p>
        </div>
      </section>

      {/* 2. Main Doctor Profile Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Doctor Visual & Badge */}
            <div className="lg:col-span-5 text-center">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 via-teal-50 to-slate-100 p-6 shadow-inner border border-slate-200">
                {/* Doctor Real Photo Frame */}
                <div className="w-56 h-72 mx-auto rounded-2xl bg-slate-900 overflow-hidden shadow-xl border-2 border-teal-500/40 relative group">
                  <img
                    src="/doctor_sagar_sarda.jpg"
                    alt="Dr. Sagar Sarda Consultant Nephrologist"
                    className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-center text-white">
                    <span className="text-[11px] font-bold bg-teal-500 text-white px-3 py-0.5 rounded-full uppercase shadow">
                      Consultant Nephrologist
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-2xl font-extrabold text-[#0F2D59]">Dr. Sagar Sarda</h3>
                  <p className="text-teal-700 font-semibold text-sm mt-0.5">MD, DM (Nephrology)</p>
                  <p className="text-xs text-slate-500 font-medium">Chandrapur Kidney Care</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200 flex justify-around text-center">
                  <div>
                    <span className="block text-xl font-bold text-[#0F2D59]">12+</span>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wide">Yrs Exp</span>
                  </div>
                  <div className="border-r border-slate-200"></div>
                  <div>
                    <span className="block text-xl font-bold text-teal-600">1,500+</span>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wide">Patients</span>
                  </div>
                  <div className="border-r border-slate-200"></div>
                  <div>
                    <span className="block text-xl font-bold text-emerald-600">100%</span>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wide">Dedicated</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Biography, Quote & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Doctor's Quote / Mission */}
              <div className="bg-sky-50/70 border-l-4 border-teal-500 p-5 rounded-r-2xl relative">
                <Quote className="w-8 h-8 text-teal-400/40 absolute top-3 right-3" />
                <p className="text-slate-800 italic text-sm sm:text-base leading-relaxed">
                  "My goal is to provide evidence-based kidney care with compassion, ensuring every patient receives personalized treatment, thorough education, and compassionate clinical support."
                </p>
                <p className="text-right text-xs font-bold text-[#0F2D59] mt-2">— Dr. Sagar Sarda</p>
              </div>

              {/* Qualifications */}
              <div>
                <h4 className="font-bold text-[#0F2D59] text-base mb-3 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-teal-600" /> Academic & Clinical Credentials
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {credentials.map((cred, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas of Expertise */}
              <div>
                <h4 className="font-bold text-[#0F2D59] text-base mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-600" /> Areas of Expertise
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {areasOfExpertise.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              {/* OPD Consultation Booking */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActiveTab('appointment')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation with Dr. Sagar
                </button>
                <a
                  href="tel:+919876543210"
                  className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-xl transition flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" /> Direct Clinic Line
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Clinical Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
            <HeartHandshake className="w-8 h-8 text-teal-600 mb-3" />
            <h4 className="font-bold text-[#0F2D59] text-base mb-1">Compassionate Care</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We listen attentively to patient concerns and design realistic, manageable lifestyle and medication routines.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
            <ShieldCheck className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-bold text-[#0F2D59] text-base mb-1">Kidney Preservation</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our priority is to retard renal deterioration and delay the initiation of dialysis through strict medical and dietary controls.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
            <Clock className="w-8 h-8 text-emerald-600 mb-3" />
            <h4 className="font-bold text-[#0F2D59] text-base mb-1">Timely Guidance</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent review of blood tests, urine chemistry, and ultrasound findings with clear explanations for family members.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}