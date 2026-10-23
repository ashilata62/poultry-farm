import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { Store, LayoutDashboard, Truck, Smartphone, RotateCcw, QrCode } from 'lucide-react';

export const PortalBar = () => {
  const { currentRole, setCurrentRole, resetToDemoData, setIsQrModalOpen, orders } = useFarm();

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;
  const inTransitCount = orders.filter((o) => o.orderStatus === 'in_transit').length;

  return (
    <aside className="portal-bar" aria-label="Role and System Navigator">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontWeight: 600, color: 'var(--amber-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--amber-primary)' }}></span>
          The Village Farm
        </span>
        <span className="hide-on-mobile" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
        <span className="hide-on-mobile" style={{ color: 'var(--border-beige)' }}>
          System Switcher:
        </span>
      </div>

      <nav className="portal-tabs" aria-label="Role Switcher Navigation">
        <button
          className={`portal-btn ${currentRole === 'customer' ? 'active' : ''}`}
          onClick={() => setCurrentRole('customer')}
          title="Customer Website & Online Store"
        >
          <Store size={14} />
          <span>Customer Store</span>
        </button>

        <button
          className={`portal-btn ${currentRole === 'admin' ? 'active' : ''}`}
          onClick={() => setCurrentRole('admin')}
          title="Poultry Farm Operations & Management Dashboard"
        >
          <LayoutDashboard size={14} />
          <span>Farm Admin</span>
          {pendingOrdersCount > 0 && (
            <span
              style={{
                background: currentRole === 'admin' ? 'var(--charcoal-deep)' : 'var(--amber-primary)',
                color: currentRole === 'admin' ? 'var(--amber-primary)' : 'var(--charcoal-deep)',
                padding: '1px 6px',
                borderRadius: '10px',
                fontSize: '0.6875rem',
                fontWeight: 700
              }}
            >
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          className={`portal-btn ${currentRole === 'delivery' ? 'active' : ''}`}
          onClick={() => setCurrentRole('delivery')}
          title="Two-Panel Delivery Dispatch & Live Tracking"
        >
          <Truck size={14} />
          <span>Dispatch & Map</span>
          {inTransitCount > 0 && (
            <span
              style={{
                background: currentRole === 'delivery' ? 'var(--charcoal-deep)' : 'var(--amber-primary)',
                color: currentRole === 'delivery' ? 'var(--amber-primary)' : 'var(--charcoal-deep)',
                padding: '1px 6px',
                borderRadius: '10px',
                fontSize: '0.6875rem',
                fontWeight: 700
              }}
            >
              {inTransitCount}
            </span>
          )}
        </button>

        <button
          className={`portal-btn ${currentRole === 'driver' ? 'active' : ''}`}
          onClick={() => setCurrentRole('driver')}
          title="Driver Mobile Delivery Portal"
        >
          <Smartphone size={14} />
          <span>Driver App</span>
        </button>

        <button
          className="portal-btn"
          onClick={() => setIsQrModalOpen(true)}
          title="Scan QR Code to Order on Mobile"
        >
          <QrCode size={14} />
          <span>Scan QR</span>
        </button>

        <button
          className="portal-btn"
          onClick={resetToDemoData}
          title="Reset all orders, stock, and records to initial demo state"
          style={{ opacity: 0.8 }}
        >
          <RotateCcw size={13} />
          <span>Reset Demo</span>
        </button>
      </nav>
    </aside>
  );
};
