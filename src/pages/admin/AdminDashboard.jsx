import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  TrendingUp,
  ShoppingCart,
  Clock,
  Truck,
  Layers,
  Activity,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Eye
} from 'lucide-react';

export const AdminDashboard = () => {
  const { orders, products, inventory, batches, setAdminModule, updateOrderStatus, assignDriver, drivers } = useFarm();

  // Metrics calculated from real state
  const totalSalesToday = orders
    .filter((o) => o.paymentStatus === 'Paid' || o.orderStatus === 'delivered' || o.orderStatus === 'in_transit')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending');
  const inTransitOrders = orders.filter((o) => o.orderStatus === 'in_transit');
  const lowStockItems = inventory.filter((i) => i.status === 'Low Stock');
  const totalLiveBirds = batches.reduce((sum, b) => sum + b.currentLiveCount, 0);

  const recentOrders = orders.slice(0, 5);

  return (
    <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {/* KPI 1: Sales */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', fontWeight: 600 }}>
              TODAY'S ORDERS VALUE
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--amber-soft)', color: 'var(--amber-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.1 }}>
            ₹{totalSalesToday.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-green)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ArrowUpRight size={14} />
            <span>+18% compared to yesterday morning</span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', fontWeight: 600 }}>
              PENDING ORDERS
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: pendingOrders.length > 0 ? 'var(--warning-bg)' : 'var(--warm-ivory)', color: 'var(--warning-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.1 }}>
            {pendingOrders.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '0.5rem' }}>
            {orders.length} total orders recorded today
          </div>
        </div>

        {/* KPI 3: In Transit */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', fontWeight: 600 }}>
              IN-TRANSIT DELIVERIES
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--amber-soft)', color: 'var(--amber-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.1 }}>
            {inTransitOrders.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '0.5rem' }}>
            {drivers.filter((d) => d.status === 'On Route').length} active delivery vans on route
          </div>
        </div>

        {/* KPI 4: Active Farm Birds */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', fontWeight: 600 }}>
              ACTIVE PASTURE BIRDS
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--success-bg)', color: 'var(--success-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', lineHeight: 1.1 }}>
            {totalLiveBirds.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '0.5rem' }}>
            Across 4 pasture sheds (Avg mortality: 1.9%)
          </div>
        </div>
      </div>

      {/* Operational Highlights & Low Stock Warning */}
      {lowStockItems.length > 0 && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--warning-bg)',
            border: '1px solid rgba(231, 161, 43, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle size={20} color="var(--warning-amber)" />
            <div>
              <strong style={{ color: 'var(--charcoal)', fontSize: '0.875rem' }}>
                Inventory Alert: {lowStockItems.length} item(s) below safety threshold!
              </strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                {lowStockItems.map((i) => `${i.name} (${i.available} ${i.unit} left)`).join(', ')}
              </div>
            </div>
          </div>
          <button
            onClick={() => setAdminModule('inventory')}
            className="btn btn-secondary btn-sm"
          >
            Adjust Inventory
          </button>
        </div>
      )}

      {/* Main Grid: Recent Orders & Poultry Flocks Snapshot */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.75rem'
        }}
      >
        {/* Recent Orders List */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border-beige)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.125rem', color: 'var(--charcoal)', margin: 0 }}>Recent Orders</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                Direct customer orders from web and QR
              </div>
            </div>
            <button
              onClick={() => setAdminModule('orders')}
              className="btn btn-ghost btn-sm"
              style={{ gap: '0.25rem', color: 'var(--amber-dark)' }}
            >
              <span>Manage All</span>
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Driver</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                        {order.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--muted-text)' }}>{order.customerPhone}</div>
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
                      <StatusBadge status={order.orderStatus} type="order" />
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8125rem', color: order.assignedDriverName !== 'Unassigned' ? 'var(--charcoal)' : 'var(--muted-text)' }}>
                        {order.assignedDriverName}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Farm Flocks Overview */}
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', color: 'var(--charcoal)', margin: 0 }}>Farm Flock Status</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                  Active poultry batches currently in sheds
                </div>
              </div>
              <button
                onClick={() => setAdminModule('batches')}
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--amber-dark)' }}
              >
                <span>View Batches</span>
                <ChevronRight size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {batches.slice(0, 3).map((b) => (
                <div
                  key={b.id}
                  style={{
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-beige)',
                    backgroundColor: 'var(--soft-cream)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--charcoal)' }}>
                        {b.shed}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                        {b.breed} • Age: {b.ageDays} days
                      </div>
                    </div>
                    <span className="badge badge-amber" style={{ fontSize: '0.6875rem' }}>
                      {b.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '0.5rem', borderTop: '1px dashed var(--border-beige)', paddingTop: '0.5rem' }}>
                    <span>Live Count: <strong style={{ color: 'var(--charcoal)' }}>{b.currentLiveCount}</strong> birds</span>
                    <span>Mortality: <strong style={{ color: 'var(--success-green)' }}>{b.mortalityRate}</strong></span>
                    <span>Feed: <strong style={{ color: 'var(--charcoal)' }}>{b.feedConsumedKg} kg</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-beige)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}>
              Next harvest planned: Tomorrow at <strong>5:00 AM</strong>
            </div>
            <button
              onClick={() => setAdminModule('batches')}
              className="btn btn-secondary btn-sm"
            >
              Log Daily Metrics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
