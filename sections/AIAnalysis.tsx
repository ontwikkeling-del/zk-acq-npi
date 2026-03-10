import React from 'react';
import { motion } from 'framer-motion';
import { Mic, FileText, TrendingUp, Bot } from 'lucide-react';

export const AIAnalysis: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              className="mb-6"
            >
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-brand-accent" />
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
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-4 text-brand-purple"
            >
              AI <span className="text-brand-accent">Gespreksanalyse</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-4"
            >
              Automatische samenvattingen, direct in je klantdossier
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed"
            >
              Notuleren is verleden tijd. Onze AI neemt gesprekken op, vat ze samen en analyseert ze voor training. Zo groeit je team op basis van echte data.
            </motion.p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mic, text: 'Gesprek automatisch opgenomen', color: 'brand-accent' },
              { icon: FileText, text: 'Samenvatting gegenereerd', color: 'brand-green' },
              { icon: TrendingUp, text: 'Analyse voor training', color: 'brand-green' },
              { icon: Bot, text: 'Automatisch in klantdossier', color: 'brand-accent' },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.12 }}
                className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 bg-${item.color}/20 rounded-full flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-5 h-5 text-${item.color}`} />
                </div>
                <p className="text-gray-700 font-medium text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
