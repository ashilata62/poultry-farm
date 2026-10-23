import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import {
  Truck,
  Phone,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Package,
  User,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export const DriverPortal = () => {
  const {
    orders,
    drivers,
    activeDriverId,
    setActiveDriverId,
    driverUpdateDelivery,
    setCurrentRole,
    setAdminModule
  } = useFarm();

  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'completed'
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [failedModalOrder, setFailedModalOrder] = useState(null);
  const [failureReason, setFailureReason] = useState('Customer unreachable on call');
  const [deliveryNote, setDeliveryNote] = useState('');

  const currentDriver = drivers.find((d) => d.id === activeDriverId) || drivers[0];

  // Filter deliveries strictly assigned to current authenticated driver
  const myDeliveries = orders.filter((o) => o.assignedDriverId === currentDriver.id);
  const activeDeliveries = myDeliveries.filter(
    (o) => o.orderStatus === 'confirmed' || o.orderStatus === 'processing' || o.orderStatus === 'in_transit'
  );
  const completedDeliveries = myDeliveries.filter(
    (o) => o.orderStatus === 'delivered' || o.orderStatus === 'cancelled'
  );

  const displayedList = activeTab === 'active' ? activeDeliveries : completedDeliveries;

  const handleStartDelivery = (orderId) => {
    driverUpdateDelivery(orderId, 'in_transit', `Delivery commenced by ${currentDriver.name}`);
    if (selectedDelivery && selectedDelivery.id === orderId) {
      setSelectedDelivery({ ...selectedDelivery, orderStatus: 'in_transit' });
    }
  };

  const handleMarkDelivered = (orderId) => {
    driverUpdateDelivery(
      orderId,
      'delivered',
      `Delivered fresh to customer. Handed over at address.`
    );
    setSelectedDelivery(null);
  };

  const handleReportFailed = () => {
    if (failedModalOrder) {
      driverUpdateDelivery(failedModalOrder.id, 'cancelled', `Delivery attempt failed: ${failureReason}`);
      setFailedModalOrder(null);
      setSelectedDelivery(null);
    }
  };

  const handleBackToFleet = () => {
    setCurrentRole('admin');
    setAdminModule('drivers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#F4EFE6', minHeight: '92vh', padding: '1rem 0 3rem' }}>
      <div className="container" style={{ maxWidth: '480px', paddingLeft: '1rem', paddingRight: '1rem' }}>
        {/* Back Navigation Bar with Arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.875rem'
          }}
        >
          <button
            onClick={handleBackToFleet}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'var(--white)',
              border: '1px solid var(--border-beige)',
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 0.85rem 0.4rem 0.65rem',
              color: 'var(--charcoal)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.15s ease'
            }}
            title="Back to Driver Fleet Roster"
            aria-label="Back to Driver Fleet Roster"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--warm-ivory)';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--white)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Fleet</span>
          </button>

          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--muted-text)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            Driver Mobile App
          </span>
        </div>

        {/* Driver Profile Header Card */}
        <div
          className="card"
          style={{
            backgroundColor: 'var(--charcoal-deep)',
            color: 'var(--white)',
            padding: '1.25rem',
            marginBottom: '1rem',
            border: 'none',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--amber-primary)',
                  color: 'var(--charcoal-deep)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}
              >
                <Truck size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', color: 'var(--white)', margin: 0 }}>
                  {currentDriver.name}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--amber-primary)', fontWeight: 600 }}>
                  {currentDriver.vehicle}
                </div>
              </div>
            </div>

            {/* Driver Profile Switcher */}
            <select
              value={activeDriverId}
              onChange={(e) => setActiveDriverId(e.target.value)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: 'var(--white)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-xs)',
                padding: '4px 8px',
                fontSize: '0.75rem'
              }}
            >
              {drivers.map((d) => (
                <option key={d.id} value={d.id} style={{ color: '#202321' }}>
                  Switch: {d.name}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
              fontSize: '0.75rem'
            }}
          >
            <div>
              <div style={{ color: '#999' }}>ACTIVE QUEUE</div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--amber-primary)' }}>
                {activeDeliveries.length}
              </strong>
            </div>
            <div>
              <div style={{ color: '#999' }}>DELIVERED</div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--success-green)' }}>
                {completedDeliveries.length}
              </strong>
            </div>
            <div>
              <div style={{ color: '#999' }}>COLD CHAIN</div>
              <strong style={{ fontSize: '1.25rem', color: 'var(--white)' }}>
                2.4°C
              </strong>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-beige)',
            padding: '4px',
            marginBottom: '1rem'
          }}
        >
          <button
            onClick={() => setActiveTab('active')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.875rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'active' ? 'var(--charcoal-deep)' : 'transparent',
              color: activeTab === 'active' ? 'var(--amber-primary)' : 'var(--charcoal)',
              transition: 'all 0.15s ease'
            }}
          >
            Active Stops ({activeDeliveries.length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.875rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'completed' ? 'var(--charcoal-deep)' : 'transparent',
              color: activeTab === 'completed' ? 'var(--amber-primary)' : 'var(--charcoal)',
              transition: 'all 0.15s ease'
            }}
          >
            Completed ({completedDeliveries.length})
          </button>
        </div>

        {/* Delivery Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {displayedList.length === 0 ? (
            <div
              className="card"
              style={{ textAlign: 'center', padding: '3rem 1.5rem', backgroundColor: 'var(--white)' }}
            >
              <CheckCircle2 size={36} color="var(--success-green)" style={{ margin: '0 auto 0.75rem' }} />
              <h4>No {activeTab} deliveries</h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: '4px' }}>
                {activeTab === 'active'
                  ? 'All assigned morning deliveries are completed or awaiting admin allocation.'
                  : 'Completed orders for today will appear here once marked delivered.'}
              </p>
            </div>
          ) : (
            displayedList.map((order, idx) => (
              <div
                key={order.id}
                className="card"
                style={{
                  backgroundColor: 'var(--white)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.875rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* Top strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--amber-soft)',
                        color: 'var(--amber-dark)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {idx + 1}
                    </span>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9375rem' }}>
                      {order.id}
                    </strong>
                  </div>
                  <StatusBadge status={order.orderStatus} type="order" />
                </div>

                {/* Customer Details & Address */}
                <div>
                  <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                    {order.customerName}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--charcoal)', marginTop: '0.35rem', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                    <MapPin size={16} color="var(--amber-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{order.deliveryAddress}</span>
                  </div>

                  {order.landmark && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginLeft: '1.35rem', marginTop: '2px' }}>
                      <strong>Landmark:</strong> {order.landmark}
                    </div>
                  )}

                  {order.instructions && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--amber-dark)', backgroundColor: 'var(--amber-soft)', padding: '4px 8px', borderRadius: 'var(--radius-xs)', marginTop: '0.5rem' }}>
                      <strong>Note:</strong> {order.instructions}
                    </div>
                  )}
                </div>

                {/* Items & Amount */}
                <div
                  style={{
                    padding: '0.625rem',
                    backgroundColor: 'var(--soft-cream)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.8125rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ color: 'var(--charcoal)' }}>
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>₹{order.total}</strong>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>{order.paymentMethod}</div>
                  </div>
                </div>

                {/* Direct Action Buttons for Driver (Phone call & Map Navigation) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <a
                    href={`tel:${order.customerPhone}`}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '0.35rem' }}
                  >
                    <Phone size={15} color="var(--success-green)" />
                    <span>Call Customer</span>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(order.deliveryAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '0.35rem' }}
                  >
                    <Navigation size={15} color="var(--amber-dark)" />
                    <span>Navigate (GPS)</span>
                  </a>
                </div>

                {/* Primary Workflow Execution Buttons */}
                {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                  <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-beige)', paddingTop: '0.75rem' }}>
                    {order.orderStatus !== 'in_transit' ? (
                      <button
                        onClick={() => handleStartDelivery(order.id)}
                        className="btn btn-primary btn-block"
                        style={{ gap: '0.5rem' }}
                      >
                        <Truck size={17} />
                        <span>Start Delivery Route</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleMarkDelivered(order.id)}
                          className="btn btn-primary"
                          style={{ flex: 1.5, backgroundColor: 'var(--success-green)', gap: '0.35rem' }}
                        >
                          <CheckCircle2 size={16} />
                          <span>Mark Delivered</span>
                        </button>

                        <button
                          onClick={() => setFailedModalOrder(order)}
                          className="btn btn-danger btn-sm"
                          style={{ flex: 1 }}
                        >
                          Report Issue
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Report Failed Delivery Modal */}
      {failedModalOrder && (
        <Modal
          isOpen={!!failedModalOrder}
          onClose={() => setFailedModalOrder(null)}
          title={`Delivery Issue: ${failedModalOrder.id}`}
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
