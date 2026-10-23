import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { ShieldCheck, Heart, Sun, Feather, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  const { setCustomerView } = useFarm();

  return (
    <div style={{ backgroundColor: 'var(--soft-cream)', minHeight: '80vh', padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
            Our Farming Heritage
          </div>
          <h1 style={{ color: 'var(--charcoal)', marginBottom: '1rem' }}>
            Ethical Free-Range Poultry, Reimagined
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--muted-text)', lineHeight: '1.7', maxWidth: '680px', margin: '0 auto' }}>
            The Village Farm was founded with a singular conviction: healthy poultry begins with unconfined pasture grazing, natural sunlight, organic grains, and an unbroken cold-chain to your kitchen.
          </p>
        </div>

        {/* Hero Farm Photo */}
        <div
          style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--border-beige)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '3.5rem'
          }}
        >
          <img
            src="/images/farm_hero.jpg"
            alt="The Village Farm Open Pastures"
            style={{ width: '100%', height: '380px', objectFit: 'cover' }}
          />
        </div>

        {/* Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          <div className="card" style={{ backgroundColor: 'var(--white)' }}>
            <Sun size={28} color="var(--amber-primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Open-Air Grazing</h3>
            <p style={{ fontSize: '0.875rem' }}>
              Our flocks roam free across spacious paddocks, engaging in natural dust-bathing, running, and foraging under open Karnataka skies.
            </p>
          </div>

          <div className="card" style={{ backgroundColor: 'var(--white)' }}>
            <ShieldCheck size={28} color="var(--success-green)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Zero Antibiotics</h3>
            <p style={{ fontSize: '0.875rem' }}>
              We forbid prophylactic antibiotics, hormonal fatteners, and synthetic growth promoters. Flock health is nurtured naturally through herbal probiotics and clean mineral water.
            </p>
          </div>

          <div className="card" style={{ backgroundColor: 'var(--white)' }}>
            <Feather size={28} color="var(--charcoal)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Heritage & Country Breeds</h3>
            <p style={{ fontSize: '0.875rem' }}>
              We preserve native Indian poultry varieties such as Desi Country Birds and Kadaknath, recognized for firm texture, high lean protein, and deep flavor.
            </p>
          </div>
        </div>

        {/* Biosecurity & Cold Chain Commitment */}
        <div
          style={{
            backgroundColor: 'var(--charcoal-deep)',
            color: 'var(--warm-ivory)',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}
        >
          <h2 style={{ color: 'var(--white)', fontSize: '1.75rem' }}>
            Our Biosecurity & Cold-Chain Protocol
          </h2>
          <p style={{ color: '#B5AFA6', fontSize: '0.9375rem', lineHeight: '1.7' }}>
            Food safety is non-negotiable. Every dawn harvest is inspected by certified avian veterinary professionals. Meat is dressed in temperature-controlled sanitized processing rooms, immediately packaged in vacuum-sealed biodegradable trays with dry ice, and loaded into insulated electric vans.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="var(--amber-primary)" />
              <span style={{ fontSize: '0.875rem' }}>Sanitized Processing Facility</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="var(--amber-primary)" />
              <span style={{ fontSize: '0.875rem' }}>Continuous 0°C – 4°C Monitoring</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="var(--amber-primary)" />
              <span style={{ fontSize: '0.875rem' }}>Same-Day Delivery Guarantee</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setCustomerView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-primary btn-lg"
            style={{ gap: '0.5rem' }}
          >
            <span>Browse Today’s Fresh Harvest</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
