// @personalization: HIGH — config.newClientSteps (4 stappen) + description-tekst. Stappen worden geladen uit clientConfig.
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Search, Target, Mail, Phone, ArrowRight, X } from 'lucide-react';
import { config } from '../clientConfig';
import { resolveTemplate } from '../types';
import { PipelineAnimation } from './PipelineAnimation';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Search, Target, Mail, Phone,
};

export const NewClients: React.FC = () => {
  const [showPipeline, setShowPipeline] = useState(false);

  return (
    <>
      <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="inline-block bg-brand-purple/10 border border-brand-purple/20 rounded-full px-4 py-1.5 mb-6"
              >
                <span className="text-brand-purple font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <UserPlus className="w-3.5 h-3.5" /> Nieuwe klanten
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-brand-purple"
              >
                Aantrekken nieuwe{' '}
                <span className="text-brand-green">{config.clientTypeLabel || 'zakelijke klanten'}</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 text-base leading-relaxed"
              >
                Pas als je fundament staat, ga je actief nieuwe klanten werven. Data-gedreven acquisitie met bewezen aanpak.
              </motion.p>
            </div>

            <div className="space-y-4">
              {config.newClientSteps.map((step, index) => {
                const Icon = iconMap[step.icon] || Search;
                const isLastStep = index === config.newClientSteps.length - 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={isLastStep ? () => setShowPipeline(true) : undefined}
                    className={`bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4 transition-all ${
                      isLastStep
                        ? 'cursor-pointer hover:border-brand-purple/30 hover:shadow-md group'
                        : 'hover:border-brand-green/30'
                    }`}
                  >
                    <div className={`w-10 h-10 ${isLastStep ? 'bg-brand-purple/20' : 'bg-brand-green/20'} rounded-full flex items-center justify-center shrink-0 ${isLastStep ? 'group-hover:scale-110 transition-transform' : ''}`}>
                      <Icon className={`w-5 h-5 ${isLastStep ? 'text-brand-purple' : 'text-brand-green'}`} />
                    </div>
                    <p className="text-gray-700 font-medium text-sm flex-1">{resolveTemplate(step.text, config)}</p>
                    {isLastStep && (
                      <ArrowRight className="w-4 h-4 text-brand-purple shrink-0 group-hover:translate-x-1 transition-transform" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline animation modal */}
      <AnimatePresence>
        {showPipeline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPipeline(false)}
          >
            <button
              onClick={() => setShowPipeline(false)}
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
              <PipelineAnimation />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
