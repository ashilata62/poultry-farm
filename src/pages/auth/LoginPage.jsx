import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import {
  Store,
  LayoutDashboard,
  Truck,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  ArrowLeft,
  Sparkles,
  Eye,
  EyeOff,
  Award,
  Thermometer,
  Feather
} from 'lucide-react';

export const LoginPage = () => {
  const {
    setCurrentRole,
    setCustomerView,
    setAdminModule,
    orders,
    showToast
  } = useFarm();

  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('admin@thevillagefarm.in');
  const [password, setPassword] = useState('farm2026!secure');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const pendingOrdersCount = orders ? orders.filter((o) => o.orderStatus === 'pending').length : 0;
  const inTransitCount = orders ? orders.filter((o) => o.orderStatus === 'in_transit').length : 0;

  // The 4 Core Dashboards
  const rolePortals = [
    {
      id: 'customer',
      title: 'Customer Store',
      shortTitle: 'Store',
      roleBadge: 'Public Store',
      badgeColor: 'badge-green',
      icon: Store,
      tagline: 'Fresh Cuts, Orders & Live Delivery Tracking',
      email: 'customer@thevillagefarm.in',
      action: () => {
        setCurrentRole('customer');
        setCustomerView('home');
        if (showToast) showToast('Welcome to The Village Farm Customer Store!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'admin',
      title: 'Farm Admin',
      shortTitle: 'Admin',
      roleBadge: 'Operations ERP',
      badgeColor: 'badge-amber',
      icon: LayoutDashboard,
      tagline: 'Farm Operations & Management Dashboard',
      email: 'admin@thevillagefarm.in',
      extraBadge: pendingOrdersCount > 0 ? `${pendingOrdersCount} Pending` : null,
      action: () => {
        setCurrentRole('admin');
        setCustomerView('home');
        setAdminModule('dashboard');
        if (showToast) showToast('Logged in as Farm Administrator');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'delivery',
      title: 'Dispatch & Map',
      shortTitle: 'Dispatch',
      roleBadge: 'Logistics Hub',
      badgeColor: 'badge-amber',
      icon: Truck,
      tagline: 'Two-Panel Delivery Dispatch & Live Route Map',
      email: 'dispatch@thevillagefarm.in',
      extraBadge: inTransitCount > 0 ? `${inTransitCount} In Transit` : null,
      action: () => {
        setCurrentRole('delivery');
        setCustomerView('home');
        if (showToast) showToast('Accessing Delivery Dispatch Hub');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      id: 'driver',
      title: 'Driver App',
      shortTitle: 'Driver',
      roleBadge: 'Field Courier',
      badgeColor: 'badge-green',
      icon: Smartphone,
      tagline: 'Driver Mobile Delivery Portal',
      email: 'rajesh.driver@thevillagefarm.in',
      action: () => {
        setCurrentRole('driver');
        setCustomerView('home');
        if (showToast) showToast('Logged in to Driver Mobile Portal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  ];

  const currentPortal = rolePortals.find((p) => p.id === selectedRole) || rolePortals[1];

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
    const target = rolePortals.find((p) => p.id === roleId);
    if (target) {
      setEmail(target.email);
      setPassword('farm2026!secure');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentPortal) {
      currentPortal.action();
    }
  };

  const handleReturnToStore = () => {
    setCurrentRole('customer');
    setCustomerView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: "url('/images/farm_hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#FAF5EE'
      }}
    >
      {/* Landing-Page-Style Warm Sunlight & Ivory Frosted Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 15% 20%, rgba(242, 140, 40, 0.18) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(200, 117, 34, 0.14) 0%, transparent 55%), linear-gradient(135deg, rgba(255, 252, 247, 0.90) 0%, rgba(247, 239, 227, 0.86) 45%, rgba(255, 248, 238, 0.92) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Ambient Warm Golden Orb Top-Right */}
      <div
        style={{
          position: 'absolute',
          top: '-70px',
          right: '8%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242, 140, 40, 0.15) 0%, rgba(242, 140, 40, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(50px)'
        }}
      />

      {/* Top Glassmorphic Navigation Bar (Landing Page Bright Aesthetic) */}
      <header
        style={{
          height: '62px',
          flexShrink: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(232, 222, 208, 0.85)',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 20,
          boxShadow: '0 2px 8px rgba(41, 43, 42, 0.04)'
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={handleReturnToStore}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          title="Return to Customer Store"
        >
          <img
            src="/logo.svg"
            alt="The Village Farm Logo"
            style={{ width: '36px', height: '36px', filter: 'drop-shadow(0 2px 6px rgba(242, 140, 40, 0.35))' }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--charcoal-deep)',
                lineHeight: 1.15,
                letterSpacing: '0.01em'
              }}
            >
              The Village Farm
            </div>
            <div
              style={{
                fontSize: '0.625rem',
                color: 'var(--amber-primary)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              Organic & Free-Range
            </div>
          </div>
        </div>

        {/* Right Status & Back to Store Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            className="hide-on-mobile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.75rem',
              color: 'var(--success-green)',
              fontWeight: 600,
              backgroundColor: 'var(--success-bg)',
              border: '1px solid rgba(40, 122, 75, 0.25)',
              padding: '0.25rem 0.8rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-green)',
                boxShadow: '0 0 6px rgba(40, 122, 75, 0.6)'
              }}
            />
            4 Portals Online
          </span>

          <button
            onClick={handleReturnToStore}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontWeight: 600,
              padding: '0.45rem 0.95rem',
              fontSize: '0.8125rem',
              color: 'var(--charcoal-deep)',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-beige)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)',
              transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--amber-soft)';
              e.currentTarget.style.borderColor = 'var(--amber-primary)';
              e.currentTarget.style.color = 'var(--amber-dark)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'var(--border-beige)';
              e.currentTarget.style.color = 'var(--charcoal-deep)';
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Store</span>
          </button>
        </div>
      </header>

      {/* Main Centered Master Glassmorphic Area (Fluid, Fully Responsive) */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.25rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Master Glassmorphic Card Container (Landing Page Warm Ivory & Amber Glass) */}
        <div
          className="login-glass-card"
          style={{
            width: '100%',
            maxWidth: '980px',
            backgroundColor: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(28px) saturate(170%)',
            WebkitBackdropFilter: 'blur(28px) saturate(170%)',
            border: '1px solid rgba(232, 222, 208, 0.95)',
            boxShadow:
              '0 24px 60px -12px rgba(41, 43, 42, 0.12), 0 0 0 1px rgba(242, 140, 40, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            borderRadius: '24px',
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            overflow: 'hidden'
          }}
        >
          {/* LEFT COLUMN: Fresh Cut Chicken Showcase Frame */}
          <div
            className="login-image-frame"
            style={{
              padding: '1.25rem',
              backgroundColor: 'rgba(247, 239, 227, 0.55)',
              borderRight: '1px solid rgba(232, 222, 208, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {/* Top Showcase Image Card with Reference Bottom Pill */}
            <div
              className="login-hero-img-box"
              style={{
                width: '100%',
                height: '240px',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(232, 222, 208, 0.9)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <img
                src="/images/clean_chicken_cuts.jpg"
                alt="The Village Farm Fresh Chicken Cuts"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />
              {/* Subtle warm vignette */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26, 28, 27, 0.82) 0%, rgba(26, 28, 27, 0.05) 60%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Status pill over image (Exact matching reference style) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(32, 35, 33, 0.90)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '7px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--amber-primary)',
                      boxShadow: '0 0 8px var(--amber-primary)'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Ethical Pasture Farm
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.71875rem',
                    color: 'var(--amber-primary)',
                    fontWeight: 700,
                    letterSpacing: '0.02em'
                  }}
                >
                  0-4°C Cold Chain
                </span>
              </div>
            </div>

            {/* Farm Trust Pillars with Warm Ivory/Cream Frosted Accents */}
            <div
              className="login-trust-pillars"
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem'
              }}
            >
              <div
                style={{
                  padding: '0.55rem 0.75rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  border: '1px solid var(--border-beige)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--amber-soft)',
                    border: '1px solid rgba(242, 140, 40, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Feather size={15} color="var(--amber-dark)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: 'var(--charcoal-deep)', lineHeight: 1.2 }}>
                    Free-Range Country Pastures
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>
                    4 Active sheds, natural sunlight & non-GMO grains
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '0.55rem 0.75rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  border: '1px solid var(--border-beige)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--success-bg)',
                    border: '1px solid rgba(40, 122, 75, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Thermometer size={15} color="var(--success-green)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: 'var(--charcoal-deep)', lineHeight: 1.2 }}>
                    Strict 2.4°C Chilled Cold-Chain
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>
                    Zero freezing, preserved tenderness & hygiene
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '0.55rem 0.75rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  border: '1px solid var(--border-beige)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--amber-soft)',
                    border: '1px solid rgba(242, 140, 40, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Award size={15} color="var(--amber-dark)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: 'var(--charcoal-deep)', lineHeight: 1.2 }}>
                    No Antibiotics or Hormones
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>
                    Daily farm biosecurity & veterinary verification
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Location Footnote */}
            <div
              className="login-footnote"
              style={{
                fontSize: '0.6875rem',
                color: 'var(--muted-text)',
                textAlign: 'center',
                paddingTop: '0.65rem',
                marginTop: '0.65rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              The Village Farm Hub • Varthur Hobli, Bengaluru
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Multi-Role Form Pane */}
          <div
            className="login-form-pane"
            style={{
              padding: '1.75rem 2.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {/* Header Titles */}
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'var(--amber-soft)',
                  color: 'var(--amber-dark)',
                  border: '1px solid rgba(242, 140, 40, 0.3)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.71875rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  letterSpacing: '0.04em'
                }}
              >
                <Sparkles size={13} />
                <span>Unified Enterprise Gateway</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--charcoal-deep)',
                  lineHeight: 1.2,
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}
              >
                Sign In to Dashboard
              </h1>
              <p style={{ fontSize: '0.84375rem', color: 'var(--muted-text)', margin: '4px 0 0' }}>
                Select your operational console to authenticate into your session
              </p>
            </div>

            {/* 4 Dashboard Selector Glassmorphic Tabs */}
            <div style={{ marginBottom: '0.85rem' }}>
              <div
                className="login-tabs-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.4rem',
                  backgroundColor: 'rgba(247, 239, 227, 0.7)',
                  padding: '0.35rem',
                  borderRadius: '14px',
                  border: '1px solid var(--border-beige)'
                }}
              >
                {rolePortals.map((portal) => {
                  const isSelected = selectedRole === portal.id;
                  const IconComponent = portal.icon;

                  return (
                    <button
                      key={portal.id}
                      type="button"
                      onClick={() => handleSelectRole(portal.id)}
                      style={{
                        padding: '0.55rem 0.25rem',
                        borderRadius: '10px',
                        border: isSelected
                          ? '1.5px solid var(--amber-primary)'
                          : '1px solid transparent',
                        backgroundColor: isSelected
                          ? '#FFFFFF'
                          : 'transparent',
                        color: isSelected ? 'var(--amber-dark)' : 'var(--charcoal)',
                        boxShadow: isSelected ? '0 4px 12px rgba(242, 140, 40, 0.2)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                      title={portal.title}
                    >
                      <IconComponent
                        size={17}
                        color={isSelected ? 'var(--amber-primary)' : 'var(--muted-text)'}
                      />
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: isSelected ? 700 : 500,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {portal.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Portal Summary Glass Bar (Landing Page Warm Style) */}
            <div
              style={{
                backgroundColor: 'var(--amber-soft)',
                border: '1px solid rgba(242, 140, 40, 0.25)',
                borderRadius: '12px',
                padding: '0.65rem 0.95rem',
                marginBottom: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--amber-primary)',
                    border: '1px solid rgba(242, 140, 40, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <currentPortal.icon size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--charcoal-deep)',
                      lineHeight: 1.2
                    }}
                  >
                    {currentPortal.title}
                  </div>
                  <div style={{ fontSize: '0.71875rem', color: 'var(--muted-text)' }}>
                    {currentPortal.tagline}
                  </div>
                </div>
              </div>

              <span
                className={`badge ${currentPortal.badgeColor}`}
                style={{ fontSize: '0.65625rem', padding: '4px 9px', borderRadius: 'var(--radius-full)' }}
              >
                {currentPortal.roleBadge}
              </span>
            </div>

            {/* Login Form Fields */}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Enterprise Email */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78125rem',
                    fontWeight: 600,
                    color: 'var(--charcoal-deep)',
                    marginBottom: '0.3rem'
                  }}
                >
                  Enterprise Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={15}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--muted-text)'
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      paddingLeft: '2.35rem',
                      height: '40px',
                      fontSize: '0.84375rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-beige)',
                      borderRadius: '10px',
                      color: 'var(--charcoal-deep)',
                      outline: 'none',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--amber-primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(242, 140, 40, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-beige)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="name@thevillagefarm.in"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.3rem'
                  }}
                >
                  <label style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--charcoal-deep)' }}>
                    Password
                  </label>
                  <span
                    style={{
                      fontSize: '0.71875rem',
                      color: 'var(--amber-dark)',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    Demo Autofilled
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={15}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--muted-text)'
                    }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      paddingLeft: '2.35rem',
                      paddingRight: '2.5rem',
                      height: '40px',
                      fontSize: '0.84375rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-beige)',
                      borderRadius: '10px',
                      color: 'var(--charcoal-deep)',
                      outline: 'none',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--amber-primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(242, 140, 40, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-beige)';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--muted-text)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Session & Security Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78125rem',
                  padding: '2px 0'
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer',
                    color: 'var(--charcoal)'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--amber-primary)', cursor: 'pointer' }}
                  />
                  <span>Remember session</span>
                </label>
                <span
                  style={{
                    color: 'var(--muted-text)',
                    fontSize: '0.71875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Lock size={12} color="var(--amber-primary)" />
                  <span>SSL 256-Bit</span>
                </span>
              </div>

              {/* Primary Amber Sign In Button (Rock Solid, No Shift) */}
              <button
                type="submit"
                style={{
                  height: '44px',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.55rem',
                  background: 'linear-gradient(135deg, #F28C28 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 6px 20px rgba(242, 140, 40, 0.40)',
                  cursor: 'pointer',
                  marginTop: '0.35rem',
                  transition: 'box-shadow 0.2s ease, filter 0.2s ease',
                  letterSpacing: '0.01em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(242, 140, 40, 0.55)';
                  e.currentTarget.style.filter = 'brightness(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(242, 140, 40, 0.40)';
                  e.currentTarget.style.filter = 'none';
                }}
              >
                <ShieldCheck size={18} />
                <span>Sign In as {currentPortal.title}</span>
                <ArrowRight size={16} />
              </button>

              {/* 1-Click Direct Launch Shortcuts */}
              <div
                style={{
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '0.71875rem',
                    color: 'var(--muted-text)',
                    marginBottom: '0.45rem',
                    fontWeight: 500
                  }}
                >
                  1-Click Instant Demo Launch:
                </div>
                <div
                  className="login-quick-launch-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.4rem'
                  }}
                >
                  {rolePortals.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={p.action}
                      style={{
                        padding: '0.45rem 0.3rem',
                        fontSize: '0.71875rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-beige)',
                        color: 'var(--charcoal-deep)',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-xs)',
                        transition: 'all 0.18s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--amber-soft)';
                        e.currentTarget.style.borderColor = 'var(--amber-primary)';
                        e.currentTarget.style.color = 'var(--amber-dark)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.borderColor = 'var(--border-beige)';
                        e.currentTarget.style.color = 'var(--charcoal-deep)';
                      }}
                      title={`Instant login to ${p.title}`}
                    >
                      {p.shortTitle} ↗
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Comprehensive Fluid Responsive Styling */}
      <style>{`
        @media (max-width: 920px) {
          .login-glass-card {
            grid-template-columns: 1fr !important;
            max-width: 540px !important;
            border-radius: 20px !important;
          }
          .login-image-frame {
            border-right: none !important;
            border-bottom: 1px solid var(--border-beige) !important;
            padding: 1rem !important;
          }
          .login-hero-img-box {
            height: 160px !important;
          }
          .login-trust-pillars {
            display: none !important;
          }
          .login-footnote {
            display: none !important;
          }
          .login-form-pane {
            padding: 1.5rem 1.25rem !important;
          }
        }

        @media (max-width: 480px) {
          .login-tabs-grid {
            gap: 0.25rem !important;
            padding: 0.25rem !important;
          }
          .login-quick-launch-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.4rem !important;
          }
          .login-form-pane {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};
