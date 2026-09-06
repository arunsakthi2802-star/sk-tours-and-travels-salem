import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass, LayoutDashboard, Users, MapPin, Package, MessageSquareText,
  CalendarCheck, BarChart3, Shield, Globe, Bell, Check, LogOut, ChevronDown, Menu, X
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const {
    adminTab,
    setAdminTab,
    setCurrentView,
    navigate,
    currentStaff,
    setCurrentStaff,
    staff,
    notifications,
    unreadNotifications,
    markAllNotificationsRead,
    dbStatus,
    adminLogout,
    adminUser
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [mobileAdminMenuOpen, setMobileAdminMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'CRM Leads & Pipeline', icon: Users, badge: null },
    { id: 'tours', label: 'Tour Packages CMS', icon: Package },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'customers', label: 'Customer Directory', icon: Users },
    { id: 'feedback', label: 'Review Moderation', icon: MessageSquareText },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'staff', label: 'Staff & RBAC', icon: Shield }
  ];

  return (
    <div className="admin-wrapper">
      {/* Mobile Sidebar Overlay */}
      {mobileAdminMenuOpen && (
        <div 
          className="admin-mobile-overlay" 
          onClick={() => setMobileAdminMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileAdminMenuOpen ? 'mobile-open' : ''}`}>
        <div className="admin-sidebar-header">
          <img 
            src="/sk-logo.png" 
            alt="SK Tours Logo" 
            style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
          />
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.04em', color: '#ffffff' }}>
              SK <span style={{ color: 'var(--color-gold)' }}>CRM</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Salem Tour Operations
            </div>
          </div>
          {/* Close button on mobile */}
          <button 
            className="admin-sidebar-close-btn"
            onClick={() => setMobileAdminMenuOpen(false)}
            aria-label="Close admin menu"
          >
            <X size={20} color="#ffffff" />
          </button>
        </div>

        {/* Staff Profile Bar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <img
            src={currentStaff.avatar}
            alt={currentStaff.name}
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }}
          />
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentStaff.name}
            </div>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              background: 'rgba(212, 175, 55, 0.2)',
              color: 'var(--color-gold)',
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px',
              border: '1px solid rgba(212, 175, 55, 0.3)'
            }}>
              {currentStaff.role}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <ul className="admin-nav-list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = adminTab === item.id;
            return (
              <li
                key={item.id}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setAdminTab(item.id);
                  setMobileAdminMenuOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>

        {/* Sidebar Footer: Return to Website & Logout */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <button
            className="btn btn-outline-gold btn-sm"
            style={{ width: '100%' }}
            onClick={() => navigate('/')}
          >
            <Globe size={15} />
            <span>View Public Website</span>
          </button>

          <button
            className="btn btn-sm"
            style={{ width: '100%', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            onClick={adminLogout}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Mobile Hamburger */}
            <button
              className="admin-mobile-toggle-btn"
              onClick={() => setMobileAdminMenuOpen(!mobileAdminMenuOpen)}
              aria-label="Toggle admin sidebar"
            >
              <Menu size={20} />
            </button>

            <h1 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', fontWeight: 800 }}>
              {NAV_ITEMS.find(n => n.id === adminTab)?.label || 'Operations Center'}
            </h1>
            <span className="admin-topbar-tag-hq" style={{
              fontSize: '0.75rem',
              background: '#e0f2fe',
              color: '#0284c7',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontWeight: 700
            }}>
              Salem HQ
            </span>
            <span style={{
              fontSize: '0.75rem',
              background: dbStatus === 'connected' ? '#dcfce7' : '#fee2e2',
              color: dbStatus === 'connected' ? '#15803d' : '#b91c1c',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: dbStatus === 'connected' ? '#22c55e' : '#ef4444',
                display: 'inline-block'
              }} />
              MongoDB Atlas: {dbStatus === 'connected' ? 'Connected (sk_tours)' : 'Connecting...'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', position: 'relative' }}>
            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  background: 'var(--color-bg-base)',
                  border: '1px solid var(--color-border)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--color-primary)',
                  position: 'relative'
                }}
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadNotifications > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Panel */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  right: 0,
                  width: '320px',
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  border: '1px solid var(--color-border)',
                  zIndex: 100,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '0.85rem 1rem',
                    borderBottom: '1px solid var(--color-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                      Activity Notifications
                    </strong>
                    <button
                      onClick={markAllNotificationsRead}
                      style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark all read
                    </button>
                  </div>

                  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: '0.85rem 1rem',
                          borderBottom: '1px solid #f1f5f9',
                          background: n.read ? '#ffffff' : '#f0fdf4'
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {n.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          {n.desc}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
                          {n.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Switch Role Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--color-bg-base)',
                  border: '1px solid var(--color-border)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                <span>Role: {currentStaff.role}</span>
                <ChevronDown size={14} />
              </button>

              {showRoleMenu && (
                <div style={{
                  position: 'absolute',
                  top: '45px',
                  right: 0,
                  width: '240px',
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
                  border: '1px solid var(--color-border)',
                  zIndex: 100,
                  padding: '0.5rem'
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', padding: '0.4rem 0.6rem', textTransform: 'uppercase' }}>
                    Switch Active Staff Member
                  </div>
                  {staff.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setCurrentStaff(s);
                        setShowRoleMenu(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.5rem 0.6rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        background: currentStaff.id === s.id ? 'var(--color-bg-base)' : 'transparent'
                      }}
                    >
                      <img src={s.avatar} alt={s.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                      <div style={{ fontSize: '0.85rem' }}>
                        <div style={{ fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{s.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Back to Site Button */}
            <button
              className="btn btn-navy btn-sm"
              onClick={() => navigate('/')}
              title="View Public Customer Portal"
            >
              <Globe size={14} />
              <span className="admin-btn-text-desktop">Exit to Website</span>
            </button>

            {/* Topbar Logout Button */}
            <button
              className="btn btn-sm"
              style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.25)' }}
              onClick={adminLogout}
              title="Sign Out of Admin Portal"
            >
              <LogOut size={14} />
              <span className="admin-btn-text-desktop">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
