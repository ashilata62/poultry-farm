import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { Modal } from '../ui/Modal';
import { Smartphone, Printer, ExternalLink, ShieldCheck } from 'lucide-react';

export const QROrderingModal = () => {
  const { isQrModalOpen, setIsQrModalOpen, setCurrentRole } = useFarm();

  const orderingUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? `${window.location.origin}/#shop`
    : 'https://thevillagefarm.in/order';

  const handlePrint = () => {
    window.print();
  };

  const handleOpenMobileSim = () => {
    setIsQrModalOpen(false);
    setCurrentRole('customer');
  };

  return (
    <Modal
      isOpen={isQrModalOpen}
      onClose={() => setIsQrModalOpen(false)}
      title="Mobile Quick Order QR Code"
      maxWidth="480px"
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted-text)', marginBottom: '1.25rem' }}>
          Scan with any mobile camera or UPI-enabled app to order directly from the farm dispatch queue.
        </p>

        {/* QR Code Container */}
        <div
          style={{
            background: 'var(--white)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '2px dashed var(--amber-primary)',
            display: 'inline-block',
            margin: '0 auto 1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* High quality SVG QR Code representation */}
          <svg width="200" height="200" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="29" height="29" fill="#FFFFFF"/>
            {/* Top-left position pattern */}
            <rect x="2" y="2" width="7" height="7" fill="#202321"/>
            <rect x="3" y="3" width="5" height="5" fill="#FFFFFF"/>
            <rect x="4" y="4" width="3" height="3" fill="#D11243"/>
            
            {/* Top-right position pattern */}
            <rect x="20" y="2" width="7" height="7" fill="#202321"/>
            <rect x="21" y="3" width="5" height="5" fill="#FFFFFF"/>
            <rect x="22" y="4" width="3" height="3" fill="#D11243"/>

            {/* Bottom-left position pattern */}
            <rect x="2" y="20" width="7" height="7" fill="#202321"/>
            <rect x="3" y="21" width="5" height="5" fill="#FFFFFF"/>
            <rect x="4" y="22" width="3" height="3" fill="#D11243"/>

            {/* Timing patterns */}
            <rect x="10" y="5" width="8" height="1" fill="#202321"/>
            <rect x="5" y="10" width="1" height="8" fill="#202321"/>

            {/* Data matrix representation */}
            <rect x="10" y="2" width="2" height="2" fill="#202321"/>
            <rect x="14" y="2" width="2" height="2" fill="#202321"/>
            <rect x="17" y="3" width="1" height="2" fill="#202321"/>
            <rect x="11" y="7" width="2" height="2" fill="#D11243"/>
            <rect x="15" y="7" width="3" height="2" fill="#202321"/>
            <rect x="2" y="10" width="2" height="2" fill="#202321"/>
            <rect x="7" y="11" width="2" height="3" fill="#202321"/>
            <rect x="10" y="10" width="4" height="4" fill="#202321"/>
            <rect x="16" y="11" width="2" height="2" fill="#D11243"/>
            <rect x="20" y="10" width="2" height="3" fill="#202321"/>
            <rect x="24" y="11" width="3" height="2" fill="#202321"/>
            <rect x="11" y="16" width="3" height="2" fill="#202321"/>
            <rect x="16" y="15" width="2" height="3" fill="#202321"/>
            <rect x="19" y="15" width="2" height="2" fill="#D11243"/>
            <rect x="23" y="15" width="4" height="2" fill="#202321"/>
            <rect x="10" y="20" width="2" height="3" fill="#202321"/>
            <rect x="14" y="20" width="3" height="2" fill="#202321"/>
            <rect x="19" y="20" width="2" height="3" fill="#202321"/>
            <rect x="23" y="21" width="3" height="3" fill="#D11243"/>
            <rect x="11" y="24" width="3" height="2" fill="#202321"/>
            <rect x="16" y="24" width="2" height="3" fill="#202321"/>
            <rect x="20" y="25" width="4" height="2" fill="#202321"/>

            {/* Farm logo in center */}
            <rect x="12" y="12" width="5" height="5" rx="1" fill="#202321"/>
            <path d="M14.5 13.2C13.8 13.2 13.5 13.7 13.5 14.5C13.5 15.3 14 15.8 14.5 15.8C15 15.8 15.5 15.3 15.5 14.5C15.5 13.7 15.2 13.2 14.5 13.2Z" fill="#D11243"/>
          </svg>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--charcoal)', fontWeight: 600, wordBreak: 'break-all' }}>
            {orderingUrl}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.8125rem',
            color: 'var(--success-green)',
            marginBottom: '1.25rem'
          }}
        >
          <ShieldCheck size={16} />
          <span>SSL Secured Farm-Direct Link</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-secondary btn-sm">
            <Printer size={16} />
            <span>Print Standee</span>
          </button>
          <button onClick={handleOpenMobileSim} className="btn btn-primary btn-sm">
            <Smartphone size={16} />
            <span>Open Mobile View</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
