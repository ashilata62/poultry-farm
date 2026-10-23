import React from 'react';
import { useFarm } from '../../context/FarmContext';
import { CheckCircle2, AlertCircle, AlertTriangle, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useFarm();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let className = 'toast-success';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          className = 'toast-error';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          className = 'toast-warning';
        }

        return (
          <div key={toast.id} className={`toast ${className}`}>
            <Icon size={18} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: '0.875rem', lineHeight: '1.4' }}>
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: 'rgba(255,255,255,0.7)', padding: '2px', display: 'flex' }}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
