import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import AdminPortal from "./components/AdminPortal";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import PatientInfoPage from "./pages/PatientInfoPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import ContactPage from "./pages/ContactPage";
import AppointmentPage from "./pages/AppointmentPage";
import FaqPage from "./pages/FaqPage";

function MainAppContent() {
  const [activeTab, setActiveTab] = useState("home");

  // Scroll to top whenever page tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const renderActivePage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage setActiveTab={setActiveTab} />;
      case "about":
        return <AboutPage setActiveTab={setActiveTab} />;
      case "services":
        return <ServicesPage setActiveTab={setActiveTab} />;
      case "doctor":
        return <DoctorProfilePage setActiveTab={setActiveTab} />;
      case "facilities":
        return <FacilitiesPage setActiveTab={setActiveTab} />;
      case "patient-info":
        return <PatientInfoPage setActiveTab={setActiveTab} />;
      case "faqs":
        return <FaqPage setActiveTab={setActiveTab} />;
      case "contact":
        return <ContactPage setActiveTab={setActiveTab} />;
      case "appointment":
        return <AppointmentPage setActiveTab={setActiveTab} />;
      case "admin":
        return <AdminPortal setActiveTab={setActiveTab} />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-teal-500 selection:text-white relative">
      {/* Persistent Responsive Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dynamic View Content with smooth page transition */}
      <main className="flex-grow pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Responsive Medical Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Sticky Mobile Quick Action Bar */}
      <MobileBottomNav setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
