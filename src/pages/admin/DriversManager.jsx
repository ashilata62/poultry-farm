import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../../components/ui/Modal';
import { Truck, Plus, Phone, CheckCircle2, AlertCircle, Search, Star } from 'lucide-react';

export const DriversManager = () => {
  const { drivers, addDriver, setActiveDriverId, setCurrentRole, setDriverSource } = useFarm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: 'Refrigerated Delivery Electric Van (KA-05-EV-)'
  });

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.phone.includes(searchTerm)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addDriver(formData);
    setIsAddOpen(false);
    setFormData({
      name: '',
      phone: '',
      vehicle: 'Refrigerated Delivery Electric Van (KA-05-EV-)'
    });
  };

  const handleTestDriverView = (driverId) => {
    setActiveDriverId(driverId);
    if (setDriverSource) setDriverSource('admin');
    setCurrentRole('driver');
  };

  return (
    <div className="admin-page-container">
      {/* Top Banner */}
      <div className="admin-action-header">
        <div style={{ position: 'relative', flex: 1, minWidth: '220px', width: '100%' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
          />
          <input
            type="text"
            placeholder="Search driver fleet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <button onClick={() => setIsAddOpen(true)} className="btn btn-primary" style={{ gap: '0.35rem' }}>
          <Plus size={16} />
          <span>Add Fleet Driver</span>
        </button>
      </div>

      {/* Grid of Drivers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.5rem' }}>
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            className="card"
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--amber-soft)',
                      color: 'var(--amber-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Truck size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', color: 'var(--charcoal)', margin: 0 }}>
                      {driver.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                      {driver.vehicle}
                    </div>
                  </div>
                </div>

                <span
                  className={`badge ${driver.status === 'Available' ? 'badge-green' : 'badge-amber'}`}
                >
                  {driver.status}
                </span>
              </div>

              {/* Specs */}
              <div
                style={{
                  padding: '0.875rem',
                  backgroundColor: 'var(--soft-cream)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-beige)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8125rem',
                  marginBottom: '1rem'
                }}
              >
                <div>
                  <div style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>ACTIVE DISPATCHES</div>
                  <strong style={{ fontSize: '1.125rem', color: 'var(--charcoal)' }}>
                    {driver.activeDeliveries}
                  </strong>
                </div>

                <div>
                  <div style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>DELIVERED TODAY</div>
                  <strong style={{ fontSize: '1.125rem', color: 'var(--success-green)' }}>
                    {driver.completedToday}
                  </strong>
                </div>

                <div>
                  <div style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>DRIVER RATING</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700, fontSize: '1.125rem', color: 'var(--charcoal)' }}>
                    <Star size={14} fill="#E7A12B" stroke="#E7A12B" />
                    <span>{driver.rating}</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="var(--amber-dark)" />
                <span>{driver.phone}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-beige)', paddingTop: '1rem' }}>
              <a
                href={`tel:${driver.phone}`}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, gap: '0.35rem' }}
              >
                <Phone size={14} />
                <span>Call Staff</span>
              </a>
              <button
                onClick={() => handleTestDriverView(driver.id)}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                Open Mobile App
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Driver Modal */}
      {isAddOpen && (
        <Modal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          title="Add Cold-Chain Driver"
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Driver Full Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Anand Gowda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                required
                className="form-input"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Vehicle Registration & Type *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. Chilled EV Van (KA-05-EV-5542)"
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setIsAddOpen(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Add to Fleet
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
