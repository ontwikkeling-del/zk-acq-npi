import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Filter, DatabaseZap, ArrowRight } from 'lucide-react';

const steps = [
  { icon: Target, label: 'ICP Defini\u00EBren', desc: 'Jullie ideale klantprofiel vastleggen: branche, omvang, regio', color: 'brand-green' },
  { icon: Search, label: 'Leads Zoeken', desc: 'AI doorzoekt databases op bedrijven die matchen', color: 'brand-accent' },
  { icon: Filter, label: 'Kwalificeren', desc: 'Automatisch filteren op relevantie en potentie', color: 'brand-pink' },
  { icon: DatabaseZap, label: 'In CRM', desc: 'Verrijkte leads direct in HubSpot met alle bedrijfsdata', color: 'brand-green' },
];

export const LeadGeneration: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block bg-brand-pink/10 border border-brand-pink/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="text-brand-pink font-bold text-xs uppercase tracking-wider">Acquisitie</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-4 text-brand-purple"
            >
              Lead <span className="text-brand-pink">Generatie</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed mb-6"
            >
              Wij zoeken bedrijven die passen bij jullie ideale klantprofiel en voegen ze verrijkt toe aan het CRM. Geen koud bellen op gevoel, maar data-gedreven prospecting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-4"
            >
              <p className="text-brand-green font-bold text-sm mb-1">Hoe het werkt</p>
              <p className="text-gray-600 text-sm">Op basis van jullie beste klanten stelt AI een ICP samen. Vervolgens worden databases doorzocht, gefilterd en verrijkt. Resultaat: een lijst met gekwalificeerde prospects, direct in HubSpot.</p>
            </motion.div>
          </div>

          <div className="space-y-4">
            {steps.map((item, index) => (
              <React.Fragment key={item.label}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.12 }}
                  className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-brand-pink/30 transition-all"
                >
                  <div className={`w-10 h-10 bg-${item.color}/10 rounded-full flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-5 h-5 text-${item.color}`} />
                  </div>
                  <div>
                    <p className="text-brand-purple font-bold text-sm">{item.label}</p>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowRight className="w-4 h-4 text-gray-300 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
