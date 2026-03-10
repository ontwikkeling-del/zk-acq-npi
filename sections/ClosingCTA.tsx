import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../clientConfig';

export const ClosingCTA: React.FC = () => {
  const { presenter } = config;

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-brand-purple">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[180px]" />
      </div>

      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        whileInView={{ x: '200%', opacity: [0, 0.1, 0] }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-brand-green/10 to-transparent -skew-x-12"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <img src="/zk-logo-full.png" alt="Zwarte Kraai" className="h-28 mx-auto opacity-90 invert drop-shadow-lg" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight mb-10 text-white"
        >
          Haal meer uit jouw{' '}
          <span className="text-brand-green">team</span>, haal meer uit jouw{' '}
          <span className="text-brand-green">klanten</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30">
            <img src={presenter.photo} alt={presenter.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">{presenter.name}</p>
            <p className="text-white/60 text-sm">{presenter.role}</p>
          </div>
          <div className="flex gap-4 mt-2">
            {presenter.phone && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
                <span className="text-white/80 text-sm font-medium">{presenter.phone}</span>
              </div>
            )}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <span className="text-white/80 text-sm font-medium">{presenter.email}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
