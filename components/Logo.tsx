import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed bottom-8 left-8 z-50"
    >
      <motion.img
        src="https://zwartekraai.nl/assets/logo-zw-CkF28sIi.png"
        alt="Zwarte Kraai"
        className="h-14 w-auto"
        style={{ filter: 'brightness(0) invert(1)' }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
    </motion.div>
  );
};
