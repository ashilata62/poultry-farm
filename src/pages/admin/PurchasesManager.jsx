import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../../components/ui/Modal';
import { Plus, Search, ShoppingBag, Calendar, DollarSign } from 'lucide-react';

export const PurchasesManager = () => {
  const { purchases, addPurchase } = useFarm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    supplier: 'Karnataka BioFeed Mills',
    item: 'Organic Poultry Finisher Feed (50kg bags)',
    category: 'Feed',
    quantity: 20,
    unit: 'bags',
    unitCost: 1650
  });

  const filteredPurchases = purchases.filter(
    (p) =>
      p.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSpent = purchases.reduce((sum, p) => sum + p.total, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPurchase({
      ...formData,
      quantity: Number(formData.quantity),
      unitCost: Number(formData.unitCost)
    });
    setIsAddOpen(false);
  };

  return (
    <div className="admin-page-container">
      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>TOTAL PURCHASES OUTLAY</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '4px' }}>
            ₹{totalSpent.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            Across {purchases.length} supplier invoices
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>PRIMARY COST CENTER</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--amber-dark)', marginTop: '4px' }}>
            Poultry Feed (62%)
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            Natural grains, soy & mineral premix
          </div>
        </div>
      </div>

      {/* Action Header */}
      <div className="admin-action-header">
        <div style={{ position: 'relative', flex: 1, minWidth: '220px', width: '100%' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
          />
          <input
            type="text"
            placeholder="Search purchases by supplier, item, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <button onClick={() => setIsAddOpen(true)} className="btn btn-primary" style={{ gap: '0.35rem' }}>
          <Plus size={16} />
          <span>Record Purchase</span>
        </button>
      </div>

      {/* Purchases Table */}
      <div className="table-container">
        <div className="table-scroll-hint">
          <span>← Scroll horizontally to see all columns →</span>
        </div>
        <table className="data-table" style={{ minWidth: '760px' }}>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Supplier Name</th>
              <th>Item Description</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Cost</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((p) => (
              <tr key={p.id}>
                <td>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>{p.id}</strong>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}>{p.date}</span>
                </td>
                <td>
                  <strong>{p.supplier}</strong>
                </td>
                <td>
                  <span>{p.item}</span>
                </td>
                <td>
                  <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>{p.category}</span>
                </td>
                <td>
                  <span>{p.quantity} {p.unit}</span>
                </td>
                <td>
                  <span>₹{p.unitCost}</span>
                </td>
                <td>
                  <strong style={{ color: 'var(--charcoal)' }}>₹{p.total.toLocaleString()}</strong>
                </td>
                <td>
                  <span className="badge badge-green" style={{ fontSize: '0.6875rem' }}>{p.paymentStatus}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Purchase Modal */}
      {isAddOpen && (
        <Modal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="Record Farm Supply Purchase"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Supplier Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Nandi Organic Feed Mills"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Item Description *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. 50kg Organic Starter Mash"
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Feed">Feed & Nutrition</option>
                  <option value="Flock Inflow">Flock / Day-old Chicks</option>
                  <option value="Packaging">Packaging Trays & Cool Gel</option>
                  <option value="Veterinary">Veterinary Probiotics & Care</option>
                  <option value="Equipment">Farm Equipment</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Unit *</label>
                <input
                  type="text"
                  required
                  placeholder="kg / bags / chicks / units"
                  className="form-input"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  required
                  min={1}
                  className="form-input"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Unit Cost (₹) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  className="form-input"
                  value={formData.unitCost}
                  onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
                />
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--soft-cream)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', textAlign: 'right' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>Calculated Total: </span>
              <strong style={{ fontSize: '1.125rem', color: 'var(--amber-dark)' }}>
                ₹{(Number(formData.quantity || 0) * Number(formData.unitCost || 0)).toLocaleString()}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button type="button" onClick={() => setIsAddOpen(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Purchase
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
