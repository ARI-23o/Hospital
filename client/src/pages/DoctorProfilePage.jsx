import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  GraduationCap,
  Clock,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Calendar,
  Phone,
  MapPin,
  Quote,
  Star,
  Sparkles,
  UserCheck,
  ChevronRight,
  Stethoscope,
  Activity,
  Building,
  ArrowRight,
  User,
} from "lucide-react";
import DoctorScheduleExplorer from "../components/DoctorScheduleExplorer";
import Interactive3DCard from "../components/Interactive3DCard";
import MarqueeTicker from "../components/MarqueeTicker";

export default function DoctorProfilePage({ setActiveTab }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedDoctorModal, setSelectedDoctorModal] = useState(null);

  const doctorsList = [
    {
      id: "dr-sagar-sarda",
      name: "Dr. Sagar Damodar Sarda",
      designation: "Consultant Nephrologist & Kidney Transplant Physician",
      degrees: "MBBS, MD Medicine, DM Nephrology",
      experience: "12+ Years Experience",
      sessions: "15,000+ Dialysis Sessions Supervised",
      department: "Nephrology & Renal Medicine",
      category: "nephrology",
      isLead: true,
      image: "/doctor_sagar_sarda.jpg",
      opdTimings: "Mon - Sat: 09:00 AM - 01:30 PM & 04:30 PM - 07:30 PM",
      location: "Chandrapur Kidney Care (Main OPD Suite)",
      languages: "English, Marathi, Hindi",
      about:
        "Dr. Sagar Damodar Sarda is a super-specialist Nephrologist & Kidney Transplant Physician dedicated to evidence-based medical kidney care, kidney transplantation guidance, dialysis supervision, and hypertension management in Chandrapur, Maharashtra.",
      expertise: [
        "Chronic Kidney Disease (CKD Stages 1-5)",
        "Kidney Transplant Evaluation & Post-Transplant Care",
        "Hemodialysis Prescription & AV Fistula Care",
        "Hypertension & Renovascular Disease",
        "Kidney Stone Medical Evaluation & Prevention",
        "Glomerulonephritis, Nephrotic Syndrome & Proteinuria",
        "Diabetic Kidney Disease Screening",
      ],
      credentials: [
        "MBBS, MD Medicine, DM Nephrology",
        "Consultant Nephrologist & Kidney Transplant Physician",
        "Member of Indian Society of Nephrology (ISN)",
        "12+ Years Dedicated Clinical Experience in Central India",
      ],
    },
    {
      id: "visiting-urologist",
      name: "Dr. Specialist Visiting Panel",
      designation: "Visiting Consultant Urologist & Andrologist",
      degrees: "MS (General Surgery), MCh (Urology / DNB Urology)",
      experience: "10+ Years Surgical Experience",
      sessions: "Stone & Prostate Surgeries Supported",
      department: "Urology & Urinary Tract Care",
      category: "urology",
      isLead: false,
      image: null,
      opdTimings: "Prior Appointment / Weekly Specialist Panel",
      location: "Chandrapur Kidney Care Consultation Chamber",
      languages: "English, Marathi, Hindi",
      about:
        "Visiting super-specialist surgical urologists collaborating with Chandrapur Kidney Care for comprehensive urinary tract, kidney stone surgical planning, and prostate evaluations.",
      expertise: [
        "Endourology & Kidney Stone Management",
        "Benign Prostatic Hyperplasia (BPH) Assessment",
        "Urinary Stricture & Voiding Dysfunction",
        "Complicated UTI & Structural Anomalies",
        "Urological Surgical Second Opinions",
      ],
      credentials: [
        "MCh (Urology) / DNB (Genito-Urinary Surgery)",
        "Member of Urological Society of India (USI)",
        "Extensive experience in minimally invasive urological procedures",
      ],
    },
    {
      id: "dialysis-officer",
      name: "Clinical Dialysis Medical Team",
      designation: "Senior Dialysis Medical Officer & Clinical Associates",
      degrees: "MBBS, Fellowship in Clinical Hemodialysis",
      experience: "24/7 Dedicated Renal Ward Support",
      sessions: "Continuous Bedside Monitoring",
      department: "Dialysis Intensive Unit",
      category: "dialysis",
      isLead: false,
      image: null,
      opdTimings: "24 Hours / 7 Days On-Duty Shift Coverage",
      location: "High-Flux Hemodialysis Ward",
      languages: "English, Marathi, Hindi",
      about:
        "Trained medical officers and certified dialysis technologists providing round-the-clock hemodialysis monitoring under the direct clinical supervision of Dr. Sagar Sarda.",
      expertise: [
        "High-Flux Hemodialysis Execution",
        "Emergency Intra-Dialytic Complication Management",
        "Vascular Access Cannulation & Aseptic Care",
        "Continuous Vital Signs & Electrolyte Triaging",
      ],
      credentials: [
        "Certified Hemodialysis Clinical Protocols",
        "Advanced Cardiac Life Support (ACLS) Certified",
        "Supervised by Lead Consultant Dr. Sagar Sarda",
      ],
    },
  ];

  const filteredDoctors =
    selectedSpecialty === "all"
      ? doctorsList
      : doctorsList.filter((d) => d.category === selectedSpecialty);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            Specialist Medical Team
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            Our Doctors & Specialist Panel
          </h1>
          <p className="text-xs sm:text-base text-slate-200 mt-2 font-normal leading-relaxed">
            Led by Senior Consultant Nephrologist & Kidney Transplant Physician Dr. Sagar Damodar
            Sarda (MBBS, MD Medicine, DM Nephrology) alongside visiting urology consultants and
            round-the-clock dialysis medical officers.
          </p>

          {/* Specialty Filter Tabs (Sahyadri Hospital Style) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: "all", label: "All Specialists" },
              { id: "nephrology", label: "Nephrology (Kidney Care)" },
              { id: "urology", label: "Visiting Urology Panel" },
              { id: "dialysis", label: "Dialysis Medical Unit" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSpecialty(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedSpecialty === tab.id
                    ? "bg-white text-[#0F2D59] shadow-md font-extrabold"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Sahyadri Hospital-Style Multi-Doctor Cards Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDoctors.map((doc) => (
            <Interactive3DCard
              key={doc.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-soft border flex flex-col justify-between transition-all ${
                doc.isLead
                  ? "border-teal-400 ring-2 ring-teal-500/20 shadow-card"
                  : "border-slate-100"
              }`}
            >
              {/* Doctor Visual Header */}
              <div className="p-6 bg-gradient-to-br from-slate-50 to-teal-50/40 border-b border-slate-100 flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-[#0F2D59] to-teal-600 p-0.5 shadow-md overflow-hidden shrink-0 flex items-center justify-center">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top rounded-2xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0F2D59] flex items-center justify-center text-teal-300">
                      <Stethoscope className="w-10 h-10" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  {doc.isLead && (
                    <span className="inline-block text-[10px] font-bold text-white bg-teal-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                      Lead Consultant
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-[#0F2D59] leading-snug">{doc.name}</h3>
                  <p className="text-xs text-teal-700 font-semibold">{doc.designation}</p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{doc.degrees}</p>
                </div>
              </div>

              {/* Doctor Details Body */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Experience
                    </span>
                    <span className="font-bold text-slate-800">{doc.experience}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Department
                    </span>
                    <span className="font-bold text-teal-700 truncate block">
                      {doc.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{doc.opdTimings}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{doc.location}</span>
                  </div>
                </div>

                {/* Core Expertise Tags */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Areas of Expertise:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {doc.expertise.slice(0, 3).map((exp, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md border border-teal-100"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => setSelectedDoctorModal(doc)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-[#0F2D59] font-bold text-xs py-2.5 px-3 rounded-xl transition text-center"
                >
                  View Profile
                </button>
                <button
                  onClick={() => setActiveTab("appointment")}
                  className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-md transition flex items-center justify-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book OPD
                </button>
              </div>
            </Interactive3DCard>
          ))}
        </div>
      </section>

      {/* 3. Detailed Lead Profile: Dr. Sagar Sarda */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Verified Portrait Frame */}
            <div className="lg:col-span-5 text-center">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 via-teal-50 to-slate-100 p-4 sm:p-6 shadow-inner border border-slate-200">
                <div className="w-full h-72 sm:h-80 mx-auto rounded-2xl bg-slate-900 overflow-hidden shadow-xl border-2 border-teal-500/40 relative group">
                  <img
                    src="/doctor_sagar_sarda.jpg"
                    alt="Dr. Sagar Damodar Sarda Consultant Nephrologist & Kidney Transplant Physician"
                    className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D37]/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-center text-white">
                    <span className="text-[10px] sm:text-[11px] font-bold bg-teal-500 text-white px-3 py-0.5 rounded-full uppercase shadow">
                      Consultant Nephrologist & Transplant Physician
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2D59]">
                    Dr. Sagar Damodar Sarda
                  </h3>
                  <p className="text-teal-700 font-semibold text-xs sm:text-sm mt-0.5">
                    MBBS, MD Medicine, DM Nephrology
                  </p>
                  <p className="text-xs text-slate-500">
                    Chandrapur Kidney Care • Lead Nephrologist
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-around text-center">
                  <div>
                    <span className="block text-lg sm:text-xl font-bold text-[#0F2D59]">12+</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                      Yrs Exp
                    </span>
                  </div>
                  <div className="border-r border-slate-200"></div>
                  <div>
                    <span className="block text-lg sm:text-xl font-bold text-teal-600">
                      15,000+
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                      Sessions
                    </span>
                  </div>
                  <div className="border-r border-slate-200"></div>
                  <div>
                    <span className="block text-lg sm:text-xl font-bold text-emerald-600">
                      100%
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                      Dedicated
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Biography, Philosophy & Credentials */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-sky-50/70 border-l-4 border-teal-500 p-4 sm:p-5 rounded-r-2xl relative">
                <Quote className="w-6 h-6 text-teal-400/40 absolute top-3 right-3" />
                <p className="text-slate-800 italic text-xs sm:text-base leading-relaxed">
                  "Our mission is to deliver world-class nephrology, dialysis management, and kidney
                  transplant care with utmost compassion and clinical precision to the people of
                  Chandrapur and Central India."
                </p>
                <p className="text-right text-xs font-bold text-[#0F2D59] mt-2">
                  — Dr. Sagar Damodar Sarda
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F2D59] text-sm sm:text-base mb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-teal-600" /> Academic & Clinical
                  Qualifications
                </h4>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                  {[
                    "MBBS — Recognized Medical University",
                    "MD (Medicine) — Advanced Physician Training",
                    "DM (Nephrology) — Super-Specialist Kidney Care & Dialysis",
                    "Consultant Nephrologist & Kidney Transplant Physician",
                    "Supervised 15,000+ Hemodialysis Sessions with 0-compromise safety protocols",
                    "Member of Indian Society of Nephrology (ISN)",
                  ].map((cred, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#0F2D59] text-sm sm:text-base mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-600" /> Areas of Expertise
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Chronic Kidney Disease (CKD) Management",
                    "Dialysis & Advanced Renal Care",
                    "Hypertension & Renal Vascular Control",
                    "Kidney Stone Medical Treatment & Prevention",
                    "Glomerular Diseases & Nephrotic Syndrome",
                    "Preventive Nephrology & Diabetic Screening",
                  ].map((area, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setActiveTab("appointment")}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation with Dr. Sarda
                </button>
                <a
                  href="tel:+919876543210"
                  className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" /> Call Direct Line
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Doctor Schedule Explorer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DoctorScheduleExplorer setActiveTab={setActiveTab} />
      </section>

      {/* Doctor Modal (Sahyadri Hospital Style Details Popup) */}
      {selectedDoctorModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 animate-scaleUp my-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-[#0F2D59]">{selectedDoctorModal.name}</h3>
                <p className="text-xs text-teal-700 font-semibold">
                  {selectedDoctorModal.designation}
                </p>
              </div>
              <button
                onClick={() => setSelectedDoctorModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedDoctorModal.about}</p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-800 block">
                Areas of Specialization:
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {selectedDoctorModal.expertise.map((exp, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p>
                <strong className="text-slate-700">OPD Timings:</strong>{" "}
                {selectedDoctorModal.opdTimings}
              </p>
              <p>
                <strong className="text-slate-700">Languages:</strong>{" "}
                {selectedDoctorModal.languages}
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setSelectedDoctorModal(null);
                  setActiveTab("appointment");
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Consultation Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
