import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DesignGridModal from './components/DesignGridModal';
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
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-teal-500 selection:text-white">
      {/* Persistent Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenMockupGrid={() => setIsGridModalOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Persistent Medical Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4x2 Design Mockup Showcase Modal */}
      <DesignGridModal
        isOpen={isGridModalOpen}
        onClose={() => setIsGridModalOpen(false)}
        onSelectPage={(pageId) => setActiveTab(pageId)}
      />
    </div>
  );
}
