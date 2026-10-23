import React from 'react';
import { useFarm } from '../../context/FarmContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Activity,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Users,
  Truck,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

export const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { adminModule, setAdminModule, orders, inventory, setCurrentRole } = useFarm();

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;
  const lowStockCount = inventory.filter((i) => i.status === 'Low Stock').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart, badge: pendingOrdersCount, badgeType: 'amber' },
    { id: 'products', label: 'Products & Pricing', icon: Package },
    { id: 'inventory', label: 'Inventory & Cold Storage', icon: Layers, badge: lowStockCount, badgeType: 'red' },
    { id: 'batches', label: 'Poultry Batches / Flocks', icon: Activity },
    { id: 'purchases', label: 'Purchases & Feed Inflow', icon: ShoppingBag },
    { id: 'expenses', label: 'Operating Expenses', icon: CreditCard },
    { id: 'reports', label: 'Sales & Profit Reports', icon: BarChart3 },
    { id: 'customers', label: 'Customer Directory', icon: Users },
    { id: 'drivers', label: 'Driver Fleet Roster', icon: Truck },
    { id: 'delivery', label: 'Live Delivery Dispatch', icon: MapPin },
    { id: 'settings', label: 'Farm Settings & Rules', icon: Settings }
  ];

  const handleNavClick = (id) => {
    setAdminModule(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="hide-on-desktop"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 140
          }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--charcoal-deep)',
          color: 'var(--warm-ivory)',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          height: '100%',
          minHeight: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 150,
          transition: 'transform var(--transition-normal)'
        }}
        className={isMobileOpen ? 'sidebar-open' : 'sidebar-closed'}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.svg" alt="The Village Farm Logo" style={{ width: '36px', height: '36px' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.1 }}>
                The Village Farm
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--amber-primary)', fontWeight: 600, letterSpacing: '0.04em' }}>
                ADMIN CONSOLE
              </div>
            </div>
          </div>

          {setIsMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="hide-on-desktop btn-ghost"
              style={{ color: 'var(--white)', padding: '4px' }}
              aria-label="Close sidebar menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#77746D', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0.5rem 0.75rem' }}>
            Operations & Farm
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = adminModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? 'var(--amber-primary)' : 'transparent',
                  color: isActive ? 'var(--charcoal-deep)' : '#DDD6CC',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? 'var(--charcoal-deep)' : 'var(--amber-primary)'} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: item.badgeType === 'red' ? 'var(--error-red)' : 'var(--charcoal-deep)',
                      color: item.badgeType === 'red' ? 'var(--white)' : 'var(--amber-primary)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Farm Chiller & Bio-security Status */}
        <div
          style={{
            margin: '0.75rem',
            padding: '0.875rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', color: 'var(--success-green)', fontWeight: 600 }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--success-green)', display: 'inline-block' }} />
            <span>Farm Hub Active • 2.4°C Chilled</span>
          </div>
          <div style={{ color: '#888' }}>
            Biosecurity level optimal. Morning harvest completed.
          </div>
        </div>

        {/* Switch Role or Exit to Store */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--amber-primary)', color: 'var(--charcoal-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8125rem' }}>
              FA
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--white)' }}>Farm Owner</div>
              <div style={{ fontSize: '0.6875rem', color: '#888' }}>Super Administrator</div>
            </div>
          </div>

          <button
            onClick={() => setCurrentRole('customer')}
            className="btn-ghost"
            style={{ color: '#DDD6CC', padding: '6px' }}
            title="Go to Customer Store"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar-closed {
            position: fixed !important;
            top: 0;
            left: 0;
            bottom: 0;
            max-width: 85vw;
            width: 280px !important;
            transform: translateX(-100%);
            z-index: 1000;
          }
          .sidebar-open {
            position: fixed !important;
            top: 0;
            left: 0;
            bottom: 0;
            max-width: 85vw;
            width: 280px !important;
            transform: translateX(0);
            z-index: 1000;
            box-shadow: 0 0 30px rgba(0,0,0,0.5);
          }
        }
      `}</style>
    </>
  );
};
