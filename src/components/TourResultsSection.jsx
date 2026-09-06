import React from 'react';
import { useApp } from '../context/AppContext';
import TourCard from './TourCard';
import { Sparkles, SearchX, RotateCcw } from 'lucide-react';

export default function TourResultsSection() {
  const { tours, filters, setFilters } = useApp();

  const filteredTours = tours.filter((tour) => {
    if (!tour.published) return false;

    // Search query
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchDest = tour.destination?.toLowerCase().includes(q);
      const matchCountry = tour.country?.toLowerCase().includes(q);
      const matchName = tour.name?.toLowerCase().includes(q);
      const matchCat = tour.category?.toLowerCase().includes(q);
      if (!matchDest && !matchCountry && !matchName && !matchCat) return false;
    }

    // Category
    if (filters.category && filters.category !== 'All') {
      const cat = filters.category.toLowerCase();
      const matchPrimary = tour.category.toLowerCase() === cat;
      const matchSub = tour.subCategory && tour.subCategory.toLowerCase().includes(cat);
      const matchType = (filters.category === 'Group Tours' && tour.tourType === 'group') ||
                        (filters.category === 'Private Tours' && tour.tourType === 'private');
      if (!matchPrimary && !matchSub && !matchType) return false;
    }

    // Premium toggle
    if (filters.isPremium && !tour.isPremium) {
      return false;
    }

    // Budget slider
    if (filters.maxBudget && tour.price > filters.maxBudget && filters.maxBudget < 100000) {
      return false;
    }

    return true;
  });

  const handleReset = () => {
    setFilters({
      search: '',
      month: '',
      maxBudget: 100000,
      category: 'All',
      isPremium: false,
      travelDate: ''
    });
  };

  const hasActiveFilters = filters.search || filters.category !== 'All' || filters.isPremium || filters.maxBudget < 100000;

  return (
    <section id="tour-results" style={{ padding: '2rem 0 5rem 0', background: 'var(--color-bg-base)' }}>
      <div className="container">
        {/* Results Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)' }}>
              {hasActiveFilters ? "Filtered Tour Packages" : "All Available Tour Packages"}
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Showing {filteredTours.length} verified packages departing from Salem and nearby airports
            </p>
          </div>

          {hasActiveFilters && (
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={handleReset}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RotateCcw size={14} />
              Reset All Filters
            </button>
          )}
        </div>

        {/* Results Grid */}
        {filteredTours.length > 0 ? (
          <div className="tours-grid">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: '1px dashed var(--color-border)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--color-bg-base)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              color: 'var(--color-text-muted)'
            }}>
              <SearchX size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              No Exact Match Found
            </h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
              We couldn't find packages matching your exact budget and search criteria. Would you like our Salem team to design a custom itinerary?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn btn-outline-dark btn-sm" onClick={handleReset}>
                Reset Filters
              </button>
              <button
                className="btn btn-gold btn-sm"
                onClick={() => {
                  const el = document.getElementById('adviser');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Sparkles size={14} />
                Ask Travel Adviser
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
