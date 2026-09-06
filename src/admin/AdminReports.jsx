import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, DollarSign, Award, Users, MapPin, Calendar } from 'lucide-react';

export default function AdminReports() {
  const { leads, destinations, staff, customers } = useApp();
  const [dateRange, setDateRange] = useState('Last 6 Months');

  const totalLeads = leads.length;
  const confirmedLeads = leads.filter(l => l.status === 'Confirmed').length;
  const conversionRate = totalLeads > 0 ? ((confirmedLeads / totalLeads) * 100).toFixed(1) : 0;

  const totalRevenue = leads
    .filter(l => l.status === 'Confirmed')
    .reduce((sum, l) => sum + (l.quotationAmount || 65000), 0);

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Lead sources breakdown
  const sources = leads.reduce((acc, l) => {
    const s = l.source || 'Website Enquiry';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>
            Sales Reports & Business Intelligence
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Salem regional conversion trends, revenue velocity, and staff lead performance
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={16} color="#d4af37" />
          <select
            className="form-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            <option value="This Month">This Month (September 2026)</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="This Year">Year to Date (2026)</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Overall Lead Conversion</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: '#15803d', marginTop: '0.2rem' }}>
              {conversionRate}%
            </div>
            <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600 }}>↑ +4.2% vs previous quarter</span>
          </div>
          <div className="kpi-icon" style={{ background: '#dcfce7', color: '#15803d' }}>
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Confirmed Booking Value</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>
              {formatINR(totalRevenue)}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>Salem Retail Branch</span>
          </div>
          <div className="kpi-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <DollarSign size={24} />
          </div>
        </div>

        <div className="kpi-card">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Avg Holiday Package Size</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '0.2rem' }}>
              ₹72,400
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Avg 2.8 travellers per booking</span>
          </div>
          <div className="kpi-icon" style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* Charts Grid: Monthly Velocity & Lead Channels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        {/* Monthly Enquiries Trend Bar Chart */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={20} color="#d4af37" />
            Monthly Enquiries & Bookings (2026)
          </h3>

          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '200px',
            paddingTop: '20px',
            borderBottom: '2px solid var(--color-border)'
          }}>
            {[
              { month: 'Apr', enquiries: 42, bookings: 12 },
              { month: 'May', enquiries: 65, bookings: 22 },
              { month: 'Jun', enquiries: 54, bookings: 18 },
              { month: 'Jul', enquiries: 48, bookings: 15 },
              { month: 'Aug', enquiries: 78, bookings: 29 },
              { month: 'Sep', enquiries: 86, bookings: 34 }
            ].map((bar, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '150px' }}>
                  {/* Enquiry Bar */}
                  <div
                    style={{
                      width: '18px',
                      height: `${(bar.enquiries / 100) * 140}px`,
                      background: 'var(--color-primary)',
                      borderRadius: '4px 4px 0 0'
                    }}
                    title={`${bar.month}: ${bar.enquiries} Enquiries`}
                  ></div>
                  {/* Booking Bar */}
                  <div
                    style={{
                      width: '18px',
                      height: `${(bar.bookings / 100) * 140}px`,
                      background: 'var(--color-gold)',
                      borderRadius: '4px 4px 0 0'
                    }}
                    title={`${bar.month}: ${bar.bookings} Confirmed Bookings`}
                  ></div>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{bar.month}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.25rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--color-primary)', borderRadius: '2px' }}></span>
              <span>Total Enquiries</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--color-gold)', borderRadius: '2px' }}></span>
              <span>Confirmed Bookings</span>
            </div>
          </div>
        </div>

        {/* Lead Source Distribution */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
            Lead Acquisition Channels
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {Object.entries(sources).map(([source, count], idx) => {
              const pct = Math.round((count / totalLeads) * 100);
              const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
              const col = colors[idx % colors.length];
              return (
                <div key={source}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{source}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{count} leads ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: col, borderRadius: '4px' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Staff Performance Matrix */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="#d4af37" />
          Salem Staff Lead Conversion Performance
        </h3>

        <div className="crm-table-wrapper">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Staff Member</th>
                <th>Role</th>
                <th>Active Leads</th>
                <th>Converted Bookings</th>
                <th>Conversion Rate</th>
                <th>Pipeline Value</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => {
                const staffLeads = leads.filter(l => l.assignedStaff === s.name);
                const confirmed = staffLeads.filter(l => l.status === 'Confirmed').length;
                const rate = staffLeads.length > 0 ? ((confirmed / staffLeads.length) * 100).toFixed(0) : 0;
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={s.avatar} alt={s.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        <strong style={{ color: 'var(--color-primary)' }}>{s.name}</strong>
                      </div>
                    </td>
                    <td>{s.role}</td>
                    <td>{staffLeads.length} leads</td>
                    <td><strong style={{ color: '#15803d' }}>{confirmed} bookings</strong></td>
                    <td>
                      <span style={{
                        background: '#ecfdf5',
                        color: '#059669',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        fontWeight: 700,
                        fontSize: '0.8rem'
                      }}>
                        {rate}%
                      </span>
                    </td>
                    <td><strong>{formatINR(staffLeads.length * 62000)}</strong></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
