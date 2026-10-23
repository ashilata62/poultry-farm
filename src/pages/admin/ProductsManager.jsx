import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../../components/ui/Modal';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Search, Star, Package } from 'lucide-react';

export const ProductsManager = () => {
  const { products, addProduct, updateProduct, toggleProductActive } = useFarm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Curry Cuts',
    price: 300,
    unit: 'per 1kg pack',
    weight: '1.0 kg',
    stock: 25,
    description: '',
    origin: 'The Village Farm - Shed A',
    freshness: 'Harvested fresh at 5:00 AM daily',
    storage: 'Keep chilled at 0-4°C.'
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
      setEditingProduct(null);
    } else {
      addProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
      setIsAddModalOpen(false);
    }
    setFormData({
      name: '',
      category: 'Curry Cuts',
      price: 300,
      unit: 'per 1kg pack',
      weight: '1.0 kg',
      stock: 25,
      description: '',
      origin: 'The Village Farm - Shed A',
      freshness: 'Harvested fresh at 5:00 AM daily',
      storage: 'Keep chilled at 0-4°C.'
    });
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
      weight: product.weight,
      stock: product.stock,
      description: product.description,
      origin: product.origin,
      freshness: product.freshness,
      storage: product.storage
    });
  };

  return (
    <div className="admin-page-container">
      {/* Top Bar */}
      <div className="admin-action-header">
        <div style={{ position: 'relative', flex: 1, minWidth: '220px', width: '100%' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
          />
          <input
            type="text"
            placeholder="Search products & cuts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddModalOpen(true);
          }}
          className="btn btn-primary"
          style={{ gap: '0.35rem' }}
        >
          <Plus size={16} />
          <span>Add New Product Cut</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="table-container">
        <div className="table-scroll-hint">
          <span>← Scroll horizontally to see all columns →</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product Cut</th>
              <th>Category</th>
              <th>Price</th>
              <th>Pack / Unit</th>
              <th>Available Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: '220px' }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--charcoal)', whiteSpace: 'normal', lineHeight: 1.3 }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '2px' }}>{p.origin}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                    {p.category}
                  </span>
                </td>
                <td>
                  <strong style={{ color: 'var(--charcoal)', fontSize: '0.9375rem' }}>₹{p.price}</strong>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem' }}>{p.unit}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: p.stock < 15 ? 'var(--error-red)' : 'var(--charcoal)' }}>
                    {p.stock} units
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleProductActive(p.id)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: p.isAvailable ? 'var(--success-bg)' : 'var(--error-bg)',
                      color: p.isAvailable ? 'var(--success-green)' : 'var(--error-red)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {p.isAvailable ? 'Active' : 'Deactivated'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => openEditModal(p)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px', gap: '0.25rem' }}
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <Modal
          isOpen={isAddModalOpen || !!editingProduct}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
          title={editingProduct ? `Edit ${editingProduct.name}` : 'Add New Farm Cut'}
          maxWidth="600px"
        >
          <form onSubmit={handleSaveProduct}>
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Free-Range Chicken Breast Fillets"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <option value="Country/Desi Chicken">Country/Desi Chicken</option>
                  <option value="Curry Cuts">Curry Cuts</option>
                  <option value="Boneless & Fillets">Boneless & Fillets</option>
                  <option value="Specialty Poultry">Specialty Poultry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  className="form-input"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Unit Specification *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. per 1kg pack"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Current Stock Units *</label>
                <input
                  type="number"
                  required
                  min={0}
                  className="form-input"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Product Description</label>
              <textarea
                rows={3}
                className="form-textarea"
                placeholder="Description of the cut, flavor, and culinary suitability..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Product
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
