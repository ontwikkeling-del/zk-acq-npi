import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Shield, FileCheck, Eye } from 'lucide-react';

export const Downsell: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Background */}
      <motion.div
        initial={{ y: '-100%' }}
        whileInView={{ y: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-full h-[30vh] bg-gray-50-light/20 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <Eye className="w-16 h-16 text-brand-green mx-auto" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-black uppercase leading-tight mb-6"
        >
          Wij maken je data
          <br />
          <span className="text-brand-green">actief</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          En doen een garantie op je cijfers. Geen verborgen kosten, geen verrassingen.
          Wij laten de data voor zich spreken.
        </motion.p>

        {/* Guarantee badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: Shield, label: 'NDA Beschermd', color: 'text-brand-green' },
            { icon: FileCheck, label: 'Garantie op cijfers', color: 'text-brand-pink' },
            { icon: BarChart3, label: 'Data-gedreven', color: 'text-brand-green' },
          ].map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-brand-purple/5 backdrop-blur border border-brand-purple/20 rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <badge.icon className={`w-6 h-6 ${badge.color}`} />
              <span className="text-brand-purple font-bold text-sm">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
