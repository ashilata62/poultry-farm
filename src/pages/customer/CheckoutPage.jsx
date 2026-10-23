import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lock
} from 'lucide-react';

export const CheckoutPage = () => {
  const {
    cart,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    placeOrder,
    setCustomerView,
    settings
  } = useFarm();

  const [formData, setFormData] = useState({
    name: 'Ananya Sharma',
    phone: '9820154321',
    email: 'ananya.sharma@gmail.com',
    address: 'Apartment 4B, Green Glen Layout, Bellandur, Bengaluru 560103',
    landmark: 'Near Central Park Clubhouse',
    instructions: 'Ring doorbell twice. Deliver in insulated cold bag.',
    paymentMethod: 'UPI On Delivery'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onlinePaymentStep, setOnlinePaymentStep] = useState(null); // 'processing' | 'verified' | null

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--soft-cream)', minHeight: '75vh', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Your Basket is Empty</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Please select poultry items from our fresh morning cuts before proceeding to checkout.
          </p>
          <button onClick={() => setCustomerView('shop')} className="btn btn-primary">
            Browse Farm Cuts
          </button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    if (formData.paymentMethod === 'Verified Online Gateway') {
      setOnlinePaymentStep('processing');
      // Simulate verified online payment gateway transaction
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setOnlinePaymentStep('verified');
      await new Promise((resolve) => setTimeout(resolve, 600));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 700));
    }

    const order = placeOrder({
      ...formData,
      phone: `+91 ${formData.phone.replace(/[^0-9]/g, '')}`
    });

    setIsSubmitting(false);
    if (order) {
      setCustomerView('tracking');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--soft-cream)', minHeight: '85vh', padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Breadcrumb / Back button */}
        <button
          onClick={() => setCustomerView('shop')}
          className="btn btn-ghost btn-sm"
          style={{ marginBottom: '1.5rem', gap: '0.35rem', color: 'var(--muted-text)' }}
        >
          <ArrowLeft size={16} />
          <span>Continue Shopping</span>
        </button>

        <h1 style={{ color: 'var(--charcoal)', marginBottom: '0.5rem' }}>Checkout & Dispatch</h1>
        <p style={{ marginBottom: '2.5rem', color: 'var(--muted-text)' }}>
          Confirm your delivery address and schedule temperature-controlled morning dispatch.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'start'
            }}
          >
            {/* Left: Customer Information & Delivery Address */}
            <div
              className="card"
              style={{ backgroundColor: 'var(--white)' }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--amber-primary)',
                    color: 'var(--charcoal-deep)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  1
                </span>
                <span>Delivery Destination</span>
              </h3>

              {/* Full Name */}
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              {/* Phone & Email Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <div style={{ position: 'relative' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--muted-text)'
                      }}
                    >
                      +91
                    </span>
                    <input
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ paddingLeft: '2.6rem' }}
                    />
                  </div>
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="form-group">
                <label className="form-label">Complete Delivery Address *</label>
                <textarea
                  className={`form-textarea ${errors.address ? 'error' : ''}`}
                  rows={3}
                  placeholder="House/Flat number, Building name, Street, Area, Pincode"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                {errors.address && <div className="form-error">{errors.address}</div>}
              </div>

              {/* Landmark */}
              <div className="form-group">
                <label className="form-label">Nearby Landmark (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Opposite Community Center"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                />
              </div>

              {/* Delivery Instructions */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Delivery Note / Instructions</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Leave with gate security / Ring bell twice"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                />
              </div>

              {/* Payment Section */}
              <h3
                style={{
                  fontSize: '1.25rem',
                  marginTop: '2.5rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--amber-primary)',
                    color: 'var(--charcoal-deep)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  2
                </span>
                <span>Payment Preference</span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {/* UPI on Delivery */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid',
                    borderColor: formData.paymentMethod === 'UPI On Delivery' ? 'var(--amber-primary)' : 'var(--border-beige)',
                    backgroundColor: formData.paymentMethod === 'UPI On Delivery' ? 'var(--amber-soft)' : 'var(--white)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI On Delivery"
                      checked={formData.paymentMethod === 'UPI On Delivery'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'UPI On Delivery' })}
                      style={{ accentColor: 'var(--amber-primary)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                        UPI / QR Code Upon Delivery
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                        Scan delivery driver's official QR with GPay, PhonePe, or Paytm
                      </div>
                    </div>
                  </div>
                  <QrCode size={20} color="var(--amber-dark)" />
                </label>

                {/* Cash on Delivery */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid',
                    borderColor: formData.paymentMethod === 'Cash On Delivery' ? 'var(--amber-primary)' : 'var(--border-beige)',
                    backgroundColor: formData.paymentMethod === 'Cash On Delivery' ? 'var(--amber-soft)' : 'var(--white)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash On Delivery"
                      checked={formData.paymentMethod === 'Cash On Delivery'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'Cash On Delivery' })}
                      style={{ accentColor: 'var(--amber-primary)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                        Cash On Delivery (COD)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                        Pay cash directly to our refrigerated delivery staff
                      </div>
                    </div>
                  </div>
                  <Banknote size={20} color="var(--charcoal)" />
                </label>

                {/* Verified Online Gateway */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid',
                    borderColor: formData.paymentMethod === 'Verified Online Gateway' ? 'var(--amber-primary)' : 'var(--border-beige)',
                    backgroundColor: formData.paymentMethod === 'Verified Online Gateway' ? 'var(--amber-soft)' : 'var(--white)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Verified Online Gateway"
                      checked={formData.paymentMethod === 'Verified Online Gateway'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'Verified Online Gateway' })}
                      style={{ accentColor: 'var(--amber-primary)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                        Instant Online Gateway (Cards / NetBanking)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                        256-bit encrypted checkout with verified transaction confirmation
                      </div>
                    </div>
                  </div>
                  <CreditCard size={20} color="var(--charcoal)" />
                </label>
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div
              className="card"
              style={{
                backgroundColor: 'var(--white)',
                position: 'sticky',
                top: '90px'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Order Summary</h3>

              {/* Item line items */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.875rem',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  paddingRight: '4px',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid var(--border-beige)',
                  paddingBottom: '1.25rem'
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.875rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                          {item.product.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                          Qty: {item.quantity} × ₹{item.product.price}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Truck size={14} color="var(--amber-dark)" />
                    <span>Cold Chain Insulated Van</span>
                  </span>
                  <span>{cartDeliveryFee === 0 ? <strong style={{ color: 'var(--success-green)' }}>FREE</strong> : `₹${cartDeliveryFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                  <span>Packaging & Ice Gel Packs</span>
                  <span style={{ color: 'var(--success-green)', fontWeight: 600 }}>Complimentary</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--charcoal)',
                    borderTop: '1px dashed var(--border-beige)',
                    paddingTop: '0.75rem',
                    marginTop: '0.25rem'
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: 'var(--amber-dark)' }}>₹{cartTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
                disabled={isSubmitting}
                style={{ gap: '0.5rem' }}
              >
                {isSubmitting ? (
                  onlinePaymentStep === 'processing' ? (
                    <span>Verifying Secure Gateway...</span>
                  ) : (
                    <span>Registering Order & Dispatch...</span>
                  )
                ) : (
                  <>
                    <Lock size={17} />
                    <span>Place Farm Order • ₹{cartTotal}</span>
                  </>
                )}
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--muted-text)',
                  marginTop: '1rem'
                }}
              >
                <ShieldCheck size={16} color="var(--success-green)" />
                <span>100% Farm Fresh Guarantee • Hand-inspected</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
