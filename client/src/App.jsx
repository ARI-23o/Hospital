import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import AdminPortal from './components/AdminPortal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import PatientInfoPage from './pages/PatientInfoPage';
import FacilitiesPage from './pages/FacilitiesPage';
import ContactPage from './pages/ContactPage';
import AppointmentPage from './pages/AppointmentPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Scroll to top whenever page tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
      case 'about':
        return <AboutPage setActiveTab={setActiveTab} />;
      case 'services':
        return <ServicesPage setActiveTab={setActiveTab} />;
      case 'doctor':
        return <DoctorProfilePage setActiveTab={setActiveTab} />;
      case 'facilities':
        return <FacilitiesPage setActiveTab={setActiveTab} />;
      case 'patient-info':
        return <PatientInfoPage setActiveTab={setActiveTab} />;
      case 'contact':
        return <ContactPage setActiveTab={setActiveTab} />;
      case 'appointment':
        return <AppointmentPage setActiveTab={setActiveTab} />;
      case 'admin':
        return <AdminPortal setActiveTab={setActiveTab} />;
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-teal-500 selection:text-white relative">
      {/* Persistent Responsive Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Dynamic View Content with mobile padding-bottom for bottom bar */}
      <main className="flex-grow pb-20 lg:pb-0">
        {renderActivePage()}
      </main>

      {/* Persistent Responsive Medical Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Sticky Mobile Quick Action Bar */}
      <MobileBottomNav setActiveTab={setActiveTab} />
    </div>
  );
}