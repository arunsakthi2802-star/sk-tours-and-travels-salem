import React from 'react';
import { Compass, Target, Eye, Heart, Award, Users, CheckCircle2 } from 'lucide-react';

const EXPERTS = [
  {
    name: "Mr. Sakthivel C",
    role: "Founder & Managing Director",
    exp: "16+ Years Travel Industry Experience",
    bio: "Passionate about world exploration, Sakthivel C established SK Tours in Salem with a mission to bring world-class international travel experiences with authentic South Indian comfort.",
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

export default function AboutUsSection() {
  return (
    <section id="about" style={{ padding: '6rem 0', background: 'var(--color-bg-base)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Compass size={14} />
            <span>Our Salem Story</span>
          </div>
          <h2 className="section-title">
            About <span>SK Tours & Travels</span>
          </h2>
          <p className="section-desc">
            Headquartered in Salem, Tamil Nadu, we are a premier travel company curating memorable international holidays, domestic escapes, and sacred pilgrimages.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Born in Salem • Celebrated Globally
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--color-primary)', margin: '0.6rem 0 1.25rem 0', lineHeight: 1.25 }}>
              Crafting Journeys That Leave Footprints In Your Heart
            </h3>
            <p style={{ color: 'var(--color-text-main)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Established in 2012 in the vibrant industrial and commercial heart of Salem, <strong>SK TOURS & TRAVELS</strong> was founded on a simple yet revolutionary promise: to liberate travellers from cookie-cutter travel agencies and offer genuine, elevated travel experiences tailored specifically for Tamil Nadu families and professionals.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              Over the last decade, we have grown from local holiday planners into one of Western Tamil Nadu's most respected tour operators. We maintain direct contractual partnerships with 5-star hotel chains in Dubai, Bali, Singapore, Maldives, and Kashmir, ensuring our clients receive VIP treatment, guaranteed best room views, and authentic Indian culinary arrangements abroad.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              padding: '1.5rem',
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <div>
                <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                  <Target size={16} color="#d4af37" /> Our Mission
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  To deliver seamless, safe, and inspiring global travel experiences with uncompromised hospitality and transparent pricing.
                </p>
              </div>

              <div>
                <h4 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                  <Eye size={16} color="#d4af37" /> Our Vision
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  To become South India's most trusted travel brand by blending digital simplicity with personalized human care.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
              alt="Happy Travellers on Holiday"
              style={{
                width: '100%',
                height: '480px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-lg)'
              }}
            />
            {/* Floating Trust Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-2rem',
              left: '-2rem',
              background: 'var(--color-primary)',
              color: '#ffffff',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-gold)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
              maxWidth: '260px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold)', fontWeight: 800, fontSize: '1.4rem' }}>
                <Award size={24} /> 12+ Years
              </div>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.4 }}>
                Of uninterrupted customer trust and 5-star holiday execution in Salem.
              </p>
            </div>
          </div>
        </div>

        {/* Travel Experts Team */}
        <div style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-badge">
              <Users size={14} />
              <span>Meet The Architects of Your Journey</span>
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-primary)' }}>
              Our Salem Travel Specialists
            </h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '0.98rem' }}>
              Backed by decades of field travel experience, our specialists ensure every flight, hotel, and sightseeing excursion is executed like clockwork.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {EXPERTS.map((expert, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-border)',
                  transition: 'all 0.3s'
                }}
              >
                <img
                  src={expert.image}
                  alt={expert.name}
                  style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.75rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {expert.exp}
                  </span>
                  <h4 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', margin: '0.3rem 0 0.2rem 0' }}>
                    {expert.name}
                  </h4>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '0.85rem' }}>
                    {expert.role}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {expert.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
