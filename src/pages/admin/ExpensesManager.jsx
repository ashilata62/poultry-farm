import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../../components/ui/Modal';
import { Plus, Search, CreditCard, DollarSign } from 'lucide-react';

export const ExpensesManager = () => {
  const { expenses, addExpense } = useFarm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    category: 'Utilities & Cold Chain',
    title: 'Cold Storage Chiller Servicing',
    amount: 3500,
    notes: 'Routine refrigerant top-up and seal inspection'
  });

  const filteredExpenses = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      ...formData,
      amount: Number(formData.amount)
    });
    setIsAddOpen(false);
  };

  return (
    <div className="admin-page-container">
      {/* Top Metric */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>TOTAL MONTHLY OPEX</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '4px' }}>
            ₹{totalExpenses.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            Farm maintenance, cold storage electricity, labor & fuel
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>LARGEST EXPENSE CATEGORY</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--amber-dark)', marginTop: '4px' }}>
            Farm Labor & Hands
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            Pasture maintenance & daily bird welfare
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
            placeholder="Search operational expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <button onClick={() => setIsAddOpen(true)} className="btn btn-primary" style={{ gap: '0.35rem' }}>
          <Plus size={16} />
          <span>Record Expense</span>
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-scroll-hint">
          <span>← Scroll horizontally to see all columns →</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Expense ID</th>
              <th>Date</th>
              <th>Expense Item</th>
              <th>Category</th>
              <th>Amount (₹)</th>
              <th>Operational Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>{exp.id}</strong>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}>{exp.date}</span>
                </td>
                <td>
                  <strong>{exp.title}</strong>
                </td>
                <td>
                  <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>{exp.category}</span>
                </td>
                <td>
                  <strong style={{ color: 'var(--charcoal)' }}>₹{exp.amount.toLocaleString()}</strong>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}>{exp.notes}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Expense Modal */}
      {isAddOpen && (
        <Modal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="Record Operating Expense"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Expense Title *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Solar Backup Generator Fuel"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="form-select"
              >
                <option value="Utilities & Cold Chain">Utilities & Cold Chain (0-4°C chillers)</option>
                <option value="Logistics & Transport">Logistics & EV Van Charging</option>
                <option value="Biosecurity & Sanitation">Biosecurity & Sanitation</option>
                <option value="Labor & Farm Hands">Labor & Farm Hands</option>
                <option value="Veterinary Care">Veterinary Inspections & Health Clearance</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₹) *</label>
              <input
                type="number"
                required
                min={1}
                className="form-input"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notes / Justification</label>
              <textarea
                rows={2}
                className="form-textarea"
                placeholder="Details of vendor, invoice reference, or farm purpose..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setIsAddOpen(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Expense
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
