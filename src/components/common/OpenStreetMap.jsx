import React, { useEffect, useRef, useState } from 'react';

export const OpenStreetMap = ({
  center = [12.923, 77.674],
  zoom = 13,
  orders = [],
  selectedOrderId = null,
  onSelectOrder = null,
  drivers = [],
  farmLocation = { lat: 12.923, lng: 77.674, name: 'The Village Farm Hub (Varthur Hobli)' },
  showRoute = true,
  height = '100%',
  className = ''
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const [leafletReady, setLeafletReady] = useState(typeof window !== 'undefined' && !!window.L);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.L) {
      setLeafletReady(true);
      return;
    }
    const checkInterval = setInterval(() => {
      if (window.L) {
        setLeafletReady(true);
        clearInterval(checkInterval);
      }
    }, 100);
    return () => clearInterval(checkInterval);
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!leafletReady || !window.L || !mapContainerRef.current) return;
    const L = window.L;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // OpenStreetMap Standard Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors • The Village Farm Dispatch'
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;

      // Force recalculation after container render
      setTimeout(() => {
        map.invalidateSize();
      }, 150);
    }

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletReady]);

  // Update Markers, Route, and Overlays
  useEffect(() => {
    if (!leafletReady || !window.L) return;
    const L = window.L;
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // 1. Plot Farm Hub Origin Marker
    const farmIcon = L.divIcon({
      className: 'osm-farm-marker',
      html: `
        <div style="
          background: #1A1C1B;
          color: #FFF;
          border: 2.5px solid #F28C28;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.45);
          position: relative;
        ">
          <span style="
            position: absolute;
            top: -2px;
            right: -2px;
            width: 10px;
            height: 10px;
            background: #22C55E;
            border: 2px solid #FFF;
            border-radius: 50%;
            box-shadow: 0 0 8px #22C55E;
          "></span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F28C28" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20]
    });

    const farmMarker = L.marker([farmLocation.lat, farmLocation.lng], { icon: farmIcon })
      .bindPopup(`
        <div style="font-family: var(--font-body, system-ui); padding: 4px; color: #292B2A;">
          <div style="font-weight: 700; font-size: 13px; color: #F28C28; display: flex; align-items: center; gap: 4px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#22C55E;"></span>
            ${farmLocation.name}
          </div>
          <div style="font-size: 11px; color: #666; margin-top: 2px;">
            Daily Dawn Harvest & Cold-Storage Dispatch Station
          </div>
          <div style="font-size: 11px; font-weight: 600; color: #287A4B; margin-top: 4px;">
            Cold-Chain Level: 2.4°C Chilled
          </div>
        </div>
      `);
    layerGroup.addLayer(farmMarker);

    // 2. Plot Driver Live Positions (if in transit)
    drivers.forEach((driver) => {
      const driverCoords =
        driver.id === 'drv-1'
          ? [12.924, 77.680]
          : driver.id === 'drv-2'
          ? [12.930, 77.640]
          : [farmLocation.lat + 0.002, farmLocation.lng + 0.003];

      const driverIcon = L.divIcon({
        className: 'osm-driver-marker',
        html: `
          <div style="
            background: #287A4B;
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 16px;
            padding: 3px 8px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 11px;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            white-space: nowrap;
          ">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span>${driver.name.split(' ')[0]} (Van)</span>
          </div>
        `,
        iconSize: [90, 26],
        iconAnchor: [45, 13],
        popupAnchor: [0, -15]
      });

      const driverMarker = L.marker(driverCoords, { icon: driverIcon }).bindPopup(`
        <div style="font-family: var(--font-body, system-ui); padding: 4px; color: #292B2A;">
          <div style="font-weight: 700; font-size: 12px;">${driver.name}</div>
          <div style="font-size: 11px; color: #666;">${driver.vehicle}</div>
          <div style="font-size: 11px; color: #287A4B; font-weight: 600; margin-top: 2px;">
            Status: ${driver.status} (${driver.activeDeliveries} active)
          </div>
        </div>
      `);
      layerGroup.addLayer(driverMarker);
    });

    // 3. Plot Destination Customer Orders
    orders.forEach((order) => {
      if (!order.coordinates || !order.coordinates.lat || !order.coordinates.lng) return;

      const isSelected = selectedOrderId === order.id;

      const destIcon = L.divIcon({
        className: 'osm-order-marker',
        html: `
          <div style="
            background: ${isSelected ? '#C74440' : '#F28C28'};
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            width: ${isSelected ? '34px' : '28px'};
            height: ${isSelected ? '34px' : '28px'};
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px ${isSelected ? 'rgba(199, 68, 64, 0.5)' : 'rgba(242, 140, 40, 0.4)'};
            transition: all 0.2s ease;
            cursor: pointer;
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          ">
            <svg width="${isSelected ? '16' : '13'}" height="${isSelected ? '16' : '13'}" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `,
        iconSize: [isSelected ? 34 : 28, isSelected ? 34 : 28],
        iconAnchor: [isSelected ? 17 : 14, isSelected ? 17 : 14],
        popupAnchor: [0, -18]
      });

      const orderMarker = L.marker([order.coordinates.lat, order.coordinates.lng], { icon: destIcon });

      orderMarker.bindPopup(`
        <div style="font-family: var(--font-body, system-ui); padding: 4px; min-width: 170px; color: #292B2A;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #EEE; padding-bottom: 4px; margin-bottom: 6px;">
            <span style="font-weight: 700; font-size: 13px; color: #1A1C1B;">${order.id}</span>
            <span style="font-size: 10px; font-weight: 700; color: #F28C28; text-transform: uppercase;">${order.orderStatus}</span>
          </div>
          <div style="font-weight: 600; font-size: 12px; color: #333;">${order.customerName}</div>
          <div style="font-size: 11px; color: #666; margin-top: 2px; line-height: 1.3;">${order.deliveryAddress}</div>
          <div style="font-size: 11px; color: #1A1C1B; margin-top: 6px; font-weight: 600;">
            Total: ₹${order.total} • ${order.paymentMethod}
          </div>
        </div>
      `);

      if (onSelectOrder) {
        orderMarker.on('click', () => onSelectOrder(order.id));
      }

      layerGroup.addLayer(orderMarker);
    });

    // 4. Draw Route Polyline if Selected Order Exists
    const selectedOrder = orders.find((o) => o.id === selectedOrderId);
    if (showRoute && selectedOrder && selectedOrder.coordinates) {
      const driver = drivers.find((d) => d.id === selectedOrder.assignedDriverId);
      const driverPos =
        driver?.id === 'drv-1'
          ? [12.924, 77.680]
          : driver?.id === 'drv-2'
          ? [12.930, 77.640]
          : [
              (farmLocation.lat + selectedOrder.coordinates.lat) / 2,
              (farmLocation.lng + selectedOrder.coordinates.lng) / 2
            ];

      const routePoints = [
        [farmLocation.lat, farmLocation.lng],
        driverPos,
        [selectedOrder.coordinates.lat, selectedOrder.coordinates.lng]
      ];

      const routeGlow = L.polyline(routePoints, {
        color: '#F28C28',
        weight: 6,
        opacity: 0.35,
        lineCap: 'round'
      });

      const routeLine = L.polyline(routePoints, {
        color: '#F28C28',
        weight: 3.5,
        opacity: 0.9,
        dashArray: '8, 8',
        lineCap: 'round'
      });

      layerGroup.addLayer(routeGlow);
      layerGroup.addLayer(routeLine);

      const bounds = L.latLngBounds(routePoints);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
    }
  }, [leafletReady, orders, selectedOrderId, drivers, farmLocation, showRoute, onSelectOrder]);

  return (
    <div
      ref={mapContainerRef}
      className={`osm-real-map-container ${className}`}
      style={{
        width: '100%',
        height: height,
        borderRadius: 'inherit',
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#E5E3DF'
      }}
    />
  );
};
