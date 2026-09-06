import React from 'react';
import { UserCheck, Compass, Award, Tag, Headphones, ShieldCheck } from 'lucide-react';

const WHY_ITEMS = [
  {
    icon: Compass,
    title: "Personalized Travel",
    desc: "Travel plans designed around your pace, preferences and family requirements, with tailored South Indian dining options."
  },
  {
    icon: UserCheck,
    title: "Expert Guidance",
    desc: "Professional Salem travel specialists and dedicated on-ground tour managers accompanying every major group departure."
  },
  {
    icon: Award,
    title: "Handpicked Experiences",
    desc: "Carefully vetted 4-star & 5-star hotels, luxury coaches, authentic cultural activities and iconic landmark tickets."
  },
  {
    icon: Tag,
    title: "Transparent Pricing",
    desc: "No confusing hidden charges or surprise extras. All taxes, transfers, sightseeing and mentioned meals included upfront."
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "24/7 personalized concierge before, during and after your travel, with instant WhatsApp and phone assistance."
  },
  {
    icon: ShieldCheck,
    title: "Trusted Travel Partner",
    desc: "Over 12 years of excellence in Salem, 1,000+ satisfied travellers and thousands of joyful memories delivered."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="why-us-section" style={{ padding: '6rem 0', background: '#ffffff' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <ShieldCheck size={14} />
            <span>The SK Tours Advantage</span>
          </div>
          <h2 className="section-title">
            Why Discerning Travellers <span>Choose Us</span>
          </h2>
          <p className="section-desc">
            We don't just book tickets; we engineer seamless, stress-free journeys filled with moments of wonder and genuine hospitality.
          </p>
        </div>

        <div className="why-us-grid">
          {WHY_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="why-card">
                <div className="why-icon-box">
                  <Icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '0.6rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
