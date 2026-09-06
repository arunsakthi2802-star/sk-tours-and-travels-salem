import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Users, Mail, Phone, Check, X } from 'lucide-react';

export default function AdminStaff() {
  const { staff, currentStaff, setCurrentStaff } = useApp();

  const PERMISSIONS = [
    { module: 'View Dashboard & KPIs', superAdmin: true, manager: true, staff: true },
    { module: 'Manage CRM Leads & Pipelines', superAdmin: true, manager: true, staff: true },
    { module: 'Schedule Follow-ups & Reminders', superAdmin: true, manager: true, staff: true },
    { module: 'Create & Edit Tour Packages', superAdmin: true, manager: true, staff: false },
    { module: 'Delete Tours & Destinations', superAdmin: true, manager: false, staff: false },
    { module: 'Approve & Moderate Feedback', superAdmin: true, manager: true, staff: false },
    { module: 'View Financial Revenue Reports', superAdmin: true, manager: true, staff: false },
    { module: 'User & Staff Administration', superAdmin: true, manager: false, staff: false }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--color-primary)' }}>
            Staff & Role-Based Access Control (RBAC)
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Manage staff members, roles, lead allocations, and operational permissions
          </p>
        </div>
      </div>

      {/* Staff Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {staff.map((member) => (
          <div
            key={member.id}
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              border: currentStaff.id === member.id ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}
          >
            {currentStaff.id === member.id && (
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'var(--color-gold)',
                color: '#0b132b',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '0.15rem 0.55rem',
                borderRadius: '9999px'
              }}>
                Current Session
              </span>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img
                src={member.avatar}
                alt={member.name}
                style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-gold)' }}
              />
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>{member.name}</h3>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: 'var(--color-bg-base)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--color-border)'
                }}>
                  {member.role}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} color="#d4af37" /> {member.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} color="#d4af37" /> {member.phone}
              </div>
            </div>

            <button
              className={`btn btn-sm ${currentStaff.id === member.id ? 'btn-gold' : 'btn-outline-dark'}`}
              style={{ width: '100%' }}
              onClick={() => setCurrentStaff(member)}
            >
              {currentStaff.id === member.id ? 'Active User' : 'Switch To This Account'}
            </button>
          </div>
        ))}
      </div>

      {/* RBAC Permissions Matrix */}
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={20} color="#d4af37" />
          Role-Based Access Control (RBAC) Matrix
        </h3>

        <div className="crm-table-wrapper">
          <table className="crm-table">
            <thead>
              <tr>
                <th>System Module / Capability</th>
                <th style={{ textAlign: 'center' }}>Super Admin</th>
                <th style={{ textAlign: 'center' }}>Manager</th>
                <th style={{ textAlign: 'center' }}>Staff / Tour Guide</th>
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((perm, idx) => (
                <tr key={idx}>
                  <td><strong>{perm.module}</strong></td>
                  <td style={{ textAlign: 'center' }}>
                    {perm.superAdmin ? <Check size={18} color="#15803d" style={{ margin: '0 auto' }} /> : <X size={18} color="#ef4444" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {perm.manager ? <Check size={18} color="#15803d" style={{ margin: '0 auto' }} /> : <X size={18} color="#ef4444" style={{ margin: '0 auto' }} />}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {perm.staff ? <Check size={18} color="#15803d" style={{ margin: '0 auto' }} /> : <X size={18} color="#ef4444" style={{ margin: '0 auto' }} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
