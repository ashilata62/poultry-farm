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
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: "url('/images/farm_hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#141615',
        overflow: 'hidden'
      }}
    >
      {/* Deep Charcoal & Warm Amber Ambient Glassmorphic Scrim Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 20% 25%, rgba(242, 140, 40, 0.28) 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(217, 119, 6, 0.22) 0%, transparent 60%), linear-gradient(135deg, rgba(16, 18, 17, 0.88) 0%, rgba(22, 25, 23, 0.82) 48%, rgba(18, 20, 19, 0.92) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Floating Amber Glowing Orb Top-Left */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          left: '10%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242, 140, 40, 0.24) 0%, rgba(242, 140, 40, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(45px)'
        }}
      />

      {/* Floating Amber Glowing Orb Bottom-Right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          right: '8%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 117, 34, 0.20) 0%, rgba(200, 117, 34, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(50px)'
        }}
      />

      {/* Top Glassmorphic Navigation Bar */}
      <header
        style={{
          height: '52px',
          flexShrink: 0,
          backgroundColor: 'rgba(20, 23, 21, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 20
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={handleReturnToStore}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
          title="Return to Customer Store"
        >
          <img
            src="/logo.svg"
            alt="The Village Farm Logo"
            style={{ width: '32px', height: '32px', filter: 'drop-shadow(0 2px 8px rgba(242, 140, 40, 0.45))' }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '0.01em'
              }}
            >
              The Village Farm
            </div>
            <div
              style={{
                fontSize: '0.6rem',
                color: 'var(--amber-primary)',
                fontWeight: 700,
                letterSpacing: '0.07em',
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
              gap: '0.4rem',
              fontSize: '0.71875rem',
              color: '#4ADE80',
              fontWeight: 600,
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              padding: '0.2rem 0.7rem',
              borderRadius: 'var(--radius-full)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#22C55E',
                boxShadow: '0 0 8px #22C55E'
              }}
            />
            4 Portals Online
          </span>

          <button
            onClick={handleReturnToStore}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 600,
              padding: '0.4rem 0.85rem',
              fontSize: '0.78125rem',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'background-color 0.2s ease, border-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.32)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Store</span>
          </button>
        </div>
      </header>

      {/* Main Centered Master Glassmorphic Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden'
        }}
      >
        {/* Master Glassmorphic Card Container */}
        <div
          className="login-glass-card"
          style={{
            width: '100%',
            maxWidth: '960px',
            maxHeight: 'calc(100vh - 70px)',
            backgroundColor: 'rgba(26, 29, 28, 0.78)',
            backdropFilter: 'blur(30px) saturate(190%)',
            WebkitBackdropFilter: 'blur(30px) saturate(190%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow:
              '0 24px 60px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(242, 140, 40, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
            borderRadius: '20px',
            display: 'grid',
            gridTemplateColumns: '370px 1fr',
            overflow: 'hidden'
          }}
        >
          {/* LEFT COLUMN: Fresh Cut Chicken Showcase Frame (Matching Reference) */}
          <div
            className="login-image-frame"
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(15, 17, 16, 0.50)',
              borderRight: '1px solid rgba(255, 255, 255, 0.10)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {/* Top Showcase Image Card with Reference Bottom Pill */}
            <div
              style={{
                width: '100%',
                height: '195px',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
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
              {/* Subtle dark vignette */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 18, 17, 0.85) 0%, rgba(16, 18, 17, 0.1) 60%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Status pill over image (Exact matching reference style) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(20, 23, 21, 0.88)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '6px 10px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--amber-primary)',
                      boxShadow: '0 0 8px var(--amber-primary)'
                    }}
                  />
                  <span style={{ fontSize: '0.71875rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Ethical Pasture Farm
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--amber-primary)',
                    fontWeight: 700,
                    letterSpacing: '0.02em'
                  }}
                >
                  0-4°C Cold Chain
                </span>
              </div>
            </div>

            {/* Farm Trust Pillars with Frosted Accents */}
            <div
              style={{
                marginTop: '0.65rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem'
              }}
            >
              <div
                style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    backgroundColor: 'rgba(242, 140, 40, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Feather size={14} color="var(--amber-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                    Free-Range Country Pastures
                  </div>
                  <div style={{ fontSize: '0.65625rem', color: '#9CA3AF' }}>
                    4 Active sheds, natural sunlight & non-GMO grains
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    backgroundColor: 'rgba(34, 197, 94, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Thermometer size={14} color="#4ADE80" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                    Strict 2.4°C Chilled Cold-Chain
                  </div>
                  <div style={{ fontSize: '0.65625rem', color: '#9CA3AF' }}>
                    Zero freezing, preserved tenderness & hygiene
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    backgroundColor: 'rgba(242, 140, 40, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Award size={14} color="var(--amber-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                    No Antibiotics or Hormones
                  </div>
                  <div style={{ fontSize: '0.65625rem', color: '#9CA3AF' }}>
                    Daily farm biosecurity & veterinary verification
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Location Footnote */}
            <div
              style={{
                fontSize: '0.65625rem',
                color: '#8A857B',
                textAlign: 'center',
                paddingTop: '0.45rem',
                marginTop: '0.45rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              The Village Farm Hub • Varthur Hobli, Bengaluru
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Multi-Role Glassmorphic Form Pane */}
          <div
            className="login-form-pane"
            style={{
              padding: '1.15rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#FFFCF7',
              borderLeft: '1px solid rgba(0, 0, 0, 0.08)'
            }}
          >
            {/* Header Titles */}
            <div style={{ marginBottom: '0.7rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: 'rgba(242, 140, 40, 0.12)',
                  color: '#C05621',
                  border: '1px solid rgba(242, 140, 40, 0.35)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  marginBottom: '0.35rem',
                  letterSpacing: '0.04em'
                }}
              >
                <Sparkles size={12} color="#C05621" />
                <span>Unified Enterprise Gateway</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#1A1C1B',
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}
              >
                Sign In to Dashboard
              </h1>
              <p style={{ fontSize: '0.8125rem', color: '#5C6460', margin: '3px 0 0' }}>
                Select your operational console to authenticate into your session
              </p>
            </div>

            {/* 4 Dashboard Selector Glassmorphic Tabs */}
            <div style={{ marginBottom: '0.65rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.35rem',
                  backgroundColor: '#F0ECE4',
                  padding: '0.35rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 0, 0, 0.06)'
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
                        padding: '0.45rem 0.25rem',
                        borderRadius: '9px',
                        border: isSelected
                          ? '1.5px solid var(--amber-primary)'
                          : '1px solid transparent',
                        backgroundColor: isSelected
                          ? '#FFFFFF'
                          : 'transparent',
                        color: isSelected ? 'var(--amber-primary)' : '#52525B',
                        boxShadow: isSelected ? '0 2px 8px rgba(242, 140, 40, 0.20), 0 1px 3px rgba(0, 0, 0, 0.06)' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'
                      }}
                      title={portal.title}
                    >
                      <IconComponent
                        size={16}
                        color={isSelected ? 'var(--amber-primary)' : '#6B7280'}
                      />
                      <span
                        style={{
                          fontSize: '0.71875rem',
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

            {/* Active Portal Summary Glass Bar (Exact reference style) */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                borderRadius: '11px',
                padding: '0.5rem 0.75rem',
                marginBottom: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(242, 140, 40, 0.14)',
                    color: 'var(--amber-primary)',
                    border: '1px solid rgba(242, 140, 40, 0.30)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <currentPortal.icon size={16} color="var(--amber-primary)" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.84375rem',
                      fontWeight: 700,
                      color: '#1A1C1B',
                      lineHeight: 1.15
                    }}
                  >
                    {currentPortal.title}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#6B7280' }}>
                    {currentPortal.tagline}
                  </div>
                </div>
              </div>

              <span
                className={`badge ${currentPortal.badgeColor}`}
                style={{ fontSize: '0.625rem', padding: '3px 8px', borderRadius: 'var(--radius-full)' }}
              >
                {currentPortal.roleBadge}
              </span>
            </div>

            {/* Login Form Fields */}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {/* Enterprise Email */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#2D312E',
                    marginBottom: '0.2rem'
                  }}
                >
                  Enterprise Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={14}
                    style={{
                      position: 'absolute',
                      left: '11px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6B7280'
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      paddingLeft: '2.2rem',
                      height: '36px',
                      fontSize: '0.8125rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D6D1C7',
                      borderRadius: '9px',
                      color: '#1A1C1B',
                      outline: 'none',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--amber-primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(242, 140, 40, 0.22)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#D6D1C7';
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
                    marginBottom: '0.2rem'
                  }}
                >
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2D312E' }}>
                    Password
                  </label>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--amber-primary)',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    Demo Autofilled
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={14}
                    style={{
                      position: 'absolute',
                      left: '11px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6B7280'
                    }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      paddingLeft: '2.2rem',
                      paddingRight: '2.4rem',
                      height: '36px',
                      fontSize: '0.8125rem',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D6D1C7',
                      borderRadius: '9px',
                      color: '#1A1C1B',
                      outline: 'none',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--amber-primary)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(242, 140, 40, 0.22)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#D6D1C7';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '11px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#6B7280',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember Session & Security Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.71875rem',
                  padding: '1px 0'
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    cursor: 'pointer',
                    color: '#374151'
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
                    color: '#6B7280',
                    fontSize: '0.6875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <Lock size={11} color="var(--amber-primary)" />
                  <span>SSL 256-Bit</span>
                </span>
              </div>

              {/* Primary Glassmorphic Sign In Button (Rock-solid static, zero jump) */}
              <button
                type="submit"
                style={{
                  height: '42px',
                  fontSize: '0.90625rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, #F28C28 0%, #D97706 100%)',
                  color: '#1A1C1B',
                  border: 'none',
                  borderRadius: '10px',
                  boxShadow: '0 6px 20px rgba(242, 140, 40, 0.40)',
                  cursor: 'pointer',
                  marginTop: '0.35rem',
                  transition: 'box-shadow 0.2s ease, filter 0.2s ease',
                  letterSpacing: '0.01em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(242, 140, 40, 0.55)';
                  e.currentTarget.style.filter = 'brightness(1.05)';
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
            </form>
          </div>
        </div>
      </main>

      {/* Responsive Glassmorphism Styling */}
      <style>{`
        @media (max-width: 920px) {
          .login-glass-card {
            grid-template-columns: 1fr !important;
            border-radius: 18px !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          .login-image-frame {
            display: none !important;
          }
          .login-form-pane {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};
