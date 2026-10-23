import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Clock,
  CheckCircle2,
  PhoneCall,
  QrCode,
  MapPin,
  ChevronRight,
  Star
} from 'lucide-react';

export const HomePage = () => {
  const {
    products,
    addToCart,
    setSelectedProductModal,
    setCustomerView,
    setIsQrModalOpen,
    settings
  } = useFarm();

  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  const featuredProducts = products.slice(0, 4);

  const checkPincode = (e) => {
    e.preventDefault();
    const cleanPin = pincodeInput.trim();
    if (!cleanPin) return;

    // Supported delivery pin codes in Bengaluru east/south corridor
    const validCodes = ['560087', '560103', '560034', '560102', '560037', '560066', '560035', '560068'];
    if (validCodes.includes(cleanPin) || cleanPin.startsWith('560')) {
      setPincodeResult({
        serviceable: true,
        message: `Pincode ${cleanPin} is within our fresh morning delivery radius! Dispatch available daily.`
      });
    } else {
      setPincodeResult({
        serviceable: false,
        message: `Pincode ${cleanPin} is outside our direct 25km refrigerated van radius. Contact us on WhatsApp for bulk courier.`
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          backgroundColor: 'var(--charcoal-deep)',
          color: 'var(--warm-ivory)',
          overflow: 'hidden',
          padding: 'clamp(2.5rem, 5vw, 4.5rem) 0 clamp(3rem, 6vw, 5rem)'
        }}
      >
        {/* Subtle Ambient Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(242, 140, 40, 0.12) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left Hero Content */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(242, 140, 40, 0.15)',
                  border: '1px solid rgba(242, 140, 40, 0.3)',
                  padding: '0.375rem 0.875rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  color: 'var(--amber-primary)',
                  fontWeight: 600,
                  marginBottom: '1.5rem'
                }}
              >
                <Sparkles size={15} />
                <span>Harvested Fresh Daily at 5:00 AM • Never Frozen</span>
              </div>

              <h1
                style={{
                  color: 'var(--white)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.15
                }}
              >
                Pure, Pasture-Raised Poultry. <br />
                <span style={{ color: 'var(--amber-primary)', fontStyle: 'italic' }}>
                  Direct From Our Farm
                </span>{' '}
                to Your Door.
              </h1>

              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#DDD6CC',
                  lineHeight: '1.7',
                  marginBottom: '2rem',
                  maxWidth: '540px'
                }}
              >
                Experience genuine country and free-range chicken raised on open pastures with natural grains, sunlight, and zero antibiotics. Chilled and delivered within 90 minutes of dispatch.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                <button
                  onClick={() => {
                    setCustomerView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-primary btn-lg"
                  style={{ gap: '0.625rem' }}
                >
                  <ShoppingBag size={19} />
                  <span>Order Fresh Chicken</span>
                </button>

                <button
                  onClick={() => {
                    setCustomerView('tracking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn btn-outline"
                  style={{ borderColor: 'var(--border-beige)', color: 'var(--warm-ivory)' }}
                >
                  <Truck size={19} />
                  <span>Track Live Delivery</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '1.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={20} color="var(--success-green)" />
                  <span style={{ fontSize: '0.8125rem', color: '#DDD6CC', fontWeight: 500 }}>
                    100% Antibiotic-Free
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={20} color="var(--amber-primary)" />
                  <span style={{ fontSize: '0.8125rem', color: '#DDD6CC', fontWeight: 500 }}>
                    0-4°C Cold Chain Van
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={20} color="var(--success-green)" />
                  <span style={{ fontSize: '0.8125rem', color: '#DDD6CC', fontWeight: 500 }}>
                    Same-Day Farm Harvest
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '2px solid rgba(242, 140, 40, 0.3)',
                  boxShadow: 'var(--shadow-xl)',
                  position: 'relative'
                }}
              >
                <img
                  src="/images/farm_hero.jpg"
                  alt="The Village Farm - Free Range Poultry Pastures"
                  style={{
                    width: '100%',
                    height: 'clamp(260px, 45vw, 420px)',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    insetInline: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(32, 35, 33, 0.92) 0%, rgba(32, 35, 33, 0) 100%)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--amber-primary)', fontWeight: 700, letterSpacing: '0.05em' }}>
                        Ethical Pasture Flock
                      </div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--white)', fontWeight: 600 }}>
                        The Village Farm, Varthur Hub
                      </div>
                    </div>
                    <button
                      onClick={() => setIsQrModalOpen(true)}
                      className="btn btn-sm btn-primary"
                      style={{ padding: '0.35rem 0.75rem' }}
                    >
                      <QrCode size={14} />
                      <span>Scan QR</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Performance Stats Banner */}
      <section
        style={{
          backgroundColor: 'var(--warm-ivory)',
          borderBottom: '1px solid var(--border-beige)',
          padding: '2rem 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '1.5rem',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                450+
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)', fontWeight: 500 }}>
                Daily Pasture Birds
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--amber-primary)' }}>
                &lt; 90 min
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)', fontWeight: 500 }}>
                Harvest to Chilled Dispatch
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                0°C – 4°C
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)', fontWeight: 500 }}>
                Unbroken Cold Chain
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, color: 'var(--success-green)' }}>
                4.9 ★
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--muted-text)', fontWeight: 500 }}>
                Customer Taste Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Chicken Cuts */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--soft-cream)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}
          >
            <div>
              <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
                Handpicked Farm Cuts
              </div>
              <h2 style={{ color: 'var(--charcoal)' }}>Today’s Fresh Farm Harvest</h2>
              <p style={{ maxWidth: '600px', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
                Carefully dressed, hand-trimmed, and chilled within hours of harvest for supreme juiciness and rich poultry flavor.
              </p>
            </div>

            <button
              onClick={() => {
                setCustomerView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn btn-outline"
              style={{ gap: '0.5rem' }}
            >
              <span>View All Cuts</span>
              <ChevronRight size={17} />
            </button>
          </div>

          {/* Product Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                }}
              >
                {/* Product Image */}
                <div
                  style={{ position: 'relative', cursor: 'pointer' }}
                  onClick={() => setSelectedProductModal(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  {product.isPopular && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'var(--amber-primary)',
                        color: 'var(--charcoal-deep)',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      BESTSELLER
                    </span>
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(32, 35, 33, 0.85)',
                      color: 'var(--white)',
                      fontSize: '0.75rem',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Star size={12} fill="#E7A12B" stroke="#E7A12B" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--amber-dark)', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {product.category}
                    </div>
                    <h3
                      onClick={() => setSelectedProductModal(product)}
                      style={{
                        fontSize: '1.0625rem',
                        color: 'var(--charcoal)',
                        marginBottom: '0.35rem',
                        cursor: 'pointer',
                        lineHeight: 1.3
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--muted-text)',
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                      <div>
                        <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                          ₹{product.price}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginLeft: '4px' }}>
                          {product.unit}
                        </span>
                      </div>
                      <span className="badge badge-green" style={{ fontSize: '0.6875rem' }}>
                        {product.stock} in stock
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setSelectedProductModal(product)}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1 }}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1.3, gap: '0.35rem' }}
                      >
                        <ShoppingBag size={14} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section style={{ backgroundColor: 'var(--warm-ivory)', padding: '4rem 0', borderTop: '1px solid var(--border-beige)', borderBottom: '1px solid var(--border-beige)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2rem'
            }}
          >
            {/* Promo 1 */}
            <div
              className="card"
              style={{
                backgroundColor: 'var(--white)',
                border: '1.5px solid var(--amber-light)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
                  WEEKEND SPECIAL COMBO
                </span>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                  Sunday Family Feast Bundle
                </h3>
                <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                  Includes 1x Whole Country Chicken (1.2kg) + 1kg Farm Broiler Curry Cut. Perfect for the hearty weekend family curry with authentic countryside flavor.
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--amber-dark)' }}>
                    ₹540
                  </span>
                  <span style={{ textDecoration: 'line-through', color: 'var(--muted-text)', fontSize: '0.9375rem' }}>
                    ₹580
                  </span>
                  <span className="badge badge-green">Save ₹40</span>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(products[0], 1);
                  addToCart(products[1], 1);
                }}
                className="btn btn-primary"
              >
                Add Weekend Combo to Cart
              </button>
            </div>

            {/* Promo 2 */}
            <div
              className="card"
              style={{
                backgroundColor: 'var(--charcoal-deep)',
                color: 'var(--white)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span className="badge badge-amber" style={{ marginBottom: '0.75rem', backgroundColor: 'rgba(242, 140, 40, 0.2)' }}>
                  HIGH-PROTEIN PLAN
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--white)', marginBottom: '0.5rem' }}>
                  Athlete & Fitness Meal Prep Pack
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#B5AFA6', marginBottom: '1.25rem' }}>
                  2kg Lean Boneless Chicken Breast Fillets hand-trimmed of visible fat. Packed in two sealed 1kg portions with zero added preservatives.
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--amber-primary)' }}>
                    ₹680
                  </span>
                  <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.9375rem' }}>
                    ₹720
                  </span>
                  <span className="badge badge-green">Save ₹40</span>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(products[2], 2);
                }}
                className="btn btn-primary"
              >
                Add Fitness Pack to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Farm-to-Fork Process */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--soft-cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
              TRANSPARENT FARMING
            </span>
            <h2 style={{ color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
              How The Village Farm Delivers Purity
            </h2>
            <p style={{ fontSize: '0.9375rem' }}>
              From open pasture rearing to temperature-monitored refrigerated dispatch, every bird is handled with biosecurity and utmost respect.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem'
            }}
          >
            <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--amber-soft)',
                  color: 'var(--amber-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  fontWeight: 700,
                  fontSize: '1.25rem'
                }}
              >
                1
              </div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Open Pasture Flocks</h4>
              <p style={{ fontSize: '0.875rem' }}>
                Our birds enjoy direct sunlight, grassy paddocks, and a certified natural vegetarian grain feed without chemical growth hormones.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--amber-soft)',
                  color: 'var(--amber-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  fontWeight: 700,
                  fontSize: '1.25rem'
                }}
              >
                2
              </div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>5:00 AM Morning Harvest</h4>
              <p style={{ fontSize: '0.875rem' }}>
                Harvesting happens fresh every dawn in our audited farm facility under strict avian veterinary supervision.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--amber-soft)',
                  color: 'var(--amber-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  fontWeight: 700,
                  fontSize: '1.25rem'
                }}
              >
                3
              </div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Hygienic Cold Packaging</h4>
              <p style={{ fontSize: '0.875rem' }}>
                Dressed cuts are immediately packed in biodegradable food-grade kraft trays sealed with dry ice and ice gel packs.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--amber-soft)',
                  color: 'var(--amber-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  fontWeight: 700,
                  fontSize: '1.25rem'
                }}
              >
                4
              </div>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>Chilled Direct Dispatch</h4>
              <p style={{ fontSize: '0.875rem' }}>
                Our temperature-controlled electric vans deliver orders straight to your doorstep within 90 minutes of dispatch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pincode & Service Area Checker */}
      <section style={{ backgroundColor: 'var(--warm-ivory)', padding: '4rem 0', borderTop: '1px solid var(--border-beige)' }}>
        <div className="container">
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              backgroundColor: 'var(--white)',
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-beige)',
              boxShadow: 'var(--shadow-sm)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--amber-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}
            >
              <MapPin size={24} color="var(--amber-dark)" />
            </div>

            <h3 style={{ marginBottom: '0.5rem' }}>Check Delivery in Your Area</h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              We deliver within a 25km radius from our Varthur/Gunjur farm hub across South and East Bengaluru.
            </p>

            <form onSubmit={checkPincode} style={{ display: 'flex', gap: '0.75rem', maxWidth: '440px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 560087)"
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value)}
                maxLength={6}
                className="form-input"
                style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 600 }}
              />
              <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                Verify Coverage
              </button>
            </form>

            {pincodeResult && (
              <div
                style={{
                  marginTop: '1.25rem',
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: pincodeResult.serviceable ? 'var(--success-bg)' : 'var(--error-bg)',
                  color: pincodeResult.serviceable ? 'var(--success-green)' : 'var(--error-red)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                {pincodeResult.serviceable ? <CheckCircle2 size={18} /> : <ShieldCheck size={18} />}
                <span>{pincodeResult.message}</span>
              </div>
            )}

            <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--muted-text)' }}>
              Popular hubs: Bellandur • Sarjapur • Koramangala • HSR Layout • Whitefield • Marathahalli
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Quick Inquire Strip */}
      <section style={{ backgroundColor: 'var(--charcoal-deep)', color: 'var(--white)', padding: '2.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            <div>
              <h3 style={{ color: 'var(--white)', marginBottom: '0.25rem', fontSize: '1.35rem' }}>
                Have Custom Cuts or Bulk Farm Orders?
              </h3>
              <p style={{ color: '#B5AFA6', fontSize: '0.9375rem' }}>
                Chat directly with our farm manager on WhatsApp for special cuts, heritage birds, or recurring weekly subscriptions.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\+/g, '')}?text=Hi%20The%20Village%20Farm,%20I%20have%20an%20inquiry%20regarding%20fresh%20poultry`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ gap: '0.5rem' }}
              >
                <PhoneCall size={17} />
                <span>Chat on WhatsApp</span>
              </a>
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="btn btn-outline"
                style={{ borderColor: 'var(--border-beige)', color: 'var(--warm-ivory)', gap: '0.5rem' }}
              >
                <QrCode size={17} />
                <span>Show Mobile QR</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
