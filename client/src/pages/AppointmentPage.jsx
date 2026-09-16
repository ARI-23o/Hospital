import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, Clock, UserCheck, ShieldCheck, CheckCircle2, AlertCircle, 
  HeartPulse, FileText, Phone, MapPin, Printer, Download
} from 'lucide-react';

export default function AppointmentPage({ setActiveTab }) {
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    email: '',
    appointment_date: new Date().toISOString().split('T')[0],
    time_slot: '10:00 AM - 10:30 AM',
    reason: 'Chronic Kidney Disease (CKD) Consultation',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [error, setError] = useState('');

  const timeSlots = [
    '09:30 AM - 10:00 AM',
    '10:00 AM - 10:30 AM',
    '10:30 AM - 11:00 AM',
    '11:30 AM - 12:00 PM',
    '12:00 PM - 12:30 PM',
    '04:30 PM - 05:00 PM',
    '05:00 PM - 05:30 PM',
    '05:30 PM - 06:00 PM',
    '06:30 PM - 07:00 PM'
  ];

  const consultationReasons = [
    'Chronic Kidney Disease (CKD) Consultation',
    'High Blood Pressure / Hypertension Care',
    'Dialysis Guidance & Management',
    'Kidney Stone Evaluation',
    'Glomerular Disease / Protein in Urine',
    'Electrolyte & Mineral Imbalance',
    'Urinary Tract Infection (Recurrent UTI)',
    'Preventive Diabetic Kidney Screening',
    'Second Opinion on Kidney Reports'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.patient_name || !formData.phone || !formData.appointment_date || !formData.time_slot || !formData.reason) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit appointment.');
      }

      setConfirmedBooking(data);
      setLoading(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (cErr) {
        // ignore if not supported
      }

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-xs uppercase tracking-wider bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
            Consultation Booking
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4 tracking-tight">
            Book an Appointment
          </h1>
          <p className="text-sm sm:text-base text-teal-100 mt-2 font-normal leading-relaxed">
            Take the first step towards better kidney health with Dr. Sagar Sadar.
          </p>
        </div>
      </section>

      {/* 2. Main Booking Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Interactive Appointment Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-100">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0F2D59]">Patient Appointment Form</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Please provide patient details for slot confirmation</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Instant Confirmation
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="patient_name"
                      value={formData.patient_name}
                      onChange={handleChange}
                      placeholder="e.g. Anand Deshpande"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98221 44550"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. anand@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                {/* Preferred Date & Preferred Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="appointment_date"
                      value={formData.appointment_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50 font-medium text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Preferred Time Slot <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="time_slot"
                      value={formData.time_slot}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50 font-medium text-slate-700"
                    >
                      {timeSlots.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reason for Consultation */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Reason for Consultation <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50 font-medium text-slate-700"
                  >
                    {consultationReasons.map((r, idx) => (
                      <option key={idx} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Optional Notes / Symptoms */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Brief Symptoms or Past Medical History (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Existing diabetes for 5 years, elevated serum creatinine (2.1), swelling in feet..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base"
                >
                  <Calendar className="w-5 h-5" />
                  {loading ? 'Confirming Appointment...' : 'Book Appointment'}
                </button>

              </form>

            </div>
          </div>

          {/* Right: Why Choose Us Card */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-[#0F2D59] border-b border-slate-100 pb-3">
                Why Choose Us?
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {[
                  { title: "Experienced Nephrologist", desc: "Dr. Sagar Sadar (MD, DM Nephrology) brings 12+ years of clinical kidney expertise." },
                  { title: "Personalized Care", desc: "Every patient receives custom medical protocols, dietary plans, and close monitoring." },
                  { title: "Minimal Waiting Time", desc: "Organized time-slot scheduling reduces clinic waiting times." },
                  { title: "Friendly Support Staff", desc: "Trained and caring staff dedicated to patient comfort and guidance." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-800">{item.title}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Priority Trust Badge */}
              <div className="rounded-2xl bg-gradient-to-tr from-[#0F2D59] to-teal-700 text-white p-5 text-center">
                <HeartPulse className="w-8 h-8 text-teal-300 mx-auto mb-2" />
                <h4 className="font-bold text-sm">Your Health Is Our Priority</h4>
                <p className="text-xs text-teal-100 mt-1 italic">
                  "We look forward to serving you with compassion and excellence."
                </p>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
              <h4 className="font-bold text-[#0F2D59] text-xs uppercase mb-1">Need Urgent Consultation?</h4>
              <p className="text-xs text-slate-600 mb-3">You can call our reception desk directly for same-day walk-in assistance.</p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-[#0F2D59] hover:bg-teal-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call +91 98765 43210
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 animate-scaleUp">
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="text-center mb-6">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Appointment Confirmed
              </span>
              <h3 className="text-2xl font-bold text-[#0F2D59] mt-2">
                Booking Successful!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your consultation token has been generated and recorded in the clinic system.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2.5 mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-teal-700">{confirmedBooking.bookingReference}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.appointment?.patient_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Consultant:</span>
                <span className="font-bold text-[#0F2D59]">Dr. Sagar Sadar (Nephrologist)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Date:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.appointment?.appointment_date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Time Slot:</span>
                <span className="font-bold text-teal-700">{confirmedBooking.appointment?.time_slot}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-500">Clinic Location:</span>
                <span className="font-medium text-slate-700">Chandrapura, Maharashtra</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setActiveTab('home');
                }}
                className="flex-1 bg-[#0F2D59] hover:bg-teal-800 text-white font-bold py-3 rounded-xl transition text-xs text-center"
              >
                Back to Home Page
              </button>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setActiveTab('admin');
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition text-xs text-center"
              >
                View in Dr. Portal
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
