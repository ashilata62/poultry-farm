import React, { useState, useEffect } from 'react';
import { useFarm } from '../../context/FarmContext';
import { OpenStreetMap } from '../../components/common/OpenStreetMap';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import {
  Truck,
  Phone,
  Navigation,
  CheckCircle2,
  MapPin,
  Package,
  User,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  IndianRupee,
  Power,
  MessageCircle,
  Check,
  Sparkles,
  Battery,
  Wifi,
  TrendingUp,
  Compass
} from 'lucide-react';

export const DriverPortal = () => {
  const {
    orders,
    drivers,
    activeDriverId,
    setActiveDriverId,
    driverUpdateDelivery,
    setCurrentRole,
    setAdminModule,
    setCustomerView,
    driverSource,
    showToast,
    settings
  } = useFarm();

  // Bottom Navigation Dock Tabs: 'orders' | 'map' | 'earnings' | 'profile'
  const [activeNavTab, setActiveNavTab] = useState('orders');
  // Sub-tabs in Orders: 'active' | 'completed'
  const [ordersSubTab, setOrdersSubTab] = useState('active');

  // Driver on-duty toggle switch
  const [isOnDuty, setIsOnDuty] = useState(true);

  // Modals for delivery workflow
  const [completingOrder, setCompletingOrder] = useState(null);
  const [cashCollected, setCashCollected] = useState(true);
  const [failedModalOrder, setFailedModalOrder] = useState(null);
  const [failureReason, setFailureReason] = useState('Customer unreachable on call');

  // Real-time phone clock
  const [currentTime, setCurrentTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const currentDriver = drivers.find((d) => d.id === activeDriverId) || drivers[0];

  // Filter deliveries assigned to current driver
  const myDeliveries = orders.filter((o) => o.assignedDriverId === currentDriver.id);
  const activeDeliveries = myDeliveries.filter(
    (o) => o.orderStatus === 'confirmed' || o.orderStatus === 'processing' || o.orderStatus === 'in_transit'
  );
  const completedDeliveries = myDeliveries.filter(
    (o) => o.orderStatus === 'delivered' || o.orderStatus === 'cancelled'
  );

  const displayedList = ordersSubTab === 'active' ? activeDeliveries : completedDeliveries;

  // Earnings calculations
  const deliveredCount = completedDeliveries.filter((o) => o.orderStatus === 'delivered').length;
  const basePay = deliveredCount * 80;
  const coldChainBonus = deliveredCount * 30;
  const tipsAndDistance = 140;
  const todayTotalEarnings = basePay + coldChainBonus + tipsAndDistance;

  // Handlers
  const handleStartDelivery = (orderId) => {
    driverUpdateDelivery(orderId, 'in_transit', `Delivery started by ${currentDriver.name}. On route in chilled van.`);
    if (showToast) showToast(`Delivery #${orderId} started! Navigation route active.`, 'success');
  };

  const handleOpenCompleteModal = (order) => {
    setCompletingOrder(order);
    setCashCollected(order.paymentMethod === 'Cash On Delivery' || order.paymentMethod === 'UPI On Delivery');
  };

  const handleConfirmDelivered = () => {
    if (completingOrder) {
      const note = completingOrder.paymentMethod === 'Cash On Delivery'
        ? `Delivered fresh to customer. Handed over at doorstep. Cash of ₹${completingOrder.total} collected.`
        : `Delivered fresh to customer. Handed over at doorstep. Prepaid order confirmed.`;

      driverUpdateDelivery(completingOrder.id, 'delivered', note);
      if (showToast) showToast(`Order #${completingOrder.id} successfully delivered!`, 'success');
      setCompletingOrder(null);
    }
  };

  const handleReportFailed = () => {
    if (failedModalOrder) {
      driverUpdateDelivery(failedModalOrder.id, 'cancelled', `Delivery attempt issue: ${failureReason}`);
      if (showToast) showToast(`Order #${failedModalOrder.id} marked with issue: ${failureReason}`, 'warning');
      setFailedModalOrder(null);
    }
  };

  const isFromAdmin = driverSource === 'admin';

  // Logout / Return to Admin handler (placed in Account tab at the bottom)
  const handleLogout = () => {
    if (isFromAdmin) {
      setCurrentRole('admin');
      setAdminModule('drivers');
      if (showToast) showToast('Returned to Farm Admin Fleet Console', 'info');
    } else {
      setCurrentRole('login');
      setCustomerView('login');
      if (showToast) showToast('Logged out of Driver Mobile App', 'info');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="driver-page-wrapper">
      {/* Smartphone Device Frame (Transforms to 100% full-screen on mobile viewports <= 540px) */}
      <div className="driver-phone-chassis">
        {/* Dynamic Island / Speaker Pill (hidden on real mobile viewports) */}
        <div className="driver-device-notch">
          <div className="driver-device-camera" />
        </div>

        {/* 1. NATIVE MOBILE PHONE STATUS BAR */}
        <div className="driver-status-bar">
          <span>{currentTime}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#16A34A', letterSpacing: '0.02em' }}>5G</span>
            <Wifi size={14} color="#111827" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700 }}>98%</span>
              <Battery size={15} color="#111827" />
            </div>
          </div>
        </div>

        {/* 2. FOOD DELIVERY DRIVER TOP APP BAR */}
        <header
          style={{
            backgroundColor: '#1E2220',
            color: '#FFFFFF',
            padding: '10px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            flexShrink: 0,
            zIndex: 30
          }}
        >
          {/* Main Top Header Strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Driver Identity Snippet */}
            <div
              onClick={() => setActiveNavTab('profile')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
              title="View Driver Profile"
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#D11243',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(209, 18, 67, 0.4)',
                  position: 'relative'
                }}
              >
                <span>{currentDriver.name.split(' ').map((n) => n[0]).join('')}</span>
                {/* Live Online Pulse Dot */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: '-1px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: isOnDuty ? '#22C55E' : '#9CA3AF',
                    border: '2px solid #1E2220',
                    boxShadow: isOnDuty ? '0 0 6px #22C55E' : 'none'
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15 }}>
                    {currentDriver.name}
                  </span>
                  <span style={{ fontSize: '0.65625rem', backgroundColor: 'rgba(255,255,255,0.12)', padding: '1px 6px', borderRadius: '4px', color: '#E5E7EB', fontWeight: 600 }}>
                    4.9 ★
                  </span>
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#9CA3AF', marginTop: '1px' }}>
                  The Village Farm • Varthur Hub
                </div>
              </div>
            </div>

            {/* On Duty / Off Duty Toggle Switch (Food Driver Partner App Standard) */}
            <button
              onClick={() => {
                const nextDuty = !isOnDuty;
                setIsOnDuty(nextDuty);
                if (showToast) {
                  showToast(nextDuty ? '🟢 You are now ONLINE & accepting chilled deliveries' : '⚪ You are now OFFLINE (Off Duty)', nextDuty ? 'success' : 'info');
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 10px',
                borderRadius: '20px',
                backgroundColor: isOnDuty ? 'rgba(34, 197, 94, 0.16)' : 'rgba(156, 163, 175, 0.16)',
                border: isOnDuty ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(156, 163, 175, 0.3)',
                color: isOnDuty ? '#4ADE80' : '#D1D5DB',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Toggle Online / Offline Status"
            >
              <Power size={13} color={isOnDuty ? '#4ADE80' : '#9CA3AF'} />
              <span>{isOnDuty ? 'On Duty' : 'Off Duty'}</span>
            </button>
          </div>

          {/* Van Cold-Chain Telemetry & Quick Shift Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '0.71875rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#E5E7EB' }}>
              <span style={{ color: '#38BDF8', fontWeight: 800 }}>❄️ 2.4°C</span>
              <span>Chilled Van ({currentDriver.vehicle.split('(')[1]?.replace(')', '') || 'KA-05-EV'})</span>
            </div>
            <div style={{ color: '#D11243', fontWeight: 700 }}>
              {activeDeliveries.length} Stop{activeDeliveries.length === 1 ? '' : 's'} Remaining
            </div>
          </div>
        </header>

        {/* 3. SCROLLABLE APP BODY (DEPENDING ON ACTIVE BOTTOM TAB) */}
        <main className="driver-app-body">
          {/* =========================================================================
              TAB 1: DELIVERIES / TASKS
             ========================================================================= */}
          {activeNavTab === 'orders' && (
            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Segmented Filter Pills (Active vs Delivered Today) */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '10px',
                  padding: '3px',
                  gap: '3px'
                }}
              >
                <button
                  onClick={() => setOrdersSubTab('active')}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    backgroundColor: ordersSubTab === 'active' ? '#FFFFFF' : 'transparent',
                    color: ordersSubTab === 'active' ? '#D11243' : '#4B5563',
                    border: 'none',
                    boxShadow: ordersSubTab === 'active' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Active Stops</span>
                  <span
                    style={{
                      backgroundColor: ordersSubTab === 'active' ? '#D11243' : '#9CA3AF',
                      color: '#FFFFFF',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      padding: '1px 6px'
                    }}
                  >
                    {activeDeliveries.length}
                  </span>
                </button>

                <button
                  onClick={() => setOrdersSubTab('completed')}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    backgroundColor: ordersSubTab === 'completed' ? '#FFFFFF' : 'transparent',
                    color: ordersSubTab === 'completed' ? '#16A34A' : '#4B5563',
                    border: 'none',
                    boxShadow: ordersSubTab === 'completed' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Completed</span>
                  <span
                    style={{
                      backgroundColor: ordersSubTab === 'completed' ? '#16A34A' : '#9CA3AF',
                      color: '#FFFFFF',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      borderRadius: '10px',
                      padding: '1px 6px'
                    }}
                  >
                    {completedDeliveries.length}
                  </span>
                </button>
              </div>

              {/* Delivery Orders List */}
              {displayedList.length === 0 ? (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '3rem 1.5rem',
                    textAlign: 'center',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: '#ECFDF5',
                      color: '#16A34A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px'
                    }}
                  >
                    <CheckCircle2 size={30} />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', color: '#111827', margin: 0 }}>
                    {ordersSubTab === 'active' ? 'No Active Deliveries!' : 'No Completed Orders Yet'}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '6px', lineHeight: 1.5 }}>
                    {ordersSubTab === 'active'
                      ? 'You have delivered all assigned morning orders. Stay online to receive the next farm cold dispatch queue.'
                      : 'Deliveries you complete today will appear here with confirmation timestamps and payout.'}
                  </p>
                </div>
              ) : (
                displayedList.map((order, idx) => {
                  const isCOD = order.paymentMethod === 'Cash On Delivery' || order.paymentMethod === 'UPI On Delivery';
                  const isInTransit = order.orderStatus === 'in_transit';

                  return (
                    <div
                      key={order.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        border: isInTransit ? '1.5px solid #D11243' : '1px solid #E5E7EB',
                        boxShadow: isInTransit ? '0 4px 16px rgba(209, 18, 67, 0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      {/* Top Order Strip */}
                      <div
                        style={{
                          backgroundColor: isInTransit ? 'rgba(209, 18, 67, 0.05)' : '#F9FAFB',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid #E5E7EB'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              backgroundColor: isInTransit ? '#D11243' : '#1F2937',
                              color: '#FFFFFF',
                              fontSize: '0.6875rem',
                              fontWeight: 800,
                              borderRadius: '6px',
                              padding: '2px 7px'
                            }}
                          >
                            STOP #{idx + 1}
                          </span>
                          <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.875rem', color: '#111827' }}>
                            {order.id}
                          </span>
                        </div>
                        <StatusBadge status={order.orderStatus} type="order" />
                      </div>

                      {/* Main Stop Details */}
                      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* Route Journey (Pickup -> Dropoff) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {/* Origin Hub */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <div style={{ width: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, marginTop: '2px' }}>
                              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#16A34A', border: '2px solid #DCFCE7' }} />
                              <span style={{ width: '1.5px', height: '18px', backgroundColor: '#D1D5DB', margin: '2px 0' }} />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                              <strong style={{ color: '#111827' }}>The Village Farm Cold Hub</strong> • Varthur Hobli (Pack #04 Ready)
                            </div>
                          </div>

                          {/* Customer Destination Drop */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <MapPin size={18} color="#D11243" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
                                {order.customerName}
                              </div>
                              <div style={{ fontSize: '0.8125rem', color: '#374151', marginTop: '2px', lineHeight: 1.4 }}>
                                {order.deliveryAddress}
                              </div>
                              {order.landmark && (
                                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '3px' }}>
                                  📍 Landmark: <strong>{order.landmark}</strong>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Customer Special Note Banner */}
                        {order.instructions && (
                          <div
                            style={{
                              backgroundColor: '#FFFBEB',
                              border: '1px solid #FDE68A',
                              borderRadius: '8px',
                              padding: '8px 10px',
                              fontSize: '0.75rem',
                              color: '#92400E',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '6px'
                            }}
                          >
                            <span style={{ fontWeight: 800 }}>📝 Note:</span>
                            <span>{order.instructions}</span>
                          </div>
                        )}

                        {/* Order Items & Chilled Bag Status */}
                        <div
                          style={{
                            backgroundColor: '#F9FAFB',
                            borderRadius: '10px',
                            padding: '10px 12px',
                            border: '1px solid #E5E7EB',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                            <span style={{ fontWeight: 600, color: '#111827' }}>
                              {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                            </span>
                            <span style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#111827' }}>
                              ₹{order.total}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.6875rem', color: '#0369A1' }}>
                            <Sparkles size={13} color="#0284C7" />
                            <span>Insulated Gel Pack Verified • 0-4°C Preserved</span>
                          </div>
                        </div>

                        {/* Payment Collection Callout */}
                        <div
                          style={{
                            backgroundColor: isCOD ? '#FEF2F2' : '#F0FDF4',
                            border: isCOD ? '1px solid #FECACA' : '1px solid #BBF7D0',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: isCOD ? '#991B1B' : '#166534', textTransform: 'uppercase' }}>
                              {isCOD ? 'Cash / UPI Collection' : 'Payment Verified'}
                            </div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: isCOD ? '#D11243' : '#15803D' }}>
                              {isCOD ? `COLLECT ₹${order.total}` : 'PREPAID ORDER (₹0 TO COLLECT)'}
                            </div>
                          </div>
                          <span style={{ fontSize: '0.6875rem', color: '#6B7280', fontWeight: 600 }}>
                            {order.paymentMethod}
                          </span>
                        </div>

                        {/* Direct Communication & GPS Action Buttons (Row of 3 buttons) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                          <a
                            href={`tel:${order.customerPhone}`}
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #D1D5DB',
                              borderRadius: '8px',
                              padding: '8px 4px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              color: '#16A34A',
                              fontSize: '0.71875rem',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            <Phone size={16} />
                            <span>Call</span>
                          </a>

                          <a
                            href={`https://wa.me/${(order.customerPhone || '').replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customerName)},%20I%20am%20your%20delivery%20driver%20from%20The%20Village%20Farm%20with%20your%20fresh%20poultry%20order.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #D1D5DB',
                              borderRadius: '8px',
                              padding: '8px 4px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              color: '#25D366',
                              fontSize: '0.71875rem',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            <MessageCircle size={16} />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(order.deliveryAddress)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #D1D5DB',
                              borderRadius: '8px',
                              padding: '8px 4px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              color: '#2563EB',
                              fontSize: '0.71875rem',
                              fontWeight: 700,
                              textDecoration: 'none'
                            }}
                          >
                            <Navigation size={16} />
                            <span>Maps (GPS)</span>
                          </a>
                        </div>

                        {/* Primary Workflow Actions (Start Route / Mark Delivered) */}
                        {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                          <div style={{ marginTop: '4px', display: 'flex', gap: '8px' }}>
                            {!isInTransit ? (
                              <button
                                onClick={() => handleStartDelivery(order.id)}
                                style={{
                                  width: '100%',
                                  backgroundColor: '#D11243',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '10px',
                                  padding: '11px',
                                  fontSize: '0.90625rem',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '8px',
                                  boxShadow: '0 4px 12px rgba(209, 18, 67, 0.35)'
                                }}
                              >
                                <Truck size={18} />
                                <span>Start Delivery Route</span>
                              </button>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleOpenCompleteModal(order)}
                                  style={{
                                    flex: 2,
                                    backgroundColor: '#16A34A',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '11px',
                                    fontSize: '0.875rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.35)'
                                  }}
                                >
                                  <CheckCircle2 size={18} />
                                  <span>Mark Delivered</span>
                                </button>

                                <button
                                  onClick={() => setFailedModalOrder(order)}
                                  style={{
                                    flex: 1,
                                    backgroundColor: '#FFFFFF',
                                    color: '#DC2626',
                                    border: '1.5px solid #FCA5A5',
                                    borderRadius: '10px',
                                    padding: '11px 8px',
                                    fontSize: '0.8125rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Report Issue
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 2: LIVE MAP & ROUTE GPS
             ========================================================================= */}
          {activeNavTab === 'map' && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, minHeight: '380px', position: 'relative' }}>
                <OpenStreetMap
                  center={[
                    activeDeliveries[0]?.coordinates?.lat || settings.mapCenter?.lat || 12.923,
                    activeDeliveries[0]?.coordinates?.lng || settings.mapCenter?.lng || 77.674
                  ]}
                  zoom={13}
                  orders={activeDeliveries}
                  selectedOrderId={activeDeliveries[0]?.id}
                  drivers={[currentDriver]}
                  farmLocation={{ lat: 12.923, lng: 77.674, name: 'The Village Farm Hub (Varthur)' }}
                  showRoute={true}
                  height="100%"
                />
              </div>

              {/* Floating Next Stop Details Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '14px',
                  borderTop: '1px solid #E5E7EB',
                  boxShadow: '0 -4px 16px rgba(0,0,0,0.06)'
                }}
              >
                {activeDeliveries.length > 0 ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#D11243', textTransform: 'uppercase' }}>
                        NEXT DESTINATION • STOP #1
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                        ~12 Mins • 2.4 km
                      </span>
                    </div>

                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginTop: '4px' }}>
                      {activeDeliveries[0].customerName}
                    </div>
                    <div style={{ fontSize: '0.78125rem', color: '#6B7280', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {activeDeliveries[0].deliveryAddress}
                    </div>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(activeDeliveries[0].deliveryAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginTop: '10px',
                        backgroundColor: '#1E2220',
                        color: '#FFFFFF',
                        borderRadius: '10px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '0.84375rem',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <Navigation size={16} color="#38BDF8" />
                      <span>Start Google Maps Navigation</span>
                    </a>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '10px 0', fontSize: '0.8125rem', color: '#6B7280' }}>
                    All stops delivered for today. Van stationed at Varthur Hub.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: EARNINGS & SHIFT PAYOUT
             ========================================================================= */}
          {activeNavTab === 'earnings' && (
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Daily Shift Earnings Master Card */}
              <div
                style={{
                  backgroundColor: '#1E2220',
                  color: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '18px 16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>
                  Today's Shift Earnings
                </div>
                <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#FFFFFF', marginTop: '4px' }}>
                  ₹{todayTotalEarnings}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#4ADE80', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={14} />
                  <span>Direct daily settlement to ICICI Bank A/C ****4421</span>
                </div>

                {/* 3 Metrics Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                    marginTop: '16px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '10px 8px',
                    textAlign: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.65625rem', color: '#9CA3AF' }}>DELIVERIES</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                      {deliveredCount}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65625rem', color: '#9CA3AF' }}>ONLINE TIME</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                      4h 15m
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65625rem', color: '#9CA3AF' }}>RATING</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FBBF24', marginTop: '2px' }}>
                      4.9 ★
                    </div>
                  </div>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '14px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                <h4 style={{ fontSize: '0.9375rem', color: '#111827', margin: '0 0 12px 0' }}>
                  Shift Compensation Breakdown
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
                    <span>Base Delivery Pay ({deliveredCount} orders @ ₹80)</span>
                    <strong style={{ color: '#111827' }}>₹{basePay}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
                    <span>Cold-Chain Handling Incentive (0-4°C maintained)</span>
                    <strong style={{ color: '#16A34A' }}>+₹{coldChainBonus}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
                    <span>Customer Tips & Distance Allowance</span>
                    <strong style={{ color: '#16A34A' }}>+₹{tipsAndDistance}</strong>
                  </div>
                  <div style={{ borderTop: '1px dashed #E5E7EB', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.90625rem' }}>
                    <span style={{ fontWeight: 700, color: '#111827' }}>Total Shift Payout</span>
                    <strong style={{ fontWeight: 800, color: '#D11243' }}>₹{todayTotalEarnings}</strong>
                  </div>
                </div>
              </div>

              {/* Verified Quality Incentives */}
              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <ShieldCheck size={24} color="#059669" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.75rem', color: '#065F46' }}>
                  <strong>Cold-Chain Guarantee Bonus Unlocked:</strong> Van temperature remained strictly within 0-4°C for 100% of morning drops.
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 4: DRIVER PROFILE & ACCOUNT (WHERE LOGOUT BUTTON IS LOCATED!)
             ========================================================================= */}
          {activeNavTab === 'profile' && (
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Profile Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: '#1E2220',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  {currentDriver.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', color: '#111827', margin: 0 }}>
                    {currentDriver.name}
                  </h3>
                  <div style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: '2px' }}>
                    {currentDriver.phone}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#16A34A', fontWeight: 700, marginTop: '2px' }}>
                    ID: TVF-DRV-{currentDriver.id.replace('drv-', '0')} • Verified Pasture Fleet Courier
                  </div>
                </div>
              </div>

              {/* Vehicle & Chilled Storage Box Specs */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '14px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <h4 style={{ fontSize: '0.875rem', color: '#111827', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Assigned Vehicle & Equipment
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#374151' }}>
                  <span>Vehicle Model:</span>
                  <strong>{currentDriver.vehicle}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#374151' }}>
                  <span>Chiller Unit:</span>
                  <strong style={{ color: '#0284C7' }}>Unit #02 (Insulated 0-4°C)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: '#374151' }}>
                  <span>Biosecurity Inspection:</span>
                  <strong style={{ color: '#16A34A' }}>Cleared Today at 5:30 AM</strong>
                </div>
              </div>

              {/* Switch Demo Driver Profile */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '14px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <label style={{ fontSize: '0.78125rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Switch Driver Profile (Demo Roster)
                </label>
                <select
                  value={activeDriverId}
                  onChange={(e) => {
                    setActiveDriverId(e.target.value);
                    if (showToast) showToast('Switched driver profile to ' + drivers.find((d) => d.id === e.target.value)?.name, 'info');
                  }}
                  className="form-select"
                  style={{ fontSize: '0.84375rem', padding: '8px 12px' }}
                >
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.vehicle}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hub Emergency Helpline */}
              <div
                style={{
                  backgroundColor: '#FFF7ED',
                  border: '1px solid #FFEDD5',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#9A3412' }}>
                    Farm Dispatch Hub SOS
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: '#C2410C' }}>
                    Direct line to cold storage dispatch manager
                  </div>
                </div>
                <a
                  href={`tel:${settings.phone}`}
                  style={{
                    backgroundColor: '#EA580C',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Phone size={13} />
                  <span>Call Hub</span>
                </a>
              </div>

              {/* =============================================================
                  LOGOUT / BACK ACTION BUTTONS AT THE BOTTOM (EXACTLY AS REQUESTED)
                 ============================================================= */}
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {isFromAdmin && (
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      color: '#1F2937',
                      border: '1.5px solid #D1D5DB',
                      borderRadius: '12px',
                      padding: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <ArrowLeft size={16} />
                    <span>Return to Fleet Roster</span>
                  </button>
                )}

                {/* Primary Logout Button at the Bottom */}
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    border: '1.5px solid #FCA5A5',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '0.90625rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#DC2626';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FEE2E2';
                    e.currentTarget.style.color = '#DC2626';
                  }}
                >
                  <LogOut size={17} />
                  <span>Log Out of Driver App</span>
                </button>
              </div>
            </div>
          )}
        </main>

        {/* 4. FIXED FOOD DELIVERY DRIVER BOTTOM NAVIGATION BAR */}
        <nav className="driver-bottom-nav">
          {/* Tab 1: Orders / Stops */}
          <button
            onClick={() => setActiveNavTab('orders')}
            className={`driver-nav-tab ${activeNavTab === 'orders' ? 'active' : ''}`}
          >
            <div style={{ position: 'relative' }}>
              <Package size={20} color={activeNavTab === 'orders' ? '#D11243' : '#6B7280'} />
              {activeDeliveries.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-7px',
                    backgroundColor: '#D11243',
                    color: '#FFFFFF',
                    fontSize: '0.59375rem',
                    fontWeight: 900,
                    borderRadius: '99px',
                    padding: '0 4px',
                    lineHeight: '13px'
                  }}
                >
                  {activeDeliveries.length}
                </span>
              )}
            </div>
            <span>Deliveries</span>
          </button>

          {/* Tab 2: Map */}
          <button
            onClick={() => setActiveNavTab('map')}
            className={`driver-nav-tab ${activeNavTab === 'map' ? 'active' : ''}`}
          >
            <Compass size={20} color={activeNavTab === 'map' ? '#D11243' : '#6B7280'} />
            <span>Route Map</span>
          </button>

          {/* Tab 3: Earnings */}
          <button
            onClick={() => setActiveNavTab('earnings')}
            className={`driver-nav-tab ${activeNavTab === 'earnings' ? 'active' : ''}`}
          >
            <IndianRupee size={20} color={activeNavTab === 'earnings' ? '#D11243' : '#6B7280'} />
            <span>Earnings</span>
          </button>

          {/* Tab 4: Account / Profile & Logout */}
          <button
            onClick={() => setActiveNavTab('profile')}
            className={`driver-nav-tab ${activeNavTab === 'profile' ? 'active' : ''}`}
          >
            <div style={{ position: 'relative' }}>
              <User size={20} color={activeNavTab === 'profile' ? '#D11243' : '#6B7280'} />
              <span
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '-2px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isOnDuty ? '#22C55E' : '#9CA3AF'
                }}
              />
            </div>
            <span>Account</span>
          </button>
        </nav>

        {/* 5. NATIVE PHONE HOME INDICATOR PILL */}
        <div className="driver-home-indicator" />
      </div>

      {/* =========================================================================
          WORKFLOW MODAL 1: CONFIRM HANDOVER & COLLECT CASH
         ========================================================================= */}
      {completingOrder && (
        <Modal
          isOpen={!!completingOrder}
          onClose={() => setCompletingOrder(null)}
          title={`Confirm Handover: ${completingOrder.id}`}
          maxWidth="440px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ textAlign: 'center', padding: '6px 0' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px'
                }}
              >
                <CheckCircle2 size={26} />
              </div>
              <h4 style={{ fontSize: '1.05rem', margin: 0, color: '#111827' }}>
                Handover to {completingOrder.customerName}
              </h4>
              <p style={{ fontSize: '0.8125rem', color: '#6B7280', margin: '4px 0 0' }}>
                {completingOrder.deliveryAddress}
              </p>
            </div>

            {/* Cold-Chain Compliance Check */}
            <div
              style={{
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '10px',
                padding: '10px 12px',
                fontSize: '0.8125rem',
                color: '#15803D',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ShieldCheck size={20} color="#16A34A" />
              <span>Chilled 0-4°C food safety seal verified unbroken.</span>
            </div>

            {/* Items summary */}
            <div style={{ backgroundColor: '#F9FAFB', borderRadius: '10px', padding: '10px', fontSize: '0.8125rem' }}>
              <div style={{ fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Package Items:</div>
              <div style={{ color: '#111827' }}>
                {completingOrder.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
              </div>
            </div>

            {/* COD Cash Collection Confirmation */}
            {(completingOrder.paymentMethod === 'Cash On Delivery' || completingOrder.paymentMethod === 'UPI On Delivery') ? (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1.5px solid #FECACA',
                  borderRadius: '10px',
                  padding: '12px'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991B1B', textTransform: 'uppercase' }}>
                  Cash / UPI Collection Required
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#D11243', margin: '4px 0' }}>
                  ₹{completingOrder.total}
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '6px' }}>
                  <input
                    type="checkbox"
                    checked={cashCollected}
                    onChange={(e) => setCashCollected(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#D11243' }}
                  />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111827' }}>
                    I have collected ₹{completingOrder.total} from customer
                  </span>
                </label>
              </div>
            ) : (
              <div style={{ padding: '8px 12px', backgroundColor: '#F3F4F6', borderRadius: '8px', fontSize: '0.8125rem', color: '#166534', fontWeight: 600 }}>
                ✓ Order Paid Online via Gateway (₹0 to collect)
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => setCompletingOrder(null)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelivered}
                disabled={(completingOrder.paymentMethod === 'Cash On Delivery' || completingOrder.paymentMethod === 'UPI On Delivery') && !cashCollected}
                style={{
                  flex: 2,
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  opacity: (completingOrder.paymentMethod === 'Cash On Delivery' || completingOrder.paymentMethod === 'UPI On Delivery') && !cashCollected ? 0.5 : 1
                }}
              >
                <Check size={16} />
                <span>Confirm Handover</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* =========================================================================
          WORKFLOW MODAL 2: REPORT DELIVERY ISSUE
         ========================================================================= */}
      {failedModalOrder && (
        <Modal
          isOpen={!!failedModalOrder}
          onClose={() => setFailedModalOrder(null)}
          title={`Delivery Issue: ${failedModalOrder.id}`}
          maxWidth="440px"
        >
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--charcoal)' }}>
              Record delivery attempt issue for {failedModalOrder.customerName}.
            </p>

            <div className="form-group">
              <label className="form-label">Issue Reason *</label>
              <select
                value={failureReason}
                onChange={(e) => setFailureReason(e.target.value)}
                className="form-select"
              >
                <option value="Customer unreachable on call">Customer unreachable on call</option>
                <option value="Customer requested reschedule">Customer requested reschedule</option>
                <option value="Incorrect address provided">Incorrect address provided</option>
                <option value="Gate security refused entry">Gate security refused entry</option>
                <option value="Customer cancelled at door">Customer cancelled at door</option>
                <option value="Cold-chain temperature alert">Cold-chain temperature alert</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setFailedModalOrder(null)}
                className="btn btn-secondary btn-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleReportFailed}
                className="btn btn-danger btn-sm"
              >
                Submit Issue & Return to Hub
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
