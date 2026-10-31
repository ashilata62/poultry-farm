import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { OpenStreetMap } from '../../components/common/OpenStreetMap';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  Package,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingPage = () => {
  const { orders, trackingOrderId, setTrackingOrderId, settings, showToast, updateOrderStatus } = useFarm();
  const [searchInput, setSearchInput] = useState(trackingOrderId || '');
  const [isSearching, setIsSearching] = useState(false);
  const [justRefreshed, setJustRefreshed] = useState(false);

  const activeOrder = orders.find(
    (o) => o.id.toLowerCase() === (trackingOrderId || '').toLowerCase()
  ) || orders[0];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchInput.trim().replace(/^#/, '').toLowerCase();
    if (!query) {
      if (showToast) showToast('Please enter an Order ID or Phone number', 'warning');
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const found = orders.find(
        (o) =>
          o.id.toLowerCase() === query ||
          o.id.toLowerCase().replace(/[^a-z0-9]/g, '') === query.replace(/[^a-z0-9]/g, '') ||
          (o.customerPhone && o.customerPhone.replace(/[^0-9]/g, '').includes(query))
      );

      if (found) {
        setTrackingOrderId(found.id);
        setJustRefreshed(true);
        setTimeout(() => setJustRefreshed(false), 1500);
        if (showToast) {
          showToast(`Live status refreshed for Order #${found.id}!`, 'success');
        }
        const el = document.getElementById('tracking-card');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        if (showToast) {
          showToast(`Order "${searchInput}" not found. Try TVF-74939 or check your phone number.`, 'error');
        }
      }
    }, 300);
  };

  const steps = [
    { key: 'pending', label: 'Order Placed', desc: 'Received at farm dispatch' },
    { key: 'confirmed', label: 'Confirmed', desc: 'Stock & batch allocated' },
    { key: 'processing', label: 'Chilled Packaging', desc: 'Vacuum-sealed in food tray' },
    { key: 'in_transit', label: 'Out for Delivery', desc: 'In refrigerated electric van' },
    { key: 'delivered', label: 'Delivered', desc: 'Handed over fresh' }
  ];

  const getStepIndex = (status) => {
    const map = {
      pending: 0,
      confirmed: 1,
      processing: 2,
      in_transit: 3,
      delivered: 4,
      cancelled: -1
    };
    return map[status] !== undefined ? map[status] : 1;
  };

  const currentStepIdx = activeOrder ? getStepIndex(activeOrder.orderStatus) : 0;

  return (
    <div style={{ backgroundColor: 'var(--soft-cream)', minHeight: '85vh', padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '640px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
            Live Cold-Chain Dispatch
          </div>
          <h1 style={{ color: 'var(--charcoal)', marginBottom: '0.5rem' }}>
            Track Your Farm Delivery
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--muted-text)' }}>
            Monitor your fresh poultry delivery from dawn harvest through chilled refrigerated dispatch to your doorstep.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginTop: '1.5rem',
              backgroundColor: 'var(--white)',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-beige)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
              />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. TVF-84920) or Phone..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="form-input"
                style={{ border: 'none', paddingLeft: '2.5rem', boxShadow: 'none' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSearching}
              style={{
                padding: '0.5rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minWidth: '85px',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {isSearching ? 'Tracking...' : 'Track'}
            </button>
          </form>
        </div>

        {!activeOrder ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', maxWidth: '500px', margin: '0 auto' }}>
            <AlertCircle size={36} color="var(--error-red)" style={{ margin: '0 auto 1rem' }} />
            <h3>Order Not Found</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
              We could not find an order matching that ID. Please verify your order number from the confirmation SMS/WhatsApp.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem',
              maxWidth: '1080px',
              margin: '0 auto'
            }}
          >
            {/* Left Column: Status Timeline & Driver Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Order Status Card */}
              <div
                id="tracking-card"
                className="card"
                style={{
                  backgroundColor: 'var(--white)',
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                  border: justRefreshed ? '1.5px solid var(--amber-primary)' : '1px solid var(--border-beige)',
                  boxShadow: justRefreshed ? '0 0 16px rgba(242, 140, 40, 0.28)' : 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-beige)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Order Tracking
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--charcoal)', fontFamily: 'var(--font-mono)' }}>
                      {activeOrder.id}
                    </div>
                  </div>
                  <StatusBadge status={activeOrder.orderStatus} type="order" />
                </div>

                {/* Interactive Stage Simulation Banner (Demo Flow) */}
                <div
                  style={{
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #EAEAEA',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#111827', fontWeight: 600 }}>
                    <Clock size={14} color="#D11243" />
                    <span>Status: <strong>{steps[currentStepIdx]?.label || activeOrder.orderStatus}</strong></span>
                  </div>
                  {currentStepIdx < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        const nextStep = steps[currentStepIdx + 1];
                        if (nextStep) {
                          updateOrderStatus(activeOrder.id, nextStep.key);
                        }
                      }}
                      style={{
                        backgroundColor: '#D11243',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(234, 88, 12, 0.25)'
                      }}
                    >
                      Advance to "{steps[currentStepIdx + 1]?.label}" →
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700 }}>
                      ✓ Order Delivered Fresh
                    </span>
                  )}
                </div>

                {/* Horizontal / Stepper Progress Bar */}
                <div style={{ marginBottom: '2rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', minWidth: '300px' }}>
                    {/* Connecting Bar */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '20px',
                        right: '20px',
                        height: '3px',
                        backgroundColor: 'var(--border-beige)',
                        zIndex: 1
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: 'var(--amber-primary)',
                          width: `${Math.max(0, Math.min(100, (currentStepIdx / (steps.length - 1)) * 100))}%`,
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>

                    {steps.map((s, idx) => {
                      const isComplete = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div
                          key={s.key}
                          style={{
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            width: '60px'
                          }}
                        >
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: isComplete ? 'var(--amber-primary)' : 'var(--white)',
                              border: '2px solid',
                              borderColor: isComplete ? 'var(--amber-primary)' : 'var(--border-beige)',
                              color: isComplete ? 'var(--charcoal-deep)' : 'var(--muted-text)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              boxShadow: isCurrent ? '0 0 0 4px rgba(242, 140, 40, 0.25)' : 'none'
                            }}
                          >
                            {isComplete ? <CheckCircle2 size={16} /> : idx + 1}
                          </div>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontWeight: isCurrent ? 700 : 500,
                              color: isCurrent ? 'var(--charcoal)' : 'var(--muted-text)',
                              marginTop: '6px',
                              lineHeight: 1.2
                            }}
                          >
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Vertical Detailed Timeline History */}
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--charcoal)' }}>
                  Delivery Progress Log
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid var(--amber-light)', paddingLeft: '1.25rem', marginLeft: '0.5rem' }}>
                  {activeOrder.timeline.map((entry, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: '-1.65rem',
                          top: '3px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--amber-primary)',
                          border: '2px solid var(--white)'
                        }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                          {entry.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                          {entry.time}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', margin: '2px 0 0' }}>
                        {entry.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assigned Driver Card */}
              <div className="card" style={{ backgroundColor: 'var(--white)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Refrigerated Dispatch Courier</h4>
                {activeOrder.assignedDriverId ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--amber-soft)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--amber-dark)'
                        }}
                      >
                        <Truck size={22} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                          {activeOrder.assignedDriverName}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                          Chilled Van Dispatch • On Route
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <a
                        href={`tel:${activeOrder.assignedDriverPhone}`}
                        className="btn btn-secondary btn-sm"
                        style={{ gap: '0.35rem' }}
                      >
                        <Phone size={14} />
                        <span>Call Driver</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--muted-text)', fontSize: '0.875rem' }}>
                    <Clock size={18} color="var(--amber-primary)" />
                    <span>Awaiting driver fleet allocation from Varthur Cold Storage.</span>
                  </div>
                )}
              </div>

              {/* Real OpenStreetMap Live Dispatch Route */}
              <div className="card" style={{ backgroundColor: 'var(--white)', padding: '1.25rem', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                  <h4 style={{ fontSize: '1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={18} color="var(--amber-primary)" />
                    <span>Live GPS Delivery Route</span>
                  </h4>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--success-green)', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '3px 8px', borderRadius: 'var(--radius-full)', letterSpacing: '0.04em' }}>
                    ● OpenStreetMap Live
                  </span>
                </div>

                <div style={{ height: '260px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-beige)' }}>
                  <OpenStreetMap
                    center={[activeOrder.coordinates?.lat || 12.923, activeOrder.coordinates?.lng || 77.674]}
                    zoom={13}
                    orders={[activeOrder]}
                    selectedOrderId={activeOrder.id}
                    drivers={activeOrder.assignedDriverId ? [{ id: activeOrder.assignedDriverId, name: activeOrder.assignedDriverName, vehicle: 'Chilled Delivery Van', status: 'On Route', activeDeliveries: 1 }] : []}
                    farmLocation={{ lat: settings.mapCenter?.lat || 12.923, lng: settings.mapCenter?.lng || 77.674, name: 'The Village Farm Hub (Origin)' }}
                    showRoute={true}
                    height="100%"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--muted-text)', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span>🟢 Varthur Hub ➔ 🔴 {activeOrder.customerName}</span>
                  <a
                    href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(activeOrder.deliveryAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--amber-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                  >
                    <span>Open in StreetMap</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Order Details & Address */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Destination Card */}
              <div className="card" style={{ backgroundColor: 'var(--white)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={18} color="var(--amber-primary)" />
                  <span>Delivery Address</span>
                </h4>

                <div style={{ fontSize: '0.875rem', lineHeight: '1.5', color: 'var(--charcoal)' }}>
                  <div style={{ fontWeight: 600 }}>{activeOrder.customerName}</div>
                  <div style={{ color: 'var(--muted-text)', marginTop: '2px' }}>{activeOrder.customerPhone}</div>
                  <div style={{ marginTop: '0.5rem' }}>{activeOrder.deliveryAddress}</div>
                  {activeOrder.landmark && (
                    <div style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: '4px' }}>
                      <strong>Landmark:</strong> {activeOrder.landmark}
                    </div>
                  )}
                  {activeOrder.instructions && (
                    <div style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: '4px' }}>
                      <strong>Note:</strong> {activeOrder.instructions}
                    </div>
                  )}
                </div>
              </div>

              {/* Items Summary Card */}
              <div className="card" style={{ backgroundColor: 'var(--white)' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={18} color="var(--amber-primary)" />
                  <span>Items Ordered ({activeOrder.items.length})</span>
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-beige)', paddingBottom: '1rem' }}>
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <div>
                        <span style={{ fontWeight: 500, color: 'var(--charcoal)' }}>{item.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginLeft: '6px' }}>
                          × {item.quantity}
                        </span>
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8125rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                    <span>Subtotal</span>
                    <span>₹{activeOrder.subtotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                    <span>Cold Chain Delivery</span>
                    <span>{activeOrder.deliveryFee === 0 ? 'FREE' : `₹${activeOrder.deliveryFee}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                    <span>Payment Method</span>
                    <span>{activeOrder.paymentMethod}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--charcoal)', borderTop: '1px dashed var(--border-beige)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                    <span>Total Amount</span>
                    <span style={{ color: 'var(--amber-dark)' }}>₹{activeOrder.total}</span>
                  </div>
                </div>

                {/* Support CTA */}
                <div style={{ marginTop: '1.25rem' }}>
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}?text=Help%20with%20Order%20${activeOrder.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-block btn-sm"
                    style={{ gap: '0.5rem' }}
                  >
                    <MessageCircle size={15} color="var(--success-green)" />
                    <span>WhatsApp Support for Order {activeOrder.id}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
