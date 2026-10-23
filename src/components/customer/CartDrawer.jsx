import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    settings,
    setCustomerView
  } = useFarm();

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = settings.freeDeliveryThreshold;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    setCustomerView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(32, 35, 33, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 200ms ease-out'
      }}
      onClick={() => setIsCartDrawerOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: 'var(--white)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          animation: 'slideInRight 250ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-beige)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--soft-cream)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} color="var(--amber-primary)" />
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--charcoal)' }}>Your Basket</h3>
            <span className="badge badge-amber" style={{ marginLeft: '4px' }}>
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="btn-ghost"
            style={{ padding: '6px', borderRadius: 'var(--radius-xs)', display: 'flex' }}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: amountNeededForFree === 0 ? 'var(--success-bg)' : 'var(--amber-soft)',
            borderBottom: '1px solid var(--border-beige)',
            fontSize: '0.8125rem',
            color: 'var(--charcoal)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Truck size={15} color={amountNeededForFree === 0 ? 'var(--success-green)' : 'var(--amber-dark)'} />
            {amountNeededForFree === 0 ? (
              <span style={{ fontWeight: 600, color: 'var(--success-green)' }}>
                🎉 You have qualified for FREE Farm Delivery!
              </span>
            ) : (
              <span>
                Add <strong style={{ color: 'var(--amber-dark)' }}>₹{amountNeededForFree}</strong> more to get <strong>FREE delivery</strong>!
              </span>
            )}
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${freeDeliveryProgress}%`,
                height: '100%',
                backgroundColor: amountNeededForFree === 0 ? 'var(--success-green)' : 'var(--amber-primary)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--amber-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}
              >
                <ShoppingBag size={28} color="var(--amber-dark)" />
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>Your cart is empty</h4>
              <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Browse our fresh pasture-raised poultry and add cuts to your delivery basket.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCustomerView('shop');
                }}
                className="btn btn-primary"
              >
                Shop Farm Fresh Poultry
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-beige)',
                    backgroundColor: 'var(--soft-cream)'
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: 'var(--radius-xs)',
                      objectFit: 'cover',
                      border: '1px solid var(--border-subtle)'
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.3 }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '2px' }}>
                        {item.product.unit}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-beige)', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--white)' }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', color: 'var(--charcoal)' }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, minWidth: '22px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', color: 'var(--charcoal)' }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                          ₹{item.product.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          style={{ color: '#A09C94', display: 'flex', padding: '4px' }}
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={clearCart}
                  style={{ fontSize: '0.75rem', color: 'var(--muted-text)', textDecoration: 'underline' }}
                >
                  Clear all items
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid var(--border-beige)',
              backgroundColor: 'var(--soft-cream)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)' }}>
                <span>Cold-Chain Delivery</span>
                <span>{cartDeliveryFee === 0 ? <strong style={{ color: 'var(--success-green)' }}>FREE</strong> : `₹${cartDeliveryFee}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--charcoal)',
                  borderTop: '1px dashed var(--border-beige)',
                  paddingTop: '0.5rem',
                  marginTop: '0.25rem'
                }}
              >
                <span>Total Amount</span>
                <span style={{ color: 'var(--amber-dark)' }}>₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="btn btn-primary btn-block btn-lg"
              style={{ gap: '0.75rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="btn btn-ghost btn-block btn-sm"
              style={{ marginTop: '0.5rem', color: 'var(--muted-text)' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
