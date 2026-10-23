import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { Menu, Plus, RefreshCw, Store, Smartphone, MapPin } from 'lucide-react';

export const AdminHeader = ({ title, subtitle, onToggleMobileSidebar, extraActions }) => {
  const { setCurrentRole, setCustomerView } = useFarm();

  return (
    <header
      style={{
        minHeight: '56px',
        backgroundColor: 'var(--white)',
        borderBottom: '1px solid var(--border-beige)',
        padding: '0.625rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        gap: '0.75rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0, flex: 1 }}>
        <button
          onClick={onToggleMobileSidebar}
          className="hide-on-desktop btn-ghost"
          style={{
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--soft-cream)',
            border: '1px solid var(--border-beige)',
            flexShrink: 0
          }}
          aria-label="Open sidebar"
        >
          <Menu size={20} color="var(--charcoal)" />
        </button>

        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
              color: 'var(--charcoal)',
              margin: 0,
              lineHeight: 1.25,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            title={title}
          >
            {title}
          </h2>
          {subtitle && (
            <div
              className="hide-on-mobile"
              style={{
                fontSize: '0.75rem',
                color: 'var(--muted-text)',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        {extraActions}

        <button
          onClick={() => setCurrentRole('delivery')}
          className="btn btn-secondary btn-sm hide-on-mobile"
          title="Open Two-Panel Delivery Dispatch & Map"
        >
          <MapPin size={14} />
          <span>Dispatch Map</span>
        </button>

        <button
          onClick={() => {
            setCurrentRole('customer');
            setCustomerView('shop');
          }}
          className="btn btn-secondary btn-sm"
          title="Preview Customer Store"
          style={{ padding: '0.4rem 0.65rem' }}
        >
          <Store size={15} />
          <span className="hide-on-mobile">Store</span>
        </button>
      </div>
    </header>
  );
};
