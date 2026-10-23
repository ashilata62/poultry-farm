import React, { useState, useMemo } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Search, SlidersHorizontal, ShoppingBag, Star, Plus, Minus, Check, ArrowRight } from 'lucide-react';

export const ShopPage = () => {
  const { products, addToCart, setSelectedProductModal, setIsCartDrawerOpen } = useFarm();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [quantities, setQuantities] = useState({});

  const categories = ['All', 'Country/Desi Chicken', 'Curry Cuts', 'Boneless & Fillets', 'Specialty Poultry'];

  const getQty = (productId) => quantities[productId] || 1;
  const setQty = (productId, qty) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, qty) }));
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default popularity
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div style={{ backgroundColor: 'var(--soft-cream)', minHeight: '80vh', padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>
            Daily Morning Harvest
          </div>
          <h1 style={{ color: 'var(--charcoal)', marginBottom: '0.5rem' }}>
            Fresh Farm Poultry & Special Cuts
          </h1>
          <p style={{ maxWidth: '680px', fontSize: '1rem' }}>
            Select from whole pasture-grazed birds, succulent boneless portions, and traditional country curry cuts. Packaged in chilled food-grade boxes and delivered directly to your doorstep.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div
          style={{
            backgroundColor: 'var(--white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-beige)',
            padding: '1.25rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Search Field */}
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)' }}
              />
              <input
                type="text"
                placeholder="Search cuts (e.g. Kadaknath, Curry Cut, Breast)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.75rem',
                    color: 'var(--muted-text)'
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SlidersHorizontal size={16} color="var(--muted-text)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{ width: 'auto', minWidth: '160px' }}
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="pill-scroll-container">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.375rem 0.875rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: selectedCategory === cat ? 600 : 500,
                  backgroundColor: selectedCategory === cat ? 'var(--charcoal-deep)' : 'var(--warm-ivory)',
                  color: selectedCategory === cat ? 'var(--amber-primary)' : 'var(--charcoal)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--charcoal-deep)' : 'var(--border-beige)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count Display */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--muted-text)' }}>
          <span>Showing <strong>{filteredProducts.length}</strong> farm poultry cuts</span>
          <span>Guaranteed same-day harvest freshness</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div
            className="card"
            style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: 'var(--white)' }}
          >
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
              <Search size={28} color="var(--amber-dark)" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>No poultry products match your search</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted-text)', marginBottom: '1.5rem' }}>
              Try clearing your filters or search keywords to view our complete daily cuts.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="btn btn-primary"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {filteredProducts.map((product) => {
              const currentQty = getQty(product.id);
              const isAvailable = product.isAvailable && product.stock > 0;

              return (
                <div
                  key={product.id}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: isAvailable ? 1 : 0.65,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Photo Container */}
                  <div
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onClick={() => setSelectedProductModal(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '220px', objectFit: 'cover' }}
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

                    {!isAvailable && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(32, 35, 33, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--white)',
                          fontWeight: 700,
                          fontSize: '1rem',
                          textTransform: 'uppercase'
                        }}
                      >
                        Sold Out Today
                      </div>
                    )}

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
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

                  {/* Body Content */}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--amber-dark)', fontWeight: 600 }}>
                          {product.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                          {product.weight}
                        </span>
                      </div>

                      <h3
                        onClick={() => setSelectedProductModal(product)}
                        style={{
                          fontSize: '1.125rem',
                          color: 'var(--charcoal)',
                          marginBottom: '0.5rem',
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
                          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                            ₹{product.price}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginLeft: '4px' }}>
                            {product.unit}
                          </span>
                        </div>
                        <span className="badge badge-green" style={{ fontSize: '0.6875rem' }}>
                          {product.stock} units
                        </span>
                      </div>

                      {/* Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {/* Quantity Stepper */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid var(--border-beige)',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--soft-cream)'
                          }}
                        >
                          <button
                            onClick={() => setQty(product.id, currentQty - 1)}
                            style={{ padding: '6px 8px', display: 'flex', color: 'var(--charcoal)' }}
                            disabled={!isAvailable}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                            {currentQty}
                          </span>
                          <button
                            onClick={() => setQty(product.id, currentQty + 1)}
                            style={{ padding: '6px 8px', display: 'flex', color: 'var(--charcoal)' }}
                            disabled={!isAvailable || currentQty >= product.stock}
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Add Button */}
                        <button
                          onClick={() => addToCart(product, currentQty)}
                          className="btn btn-primary"
                          style={{ flex: 1, padding: '0.5rem 0.875rem', gap: '0.35rem' }}
                          disabled={!isAvailable}
                        >
                          <ShoppingBag size={15} />
                          <span>Add to Basket</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
