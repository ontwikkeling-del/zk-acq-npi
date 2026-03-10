import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Clock, BarChart3 } from 'lucide-react';

const actions = [
  { icon: CheckCircle, text: 'Elke deal een volgende stap — geen lead blijft liggen', color: 'brand-green' },
  { icon: Clock, text: 'Automatische herinneringen bij openstaande offertes', color: 'brand-accent' },
  { icon: BarChart3, text: 'Pipeline dashboard met conversie per fase', color: 'brand-pink' },
  { icon: Target, text: 'Sales weet elke ochtend precies wie te bellen', color: 'brand-green' },
];

export const ActivePipeline: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="text-brand-green font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Target className="w-3.5 h-3.5" /> Actief opvolgen
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-brand-purple"
            >
              Proactief <span className="text-brand-green">opvolgen</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed"
            >
              Werk met CRM alsof het je beste verkoper is. Elke actieve kans wordt goed opgevolgd, geen offerte valt tussen wal en schip.
            </motion.p>
          </div>

          <div className="space-y-4">
            {actions.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-brand-green/30 transition-all"
                >
                  <div className={`w-10 h-10 bg-${item.color}/15 rounded-full flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 text-${item.color}`} />
                  </div>
                  <p className="text-gray-700 font-medium text-sm">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
