import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ContactPage({ setActiveTab }) {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const MAP_URL = "https://maps.app.goo.gl/f1P5sEp6G8aWFc39A";
  const MAP_EMBED_URL =
    "https://maps.google.com/maps?q=19.9495898,79.2959868&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        error:
          language === "mr"
            ? "कृपया नाव, ईमेल आणि संदेश भरा."
            : language === "hi"
              ? "कृपया नाम, ईमेल और संदेश भरें।"
              : "Please fill in Name, Email and Message.",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit inquiry");

      setStatus({ loading: false, success: true, error: "" });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="space-y-10 sm:space-y-16 pb-12">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#0F2D59] via-[#163D75] to-[#0D9488] text-white py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-teal-300 font-bold text-[11px] sm:text-xs uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/10">
            {t("nav.contact")}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            {t("contact.title")}
          </h1>
          <p className="text-xs sm:text-base text-teal-100 mt-2 font-normal">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      {/* 2. Contact Details & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Clinic Contact Info & Real Interactive Map */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-slate-100 space-y-4">
              <h3 className="text-lg font-bold text-[#0F2D59] border-b border-slate-100 pb-2.5">
                {t("contact.clinicAddressTitle")}
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t("contact.clinicAddressTitle")}</h4>
                    <p className="text-slate-500 mt-0.5">{t("common.hospitalAddress")}</p>
                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 font-bold text-xs mt-1"
                    >
                      <Navigation className="w-3.5 h-3.5" /> {t("contact.navigateGoogleMaps")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t("contact.phoneSupport")}</h4>
                    <a
                      href="tel:+919876543210"
                      className="text-slate-600 font-medium block hover:text-teal-700"
                    >
                      {t("common.hospitalPhone")}
                    </a>
                    <a
                      href="tel:+919823333537"
                      className="text-slate-600 font-medium block hover:text-teal-700"
                    >
                      +91 98233 33537
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Email</h4>
                    <a
                      href={`mailto:${t("common.hospitalEmail")}`}
                      className="text-slate-500 hover:text-teal-700"
                    >
                      {t("common.hospitalEmail")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t("contact.opdTimingsTitle")}</h4>
                    <p className="text-slate-600">{t("common.opdHours")}</p>
                    <p className="text-teal-700 font-semibold">{t("doctor.sundayNote")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-soft border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t("contact.locationMap")}
                </h4>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
                >
                  {t("common.openInMaps")} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200">
                <iframe
                  title="Dr. Sagar Sarda's Chandrapur Kidney Care Location"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-card border border-slate-100 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0F2D59]">{t("contact.sendInquiry")}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === "mr"
                    ? "किडनीचे आजार, डायलिसिस किंवा स्टोन उपचारांबाबत काही प्रश्न असल्यास आम्हाला लिहा."
                    : language === "hi"
                      ? "किडनी रोग, डायलिसिस या पथरी के इलाज के संबंध में कोई प्रश्न है? हमें लिखें।"
                      : "Have a question regarding kidney disease, dialysis, or stone treatment? Write to us."}
                </p>
              </div>

              {status.success && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold">
                      {language === "mr"
                        ? "संदेश यशस्वीरीत्या पाठवला!"
                        : language === "hi"
                          ? "संदेश सफलतापूर्वक भेजा गया!"
                          : "Message Delivered Successfully!"}
                    </h4>
                    <p className="mt-0.5">
                      {language === "mr"
                        ? "चंद्रपूर किडनी केअरशी संपर्क साधल्याबद्दल धन्यवाद. आमची टीम लवकरच आपल्याशी संपर्क साधेल."
                        : language === "hi"
                          ? "चंद्रपुर किडनी केयर से संपर्क करने के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।"
                          : "Thank you for contacting Chandrapur Kidney Care. Our team will get back to you shortly."}
                    </p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <p>{status.error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {t("appointment.fullName")} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {t("appointment.email")} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {t("appointment.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {language === "mr" ? "विषय" : language === "hi" ? "विषय" : "Subject"}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={
                        language === "mr"
                          ? "उदा. डायलिसिस चौकशी, डॉक्टर अपॉइंटमेंट"
                          : language === "hi"
                            ? "उदा. डायलिसिस पूछताछ, डॉक्टर अपॉइंटमेंट"
                            : "e.g. Dialysis Query, Doctor Appointment"
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {language === "mr"
                      ? "आपला संदेश / प्रश्न"
                      : language === "hi"
                        ? "आपका संदेश / प्रश्न"
                        : "Your Message / Question"}{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      language === "mr"
                        ? "कृपया आपला प्रश्न किंवा विचारणा लिहा..."
                        : language === "hi"
                          ? "कृपया अपना प्रश्न या जानकारी लिखें..."
                          : "Please describe your health query or question..."
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-[#0F2D59] hover:bg-teal-800 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {status.loading ? t("common.submitting") : t("common.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
