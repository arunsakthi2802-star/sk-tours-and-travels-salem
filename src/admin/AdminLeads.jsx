import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search, Filter, SlidersHorizontal, LayoutGrid, List,
  Calendar, Phone, MessageSquare, ArrowUpRight, Plus, Eye, Trash2
} from 'lucide-react';

const STATUS_COLUMNS = [
  "New", "Contacted", "Follow-up", "Quotation Sent", "Confirmed", "Lost"
];

export default function AdminLeads({ onSelectLead }) {
  const { leads, updateLeadStatus, deleteLead, openEnquiryWithDestination } = useApp();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredLeads = leads.filter(lead => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = lead.customerName.toLowerCase().includes(q);
      const matchPhone = lead.phone.includes(q);
      const matchDest = lead.destination.toLowerCase().includes(q);
      const matchId = lead.id.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchDest && !matchId) return false;
    }

    if (statusFilter !== 'All' && lead.status !== statusFilter) {
      return false;
    }

    if (priorityFilter !== 'All' && lead.priority !== priorityFilter) {
      return false;
    }

    return true;
  });

  return (
    <div>
      {/* Header & Filter Bar */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>
              CRM Leads & Inquiries Pipeline
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Manage {filteredLeads.length} active leads from website, WhatsApp and phone campaigns
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* View Switcher */}
            <div style={{ display: 'flex', background: 'var(--color-bg-base)', padding: '3px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  padding: '0.4rem 0.8rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: viewMode === 'table' ? '#ffffff' : 'transparent',
                  color: viewMode === 'table' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <List size={14} /> Table
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                style={{
                  padding: '0.4rem 0.8rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: viewMode === 'kanban' ? '#ffffff' : 'transparent',
                  color: viewMode === 'kanban' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <LayoutGrid size={14} /> Kanban
              </button>
            </div>

            {/* Quick Add Lead */}
            <button
              className="btn btn-gold btn-sm"
              onClick={() => openEnquiryWithDestination('Manual CRM Lead')}
            >
              <Plus size={15} /> Add Lead
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-input-box" style={{ flexGrow: 1, minWidth: '220px', padding: '0.5rem 0.85rem' }}>
            <Search size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by customer name, phone, destination, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '0.88rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', width: 'auto' }}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Quotation Sent">Quotation Sent</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', width: 'auto' }}
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW 1: DATA TABLE */}
      {viewMode === 'table' ? (
        <div className="crm-table-wrapper">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Travel Date</th>
                <th>Pax</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assigned Staff</th>
                <th>Follow-up</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} style={{ cursor: 'pointer' }} onClick={() => onSelectLead(lead)}>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{lead.id}</span>
                  </td>
                  <td>
                    <div>
                      <strong style={{ color: 'var(--color-primary)' }}>{lead.customerName}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{lead.phone}</div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{lead.destination}</span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-gold-dark)' }}>{lead.tourType}</div>
                  </td>
                  <td>{lead.travelDate || 'Flexible'}</td>
                  <td>{lead.adults}A {lead.children ? `+ ${lead.children}C` : ''}</td>
                  <td>
                    <span className={`status-badge status-${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: lead.priority === 'High' ? '#b91c1c' : '#b45309'
                    }}>
                      {lead.priority}
                    </span>
                  </td>
                  <td>{lead.assignedStaff}</td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: lead.followUpDate ? '#c2410c' : '#94a3b8' }}>
                      {lead.followUpDate || 'None set'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLead(lead);
                        }}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                        title="Inspect Lead"
                      >
                        <Eye size={13} /> View
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ background: '#fee2e2', color: '#dc2626', padding: '0.3rem 0.5rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete lead #${lead.id} (${lead.customerName})?`)) {
                            deleteLead(lead.id);
                          }
                        }}
                        title="Delete Lead"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* VIEW 2: KANBAN BOARD */
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${STATUS_COLUMNS.length}, 1fr)`,
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '1rem'
        }}>
          {STATUS_COLUMNS.map((colStatus) => {
            const colLeads = filteredLeads.filter(l => l.status === colStatus);
            return (
              <div
                key={colStatus}
                style={{
                  background: 'var(--color-bg-base)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  minWidth: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {/* Column Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid var(--color-border)'
                }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                    {colStatus}
                  </strong>
                  <span style={{
                    background: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.5rem',
                    borderRadius: '9999px',
                    border: '1px solid var(--color-border)'
                  }}>
                    {colLeads.length}
                  </span>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '300px' }}>
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      style={{
                        background: '#ffffff',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0.85rem',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        cursor: 'pointer',
                        transition: 'transform 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-gold-dark)' }}>
                          {lead.id}
                        </span>
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: lead.priority === 'High' ? '#b91c1c' : '#64748b'
                        }}>
                          {lead.priority}
                        </span>
                      </div>

                      <strong style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'block' }}>
                        {lead.customerName}
                      </strong>

                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        {lead.destination} • {lead.budget}
                      </div>

                      <div style={{
                        marginTop: '0.6rem',
                        paddingTop: '0.4rem',
                        borderTop: '1px dashed var(--color-border-subtle)',
                        fontSize: '0.72rem',
                        color: '#94a3b8',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span>{lead.phone}</span>
                        <span>{lead.assignedStaff?.split(' ')[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
