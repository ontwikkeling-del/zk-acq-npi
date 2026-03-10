// @personalization: LOW: structuur generiek. Popups (MaxClientValue + NewClients) bevatten klant-specifieke content.
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, UserPlus, X } from 'lucide-react';
import { MaxClientValue } from './MaxClientValue';
import { NewClients } from './NewClients';

const cards = [
  {
    icon: TrendingUp,
    title: 'Maximaliseer klantwaarde',
    description: 'Haal meer uit bestaande klanten door cross-sell, herhalingsaankopen en proactief klantbehoud',
    color: 'brand-green',
    slideKey: 'MaxClientValue',
    animateFrom: { x: -30 },
    delay: 0.4,
  },
  {
    icon: UserPlus,
    title: 'Nieuwe klanten aantrekken',
    description: 'Data-gedreven acquisitie van waardevolle nieuwe klanten op basis van jullie ideale klantprofiel',
    color: 'brand-accent',
    slideKey: 'NewClients',
    animateFrom: { x: 30 },
    delay: 0.5,
  },
];

const slideComponentMap: Record<string, React.FC> = {
  MaxClientValue, NewClients,
};

export const ClientBusinessCase: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<string | null>(null);
  const ActiveComponent = activeSlide ? slideComponentMap[activeSlide] : null;

  return (
    <>
      <section className="h-screen w-screen snap-start relative overflow-hidden bg-brand-purple flex items-center justify-center">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black uppercase leading-none text-white mb-12"
          >
            Verhoog de waarde van
            <br />
            <span className="text-brand-green">jouw B2B-klanten</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.slideKey}
                  initial={{ opacity: 0, ...card.animateFrom }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: card.delay }}
                  onClick={() => setActiveSlide(card.slideKey)}
                  className={`relative bg-white/10 border border-white/20 rounded-2xl p-8 cursor-pointer transition-all hover:bg-white/[0.18] hover:border-${card.color}/40 hover:scale-[1.02] group`}
                >
                  <div className={`w-14 h-14 bg-${card.color}/20 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${card.color}`} />
                  </div>
                  <h3 className={`text-${card.color} font-black text-xl uppercase mb-3`}>{card.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{card.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/40 text-sm mt-10"
          >
            Klik voor meer detail
          </motion.p>
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
