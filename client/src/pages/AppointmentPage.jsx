import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, Clock, UserCheck, ShieldCheck, CheckCircle2, AlertCircle, 
  HeartPulse, Phone, MapPin, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AppointmentPage({ setActiveTab }) {
  const { lang, t } = useLanguage();
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
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

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

  // Fetch booked slots whenever appointment_date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.appointment_date) return;
      setSlotsLoading(true);
      try {
        const res = await fetch(`/api/appointments/booked-slots?date=${formData.appointment_date}`);
        if (res.ok) {
          const booked = await res.json();
          setBookedSlots(Array.isArray(booked) ? booked : []);

          // If currently selected slot is already booked, pick first available
          if (Array.isArray(booked) && booked.includes(formData.time_slot)) {
            const firstAvailable = timeSlots.find(s => !booked.includes(s));
            if (firstAvailable) {
              setFormData(prev => ({ ...prev, time_slot: firstAvailable }));
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch booked slots:', err);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchBookedSlots();
  }, [formData.appointment_date]);

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
      setError('Please fill in all mandatory fields (Name, Phone, Date, Time, Reason).');
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
      if (!res.ok) throw new Error(data.error || 'Failed to book appointment');

      setConfirmedBooking(data);
      setLoading(false);

      // Trigger celebrate confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Ignore confetti failure
      }

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 sm:space-y-16 pb-12">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/10">
            {t('nav.appointment', 'Online OPD Booking')}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            {t('appointment.title', 'Book an Appointment')}
          </h1>
          <p className="text-xs sm:text-base text-teal-100 mt-2 font-normal">
            {t('appointment.subtitle', 'Schedule your consultation with Dr. Sagar Damodar Sarda (DM Nephrology).')}
          </p>
        </div>
      </section>

      {/* 2. Main Booking Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-card border border-slate-100">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F2D59]">Patient Details</h3>
                  <p className="text-xs text-slate-500">Fill in patient information for OPD token</p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  Instant Confirmation
                </span>
              </div>

              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                
                {/* Full Name */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patient_name"
                    value={formData.patient_name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Deshmukh"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                      Phone / Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98221 XXXXX"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. patient@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="appointment_date"
                      value={formData.appointment_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50 font-medium"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-slate-700 text-xs sm:text-sm">
                        Preferred Time Slot <span className="text-rose-500">*</span>
                      </label>
                      {bookedSlots.length > 0 && (
                        <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {bookedSlots.length} slot(s) filled today
                        </span>
                      )}
                    </div>
                    <select
                      name="time_slot"
                      value={formData.time_slot}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50 font-medium"
                    >
                      {timeSlots.map((slot, idx) => {
                        const isBooked = bookedSlots.includes(slot);
                        return (
                          <option 
                            key={idx} 
                            value={slot}
                            disabled={isBooked}
                            className={isBooked ? 'text-slate-400 bg-slate-100 italic' : 'text-slate-800 font-medium'}
                          >
                            {slot} {isBooked ? '— (❌ Booked / Full)' : '— (✅ Available)'}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Reason for Consultation */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                    Reason for Consultation <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50 font-medium"
                  >
                    {consultationReasons.map((r, idx) => (
                      <option key={idx} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                    Symptoms or History (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Swelling in feet, elevated serum creatinine, high blood pressure..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  ></textarea>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2 text-base"
                >
                  <Calendar className="w-5 h-5" />
                  {loading ? 'Submitting...' : 'Confirm & Book Appointment'}
                </button>

              </form>

            </div>
          </div>

          {/* Right Info Cards */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-slate-100 space-y-4">
              <h3 className="text-base font-bold text-[#0F2D59] border-b border-slate-100 pb-2.5">
                Why Choose Us?
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                {[
                  { title: "Experienced Nephrologist", desc: "Dr. Sagar Sarda (MD, DM) with 12+ years expertise." },
                  { title: "Personalized Care", desc: "Tailored medical and renal dietary plans." },
                  { title: "Minimal Waiting Time", desc: "Organized time-slot scheduling." },
                  { title: "Friendly Support Staff", desc: "Dedicated patient assistance & guidance." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Phone Assistance */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 sm:p-5">
              <h4 className="font-bold text-[#0F2D59] text-xs uppercase mb-1">Prefer to Book by Phone?</h4>
              <p className="text-xs text-slate-600 mb-3">Call our reception desk directly for walk-in scheduling.</p>
              <a
                href="tel:+919876543210"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0F2D59] hover:bg-teal-800 active:scale-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call +91 98765 43210
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 animate-scaleUp my-auto">
            
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8" />
            </div>

            <div className="text-center mb-4">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                Confirmed
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F2D59] mt-1.5">
                Booking Successful!
              </h3>
              <p className="text-xs text-slate-500">
                Your consultation token has been generated.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2 mb-5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500">Token ID:</span>
                <span className="font-mono font-bold text-teal-700 text-sm">{confirmedBooking.bookingReference}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-800">{confirmedBooking.appointment?.patient_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-bold text-[#0F2D59]">Dr. Sagar Sarda</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-teal-700">{confirmedBooking.appointment?.appointment_date} ({confirmedBooking.appointment?.time_slot})</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setActiveTab('home');
                }}
                className="w-full bg-[#0F2D59] hover:bg-teal-800 active:scale-95 text-white font-bold py-3 rounded-xl transition text-xs"
              >
                Back to Home Page
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}