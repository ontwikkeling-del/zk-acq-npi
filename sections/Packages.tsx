import React from 'react';
import { motion } from 'framer-motion';
import { Database, Bell, TrendingUp, UserPlus, Calendar, Euro } from 'lucide-react';

const phases = [
  {
    icon: Database,
    title: 'CRM & Opvolging',
    color: 'brand-green',
    months: [
      { range: '1-2', label: 'CRM inrichting & pipeline' },
      { range: '3-4', label: 'Signalen & dashboards' },
      { range: '5-6', label: 'Optimalisatie' },
      { range: '7-12', label: 'Onderhoud & uitbreiding' },
    ],
    roi: 'Hogere conversie',
  },
  {
    icon: Bell,
    title: 'Slapende Klanten',
    color: 'brand-accent',
    months: [
      { range: '1-2', label: 'Segmentatie & bestelpatronen' },
      { range: '3-4', label: 'Win-back campagnes' },
      { range: '5-6', label: 'Escalatie & opvolging' },
      { range: '7-12', label: 'Continu monitoren' },
    ],
    roi: 'Minder churn',
  },
  {
    icon: TrendingUp,
    title: 'Voller Maken',
    color: 'brand-pink',
    months: [
      { range: '1-2', label: 'Cross-sell kansen mappen' },
      { range: '3-4', label: 'Herhalingsflows' },
      { range: '5-6', label: 'Klantwaarde verhogen' },
      { range: '7-12', label: 'Schalen & personalisatie' },
    ],
    roi: 'Hogere klantwaarde',
  },
  {
    icon: UserPlus,
    title: 'Nieuwe Klanten',
    color: 'brand-purple',
    months: [
      { range: '1-4', label: 'Fundament bouwen' },
      { range: '5-6', label: 'Outreach & acquisitie' },
      { range: '7-9', label: 'Data-gedreven acquisitie' },
      { range: '10-12', label: 'Schalen' },
    ],
    roi: 'Lagere acquisitiekosten',
  },
];

export const Packages: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 bg-brand-purple/5 border border-brand-purple/10 rounded-full px-4 py-1.5 mb-3"
          >
            <Calendar className="w-4 h-4 text-brand-purple" />
            <span className="text-brand-purple font-bold text-xs uppercase tracking-wider">12-Maanden Plan</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black uppercase leading-tight mb-2 text-brand-purple"
          >
            Jouw <span className="text-brand-green">roadmap</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-gray-400 text-sm"
          >
            Vier onderwerpen, twaalf maanden. Elk onderwerp bouwt voort en levert direct resultaat.
          </motion.p>
        </div>

        {/* Timeline per phase */}
        <div className="space-y-3">
          {phases.map((phase, pIndex) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + pIndex * 0.12 }}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-${phase.color}/10 rounded-full flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 text-${phase.color}`} />
                    </div>
                    <p className={`text-${phase.color} font-black text-sm uppercase`}>{phase.title}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 bg-${phase.color}/10 rounded-full px-3 py-1`}>
                    <Euro className={`w-3 h-3 text-${phase.color}`} />
                    <span className={`text-${phase.color} font-bold text-[10px]`}>{phase.roi}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {phase.months.map((m) => (
                    <div
                      key={m.range}
                      className={`flex-1 bg-${phase.color}/10 rounded-lg px-2 py-2`}
                    >
                      <p className={`text-${phase.color} font-bold text-[9px] uppercase mb-0.5`}>Maand {m.range}</p>
                      <p className="text-gray-600 text-[10px] leading-tight">{m.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-4 text-brand-green font-bold text-sm"
        >
          Wij doen het werk. Jij ziet het resultaat: elke maand.
        </motion.p>
      </div>
    </section>
  );
};
