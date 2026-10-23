import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../ui/Modal';
import { Star, ShieldCheck, Thermometer, Sparkles, Plus, Minus, ShoppingBag, Check } from 'lucide-react';

export const ProductDetailModal = () => {
  const { selectedProductModal, setSelectedProductModal, addToCart } = useFarm();
  const [quantity, setQuantity] = useState(1);
  const [addedJustNow, setAddedJustNow] = useState(false);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedJustNow(true);
    setTimeout(() => setAddedJustNow(false), 2000);
  };

  return (
    <Modal
      isOpen={!!selectedProductModal}
      onClose={() => setSelectedProductModal(null)}
      title={product.name}
      maxWidth="680px"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {/* Product Image */}
        <div>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-beige)',
              backgroundColor: 'var(--soft-cream)'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '260px', objectFit: 'cover' }}
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
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                BESTSELLER
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <div className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
              {product.category}
            </div>
            <div className="badge badge-green" style={{ fontSize: '0.75rem' }}>
              In Stock: {product.stock} units
            </div>
          </div>
        </div>

        {/* Product Details & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#E7A12B' }}>
                <Star size={16} fill="#E7A12B" stroke="#E7A12B" />
                <span style={{ fontWeight: 700, fontSize: '0.875rem', marginLeft: '4px', color: 'var(--charcoal)' }}>
                  {product.rating}
                </span>
              </div>
              <span style={{ color: 'var(--muted-text)', fontSize: '0.8125rem' }}>
                ({product.reviewsCount} customer reviews)
              </span>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--charcoal)', fontFamily: 'var(--font-heading)' }}>
                ₹{product.price}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--muted-text)', marginLeft: '6px' }}>
                {product.unit} ({product.weight})
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            {/* Farm Origin & Storage Specs */}
            <div style={{ backgroundColor: 'var(--soft-cream)', padding: '0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <ShieldCheck size={16} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Origin:</strong> {product.origin}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Sparkles size={16} color="var(--amber-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Freshness:</strong> {product.freshness}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <Thermometer size={16} color="var(--charcoal)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Storage:</strong> {product.storage}</span>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-beige)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--white)' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', color: 'var(--charcoal)' }}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span style={{ fontSize: '1rem', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', color: 'var(--charcoal)' }}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.75rem 1.25rem' }}
              disabled={!product.isAvailable || product.stock <= 0}
            >
              {addedJustNow ? (
                <>
                  <Check size={18} />
                  <span>Added to Basket!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  <span>Add to Basket • ₹{product.price * quantity}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
