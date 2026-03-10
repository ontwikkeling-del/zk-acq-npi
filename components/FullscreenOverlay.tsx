import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FullscreenOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const FullscreenOverlay: React.FC<FullscreenOverlayProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, type: 'spring', bounce: 0.15 }}
            className="relative w-[94vw] h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title bar (optional) */}
            {title && (
              <div className="absolute top-4 left-6 z-50">
                <span className="bg-gray-900/80 text-white text-sm font-semibold px-4 py-2 rounded-full">
                  {title}
                </span>
              </div>
            )}

            {/* Content fills the overlay */}
            <div className="w-full h-full overflow-hidden">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
