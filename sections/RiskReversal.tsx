import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Shield } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';

const clients = [
  { name: 'FLOER', logo: '/logos/floer-logo-D86of5Xo.png' },
  { name: 'BMTEC', logo: '/logos/bmtec-logo-B-7ZPvKy.png' },
  { name: 'Wovar', logo: '/logos/Wovar-logo-zwart.png' },
  { name: 'JC-Electronics', logo: '/logos/jc-logo-hNkYV-H9.png' },
  { name: 'No Boring Suitcases', logo: '/logos/noboringsuitcases logo.png' },
  { name: 'Scholma', logo: '/logos/scholma-logo-CzDUu-0H.webp' },
  { name: 'Fotocadeau.nl', logo: '/logos/fotocadeau logo.png' },
  { name: 'Horecabier.nl', logo: '/logos/horecabier logo.png', large: true },
  { name: 'Chocolade Bezorgd', logo: '/logos/chocobezorgd-logo-B5U2XKA9.png' },
  { name: 'Marlan', logo: '/logos/marlan logo.png' },
  { name: 'Royal De Vries', logo: '/logos/royal-de-vries-logo-DE5HruD_.png' },
  { name: 'De Vries Trappen', logo: '/logos/de vries trappen.svg' },
  { name: 'Repos', logo: '/logos/reposlogo.svg' },
  { name: 'Kunstgras-online.nl', logo: '/logos/kunstgrasonline logo.svg' },
];

const results = [
  { value: 10, suffix: '+ uur', label: 'per week tijdswinst door automatisering', color: 'text-brand-green' },
  { value: 40, suffix: '%', label: 'minder gemiste follow-ups', color: 'text-brand-pink' },
  { value: 100, suffix: '%', label: 'zicht op klanthistorie en pipeline', color: 'text-brand-green' },
];

const steps = [
  { icon: Search, title: 'Samen cijfers analyseren', description: 'We duiken in jullie data' },
  { icon: TrendingUp, title: 'Potentieel inschatten', description: 'Groeikansen in kaart brengen' },
  { icon: Shield, title: 'Commitment vastleggen', description: 'Geen resultaat = geen kosten' },
];

export const RiskReversal: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-start justify-center px-8 pt-10">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-2 gap-8">
            {/* Left: Results */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-brand-green font-bold text-xs uppercase tracking-wider mb-2"
              >
                Bewezen resultaten
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl font-black uppercase mb-4 leading-tight"
              >
                Wat onze klanten <span className="text-brand-green">bereiken</span>
              </motion.h2>

              <div className="space-y-2.5">
                {results.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-white rounded-xl p-3.5 border border-gray-200/60 flex items-center gap-4"
                  >
                    <p className={`text-3xl font-black whitespace-nowrap ${r.color}`}>
                      <AnimatedCounter end={r.value} suffix={r.suffix} decimals={0} />
                    </p>
                    <p className="text-gray-500 text-xs">{r.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: No Cure No Pay */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-brand-pink font-bold text-xs uppercase tracking-wider mb-2"
              >
                Ons commitment
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl font-black uppercase mb-3 leading-tight"
              >
                Wij nemen het <span className="text-brand-pink">risico</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-sm mb-4"
              >
                Wij geloven in wat we doen. Daarom nemen wij het risico, niet jij. Geen resultaat? Geen kosten.
              </motion.p>

              <div className="space-y-2.5 mb-4">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-brand-green/15 flex items-center justify-center shrink-0">
                      <step.icon className="w-4 h-4 text-brand-green" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{step.title}</p>
                      <p className="text-gray-400 text-xs">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* No Cure No Pay badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="bg-brand-green rounded-2xl p-4 text-center"
              >
                <Shield className="w-7 h-7 text-brand-purple mx-auto mb-1" />
                <p className="font-black text-xl text-brand-purple uppercase">No Cure, No Pay</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width client logos bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-8 pb-4 pt-3"
      >
        <div className="max-w-6xl mx-auto bg-white rounded-2xl p-4 border border-gray-200/60">
          <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider text-center">
            Zij gingen je voor
          </p>
          <div className="grid grid-cols-7 gap-3 items-center">
            {clients.map((client) => (
              <div
                key={client.name}
                className="bg-gray-50 rounded-xl p-2 flex items-center justify-center h-16"
                style={{ overflow: client.large ? 'visible' : 'hidden' }}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className={`w-auto object-contain ${client.large ? 'h-24' : 'h-10'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
