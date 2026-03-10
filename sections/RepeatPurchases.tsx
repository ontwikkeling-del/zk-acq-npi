import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Bot, Bell, Database } from 'lucide-react';
import { config } from '../clientConfig';
import { resolveTemplate } from '../types';

export const RepeatPurchases: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto">
            <RefreshCw className="w-8 h-8 text-brand-green" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-4"
        >
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">AI</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-6 text-brand-purple"
        >
          <span className="text-brand-green">Herhalings</span>aankopen
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          {resolveTemplate(config.repeatPurchaseText, config)}
        </motion.p>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { icon: Database, label: config.dataSourceLabel, sublabel: 'Klantdata' },
            { icon: Bot, label: 'AI', sublabel: 'Analyse' },
            { icon: Bell, label: 'Actie', sublabel: 'Notificatie' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
              className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6"
            >
              <item.icon className="w-8 h-8 text-brand-green mx-auto mb-3" />
              <p className="text-brand-purple font-bold text-sm">{item.label}</p>
              <p className="text-gray-400 text-xs">{item.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
