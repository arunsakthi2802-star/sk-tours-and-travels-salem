import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X, Phone, Mail, Calendar, UserCheck, CheckCircle2, Clock,
  Send, DollarSign, UserPlus, MessageSquare, AlertTriangle, ShieldCheck
} from 'lucide-react';

const STATUS_PIPELINE = [
  "New", "Contacted", "Follow-up", "Interested", 
  "Quotation Sent", "Negotiation", "Confirmed", "Lost", "Cancelled"
];

export default function AdminLeadDetailModal({ lead, onClose }) {
  const {
    updateLeadStatus,
    addLeadNote,
    scheduleLeadFollowUp,
    convertLeadToCustomer,
    currentStaff,
    getWhatsAppLink
  } = useApp();

  const [newNote, setNewNote] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(lead.status);
  const [followDate, setFollowDate] = useState(lead.followUpDate || '');
  const [followTime, setFollowTime] = useState(lead.followUpTime || '11:00 AM');
  const [followNote, setFollowNote] = useState('');

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    updateLeadStatus(lead.id, status, `Manually updated via CRM Inspector.`);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addLeadNote(lead.id, newNote);
    setNewNote('');
  };

  const handleScheduleFollowUp = (e) => {
    e.preventDefault();
    if (!followDate) {
      alert('Please choose a follow-up date.');
      return;
    }
    scheduleLeadFollowUp(lead.id, followDate, followTime, followNote);
    setFollowNote('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content modal-content-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{
              background: 'var(--color-primary)',
              color: 'var(--color-gold)',
              fontWeight: 800,
              fontSize: '0.85rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              {lead.id}
            </span>
            <div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {lead.customerName}
                <span className={`status-badge status-${lead.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {lead.status}
                </span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Source: {lead.source} • Registered on: {lead.createdDate} • Assigned to: <strong>{lead.assignedStaff}</strong>
              </p>
            </div>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem', maxHeight: '68vh', overflowY: 'auto' }}>
          {/* Quick Contact & Conversion Toolbar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-bg-base)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <a
                href={`tel:${lead.phone}`}
                className="btn btn-outline-dark btn-sm"
                style={{ background: '#ffffff' }}
              >
                <Phone size={14} /> Call: {lead.phone}
              </a>

              <a
                href={getWhatsAppLink(lead.destination, `Lead #${lead.id}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{ background: '#25d366', color: '#ffffff' }}
              >
                <MessageSquare size={14} /> WhatsApp Lead
              </a>

              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  className="btn btn-outline-dark btn-sm"
                  style={{ background: '#ffffff' }}
                >
                  <Mail size={14} /> {lead.email}
                </a>
              )}
            </div>

            {lead.status !== 'Confirmed' && (
              <button
                className="btn btn-gold btn-sm"
                onClick={() => convertLeadToCustomer(lead.id)}
              >
                <UserPlus size={15} />
                <span>Convert to Confirmed Customer</span>
              </button>
            )}
          </div>

          {/* Lead Information Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            marginBottom: '1.75rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Destination</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary)' }}>{lead.destination}</div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Travel Date</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary)' }}>{lead.travelDate || 'Flexible'}</div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Travellers</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                {lead.adults} Adults {lead.children > 0 ? `, ${lead.children} Kids` : ''}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Budget</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>{lead.budget}</div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Tour Type</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'capitalize' }}>
                {lead.tourType} Tour
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Priority Level</span>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  background: lead.priority === 'High' ? '#fee2e2' : '#fef3c7',
                  color: lead.priority === 'High' ? '#b91c1c' : '#b45309'
                }}>
                  {lead.priority} Priority
                </span>
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
              Special Customer Requirements & Notes
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
              {lead.specialRequirements || 'No special requirements noted.'}
            </p>
          </div>

          {/* Status Pipeline Transition Buttons */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
              Update Pipeline Status
            </h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {STATUS_PIPELINE.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStatusChange(st)}
                  className={`btn btn-sm ${lead.status === st ? 'btn-gold' : 'btn-outline-dark'}`}
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Next Follow-up Section */}
          <div style={{
            background: '#fffaf0',
            border: '1.5px solid #fed7aa',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h4 style={{ fontSize: '1rem', color: '#c2410c', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}>
              <Clock size={16} /> Schedule Next Follow-up / Callback
            </h4>
            <form onSubmit={handleScheduleFollowUp}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Follow-up Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={followDate}
                    onChange={(e) => setFollowDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Follow-up Time</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 11:30 AM"
                    value={followTime}
                    onChange={(e) => setFollowTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Reminder Note</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Call customer to discuss revised hotel quote with flight fare"
                  value={followNote}
                  onChange={(e) => setFollowNote(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-navy btn-sm">
                Schedule Reminder
              </button>
            </form>
          </div>

          {/* Activity Timeline & Notes */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
              CRM Activity History & Logs
            </h4>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Log a call, quotation update, or customer feedback..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                style={{ flexGrow: 1 }}
              />
              <button type="submit" className="btn btn-gold btn-sm">
                <Send size={14} /> Add Note
              </button>
            </form>

            {/* Timeline Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {lead.notes && lead.notes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    padding: '0.85rem 1.25rem',
                    background: 'var(--color-bg-base)',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '4px solid var(--color-gold)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
                    <strong>{note.author}</strong>
                    <span>{note.date}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                    {note.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
