import React, { useState, useMemo, useRef } from 'react';
import { useFarm } from '../../context/FarmContext';
import {
  ChevronLeft,
  ChevronRight,
  Scale,
  Bell,
  Search,
  SlidersHorizontal,
  Check,
  ArrowRight
} from 'lucide-react';

export const ShopPage = () => {
  const {
    products,
    addToCart,
    setSelectedProductModal,
    showToast,
    cart,
    cartItemsCount,
    cartTotal,
    updateCartQuantity,
    setIsCartDrawerOpen
  } = useFarm();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Chicken');
  const [sortBy, setSortBy] = useState('popularity');
  const carouselRef = useRef(null);

  const CATEGORIES = [
    { id: 'Chicken', name: 'Chicken', image: '/images/categories/cat_chicken.jpg' },
    { id: 'Ready To Cook', name: 'Ready To Cook', image: '/images/categories/cat_readycook.jpg' }
  ];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' ||
          p.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleNotifyMe = (e, product) => {
    e.stopPropagation();
    if (showToast) {
      showToast(`Priority Alert Set: We will notify you when ${product.name} is harvested!`);
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '3.5rem' }}>
      {/* 1. TOP HORIZONTAL CATEGORY CAROUSEL (Licious Clean White Theme) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #EAEAEA',
          padding: '0.75rem 0',
          position: 'sticky',
          top: 'var(--header-height, 65px)',
          zIndex: 40,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Left Scroll Chevron */}
          <button
            onClick={() => scrollCarousel('left')}
            aria-label="Scroll categories left"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAEAEA',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#374151',
              flexShrink: 0,
              zIndex: 2,
              marginRight: '8px'
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Scrollable Categories List */}
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '0.25rem 0.5rem',
              flex: 1
            }}
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    position: 'relative',
                    paddingBottom: '6px',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {/* Round Category Avatar */}
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: isSelected ? '2.5px solid #D11243' : '1.5px solid #EAEAEA',
                      boxShadow: isSelected
                        ? '0 2px 8px rgba(0, 0, 0, 0.08)'
                        : '0 1px 3px rgba(0, 0, 0, 0.04)',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Category Title */}
                  <span
                    style={{
                      marginTop: '6px',
                      fontSize: '0.8125rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? '#D11243' : '#374151',
                      whiteSpace: 'nowrap',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {cat.name}
                  </span>

                  {/* Red Bottom Indicator Underline */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: '2.5px',
                        backgroundColor: '#D11243',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Scroll Chevron */}
          <button
            onClick={() => scrollCarousel('right')}
            aria-label="Scroll categories right"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAEAEA',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#374151',
              flexShrink: 0,
              zIndex: 2,
              marginLeft: '8px'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 2. BREADCRUMB & SEARCH FILTER BAR */}
      <div className="container" style={{ paddingTop: '0.85rem', paddingBottom: '0.65rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '0.5rem'
          }}
        >
          {/* Breadcrumb */}
          <div style={{ fontSize: '0.8125rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ cursor: 'pointer', color: '#4B5563' }} onClick={() => setSelectedCategory('Chicken')}>
              Home
            </span>
            <span>/</span>
            <span style={{ color: '#D11243', fontWeight: 700 }}>{selectedCategory}</span>
          </div>

          {/* Compact Search & Sort Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: 'min(240px, 100%)', flex: '1 1 180px' }}>
              <Search
                size={14}
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
              />
              <input
                type="text"
                placeholder="Search cuts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '2rem',
                  paddingRight: '1.5rem',
                  height: '32px',
                  fontSize: '0.78125rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.7rem',
                    color: '#9CA3AF',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <SlidersHorizontal size={14} color="#6B7280" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  height: '32px',
                  fontSize: '0.78125rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  padding: '0 6px',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  color: '#374151',
                  cursor: 'pointer'
                }}
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCT CARDS GRID (Exact 3-Column Client Reference Design) */}
      <div className="container" style={{ paddingBottom: '2.5rem' }}>
        {filteredProducts.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '3.5rem 1.5rem',
              textAlign: 'center',
              border: '1px solid #E8DFDF',
              marginTop: '1rem'
            }}
          >
            <h3 style={{ color: '#1F2937', marginBottom: '0.5rem' }}>No products found for "{searchTerm || selectedCategory}"</h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Try clearing your search keyword or explore our daily harvest in the Chicken category!
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Chicken');
              }}
              style={{
                backgroundColor: '#D11243',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.65rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(209, 18, 67, 0.35)'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className="store-product-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.15rem'
            }}
          >
            {filteredProducts.map((product) => {
              const isAvailable = product.isAvailable && product.stock > 0;
              const inCartItem = cart?.find((c) => (c.product?.id || c.id) === product.id);
              const cartQty = inCartItem ? inCartItem.quantity : 0;

              return (
                 <div
                  key={product.id}
                  className="product-cut-card"
                  onClick={() => setSelectedProductModal(product)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #EAEAEA',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.07)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  {/* Photo Container */}
                  <div style={{ position: 'relative', width: '100%', height: '190px', backgroundColor: '#F8F9FA' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    {/* Green Discount Tag (Top Left) */}
                    {product.discountTag && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          backgroundColor: '#16A34A',
                          color: '#FFFFFF',
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          padding: '2.5px 7px',
                          borderRadius: '5px',
                          letterSpacing: '0.02em',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {product.discountTag}
                      </div>
                    )}

                    {/* Red Trending Tag (Top Right) */}
                    {product.trending && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          backgroundColor: '#D11243',
                          color: '#FFFFFF',
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          padding: '2.5px 7px',
                          borderRadius: '5px',
                          letterSpacing: '0.02em',
                          boxShadow: '0 2px 6px rgba(209, 18, 67, 0.35)'
                        }}
                      >
                        Trending
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div
                    style={{
                      padding: '11px 13px 13px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1
                    }}
                  >
                    <div>
                      {/* Product Title */}
                      <h3
                        style={{
                          fontSize: '0.9375rem',
                          fontWeight: 800,
                          color: '#111827',
                          margin: '0 0 2px 0',
                          lineHeight: 1.25
                        }}
                      >
                        {product.name}
                      </h3>

                      {/* Subtitle / Pieces Info */}
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: '#6B7280',
                          marginBottom: '5px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {product.subtitle || product.category}
                      </div>

                      {/* Net Weight Line */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.71875rem',
                          color: '#4B5563',
                          fontWeight: 600,
                          marginBottom: '8px'
                        }}
                      >
                        <Scale size={12} color="#6B7280" />
                        <span>{product.weight}</span>
                      </div>
                    </div>

                    {/* Bottom Price & Action Button Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        paddingTop: '6px',
                        borderTop: '1px solid #F3F4F6'
                      }}
                    >
                      {/* Price Section */}
                      <div>
                        {product.mrp && (
                          <div
                            style={{
                              fontSize: '0.6875rem',
                              color: '#9CA3AF',
                              textDecoration: 'line-through',
                              lineHeight: 1.1,
                              marginBottom: '2px'
                            }}
                          >
                            MRP ₹{product.mrp}
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: '#111827',
                            lineHeight: 1.1
                          }}
                        >
                          {product.priceText || `₹${product.price}`}
                        </div>
                      </div>

                      {/* Button Section */}
                      <div>
                        {cartQty > 0 ? (
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              backgroundColor: '#D11243',
                              borderRadius: '7px',
                              overflow: 'hidden',
                              boxShadow: '0 2px 6px rgba(209, 18, 67, 0.3)',
                              height: '31px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCartQuantity(product.id, cartQty - 1);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#FFFFFF',
                                padding: '0 8px',
                                height: '100%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '1rem'
                              }}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span
                              style={{
                                color: '#FFFFFF',
                                fontWeight: 800,
                                fontSize: '0.8125rem',
                                minWidth: '20px',
                                textAlign: 'center',
                                userSelect: 'none'
                              }}
                            >
                              {cartQty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateCartQuantity(product.id, cartQty + 1);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#FFFFFF',
                                padding: '0 8px',
                                height: '100%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '1rem'
                              }}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        ) : isAvailable ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(e, product)}
                              style={{
                                backgroundColor: '#D11243',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '7px',
                                padding: '6px 20px',
                                fontWeight: 800,
                                fontSize: '0.84375rem',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(209, 18, 67, 0.3)',
                                transition: 'background-color 0.15s ease'
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B70E3A')}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#D11243')}
                            >
                              Add
                            </button>
                            {product.customisable && (
                              <span
                                style={{
                                  fontSize: '0.59375rem',
                                  color: '#6B7280',
                                  marginTop: '2px'
                                }}
                              >
                                customisable
                              </span>
                            )}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleNotifyMe(e, product)}
                            style={{
                              backgroundColor: '#FFFFFF',
                              color: '#D11243',
                              border: '1.5px solid #D11243',
                              borderRadius: '7px',
                              padding: '5px 12px',
                              fontWeight: 700,
                              fontSize: '0.78125rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'background-color 0.15s ease'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(209, 18, 67, 0.08)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                          >
                            <Bell size={12} color="#D11243" />
                            <span>Notify me</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. FSSAI & QUALITY ASSURANCE FOOTER STRIP */}
      <div
        className="container"
        style={{
          borderTop: '1px solid #EAEAEA',
          paddingTop: '1.75rem',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          {/* FSSAI Logo / Seal */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              padding: '0.35rem 1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
            }}
          >
            <span
              style={{
                fontFamily: 'serif',
                fontWeight: 900,
                fontSize: '1.15rem',
                letterSpacing: '0.04em',
                color: '#1E3A8A',
                borderRight: '1px solid #E5E7EB',
                paddingRight: '0.5rem'
              }}
            >
              fssai
            </span>
            <span style={{ fontSize: '0.71875rem', color: '#4B5563', fontWeight: 600 }}>
              Lic. No. 11224334000188
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '4px 0 0' }}>
            100% Antibiotic & Hormone-Free • Temperature-Controlled 0-4°C Cold Chain Express Delivery
          </p>
        </div>
      </div>

      {/* 5. FLOATING BOTTOM QUICK CART BAR (Exact Modern D2C Flow) */}
      {cartItemsCount > 0 && (
        <div
          className="floating-cart-bar"
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 90,
            width: 'calc(100% - 32px)',
            maxWidth: '560px',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            borderRadius: '14px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.12)',
            animation: 'slideUp 0.2s ease-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div
              className="cart-bar-badge"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#D11243',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                flexShrink: 0
              }}
            >
              {cartItemsCount}
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="cart-bar-amount" style={{ fontSize: '0.90625rem', fontWeight: 800, lineHeight: 1.15 }}>
                ₹{cartTotal}
              </div>
              <div className="cart-bar-subtext" style={{ fontSize: '0.6875rem', color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Delivery guaranteed in 90 mins
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="cart-bar-btn"
            style={{
              backgroundColor: '#D11243',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 800,
              fontSize: '0.84375rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(209, 18, 67, 0.45)',
              flexShrink: 0
            }}
          >
            <span>View Cart & Order</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Responsive Grid Styling */}
      <style>{`
        @media (max-width: 960px) {
          .store-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .store-product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
