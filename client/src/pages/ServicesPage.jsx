import React, { useState } from 'react';
import { 
  Activity, HeartPulse, Gauge, ShieldAlert, Microscope, Scale, Stethoscope, 
  ShieldCheck, ArrowRight, ChevronDown, CheckCircle2, Sparkles, Phone
} from 'lucide-react';

export default function ServicesPage({ setActiveTab }) {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'ckd',
      title: 'Chronic Kidney Disease (CKD) Management',
      tagline: 'Early detection, monitoring and long-term care to slow disease progression.',
      icon: Activity,
      color: 'bg-teal-50 text-teal-700',
      details: 'Comprehensive staging (Stages 1 to 5), personalized nephro-protective therapies, dietary renal planning, blood pressure and protein leak management to preserve native kidney function as long as possible.',
      symptoms: ['Swelling in feet or ankles', 'Persistent fatigue & weakness', 'Changes in urination frequency', 'Metallic taste in mouth'],
      treatments: ['SGLT2i & ACE/ARB renoprotective drugs', 'Anemia & iron management', 'Low-protein renal diet plans', 'Creatinine & eGFR trend analysis']
    },
    {
      id: 'dialysis',
      title: 'Dialysis Care & Guidance',
      tagline: 'Hemodialysis support and guidance for higher quality of life.',
      icon: HeartPulse,
      color: 'bg-blue-50 text-blue-700',
      details: 'Specialized vascular access (AV fistula/graft/catheter) planning, hemodialysis prescription optimization, adequacy monitoring, and continuous guidance for patients and families.',
      symptoms: ['Severe fluid retention', 'Shortness of breath on lying down', 'Uremic nausea & vomiting', 'High potassium levels'],
      treatments: ['High-flux hemodialysis supervision', 'Dialysis adequacy (Kt/V) monitoring', 'AV fistula preservation advice', 'Cardiovascular health management']
    },
    {
      id: 'hypertension',
      title: 'Hypertension (High BP) Care',
      tagline: 'Specialized treatment for blood pressure management to protect kidney health.',
      icon: Gauge,
      color: 'bg-indigo-50 text-indigo-700',
      details: 'Investigation of secondary causes of hypertension, 24-hour ambulatory BP tracking, and tailored multi-drug regimens for resistant hypertension to prevent renal vascular damage.',
      symptoms: ['Morning occipital headaches', 'Blurred vision or dizziness', 'Uncontrolled BP on 3+ medications', 'Chest tightness'],
      treatments: ['Secondary hypertension workup', 'Renal artery Doppler correlation', 'Sodium restriction education', 'Targeted combination pharmacotherapy']
    },
    {
      id: 'stones',
      title: 'Kidney Stone Management',
      tagline: 'Evaluation and treatment for kidney stones with modern approach.',
      icon: ShieldAlert,
      color: 'bg-amber-50 text-amber-700',
      details: 'Metabolic evaluation (24-hour urine stone chemistry), medical expulsive therapy, recurrence prevention diets, and nephrology consultation for stone-induced renal impairment.',
      symptoms: ['Severe flank or lower back pain', 'Blood in urine (hematuria)', 'Burning or painful urination', 'Nausea and fever during stone passage'],
      treatments: ['Metabolic urine workup', 'Citrate & hydration therapy', 'Uric acid & calcium balance', 'Nephrotoxic prevention protocol']
    },
    {
      id: 'glomerular',
      title: 'Glomerular Diseases',
      tagline: 'Diagnosis and management of complex kidney disorders and protein leak.',
      icon: Microscope,
      color: 'bg-emerald-50 text-emerald-700',
      details: 'Expert diagnostic evaluation for Nephrotic and Nephritic syndromes, IgA nephropathy, Membranous nephropathy, Lupus nephritis, with kidney biopsy correlation and targeted immunosuppression.',
      symptoms: ['Foamy or bubbly urine', 'Severe facial puffiness upon waking', 'Rapid weight gain from water retention', 'High cholesterol with low albumin'],
      treatments: ['Kidney biopsy review & staging', 'Targeted immunosuppressive protocols', 'Antiproteinuric therapies', 'Strict lipid & edema control']
    },
    {
      id: 'electrolytes',
      title: 'Electrolyte & Mineral Balance',
      tagline: 'Treatment for imbalances such as potassium, calcium, sodium, and acid-base.',
      icon: Scale,
      color: 'bg-cyan-50 text-cyan-700',
      details: 'Prompt evaluation and correction of hyperkalemia, hypokalemia, hyponatremia, hypercalcemia, metabolic acidosis, and renal osteodystrophy / bone mineral disorders (CKD-MBD).',
      symptoms: ['Muscle spasms or cramps', 'Irregular heart rhythm / palpitations', 'Mental confusion or lethargy', 'Bone aches and weakness'],
      treatments: ['Potassium binders & dietary adjustments', 'Controlled sodium correction', 'Phosphate binders & active Vit D', 'Bicarbonate therapy for acidosis']
    },
    {
      id: 'uti',
      title: 'Urinary Tract Infections (UTI)',
      tagline: 'Accurate diagnosis, culture-guided therapy and effective prevention.',
      icon: Stethoscope,
      color: 'bg-rose-50 text-rose-700',
      details: 'Systematic investigation of complicated and recurrent UTIs, pyelonephritis (kidney infection), structural evaluation, and customized prophylactic strategies.',
      symptoms: ['Intense burning sensation', 'Urgent need to urinate frequently', 'Cloudy or foul-smelling urine', 'Pelvic or flank tenderness'],
      treatments: ['Urine culture-guided targeted antibiotics', 'Preventive non-antibiotic regimens', 'Structural ultrasound evaluation', 'Hydration & hygiene protocols']
    },
    {
      id: 'preventive',
      title: 'Preventive Kidney Care',
      tagline: 'Guidance on lifestyle, diet and regular monitoring to keep your kidneys healthy.',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-700',
      details: 'Proactive screening packages for diabetic individuals, hypertensive patients, and elderly family members. Lifestyle education, hydration guidelines, and avoidance of nephrotoxic medications.',
      symptoms: ['Early kidney damage is silent', 'Recommended for all diabetics >1 year', 'Family history of kidney disease', 'Regular painkiller users'],
      treatments: ['Annual microalbuminuria urine test', 'Serum creatinine & eGFR calculation', 'Medication safety review (NSAID avoidance)', 'Customized renal diet plan']
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            Specialized Nephrology
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 tracking-tight">
            Our Services — Complete Kidney Care Under One Roof
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 font-normal leading-relaxed">
            From early CKD detection to dialysis optimization, Dr. Sagar Sadar delivers tailored, high-grade medical nephrology care.
          </p>
        </div>
      </section>

      {/* 2. Services Grid (8 Services) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            const isExpanded = selectedService === srv.id;

            return (
              <div
                key={srv.id}
                className={`bg-white rounded-2xl p-6 shadow-soft border transition-all flex flex-col justify-between ${
                  isExpanded ? 'border-teal-500 shadow-card ring-2 ring-teal-500/20' : 'border-slate-100 hover:border-teal-200 hover:shadow-card'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${srv.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#0F2D59] text-base mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{srv.tagline}</p>
                  
                  {isExpanded && (
                    <div className="space-y-4 pt-3 border-t border-slate-100 text-xs text-slate-600 animate-fadeIn">
                      <p className="text-slate-700 leading-relaxed">{srv.details}</p>
                      
                      <div>
                        <span className="font-bold text-slate-800 block mb-1">Key Signs to Watch:</span>
                        <ul className="space-y-1">
                          {srv.symptoms.map((sym, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> {sym}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 block mb-1">Clinical Approach:</span>
                        <ul className="space-y-1">
                          {srv.treatments.map((t, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-teal-700 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" /> {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(isExpanded ? null : srv.id)}
                    className="text-xs font-bold text-teal-600 hover:text-[#0F2D59] transition flex items-center gap-1"
                  >
                    {isExpanded ? 'Show Less' : 'Learn Details'}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <button
                    onClick={() => setActiveTab('appointment')}
                    className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white px-2.5 py-1 rounded-md font-semibold transition"
                  >
                    Consult
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Reassurance & Outcome Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-800 to-[#0F2D59] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-teal-300 text-xs font-bold uppercase tracking-wider">Early Care. Better Outcomes.</span>
            <h3 className="text-2xl font-extrabold text-white">Because Your Kidneys Deserve the Best.</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Kidney diseases are often silent until later stages. A timely consultation with Dr. Sagar Sadar can protect your kidney function and prevent long-term complications.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('appointment')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition shrink-0"
          >
            Book a Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
