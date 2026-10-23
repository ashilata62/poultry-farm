import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { ShoppingBag, Search, Menu, X, PhoneCall, QrCode, LogIn } from 'lucide-react';

export const Navbar = () => {
  const {
    currentRole,
    setCurrentRole,
    customerView,
    setCustomerView,
    cartItemsCount,
    setIsCartDrawerOpen,
    setIsQrModalOpen,
    settings
  } = useFarm();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    if (view === 'login') {
      setCurrentRole('login');
      setCustomerView('login');
    } else {
      setCurrentRole('customer');
      setCustomerView(view);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        backgroundColor: 'rgba(255, 252, 247, 0.96)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-beige)',
        transition: 'all 0.2s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--header-height)' }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <img src="/logo.svg" alt="The Village Farm Logo" style={{ width: '42px', height: '42px' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.1 }}>
              The Village Farm
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--amber-dark)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Organic & Free-Range
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <button
            onClick={() => handleNavClick('home')}
            style={{
              fontWeight: customerView === 'home' ? 600 : 500,
              color: customerView === 'home' ? 'var(--amber-dark)' : 'var(--charcoal)',
              fontSize: '0.9375rem',
              position: 'relative'
            }}
          >
            Home
            {customerView === 'home' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--amber-primary)',
                  borderRadius: '2px'
                }}
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('shop')}
            style={{
              fontWeight: customerView === 'shop' ? 600 : 500,
              color: customerView === 'shop' ? 'var(--amber-dark)' : 'var(--charcoal)',
              fontSize: '0.9375rem',
              position: 'relative'
            }}
          >
            Fresh Cuts & Store
            {customerView === 'shop' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--amber-primary)',
                  borderRadius: '2px'
                }}
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('tracking')}
            style={{
              fontWeight: customerView === 'tracking' ? 600 : 500,
              color: customerView === 'tracking' ? 'var(--amber-dark)' : 'var(--charcoal)',
              fontSize: '0.9375rem',
              position: 'relative'
            }}
          >
            Track Order
            {customerView === 'tracking' && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--amber-primary)',
                  borderRadius: '2px'
                }}
              />
            )}
          </button>

          <button
            onClick={() => handleNavClick('about')}
            style={{
              fontWeight: customerView === 'about' ? 600 : 500,
              color: customerView === 'about' ? 'var(--amber-dark)' : 'var(--charcoal)',
              fontSize: '0.9375rem'
            }}
          >
            Our Farm
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            style={{
              fontWeight: customerView === 'contact' ? 600 : 500,
              color: customerView === 'contact' ? 'var(--amber-dark)' : 'var(--charcoal)',
              fontSize: '0.9375rem'
            }}
          >
            Contact
          </button>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* QR Order Shortcut */}
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="btn btn-ghost btn-sm hide-on-mobile"
            title="Scan QR to order on your phone"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--charcoal)' }}
          >
            <QrCode size={17} />
            <span style={{ fontSize: '0.8125rem' }}>QR Order</span>
          </button>

          {/* Sign In to Dashboards Button */}
          <button
            onClick={() => handleNavClick('login')}
            className={`btn btn-sm ${customerView === 'login' ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 600,
              fontSize: '0.8125rem',
              padding: '0.5rem 0.85rem'
            }}
            title="Sign In to Operational Dashboards"
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem', position: 'relative' }}
            aria-label={`Open shopping cart with ${cartItemsCount} items`}
          >
            <ShoppingBag size={18} />
            <span className="hide-on-mobile">Cart</span>
            {cartItemsCount > 0 && (
              <span
                style={{
                  background: 'var(--charcoal-deep)',
                  color: 'var(--white)',
                  borderRadius: 'var(--radius-full)',
                  padding: '1px 7px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginLeft: '2px'
                }}
              >
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost hide-on-desktop"
            style={{ padding: '8px' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className="hide-on-desktop"
          style={{
            backgroundColor: 'var(--white)',
            borderTop: '1px solid var(--border-beige)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <button
            onClick={() => handleNavClick('home')}
            className="btn-ghost"
            style={{ textAlign: 'left', padding: '0.75rem', fontSize: '1rem', fontWeight: 500 }}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className="btn-ghost"
            style={{ textAlign: 'left', padding: '0.75rem', fontSize: '1rem', fontWeight: 500 }}
          >
            Fresh Cuts & Store
          </button>
          <button
            onClick={() => handleNavClick('tracking')}
            className="btn-ghost"
            style={{ textAlign: 'left', padding: '0.75rem', fontSize: '1rem', fontWeight: 500 }}
          >
            Track Order
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="btn-ghost"
            style={{ textAlign: 'left', padding: '0.75rem', fontSize: '1rem', fontWeight: 500 }}
          >
            Our Farm
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="btn-ghost"
            style={{ textAlign: 'left', padding: '0.75rem', fontSize: '1rem', fontWeight: 500 }}
          >
            Contact
          </button>
          
          <button
            onClick={() => handleNavClick('login')}
            className={`btn ${customerView === 'login' ? 'btn-primary' : 'btn-secondary'} btn-block`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.25rem' }}
          >
            <LogIn size={18} />
            <span>Sign In to Dashboards</span>
          </button>

          <button
            onClick={() => {
              setIsQrModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="btn btn-secondary btn-block"
            style={{ marginTop: '0.25rem' }}
          >
            <QrCode size={18} />
            Show QR Code
          </button>
        </div>
      )}
    </header>
  );
};
