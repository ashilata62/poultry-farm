import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../../components/ui/Modal';
import { Layers, AlertTriangle, Plus, RefreshCw, CheckCircle2, Search } from 'lucide-react';

export const InventoryManager = () => {
  const { inventory, updateInventoryStock, addInventoryItem } = useFarm();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [adjustModalItem, setAdjustModalItem] = useState(null);
  const [newStockQty, setNewStockQty] = useState('');
  const [adjustReason, setAdjustReason] = useState('Morning Harvest Stock-In');

  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Processed Meat',
    unit: 'kg',
    available: 30,
    minThreshold: 15
  });

  const categories = ['All', 'Processed Meat', 'Feed & Nutrition', 'Packaging'];

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    if (adjustModalItem && newStockQty !== '') {
      updateInventoryStock(adjustModalItem.id, newStockQty, adjustReason);
      setAdjustModalItem(null);
    }
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    addInventoryItem({
      ...newItem,
      available: Number(newItem.available),
      minThreshold: Number(newItem.minThreshold)
    });
    setIsAddItemOpen(false);
    setNewItem({
      name: '',
      category: 'Processed Meat',
      unit: 'kg',
      available: 30,
      minThreshold: 15
    });
  };

  return (
    <div className="admin-page-container">
      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>TOTAL INVENTORY ITEMS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '4px' }}>
            {inventory.length} SKUs
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>PROCESSED POULTRY ON ICE</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '4px' }}>
            {inventory.filter((i) => i.category === 'Processed Meat').reduce((s, i) => s + i.available, 0)} units/kg
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>LOW STOCK WARNINGS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--error-red)', marginTop: '4px' }}>
            {inventory.filter((i) => i.status === 'Low Stock').length} items
          </div>
        </div>
      </div>

      {/* Filter and Action Strip */}
      <div className="admin-action-header">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: 1, width: '100%' }}>
          <div style={{ position: 'relative', minWidth: '220px', flex: 1, width: '100%' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
            />
            <input
              type="text"
              placeholder="Search inventory items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          <div className="pill-scroll-container">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: selectedCategory === cat ? 600 : 500,
                  backgroundColor: selectedCategory === cat ? 'var(--charcoal-deep)' : 'var(--warm-ivory)',
                  color: selectedCategory === cat ? 'var(--amber-primary)' : 'var(--charcoal)',
                  border: '1px solid var(--border-beige)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsAddItemOpen(true)}
          className="btn btn-primary"
          style={{ gap: '0.35rem' }}
        >
          <Plus size={16} />
          <span>New Stock SKU</span>
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
              <th>SKU ID</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Available Qty</th>
              <th>Allocated / Reserved</th>
              <th>Safety Threshold</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id}>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--muted-text)' }}>
                    {item.id}
                  </span>
                </td>
                <td>
                  <strong>{item.name}</strong>
                </td>
                <td>
                  <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                    {item.category}
                  </span>
                </td>
                <td>
                  <strong style={{ fontSize: '0.9375rem', color: item.status === 'Low Stock' ? 'var(--error-red)' : 'var(--charcoal)' }}>
                    {item.available} {item.unit}
                  </strong>
                </td>
                <td>
                  <span style={{ color: 'var(--muted-text)' }}>{item.reserved} {item.unit}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem' }}>Min: {item.minThreshold} {item.unit}</span>
                </td>
                <td>
                  <span className={`badge ${item.status === 'Low Stock' ? 'badge-red' : 'badge-green'}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setAdjustModalItem(item);
                      setNewStockQty(item.available);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px', gap: '0.25rem' }}
                  >
                    <RefreshCw size={13} />
                    <span>Adjust</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Adjust Modal */}
      {adjustModalItem && (
        <Modal
          isOpen={!!adjustModalItem}
          onClose={() => setAdjustModalItem(null)}
          title={`Adjust Stock: ${adjustModalItem.name}`}
        >
          <form onSubmit={handleAdjustSubmit}>
            <div style={{ padding: '0.875rem', backgroundColor: 'var(--soft-cream)', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
              <div>Current Available: <strong>{adjustModalItem.available} {adjustModalItem.unit}</strong></div>
              <div>Min Threshold: {adjustModalItem.minThreshold} {adjustModalItem.unit}</div>
            </div>

            <div className="form-group">
              <label className="form-label">New Available Quantity ({adjustModalItem.unit}) *</label>
              <input
                type="number"
                required
                min={0}
                className="form-input"
                value={newStockQty}
                onChange={(e) => setNewStockQty(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Adjustment Reason *</label>
              <select
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                className="form-select"
              >
                <option value="Morning Harvest Stock-In">Morning Harvest Stock-In</option>
                <option value="Feed Mill Delivery Received">Feed Mill Delivery Received</option>
                <option value="Cold Storage Physical Count Audit">Cold Storage Physical Count Audit</option>
                <option value="Damaged / Trimming Loss">Damaged / Trimming Loss</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setAdjustModalItem(null)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Adjustment
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add New SKU Modal */}
      {isAddItemOpen && (
        <Modal
          isOpen={isAddItemOpen}
          onClose={() => setIsAddItemOpen(false)}
          title="Add New Inventory SKU"
        >
          <form onSubmit={handleAddItemSubmit}>
            <div className="form-group">
              <label className="form-label">Item / SKU Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Free-Range Chicken Wings (1kg Pack)"
                className="form-input"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Processed Meat">Processed Meat</option>
                  <option value="Feed & Nutrition">Feed & Nutrition</option>
                  <option value="Packaging">Packaging</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Unit of Measure *</label>
                <input
                  type="text"
                  required
                  placeholder="kg / packs / bags / units"
                  className="form-input"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Initial Quantity *</label>
                <input
                  type="number"
                  required
                  min={0}
                  className="form-input"
                  value={newItem.available}
                  onChange={(e) => setNewItem({ ...newItem, available: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Low Stock Threshold *</label>
                <input
                  type="number"
                  required
                  min={1}
                  className="form-input"
                  value={newItem.minThreshold}
                  onChange={(e) => setNewItem({ ...newItem, minThreshold: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setIsAddItemOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Add Item
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
