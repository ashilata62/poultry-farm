import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../../components/ui/Modal';
import { Activity, Plus, Edit, HeartPulse, Sparkles, Feather } from 'lucide-react';

export const BatchesManager = () => {
  const { batches, addBatch, updateBatch } = useFarm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);

  const [formData, setFormData] = useState({
    shed: 'Shed A-3 (Open Pasture)',
    breed: 'Country Chicken (Desi)',
    arrivalDate: new Date().toISOString().split('T')[0],
    initialBirds: 400,
    currentLiveCount: 400,
    ageDays: 1,
    avgWeightKg: 0.12,
    status: 'Brooding / Nursery',
    notes: 'Vaccinated against Ranikhet, organic starter feed provided.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingBatch) {
      const mortality = Number(formData.initialBirds) - Number(formData.currentLiveCount);
      const mortalityRate = `${((mortality / Number(formData.initialBirds)) * 100).toFixed(1)}%`;
      updateBatch(editingBatch.id, {
        ...formData,
        initialBirds: Number(formData.initialBirds),
        currentLiveCount: Number(formData.currentLiveCount),
        ageDays: Number(formData.ageDays),
        avgWeightKg: Number(formData.avgWeightKg),
        mortality,
        mortalityRate
      });
      setEditingBatch(null);
    } else {
      addBatch({
        ...formData,
        initialBirds: Number(formData.initialBirds),
        currentLiveCount: Number(formData.currentLiveCount),
        ageDays: Number(formData.ageDays),
        avgWeightKg: Number(formData.avgWeightKg)
      });
      setIsAddModalOpen(false);
    }
  };

  const openEdit = (b) => {
    setEditingBatch(b);
    setFormData({
      shed: b.shed,
      breed: b.breed,
      arrivalDate: b.arrivalDate,
      initialBirds: b.initialBirds,
      currentLiveCount: b.currentLiveCount,
      ageDays: b.ageDays,
      avgWeightKg: b.avgWeightKg,
      status: b.status,
      notes: b.notes || ''
    });
  };

  const totalBirds = batches.reduce((sum, b) => sum + b.currentLiveCount, 0);

  return (
    <div className="admin-page-container">
      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>TOTAL LIVE BIRDS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: '4px' }}>
            {totalBirds.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            Across {batches.length} farm pasture flocks
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>HARVEST READY FLOCKS</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--amber-dark)', marginTop: '4px' }}>
            {batches.filter((b) => b.status.includes('Harvest')).length} Sheds
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-green)', marginTop: '4px' }}>
            Ready for same-day dawn butchering
          </div>
        </div>

        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', fontWeight: 600 }}>AVG FLOCK MORTALITY</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--success-green)', marginTop: '4px' }}>
            1.9%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '4px' }}>
            Target threshold &lt; 4.0%
          </div>
        </div>
      </div>

      {/* Action Header */}
      <div className="admin-action-header">
        <div>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--charcoal)', margin: 0 }}>Active Poultry Batches</h3>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '2px' }}>
            Track flock genetics, daily growth, mortality rate, and feed conversion efficiency
          </div>
        </div>

        <button
          onClick={() => {
            setEditingBatch(null);
            setIsAddModalOpen(true);
          }}
          className="btn btn-primary"
          style={{ gap: '0.35rem' }}
        >
          <Plus size={16} />
          <span>Register New Batch</span>
        </button>
      </div>

      {/* Batches Table */}
      <div className="table-container">
        <div className="table-scroll-hint">
          <span>← Scroll horizontally to see all columns →</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Shed / Location</th>
              <th>Poultry Breed</th>
              <th>Arrival Date</th>
              <th>Age (Days)</th>
              <th>Live Bird Count</th>
              <th>Mortality Rate</th>
              <th>Avg Weight</th>
              <th>Feed Eaten (kg)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.id}>
                <td>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                    {b.id}
                  </strong>
                </td>
                <td>
                  <strong>{b.shed}</strong>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem' }}>{b.breed}</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}>{b.arrivalDate}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600 }}>{b.ageDays}d</span>
                </td>
                <td>
                  <strong style={{ color: 'var(--charcoal)' }}>{b.currentLiveCount}</strong>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', marginLeft: '4px' }}>
                    / {b.initialBirds}
                  </span>
                </td>
                <td>
                  <span style={{ color: Number(b.mortalityRate?.replace('%', '') || 0) > 3 ? 'var(--warning-amber)' : 'var(--success-green)', fontWeight: 600 }}>
                    {b.mortalityRate} ({b.mortality} loss)
                  </span>
                </td>
                <td>
                  <span>{b.avgWeightKg} kg</span>
                </td>
                <td>
                  <span>{b.feedConsumedKg} kg</span>
                </td>
                <td>
                  <span className="badge badge-amber">
                    {b.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => openEdit(b)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 8px', gap: '0.25rem' }}
                  >
                    <Edit size={13} />
                    <span>Update</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Batch Modal */}
      {(isAddModalOpen || editingBatch) && (
        <Modal
          isOpen={isAddModalOpen || !!editingBatch}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingBatch(null);
          }}
          title={editingBatch ? `Update Flock: ${editingBatch.id}` : 'Register New Poultry Batch'}
          maxWidth="600px"
        >
          <form onSubmit={handleSave}>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Shed Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shed A-1 (Free Range)"
                  className="form-input"
                  value={formData.shed}
                  onChange={(e) => setFormData({ ...formData, shed: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Breed *</label>
                <select
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="form-select"
                >
                  <option value="Country Chicken (Desi)">Country Chicken (Desi)</option>
                  <option value="Cobb 500 Broiler">Cobb 500 Broiler</option>
                  <option value="Kadaknath Black Chicken">Kadaknath Black Chicken</option>
                  <option value="Aseel Crossbreed">Aseel Crossbreed</option>
                </select>
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Arrival Date *</label>
                <input
                  type="date"
                  required
                  className="form-input"
                  value={formData.arrivalDate}
                  onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Birds *</label>
                <input
                  type="number"
                  required
                  min={1}
                  className="form-input"
                  value={formData.initialBirds}
                  onChange={(e) => setFormData({ ...formData, initialBirds: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Current Live Count *</label>
                <input
                  type="number"
                  required
                  min={0}
                  className="form-input"
                  value={formData.currentLiveCount}
                  onChange={(e) => setFormData({ ...formData, currentLiveCount: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Age in Days *</label>
                <input
                  type="number"
                  required
                  min={1}
                  className="form-input"
                  value={formData.ageDays}
                  onChange={(e) => setFormData({ ...formData, ageDays: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Avg Weight (kg) *</label>
                <input
                  type="number"
                  step="0.05"
                  required
                  className="form-input"
                  value={formData.avgWeightKg}
                  onChange={(e) => setFormData({ ...formData, avgWeightKg: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Batch Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-select"
                >
                  <option value="Brooding / Nursery">Brooding / Nursery</option>
                  <option value="Growing">Growing</option>
                  <option value="Maturing">Maturing</option>
                  <option value="Ready for Harvest">Ready for Harvest</option>
                  <option value="Harvesting Ongoing">Harvesting Ongoing</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Veterinary & Health Notes</label>
              <textarea
                rows={2}
                className="form-textarea"
                placeholder="Feed formula, paddock rotation schedule, health check..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingBatch(null);
                }}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Batch
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
