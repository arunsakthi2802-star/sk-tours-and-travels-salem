import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Phone, Mail, MapPin, Calendar, DollarSign, Award, Plus, X, Trash2, Search, Eye } from 'lucide-react';

export default function AdminCustomers() {
  const { customers, addCustomer, deleteCustomer } = useApp();
  const [selectedCust, setSelectedCust] = useState(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCust, setNewCust] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Salem',
    tripsCompleted: 1,
    totalSpent: 35000,
    lastTrip: 'Ooty Heritage Tour'
  });

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const filteredCustomers = customers.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search) ||
    (c.city || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.id || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!newCust.name || !newCust.phone) return;
    addCustomer({
      ...newCust,
      bookings: [
        {
          id: `BK-${Date.now().toString().slice(-4)}`,
          tourName: newCust.lastTrip,
          travelDate: 'Upcoming',
          amount: Number(newCust.totalSpent),
          status: 'Confirmed'
        }
      ]
    });
    setShowAddModal(false);
    setNewCust({
      name: '',
      phone: '',
      email: '',
      city: 'Salem',
      tripsCompleted: 1,
      totalSpent: 35000,
      lastTrip: 'Ooty Heritage Tour'
    });
  };

  return (
    <div>
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>
            Customer Directory & Travel History
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Registered Salem travellers, booking records and lifetime holiday value ({customers.length} travellers)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            className="btn btn-gold btn-sm"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={15} /> Add Customer
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.5rem',
        border: '1px solid var(--color-border)',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <Search size={18} color="var(--color-text-muted)" />
        <input
          type="text"
          placeholder="Search travellers by name, phone number, city, or Customer ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '0.92rem'
          }}
        />
      </div>

      <div className="crm-table-wrapper" style={{ overflowX: 'auto' }}>
        <table className="crm-table" style={{ width: '100%', minWidth: '700px' }}>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Traveller Name</th>
              <th>Phone</th>
              <th>City / Locality</th>
              <th>Trips Taken</th>
              <th>Lifetime Spent</th>
              <th>Last Journey</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                  No customer records found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td><strong style={{ color: 'var(--color-primary)' }}>{c.id}</strong></td>
                  <td>
                    <strong style={{ color: 'var(--color-primary)' }}>{c.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{c.email}</div>
                  </td>
                  <td>{c.phone}</td>
                  <td>{c.city}</td>
                  <td>
                    <span style={{
                      background: '#e0f2fe',
                      color: '#0369a1',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      fontWeight: 700,
                      fontSize: '0.78rem'
                    }}>
                      {c.tripsCompleted || 1} Trips
                    </span>
                  </td>
                  <td><strong>{formatINR(c.totalSpent)}</strong></td>
                  <td><span style={{ fontSize: '0.85rem' }}>{c.lastTrip}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => setSelectedCust(c)}
                        title="View travel details"
                      >
                        <Eye size={13} /> View
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ background: '#fee2e2', color: '#dc2626' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to remove customer ${c.name}?`)) {
                            deleteCustomer(c.id);
                          }
                        }}
                        title="Delete customer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="modal-overlay active">
          <div className="modal-container" style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>Add New Customer</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateCustomer} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Traveller Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annamalai S."
                  value={newCust.name}
                  onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={newCust.phone}
                    onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>City</label>
                  <input
                    type="text"
                    value={newCust.city}
                    onChange={(e) => setNewCust({ ...newCust, city: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="traveller@gmail.com"
                  value={newCust.email}
                  onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Total Spent (₹)</label>
                  <input
                    type="number"
                    value={newCust.totalSpent}
                    onChange={(e) => setNewCust({ ...newCust, totalSpent: Number(e.target.value) })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Last / Upcoming Tour</label>
                  <input
                    type="text"
                    value={newCust.lastTrip}
                    onChange={(e) => setNewCust({ ...newCust, lastTrip: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold btn-sm">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCust && (
        <div className="modal-overlay active">
          <div className="modal-container" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>{selectedCust.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Customer ID: {selectedCust.id}</span>
              </div>
              <button className="modal-close" onClick={() => setSelectedCust(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.75rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                background: 'var(--color-bg-base)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Total Trips</span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary)' }}>{selectedCust.tripsCompleted || 1}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Lifetime Spent</span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#15803d' }}>{formatINR(selectedCust.totalSpent)}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>City</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{selectedCust.city}</div>
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                Complete Travel & Booking History
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedCust.bookings && selectedCust.bookings.length > 0 ? (
                  selectedCust.bookings.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong style={{ color: 'var(--color-primary)', fontSize: '0.95rem' }}>{b.tourName}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          Date: {b.travelDate} • Booking Ref: {b.id}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 800, color: 'var(--color-primary)' }}>{formatINR(b.amount)}</div>
                        <span style={{
                          fontSize: '0.72rem',
                          color: b.status === 'Completed' || b.status === 'Confirmed' ? '#15803d' : '#b45309',
                          fontWeight: 700
                        }}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    No previous booking records attached.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
