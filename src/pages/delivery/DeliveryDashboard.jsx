import React, { useState, useMemo } from 'react';
import { useFarm } from '../../context/FarmContext';
import { OpenStreetMap } from '../../components/common/OpenStreetMap';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  MapPin,
  Truck,
  Phone,
  Search,
  CheckCircle2,
  Clock,
  Navigation,
  User,
  Thermometer,
  Package,
  Star,
  LogOut,
  Store,
  LayoutDashboard,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const DeliveryDashboard = () => {
  const {
    orders,
    drivers,
    assignDriver,
    updateOrderStatus,
    settings,
    currentRole,
    setCurrentRole,
    setCustomerView,
    setAdminModule,
    showToast
  } = useFarm();

  const [viewMode, setViewMode] = useState('map'); // 'map' | 'fleet'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | pending | assigned | in_transit | delivered | cancelled
  const [mobileTab, setMobileTab] = useState('list'); // 'list' | 'map'
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || 'TVF-84920');

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      let matchesStatus = true;
      if (statusFilter === 'pending') {
        matchesStatus = o.orderStatus === 'pending';
      } else if (statusFilter === 'assigned') {
        matchesStatus = (o.orderStatus === 'confirmed' || o.orderStatus === 'processing') && !!o.assignedDriverId;
      } else if (statusFilter === 'in_transit') {
        matchesStatus = o.orderStatus === 'in_transit';
      } else if (statusFilter === 'delivered') {
        matchesStatus = o.orderStatus === 'delivered';
      } else if (statusFilter === 'cancelled') {
        matchesStatus = o.orderStatus === 'cancelled';
      }

      const matchesSearch =
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.assignedDriverName.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchTerm]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || filteredOrders[0] || orders[0];

  const inTransitCount = orders.filter((o) => o.orderStatus === 'in_transit').length;
  const pendingCount = orders.filter((o) => o.orderStatus === 'pending').length;
  const deliveredCount = orders.filter((o) => o.orderStatus === 'delivered').length;
  const activeVansCount = drivers.filter((d) => d.status === 'On Route').length;
  const deliveredRevenue = orders
    .filter((o) => o.orderStatus === 'delivered')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const handleReturnToStore = () => {
    setCurrentRole('customer');
    setCustomerView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToAdmin = () => {
    setCurrentRole('admin');
    setAdminModule('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    setCurrentRole('login');
    if (showToast) showToast('Signed out of Dispatch Console');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--soft-cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. TOP DISPATCH HEADER (Shown when running as dedicated dispatch role) */}
      {currentRole === 'delivery' && (
        <header
          style={{
            backgroundColor: 'var(--charcoal-deep)',
            color: 'var(--white)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {/* Brand & Portal Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src="/logo.svg"
              alt="The Village Farm Logo"
              style={{ width: '32px', height: '32px', filter: 'drop-shadow(0 2px 6px rgba(242,140,40,0.4))' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--white)',
                    lineHeight: 1.2
                  }}
                >
                  The Village Farm
                </span>
                <span
                  className="badge badge-amber"
                  style={{ fontSize: '0.625rem', padding: '2px 6px', textTransform: 'uppercase' }}
                >
                  Dispatch Hub
                </span>
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--amber-primary)', fontWeight: 600 }}>
                Cold-Chain Logistics & Delivery Fleet Operations
              </div>
            </div>
          </div>

          {/* Hub Status & User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Live Station Status */}
            <span
              className="hide-on-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.71875rem',
                color: '#4ADE80',
                backgroundColor: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#22C55E',
                  boxShadow: '0 0 6px #22C55E'
                }}
              />
              Hub Online • Varthur Hobli
            </span>

            {/* Officer Profile Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                fontSize: '0.75rem',
                color: 'var(--white)'
              }}
            >
              <User size={13} color="var(--amber-primary)" />
              <span>Officer: Rajesh Sharma</span>
            </div>

            {/* Navigation Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                onClick={handleReturnToStore}
                className="hide-on-mobile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--white)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
                title="Go to Customer Storefront"
              >
                <Store size={13} />
                <span>Store</span>
              </button>

              <button
                onClick={handleSwitchToAdmin}
                className="hide-on-mobile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--white)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
                title="Open Farm Admin ERP"
              >
                <LayoutDashboard size={13} />
                <span>Admin ERP</span>
              </button>

              <button
                onClick={handleSignOut}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(239, 68, 68, 0.18)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
                title="Sign out of Dispatch Console"
              >
                <LogOut size={13} color="#F87171" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* 2. LOGISTICS KPI METRICS SUMMARY BAR */}
      <div
        style={{
          padding: '0.875rem 1.25rem 0',
          maxWidth: '1600px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem',
            marginBottom: '0.875rem'
          }}
        >
          {/* Metric 1: Scheduled Queue */}
          <div
            style={{
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-beige)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(242, 140, 40, 0.15)',
                color: 'var(--amber-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Package size={19} />
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', fontWeight: 600, textTransform: 'uppercase' }}>
                Delivery Queue
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.15 }}>
                {orders.length} Orders
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--amber-dark)', marginTop: '2px' }}>
                {inTransitCount} In-Transit • {pendingCount} Pending
              </div>
            </div>
          </div>

          {/* Metric 2: Active Cold Vans */}
          <div
            style={{
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-beige)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                color: 'var(--success-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Truck size={19} />
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', fontWeight: 600, textTransform: 'uppercase' }}>
                Refrigerated Vans
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.15 }}>
                {activeVansCount} on Road
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--success-green)', marginTop: '2px' }}>
                {drivers.length} Drivers in Bengaluru Fleet
              </div>
            </div>
          </div>

          {/* Metric 3: Cold-Chain Integrity */}
          <div
            style={{
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-beige)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(242, 140, 40, 0.15)',
                color: 'var(--amber-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Thermometer size={19} />
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', fontWeight: 600, textTransform: 'uppercase' }}>
                Cold-Chain Health
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.15 }}>
                2.4°C Chilled
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--success-green)', marginTop: '2px' }}>
                0-4°C Preserved • Zero Freezing
              </div>
            </div>
          </div>

          {/* Metric 4: Fulfilled Revenue */}
          <div
            style={{
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-beige)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                color: 'var(--success-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <CheckCircle2 size={19} />
            </div>
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', fontWeight: 600, textTransform: 'uppercase' }}>
                Fulfillment Status
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.15 }}>
                {deliveredCount} Delivered
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                ₹{deliveredRevenue.toLocaleString('en-IN')} revenue dispatched
              </div>
            </div>
          </div>
        </div>

        {/* 3. PRIMARY VIEW SWITCHER TABS: [ Live Map & Dispatch Queue ] vs [ Drivers & Fleet Roster ] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--border-beige)',
            paddingBottom: '0.5rem',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('map')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.84375rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                border: viewMode === 'map' ? '1px solid var(--charcoal-deep)' : '1px solid var(--border-beige)',
                backgroundColor: viewMode === 'map' ? 'var(--charcoal-deep)' : 'var(--white)',
                color: viewMode === 'map' ? 'var(--amber-primary)' : 'var(--charcoal)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Navigation size={15} />
              <span>Live Map & Route Dispatch</span>
            </button>

            <button
              onClick={() => setViewMode('fleet')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.84375rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                border: viewMode === 'fleet' ? '1px solid var(--charcoal-deep)' : '1px solid var(--border-beige)',
                backgroundColor: viewMode === 'fleet' ? 'var(--charcoal-deep)' : 'var(--white)',
                color: viewMode === 'fleet' ? 'var(--amber-primary)' : 'var(--charcoal)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Truck size={15} />
              <span>Drivers & Fleet Roster ({drivers.length})</span>
            </button>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
            Serving: Indiranagar • Koramangala • Bellandur • Sarjapur • Whitefield
          </div>
        </div>
      </div>

      {/* VIEW A: DRIVERS & FLEET ROSTER (Who the dispatcher monitors and manages) */}
      {viewMode === 'fleet' && (
        <div style={{ padding: '0 1.25rem 2rem', maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1rem'
            }}
          >
            {drivers.map((driver) => {
              const assignedOrders = orders.filter((o) => o.assignedDriverId === driver.id);
              const activeCount = assignedOrders.filter(
                (o) => o.orderStatus === 'confirmed' || o.orderStatus === 'processing' || o.orderStatus === 'in_transit'
              ).length;

              return (
                <div
                  key={driver.id}
                  style={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--border-beige)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  {/* Driver Header */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(242, 140, 40, 0.15)',
                            color: 'var(--amber-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '1rem'
                          }}
                        >
                          {driver.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--charcoal)', lineHeight: 1.2 }}>
                            {driver.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                            {driver.vehicle}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`badge ${driver.status === 'On Route' ? 'badge-green' : 'badge-amber'}`}
                        style={{ fontSize: '0.6875rem' }}
                      >
                        {driver.status}
                      </span>
                    </div>

                    {/* Driver Telemetry Info */}
                    <div
                      style={{
                        padding: '0.65rem 0.85rem',
                        backgroundColor: 'var(--soft-cream)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        marginBottom: '0.85rem'
                      }}
                    >
                      <div>
                        <div style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Active Orders</div>
                        <div style={{ fontWeight: 700, color: 'var(--charcoal)', fontSize: '0.9375rem' }}>
                          {activeCount}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Completed Today</div>
                        <div style={{ fontWeight: 700, color: 'var(--success-green)', fontSize: '0.9375rem' }}>
                          {driver.completedToday || 0}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Rating</div>
                        <div style={{ fontWeight: 700, color: 'var(--charcoal)', fontSize: '0.9375rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                          <Star size={12} fill="var(--amber-primary)" color="var(--amber-primary)" />
                          <span>{driver.rating || 4.9}</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Location */}
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                      <MapPin size={13} color="var(--amber-dark)" />
                      <span><strong>Current GPS:</strong> {driver.currentLocation || 'Varthur Farm Hub Station'}</span>
                    </div>

                    {/* Assigned Orders List for this driver */}
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '0.4rem' }}>
                        Assigned Deliveries ({assignedOrders.length}):
                      </div>
                      {assignedOrders.length === 0 ? (
                        <div style={{ fontSize: '0.71875rem', color: 'var(--muted-text)', fontStyle: 'italic', padding: '0.5rem 0' }}>
                          No active orders currently assigned to this driver.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {assignedOrders.map((ord) => (
                            <div
                              key={ord.id}
                              style={{
                                padding: '0.45rem 0.65rem',
                                border: '1px solid var(--border-beige)',
                                borderRadius: 'var(--radius-xs)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.75rem',
                                backgroundColor: 'var(--white)'
                              }}
                            >
                              <div>
                                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{ord.id}</span>
                                <span style={{ color: 'var(--muted-text)', marginLeft: '6px' }}>{ord.customerName}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <StatusBadge status={ord.orderStatus} type="order" />
                                <strong style={{ color: 'var(--charcoal)' }}>₹{ord.total}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Driver Actions */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-beige)',
                      paddingTop: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem'
                    }}
                  >
                    <a
                      href={`tel:${driver.phone}`}
                      className="btn btn-secondary btn-sm"
                      style={{ gap: '0.35rem', fontSize: '0.75rem', flex: 1 }}
                    >
                      <Phone size={13} />
                      <span>Call Driver ({driver.phone})</span>
                    </a>

                    <button
                      onClick={() => {
                        if (assignedOrders[0]) {
                          setSelectedOrderId(assignedOrders[0].id);
                        }
                        setViewMode('map');
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ gap: '0.35rem', fontSize: '0.75rem' }}
                      title="Track driver on live map"
                    >
                      <Navigation size={13} />
                      <span>Live Track</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: LIVE MAP & ROUTE DISPATCH QUEUE (Preserved completely) */}
      {viewMode === 'map' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Mobile Tab Switcher */}
          <div
            className="hide-on-desktop"
            style={{
              display: 'flex',
              backgroundColor: 'var(--white)',
              borderBottom: '1px solid var(--border-beige)',
              padding: '0.5rem 1rem',
              gap: '0.5rem'
            }}
          >
            <button
              onClick={() => setMobileTab('list')}
              className={`btn ${mobileTab === 'list' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ flex: 1 }}
            >
              <span>Delivery Queue ({filteredOrders.length})</span>
            </button>
            <button
              onClick={() => setMobileTab('map')}
              className={`btn ${mobileTab === 'map' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ flex: 1, gap: '0.35rem' }}
            >
              <Navigation size={14} />
              <span>Dispatch Map & Route</span>
            </button>
          </div>

          {/* Main Two-Panel Layout */}
          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 420px) 1fr',
              height: 'calc(100vh - 220px)',
              minHeight: '520px',
              minWidth: 0
            }}
            className="dispatch-grid-container"
          >
            {/* LEFT PANEL: Orders List & Filter Controls */}
            <div
              className={`dispatch-left-panel ${mobileTab === 'map' ? 'hide-on-mobile' : ''}`}
              style={{
                backgroundColor: 'var(--white)',
                borderRight: '1px solid var(--border-beige)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
              }}
            >
              {/* Header & Search */}
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-beige)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--charcoal)', fontWeight: 700 }}>
                      Delivery Queue
                    </h3>
                    <span style={{ fontSize: '0.71875rem', color: 'var(--muted-text)' }}>
                      {filteredOrders.length} orders scheduled for cold dispatch
                    </span>
                  </div>
                  <span className="badge badge-amber" style={{ fontSize: '0.625rem' }}>
                    Cold Chain Active
                  </span>
                </div>

                {/* Search Input */}
                <div style={{ position: 'relative' }}>
                  <Search
                    size={15}
                    style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
                  />
                  <input
                    type="text"
                    placeholder="Search by order, customer, area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '2.1rem', fontSize: '0.8125rem', height: '36px' }}
                  />
                </div>

                {/* Status Filter Chips */}
                <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', marginTop: '0.65rem', paddingBottom: '2px' }}>
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'pending', label: 'Pending' },
                    { id: 'assigned', label: 'Assigned' },
                    { id: 'in_transit', label: 'In Transit' },
                    { id: 'delivered', label: 'Delivered' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setStatusFilter(filter.id)}
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.71875rem',
                        fontWeight: statusFilter === filter.id ? 600 : 500,
                        backgroundColor: statusFilter === filter.id ? 'var(--charcoal-deep)' : 'var(--warm-ivory)',
                        color: statusFilter === filter.id ? 'var(--amber-primary)' : 'var(--charcoal)',
                        border: '1px solid',
                        borderColor: statusFilter === filter.id ? 'var(--charcoal-deep)' : 'var(--border-beige)',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer'
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Order Cards List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {filteredOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-text)', fontSize: '0.84375rem' }}>
                    No delivery dispatches match the selected filter.
                  </div>
                ) : (
                  filteredOrders.map((order) => {
                    const isSelected = selectedOrder && selectedOrder.id === order.id;

                    return (
                      <div
                        key={order.id}
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setMobileTab('map');
                        }}
                        style={{
                          padding: '0.875rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1.5px solid',
                          borderColor: isSelected ? 'var(--amber-primary)' : 'var(--border-beige)',
                          backgroundColor: isSelected ? 'var(--amber-soft)' : 'var(--white)',
                          boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                          <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--charcoal)' }}>
                            {order.id}
                          </span>
                          <StatusBadge status={order.orderStatus} type="order" />
                        </div>

                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--charcoal)', marginBottom: '2px' }}>
                          {order.customerName}
                        </div>

                        <div style={{ fontSize: '0.71875rem', color: 'var(--muted-text)', display: 'flex', alignItems: 'flex-start', gap: '4px', marginBottom: '0.45rem' }}>
                          <MapPin size={12} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--amber-dark)' }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {order.deliveryAddress}
                          </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.71875rem', borderTop: '1px dashed var(--border-beige)', paddingTop: '0.45rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: order.assignedDriverName !== 'Unassigned' ? 'var(--charcoal)' : 'var(--muted-text)' }}>
                            <Truck size={12} color="var(--amber-dark)" />
                            <span>{order.assignedDriverName}</span>
                          </div>
                          <strong style={{ fontSize: '0.84375rem', color: 'var(--charcoal)' }}>
                            ₹{order.total}
                          </strong>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT PANEL: Map Container & Selected Delivery Detail */}
            <div
              className={`dispatch-right-panel ${mobileTab === 'list' ? 'hide-on-mobile' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto',
                padding: '1rem',
                gap: '1rem'
              }}
            >
              {/* Real OpenStreetMap Live Engine Status */}
              <div
                style={{
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--white)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-beige)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  fontSize: '0.78125rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--charcoal)' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--success-green)', boxShadow: '0 0 6px var(--success-green)' }} />
                  <span>
                    <strong>Live StreetMap:</strong> OpenStreetMap Real Geospatial Navigation • Varthur Farm Hub to Bengaluru Destinations
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.71875rem', color: 'var(--muted-text)' }}>
                  <span>📍 {orders.filter(o => o.orderStatus === 'in_transit').length} In-Transit</span>
                  <span>🚚 {drivers.filter(d => d.status === 'On Route').length} Active Vans</span>
                </div>
              </div>

              {/* Real OpenStreetMap Geospatial Canvas */}
              <div
                style={{
                  flex: 1,
                  minHeight: '340px',
                  height: '380px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-beige)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <OpenStreetMap
                  center={[settings.mapCenter?.lat || 12.923, settings.mapCenter?.lng || 77.674]}
                  zoom={13}
                  orders={filteredOrders}
                  selectedOrderId={selectedOrderId}
                  onSelectOrder={(id) => setSelectedOrderId(id)}
                  drivers={drivers}
                  farmLocation={{
                    lat: settings.mapCenter?.lat || 12.923,
                    lng: settings.mapCenter?.lng || 77.674,
                    name: 'The Village Farm Hub (Varthur Hobli)'
                  }}
                  showRoute={true}
                  height="100%"
                />

                {/* Bottom Floating Telemetry Card */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-beige)',
                    padding: '0.65rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.65rem',
                    fontSize: '0.78125rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Navigation size={14} color="var(--amber-primary)" />
                      <span>Est. Distance: <strong>11.4 km</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} color="var(--charcoal)" />
                      <span>ETA: <strong>35 mins</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--success-green)' }}>
                      <Thermometer size={14} />
                      <span>Chilled Box: <strong>2.8°C</strong></span>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>
                    GPS: Synced with refrigerated vehicle sensor
                  </div>
                </div>
              </div>

              {/* Selected Order Operational Details Card */}
              {selectedOrder && (
                <div
                  className="card"
                  style={{
                    backgroundColor: 'var(--white)',
                    padding: '1.1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--charcoal)', fontWeight: 700 }}>
                          {selectedOrder.id} — {selectedOrder.customerName}
                        </h3>
                        <StatusBadge status={selectedOrder.orderStatus} type="order" />
                      </div>
                      <div style={{ fontSize: '0.78125rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                        {selectedOrder.deliveryAddress}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                        ₹{selectedOrder.total}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>
                        {selectedOrder.paymentMethod}
                      </div>
                    </div>
                  </div>

                  {/* Items in this delivery */}
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'var(--soft-cream)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78125rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <span>
                      <strong>Fresh Cuts:</strong> {selectedOrder.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </span>
                    <span className="badge badge-green" style={{ fontSize: '0.65625rem' }}>
                      Chilled Pack Sealed
                    </span>
                  </div>

                  {/* Driver & Status Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.85rem',
                      borderTop: '1px solid var(--border-beige)',
                      paddingTop: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.78125rem', fontWeight: 600 }}>Assign Driver:</label>
                      <select
                        value={selectedOrder.assignedDriverId || ''}
                        onChange={(e) => assignDriver(selectedOrder.id, e.target.value)}
                        className="form-select"
                        style={{ fontSize: '0.78125rem', padding: '4px 8px', width: 'auto' }}
                      >
                        <option value="" disabled>Select Driver</option>
                        {drivers.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.status})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Transitions */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {selectedOrder.orderStatus !== 'in_transit' && selectedOrder.orderStatus !== 'delivered' && (
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'in_transit')}
                          className="btn btn-primary btn-sm"
                          style={{ gap: '0.35rem', fontSize: '0.78125rem' }}
                        >
                          <Truck size={14} />
                          <span>Start Transit</span>
                        </button>
                      )}

                      {selectedOrder.orderStatus === 'in_transit' && (
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                          className="btn btn-primary btn-sm"
                          style={{ backgroundColor: 'var(--success-green)', gap: '0.35rem', fontSize: '0.78125rem' }}
                        >
                          <CheckCircle2 size={14} />
                          <span>Mark Delivered</span>
                        </button>
                      )}

                      <a
                        href={`tel:${selectedOrder.customerPhone}`}
                        className="btn btn-secondary btn-sm"
                        style={{ gap: '0.35rem', fontSize: '0.78125rem' }}
                      >
                        <Phone size={14} />
                        <span>Call Customer</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 1024px) {
          .dispatch-grid-container {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};
