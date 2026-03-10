import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Star, RefreshCw, TrendingUp, AlertCircle, Bell, ShoppingCart, Clock, ArrowDownRight, ChevronRight } from 'lucide-react';

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

const signals = [
  {
    title: 'Slapende klant',
    trigger: 'Valt buiten verwacht bestelpatroon',
    action: 'Beltaak naar accountmanager',
    icon: Bell,
    color: 'red-500',
    bgColor: 'red-50',
    borderColor: 'red-200',
    example: 'Fysiopraktijk Groningen — 5 vestigingen, laatste order 94 dagen geleden',
  },
  {
    title: 'Cross-sell kans',
    trigger: 'Koopt alleen tape, nooit apparatuur',
    action: 'Behandeltafel campagne starten',
    icon: ShoppingCart,
    color: 'brand-accent',
    bgColor: 'brand-accent/5',
    borderColor: 'brand-accent/20',
    example: 'Praktijk met 6 kamers, €400/jaar — koopt 90% elders',
  },
  {
    title: 'Herbestelling nodig',
    trigger: 'Bestelcyclus verlopen (gemiddelde interval +20%)',
    action: 'Automatische herinneringsmail',
    icon: Clock,
    color: 'brand-green',
    bgColor: 'brand-green/5',
    borderColor: 'brand-green/20',
    example: 'Bestelt normaal elke 45 dagen papierrollen — nu 58 dagen stil',
  },
  {
    title: 'Daling bestelwaarde',
    trigger: '-30% vs. gemiddelde orderwaarde',
    action: 'Accountmanager alert + analyse',
    icon: ArrowDownRight,
    color: 'brand-pink',
    bgColor: 'brand-pink/5',
    borderColor: 'brand-pink/20',
    example: 'Van €800 naar €200/kwartaal — concurrent actief?',
  },
];

export const SegmentStrategy: React.FC = () => {
  const [activeSignal, setActiveSignal] = useState<number | null>(null);

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 bg-brand-purple/5 border border-brand-purple/10 rounded-full px-4 py-1.5 mb-3"
          >
            <Layers className="w-4 h-4 text-brand-purple" />
            <span className="text-brand-purple font-bold text-xs uppercase tracking-wider">Segmentatie & Signalen</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-black uppercase leading-none"
          >
            Elke klant de <span className="text-brand-green">juiste aanpak</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left - Segments */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-3"
            >
              Automatische klantsegmentatie
            </motion.p>

            <div className="space-y-3">
              {segments.map((seg, index) => {
                const Icon = seg.icon;
                return (
                  <motion.div
                    key={seg.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
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

          {/* Right - Signal cards */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-3"
            >
              Automatische signalen — klik voor detail
            </motion.p>

            <div className="space-y-3">
              {signals.map((signal, index) => {
                const Icon = signal.icon;
                const isActive = activeSignal === index;
                return (
                  <motion.div
                    key={signal.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => setActiveSignal(isActive ? null : index)}
                    className={`bg-white border rounded-xl p-4 shadow-sm cursor-pointer transition-all ${
                      isActive ? `border-${signal.color} shadow-md` : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 bg-${signal.color}/10 rounded-full flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 text-${signal.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-brand-purple font-bold text-sm">{signal.title}</p>
                        <p className="text-gray-500 text-xs truncate">{signal.trigger}</p>
                      </div>
                      <div className={`text-${signal.color} font-bold text-xs shrink-0`}>
                        {signal.action}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`mt-3 bg-${signal.bgColor} border border-${signal.borderColor} rounded-lg p-3`}>
                            <p className="text-gray-600 text-xs italic">"{signal.example}"</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-6"
        >
          <p className="text-brand-purple font-black text-sm italic">
            "2 accountmanagers + automatisering = 5× effectiever dan 2 buitendienstmedewerkers"
          </p>
        </motion.div>
      </div>
    </section>
  );
};
