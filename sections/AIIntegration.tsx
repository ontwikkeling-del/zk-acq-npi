import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingCart, Globe, Sparkles, Target, UserCheck, Play } from 'lucide-react';
import { FullscreenOverlay } from '../components/FullscreenOverlay';

const modules = [
  {
    id: 1,
    icon: ShoppingCart,
    label: 'Nieuwe Order',
    sublabel: 'Eerste bestelling',
    color: 'bg-purple-500',
    borderColor: 'border-purple-500',
    glowColor: 'shadow-purple-500/50',
  },
  {
    id: 2,
    icon: Globe,
    label: 'Data Check',
    sublabel: 'Bedrijfsgrootte analyse',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    glowColor: 'shadow-blue-500/50',
  },
  {
    id: 3,
    icon: Sparkles,
    label: 'AI Analyse',
    sublabel: 'Potentie inschatting',
    color: 'bg-teal-500',
    borderColor: 'border-teal-500',
    glowColor: 'shadow-teal-500/50',
  },
  {
    id: 4,
    icon: Target,
    label: 'Priority Score',
    sublabel: 'Taak voor sales medewerker',
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    glowColor: 'shadow-orange-500/50',
  },
];

const dataFlow = [
  { from: 'bedrijf', to: 'Verpleeghuis De Beuken' },
  { from: 'signaal', to: 'Eerste bestelling geplaatst' },
  { from: 'analyse', to: '120 medewerkers, 3 vestigingen' },
  { from: 'potentie', to: 'Hoog - geschat \u20AC47.000/jaar' },
  { from: 'actie', to: 'Prioriteit taak - bel VANDAAG' },
];

export const AIIntegration: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeModule, setActiveModule] = useState(0);
  const [showData, setShowData] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timers = [
        setTimeout(() => setActiveModule(1), 600),
        setTimeout(() => setActiveModule(2), 1200),
        setTimeout(() => setActiveModule(3), 1800),
        setTimeout(() => setActiveModule(4), 2400),
        setTimeout(() => setShowData(true), 3000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  return (
    <>
    <section ref={ref} className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(204,255,0,0.05)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-brand-pink/20 rounded-full px-4 py-2 w-fit mb-6"
            >
              <span className="text-brand-pink font-bold text-sm uppercase tracking-wider">AI Integratie</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-black uppercase leading-none mb-6"
            >
              <span className="text-brand-pink">80%+</span> van AI
              <br />
              projecten <span className="text-brand-pink">faalt.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 leading-relaxed mb-4"
            >
              De succesvolle <span className="text-brand-green font-black">20%</span> maakt AI onderdeel van hun processen.
              Niet als losse tool, maar verweven in elke stap.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-xs mb-6"
            >
              Bron: RAND Corporation, 2024
            </motion.p>

            {/* New example */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-4"
            >
              <p className="text-brand-green font-bold text-xs uppercase mb-2">Voorbeeld voor jouw organisatie</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Nieuw bedrijf plaatst eerste bestelling &rarr; AI analyseert hoeveel medewerkers, schat potentieel in &rarr; Geeft aan of het een prioriteit taak moet zijn voor sales.
              </p>
            </motion.div>
          </div>

          {/* Right - Video + Make.com Style Flow */}
          <div className="relative">
            {/* AI Video Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onClick={() => setShowVideo(true)}
              className="bg-brand-pink/5 border border-brand-pink/20 rounded-xl px-6 py-3 mb-4 flex items-center gap-3 cursor-pointer hover:bg-brand-pink/10 hover:scale-105 transition-all"
            >
              <div className="w-10 h-10 bg-brand-pink rounded-full flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
              <div>
                <p className="text-brand-purple font-bold text-sm">Bekijk AI integratie demo</p>
                <p className="text-gray-500 text-xs">Hoe AI jouw sales versterkt</p>
              </div>
            </motion.div>

            {/* Flow Title */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-6"
            >
              <span className="text-brand-pink font-bold text-xs uppercase tracking-wider bg-brand-pink/10 px-3 py-1 rounded-full">
                Nieuwe Klant Priority Flow
              </span>
            </motion.div>

            {/* Make.com Style Modules */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {modules.map((module, index) => (
                <React.Fragment key={module.id}>
                  {/* Module Circle */}
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
                    {/* Label below */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                      <p className="text-brand-purple text-xs font-bold">{module.label}</p>
                      <p className="text-gray-600 text-[10px]">{module.sublabel}</p>
                    </div>
                    {/* Active indicator */}
                    {activeModule === module.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className={`absolute -top-1 -right-1 w-4 h-4 ${module.color} rounded-full border-2 border-white`}
                      />
                    )}
                  </motion.div>

                  {/* Connector Line */}
                  {index < modules.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 0.3 }}
                      className="relative h-0.5 w-6 md:w-10 origin-left"
                    >
                      <div className={`absolute inset-0 bg-gray-600 ${activeModule > index + 1 ? 'bg-brand-green' : ''} transition-colors duration-300`} />
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

            {/* Data Output Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showData ? 1 : 0, y: showData ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="mt-16 bg-brand-purple/5 border border-brand-purple/20 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-4 h-4 text-brand-green" />
                <span className="text-brand-green font-bold text-xs uppercase">AI Analyse Resultaat</span>
              </div>
              <div className="space-y-2">
                {dataFlow.map((item, index) => (
                  <motion.div
                    key={item.from}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: showData ? 1 : 0, x: showData ? 0 : -10 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span className="text-gray-600 w-16">{item.from}:</span>
                    <span className={`font-bold ${item.from === 'actie' ? 'text-brand-green' : 'text-brand-purple'}`}>
                      {item.to}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>

    {/* Loom Video Popup */}
    <FullscreenOverlay isOpen={showVideo} onClose={() => setShowVideo(false)} title="AI Integratie Demo">
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="w-full h-full max-w-[1600px]" style={{ aspectRatio: '16/9' }}>
          <iframe
            src="https://www.loom.com/embed/0fd4a825007a4a1e9d583145e8c04008?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=1"
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </FullscreenOverlay>
    </>
  );
};
