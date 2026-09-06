import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCTAs from './components/FloatingCTAs';
import TourDetailsModal from './components/TourDetailsModal';
import CustomTripModal from './components/CustomTripModal';
import EnquiryModal from './components/EnquiryModal';
import ReviewModal from './components/ReviewModal';
import VideoIntroLoader from './components/VideoIntroLoader';

// Dedicated Module Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GroupToursPage from './pages/GroupToursPage';
import PrivateToursPage from './pages/PrivateToursPage';
import DestinationsPage from './pages/DestinationsPage';
import TravelAdviserPage from './pages/TravelAdviserPage';
import ContactPage from './pages/ContactPage';

// Admin Views
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminLeads from './admin/AdminLeads';
import AdminLeadDetailModal from './admin/AdminLeadDetailModal';
import AdminTours from './admin/AdminTours';
import AdminDestinations from './admin/AdminDestinations';
import AdminCustomers from './admin/AdminCustomers';
import AdminFeedback from './admin/AdminFeedback';
import AdminReports from './admin/AdminReports';
import AdminStaff from './admin/AdminStaff';

import { Sparkles, CheckCircle, Info } from 'lucide-react';

function AppContent() {
  const { currentPath, isAdminAuthenticated, adminTab, toastMessage, showIntroLoader, setShowIntroLoader } = useApp();
  const [inspectingLead, setInspectingLead] = useState(null);

  // 1. Check if route is Admin (/admin or /admin/...)
  if (currentPath.startsWith('/admin')) {
    // If not authenticated, render Admin Login screen
    if (!isAdminAuthenticated) {
      return (
        <>
          <AdminLogin />
          {toastMessage && (
            <div className="toast-banner">
              <CheckCircle size={20} color="#10b981" />
              <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{toastMessage.message}</span>
            </div>
          )}
        </>
      );
    }

    // If authenticated, render full Admin CRM Operations Dashboard
    return (
      <>
        <AdminLayout>
          {adminTab === 'dashboard' && (
            <AdminDashboard onSelectLead={(lead) => setInspectingLead(lead)} />
          )}
          {adminTab === 'leads' && (
            <AdminLeads onSelectLead={(lead) => setInspectingLead(lead)} />
          )}
          {adminTab === 'tours' && <AdminTours />}
          {adminTab === 'destinations' && <AdminDestinations />}
          {adminTab === 'customers' && <AdminCustomers />}
          {adminTab === 'feedback' && <AdminFeedback />}
          {adminTab === 'reports' && <AdminReports />}
          {adminTab === 'staff' && <AdminStaff />}

          {/* Lead Inspector Modal */}
          {inspectingLead && (
            <AdminLeadDetailModal
              lead={inspectingLead}
              onClose={() => setInspectingLead(null)}
            />
          )}
        </AdminLayout>

        {/* Global Modals */}
        <TourDetailsModal />
        <CustomTripModal />
        <EnquiryModal />
        <ReviewModal />

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="toast-banner">
            <CheckCircle size={20} color="#10b981" />
            <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{toastMessage.message}</span>
          </div>
        )}
      </>
    );
  }

  // 2. Public Customer Website Router
  const renderPublicPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath.startsWith('/about')) {
      return <AboutPage />;
    }
    if (currentPath.startsWith('/group-tours')) {
      return <GroupToursPage />;
    }
    if (currentPath.startsWith('/private-tours')) {
      return <PrivateToursPage />;
    }
    if (currentPath.startsWith('/destinations')) {
      return <DestinationsPage />;
    }
    if (currentPath.startsWith('/adviser')) {
      return <TravelAdviserPage />;
    }
    if (currentPath.startsWith('/contact')) {
      return <ContactPage />;
    }
    // Default fallback
    return <HomePage />;
  };

  return (
    <>
      {/* Cinematic Responsive Video Intro Loader (Mobile & Laptop) */}
      {showIntroLoader && (
        <VideoIntroLoader onComplete={() => setShowIntroLoader(false)} />
      )}

      <div className="website-root">
        <Navbar />
        <main>
          {renderPublicPage()}
        </main>
        <Footer />
        <FloatingCTAs />
      </div>

      {/* Global Modals */}
      <TourDetailsModal />
      <CustomTripModal />
      <EnquiryModal />
      <ReviewModal />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-banner">
          <CheckCircle size={20} color="#10b981" />
          <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{toastMessage.message}</span>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
