import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../../components/ui/Modal';
import { Users, Search, Phone, Mail, MapPin, ShoppingBag, Eye, Calendar } from 'lucide-react';

export const CustomersManager = () => {
  const { customers, orders } = useFarm();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customerOrders = selectedCustomer
    ? orders.filter(
        (o) =>
          o.customerPhone === selectedCustomer.phone ||
          o.customerName.toLowerCase() === selectedCustomer.name.toLowerCase()
      )
    : [];

  return (
    <div className="admin-page-container">
      {/* Top Header */}
      <div className="admin-action-header">
        <div style={{ position: 'relative', flex: 1, minWidth: '220px', width: '100%' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
          />
          <input
            type="text"
            placeholder="Search customers by name, phone, or neighborhood..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
          Total Registered Customers: <strong>{customers.length}</strong>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-scroll-hint">
          <span>← Scroll horizontally to see all columns →</span>
        </div>
        <table className="data-table" style={{ minWidth: '740px' }}>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Delivery Area</th>
              <th>Total Orders</th>
              <th>Lifetime Value (₹)</th>
              <th>Last Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--muted-text)' }}>
                    {c.id}
                  </span>
                </td>
                <td>
                  <strong>{c.name}</strong>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>{c.email}</div>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem' }}>{c.phone}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem' }}>{c.address}</span>
                </td>
                <td>
                  <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                    {c.totalOrders} orders
                  </span>
                </td>
                <td>
                  <strong style={{ color: 'var(--charcoal)' }}>₹{c.lifetimeSpend.toLocaleString()}</strong>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}>{c.lastOrderDate}</span>
                </td>
                <td>
                  <button
                    onClick={() => setSelectedCustomer(c)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px', gap: '0.25rem' }}
                  >
                    <Eye size={13} />
                    <span>History</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Order History Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={`Customer Profile: ${selectedCustomer.name}`}
          maxWidth="640px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Summary Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--soft-cream)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-beige)',
                fontSize: '0.875rem'
              }}
            >
              <div>
                <div style={{ color: 'var(--muted-text)', fontSize: '0.75rem' }}>Contact</div>
                <div style={{ fontWeight: 600 }}>{selectedCustomer.phone}</div>
                <div style={{ color: 'var(--muted-text)' }}>{selectedCustomer.email}</div>
              </div>

              <div>
                <div style={{ color: 'var(--muted-text)', fontSize: '0.75rem' }}>Purchasing Summary</div>
                <div style={{ fontWeight: 700, color: 'var(--amber-dark)' }}>
                  ₹{selectedCustomer.lifetimeSpend.toLocaleString()} Total Spend
                </div>
                <div style={{ color: 'var(--muted-text)' }}>{selectedCustomer.totalOrders} Completed Orders</div>
              </div>
            </div>

            {/* Orders list */}
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--charcoal)' }}>
                Recent Order Records
              </h4>

              {customerOrders.length === 0 ? (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--muted-text)', fontSize: '0.875rem' }}>
                  No recent orders logged in this current session.
                </div>
              ) : (
                <div style={{ border: '1px solid var(--border-beige)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <table className="data-table" style={{ fontSize: '0.8125rem' }}>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerOrders.map((o) => (
                        <tr key={o.id}>
                          <td><strong>{o.id}</strong></td>
                          <td>{new Date(o.orderDate).toLocaleDateString()}</td>
                          <td>{o.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}</td>
                          <td><strong>₹{o.total}</strong></td>
                          <td>
                            <span className="badge badge-green">{o.orderStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button onClick={() => setSelectedCustomer(null)} className="btn btn-primary btn-sm">
                Done
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
