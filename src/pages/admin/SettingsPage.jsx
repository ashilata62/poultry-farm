import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Settings, Save, RotateCcw, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export const SettingsPage = () => {
  const { settings, updateSettings, resetToDemoData } = useFarm();
  const [formData, setFormData] = useState({ ...settings });

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings({
      ...formData,
      deliveryRadiusKm: Number(formData.deliveryRadiusKm),
      deliveryFee: Number(formData.deliveryFee),
      freeDeliveryThreshold: Number(formData.freeDeliveryThreshold)
    });
  };

  return (
    <div className="admin-page-container" style={{ maxWidth: '800px' }}>
      <form onSubmit={handleSave}>
        {/* Farm Identity Card */}
        <div className="card" style={{ backgroundColor: 'var(--white)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.25rem', color: 'var(--charcoal)' }}>
            Farm Business Identity
          </h3>

          <div className="form-group">
            <label className="form-label">Farm / Brand Name *</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.farmName}
              onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tagline / Mission</label>
            <input
              type="text"
              className="form-input"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Support Phone *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp Number *</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Farm Dispatch Address *</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.farmAddress}
              onChange={(e) => setFormData({ ...formData, farmAddress: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Operating & Harvest Hours</label>
            <input
              type="text"
              className="form-input"
              value={formData.operatingHours}
              onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
            />
          </div>
        </div>

        {/* Delivery Policy Card */}
        <div className="card" style={{ backgroundColor: 'var(--white)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.25rem', color: 'var(--charcoal)' }}>
            Cold-Chain Delivery Parameters
          </h3>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Standard Delivery Fee (₹)</label>
              <input
                type="number"
                min={0}
                className="form-input"
                value={formData.deliveryFee}
                onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Free Delivery Over (₹)</label>
              <input
                type="number"
                min={0}
                className="form-input"
                value={formData.freeDeliveryThreshold}
                onChange={(e) => setFormData({ ...formData, freeDeliveryThreshold: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Max Radius (km)</label>
              <input
                type="number"
                min={1}
                className="form-input"
                value={formData.deliveryRadiusKm}
                onChange={(e) => setFormData({ ...formData, deliveryRadiusKm: e.target.value })}
              />
            </div>
          </div>

          {/* Payment Methods Checkboxes */}
          <div style={{ marginTop: '0.5rem' }}>
            <label className="form-label">Active Customer Payment Options</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.allowCOD}
                  onChange={(e) => setFormData({ ...formData, allowCOD: e.target.checked })}
                  style={{ accentColor: 'var(--amber-primary)' }}
                />
                <span>Allow Cash on Delivery (COD)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.allowUPI}
                  onChange={(e) => setFormData({ ...formData, allowUPI: e.target.checked })}
                  style={{ accentColor: 'var(--amber-primary)' }}
                />
                <span>Allow UPI QR Scan on Delivery</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.allowOnlineGateway}
                  onChange={(e) => setFormData({ ...formData, allowOnlineGateway: e.target.checked })}
                  style={{ accentColor: 'var(--amber-primary)' }}
                />
                <span>Allow Online Payment Gateway (Cards / NetBanking)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            type="button"
            onClick={resetToDemoData}
            className="btn btn-secondary btn-sm"
            style={{ gap: '0.35rem', color: 'var(--error-red)' }}
          >
            <RotateCcw size={14} />
            <span>Reset Demo Data</span>
          </button>

          <button type="submit" className="btn btn-primary" style={{ gap: '0.5rem' }}>
            <Save size={16} />
            <span>Save Farm Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
