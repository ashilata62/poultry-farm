import React from 'react';

export const StatusBadge = ({ status, type = 'order' }) => {
  const normalized = (status || '').toLowerCase().replace(/[\s-]/g, '_');

  let badgeClass = 'badge-charcoal';
  let label = status;

  if (type === 'order') {
    switch (normalized) {
      case 'pending':
        badgeClass = 'badge-warning';
        label = 'Pending Review';
        break;
      case 'confirmed':
        badgeClass = 'badge-amber';
        label = 'Confirmed';
        break;
      case 'processing':
        badgeClass = 'badge-amber';
        label = 'Packed & Ready';
        break;
      case 'in_transit':
        badgeClass = 'badge-amber';
        label = 'Out for Delivery';
        break;
      case 'delivered':
        badgeClass = 'badge-green';
        label = 'Delivered';
        break;
      case 'cancelled':
        badgeClass = 'badge-red';
        label = 'Cancelled';
        break;
      default:
        badgeClass = 'badge-charcoal';
        label = status;
    }
  } else if (type === 'stock') {
    if (normalized.includes('low') || normalized === 'out_of_stock') {
      badgeClass = 'badge-red';
    } else {
      badgeClass = 'badge-green';
    }
  } else if (type === 'payment') {
    if (normalized === 'paid') {
      badgeClass = 'badge-green';
    } else {
      badgeClass = 'badge-warning';
    }
  } else if (type === 'driver') {
    if (normalized === 'available') {
      badgeClass = 'badge-green';
    } else if (normalized.includes('route') || normalized.includes('transit')) {
      badgeClass = 'badge-amber';
    } else {
      badgeClass = 'badge-charcoal';
    }
  }

  return <span className={`badge ${badgeClass}`}>{label}</span>;
};
