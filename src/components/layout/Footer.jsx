import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { MapPin, Phone, Mail, Clock, MessageCircle, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  const { setCustomerView, settings } = useFarm();

  const handleNav = (view) => {
    setCustomerView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--charcoal-deep)',
        color: 'var(--warm-ivory)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src="/logo.svg" alt="The Village Farm" style={{ width: '40px', height: '40px' }} />
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--white)' }}>
                  The Village Farm
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--amber-primary)', fontWeight: 600 }}>
                  Ethical Poultry & Fresh Farm Delivery
                </div>
              </div>
            </div>
            <p style={{ color: '#B5AFA6', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Committed to ethical, open-pasture poultry farming. Our birds roam freely, feed on natural grains, and are harvested fresh every morning with rigorous cold-chain dispatch directly to your doorstep.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}?text=Hello%20The%20Village%20Farm,%20I%20would%20like%20to%20inquire%20about%20fresh%20poultry`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <MessageCircle size={16} />
                Order on WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.125rem', marginBottom: '1.25rem' }}>Store & Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9375rem' }}>
              <li>
                <button onClick={() => handleNav('shop')} style={{ color: '#B5AFA6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--amber-primary)'} onMouseLeave={(e) => e.target.style.color = '#B5AFA6'}>
                  Free-Range Country Chicken (Desi)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} style={{ color: '#B5AFA6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--amber-primary)'} onMouseLeave={(e) => e.target.style.color = '#B5AFA6'}>
                  Farm Broiler Curry Cuts (Skinless)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} style={{ color: '#B5AFA6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--amber-primary)'} onMouseLeave={(e) => e.target.style.color = '#B5AFA6'}>
                  Boneless Chicken Breast Fillets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} style={{ color: '#B5AFA6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--amber-primary)'} onMouseLeave={(e) => e.target.style.color = '#B5AFA6'}>
                  Kadaknath Black Meat Specialty
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tracking')} style={{ color: '#B5AFA6', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--amber-primary)'} onMouseLeave={(e) => e.target.style.color = '#B5AFA6'}>
                  Track Live Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Farm Contact & Hours */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.125rem', marginBottom: '1.25rem' }}>Farm & Dispatch Hub</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9375rem', color: '#B5AFA6' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--amber-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{settings.farmAddress}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} color="var(--amber-primary)" style={{ flexShrink: 0 }} />
                <a href={`tel:${settings.phone}`} style={{ color: 'inherit' }}>{settings.phone}</a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={18} color="var(--amber-primary)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${settings.email}`} style={{ color: 'inherit' }}>{settings.email}</a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Clock size={18} color="var(--amber-primary)" style={{ flexShrink: 0 }} />
                <span>{settings.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Trust & Biosecurity */}
          <div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.125rem', marginBottom: '1.25rem' }}>Ethical Standards</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#B5AFA6', fontSize: '0.875rem' }}>
                <ShieldCheck size={18} color="var(--success-green)" />
                <span>100% Antibiotic & Hormone-Free</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#B5AFA6', fontSize: '0.875rem' }}>
                <ShieldCheck size={18} color="var(--success-green)" />
                <span>Daily Biosecurity Audited Flock</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#B5AFA6', fontSize: '0.875rem' }}>
                <ShieldCheck size={18} color="var(--success-green)" />
                <span>0-4°C Cold-Chain Insulated Transit</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#B5AFA6', fontSize: '0.875rem' }}>
                <ShieldCheck size={18} color="var(--success-green)" />
                <span>Eco-Friendly Biodegradable Trays</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: '#8C877E'
          }}
        >
          <div>
            © {new Date().getFullYear()} The Village Farm. All rights reserved. Commercial Poultry & Delivery SaaS.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem' }}>
            <span>Certified Food Safety</span>
            <span>•</span>
            <span>Local Pasture Raised</span>
            <span>•</span>
            <span>Farm-To-Fork Traceability</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
