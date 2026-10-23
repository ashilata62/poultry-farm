import React, { useState } from 'react';
import { FarmProvider, useFarm } from './context/FarmContext';

// Layout & UI components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AdminSidebar } from './components/layout/AdminSidebar';
import { AdminHeader } from './components/layout/AdminHeader';
import { Toast } from './components/ui/Toast';
import { CartDrawer } from './components/customer/CartDrawer';
import { ProductDetailModal } from './components/customer/ProductDetailModal';
import { QROrderingModal } from './components/customer/QROrderingModal';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { ShopPage } from './pages/customer/ShopPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderTrackingPage } from './pages/customer/OrderTrackingPage';
import { AboutPage } from './pages/customer/AboutPage';
import { ContactPage } from './pages/customer/ContactPage';
import { LoginPage } from './pages/auth/LoginPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { OrdersManager } from './pages/admin/OrdersManager';
import { ProductsManager } from './pages/admin/ProductsManager';
import { InventoryManager } from './pages/admin/InventoryManager';
import { BatchesManager } from './pages/admin/BatchesManager';
import { PurchasesManager } from './pages/admin/PurchasesManager';
import { ExpensesManager } from './pages/admin/ExpensesManager';
import { ReportsManager } from './pages/admin/ReportsManager';
import { CustomersManager } from './pages/admin/CustomersManager';
import { DriversManager } from './pages/admin/DriversManager';
import { SettingsPage } from './pages/admin/SettingsPage';

// Delivery & Driver
import { DeliveryDashboard } from './pages/delivery/DeliveryDashboard';
import { DriverPortal } from './pages/driver/DriverPortal';

const AppContent = () => {
  const { currentRole, customerView, adminModule } = useFarm();
  const [isAdminMobileSidebarOpen, setIsAdminMobileSidebarOpen] = useState(false);

  // Dedicated Multi-Role Login Gateway Screen
  if (currentRole === 'login' || customerView === 'login') {
    return (
      <div style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: '#141615' }}>
        <LoginPage />
        <Toast />
      </div>
    );
  }

  // Render Customer Subsystem (Landing Page & Storefront - No top black bar)
  if (currentRole === 'customer') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        <main style={{ flex: 1 }}>
          {customerView === 'home' && <HomePage />}
          {customerView === 'shop' && <ShopPage />}
          {customerView === 'checkout' && <CheckoutPage />}
          {customerView === 'tracking' && <OrderTrackingPage />}
          {customerView === 'about' && <AboutPage />}
          {customerView === 'contact' && <ContactPage />}
        </main>

        <Footer />
        <CartDrawer />
        <ProductDetailModal />
        <QROrderingModal />
        <Toast />
      </div>
    );
  }

  // Render Delivery Dispatch Subsystem
  if (currentRole === 'delivery') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100vh', overflow: 'hidden', backgroundColor: 'var(--soft-cream)' }}>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <DeliveryDashboard />
        </main>
        <QROrderingModal />
        <Toast />
      </div>
    );
  }

  // Render Driver Mobile Portal Subsystem
  if (currentRole === 'driver') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <main style={{ flex: 1 }}>
          <DriverPortal />
        </main>
        <QROrderingModal />
        <Toast />
      </div>
    );
  }

  // Render Farm Admin Subsystem
  const adminTitles = {
    dashboard: { title: 'Farm Operations Dashboard', sub: 'Executive Overview & Morning Harvest Metrics' },
    orders: { title: 'Order Management & Dispatch', sub: 'Process, Confirm, and Assign Daily Poultry Orders' },
    products: { title: 'Product Catalog & Cut Pricing', sub: 'Fresh Poultry Cuts, Packaging Units, and Live Availability' },
    inventory: { title: 'Inventory & Cold Storage', sub: '0-4°C Chilled Cuts, Feed Supplies & Packaging Stocks' },
    batches: { title: 'Poultry Batches & Flocks', sub: 'Pasture Shed Tracking, Mortality Control & Flock Health' },
    purchases: { title: 'Feed & Supplies Inflow', sub: 'Organic Feed, Day-Old Chicks & Vacuum Packaging Records' },
    expenses: { title: 'Operating Expenses', sub: 'Cold Storage Power, Fleet Maintenance & Labor Accounting' },
    reports: { title: 'Sales & Profit Analysis', sub: 'Financial Performance & Operational Fulfillment Audits' },
    customers: { title: 'Customer Directory', sub: 'Loyal Households, Lifetime Spend & Order History' },
    drivers: { title: 'Driver Fleet Roster', sub: 'Refrigerated EV Vans, Route Status & Driver Performance' },
    delivery: { title: 'Two-Panel Delivery Dispatch', sub: 'Spatial Queue & Vector Route Visualization' },
    settings: { title: 'Farm Settings & Rules', sub: 'Business Identity, Delivery Radius & Payment Rules' }
  };

  const currentModuleInfo = adminTitles[adminModule] || { title: 'Admin Console', sub: '' };

  return (
    <div style={{ display: 'flex', height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
      {/* Left Responsive SaaS Sidebar (Static) */}
      <AdminSidebar
        isMobileOpen={isAdminMobileSidebarOpen}
        setIsMobileOpen={setIsAdminMobileSidebarOpen}
      />

      {/* Right Content Area (Scrolls independently while sidebar stays static) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflowY: 'auto', backgroundColor: 'var(--soft-cream)' }}>
        <AdminHeader
          title={currentModuleInfo.title}
          subtitle={currentModuleInfo.sub}
          onToggleMobileSidebar={() => setIsAdminMobileSidebarOpen(!isAdminMobileSidebarOpen)}
        />

        <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
          {adminModule === 'dashboard' && <AdminDashboard />}
          {adminModule === 'orders' && <OrdersManager />}
          {adminModule === 'products' && <ProductsManager />}
          {adminModule === 'inventory' && <InventoryManager />}
          {adminModule === 'batches' && <BatchesManager />}
          {adminModule === 'purchases' && <PurchasesManager />}
          {adminModule === 'expenses' && <ExpensesManager />}
          {adminModule === 'reports' && <ReportsManager />}
          {adminModule === 'customers' && <CustomersManager />}
          {adminModule === 'drivers' && <DriversManager />}
          {adminModule === 'delivery' && <DeliveryDashboard />}
          {adminModule === 'settings' && <SettingsPage />}
        </main>
      </div>

      <QROrderingModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <FarmProvider>
      <AppContent />
    </FarmProvider>
  );
}
