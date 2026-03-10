import React from 'react';
import { motion } from 'framer-motion';
import { Database, Bot, Compass, ArrowRight, ArrowDown } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';

const problems = [
  {
    stat: 48,
    suffix: '%',
    level: 'Niveau 1: Individueel',
    problem: 'van verkopers doet nooit een follow-up na het eerste contact.',
    impact: 'Elke vergeten follow-up is een gemiste order.',
    source: 'Invesp Research',
    pillar: 'CRM',
    pillarIcon: Database,
    color: 'text-brand-pink',
    bgColor: 'bg-brand-pink',
  },
  {
    stat: 30,
    suffix: '%',
    level: 'Niveau 2: Team',
    problem: 'van de werktijd besteden verkopers aan daadwerkelijk verkopen.',
    impact: 'Je team is druk, maar niet productief. Administratie eet verkooptijd op.',
    source: 'Salesforce State of Sales, 2024',
    pillar: 'AI & Automation',
    pillarIcon: Bot,
    color: 'text-brand-green',
    bgColor: 'bg-brand-green',
  },
  {
    stat: 80,
    suffix: '%+',
    level: 'Niveau 3: Organisatie',
    problem: 'van AI-projecten faalt door gebrek aan strategie en adoptie.',
    impact: 'AI moet onderdeel zijn van het proces, niet als standalone tool.',
    source: 'RAND Corporation, 2024',
    pillar: 'Strategie & Adoptie',
    pillarIcon: Compass,
    color: 'text-brand-pink',
    bgColor: 'bg-brand-pink',
  },
];

export const ThreeProblems: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      {/* Background shapes */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-[40vw] h-full bg-white/[0.02] -skew-x-12 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-black uppercase leading-none mb-3 text-center"
        >
          Drie <span className="text-brand-pink">problemen</span>, drie <span className="text-brand-green">oplossingen</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-center mb-10"
        >
          Elk probleem is groter dan het vorige
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item, index) => (
            <motion.div
              key={item.pillar}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
              className="bg-brand-purple/5 backdrop-blur border border-brand-purple/20 rounded-2xl p-8 relative overflow-hidden group hover:bg-brand-purple/10 transition-colors"
            >
              {/* Escalation level badge */}
              <div className={`${item.bgColor}/20 rounded-full px-3 py-1 w-fit mb-4`}>
                <span className={`${item.color} font-bold text-xs uppercase tracking-wider`}>{item.level}</span>
              </div>

              {/* Big stat */}
              <div className={`font-black text-6xl md:text-7xl ${item.color} mb-4`}>
                <AnimatedCounter end={item.stat} suffix={item.suffix} />
              </div>

              {/* Problem description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                {item.problem}
              </p>

              {/* Impact - escalation */}
              <p className="text-brand-purple text-sm font-bold leading-relaxed mb-2">
                {item.impact}
              </p>
              <p className="text-gray-400 text-[10px] mb-4">{item.source}</p>

              {/* Arrow + Pillar */}
              <div className="flex items-center gap-3 mt-auto">
                <ArrowRight className={`w-5 h-5 ${item.color}`} />
                <div className={`${item.bgColor} rounded-full px-4 py-2 flex items-center gap-2`}>
                  <item.pillarIcon className="w-4 h-4 text-black" />
                  <span className="text-black font-black text-sm uppercase">{item.pillar}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Escalation arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center mt-6 gap-2"
        >
          <ArrowDown className="w-5 h-5 text-brand-pink" />
          <p className="text-brand-pink font-bold text-sm uppercase">Het probleem escaleert als je niets doet</p>
          <ArrowDown className="w-5 h-5 text-brand-pink" />
        </motion.div>
      </div>
    </section>
  );
};
