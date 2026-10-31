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
  Feather,
  CheckCircle2,
  MapPin,
  Shield
} from 'lucide-react';

export const LoginPage = () => {
  const {
    setCurrentRole,
    setCustomerView,
    setAdminModule,
    orders,
    showToast,
    setDriverSource
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
      badgeColor: 'badge-red',
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
      badgeColor: 'badge-red',
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
        if (setDriverSource) setDriverSource('login');
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
        backgroundColor: '#0F1211',
        overflow: 'hidden'
      }}
    >
      {/* Deep Charcoal & Crimson Ambient Scrim Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 18% 22%, rgba(209, 18, 67, 0.22) 0%, transparent 52%), radial-gradient(ellipse at 82% 78%, rgba(209, 18, 67, 0.14) 0%, transparent 58%), linear-gradient(135deg, rgba(12, 14, 13, 0.92) 0%, rgba(18, 22, 20, 0.86) 50%, rgba(14, 16, 15, 0.94) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Floating Crimson Ambient Glow Orb Top-Left */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '8%',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(209, 18, 67, 0.20) 0%, rgba(209, 18, 67, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(60px)'
        }}
      />

      {/* Floating Crimson Ambient Glow Orb Bottom-Right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-90px',
          right: '6%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(209, 18, 67, 0.16) 0%, rgba(209, 18, 67, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(65px)'
        }}
      />

      {/* Top Navigation Bar */}
      <header
        style={{
          height: '56px',
          flexShrink: 0,
          backgroundColor: 'rgba(15, 18, 16, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.10)',
          padding: '0 1.5rem',
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
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          title="Return to Customer Store"
        >
          <img
            src="/logo.svg"
            alt="The Village Farm Logo"
            style={{ width: '34px', height: '34px', filter: 'drop-shadow(0 2px 10px rgba(209, 18, 67, 0.4))' }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.125rem',
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
                fontSize: '0.625rem',
                color: '#D11243',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span
            className="hide-on-mobile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.75rem',
              color: '#34D399',
              fontWeight: 600,
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.28)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 10px #10B981'
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
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '10px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(209, 18, 67, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(209, 18, 67, 0.45)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Store</span>
          </button>
        </div>
      </header>

      {/* Main Centered Master Card Area */}
      <main
        className="login-main-container"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1rem',
          position: 'relative',
          zIndex: 10,
          overflow: 'hidden'
        }}
      >
        {/* Master Card Container */}
        <div
          className="login-glass-card"
          style={{
            width: '100%',
            maxWidth: '980px',
            maxHeight: 'calc(100vh - 78px)',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow:
              '0 28px 70px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12), 0 12px 36px rgba(209, 18, 67, 0.15)',
            borderRadius: '24px',
            display: 'grid',
            gridTemplateColumns: '375px 1fr',
            overflow: 'hidden'
          }}
        >
          {/* LEFT COLUMN: Fresh Cut Chicken Showcase Pane */}
          <div
            className="login-image-frame"
            style={{
              padding: '1.25rem',
              backgroundColor: '#131614',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              background: 'linear-gradient(180deg, #161A18 0%, #101311 100%)'
            }}
          >
            {/* Top Showcase Image Card */}
            <div>
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 10px 28px rgba(0, 0, 0, 0.6)'
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
                    background:
                      'linear-gradient(to top, rgba(14, 16, 15, 0.90) 0%, rgba(14, 16, 15, 0.2) 60%, rgba(14, 16, 15, 0.4) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Top Badge: 100% Organic */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: 'rgba(15, 18, 16, 0.85)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '9999px',
                    padding: '3px 9px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      boxShadow: '0 0 6px #10B981'
                    }}
                  />
                  <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>
                    100% ORGANIC & FRESH
                  </span>
                </div>

                {/* Status pill over image bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(18, 22, 20, 0.90)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    padding: '7px 12px',
                    borderRadius: '12px',
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
                        backgroundColor: '#D11243',
                        boxShadow: '0 0 8px #D11243'
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF' }}>
                      Ethical Pasture Farm
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: '#FF6B8B',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      backgroundColor: 'rgba(209, 18, 67, 0.18)',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(209, 18, 67, 0.3)'
                    }}
                  >
                    0-4°C Cold Chain
                  </span>
                </div>
              </div>

              {/* Farm Trust Pillars with Frosted Modern Glass Accents */}
              <div
                style={{
                  marginTop: '0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                {/* Pillar 1 */}
                <div
                  style={{
                    padding: '0.55rem 0.75rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(16, 185, 129, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Feather size={15} color="#34D399" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25 }}>
                      Free-Range Country Pastures
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#9CA3AF', marginTop: '1px' }}>
                      4 Active sheds, natural sunlight & non-GMO grains
                    </div>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div
                  style={{
                    padding: '0.55rem 0.75rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(6, 182, 212, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Thermometer size={15} color="#38BDF8" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25 }}>
                      Strict 2.4°C Chilled Cold-Chain
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#9CA3AF', marginTop: '1px' }}>
                      Zero freezing, preserved tenderness & hygiene
                    </div>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div
                  style={{
                    padding: '0.55rem 0.75rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(209, 18, 67, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Award size={15} color="#FF6B8B" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25 }}>
                      No Antibiotics or Hormones
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#9CA3AF', marginTop: '1px' }}>
                      Daily farm biosecurity & veterinary verification
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Location Footnote */}
            <div
              style={{
                fontSize: '0.6875rem',
                color: '#9CA3AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                paddingTop: '0.65rem',
                marginTop: '0.65rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <MapPin size={12} color="#D11243" />
              <span>The Village Farm Hub • Varthur Hobli, Bengaluru</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Multi-Role Modern Form Pane */}
          <div
            className="login-form-pane"
            style={{
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF'
            }}
          >
            {/* Header Titles */}
            <div style={{ marginBottom: '0.85rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#FFF1F3',
                  color: '#D11243',
                  border: '1px solid #FFE4E8',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  marginBottom: '0.45rem',
                  letterSpacing: '0.04em'
                }}
              >
                <Sparkles size={12} color="#D11243" />
                <span>Unified Enterprise Gateway</span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}
              >
                Sign In to Dashboard
              </h1>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '4px 0 0' }}>
                Select your operational console to authenticate into your session
              </p>
            </div>

            {/* 4 Dashboard Selector Modern Segmented Tabs */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.4rem',
                  backgroundColor: '#F3F4F6',
                  padding: '0.35rem',
                  borderRadius: '14px',
                  border: '1px solid #E5E7EB'
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
                      className="login-role-btn"
                      style={{
                        padding: '0.5rem 0.35rem',
                        borderRadius: '10px',
                        border: isSelected
                          ? '1.5px solid #D11243'
                          : '1px solid transparent',
                        backgroundColor: isSelected
                          ? '#FFFFFF'
                          : 'transparent',
                        color: isSelected ? '#D11243' : '#4B5563',
                        boxShadow: isSelected
                          ? '0 3px 10px rgba(209, 18, 67, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)'
                          : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                      title={portal.title}
                    >
                      <IconComponent
                        size={17}
                        color={isSelected ? '#D11243' : '#6B7280'}
                      />
                      <span
                        className="login-role-label"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: isSelected ? 700 : 600,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {portal.shortTitle}
                      </span>

                      {/* Optional micro notification dot/count */}
                      {portal.extraBadge && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-4px',
                            right: '-4px',
                            backgroundColor: '#D11243',
                            color: '#FFFFFF',
                            fontSize: '0.5625rem',
                            fontWeight: 700,
                            padding: '1px 5px',
                            borderRadius: '9999px',
                            boxShadow: '0 2px 5px rgba(209, 18, 67, 0.4)'
                          }}
                        >
                          {portal.extraBadge.split(' ')[0]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Portal Summary Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #FFF8F9 0%, #FFFFFF 100%)',
                border: '1px solid #FCD5DC',
                boxShadow: '0 2px 8px rgba(209, 18, 67, 0.06)',
                borderRadius: '12px',
                padding: '0.55rem 0.85rem',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #D11243 0%, #B70E3A 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 3px 8px rgba(209, 18, 67, 0.3)'
                  }}
                >
                  <currentPortal.icon size={17} color="#FFFFFF" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#111827',
                      lineHeight: 1.2
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
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  backgroundColor: '#FFF1F3',
                  color: '#D11243',
                  border: '1px solid #FCD5DC'
                }}
              >
                {currentPortal.roleBadge}
              </span>
            </div>

            {/* Login Form Fields */}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Enterprise Email */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78125rem',
                    fontWeight: 600,
                    color: '#1F2937',
                    marginBottom: '0.25rem'
                  }}
                >
                  Enterprise Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9CA3AF'
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      paddingLeft: '2.4rem',
                      height: '42px',
                      fontSize: '0.84375rem',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      color: '#111827',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = '#FFFFFF';
                      e.target.style.borderColor = '#D11243';
                      e.target.style.boxShadow = '0 0 0 3px rgba(209, 18, 67, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = '#F9FAFB';
                      e.target.style.borderColor = '#E5E7EB';
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
                    marginBottom: '0.25rem'
                  }}
                >
                  <label style={{ fontSize: '0.78125rem', fontWeight: 600, color: '#1F2937' }}>
                    Password
                  </label>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: '#D11243',
                      backgroundColor: '#FFF1F3',
                      border: '1px solid #FFE4E8',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      letterSpacing: '0.02em'
                    }}
                  >
                    Demo Autofilled
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9CA3AF'
                    }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      paddingLeft: '2.4rem',
                      paddingRight: '2.5rem',
                      height: '42px',
                      fontSize: '0.84375rem',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      color: '#111827',
                      outline: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.backgroundColor = '#FFFFFF';
                      e.target.style.borderColor = '#D11243';
                      e.target.style.boxShadow = '0 0 0 3px rgba(209, 18, 67, 0.12)';
                    }}
                    onBlur={(e) => {
                      e.target.style.backgroundColor = '#F9FAFB';
                      e.target.style.borderColor = '#E5E7EB';
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
                      color: '#9CA3AF',
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
                  fontSize: '0.75rem',
                  padding: '2px 0'
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer',
                    color: '#4B5563'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: '#D11243', cursor: 'pointer', width: '15px', height: '15px' }}
                  />
                  <span>Remember session</span>
                </label>
                <span
                  style={{
                    color: '#6B7280',
                    fontSize: '0.6875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ShieldCheck size={13} color="#10B981" />
                  <span>SSL 256-Bit Encrypted</span>
                </span>
              </div>

              {/* Primary Sign In Button */}
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
                  background: 'linear-gradient(135deg, #D11243 0%, #B70E3A 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 6px 20px rgba(209, 18, 67, 0.35)',
                  cursor: 'pointer',
                  marginTop: '0.4rem',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.01em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(209, 18, 67, 0.48)';
                  e.currentTarget.style.filter = 'brightness(1.05)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(209, 18, 67, 0.35)';
                  e.currentTarget.style.filter = 'none';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <ShieldCheck size={18} />
                <span>Sign In as {currentPortal.title}</span>
                <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Responsive Styling */}
      <style>{`
        @media (max-width: 920px), (max-height: 720px) {
          .login-main-container {
            overflow-y: auto !important;
            align-items: flex-start !important;
            padding: 1rem !important;
          }
          .login-glass-card {
            grid-template-columns: 1fr !important;
            border-radius: 20px !important;
            max-height: none !important;
            height: auto !important;
            overflow: visible !important;
          }
          .login-image-frame {
            display: none !important;
          }
          .login-form-pane {
            padding: 1.5rem 1.25rem !important;
          }
        }

        @media (max-width: 480px) {
          .login-role-btn {
            padding: 0.4rem 0.2rem !important;
          }
          .login-role-label {
            font-size: 0.6875rem !important;
          }
          .login-form-pane {
            padding: 1.25rem 0.875rem !important;
          }
        }
      `}</style>
    </div>
  );
};
