import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_TOURS,
  INITIAL_DESTINATIONS,
  INITIAL_LEADS,
  INITIAL_CUSTOMERS,
  INITIAL_FEEDBACK,
  INITIAL_STAFF
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & Browser URL Routing State
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return 'admin';
    }
    return 'website';
  }); // 'website' | 'admin'
  const [adminTab, setAdminTab] = useState('dashboard');
  const [activeNav, setActiveNav] = useState('home');

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('sk_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sk_admin_user');
      return saved ? JSON.parse(saved) : { username: 'sk@admin', name: 'Super Admin', role: 'Super Admin' };
    } catch {
      return { username: 'sk@admin', name: 'Super Admin', role: 'Super Admin' };
    }
  });

  // Dynamic Airplane Around the World Intro Animation Loader
  const [showIntroLoader, setShowIntroLoader] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
      return false;
    }
    return true;
  });

  const replayIntroLoader = useCallback(() => {
    setShowIntroLoader(true);
  }, []);

  // Client-side Navigation helper
  const navigate = useCallback((path) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      setCurrentPath(path);
      if (path.startsWith('/admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('website');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      if (path.startsWith('/admin')) {
        setCurrentView('admin');
      } else {
        setCurrentView('website');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Admin Login with credentials validation
  const adminLogin = async (username, password) => {
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    // Check credentials: sk@admin & sk@admin28
    if (cleanUser === 'sk@admin' && cleanPass === 'sk@admin28') {
      const userObj = { username: 'sk@admin', name: 'Super Admin', role: 'Administrator' };
      setIsAdminAuthenticated(true);
      setAdminUser(userObj);
      try {
        localStorage.setItem('sk_admin_auth', 'true');
        localStorage.setItem('sk_admin_user', JSON.stringify(userObj));
      } catch (e) {
        console.error('Storage error:', e);
      }
      showToast('Welcome back, Admin! CRM Dashboard unlocked.', 'success');
      navigate('/admin');
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Invalid username or password. Please use correct credentials.'
      };
    }
  };

  // Admin Logout
  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('sk_admin_auth');
      localStorage.removeItem('sk_admin_user');
    } catch (e) {
      console.error('Storage error:', e);
    }
    showToast('Logged out of Admin Portal.', 'info');
    navigate('/admin');
  };

  // Modals & Active Selections
  const [selectedTour, setSelectedTour] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isTravelAdviserOpen, setIsTravelAdviserOpen] = useState(false);
  const [isCustomTripOpen, setIsCustomTripOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [enquiryInitialDestination, setEnquiryInitialDestination] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // MongoDB Connection State
  const [dbStatus, setDbStatus] = useState('connecting'); // 'connected' | 'offline' | 'connecting'

  // Search & Filter State
  const [filters, setFilters] = useState({
    search: '',
    month: '',
    maxBudget: 100000,
    category: 'All',
    isPremium: false,
    travelDate: ''
  });

  // Clear legacy mock localStorage on initial load
  useEffect(() => {
    if (!localStorage.getItem('sk_mongo_migrated_v3')) {
      localStorage.removeItem('sk_tours_data');
      localStorage.removeItem('sk_destinations_data');
      localStorage.removeItem('sk_leads_data');
      localStorage.removeItem('sk_customers_data');
      localStorage.removeItem('sk_feedback_data');
      localStorage.removeItem('sk_staff_data');
      localStorage.setItem('sk_mongo_migrated_v3', 'true');
    }
  }, []);

  // Application Stores (Default empty - no dummy data)
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [currentStaff, setCurrentStaff] = useState(INITIAL_STAFF[0] || { name: 'Admin', role: 'Super Admin' });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Fetch all collections from MongoDB API
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      // Health check
      const healthRes = await fetch('/api/health').catch(() => null);
      if (healthRes && healthRes.ok) {
        const healthData = await healthRes.json();
        setDbStatus(healthData.status === 'connected' ? 'connected' : 'offline');
      } else {
        setDbStatus('offline');
      }

      const [toursRes, destRes, leadsRes, custRes, fbRes, staffRes, notifRes] = await Promise.all([
        fetch('/api/tours').catch(() => null),
        fetch('/api/destinations').catch(() => null),
        fetch('/api/leads').catch(() => null),
        fetch('/api/customers').catch(() => null),
        fetch('/api/feedback').catch(() => null),
        fetch('/api/staff').catch(() => null),
        fetch('/api/notifications').catch(() => null)
      ]);

      if (toursRes && toursRes.ok) {
        const data = await toursRes.json();
        setTours(data);
      }
      if (destRes && destRes.ok) {
        const data = await destRes.json();
        setDestinations(data);
      }
      if (leadsRes && leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data);
      }
      if (custRes && custRes.ok) {
        const data = await custRes.json();
        setCustomers(data);
      }
      if (fbRes && fbRes.ok) {
        const data = await fbRes.json();
        setFeedback(data);
      }
      if (staffRes && staffRes.ok) {
        const data = await staffRes.json();
        if (data.length > 0) {
          setStaff(data);
          setCurrentStaff(data[0]);
        }
      }
      if (notifRes && notifRes.ok) {
        const data = await notifRes.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Error fetching data from MongoDB:', err);
      setDbStatus('offline');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Trigger celebratory confetti on conversion
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#0b132b', '#ffffff', '#e5c05b']
      });
    } catch (e) {
      console.log('Confetti not available', e);
    }
  };

  // Lead Generation & Enquiry Pipeline -> MongoDB
  const createLead = async (leadData) => {
    const newId = `LEAD-${100 + leads.length + 1}`;
    const newLead = {
      id: newId,
      customerName: leadData.name || leadData.customerName || "Traveller",
      phone: leadData.phone || leadData.mobileNumber || "",
      email: leadData.email || "",
      destination: leadData.destination || "Flexible",
      travelDate: leadData.travelDate || "",
      returnDate: leadData.returnDate || "",
      adults: Number(leadData.adults) || 2,
      children: Number(leadData.children) || 0,
      budget: leadData.budget ? (leadData.budget.toString().startsWith('₹') ? leadData.budget : `₹${leadData.budget}`) : "₹50,000+",
      tourType: leadData.tourType || "group",
      source: leadData.source || "Website Enquiry",
      assignedStaff: currentStaff ? currentStaff.name : "Admin",
      status: "New",
      priority: leadData.priority || "High",
      createdDate: new Date().toISOString().split('T')[0],
      followUpDate: new Date().toISOString().split('T')[0],
      followUpTime: "11:00 AM",
      quotationAmount: null,
      specialRequirements: leadData.specialRequirements || leadData.message || leadData.notes || "Interested in detailed itinerary and best quote.",
      notes: [
        {
          id: `note-${Date.now()}`,
          date: new Date().toLocaleString(),
          author: "System Automation",
          text: `Enquiry generated from ${leadData.source || "Website Enquiry"}. Initial destination: ${leadData.destination || "Flexible"}.`
        }
      ]
    };

    // Optimistic state update
    setLeads(prev => [newLead, ...prev]);

    // Send to MongoDB API
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });
    } catch (err) {
      console.error('Failed to save lead to MongoDB:', err);
    }

    // Add Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "New Enquiry Received",
      desc: `${newLead.customerName} enquired for ${newLead.destination}`,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    triggerConfetti();
    showToast(`Thank you ${newLead.customerName}! Your enquiry #${newId} has been registered into the database. Our team will contact you shortly.`, 'success');
    return newLead;
  };

  const updateLeadStatus = async (leadId, newStatus, noteText) => {
    let updatedLead = null;
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const updatedNotes = [...(lead.notes || [])];
        if (noteText) {
          updatedNotes.push({
            id: `note-${Date.now()}`,
            date: new Date().toLocaleString(),
            author: currentStaff?.name || 'Admin',
            text: `Status changed to ${newStatus}: ${noteText}`
          });
        }
        updatedLead = {
          ...lead,
          status: newStatus,
          notes: updatedNotes
        };
        return updatedLead;
      }
      return lead;
    }));

    if (updatedLead) {
      try {
        await fetch(`/api/leads/${leadId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedLead)
        });
      } catch (err) {
        console.error('Failed to update lead in MongoDB:', err);
      }
    }
    showToast(`Lead #${leadId} updated to ${newStatus}`);
  };

  const addLeadNote = async (leadId, text) => {
    if (!text.trim()) return;
    let updatedLead = null;
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        updatedLead = {
          ...lead,
          notes: [
            ...(lead.notes || []),
            {
              id: `note-${Date.now()}`,
              date: new Date().toLocaleString(),
              author: currentStaff?.name || 'Admin',
              text
            }
          ]
        };
        return updatedLead;
      }
      return lead;
    }));

    if (updatedLead) {
      try {
        await fetch(`/api/leads/${leadId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedLead)
        });
      } catch (err) {
        console.error('Failed to save note to MongoDB:', err);
      }
    }
    showToast("Activity note added");
  };

  const scheduleLeadFollowUp = async (leadId, date, time, note) => {
    let updatedLead = null;
    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const updatedNotes = [...(lead.notes || [])];
        if (note) {
          updatedNotes.push({
            id: `note-${Date.now()}`,
            date: new Date().toLocaleString(),
            author: currentStaff?.name || 'Admin',
            text: `Scheduled Follow-up for ${date} at ${time}. Note: ${note}`
          });
        }
        updatedLead = {
          ...lead,
          followUpDate: date,
          followUpTime: time,
          status: lead.status === 'New' ? 'Follow-up' : lead.status,
          notes: updatedNotes
        };
        return updatedLead;
      }
      return lead;
    }));

    if (updatedLead) {
      try {
        await fetch(`/api/leads/${leadId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedLead)
        });
      } catch (err) {
        console.error('Failed to schedule follow-up in MongoDB:', err);
      }
    }
    showToast(`Follow-up scheduled for ${date} at ${time}`);
  };

  const convertLeadToCustomer = async (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const existingCust = customers.find(c => c.phone === lead.phone);
    if (existingCust) {
      showToast(`${lead.customerName} already exists in Customer Directory!`);
      return;
    }

    const newCustomer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name: lead.customerName,
      phone: lead.phone,
      email: lead.email || `${lead.customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      city: "Salem",
      tripsCompleted: 1,
      totalSpent: lead.quotationAmount || 45000,
      lastTrip: `${lead.destination} Tour (${lead.travelDate || 'Planned'})`,
      joinedDate: new Date().toISOString().split('T')[0],
      bookings: [
        {
          id: `BK-${Date.now().toString().slice(-4)}`,
          tourName: `${lead.destination} Experience`,
          travelDate: lead.travelDate || 'Upcoming',
          amount: lead.quotationAmount || 45000,
          status: "Confirmed"
        }
      ]
    };

    setCustomers(prev => [newCustomer, ...prev]);
    updateLeadStatus(leadId, 'Confirmed', 'Lead successfully converted to confirmed customer!');

    try {
      await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
      });
    } catch (err) {
      console.error('Failed to save customer to MongoDB:', err);
    }

    showToast(`Customer account created for ${newCustomer.name}`);
  };

  // Tour Package CMS Methods -> MongoDB
  const addTour = async (tourData) => {
    const newTour = {
      ...tourData,
      id: `tour-${Date.now()}`,
      slug: (tourData.name || 'tour').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: tourData.rating || 5.0,
      reviewsCount: tourData.reviewsCount || 0,
      published: tourData.published !== undefined ? tourData.published : true
    };
    setTours(prev => [newTour, ...prev]);

    try {
      await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTour)
      });
    } catch (err) {
      console.error('Failed to add tour to MongoDB:', err);
    }

    showToast(`Tour "${newTour.name}" added to MongoDB catalogue`);
  };

  const updateTour = async (updatedTour) => {
    setTours(prev => prev.map(t => t.id === updatedTour.id ? updatedTour : t));

    try {
      await fetch(`/api/tours/${updatedTour.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTour)
      });
    } catch (err) {
      console.error('Failed to update tour in MongoDB:', err);
    }

    showToast(`Tour "${updatedTour.name}" updated successfully`);
  };

  const deleteTour = async (tourId) => {
    setTours(prev => prev.filter(t => t.id !== tourId));

    try {
      await fetch(`/api/tours/${tourId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete tour from MongoDB:', err);
    }

    showToast("Tour deleted from catalogue", "info");
  };

  const duplicateTour = async (tourId) => {
    const target = tours.find(t => t.id === tourId);
    if (!target) return;
    const duplicated = {
      ...target,
      id: `tour-${Date.now()}`,
      name: `${target.name} (Copy)`,
      slug: `${target.slug}-copy`
    };
    delete duplicated._id;
    setTours(prev => [duplicated, ...prev]);

    try {
      await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicated)
      });
    } catch (err) {
      console.error('Failed to duplicate tour in MongoDB:', err);
    }

    showToast(`Tour duplicated as "${duplicated.name}"`);
  };

  const togglePublishTour = async (tourId) => {
    let targetTour = null;
    setTours(prev => prev.map(t => {
      if (t.id === tourId) {
        const published = !t.published;
        targetTour = { ...t, published };
        showToast(`Tour ${published ? 'Published to website' : 'Unpublished (Draft)'}`);
        return targetTour;
      }
      return t;
    }));

    if (targetTour) {
      try {
        await fetch(`/api/tours/${tourId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ published: targetTour.published })
        });
      } catch (err) {
        console.error('Failed to update publish state in MongoDB:', err);
      }
    }
  };

  // Destinations Management -> MongoDB
  const addDestination = async (destData) => {
    const newDest = {
      ...destData,
      id: `dest-${Date.now()}`,
      toursCount: destData.toursCount || 0,
      featured: destData.featured !== undefined ? destData.featured : true
    };
    setDestinations(prev => [newDest, ...prev]);

    try {
      await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDest)
      });
    } catch (err) {
      console.error('Failed to add destination to MongoDB:', err);
    }

    showToast(`Destination "${newDest.name}" added to MongoDB`);
  };

  const deleteDestination = async (destId) => {
    setDestinations(prev => prev.filter(d => d.id !== destId));

    try {
      await fetch(`/api/destinations/${destId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete destination from MongoDB:', err);
    }

    showToast("Destination removed", "info");
  };

  // Feedback & Reviews Management -> MongoDB
  const submitFeedback = async (feedbackData) => {
    const newFb = {
      id: `fb-${Date.now()}`,
      customerName: feedbackData.customerName,
      city: feedbackData.city || "Salem",
      rating: Number(feedbackData.rating) || 5,
      tourTaken: feedbackData.tourTaken || "Customized Tour",
      travelDate: feedbackData.travelDate || "Recently",
      comment: feedbackData.comment,
      status: "Approved",
      featured: true,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
    };
    setFeedback(prev => [newFb, ...prev]);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFb)
      });
    } catch (err) {
      console.error('Failed to submit review to MongoDB:', err);
    }

    triggerConfetti();
    showToast("Thank you for your valuable review! It has been posted to our website.");
  };

  const approveFeedback = async (fbId) => {
    setFeedback(prev => prev.map(f => f.id === fbId ? { ...f, status: 'Approved' } : f));
    try {
      await fetch(`/api/feedback/${fbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Approved' })
      });
    } catch (err) {
      console.error('Failed to approve review in MongoDB:', err);
    }
    showToast("Review approved and published to website");
  };

  const rejectFeedback = async (fbId) => {
    setFeedback(prev => prev.map(f => f.id === fbId ? { ...f, status: 'Rejected' } : f));
    try {
      await fetch(`/api/feedback/${fbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected' })
      });
    } catch (err) {
      console.error('Failed to reject review in MongoDB:', err);
    }
    showToast("Review status set to rejected");
  };

  const toggleFeatureFeedback = async (fbId) => {
    let target = null;
    setFeedback(prev => prev.map(f => {
      if (f.id === fbId) {
        target = { ...f, featured: !f.featured };
        return target;
      }
      return f;
    }));

    if (target) {
      try {
        await fetch(`/api/feedback/${fbId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ featured: target.featured })
        });
      } catch (err) {
        console.error('Failed to toggle featured review in MongoDB:', err);
      }
    }
  };

  // WhatsApp Pre-filled link generator
  const getWhatsAppLink = (destination = "Customized Tour", tourTitle = "") => {
    const phone = "919994644744";
    const message = encodeURIComponent(
      `Hello SK Tours & Travels (Salem),\nI am interested in planning a trip to ${destination}${tourTitle ? ` (${tourTitle})` : ''}.\nPlease share the available packages, departure dates and best quotes.`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  const openEnquiryWithDestination = (destName = "") => {
    setEnquiryInitialDestination(destName);
    setIsEnquiryModalOpen(true);
  };

  const unreadNotifications = (notifications || []).filter(n => !n.read).length;

  const markAllNotificationsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await fetch('/api/notifications/read-all', { method: 'PUT' });
    } catch (err) {
      console.error('Failed to mark notifications read in MongoDB:', err);
    }
  };

  // Lead Deletion
  const deleteLead = async (leadId) => {
    setLeads(prev => prev.filter(l => l.id !== leadId));
    try {
      await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete lead from MongoDB:', err);
    }
    showToast(`Lead #${leadId} deleted`, 'info');
  };

  // Manual Customer Creation & Deletion
  const addCustomer = async (custData) => {
    const newCustomer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      name: custData.name,
      phone: custData.phone,
      email: custData.email || `${custData.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      city: custData.city || "Salem",
      tripsCompleted: Number(custData.tripsCompleted) || 1,
      totalSpent: Number(custData.totalSpent) || 25000,
      lastTrip: custData.lastTrip || "Custom Tour",
      joinedDate: new Date().toISOString().split('T')[0],
      bookings: custData.bookings || []
    };
    setCustomers(prev => [newCustomer, ...prev]);
    try {
      await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer)
      });
    } catch (err) {
      console.error('Failed to save customer to MongoDB:', err);
    }
    showToast(`Customer ${newCustomer.name} added to directory`);
  };

  const deleteCustomer = async (custId) => {
    setCustomers(prev => prev.filter(c => c.id !== custId));
    try {
      await fetch(`/api/customers/${custId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete customer from MongoDB:', err);
    }
    showToast("Customer removed from directory", "info");
  };

  // Delete Feedback
  const deleteFeedback = async (fbId) => {
    setFeedback(prev => prev.filter(f => f.id !== fbId));
    try {
      await fetch(`/api/feedback/${fbId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete feedback from MongoDB:', err);
    }
    showToast("Review deleted", "info");
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        currentView,
        setCurrentView,
        isAdminAuthenticated,
        adminUser,
        adminLogin,
        adminLogout,
        adminTab,
        setAdminTab,
        activeNav,
        setActiveNav,
        selectedTour,
        setSelectedTour,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        isTravelAdviserOpen,
        setIsTravelAdviserOpen,
        isCustomTripOpen,
        setIsCustomTripOpen,
        isReviewModalOpen,
        setIsReviewModalOpen,
        enquiryInitialDestination,
        openEnquiryWithDestination,
        filters,
        setFilters,
        tours,
        destinations,
        leads,
        customers,
        feedback,
        staff,
        currentStaff,
        setCurrentStaff,
        notifications,
        unreadNotifications,
        markAllNotificationsRead,
        toastMessage,
        showToast,
        createLead,
        updateLeadStatus,
        addLeadNote,
        scheduleLeadFollowUp,
        convertLeadToCustomer,
        deleteLead,
        addCustomer,
        deleteCustomer,
        addTour,
        updateTour,
        deleteTour,
        duplicateTour,
        togglePublishTour,
        addDestination,
        deleteDestination,
        submitFeedback,
        approveFeedback,
        rejectFeedback,
        deleteFeedback,
        toggleFeatureFeedback,
        getWhatsAppLink,
        dbStatus,
        fetchAllData,
        loading,
        showIntroLoader,
        setShowIntroLoader,
        replayIntroLoader
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
