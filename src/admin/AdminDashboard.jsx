import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users, UserPlus, CalendarClock, CheckCircle, Clock, XCircle,
  DollarSign, MapPin, TrendingUp, AlertCircle, ArrowUpRight, ShieldCheck
} from 'lucide-react';

export default function AdminDashboard({ onSelectLead }) {
  const { leads, customers, destinations, tours, setAdminTab } = useApp();

  // Compute live metrics
  const totalEnquiries = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const confirmedLeads = leads.filter(l => l.status === 'Confirmed').length;
  const pendingLeads = leads.filter(l => ['Contacted', 'Follow-up', 'Interested', 'Quotation Sent', 'Negotiation'].includes(l.status)).length;
  const cancelledLeads = leads.filter(l => ['Lost', 'Cancelled'].includes(l.status)).length;

  // Follow-ups today
  const todayStr = new Date().toISOString().split('T')[0];
  const followupsToday = leads.filter(l => l.followUpDate === todayStr || l.status === 'Follow-up');

  // Total Revenue estimate
  const confirmedRevenue = leads
    .filter(l => l.status === 'Confirmed')
    .reduce((acc, curr) => acc + (curr.quotationAmount || 65000), 0);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const KPIS = [
    { label: 'Total Enquiries', val: totalEnquiries, icon: Users, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'New Leads', val: newLeads, icon: UserPlus, color: '#10b981', bg: '#f0fdf4', highlight: true },
    { label: "Follow-ups Today", val: followupsToday.length, icon: CalendarClock, color: '#f59e0b', bg: '#fffbeb', urgent: followupsToday.length > 0 },
    { label: 'Confirmed Bookings', val: confirmedLeads, icon: CheckCircle, color: '#059669', bg: '#ecfdf5' },
    { label: 'Pending Enquiries', val: pendingLeads, icon: Clock, color: '#6366f1', bg: '#eef2ff' },
    { label: 'Cancelled / Lost', val: cancelledLeads, icon: XCircle, color: '#ef4444', bg: '#fef2f2' },
    { label: 'Registered Customers', val: customers.length, icon: ShieldCheck, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Confirmed Pipeline Revenue', val: formatINR(confirmedRevenue), icon: DollarSign, color: '#d97706', bg: '#fef3c7' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* KPI Grid */}
      <div className="kpi-grid">
        {KPIS.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="kpi-card"
              style={{
                borderTop: kpi.urgent ? '3px solid #f59e0b' : '1px solid var(--color-border)',
                background: '#ffffff'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {kpi.label}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>
                  {kpi.val}
                </div>
              </div>
              <div className="kpi-icon" style={{ background: kpi.bg, color: kpi.color }}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Priority Action Row: Today's Follow-ups & Pipeline Status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        {/* Today's Urgent Follow-ups */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarClock size={20} color="#f59e0b" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)' }}>
                Today's Urgent Follow-ups
              </h3>
            </div>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setAdminTab('leads')}
            >
              View All Leads <ArrowUpRight size={14} />
            </button>
          </div>

          {followupsToday.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {followupsToday.slice(0, 4).map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #fed7aa',
                    background: '#fffaf0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>
                        {lead.customerName}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: '#c2410c', fontWeight: 700 }}>
                        {lead.destination} Tour
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      Phone: {lead.phone} • Time: {lead.followUpTime || 'Today'}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className="status-badge status-follow-up">
                      Follow-up
                    </span>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                      Assigned: {lead.assignedStaff}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              <CheckCircle size={32} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
              No pending follow-ups due right now. You're all caught up!
            </div>
          )}
        </div>

        {/* Lead Status Pipeline Chart (Visual Progress Bars) */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="#d4af37" />
            Active Sales Pipeline Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { status: 'New', count: newLeads, color: '#3b82f6' },
              { status: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: '#f59e0b' },
              { status: 'Follow-up', count: leads.filter(l => l.status === 'Follow-up').length, color: '#ea580c' },
              { status: 'Quotation Sent', count: leads.filter(l => l.status === 'Quotation Sent').length, color: '#8b5cf6' },
              { status: 'Confirmed', count: confirmedLeads, color: '#10b981' },
              { status: 'Lost / Cancelled', count: cancelledLeads, color: '#ef4444' }
            ].map((item, i) => {
              const pct = totalEnquiries > 0 ? Math.round((item.count / totalEnquiries) * 100) : 0;
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{item.status}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{item.count} leads ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: item.color, borderRadius: '4px' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Destinations & Recent Enquiries Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Popular Destinations Ranking */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="#d4af37" />
            Top In-Demand Destinations (Salem Enquiries)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {destinations.slice(0, 5).map((dest, i) => (
              <div
                key={dest.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: i < 4 ? '1px solid var(--color-border-subtle)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: i === 0 ? 'var(--color-gold)' : 'var(--color-bg-base)',
                    color: i === 0 ? '#0b132b' : 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}>
                    {i + 1}
                  </span>
                  <div>
                    <strong style={{ color: 'var(--color-primary)', fontSize: '0.92rem' }}>{dest.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{dest.country} • {dest.region}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>
                    From {formatINR(dest.startingPrice)}
                  </span>
                  <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600 }}>High Demand</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent 5 Incoming Enquiries */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)' }}>
              Recent Website Enquiries
            </h3>
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setAdminTab('leads')}
            >
              CRM Pipeline
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {leads.slice(0, 5).map((l) => (
              <div
                key={l.id}
                onClick={() => onSelectLead(l)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: 'var(--color-bg-base)'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>{l.customerName}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {l.destination} • {l.adults} Adults • Date: {l.travelDate}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`status-badge status-${l.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {l.status}
                  </span>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '3px' }}>
                    {l.createdDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
