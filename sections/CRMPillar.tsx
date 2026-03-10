import React from 'react';
import { motion } from 'framer-motion';
import { Database, Bell, TrendingUp } from 'lucide-react';

export const CRMPillar: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      <motion.div
        initial={{ x: '100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 right-0 w-[50vw] h-full bg-brand-green/5 -skew-x-12 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-flex items-center gap-3 bg-brand-green/10 border-2 border-brand-green/30 rounded-full px-6 py-3 mb-6"
        >
          <Database className="w-6 h-6 text-brand-green" />
          <span className="text-brand-green font-black text-lg uppercase tracking-wider">Pijler 1: CRM</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-5xl font-black uppercase leading-none mb-6"
        >
          Hoeveel laat je
          <br />
          <span className="text-brand-green">op dit moment</span>
          <br />
          liggen?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg leading-relaxed mb-6"
        >
          Gebaseerd op hoe de multinationals het doen: maar dan toepasbaar voor het MKB. Een CRM dat je team vertelt wat ze moeten doen, wanneer en bij wie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-brand-green mt-1 shrink-0" />
            <p className="text-gray-600">Automatische <strong className="text-brand-purple">signalen</strong> bij kansen en risico's</p>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-brand-green mt-1 shrink-0" />
            <p className="text-gray-600">Inzicht in <strong className="text-brand-purple">omzet per medewerker</strong> en teamprestatie</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
