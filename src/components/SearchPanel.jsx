import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Search, DollarSign, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';

const MONTHS = [
  "All Months", "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const CATEGORIES = [
  "All", "Domestic", "International", "Pilgrimage", "Honeymoon", 
  "Family", "Adventure", "Luxury", "Group Tours", "Private Tours"
];

export default function SearchPanel() {
  const { filters, setFilters } = useApp();

  const handleSearchClick = () => {
    const el = document.getElementById('tour-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="search-panel" className="search-panel-wrapper container">
      <div className="search-panel-card">
        {/* Main Grid: Destination, Month, Date, Budget Slider, Submit */}
        <div className="search-panel-grid">
          {/* Destination Search */}
          <div className="search-input-group">
            <label className="search-label">
              <MapPin size={14} color="#d4af37" />
              <span>Destination</span>
            </label>
            <div className="search-input-box">
              <Search size={16} color="#94a3b8" />
              <input
                type="text"
                placeholder="Where do you want to travel? (e.g. Dubai, Kashmir...)"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
          </div>

          {/* Month Selector */}
          <div className="search-input-group">
            <label className="search-label">
              <Calendar size={14} color="#d4af37" />
              <span>Travel Month</span>
            </label>
            <div className="search-input-box">
              <select
                value={filters.month}
                onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m === "All Months" ? "" : m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Specific Travel Date */}
          <div className="search-input-group">
            <label className="search-label">
              <Calendar size={14} color="#d4af37" />
              <span>Exact Date (Optional)</span>
            </label>
            <div className="search-input-box">
              <input
                type="date"
                value={filters.travelDate}
                onChange={(e) => setFilters(prev => ({ ...prev, travelDate: e.target.value }))}
              />
            </div>
          </div>

          {/* Maximum Budget Slider */}
          <div className="search-input-group">
            <div className="budget-slider-header">
              <label className="search-label">
                <DollarSign size={14} color="#d4af37" />
                <span>Max Budget</span>
              </label>
              <span className="budget-value">
                {filters.maxBudget >= 100000 ? "₹1,00,000+" : formatINR(filters.maxBudget)}
              </span>
            </div>
            <div style={{ paddingTop: '0.4rem' }}>
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={filters.maxBudget}
                onChange={(e) => setFilters(prev => ({ ...prev, maxBudget: Number(e.target.value) }))}
                className="budget-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
                <span>₹10k</span>
                <span>₹25k</span>
                <span>₹50k</span>
                <span>₹1L+</span>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="search-input-group">
            <button
              className="btn btn-gold"
              style={{ width: '100%', height: '48px' }}
              onClick={handleSearchClick}
            >
              <Search size={18} />
              <span>SEARCH TOURS</span>
            </button>
          </div>
        </div>

        {/* Categories Bar & Premium Toggle */}
        <div className="search-filters-bar">
          <div className="category-pills">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginRight: '0.25rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <SlidersHorizontal size={13} /> Categories:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${filters.category === cat ? 'active' : ''}`}
                onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Premium Tours Toggle */}
          <label className="premium-toggle-label">
            <input
              type="checkbox"
              checked={filters.isPremium}
              onChange={(e) => setFilters(prev => ({ ...prev, isPremium: e.target.checked }))}
              style={{ accentColor: '#d4af37', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <Sparkles size={16} />
            <span>Show Premium Tours Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}
