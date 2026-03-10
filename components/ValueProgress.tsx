import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface ValueProgressProps {
  currentSection: number;
  totalSections: number;
}

// Cumulative value shown per slide milestone
const slideValues: Record<number, number> = {
  5: 42000,    // After CostOfInaction
  8: 67000,    // After CRM pillar
  12: 89000,   // After DataDashboard
  14: 127000,  // After ROICalculator
};

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

export const ValueProgress: React.FC<ValueProgressProps> = ({ currentSection, totalSections }) => {
  // Find the highest value for the current or any previous slide
  let currentValue = 0;
  const sortedKeys = Object.keys(slideValues).map(Number).sort((a, b) => a - b);
  for (const key of sortedKeys) {
    if (currentSection >= key) {
      currentValue = slideValues[key];
    }
  }

  // Only show after first value milestone and before last 2 slides
  const showValue = currentValue > 0 && currentSection < totalSections - 2;

  return (
    <AnimatePresence>
      {showValue && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-brand-green/90 backdrop-blur-sm rounded-full px-5 py-2 shadow-lg"
        >
          <TrendingUp className="w-4 h-4 text-black" />
          <span className="text-black font-black text-sm">
            Getoonde waarde: {formatCurrency(currentValue)}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
