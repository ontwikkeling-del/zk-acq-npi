import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

const topics = [
  { month: '1', title: 'Basis automatisering', desc: 'Orderverwerking en klantherkenning automatiseren' },
  { month: '2', title: 'Data verrijking', desc: 'AI voegt bedrijfs- en contactinfo toe aan je CRM' },
  { month: '3', title: 'Slimme opvolgtaken', desc: 'Automatische taken voor sales op het juiste moment' },
  { month: '4', title: 'Klantsignalen', desc: 'Automatisch signaal bij afwijkend bestelpatroon' },
  { month: '5', title: 'Campagne flows', desc: 'Gerichte e-mailflows per klantsegment' },
  { month: '6', title: 'Dashboards', desc: 'Realtime inzicht in je sales performance' },
  { month: '7', title: 'Lead scoring', desc: 'Leads automatisch prioriteren op basis van data' },
  { month: '8', title: 'Cross-sell detectie', desc: 'AI herkent extra kansen bij bestaande klanten' },
  { month: '9', title: 'Offerte automatisering', desc: 'Van aanvraag tot offerte in minuten' },
  { month: '10', title: 'Voorspellend analyseren', desc: 'Voorspel wie meer of minder gaat bestellen' },
  { month: '11', title: 'Workflow optimalisatie', desc: 'Bestaande flows sneller en slimmer maken' },
  { month: '12', title: 'Zelfstandig draaien', desc: 'Team werkt zelfstandig met alle tools' },
];

export const AIAutomationPillar: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      <motion.div
        initial={{ x: '100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 right-0 w-[50vw] h-full bg-brand-accent/5 -skew-x-12 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-flex items-center gap-3 bg-brand-accent/10 border-2 border-brand-accent/30 rounded-full px-5 py-2 mb-4"
        >
          <Zap className="w-5 h-5 text-brand-accent" />
          <span className="text-brand-accent font-black text-sm uppercase tracking-wider">Pijler 2: AI & Automatisering</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-black uppercase leading-none mb-2"
        >
          Haal meer uit je
          <br />
          <span className="text-brand-accent">mensen en systemen</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-sm mb-5 max-w-lg"
        >
          We implementeren stap voor stap. Elke maand een nieuwe automatisering die direct geld oplevert.
        </motion.p>

        {/* 12-month grid */}
        <div className="grid grid-cols-4 gap-2">
          {topics.map((t, index) => (
            <motion.div
              key={t.month}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.04 }}
              className="bg-white border border-gray-100 rounded-xl px-3 py-2.5"
            >
              <span className="text-brand-accent font-black text-[10px] uppercase">Maand {t.month}</span>
              <p className="text-brand-purple font-bold text-xs mt-0.5">{t.title}</p>
              <p className="text-gray-400 text-[10px] leading-tight mt-0.5">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Business case highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 bg-brand-green/10 border border-brand-green/20 rounded-xl p-3 flex items-center gap-3"
        >
          <Sparkles className="w-5 h-5 text-brand-green shrink-0" />
          <p className="text-gray-600 text-xs">
            <strong className="text-brand-green">Elke maand een nieuw AI-traject</strong>: in 12 maanden 12+ automatiseringen die samen meer opleveren dan de investering.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
