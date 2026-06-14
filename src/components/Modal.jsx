'use client';

import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Are you sure?', 
  description = '',
  message = 'This action cannot be undone.', 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  isDanger = false,
  children = null,
  footer = null,
  isLoading = false,
  size = 'md',
  closeOnOverlayClick = true,
  stickyHeader = false,
  stickyFooter = false
}) => {
  
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
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

  // Clean size mapping
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    '5xl': 'sm:max-w-5xl',
    full: 'sm:max-w-7xl'
  };

  const selectedSizeClass = sizeClasses[size] || sizeClasses.md;

  const handleBackdropClick = (e) => {
    if (closeOnOverlayClick && onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Modal Dialog */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`relative w-full h-full sm:h-auto sm:max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 rounded-xl sm:rounded-2xl overflow-hidden z-10 flex flex-col ${selectedSizeClass}`}
            style={{
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15), 0 8px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-30 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Header */}
            {(!children || title) && (
              <div className={`px-5 sm:px-6 py-5 flex-shrink-0 border-b border-slate-100 dark:border-slate-800/50 ${
                stickyHeader 
                  ? 'sticky top-0 bg-white dark:bg-slate-900 z-20' 
                  : ''
              }`}>
                <div className="pr-8">
                  <h3 id="modal-title" className="text-lg font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  {description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 min-h-0">
              {children ? (
                children
              ) : (
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-lg flex-shrink-0 ${isDanger ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {message}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {!children && !footer && (
              <div className={`px-5 sm:px-6 py-4 flex justify-end gap-2 flex-shrink-0 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50 ${
                stickyFooter 
                  ? 'sticky bottom-0 z-20' 
                  : ''
              }`}>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 ${
                    isDanger 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  {confirmText}
                </button>
              </div>
            )}

            {/* Custom Footer */}
            {footer && (
              <div className={`px-5 sm:px-6 py-4 flex-shrink-0 border-t border-slate-100 dark:border-slate-800/50 ${
                stickyFooter 
                  ? 'sticky bottom-0 bg-white dark:bg-slate-900 z-20' 
                  : ''
              }`}>
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
