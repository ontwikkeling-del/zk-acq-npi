import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, FileText, Sparkles, Database, CheckCircle, Clock } from 'lucide-react';

const modules = [
  {
    id: 1,
    icon: Phone,
    label: 'Gesprek',
    sublabel: 'Sales call opgenomen',
    color: 'bg-purple-500',
    glowColor: 'shadow-purple-500/50',
  },
  {
    id: 2,
    icon: FileText,
    label: 'Transcriptie',
    sublabel: 'Automatisch uitgeschreven',
    color: 'bg-blue-500',
    glowColor: 'shadow-blue-500/50',
  },
  {
    id: 3,
    icon: Sparkles,
    label: 'AI Analyse',
    sublabel: 'Samenvatting + actiepunten',
    color: 'bg-teal-500',
    glowColor: 'shadow-teal-500/50',
  },
  {
    id: 4,
    icon: Database,
    label: 'CRM',
    sublabel: 'Notities automatisch opgeslagen',
    color: 'bg-green-500',
    glowColor: 'shadow-green-500/50',
  },
];

const analysisData = [
  { label: 'Gesprek', value: 'Sales call - Verpleeghuis De Beuken' },
  { label: 'Duur', value: '14 minuten' },
  { label: 'Samenvatting', value: 'Interesse in uitbreiding assortiment' },
  { label: 'Actiepunten', value: '3 follow-ups aangemaakt in CRM' },
  { label: 'Administratie', value: '0 minuten handmatig werk' },
];

export const DennisStory: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeModule, setActiveModule] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timers = [
        setTimeout(() => setActiveModule(1), 600),
        setTimeout(() => setActiveModule(2), 1200),
        setTimeout(() => setActiveModule(3), 1800),
        setTimeout(() => setActiveModule(4), 2400),
        setTimeout(() => setShowResult(true), 3000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      {/* Background */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-0 w-[50vw] h-[40vh] bg-brand-green/10 z-0"
        style={{ clipPath: 'polygon(0 100%, 0 20%, 80% 100%)' }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="flex -space-x-3">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green">
                  <img
                    src="https://zwartekraai.nl/assets/dennis-nijborg-updated-DwIKalt5.jpg"
                    alt="Dennis"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green">
                  <img
                    src="https://zwartekraai.nl/assets/hoger-hamo-JBd-9InU.jpg"
                    alt="Hoger"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-brand-purple font-black text-lg">Dennis Nijborg & Hoger Hamo</p>
                <p className="text-brand-green text-sm font-bold">CTO & Tech Lead</p>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-black uppercase leading-none mb-6"
            >
              Gesprekken
              <br />
              <span className="text-brand-green">automatisch</span>
              <br />
              geanalyseerd
            </motion.h2>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 mb-6"
            >
              <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-xl px-5 py-3">
                <div className="flex items-center gap-2 text-brand-green font-black text-2xl">
                  <Clock className="w-5 h-5" />
                  0 min
                </div>
                <p className="text-gray-600 text-xs">administratie per gesprek</p>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-4"
            >
              <p className="text-gray-700 text-sm leading-relaxed italic">
                "Samen kijken we naar de werkzaamheden van het sales team en kijken we hoe we zoveel mogelijk administratie kunnen automatiseren"
              </p>
            </motion.div>
          </div>

          {/* Right - Make.com Style Flow */}
          <div className="relative">
            {/* Flow Title */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-6"
            >
              <span className="text-brand-green font-bold text-xs uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
                Gespreksanalyse Flow
              </span>
            </motion.div>

            {/* Make.com Style Modules */}
            <div className="flex items-center justify-center gap-3 mb-8">
              {modules.map((module, index) => (
                <React.Fragment key={module.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.15, type: 'spring' }}
                    className="relative"
                  >
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${module.color} flex items-center justify-center transition-all duration-300 ${
                        activeModule >= module.id ? `shadow-lg ${module.glowColor}` : 'opacity-50'
                      }`}
                    >
                      <module.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                      <p className="text-brand-purple text-xs font-bold">{module.label}</p>
                      <p className="text-gray-600 text-[10px]">{module.sublabel}</p>
                    </div>
                    {activeModule === module.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className={`absolute -top-1 -right-1 w-4 h-4 ${module.color} rounded-full border-2 border-white`}
                      />
                    )}
                  </motion.div>

                  {index < modules.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 0.3 }}
                      className="relative h-0.5 w-6 md:w-10 origin-left"
                    >
                      <div className={`absolute inset-0 transition-colors duration-300 ${activeModule > index + 1 ? 'bg-brand-green' : 'bg-gray-600'}`} />
                      {activeModule === index + 2 && (
                        <motion.div
                          initial={{ left: '0%' }}
                          animate={{ left: '100%' }}
                          transition={{ duration: 0.4 }}
                          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-green rounded-full"
                        />
                      )}
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Result Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="mt-16 bg-brand-purple/5 border border-brand-purple/20 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-brand-green" />
                <span className="text-brand-green font-bold text-xs uppercase">Gesprek Geanalyseerd</span>
              </div>
              <div className="space-y-2">
                {analysisData.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showResult ? 1 : 0, x: showResult ? 0 : -10 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span className="text-gray-600 w-24">{item.label}:</span>
                    <span className={`font-bold ${item.label === 'Administratie' ? 'text-brand-green' : 'text-brand-purple'}`}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
