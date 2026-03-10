import React from 'react';
import { motion } from 'framer-motion';

export const IntroHook: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img src="/zk-logo-full.png" alt="Zwarte Kraai" className="h-28 mx-auto opacity-90" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block bg-brand-pink/10 border border-brand-pink/20 rounded-full px-6 py-2 mb-8"
        >
          <span className="text-brand-pink font-bold text-sm uppercase tracking-wider">Meer dan 90% zit vast in een reactief salesproces</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-8 text-brand-purple"
        >
          Ondernemers onderschatten de kracht van een{' '}
          <span className="text-brand-green">proactieve</span> organisatie
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Kansen worden niet of te laat gezien
        </motion.p>
      </div>
    </section>
  );
};
