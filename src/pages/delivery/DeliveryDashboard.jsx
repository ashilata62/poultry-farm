import React, { useState, useMemo } from 'react';
import { useFarm } from '../../context/FarmContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  MapPin,
  Truck,
  Phone,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  Navigation,
  ChevronRight,
  User,
  ShieldCheck,
  Thermometer,
  Layers
} from 'lucide-react';

export const DeliveryDashboard = () => {
  const {
    orders,
    drivers,
    assignDriver,
    updateOrderStatus,
    settings,
    trackingOrderId,
    setTrackingOrderId
  } = useFarm();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | pending | assigned | in_transit | delivered | cancelled
  const [mobileTab, setMobileTab] = useState('list'); // 'list' | 'map'
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || 'TVF-84920');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);

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

  return (
    <div style={{ backgroundColor: 'var(--soft-cream)', minHeight: 'calc(100vh - 110px)', display: 'flex', flexDirection: 'column' }}>
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
          gridTemplateColumns: 'minmax(380px, 420px) 1fr',
          height: 'calc(100vh - 110px)'
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
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-beige)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--charcoal)' }}>
                  Delivery Queue
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                  {filteredOrders.length} orders scheduled for cold dispatch
                </span>
              </div>
              <span className="badge badge-amber">
                Cold Chain Active
              </span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
              />
              <input
                type="text"
                placeholder="Search by order, customer, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.25rem', fontSize: '0.875rem' }}
              />
            </div>

            {/* Status Filter Chips */}
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', marginTop: '0.75rem', paddingBottom: '2px' }}>
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
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: statusFilter === filter.id ? 600 : 500,
                    backgroundColor: statusFilter === filter.id ? 'var(--charcoal-deep)' : 'var(--warm-ivory)',
                    color: statusFilter === filter.id ? 'var(--amber-primary)' : 'var(--charcoal)',
                    border: '1px solid',
                    borderColor: statusFilter === filter.id ? 'var(--charcoal-deep)' : 'var(--border-beige)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Order Cards List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-text)', fontSize: '0.875rem' }}>
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
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid',
                      borderColor: isSelected ? 'var(--amber-primary)' : 'var(--border-beige)',
                      backgroundColor: isSelected ? 'var(--amber-soft)' : 'var(--white)',
                      boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                        {order.id}
                      </span>
                      <StatusBadge status={order.orderStatus} type="order" />
                    </div>

                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--charcoal)', marginBottom: '2px' }}>
                      {order.customerName}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', display: 'flex', alignItems: 'flex-start', gap: '4px', marginBottom: '0.5rem' }}>
                      <MapPin size={13} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--amber-dark)' }} />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {order.deliveryAddress}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', borderTop: '1px dashed var(--border-beige)', paddingTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: order.assignedDriverName !== 'Unassigned' ? 'var(--charcoal)' : 'var(--muted-text)' }}>
                        <Truck size={13} color="var(--amber-dark)" />
                        <span>{order.assignedDriverName}</span>
                      </div>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--charcoal)' }}>
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
            padding: '1.25rem',
            gap: '1.25rem'
          }}
        >
          {/* Map Status & Configuration Banner */}
          <div
            style={{
              padding: '0.875rem 1rem',
              backgroundColor: 'var(--white)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-beige)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
              fontSize: '0.8125rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--charcoal)' }}>
              <Info size={16} color="var(--amber-dark)" />
              <span>
                <strong>Map Engine:</strong> Vector Route Preview Active • Provider API: <em>Unconfigured (Local Spatial Mode)</em>
              </span>
            </div>

            <button
              onClick={() => setShowConfigDrawer(!showConfigDrawer)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem' }}
            >
              Configure Map API Key
            </button>
          </div>

          {/* Map Provider Setup Form (if toggled) */}
          {showConfigDrawer && (
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--warm-ivory)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-beige)',
                fontSize: '0.8125rem'
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--charcoal)' }}>
                Production Map Service Configuration (Mapbox / Google Maps / Leaflet)
              </div>
              <p style={{ color: 'var(--muted-text)', margin: '0 0 0.75rem' }}>
                To display satellite tiles or turn-by-turn road networks, configure <code>VITE_MAPBOX_TOKEN</code> or <code>VITE_GOOGLE_MAPS_KEY</code> in your environment file.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '480px' }}>
                <input
                  type="text"
                  placeholder="Enter pk.eyJ... or AIzaSy..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.8125rem', padding: '4px 8px' }}
                />
                <button
                  onClick={() => {
                    alert('Map provider configuration recorded for session.');
                    setShowConfigDrawer(false);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Save Key
                </button>
              </div>
            </div>
          )}

          {/* Geospatial Map Canvas Container */}
          <div
            style={{
              flex: 1,
              minHeight: '340px',
              backgroundColor: '#EAE6DF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-beige)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            {/* Ambient Map Grid Background */}
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(41, 43, 42, 0.08)" strokeWidth="1" />
                </pattern>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#287A4B" />
                  <stop offset="50%" stopColor="#F28C28" />
                  <stop offset="100%" stopColor="#C74440" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="#F3EFE8" />
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Simulated Arterial Road Network (Varthur - Sarjapur - Bellandur - Koramangala) */}
              <path d="M 50 180 Q 220 160 380 220 T 700 180" stroke="#DDD7CE" strokeWidth="8" fill="none" />
              <path d="M 220 50 Q 240 200 260 350" stroke="#DDD7CE" strokeWidth="6" fill="none" />
              <path d="M 120 320 Q 340 290 580 340" stroke="#DDD7CE" strokeWidth="6" fill="none" />

              {/* Active Route Vector */}
              <path
                d="M 160 140 Q 280 200 460 210"
                stroke="url(#routeGrad)"
                strokeWidth="4"
                strokeDasharray="6 4"
                fill="none"
              />

              {/* Waypoint Nodes */}
              <circle cx="160" cy="140" r="8" fill="#287A4B" stroke="#FFF" strokeWidth="2" />
              <circle cx="310" cy="180" r="7" fill="#F28C28" stroke="#FFF" strokeWidth="2" />
              <circle cx="460" cy="210" r="9" fill="#C74440" stroke="#FFF" strokeWidth="2" />
            </svg>

            {/* Farm Origin Pin */}
            <div
              style={{
                position: 'absolute',
                left: '120px',
                top: '90px',
                backgroundColor: 'var(--charcoal-deep)',
                color: 'var(--white)',
                padding: '4px 8px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success-green)' }} />
              <span>Varthur Farm Hub (Origin)</span>
            </div>

            {/* In-Transit Van Node */}
            <div
              style={{
                position: 'absolute',
                left: '280px',
                top: '140px',
                backgroundColor: 'var(--amber-primary)',
                color: 'var(--charcoal-deep)',
                padding: '4px 8px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Truck size={13} />
              <span>{selectedOrder ? selectedOrder.assignedDriverName : 'Delivery Van'} (Chilled 2.8°C)</span>
            </div>

            {/* Destination Pin */}
            <div
              style={{
                position: 'absolute',
                left: '430px',
                top: '225px',
                backgroundColor: 'var(--error-red)',
                color: 'var(--white)',
                padding: '4px 8px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <MapPin size={13} />
              <span>{selectedOrder ? selectedOrder.customerName : 'Destination'}</span>
            </div>

            {/* Bottom Floating Telemetry Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-beige)',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                fontSize: '0.8125rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Navigation size={15} color="var(--amber-primary)" />
                  <span>Est. Distance: <strong>11.4 km</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={15} color="var(--charcoal)" />
                  <span>ETA: <strong>35 mins</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--success-green)' }}>
                  <Thermometer size={15} />
                  <span>Chilled Box: <strong>2.8°C</strong></span>
                </div>
              </div>

              <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>
                GPS Location: Based on driver checkpoint sync
              </div>
            </div>
          </div>

          {/* Selected Order Operational Details Card */}
          {selectedOrder && (
            <div
              className="card"
              style={{
                backgroundColor: 'var(--white)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--charcoal)' }}>
                      {selectedOrder.id} — {selectedOrder.customerName}
                    </h3>
                    <StatusBadge status={selectedOrder.orderStatus} type="order" />
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                    {selectedOrder.deliveryAddress}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--charcoal)' }}>
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
                  padding: '0.625rem 0.875rem',
                  backgroundColor: 'var(--soft-cream)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>
                  <strong>Cuts:</strong> {selectedOrder.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                </span>
                <span className="badge badge-green" style={{ fontSize: '0.6875rem' }}>
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
                  gap: '1rem',
                  borderTop: '1px solid var(--border-beige)',
                  paddingTop: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Assign Driver:</label>
                  <select
                    value={selectedOrder.assignedDriverId || ''}
                    onChange={(e) => assignDriver(selectedOrder.id, e.target.value)}
                    className="form-select"
                    style={{ fontSize: '0.8125rem', padding: '4px 8px', width: 'auto' }}
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
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {selectedOrder.orderStatus !== 'in_transit' && selectedOrder.orderStatus !== 'delivered' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'in_transit')}
                      className="btn btn-primary btn-sm"
                      style={{ gap: '0.35rem' }}
                    >
                      <Truck size={14} />
                      <span>Start Transit</span>
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'in_transit' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: 'var(--success-green)', gap: '0.35rem' }}
                    >
                      <CheckCircle2 size={14} />
                      <span>Mark Delivered</span>
                    </button>
                  )}

                  <a
                    href={`tel:${selectedOrder.customerPhone}`}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '0.35rem' }}
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
