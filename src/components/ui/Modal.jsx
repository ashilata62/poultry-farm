import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = '560px' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 style={{ margin: 0, fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: 'var(--charcoal)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, paddingRight: '0.5rem' }}>{title}</h3>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: '6px', borderRadius: 'var(--radius-xs)', display: 'flex', flexShrink: 0 }}
            aria-label="Close dialog"
          >
            <X size={20} color="var(--charcoal)" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
