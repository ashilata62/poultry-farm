import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_BATCHES,
  INITIAL_DRIVERS,
  INITIAL_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_PURCHASES,
  INITIAL_EXPENSES,
  INITIAL_CUSTOMERS,
  FARM_SETTINGS
} from '../data/initialData';

const FarmContext = createContext();

const STORAGE_KEYS = {
  ORDERS: 'tvf_orders',
  PRODUCTS: 'tvf_products',
  BATCHES: 'tvf_batches',
  INVENTORY: 'tvf_inventory',
  PURCHASES: 'tvf_purchases',
  EXPENSES: 'tvf_expenses',
  DRIVERS: 'tvf_drivers',
  CUSTOMERS: 'tvf_customers',
  SETTINGS: 'tvf_settings',
  CART: 'tvf_cart'
};

const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading localStorage for ${key}:`, e);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage for ${key}:`, e);
  }
};

// Valid dashboard menu routes
const VALID_ADMIN_MODULES = [
  'dashboard',
  'orders',
  'products',
  'inventory',
  'batches',
  'purchases',
  'expenses',
  'reports',
  'customers',
  'drivers',
  'delivery',
  'settings'
];

export const FarmProvider = ({ children }) => {
  // Resolve initial route from browser URL for dashboard menus (landing & login routes untouched)
  const getInitialDashboardRoute = () => {
    try {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname.toLowerCase();
        if (path.startsWith('/admin')) {
          const parts = path.split('/').filter(Boolean);
          const module = parts[1];
          return {
            role: 'admin',
            adminModule: VALID_ADMIN_MODULES.includes(module) ? module : 'dashboard'
          };
        }
        if (path === '/delivery' || path === '/dispatch') {
          return { role: 'delivery', adminModule: 'delivery' };
        }
        if (path === '/driver') {
          return { role: 'driver', adminModule: 'dashboard' };
        }
      }
    } catch (e) {
      console.warn('Error reading dashboard route:', e);
    }
    return { role: 'customer', adminModule: 'dashboard' };
  };

  const initialRoute = getInitialDashboardRoute();

  // Navigation & Subsystem Modes
  const [currentRole, setCurrentRole] = useState(initialRoute.role); // 'customer' | 'admin' | 'delivery' | 'driver' | 'login'
  const [customerView, setCustomerView] = useState('home'); // 'home' | 'shop' | 'about' | 'contact' | 'tracking' | 'checkout' | 'cart'
  const [adminModule, setAdminModule] = useState(initialRoute.adminModule); // 'dashboard' | 'orders' | 'products' | 'inventory' | 'batches' | 'purchases' | 'expenses' | 'reports' | 'customers' | 'drivers' | 'delivery' | 'settings'
  const [activeDriverId, setActiveDriverId] = useState('drv-1');
  const [trackingOrderId, setTrackingOrderId] = useState('TVF-84920');

  // Synchronize dashboard menu routes with browser URL
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (currentRole === 'admin') {
          const targetPath = `/admin/${adminModule}`;
          if (window.location.pathname.toLowerCase() !== targetPath) {
            window.history.pushState(null, '', targetPath);
          }
        } else if (currentRole === 'delivery') {
          if (window.location.pathname.toLowerCase() !== '/delivery') {
            window.history.pushState(null, '', '/delivery');
          }
        } else if (currentRole === 'driver') {
          if (window.location.pathname.toLowerCase() !== '/driver') {
            window.history.pushState(null, '', '/driver');
          }
        } else if (currentRole === 'customer') {
          // Clear dashboard path when in customer store
          if (
            window.location.pathname.startsWith('/admin') ||
            window.location.pathname === '/delivery' ||
            window.location.pathname === '/driver'
          ) {
            window.history.pushState(null, '', '/');
          }
        }
      }
    } catch (e) {
      console.warn('Error synchronizing dashboard route URL:', e);
    }
  }, [currentRole, adminModule]);

  // Handle browser Back / Forward buttons for dashboard menus
  useEffect(() => {
    const handlePopState = () => {
      try {
        if (typeof window !== 'undefined') {
          const path = window.location.pathname.toLowerCase();
          if (path.startsWith('/admin')) {
            const parts = path.split('/').filter(Boolean);
            const module = parts[1];
            setCurrentRole('admin');
            setAdminModule(VALID_ADMIN_MODULES.includes(module) ? module : 'dashboard');
          } else if (path === '/delivery' || path === '/dispatch') {
            setCurrentRole('delivery');
          } else if (path === '/driver') {
            setCurrentRole('driver');
          } else if (path === '/' || path === '') {
            setCurrentRole('customer');
            setCustomerView('home');
          }
        }
      } catch (e) {
        console.warn('Error handling dashboard popstate:', e);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Business State (with persistence)
  const [orders, setOrders] = useState(() => getStorageItem(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
  const [products, setProducts] = useState(() => getStorageItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS));
  const [batches, setBatches] = useState(() => getStorageItem(STORAGE_KEYS.BATCHES, INITIAL_BATCHES));
  const [inventory, setInventory] = useState(() => getStorageItem(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY));
  const [purchases, setPurchases] = useState(() => getStorageItem(STORAGE_KEYS.PURCHASES, INITIAL_PURCHASES));
  const [expenses, setExpenses] = useState(() => getStorageItem(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES));
  const [drivers, setDrivers] = useState(() => getStorageItem(STORAGE_KEYS.DRIVERS, INITIAL_DRIVERS));
  const [customers, setCustomers] = useState(() => getStorageItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS));
  const [settings, setSettings] = useState(() => getStorageItem(STORAGE_KEYS.SETTINGS, FARM_SETTINGS));
  const [cart, setCart] = useState(() => getStorageItem(STORAGE_KEYS.CART, [
    { product: INITIAL_PRODUCTS[0], quantity: 1 }
  ]));

  // UI State
  const [toasts, setToasts] = useState([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => { setStorageItem(STORAGE_KEYS.ORDERS, orders); }, [orders]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.PRODUCTS, products); }, [products]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.BATCHES, batches); }, [batches]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.INVENTORY, inventory); }, [inventory]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.PURCHASES, purchases); }, [purchases]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.EXPENSES, expenses); }, [expenses]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.DRIVERS, drivers); }, [drivers]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.CUSTOMERS, customers); }, [customers]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.SETTINGS, settings); }, [settings]);
  useEffect(() => { setStorageItem(STORAGE_KEYS.CART, cart); }, [cart]);

  // Toast System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Functions
  const addToCart = (product, quantity = 1) => {
    if (!product.isAvailable || product.stock <= 0) {
      showToast(`Sorry, ${product.name} is currently out of stock.`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) {
          showToast(`Only ${product.stock} units available in stock.`, 'warning');
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast(`Added ${quantity}x ${product.name} to your cart!`, 'success');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find((p) => p.id === productId);
    if (product && quantity > product.stock) {
      showToast(`Cannot exceed available stock of ${product.stock} units.`, 'warning');
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'warning');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDeliveryFee = cartSubtotal === 0 || cartSubtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee;
  const cartTotal = cartSubtotal + cartDeliveryFee;
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Place Order Action
  const placeOrder = (customerDetails) => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'error');
      return null;
    }

    const orderNumber = `TVF-${Math.floor(10000 + Math.random() * 90000)}`;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    const newOrder = {
      id: orderNumber,
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      deliveryAddress: customerDetails.address,
      landmark: customerDetails.landmark || '',
      instructions: customerDetails.instructions || 'Standard farm delivery',
      orderDate: new Date().toISOString(),
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      total: cartTotal,
      paymentMethod: customerDetails.paymentMethod || 'Cash On Delivery',
      paymentStatus: customerDetails.paymentMethod === 'Verified Online Gateway' ? 'Paid' : 'Pending',
      orderStatus: 'pending',
      assignedDriverId: null,
      assignedDriverName: 'Unassigned',
      assignedDriverPhone: '',
      estimatedDeliveryTime: '60-90 mins',
      timeline: [
        {
          status: 'Placed',
          time: currentTime,
          note: `Order received via website (${customerDetails.paymentMethod})`
        }
      ],
      coordinates: {
        lat: 12.92 + (Math.random() - 0.5) * 0.05,
        lng: 77.67 + (Math.random() - 0.5) * 0.05
      }
    };

    // Deduct stock from products
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((ci) => ci.product.id === prod.id);
        if (cartItem) {
          const newStock = Math.max(0, prod.stock - cartItem.quantity);
          return { ...prod, stock: newStock, isAvailable: newStock > 0 };
        }
        return prod;
      })
    );

    // Update customer history or record new customer
    setCustomers((prev) => {
      const existing = prev.find((c) => c.phone === customerDetails.phone);
      if (existing) {
        return prev.map((c) =>
          c.phone === customerDetails.phone
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                lifetimeSpend: c.lifetimeSpend + cartTotal,
                lastOrderDate: new Date().toISOString().split('T')[0]
              }
            : c
        );
      }
      return [
        {
          id: `CUST-${Date.now().toString().slice(-4)}`,
          name: customerDetails.name,
          phone: customerDetails.phone,
          email: customerDetails.email || 'customer@villagefarm.in',
          address: customerDetails.address,
          totalOrders: 1,
          lifetimeSpend: cartTotal,
          lastOrderDate: new Date().toISOString().split('T')[0]
        },
        ...prev
      ];
    });

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setTrackingOrderId(orderNumber);
    showToast(`Order #${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  // Order Actions (Admin & Driver)
  const updateOrderStatus = (orderId, newStatus, note = '') => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const statusLabels = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      processing: 'Packed',
      in_transit: 'Out for Delivery',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const newTimeline = [
            ...order.timeline,
            {
              status: statusLabels[newStatus] || newStatus,
              time: timeStr,
              note: note || `Order marked as ${statusLabels[newStatus] || newStatus}`
            }
          ];

          return {
            ...order,
            orderStatus: newStatus,
            deliveredAt: newStatus === 'delivered' ? timeStr : order.deliveredAt,
            paymentStatus: newStatus === 'delivered' ? 'Paid' : order.paymentStatus,
            timeline: newTimeline
          };
        }
        return order;
      })
    );

    showToast(`Order ${orderId} updated to ${statusLabels[newStatus] || newStatus}`, 'success');
  };

  const assignDriver = (orderId, driverId) => {
    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedTimeline = [
            ...order.timeline,
            {
              status: 'Driver Assigned',
              time: timeStr,
              note: `Assigned to ${driver.name} (${driver.vehicle})`
            }
          ];

          return {
            ...order,
            assignedDriverId: driver.id,
            assignedDriverName: driver.name,
            assignedDriverPhone: driver.phone,
            orderStatus: order.orderStatus === 'pending' ? 'confirmed' : order.orderStatus,
            timeline: updatedTimeline
          };
        }
        return order;
      })
    );

    // Update driver active deliveries count
    setDrivers((prev) =>
      prev.map((d) => (d.id === driverId ? { ...d, activeDeliveries: d.activeDeliveries + 1 } : d))
    );

    showToast(`Assigned ${driver.name} to order ${orderId}`, 'success');
  };

  // Driver portal specific update
  const driverUpdateDelivery = (orderId, newStatus, reason = '') => {
    updateOrderStatus(orderId, newStatus, reason);
    if (newStatus === 'delivered') {
      setDrivers((prev) =>
        prev.map((d) =>
          d.id === activeDriverId
            ? { ...d, activeDeliveries: Math.max(0, d.activeDeliveries - 1), completedToday: d.completedToday + 1 }
            : d
        )
      );
    }
  };

  // Product Management
  const addProduct = (productData) => {
    const newId = `prod-${Date.now().toString().slice(-4)}`;
    const newProd = {
      id: newId,
      image: '/images/whole_chicken.jpg',
      rating: 5.0,
      reviewsCount: 1,
      isPopular: false,
      isAvailable: true,
      ...productData
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Added product "${newProd.name}"`, 'success');
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const toggleProductActive = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isAvailable;
          showToast(`${p.name} is now ${nextState ? 'Active' : 'Inactive'}`, 'warning');
          return { ...p, isAvailable: nextState };
        }
        return p;
      })
    );
  };

  // Poultry Batch Management
  const addBatch = (batchData) => {
    const newBatch = {
      id: `BATCH-2026-${String(batches.length + 5).padStart(2, '0')}`,
      mortality: 0,
      mortalityRate: '0.0%',
      feedConsumedKg: 50,
      healthStatus: 'Excellent',
      status: 'Brooding / Nursery',
      ...batchData
    };
    setBatches((prev) => [newBatch, ...prev]);
    showToast(`Flock batch ${newBatch.id} registered`, 'success');
  };

  const updateBatch = (id, updatedFields) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    showToast(`Batch ${id} records updated`, 'success');
  };

  // Inventory Management
  const updateInventoryStock = (id, newQty, reason = 'Routine Stock Adjustment') => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const status = newQty <= item.minThreshold ? 'Low Stock' : 'Good';
          return { ...item, available: Number(newQty), status };
        }
        return item;
      })
    );
    showToast(`Stock updated (${reason})`, 'success');
  };

  const addInventoryItem = (itemData) => {
    const newItem = {
      id: `inv-${Date.now().toString().slice(-4)}`,
      reserved: 0,
      status: itemData.available <= itemData.minThreshold ? 'Low Stock' : 'Good',
      ...itemData
    };
    setInventory((prev) => [...prev, newItem]);
    showToast(`Added ${newItem.name} to inventory`, 'success');
  };

  // Purchases & Expenses
  const addPurchase = (purchaseData) => {
    const newPurchase = {
      id: `PUR-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      paymentStatus: 'Paid',
      total: Number(purchaseData.quantity) * Number(purchaseData.unitCost),
      ...purchaseData
    };
    setPurchases((prev) => [newPurchase, ...prev]);
    showToast(`Recorded purchase #${newPurchase.id}`, 'success');
  };

  const addExpense = (expenseData) => {
    const newExpense = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      ...expenseData
    };
    setExpenses((prev) => [newExpense, ...prev]);
    showToast(`Expense recorded: ₹${newExpense.amount}`, 'success');
  };

  // Drivers Management
  const addDriver = (driverData) => {
    const newDriver = {
      id: `drv-${Date.now().toString().slice(-4)}`,
      status: 'Available',
      activeDeliveries: 0,
      completedToday: 0,
      rating: 5.0,
      currentLocation: 'Farm Hub',
      ...driverData
    };
    setDrivers((prev) => [...prev, newDriver]);
    showToast(`Driver ${newDriver.name} added to fleet`, 'success');
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Farm settings saved successfully', 'success');
  };

  // Reset to initial demo state
  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.BATCHES);
    localStorage.removeItem(STORAGE_KEYS.INVENTORY);
    localStorage.removeItem(STORAGE_KEYS.PURCHASES);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    localStorage.removeItem(STORAGE_KEYS.DRIVERS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.CART);

    setOrders(INITIAL_ORDERS);
    setProducts(INITIAL_PRODUCTS);
    setBatches(INITIAL_BATCHES);
    setInventory(INITIAL_INVENTORY);
    setPurchases(INITIAL_PURCHASES);
    setExpenses(INITIAL_EXPENSES);
    setDrivers(INITIAL_DRIVERS);
    setCustomers(INITIAL_CUSTOMERS);
    setSettings(FARM_SETTINGS);
    setCart([{ product: INITIAL_PRODUCTS[0], quantity: 1 }]);
    setTrackingOrderId('TVF-84920');

    showToast('Demo data successfully reset to pristine state', 'success');
  };

  return (
    <FarmContext.Provider
      value={{
        // Role & Navigation
        currentRole,
        setCurrentRole,
        customerView,
        setCustomerView,
        adminModule,
        setAdminModule,
        activeDriverId,
        setActiveDriverId,
        trackingOrderId,
        setTrackingOrderId,

        // Data Models
        orders,
        products,
        batches,
        inventory,
        purchases,
        expenses,
        drivers,
        customers,
        settings,

        // Cart
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDeliveryFee,
        cartTotal,
        cartItemsCount,

        // Operations
        placeOrder,
        updateOrderStatus,
        assignDriver,
        driverUpdateDelivery,
        addProduct,
        updateProduct,
        toggleProductActive,
        addBatch,
        updateBatch,
        updateInventoryStock,
        addInventoryItem,
        addPurchase,
        addExpense,
        addDriver,
        updateSettings,
        resetToDemoData,

        // UI Helpers
        toasts,
        showToast,
        removeToast,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        selectedProductModal,
        setSelectedProductModal,
        isQrModalOpen,
        setIsQrModalOpen
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
