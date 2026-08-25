import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden glass-panel">
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white font-heading">{title}</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors text-xl font-bold"
            >
              ✕
            </button>
          </div>
        )}
        <div className="p-6 text-slate-200">{children}</div>
        {footer && <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
};
