import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Bell, TrendingUp, UserPlus, X } from 'lucide-react';
import { ActivePipeline } from './ActivePipeline';
import { SleepingClients } from './SleepingClients';
import { MaxClientValue } from './MaxClientValue';
import { NewClients } from './NewClients';

const speerpunten = [
  {
    icon: Database,
    title: 'CRM actief opvolgen',
    description: 'Pipeline structureren, signalen instellen, proactief opvolgen van leads in plaats van reactief wachten',
    color: 'brand-green',
    slideKey: 'ActivePipeline',
  },
  {
    icon: Bell,
    title: 'Slapende klanten activeren',
    description: 'Automatische signalen bij afwijkend bestelpatroon, win-back campagnes, relatieonderhoud',
    color: 'brand-accent',
    slideKey: 'SleepingClients',
  },
  {
    icon: TrendingUp,
    title: 'Klanten voller maken',
    description: 'Cross-sell kansen identificeren, herhalingsflows, klantwaarde verhogen per segment',
    color: 'brand-pink',
    slideKey: 'MaxClientValue',
  },
  {
    icon: UserPlus,
    title: 'Nieuwe klanten aantrekken',
    description: 'Data-gedreven outreach, (geautomatiseerde) acquisitie op basis van ICP',
    color: 'brand-purple',
    slideKey: 'NewClients',
  },
];

const slideComponentMap: Record<string, React.FC> = {
  ActivePipeline, SleepingClients, MaxClientValue, NewClients,
};

export const B2BValue: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<string | null>(null);
  const ActiveComponent = activeSlide ? slideComponentMap[activeSlide] : null;

  return (
    <>
      <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-1.5 mb-4"
            >
              <Database className="w-4 h-4 text-brand-green" />
              <span className="text-brand-green font-bold text-xs uppercase tracking-wider">Stap voor stap</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black uppercase leading-tight mb-3 text-brand-purple"
            >
              4 speerpunten naar <span className="text-brand-green">meer omzet</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm max-w-2xl mx-auto"
            >
              Klik op een speerpunt voor meer detail
            </motion.p>
          </div>

          {/* 4-speerpunt grid - clickable */}
          <div className="grid md:grid-cols-4 gap-4">
            {speerpunten.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.12 }}
                  onClick={() => setActiveSlide(item.slideKey)}
                  className={`bg-white shadow-sm border border-gray-100 rounded-2xl p-5 relative cursor-pointer transition-all group hover:border-${item.color}/30 hover:shadow-md`}
                >
                  <div className={`w-10 h-10 bg-${item.color}/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 text-${item.color}`} />
                  </div>

                  <h3 className={`text-${item.color} font-black text-sm uppercase mb-2`}>{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full-screen modal overlay */}
      <AnimatePresence>
        {activeSlide && ActiveComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveSlide(null)}
          >
            <button
              onClick={() => setActiveSlide(null)}
              className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
            >
              <X className="w-5 h-5 text-brand-purple" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, type: 'spring', damping: 25 }}
              className="absolute inset-4 md:inset-8 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ActiveComponent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
