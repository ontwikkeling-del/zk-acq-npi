import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Star, RefreshCw, TrendingUp, AlertCircle, ChevronRight, Globe } from 'lucide-react';

const segments = [
  {
    label: 'A-klanten',
    criteria: '>€5.000/jaar',
    strategy: 'Account management',
    color: 'brand-green',
    description: 'Persoonlijk contact, kwartaalreview, early access op nieuwe producten',
    icon: Star,
  },
  {
    label: 'B-klanten',
    criteria: '€1.000–€5.000/jaar',
    strategy: 'Herhalingsflows',
    color: 'brand-accent',
    description: 'Automatische bestelherinneringen, cross-sell campagnes, seizoensaanbiedingen',
    icon: RefreshCw,
  },
  {
    label: 'C-klanten',
    criteria: '<€1.000 maar hoog potentieel',
    strategy: 'Cross-sell activatie',
    color: 'brand-pink',
    description: 'Koopt alleen tape maar heeft 8 kamers — daar zit €4.000+ potentieel',
    icon: TrendingUp,
  },
  {
    label: 'Slapers',
    criteria: 'Valt buiten bestelpatroon',
    strategy: 'Win-back campagne',
    color: 'red-500',
    description: 'Automatisch signaal naar AM, persoonlijke benadering, win-back aanbieding',
    icon: AlertCircle,
  },
];

export const CustomerSegmentation: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - explanation */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="text-brand-green font-bold text-xs uppercase tracking-wider">Automatische Segmentatie</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-4 text-brand-purple"
            >
              Klanten <span className="text-brand-green">segmenteren</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed mb-6"
            >
              Op basis van besteldata uit Business Central deelt het systeem klanten automatisch in A/B/C-segmenten in. Elke groep krijgt een eigen aanpak — van persoonlijk account management tot geautomatiseerde win-back campagnes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-brand-purple/5 border border-brand-purple/10 rounded-xl p-4 mb-4"
            >
              <p className="text-brand-purple font-bold text-sm mb-1">Hoe werkt het?</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Bestelhistorie, orderfrequentie en klantwaarde worden continu geanalyseerd. Bij veranderingen (bijv. klant zakt van A naar B) krijgt de accountmanager automatisch een signaal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-brand-accent/5 border border-brand-accent/15 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-brand-accent" />
                <p className="text-brand-accent font-bold text-sm">Website-verrijking</p>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Op basis van websitedata herkennen we automatisch het type klant. Is het een fysiotherapiepraktijk, een ziekenhuis of een sportschool? Die classificatie bepaalt de juiste segmentatie en maakt gerichte advertenties mogelijk.
              </p>
            </motion.div>
          </div>

          {/* Right - segment cards */}
          <div className="space-y-3">
            {segments.map((seg, index) => {
              const Icon = seg.icon;
              return (
                <motion.div
                  key={seg.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white shadow-sm border border-gray-100 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 bg-${seg.color}/10 rounded-full flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 text-${seg.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-brand-purple font-bold text-sm">{seg.label}</p>
                        <span className={`text-${seg.color} text-xs font-bold bg-${seg.color}/10 px-2 py-0.5 rounded-full`}>
                          {seg.criteria}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs ml-11">{seg.description}</p>
                  <div className="ml-11 mt-2">
                    <span className={`text-${seg.color} font-bold text-xs`}>
                      <ChevronRight className="w-3 h-3 inline" /> {seg.strategy}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
