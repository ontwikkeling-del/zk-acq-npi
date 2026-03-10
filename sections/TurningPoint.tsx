import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';

export const TurningPoint: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Dramatic gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(91,214,117,0.12)_0%,_transparent_70%)]" />

      {/* Animated light sweep */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        whileInView={{ x: '200%', opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-brand-green/20 to-transparent -skew-x-12"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        {/* Eye icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto">
            <Eye className="w-10 h-10 text-brand-green" />
          </div>
        </motion.div>

        {/* Main question */}
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-8"
        >
          Wat als je{' '}
          <span className="text-brand-green">elke kans</span>
          <br />
          ziet, voordat je
          <br />
          concurrent dat doet?
        </motion.h2>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10"
        >
          Slapende klanten reactiveren. Dalend bestelgedrag opmerken.
          <br />
          Nieuwe zorginstellingen als eerste benaderen.
        </motion.p>

        {/* Arrow forward */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-brand-green font-black text-lg uppercase tracking-wider">Hier is hoe</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6 text-brand-green" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
