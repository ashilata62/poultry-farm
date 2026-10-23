import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { OpenStreetMap } from '../../components/common/OpenStreetMap';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Navigation } from 'lucide-react';

export const ContactPage = () => {
  const { settings, showToast } = useFarm();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your inquiry has been sent to our farm manager!', 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--soft-cream)', minHeight: '80vh', padding: '3.5rem 0 5rem' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
            Get In Touch
          </div>
          <h1 style={{ color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
            Contact The Village Farm
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--muted-text)', maxWidth: '600px', margin: '0 auto' }}>
            Have a question about daily cuts, farm visits, bulk catering requirements, or our cold-chain delivery service? We are here to help.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2.5rem'
          }}
        >
          {/* Farm Contact Details */}
          <div className="card" style={{ backgroundColor: 'var(--white)', padding: 'clamp(1rem, 4vw, 2rem)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Farm & Hub Office</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--amber-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--amber-dark)',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--charcoal)' }}>Location Address</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                    {settings.farmAddress}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--amber-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--amber-dark)',
                    flexShrink: 0
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--charcoal)' }}>Phone Support</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                    <a href={`tel:${settings.phone}`} style={{ color: 'inherit' }}>{settings.phone}</a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--amber-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--amber-dark)',
                    flexShrink: 0
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--charcoal)' }}>Email Dispatch</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                    <a href={`mailto:${settings.email}`} style={{ color: 'inherit' }}>{settings.email}</a>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--amber-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--amber-dark)',
                    flexShrink: 0
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--charcoal)' }}>Harvest & Delivery Hours</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                    {settings.operatingHours}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-beige)' }}>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}?text=Hello%20The%20Village%20Farm`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block"
                style={{ gap: '0.5rem' }}
              >
                <MessageCircle size={18} />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="card" style={{ backgroundColor: 'var(--white)', padding: 'clamp(1rem, 4vw, 2rem)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Send Us a Message</h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={44} color="var(--success-green)" style={{ margin: '0 auto 1rem' }} />
                <h4>Message Received</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-text)', marginTop: '0.5rem' }}>
                  Thank you! Our farm dispatch supervisor will respond to your mobile number shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '1.5rem' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-select"
                  >
                    <option value="General Inquiry">General Fresh Meat Inquiry</option>
                    <option value="Delivery Radius">Delivery Radius / Location Check</option>
                    <option value="Bulk/Party Orders">Bulk / Party Orders</option>
                    <option value="Weekly Subscription">Weekly Recurring Subscription</option>
                    <option value="Farm Visit">Farm Visit & Flock Inspection</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what cuts, quantities, or delivery requirements you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ gap: '0.5rem' }}>
                  <Send size={16} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Real OpenStreetMap Farm Location Card */}
        <div className="card" style={{ backgroundColor: 'var(--white)', padding: '1.5rem', marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-green)', boxShadow: '0 0 6px var(--success-green)' }} />
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Farm Hub Geospatial Location</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted-text)', margin: '4px 0 0' }}>
                {settings.farmAddress}
              </p>
            </div>

            <a
              href={`https://www.openstreetmap.org/?mlat=${settings.mapCenter?.lat || 12.923}&mlon=${settings.mapCenter?.lng || 77.674}#map=16/${settings.mapCenter?.lat || 12.923}/${settings.mapCenter?.lng || 77.674}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.35rem' }}
            >
              <Navigation size={15} color="var(--amber-dark)" />
              <span>Open in StreetMap Directions ↗</span>
            </a>
          </div>

          <div style={{ height: '340px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-beige)' }}>
            <OpenStreetMap
              center={[settings.mapCenter?.lat || 12.923, settings.mapCenter?.lng || 77.674]}
              zoom={14}
              farmLocation={{
                lat: settings.mapCenter?.lat || 12.923,
                lng: settings.mapCenter?.lng || 77.674,
                name: 'The Village Farm — Pasture Sheds & Dispatch Hub'
              }}
              orders={[]}
              drivers={[]}
              showRoute={false}
              height="100%"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--muted-text)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span>🚚 Direct farm cold-chain delivery within <strong>{settings.deliveryRadiusKm} km</strong> of Varthur / Gunjur</span>
            <span style={{ color: 'var(--success-green)', fontWeight: 600 }}>Fresh morning cuts dispatched daily</span>
          </div>
        </div>
      </div>
    </div>
  );
};
