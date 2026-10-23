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
  Check
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
        backgroundColor: '#F5EFE6',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Subtle organic background glow accents (behind the glass card so glassmorphism is visible) */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242, 140, 40, 0.15) 0%, rgba(242, 140, 40, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '15%',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 117, 34, 0.12) 0%, rgba(200, 117, 34, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Static Top Header Bar */}
      <header
        style={{
          height: '52px',
          flexShrink: 0,
          backgroundColor: 'rgba(255, 252, 247, 0.94)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border-beige)',
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
        >
          <img src="/logo.svg" alt="The Village Farm Logo" style={{ width: '32px', height: '32px' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.1 }}>
              The Village Farm
            </div>
            <div style={{ fontSize: '0.625rem', color: 'var(--amber-dark)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Organic & Free-Range
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            className="hide-on-mobile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              color: 'var(--success-green)',
              fontWeight: 600,
              backgroundColor: 'var(--success-bg)',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success-green)' }} />
            4 Portals Online
          </span>

          <button
            onClick={handleReturnToStore}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, padding: '0.35rem 0.75rem', fontSize: '0.78125rem' }}
          >
            <ArrowLeft size={14} />
            <span>Back to Store</span>
          </button>
        </div>
      </header>

      {/* Main Center Area: Static, Centered, No Scroll */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 1.25rem',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden'
        }}
      >
        {/* Glassmorphic Master Login Card (Glassmorphism applied here!) */}
        <div
          className="login-glass-card"
          style={{
            width: '100%',
            maxWidth: '960px',
            maxHeight: 'calc(100vh - 76px)',
            backgroundColor: 'rgba(255, 255, 255, 0.76)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 24px 48px -12px rgba(41, 43, 42, 0.12), 0 4px 16px rgba(41, 43, 42, 0.04)',
            borderRadius: '24px',
            display: 'grid',
            gridTemplateColumns: '400px 1fr',
            overflow: 'hidden'
          }}
        >
          {/* LEFT SIDE: Properly Sized, Framed Image */}
          <div
            className="login-image-frame"
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(240, 232, 222, 0.4)',
              borderRight: '1px solid rgba(232, 222, 208, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '480px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                position: 'relative'
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
              {/* Subtle warm overlay vignette at corners */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)',
                  pointerEvents: 'none'
                }}
              />
              {/* Bottom caption pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  padding: '6px 12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--amber-primary)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                    Ethical Pasture Farm
                  </span>
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--amber-dark)', fontWeight: 600 }}>
                  0-4°C Cold Chain
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Compact, Elegant Login Form (Zero Scroll) */}
          <div
            className="login-form-pane"
            style={{
              padding: '1.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflowY: 'auto'
            }}
          >
            {/* Header Titles */}
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: 'var(--amber-soft)',
                  color: 'var(--amber-dark)',
                  border: '1px solid var(--amber-light)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  marginBottom: '0.4rem'
                }}
              >
                <Sparkles size={12} />
                <span>Unified Enterprise Gateway</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  color: 'var(--charcoal-deep)',
                  lineHeight: 1.15,
                  margin: 0
                }}
              >
                Sign In to Dashboard
              </h1>
              <p style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', margin: '3px 0 0' }}>
                Select your portal to authenticate into your operational console
              </p>
            </div>

            {/* 4 Dashboard Selector Tabs */}
            <div style={{ marginBottom: '0.9rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.35rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '0.3rem',
                  borderRadius: 'var(--radius-md)',
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
                        padding: '0.45rem 0.25rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1.5px solid var(--amber-primary)' : '1px solid transparent',
                        backgroundColor: isSelected ? 'var(--amber-soft)' : 'transparent',
                        color: isSelected ? 'var(--amber-dark)' : 'var(--charcoal)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.2rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      title={portal.title}
                    >
                      <IconComponent size={16} color={isSelected ? 'var(--amber-dark)' : 'var(--muted-text)'} />
                      <span style={{ fontSize: '0.71875rem', fontWeight: isSelected ? 700 : 500, whiteSpace: 'nowrap' }}>
                        {portal.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compact Active Portal Summary Bar */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid var(--border-beige)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem 0.75rem',
                marginBottom: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--amber-soft)',
                    color: 'var(--amber-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <currentPortal.icon size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--charcoal-deep)', lineHeight: 1.1 }}>
                    {currentPortal.title}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>
                    {currentPortal.tagline}
                  </div>
                </div>
              </div>

              <span className={`badge ${currentPortal.badgeColor}`} style={{ fontSize: '0.625rem', padding: '2px 7px' }}>
                {currentPortal.roleBadge}
              </span>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '0.2rem' }}>
                  Enterprise Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={14}
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '2.1rem', height: '36px', fontSize: '0.8125rem' }}
                    placeholder="name@thevillagefarm.in"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                    Password
                  </label>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--amber-dark)', fontWeight: 600 }}>
                    Demo Autofilled
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={14}
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '2.1rem', paddingRight: '2.2rem', height: '36px', fontSize: '0.8125rem' }}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--muted-text)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: 'var(--charcoal)' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--amber-primary)', cursor: 'pointer' }}
                  />
                  <span>Remember session</span>
                </label>
                <span style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>
                  SSL 256-Bit
                </span>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                style={{
                  height: '40px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '0.2rem'
                }}
              >
                <ShieldCheck size={16} />
                <span>Sign In as {currentPortal.title}</span>
                <ArrowRight size={14} />
              </button>

              {/* 1-Click Direct Launch Shortcuts */}
              <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(232, 222, 208, 0.6)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', marginBottom: '0.35rem' }}>
                  1-Click Instant Demo Launch:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.3rem' }}>
                  {rolePortals.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={p.action}
                      className="btn-ghost"
                      style={{
                        padding: '0.3rem 0.2rem',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid var(--border-beige)',
                        color: 'var(--charcoal)'
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

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .login-glass-card {
            grid-template-columns: 1fr !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          .login-image-frame {
            display: none !important;
          }
          .login-form-pane {
            padding: 1.5rem 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};
