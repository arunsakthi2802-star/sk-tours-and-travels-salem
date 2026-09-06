import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, ShieldCheck, Award, Users, Heart, Target, Eye, 
  Car, CheckCircle2, Phone, Sparkles, MapPin, Clock, ArrowRight 
} from 'lucide-react';

const TEAM = [
  {
    name: "Mr. S. Karthikeyan",
    role: "Founder & Managing Director",
    exp: "16+ Years Travel Industry Experience",
    bio: "Passionate about world exploration, Karthikeyan established SK Tours in Salem with a mission to bring world-class international travel experiences with authentic South Indian comfort.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Mr. K. Selvam",
    role: "Head of International Operations",
    exp: "Dubai & Southeast Asia Specialist",
    bio: "Personally navigated over 25 countries, orchestrating premium group movements to UAE, Singapore, Malaysia, and Bali with meticulous care.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Sri. R. Venkatachalam",
    role: "Director of Pilgrimage & Heritage Tours",
    exp: "Kashi, Char Dham & South Indian Temples",
    bio: "Trusted by thousands of senior citizens and families across Salem, Erode and Namakkal for spiritual yatras accompanied by traditional Vedic purohits.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
  }
];

const FLEET = [
  {
    name: "Toyota Innova Crysta",
    category: "Luxury MPV",
    seats: "6 - 7 Passengers",
    features: "Plush Captain Seats, Dual AC, Highway Cruise Control, Ample Luggage Space",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Force Urbania & Luxury Tempo",
    category: "Executive Mini Coach",
    seats: "12 - 17 Passengers",
    features: "Individual Recliners, Ambient Mood Lighting, USB Charging Ports, Air Suspension",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Volvo Multi-Axle AC Sleeper",
    category: "Grand Highway Tourer",
    seats: "36 - 45 Passengers",
    features: "Pneumatic Suspension, Individual Entertainment, Restroom on Select Routes",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
  }
];

export default function AboutPage() {
  const { navigate, setIsCustomTripOpen } = useApp();

  return (
    <div className="page-root">
      {/* Page Hero Header */}
      <section className="page-hero-banner">
        <div className="container">
          <div className="page-breadcrumb">
            <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">About Us</span>
          </div>
          <div className="page-hero-content">
            <div className="section-badge">
              <Compass size={14} />
              <span>Our Salem Story</span>
            </div>
            <h1 className="page-hero-title">
              Crafting Memorable Journeys <span>Since 2012</span>
            </h1>
            <p className="page-hero-desc">
              From our headquarters at L_4, Staff Quarters, Periyar University in Salem, SK Tours & Travels has guided over 25,000 travellers across iconic global destinations and sacred Indian trails.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Heritage */}
      <section style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="about-heritage-grid">
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Salem's Premier Travel Agency
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--color-primary)', margin: '0.6rem 0 1.25rem', lineHeight: 1.25 }}>
                Journeys Designed With Care, Comfort & Integrity
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Founded in 2012, SK Tours & Travels was established with a singular vision: to give families in Salem, Namakkal, Erode, and Dharmapuri access to world-class travel experiences without the stress of logistics, hidden charges, or unfamiliar cuisine.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Whether it is an all-inclusive group departure to Singapore and Dubai, a customized honeymoon in Kashmir, or a sacred pilgrimage to Kashi and Rameshwaram, every itinerary is personally vetted and operated by our trained Salem team.
              </p>

              {/* Guarantees list */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--color-primary)' }}>100% Transparent Tariffs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--color-primary)' }}>Authentic South Indian Meals</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--color-primary)' }}>Dedicated Salem Tour Leaders</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--color-primary)' }}>24/7 Road & Transit Helpline</span>
                </div>
              </div>
            </div>

            <div className="about-heritage-image-stack">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" 
                alt="Travellers exploring with SK Tours" 
                className="about-main-img"
              />
              <div className="about-experience-card">
                <div className="exp-number">12+</div>
                <div className="exp-text">Years of Trusted Salem Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Counter Band */}
      <section style={{ padding: '3.5rem 0', background: 'var(--color-primary)', color: '#ffffff' }}>
        <div className="container">
          <div className="about-stats-grid">
            <div className="about-stat-box">
              <div className="stat-value">25,000+</div>
              <div className="stat-label">Delighted Travellers</div>
            </div>
            <div className="about-stat-box">
              <div className="stat-value">450+</div>
              <div className="stat-label">Successful Group Tours</div>
            </div>
            <div className="about-stat-box">
              <div className="stat-value">35+</div>
              <div className="stat-label">Countries Covered</div>
            </div>
            <div className="about-stat-box">
              <div className="stat-value">98.8%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Tour Captains */}
      <section style={{ padding: '5rem 0', background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Users size={14} />
              <span>Leadership Team</span>
            </div>
            <h2 className="section-title">
              Meet The <span>Minds Behind SK Tours</span>
            </h2>
            <p className="section-desc">
              Decades of combined travel knowledge, personally navigating routes and ensuring every traveller experiences royal hospitality.
            </p>
          </div>

          <div className="about-team-grid" style={{ marginTop: '3rem' }}>
            {TEAM.map((member, i) => (
              <div key={i} className="about-team-card">
                <img src={member.image} alt={member.name} className="about-team-img" />
                <div className="about-team-content">
                  <h3 className="about-team-name">{member.name}</h3>
                  <div className="about-team-role">{member.role}</div>
                  <div className="about-team-exp">{member.exp}</div>
                  <p className="about-team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Fleet Showcase */}
      <section style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Car size={14} />
              <span>Our Transport Arsenal</span>
            </div>
            <h2 className="section-title">
              Salem's Most Luxurious <span>Fleet of Vehicles</span>
            </h2>
            <p className="section-desc">
              All vehicles are company-inspected, air-conditioned, GPS tracked, and piloted by courteous, uniformed drivers with clean commercial records.
            </p>
          </div>

          <div className="about-fleet-grid" style={{ marginTop: '3rem' }}>
            {FLEET.map((vehicle, i) => (
              <div key={i} className="about-fleet-card">
                <img src={vehicle.image} alt={vehicle.name} className="about-fleet-img" />
                <div className="about-fleet-content">
                  <span className="about-fleet-cat">{vehicle.category}</span>
                  <h3 className="about-fleet-name">{vehicle.name}</h3>
                  <div className="about-fleet-seats">
                    <Users size={15} color="var(--color-gold-dark)" />
                    <span>Capacity: {vehicle.seats}</span>
                  </div>
                  <p className="about-fleet-desc">{vehicle.features}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section style={{ padding: '4rem 0', background: '#0b132b', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <Sparkles size={32} color="#d4af37" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: '#ffffff', marginBottom: '1rem' }}>
            Ready to Plan Your Next Journey With Us?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Visit our Salem headquarters, talk to our senior itinerary planners, or request an instant bespoke quotation today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-gold"
              onClick={() => setIsCustomTripOpen(true)}
            >
              <span>Build Custom Package</span>
              <ArrowRight size={16} />
            </button>
            <button 
              className="btn btn-outline-gold"
              onClick={() => navigate('/contact')}
            >
              <Phone size={16} />
              <span>Contact Salem Office</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
