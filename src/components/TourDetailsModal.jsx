import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X, Star, MapPin, Clock, CheckCircle2, XCircle,
  Hotel, Plane, Utensils, MessageSquareText, Phone,
  ChevronDown, ChevronUp, Share2, Sparkles, Compass,
  Car, Users, IndianRupee, ShieldCheck
} from 'lucide-react';

export default function TourDetailsModal() {
  const { selectedTour, setSelectedTour, openEnquiryWithDestination, getWhatsAppLink } = useApp();
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary', 'inclusions', 'hotels', 'faqs'
  const [expandedDay, setExpandedDay] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  if (!selectedTour) return null;

  const tour = selectedTour;
  const currentImage = activeImage || tour.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${tour.name} - SK Tours Salem`,
        text: `Check out this tour package by SK Tours & Travels Salem: ${tour.name}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tour link copied to clipboard!');
    }
  };

  const durationText = tour.duration || (tour.durationDays ? `${tour.durationDays} Days / ${tour.durationNights || (tour.durationDays - 1)} Nights` : '3 Days / 2 Nights');
  const descriptionText = tour.description || tour.overview || 'Experience an exceptional travel program handcrafted by SK Tours & Travels Salem. Complete with luxury transport, certified tour managers, premium accommodations, and attentive customer service throughout your tour.';

  // Default curated itinerary if empty
  const itineraryData = (tour.itinerary && tour.itinerary.length > 0) ? tour.itinerary : [
    {
      day: 1,
      title: `Salem Departure & Scenic Arrival at ${tour.destination || 'Destination'}`,
      desc: `Morning departure from Salem (Periyar University / New Bus Stand). Comfortable pushback coach journey with refreshment breaks. Check-in at hotel, evening relaxation, and local landmark exploration.`,
      hotel: tour.hotelStars || '3-Star / 4-Star Premium Hotel',
      meals: 'Breakfast & Dinner Included',
      activities: ['Scenic Drive', 'Hotel Check-in', 'Evening Walking Tour']
    },
    {
      day: 2,
      title: `Guided Sightseeing & Natural Attractions`,
      desc: `Full day immersive tour covering prominent viewpoints, historical monuments, local culture, and nature walks with our certified Salem tour captain.`,
      hotel: tour.hotelStars || '3-Star / 4-Star Premium Hotel',
      meals: 'Buffet Breakfast & Dinner Included',
      activities: ['Guided Sightseeing', 'Photography Stops', 'Shopping Time']
    },
    {
      day: 3,
      title: `Final Morning Tour & Return to Salem`,
      desc: `Breakfast, morning visit to local specialty markets, followed by scenic return drive back to Salem with fond memories of a wonderful vacation.`,
      hotel: 'Safe Drop at Salem Boarding Point',
      meals: 'Buffet Breakfast Included',
      activities: ['Souvenir Shopping', 'Return Transit']
    }
  ];

  // Default inclusions
  const inclusionsList = (tour.inclusions && tour.inclusions.length > 0) ? tour.inclusions : [
    'Salem to Salem luxury transport in sanitized coach / AC vehicle',
    'Accommodations in carefully selected premium family-friendly hotels',
    'Daily wholesome breakfast buffet & complimentary bottled water',
    'Dedicated professional driver, toll fees, parking & inter-state permits',
    'Dedicated SK Tours tour director & local sightseeing guidance'
  ];

  // Default exclusions
  const exclusionsList = (tour.exclusions && tour.exclusions.length > 0) ? tour.exclusions : [
    'Personal expenses, laundry, tips & alcoholic beverages',
    'Camera tickets, boating fees & optional adventure activities',
    'Lunch and dinners unless specifically noted in customized quote',
    'GST & optional travel health insurance'
  ];

  return (
    <div className="modal-backdrop" onClick={() => setSelectedTour(null)}>
      <div 
        className="modal-content modal-content-lg tour-details-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Control Bar */}
        <div style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 50,
          display: 'flex',
          gap: '0.6rem'
        }}>
          <button
            className="modal-close-btn"
            onClick={handleShare}
            title="Share tour details"
            style={{ background: 'rgba(11, 19, 43, 0.85)', color: '#ffffff' }}
          >
            <Share2 size={16} />
          </button>
          <button
            className="modal-close-btn"
            onClick={() => setSelectedTour(null)}
            title="Close"
            style={{ background: 'rgba(11, 19, 43, 0.85)', color: '#ffffff' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Modal Body Container */}
        <div className="tour-modal-scrollable-body">
          {/* Hero Media Banner */}
          <div style={{ position: 'relative', height: '280px', width: '100%', flexShrink: 0, overflow: 'hidden' }}>
            <img
              src={currentImage}
              alt={tour.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(11, 19, 43, 0.96) 0%, rgba(11, 19, 43, 0.35) 60%, transparent 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                <span className="badge-premium">{tour.category || 'Luxury Tour'}</span>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <MapPin size={13} color="#d4af37" />
                  {tour.destination || 'Salem Departure'}
                </span>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={13} color="#d4af37" />
                  {durationText}
                </span>
                <span style={{
                  background: 'rgba(212, 175, 55, 0.25)',
                  color: '#f3c64f',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Star size={13} fill="#f3c64f" />
                  {tour.rating || 5.0} ({tour.reviewsCount || 24} Salem Reviews)
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                color: '#ffffff',
                lineHeight: 1.2,
                margin: 0
              }}>
                {tour.name}
              </h2>
            </div>
          </div>

          {/* Gallery Thumbnails Strip */}
          {tour.gallery && tour.gallery.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.75rem 2rem',
              background: '#0b132b',
              overflowX: 'auto',
              flexShrink: 0
            }}>
              {tour.gallery.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`${tour.name} thumbnail ${i}`}
                  onClick={() => setActiveImage(imgUrl)}
                  style={{
                    width: '70px',
                    height: '45px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: currentImage === imgUrl ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.2)',
                    opacity: currentImage === imgUrl ? 1 : 0.65,
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          )}

          {/* Sticky Navigation Tabs Header */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border)',
            background: '#ffffff',
            position: 'sticky',
            top: 0,
            zIndex: 25,
            padding: '0 2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            overflowX: 'auto'
          }}>
            {[
              { id: 'itinerary', label: 'Day-by-Day Itinerary' },
              { id: 'pricing', label: 'Brochure Rates & Vehicles' },
              { id: 'inclusions', label: 'Inclusions & Exclusions' },
              { id: 'hotels', label: 'Hotels & Transport' },
              { id: 'faqs', label: 'FAQs & Policies' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '1rem 1.25rem',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: activeTab === tab.id ? 'var(--color-gold-dark)' : 'var(--color-text-muted)',
                  borderBottom: activeTab === tab.id ? '3px solid var(--color-gold)' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scroll Down Visual Indicator Callout */}
          <div className="tour-modal-scroll-indicator">
            <ChevronDown size={16} />
            <span>Scroll down to explore full daily schedule, hotel standards & inclusions</span>
            <ChevronDown size={16} />
          </div>

          {/* Main Tab Content Area */}
          <div style={{ padding: '2rem 2rem 3rem 2rem' }}>
            {/* Tour Overview Callout */}
            <div style={{
              background: 'var(--color-bg-base)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              marginBottom: '2rem',
              borderLeft: '4px solid var(--color-gold)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={18} color="var(--color-gold-dark)" />
                <span>Tour Overview</span>
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.6, margin: 0 }}>
                {descriptionText}
              </p>
            </div>

            {/* TAB 1: ITINERARY */}
            {activeTab === 'itinerary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>
                    Detailed Travel Program ({durationText})
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', background: '#f1f5f9', padding: '0.25rem 0.65rem', borderRadius: '6px' }}>
                    Escorted by {tour.tourLeader || "Mr. Sakthivel (Salem Director)"}
                  </span>
                </div>

                {itineraryData.map((dayPlan, index) => {
                  const dayNum = dayPlan.day || (index + 1);
                  const isExpanded = expandedDay === dayNum;
                  return (
                    <div
                      key={dayNum}
                      style={{
                        border: '1.5px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        background: isExpanded ? '#ffffff' : '#f8fafc',
                        transition: 'all 0.2s',
                        boxShadow: isExpanded ? '0 4px 15px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      <div
                        onClick={() => setExpandedDay(isExpanded ? null : dayNum)}
                        style={{
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          background: isExpanded ? 'rgba(212, 175, 55, 0.08)' : 'transparent'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{
                            background: 'var(--color-primary)',
                            color: 'var(--color-gold)',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '8px'
                          }}>
                            DAY {dayNum}
                          </span>
                          <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.02rem' }}>
                            {dayPlan.title}
                          </span>
                        </div>
                        {isExpanded ? <ChevronUp size={20} color="var(--color-gold-dark)" /> : <ChevronDown size={20} />}
                      </div>

                      {isExpanded && (
                        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
                          <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', marginBottom: '1rem', lineHeight: 1.6 }}>
                            {dayPlan.desc}
                          </p>

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '0.75rem',
                            padding: '0.85rem 1rem',
                            background: 'var(--color-bg-base)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.85rem'
                          }}>
                            <div>
                              <strong style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Hotel size={14} color="#d4af37" /> Hotel:
                              </strong>
                              <span>{dayPlan.hotel || 'Verified Partner Hotel'}</span>
                            </div>
                            <div>
                              <strong style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Utensils size={14} color="#d4af37" /> Meals:
                              </strong>
                              <span>{dayPlan.meals || 'Breakfast Buffet Included'}</span>
                            </div>
                          </div>

                          {dayPlan.activities && (
                            <div style={{ marginTop: '0.85rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              {dayPlan.activities.map((act, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    background: '#e0f2fe',
                                    color: '#0369a1',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    padding: '0.2rem 0.65rem',
                                    borderRadius: '9999px'
                                  }}
                                >
                                  {act}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB: PRICING & VEHICLE MATRIX */}
            {activeTab === 'pricing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(11, 19, 43, 0.04) 100%)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IndianRupee size={18} color="var(--color-gold-dark)" />
                      Brochure Tariff & Vehicle Recommendations
                    </h4>
                    <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.86rem', color: 'var(--color-text-muted)' }}>
                      Official per-person rates from SK Tours brochure based on double occupancy, assigned private vehicle & hotel tier.
                    </p>
                  </div>
                  <span className="badge-premium">
                    Official Brochure Matrix
                  </span>
                </div>

                {tour.pricingTable && tour.pricingTable.length > 0 ? (
                  <div style={{
                    overflowX: 'auto',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left', minWidth: '600px' }}>
                      <thead>
                        <tr style={{ background: 'var(--color-primary)', color: '#ffffff' }}>
                          <th style={{ padding: '0.85rem 1rem', fontWeight: 700, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Users size={14} color="#d4af37" /> Pax Size
                            </div>
                          </th>
                          <th style={{ padding: '0.85rem 1rem', fontWeight: 700, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Car size={14} color="#d4af37" /> Vehicle & Rooms
                            </div>
                          </th>
                          {(() => {
                            const sample = tour.pricingTable[0] || {};
                            const cols = [];
                            if ('standard' in sample) cols.push({ key: 'standard', label: 'Standard Tier' });
                            if ('offSeason' in sample) cols.push({ key: 'offSeason', label: 'Off-Season (MAP)' });
                            if ('inSeason' in sample) cols.push({ key: 'inSeason', label: 'In-Season (MAP)' });
                            if ('deluxe' in sample) cols.push({ key: 'deluxe', label: 'Deluxe Tier' });
                            if ('superDeluxe' in sample) cols.push({ key: 'superDeluxe', label: 'Super Deluxe' });
                            if ('luxury' in sample) cols.push({ key: 'luxury', label: 'Luxury 5-Star' });
                            return cols.map(c => (
                              <th key={c.key} style={{ padding: '0.85rem 1rem', fontWeight: 700, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                                {c.label}
                              </th>
                            ));
                          })()}
                        </tr>
                      </thead>
                      <tbody>
                        {tour.pricingTable.map((row, idx) => {
                          const sample = tour.pricingTable[0] || {};
                          const cols = [];
                          if ('standard' in sample) cols.push('standard');
                          if ('offSeason' in sample) cols.push('offSeason');
                          if ('inSeason' in sample) cols.push('inSeason');
                          if ('deluxe' in sample) cols.push('deluxe');
                          if ('superDeluxe' in sample) cols.push('superDeluxe');
                          if ('luxury' in sample) cols.push('luxury');

                          return (
                            <tr
                              key={idx}
                              style={{
                                background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                                borderBottom: '1px solid var(--color-border)',
                                transition: 'background 0.2s'
                              }}
                            >
                              <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                {row.pax}
                              </td>
                              <td style={{ padding: '0.85rem 1rem', color: 'var(--color-text-main)' }}>
                                <span style={{
                                  background: '#eff6ff',
                                  color: '#1d4ed8',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '6px',
                                  fontWeight: 600,
                                  fontSize: '0.82rem',
                                  display: 'inline-block'
                                }}>
                                  {row.vehicle}
                                </span>
                              </td>
                              {cols.map(c => (
                                <td key={c} style={{ padding: '0.85rem 1rem', textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>
                                  <span style={{ color: c.includes('luxury') || c.includes('superDeluxe') ? 'var(--color-gold-dark)' : 'inherit' }}>
                                    {row[c] || 'On Request'}
                                  </span>
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    background: '#f8fafc',
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed var(--color-border)'
                  }}>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                      Brochure matrix currently being compiled for this package. Contact our Salem reservation office at <strong>+91 99946 44744</strong> for an instant custom quote!
                    </p>
                  </div>
                )}

                {/* Important Notes on Pricing */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  fontSize: '0.84rem',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--color-primary)' }}>
                    <ShieldCheck size={16} color="var(--color-gold-dark)" />
                    <span>Brochure Price Terms & Inclusions</span>
                  </div>
                  <div>• Rates are per person on double-sharing occupancy basis for the entire itinerary.</div>
                  <div>• Vehicle provided exclusively for your family/group (Sedan / XUV / Tempo as indicated) including driver allowance, fuel & toll.</div>
                  <div>• Peak holiday surcharges, airfare/train fare, and optional activities are extra as detailed in exclusions.</div>
                </div>
              </div>
            )}

            {/* TAB 2: INCLUSIONS & EXCLUSIONS */}
            {activeTab === 'inclusions' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {/* Inclusions */}
                <div style={{
                  background: '#f0fdf4',
                  border: '1.5px solid #bbf7d0',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: '#15803d', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    <CheckCircle2 size={18} /> Inclusions (What's Covered)
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
                    {inclusionsList.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: '#166534', lineHeight: 1.5 }}>
                        <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div style={{
                  background: '#fef2f2',
                  border: '1.5px solid #fecaca',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    <XCircle size={18} /> Exclusions (What's Not Included)
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
                    {exclusionsList.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: '#991b1b', lineHeight: 1.5 }}>
                        <XCircle size={16} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: HOTELS & TRANSPORT */}
            {activeTab === 'hotels' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    <Hotel size={18} color="#d4af37" /> Hotel Accommodations & Standard
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
                    Category: <strong>{tour.hotelStars || '3-Star / 4-Star Verified Properties'}</strong>
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    All hotels are personally inspected by SK Tours team for hygiene standards, family-friendly facilities, central heating/AC, 24/7 hot water, and fresh breakfast buffets.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem'
                }}>
                  <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    <Plane size={18} color="#d4af37" /> Transportation & Fleet Arrangements
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
                    Vehicle: <strong>{tour.transport || 'Luxury Pushback AC Coach / Innova Crysta'}</strong>
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    Includes sanitized pushback coach or private vehicle with verified commercial chauffeurs. Boarding and drops at Salem (Periyar University / New Bus Stand / AVR Roundana).
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: FAQS */}
            {activeTab === 'faqs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  background: 'var(--color-bg-base)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  border: '1px solid var(--color-border)'
                }}>
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '0.98rem', marginBottom: '0.4rem' }}>
                    Q: How do I confirm my seat from Salem?
                  </h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                    You can book with an advance token of 25%. Balance can be paid 7 days prior to departure. Bank transfer, UPI, and office cash payments accepted at Periyar University campus office.
                  </p>
                </div>

                <div style={{
                  background: 'var(--color-bg-base)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  border: '1px solid var(--color-border)'
                }}>
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '0.98rem', marginBottom: '0.4rem' }}>
                    Q: Can I request customized boarding points in Salem?
                  </h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                    Yes! For private tours and group bookings of 6+, we provide doorstep pickup across Salem (Suramangalam, Hasthampatti, Ammapet, Steel Plant, etc.).
                  </p>
                </div>

                <div style={{
                  background: '#f8fafc',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  border: '1px dashed var(--color-border)',
                  marginTop: '0.5rem'
                }}>
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                    Booking & Cancellation Policy
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                    Full refund on cancellations made 30 days prior to departure. Easy date rescheduling options available for Salem travellers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Locked Fixed Action Footer Bar */}
        <div className="tour-modal-footer-bar">
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>
              All-Inclusive Starting Price
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {formatINR(tour.price)}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>per person</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* WhatsApp Pre-filled */}
            <a
              href={getWhatsAppLink(tour.destination, tour.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              style={{ background: '#25d366', color: '#ffffff', fontWeight: 700 }}
              title="Chat with Salem Agent on WhatsApp"
            >
              <MessageSquareText size={16} />
              <span>WhatsApp</span>
            </a>

            {/* Direct Call */}
            <a
              href="tel:+919994644744"
              className="btn btn-outline-dark btn-sm"
            >
              <Phone size={15} />
              <span>Call Now</span>
            </a>

            {/* Primary Enquire Button */}
            <button
              className="btn btn-gold btn-sm"
              onClick={() => {
                const dest = tour.destination;
                setSelectedTour(null);
                openEnquiryWithDestination(dest);
              }}
            >
              <Sparkles size={16} />
              <span>Enquire Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
