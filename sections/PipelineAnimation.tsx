import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2 } from 'lucide-react';

const phases = [
  { label: 'Prospect', color: '#a855f7' },
  { label: 'In contact', color: '#8b5cf6' },
  { label: 'Inventarisatie', color: '#f59e0b' },
  { label: 'Voorstel', color: '#3b82f6' },
  { label: 'Gewonnen', color: '#22c55e' },
  { label: 'Verloren', color: '#ef4444' },
];

const deal = {
  name: 'Fysiotherapie Van Dijk',
  amount: '€ 1.800/jaar',
};

export const PipelineAnimation: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // Move deal through phases 0-4 (Prospect → Gewonnen), skip Verloren
  useEffect(() => {
    if (!isRunning) return;
    if (currentPhase >= 4) {
      // Pause at Gewonnen, then restart
      const timeout = setTimeout(() => {
        setCurrentPhase(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setCurrentPhase(prev => prev + 1);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [currentPhase, isRunning]);

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-purple/3 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-brand-purple/10 border border-brand-purple/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-brand-purple font-bold text-xs uppercase tracking-wider">HubSpot Pipeline</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight text-brand-purple">
            Elke deal <span className="text-brand-green">altijd in beeld</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2">Accountmanagers zien in één oogopslag waar elke prospect staat</p>
        </motion.div>

        {/* Kanban board */}
        <div className="grid grid-cols-6 gap-2 md:gap-3">
          {phases.map((phase, index) => {
            const isActive = currentPhase === index;
            const isPast = currentPhase > index && index < 5;
            const dealCount = index === 0 ? 3 : index === 1 ? 2 : index === 2 ? 1 : index === 4 ? 2 : 0;

            return (
              <motion.div
                key={phase.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="flex flex-col"
              >
                {/* Column header */}
                <div
                  className="rounded-t-lg px-2 py-2 text-center border-b-2"
                  style={{ borderBottomColor: phase.color, backgroundColor: `${phase.color}10` }}
                >
                  <p className="font-bold text-xs uppercase tracking-wide" style={{ color: phase.color }}>
                    {phase.label}
                  </p>
                  <p className="text-gray-400 text-[10px]">
                    {isActive ? dealCount + 1 : dealCount} {dealCount + (isActive ? 1 : 0) === 1 ? 'deal' : 'deals'}
                  </p>
                </div>

                {/* Column body */}
                <div className="bg-gray-50 border border-gray-100 rounded-b-lg p-2 min-h-[200px] flex flex-col gap-2">
                  {/* Static placeholder deals */}
                  {Array.from({ length: dealCount }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg border border-gray-100 p-2 shadow-sm"
                    >
                      <div className="w-full h-2 bg-gray-100 rounded mb-1.5" />
                      <div className="w-2/3 h-2 bg-gray-100 rounded" />
                    </div>
                  ))}

                  {/* The moving deal card */}
                  <AnimatePresence mode="popLayout">
                    {isActive && (
                      <motion.div
                        key={`deal-${currentPhase}`}
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="bg-white rounded-lg border-2 p-2.5 shadow-md"
                        style={{ borderColor: phase.color }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Building2 className="w-3 h-3" style={{ color: phase.color }} />
                          <p className="text-brand-purple font-bold text-[10px] leading-tight truncate">{deal.name}</p>
                        </div>
                        <p className="font-bold text-xs" style={{ color: phase.color }}>{deal.amount}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Won indicator */}
                  {index === 4 && currentPhase === 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="text-center mt-1"
                    >
                      <span className="text-green-500 text-lg">&#10003;</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-2"
        >
          {phases.slice(0, 5).map((phase, index) => (
            <React.Fragment key={phase.label}>
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  currentPhase === index ? 'scale-125' : currentPhase > index ? 'opacity-40' : 'opacity-20'
                }`}
                style={{ backgroundColor: phase.color }}
              />
              {index < 4 && <div className="w-6 h-0.5 bg-gray-200" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
