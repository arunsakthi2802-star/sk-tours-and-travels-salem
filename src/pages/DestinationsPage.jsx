import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, MapPin, Search, Calendar, Sparkles, 
  ArrowRight, Phone, CheckCircle2, DollarSign 
} from 'lucide-react';

const REGION_TABS = [
  "All", 
  "Himalayas & North", 
  "Kerala & South", 
  "Royal Heritage", 
  "North East"
];

export default function DestinationsPage() {
  const { destinations, navigate, openEnquiryWithDestination, setFilters } = useApp();
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const filteredDestinations = destinations.filter((dest) => {
    const allText = `${dest.name || ''} ${dest.tag || ''} ${dest.description || ''} ${dest.region || ''}`.toLowerCase();

    // Region match
    if (selectedRegion !== "All") {
      if (selectedRegion === 'Himalayas & North') {
        const isMatch = allText.includes('kashmir') || allText.includes('himachal') || allText.includes('ladakh') || allText.includes('delhi') || allText.includes('varanasi') || allText.includes('agra');
        if (!isMatch) return false;
      } else if (selectedRegion === 'Kerala & South') {
        const isMatch = allText.includes('kerala') || allText.includes('hyderabad') || allText.includes('south') || allText.includes('tamil');
        if (!isMatch) return false;
      } else if (selectedRegion === 'Royal Heritage') {
        const isMatch = allText.includes('rajasthan') || allText.includes('gujarat') || allText.includes('agra') || allText.includes('hyderabad') || allText.includes('palace') || allText.includes('fort');
        if (!isMatch) return false;
      } else if (selectedRegion === 'North East') {
        const isMatch = allText.includes('meghalaya') || allText.includes('sikkim') || allText.includes('darjeeling');
        if (!isMatch) return false;
      }
    }

    // Search query match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = (dest.name || '').toLowerCase().includes(q);
      const matchCountry = (dest.country || '').toLowerCase().includes(q);
      const matchRegion = (dest.region || '').toLowerCase().includes(q);
      if (!matchName && !matchCountry && !matchRegion) return false;
    }

    return true;
  });

  const handleExploreTours = (destName) => {
    setFilters(prev => ({ ...prev, search: destName, category: 'All' }));
    navigate('/group-tours');
  };

  return (
    <div className="page-root">
      {/* Page Hero Header */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumb">
            <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Destinations</span>
          </div>
          <div className="page-hero-content">
            <div className="section-badge">
              <Compass size={14} />
              <span>Worldwide & Domestic Escapes</span>
            </div>
            <h1 className="page-hero-title">
              Explore Our Handpicked <span>Destinations</span>
            </h1>
            <p className="page-hero-desc">
              From misty South Indian tea plantations and royal heritage forts to tropical islands and snow-capped Himalayan ridges, choose where your memories begin.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter & Grid Section */}
      <section style={{ padding: '4rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          {/* Controls Bar */}
          <div className="destinations-filter-panel">
            {/* Region Tabs */}
            <div className="category-tabs-scroll">
              {REGION_TABS.map((tab) => (
                <button
                  key={tab}
                  className={`category-tab-btn ${selectedRegion === tab ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="destinations-search-box">
              <Search size={18} color="var(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search destination, state or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div style={{ margin: '2rem 0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Displaying <strong style={{ color: 'var(--color-primary)' }}>{filteredDestinations.length}</strong> travel destinations
            </div>
            {(selectedRegion !== 'All' || searchQuery) && (
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => {
                  setSelectedRegion('All');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="destinations-detail-grid">
              {filteredDestinations.map((dest) => (
                <div key={dest.id} className="destination-detail-card">
                  <div className="destination-detail-img-box">
                    <img src={dest.image} alt={dest.name} className="destination-detail-img" loading="lazy" />
                    <span className="destination-region-badge">
                      {dest.region || dest.country || "Popular"}
                    </span>
                  </div>

                  <div className="destination-detail-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 className="destination-detail-name">{dest.name}</h3>
                        <div className="destination-detail-country">
                          <MapPin size={13} color="var(--color-gold-dark)" />
                          <span>{dest.country}</span>
                        </div>
                      </div>
                      <div className="destination-detail-price">
                        <span className="price-lbl">Starting from</span>
                        <span className="price-val">{formatINR(dest.startingPrice || 14999)}</span>
                      </div>
                    </div>

                    <p className="destination-detail-tagline">
                      "{dest.tagline || 'Experience rich culture, breathtaking scenery, and unforgettable memories.'}"
                    </p>

                    {/* Season Info */}
                    <div className="destination-detail-season">
                      <Calendar size={14} color="var(--color-primary)" />
                      <span>Best Season: <strong>{dest.bestSeason || 'September - April'}</strong></span>
                    </div>

                    {/* Attractions tags */}
                    {dest.popularAttractions && dest.popularAttractions.length > 0 && (
                      <div className="destination-attractions-wrap">
                        {dest.popularAttractions.slice(0, 3).map((attr, idx) => (
                          <span key={idx} className="attraction-pill">{attr}</span>
                        ))}
                      </div>
                    )}

                    {/* Card Actions */}
                    <div className="destination-card-actions">
                      <button
                        className="btn btn-outline-gold btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => handleExploreTours(dest.name)}
                      >
                        <span>View Tours</span>
                        <ArrowRight size={13} />
                      </button>
                      <button
                        className="btn btn-gold btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => openEnquiryWithDestination(dest.name)}
                      >
                        <span>Get Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-results-box">
              <Compass size={48} color="var(--color-gold)" style={{ margin: '0 auto 1rem' }} />
              <h3>No destinations matched your search</h3>
              <p>Try searching for a different state, country, or region name.</p>
              <button 
                className="btn btn-gold btn-sm" 
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setSelectedRegion('All');
                  setSearchQuery('');
                }}
              >
                View All Destinations
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Destination Help CTA */}
      <section style={{ padding: '4rem 0', background: '#0b132b', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <Sparkles size={30} color="#d4af37" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#ffffff', marginBottom: '1rem' }}>
            Looking For An Offbeat Destination?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            We specialize in lesser-known circuits, private estate retreats, and temple circuits across South India and abroad. Talk to our travel advisers for tailored arrangements.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-gold"
              onClick={() => navigate('/adviser')}
            >
              <span>Use Trip Adviser Wizard</span>
              <ArrowRight size={15} />
            </button>
            <button 
              className="btn btn-outline-gold"
              onClick={() => openEnquiryWithDestination("Customized Offbeat Destination")}
            >
              <Phone size={15} />
              <span>Contact Itinerary Desk</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
