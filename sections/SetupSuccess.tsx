import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export const SetupSuccess: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto">
            <Rocket className="w-10 h-10 text-brand-green" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-6 text-brand-purple"
        >
          Opzet voor <span className="text-brand-green">succes!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          Geen consultants maar extra specialistische teamleden. Onderdeel van jullie team.
        </motion.p>

      </div>
    </section>
  );
};
