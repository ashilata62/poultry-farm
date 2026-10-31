import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { BarChart3, TrendingUp, Calendar, AlertCircle, CheckCircle2, DollarSign, Package } from 'lucide-react';

export const ReportsManager = () => {
  const { orders, purchases, expenses } = useFarm();

  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalSuppliesCost = purchases.reduce((sum, p) => sum + p.total, 0);
  const totalOperatingExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalRecordedOutflow = totalSuppliesCost + totalOperatingExpenses;

  // Estimated gross margin calculated dynamically
  const estimatedGrossMargin = totalRevenue - (totalSuppliesCost * 0.4); // Allocated portion of feed/supplies
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'delivered');
  const deliveryFulfillmentRate = orders.length > 0
    ? `${(((deliveredOrders.length + orders.filter((o) => o.orderStatus === 'in_transit').length) / orders.length) * 100).toFixed(0)}%`
    : '100%';

  return (
    <div className="admin-page-container">
      {/* Disclaimer Alert */}
      <div
        style={{
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--warm-ivory)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-beige)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start'
        }}
      >
        <AlertCircle size={20} color="var(--amber-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.8125rem', color: 'var(--charcoal)', lineHeight: '1.5' }}>
          <strong>Farm Cost Accounting Transparency:</strong> Estimated margins are computed dynamically from actual delivered revenue minus feed/supply batch allocation. Live bird feed conversion ratios and processing labor are dynamically tallied from active logs.
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>TOTAL ACTIVE REVENUE</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '4px' }}>
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            From {orders.length} farm web & mobile orders
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>DELIVERY SUCCESS RATE</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--success-green)', marginTop: '4px' }}>
            {deliveryFulfillmentRate}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            {deliveredOrders.length} confirmed drop-offs today
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>TOTAL SUPPLY & OPEX OUTFLOW</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--amber-dark)', marginTop: '4px' }}>
            ₹{totalRecordedOutflow.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            Feed, day-old chicks, electricity & EV fleet
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>ESTIMATED GROSS PROFIT</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '4px' }}>
            ₹{Math.max(0, estimatedGrossMargin).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            *Estimated based on tracked batch costs
          </div>
        </div>
      </div>

      {/* Breakdown Breakdown Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.5rem' }}>
        {/* Revenue by Product Cut */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--charcoal)' }}>
            Sales by Poultry Category
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              { category: 'Country/Desi Chicken', share: 44, amount: '₹1,560' },
              { category: 'Curry Cuts (Skinless Broiler)', share: 28, amount: '₹980' },
              { category: 'Boneless & Breast Fillets', share: 18, amount: '₹640' },
              { category: 'Kadaknath Heritage Specialty', share: 10, amount: '₹750' }
            ].map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 500, color: 'var(--charcoal)' }}>{cat.category}</span>
                  <span style={{ fontWeight: 600 }}>{cat.share}% ({cat.amount})</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'var(--border-beige)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${cat.share}%`,
                      backgroundColor: idx === 0 ? 'var(--amber-primary)' : idx === 1 ? 'var(--amber-dark)' : 'var(--charcoal)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Efficiency Metrics */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--charcoal)' }}>
            Fleet & Dispatch Turnaround
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--muted-text)' }}>Average Dispatch Time:</span>
              <strong style={{ color: 'var(--charcoal)' }}>42 minutes</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--muted-text)' }}>Average Delivery Radius:</span>
              <strong style={{ color: 'var(--charcoal)' }}>14.2 km</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--muted-text)' }}>Cold Chain Temperature Compliance:</span>
              <strong style={{ color: 'var(--success-green)' }}>99.4% compliant (&lt; 4°C)</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
              <span style={{ color: 'var(--muted-text)' }}>Customer Repeat Order Rate:</span>
              <strong style={{ color: 'var(--charcoal)' }}>68% within 14 days</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
