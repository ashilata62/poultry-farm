import React, { useState, useMemo } from 'react';
import { useFarm } from '../../context/FarmContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Truck,
  XCircle,
  Printer,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  UserCheck
} from 'lucide-react';

export const OrdersManager = () => {
  const { orders, updateOrderStatus, assignDriver, drivers } = useFarm();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('Customer requested cancellation');

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
      const matchesSearch =
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customerPhone.includes(searchTerm);
      return matchesStatus && matchesSearch;
    });
  }, [orders, searchTerm, statusFilter]);

  const handlePrintSlip = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Order Pack Slip - ${order.id}</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #202321; }
            .header { border-bottom: 2px solid #202321; padding-bottom: 12px; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f7efe3; }
            .total { font-size: 18px; font-weight: bold; margin-top: 16px; text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>THE VILLAGE FARM — CHILLED DISPATCH SLIP</h2>
            <p><strong>Order ID:</strong> ${order.id} | <strong>Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
          </div>
          <p><strong>Customer:</strong> ${order.customerName} (${order.customerPhone})</p>
          <p><strong>Delivery Destination:</strong> ${order.deliveryAddress}</p>
          <p><strong>Instructions:</strong> ${order.instructions || 'Standard Cold Delivery'}</p>
          <p><strong>Assigned Van:</strong> ${order.assignedDriverName} (${order.assignedDriverPhone || 'Unassigned'})</p>

          <table>
            <thead>
              <tr><th>Item Description</th><th>Quantity</th><th>Unit Price</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${order.items.map((i) => `<tr><td>${i.name}</td><td>${i.quantity}</td><td>₹${i.price}</td><td>₹${i.price * i.quantity}</td></tr>`).join('')}
            </tbody>
          </table>

          <div class="total">
            <p>Subtotal: ₹${order.subtotal}</p>
            <p>Delivery Fee: ₹${order.deliveryFee}</p>
            <p>Grand Total: ₹${order.total} (${order.paymentMethod})</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #666;">Inspected at Varthur Hub Cold Storage. Keep chilled at 0-4°C.</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleConfirmCancel = () => {
    if (cancelModalOrder) {
      updateOrderStatus(cancelModalOrder.id, 'cancelled', cancelReason);
      setCancelModalOrder(null);
      if (selectedOrder && selectedOrder.id === cancelModalOrder.id) {
        setSelectedOrder(null);
      }
    }
  };

  return (
    <div className="admin-page-container">
      {/* Top Controls */}
      <div
        style={{
          backgroundColor: 'var(--white)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-beige)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '220px', width: '100%' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
            />
            <input
              type="text"
              placeholder="Search by Order ID, Customer Name, or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--muted-text)' }}>
            <span>Total: <strong>{filteredOrders.length}</strong></span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="pill-scroll-container">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending', label: 'Pending Review' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'processing', label: 'Packed' },
            { id: 'in_transit', label: 'Out for Delivery' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'cancelled', label: 'Cancelled' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8125rem',
                fontWeight: statusFilter === tab.id ? 600 : 500,
                backgroundColor: statusFilter === tab.id ? 'var(--charcoal-deep)' : 'var(--warm-ivory)',
                color: statusFilter === tab.id ? 'var(--amber-primary)' : 'var(--charcoal)',
                border: '1px solid',
                borderColor: statusFilter === tab.id ? 'var(--charcoal-deep)' : 'var(--border-beige)',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <div className="table-scroll-hint">
          <span>← Scroll horizontally to see all columns →</span>
        </div>
        <table className="data-table" style={{ minWidth: '820px' }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Destination Address</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Assigned Driver</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted-text)' }}>
                  No orders found matching the filter criteria.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                      {order.id}
                    </span>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>
                      {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>{order.customerPhone}</div>
                  </td>
                  <td style={{ maxWidth: '200px' }}>
                    <div style={{ fontSize: '0.8125rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={order.deliveryAddress}>
                      {order.deliveryAddress}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8125rem' }}>
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--charcoal)' }}>₹{order.total}</strong>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.75rem' }}>
                      <span className={`badge ${order.paymentStatus === 'Paid' ? 'badge-green' : 'badge-warning'}`} style={{ fontSize: '0.6875rem' }}>
                        {order.paymentStatus}
                      </span>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                        {order.paymentMethod}
                      </div>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={order.orderStatus} type="order" />
                  </td>
                  <td>
                    {order.orderStatus === 'cancelled' || order.orderStatus === 'delivered' ? (
                      <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}>
                        {order.assignedDriverName}
                      </span>
                    ) : (
                      <select
                        value={order.assignedDriverId || ''}
                        onChange={(e) => assignDriver(order.id, e.target.value)}
                        className="form-select"
                        style={{ padding: '4px 8px', fontSize: '0.75rem', width: 'auto' }}
                      >
                        <option value="" disabled>Assign Driver</option>
                        {drivers.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.status})
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px' }}
                        title="View Full Order Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handlePrintSlip(order)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '4px 8px' }}
                        title="Print Dispatch Slip"
                      >
                        <Printer size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order Details: ${selectedOrder.id}`}
          maxWidth="640px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Status and Action Strip */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.875rem 1rem',
                backgroundColor: 'var(--soft-cream)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-beige)'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>Current Status:</span>
                <div style={{ marginTop: '2px' }}>
                  <StatusBadge status={selectedOrder.orderStatus} type="order" />
                </div>
              </div>

              {selectedOrder.orderStatus !== 'cancelled' && selectedOrder.orderStatus !== 'delivered' && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {selectedOrder.orderStatus === 'pending' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'confirmed');
                        setSelectedOrder({ ...selectedOrder, orderStatus: 'confirmed' });
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <CheckCircle2 size={14} />
                      <span>Confirm Order</span>
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'confirmed' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'processing');
                        setSelectedOrder({ ...selectedOrder, orderStatus: 'processing' });
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <span>Mark Packed</span>
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'processing' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'in_transit');
                        setSelectedOrder({ ...selectedOrder, orderStatus: 'in_transit' });
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <Truck size={14} />
                      <span>Dispatch Van</span>
                    </button>
                  )}

                  {selectedOrder.orderStatus === 'in_transit' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, 'delivered');
                        setSelectedOrder({ ...selectedOrder, orderStatus: 'delivered' });
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: 'var(--success-green)' }}
                    >
                      <CheckCircle2 size={14} />
                      <span>Mark Delivered</span>
                    </button>
                  )}

                  <button
                    onClick={() => setCancelModalOrder(selectedOrder)}
                    className="btn btn-danger btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="form-grid-2" style={{ gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ padding: '0.875rem', border: '1px solid var(--border-beige)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: 600, color: 'var(--charcoal)', marginBottom: '0.35rem' }}>
                  Customer Details
                </div>
                <div>{selectedOrder.customerName}</div>
                <div style={{ color: 'var(--muted-text)', marginTop: '2px' }}>{selectedOrder.customerPhone}</div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8125rem' }}>
                  <strong>Address:</strong> {selectedOrder.deliveryAddress}
                </div>
                {selectedOrder.instructions && (
                  <div style={{ marginTop: '0.35rem', fontSize: '0.8125rem', color: 'var(--amber-dark)' }}>
                    <strong>Note:</strong> {selectedOrder.instructions}
                  </div>
                )}
              </div>

              <div style={{ padding: '0.875rem', border: '1px solid var(--border-beige)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontWeight: 600, color: 'var(--charcoal)', marginBottom: '0.35rem' }}>
                  Driver & Vehicle
                </div>
                <div>{selectedOrder.assignedDriverName}</div>
                <div style={{ color: 'var(--muted-text)', marginTop: '2px' }}>
                  {selectedOrder.assignedDriverPhone || 'No phone recorded'}
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-text)', display: 'block', marginBottom: '4px' }}>
                    Reassign Delivery Staff:
                  </label>
                  <select
                    value={selectedOrder.assignedDriverId || ''}
                    onChange={(e) => {
                      assignDriver(selectedOrder.id, e.target.value);
                      const drv = drivers.find((d) => d.id === e.target.value);
                      if (drv) {
                        setSelectedOrder({
                          ...selectedOrder,
                          assignedDriverId: drv.id,
                          assignedDriverName: drv.name,
                          assignedDriverPhone: drv.phone
                        });
                      }
                    }}
                    className="form-select"
                    style={{ fontSize: '0.8125rem', padding: '4px 8px' }}
                  >
                    <option value="" disabled>Select Driver</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.vehicle})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Ordered Cuts</h4>
              <div style={{ border: '1px solid var(--border-beige)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <table className="data-table" style={{ fontSize: '0.8125rem' }}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((i, idx) => (
                      <tr key={idx}>
                        <td>{i.name}</td>
                        <td>{i.quantity}</td>
                        <td>₹{i.price}</td>
                        <td>₹{i.price * i.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8125rem', borderTop: '1px solid var(--border-beige)', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                <span>Delivery Fee</span>
                <span>{selectedOrder.deliveryFee === 0 ? 'FREE' : `₹${selectedOrder.deliveryFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: 'var(--charcoal)', borderTop: '1px dashed var(--border-beige)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--amber-dark)' }}>₹{selectedOrder.total}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button onClick={() => handlePrintSlip(selectedOrder)} className="btn btn-secondary btn-sm">
                <Printer size={15} />
                <span>Print Packing Slip</span>
              </button>
              <button onClick={() => setSelectedOrder(null)} className="btn btn-primary btn-sm">
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalOrder && (
        <Modal
          isOpen={!!cancelModalOrder}
          onClose={() => setCancelModalOrder(null)}
          title={`Confirm Order Cancellation: ${cancelModalOrder.id}`}
        >
          <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--charcoal)', marginBottom: '1rem' }}>
              Are you sure you want to cancel order <strong>{cancelModalOrder.id}</strong> for {cancelModalOrder.customerName}?
            </p>
            <div className="form-group">
              <label className="form-label">Cancellation Reason *</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="form-select"
              >
                <option value="Customer requested cancellation">Customer requested cancellation</option>
                <option value="Product harvest stock unavailable">Product harvest stock unavailable</option>
                <option value="Address unserviceable today">Address unserviceable today</option>
                <option value="Customer unreachable on phone">Customer unreachable on phone</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={() => setCancelModalOrder(null)} className="btn btn-secondary btn-sm">
                Keep Order
              </button>
              <button onClick={handleConfirmCancel} className="btn btn-danger btn-sm">
                Confirm Cancellation
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
