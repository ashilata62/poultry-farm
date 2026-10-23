import React, { useEffect } from 'react';
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
  Store,
  X
} from 'lucide-react';

export const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { adminModule, setAdminModule, orders, inventory, setCurrentRole } = useFarm();

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;
  const lowStockCount = inventory.filter((i) => i.status === 'Low Stock').length;

  // Close sidebar on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen && setIsMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, setIsMobileOpen]);

  const navGroups = [
    {
      groupTitle: 'Main Management',
      items: [
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'orders', label: 'Order Management', icon: ShoppingCart, badge: pendingOrdersCount, badgeType: 'amber' },
        { id: 'products', label: 'Product Catalog & Cuts', icon: Package }
      ]
    },
    {
      groupTitle: 'Farm Operations',
      items: [
        { id: 'inventory', label: 'Inventory & Cold Storage', icon: Layers, badge: lowStockCount, badgeType: 'red' },
        { id: 'batches', label: 'Poultry Batches / Flocks', icon: Activity },
        { id: 'purchases', label: 'Purchases & Feed Inflow', icon: ShoppingBag },
        { id: 'expenses', label: 'Operating Expenses', icon: CreditCard }
      ]
    },
    {
      groupTitle: 'Commerce & Fleet',
      items: [
        { id: 'reports', label: 'Sales & Profit Reports', icon: BarChart3 },
        { id: 'customers', label: 'Customer Directory', icon: Users },
        { id: 'drivers', label: 'Driver Fleet Roster', icon: Truck },
        { id: 'delivery', label: 'Live Delivery Dispatch', icon: MapPin },
        { id: 'settings', label: 'Farm Settings & Rules', icon: Settings }
      ]
    }
  ];

  const handleNavClick = (id) => {
    setAdminModule(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Fullscreen Touch Backdrop Overlay on Mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          className="admin-sidebar-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100dvh',
            backgroundColor: 'rgba(12, 14, 13, 0.65)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            zIndex: 1100,
            cursor: 'pointer',
            transition: 'opacity 0.25s ease'
          }}
          aria-label="Close navigation sidebar overlay"
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
          zIndex: 1200,
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={isMobileOpen ? 'sidebar-open' : 'sidebar-closed'}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.125rem 1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src="/logo.svg"
              alt="The Village Farm Logo"
              style={{
                width: '38px',
                height: '38px',
                filter: 'drop-shadow(0 2px 6px rgba(242, 140, 40, 0.3))'
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--white)',
                  lineHeight: 1.15
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
                  textTransform: 'uppercase',
                  marginTop: '2px'
                }}
              >
                Admin Console
              </div>
            </div>
          </div>

          {/* Clean Circular Close Button on Mobile */}
          <button
            onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
            className="admin-close-btn"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Close sidebar menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Categorized Navigation List with Sleek Scrollbar */}
        <div
          className="admin-nav-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.75rem 0.625rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.15) transparent'
          }}
        >
          {navGroups.map((group, groupIdx) => (
            <div key={group.groupTitle} style={{ marginBottom: groupIdx < navGroups.length - 1 ? '0.75rem' : '0.25rem' }}>
              <div
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  color: '#8C887B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '0.5rem 0.625rem 0.25rem'
                }}
              >
                {group.groupTitle}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                {group.items.map((item) => {
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
                        padding: '0.625rem 0.8125rem',
                        borderRadius: '8px',
                        fontSize: '0.84375rem',
                        fontWeight: isActive ? 600 : 500,
                        backgroundColor: isActive ? 'var(--amber-primary)' : 'transparent',
                        color: isActive ? 'var(--charcoal-deep)' : '#DDD6CC',
                        boxShadow: isActive ? '0 3px 12px rgba(242, 140, 40, 0.35)' : 'none',
                        transition: 'all var(--transition-fast)',
                        textAlign: 'left',
                        width: '100%',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.color = '#FFFFFF';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#DDD6CC';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6875rem', minWidth: 0 }}>
                        <Icon
                          size={17}
                          color={isActive ? 'var(--charcoal-deep)' : 'var(--amber-primary)'}
                          style={{ flexShrink: 0 }}
                        />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.label}
                        </span>
                      </div>

                      {item.badge !== undefined && item.badge > 0 && (
                        <span
                          style={{
                            backgroundColor:
                              item.badgeType === 'red'
                                ? 'var(--error-red)'
                                : isActive
                                ? 'var(--charcoal-deep)'
                                : 'var(--amber-primary)',
                            color:
                              item.badgeType === 'red'
                                ? 'var(--white)'
                                : isActive
                                ? 'var(--amber-primary)'
                                : 'var(--charcoal-deep)',
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            padding: '1px 7px',
                            borderRadius: 'var(--radius-full)',
                            marginLeft: '0.5rem',
                            flexShrink: 0
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Live Farm Chiller & Bio-security Status Indicator */}
        <div
          style={{
            margin: '0.5rem 0.625rem',
            padding: '0.625rem 0.75rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            fontSize: '0.75rem',
            flexShrink: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--success-green)',
              fontWeight: 600,
              fontSize: '0.75rem',
              marginBottom: '0.2rem'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-green)',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.7)',
                display: 'inline-block'
              }}
            />
            <span>Farm Hub Active • 2.4°C Chilled</span>
          </div>
          <div style={{ color: '#8E8A80', fontSize: '0.6875rem', paddingLeft: '1.05rem' }}>
            Biosecurity optimal • Morning harvest ready
          </div>
        </div>

        {/* Switch Role or Exit to Store Footer */}
        <div
          style={{
            padding: '0.875rem 1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--amber-primary)',
                color: 'var(--charcoal-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8125rem'
              }}
            >
              FA
            </div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--white)' }}>
                Farm Owner
              </div>
              <div style={{ fontSize: '0.6875rem', color: '#9CA3AF' }}>Super Administrator</div>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentRole('customer');
              if (setIsMobileOpen) setIsMobileOpen(false);
            }}
            className="btn-ghost"
            style={{
              color: '#DDD6CC',
              padding: '6px 8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Preview Customer Online Store"
          >
            <Store size={14} color="var(--amber-primary)" />
            <span>Store</span>
          </button>
        </div>
      </aside>

      <style>{`
        /* Custom sleek scrollbar for navigation */
        .admin-nav-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .admin-nav-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-nav-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        .admin-nav-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Desktop Sidebar View */
        @media (min-width: 1025px) {
          .admin-sidebar-backdrop {
            display: none !important;
          }
          .admin-close-btn {
            display: none !important;
          }
          .sidebar-closed,
          .sidebar-open {
            position: sticky !important;
            transform: none !important;
            box-shadow: none !important;
          }
        }

        /* Mobile / Tablet Drawer View */
        @media (max-width: 1024px) {
          .admin-close-btn {
            display: flex !important;
          }
          .admin-close-btn:hover {
            background-color: rgba(255, 255, 255, 0.18) !important;
          }

          .sidebar-closed {
            position: fixed !important;
            top: 0;
            left: 0;
            bottom: 0;
            height: 100dvh !important;
            max-height: 100dvh !important;
            width: min(320px, 86vw) !important;
            transform: translateX(-100%) !important;
            z-index: 1200 !important;
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }

          .sidebar-open {
            position: fixed !important;
            top: 0;
            left: 0;
            bottom: 0;
            height: 100dvh !important;
            max-height: 100dvh !important;
            width: min(320px, 86vw) !important;
            transform: translateX(0) !important;
            z-index: 1200 !important;
            border-top-right-radius: 20px !important;
            border-bottom-right-radius: 20px !important;
            box-shadow: 12px 0 40px rgba(0, 0, 0, 0.65) !important;
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
        }
      `}</style>
    </>
  );
};
