import React from 'react';
import { motion } from 'framer-motion';
import { Database, RefreshCw, BarChart3, Brain, Bell, Users, Mail, Target, ShoppingCart, Megaphone, TrendingUp } from 'lucide-react';

interface FlowModuleConfig {
  label: string;
  icon: React.FC<{ className?: string }>;
  bgClass: string;
  borderClass: string;
  iconClass: string;
}

const FASE_FLOWS: FlowModuleConfig[][] = [
  // Fase 1: Fundament — data sync flow
  [
    { label: 'ERP / Excel', icon: Database, bgClass: 'bg-gray-50', borderClass: 'border-gray-300', iconClass: 'text-gray-500' },
    { label: 'Data Sync', icon: RefreshCw, bgClass: 'bg-white', borderClass: 'border-brand-accent', iconClass: 'text-brand-accent' },
    { label: 'CRM', icon: Database, bgClass: 'bg-white', borderClass: 'border-brand-green', iconClass: 'text-brand-green' },
    { label: 'Dashboard', icon: BarChart3, bgClass: 'bg-white', borderClass: 'border-brand-purple', iconClass: 'text-brand-purple' },
  ],
  // Fase 2: Versnelling — AI churn-detectie flow
  [
    { label: 'Orderdata', icon: ShoppingCart, bgClass: 'bg-white', borderClass: 'border-brand-accent', iconClass: 'text-brand-accent' },
    { label: 'AI Analyse', icon: Brain, bgClass: 'bg-white', borderClass: 'border-cyan-400', iconClass: 'text-cyan-500' },
    { label: 'Signaal', icon: Bell, bgClass: 'bg-white', borderClass: 'border-amber-400', iconClass: 'text-amber-500' },
    { label: 'Sales Actie', icon: Target, bgClass: 'bg-white', borderClass: 'border-brand-green', iconClass: 'text-brand-green' },
  ],
  // Fase 3: Campagnes — campaign automation flow
  [
    { label: 'Segmentatie', icon: Users, bgClass: 'bg-white', borderClass: 'border-brand-purple', iconClass: 'text-brand-purple' },
    { label: 'Campagne', icon: Megaphone, bgClass: 'bg-white', borderClass: 'border-brand-accent', iconClass: 'text-brand-accent' },
    { label: 'E-mail', icon: Mail, bgClass: 'bg-white', borderClass: 'border-cyan-400', iconClass: 'text-cyan-500' },
    { label: 'Conversie', icon: TrendingUp, bgClass: 'bg-white', borderClass: 'border-brand-green', iconClass: 'text-brand-green' },
  ],
  // Fase 4: Strategisch — management reporting flow
  [
    { label: 'Alle Data', icon: Database, bgClass: 'bg-gray-50', borderClass: 'border-gray-300', iconClass: 'text-gray-500' },
    { label: 'AI Reports', icon: Brain, bgClass: 'bg-white', borderClass: 'border-cyan-400', iconClass: 'text-cyan-500' },
    { label: 'Dashboard', icon: BarChart3, bgClass: 'bg-white', borderClass: 'border-brand-purple', iconClass: 'text-brand-purple' },
    { label: 'Management', icon: Target, bgClass: 'bg-white', borderClass: 'border-brand-green', iconClass: 'text-brand-green' },
  ],
];

// Dot stop positions (center of each of the 4 grid columns)
const STOPS = ['12.5%', '37.5%', '62.5%', '87.5%'];

export const MakeFlow: React.FC<{ faseIndex: number }> = ({ faseIndex }) => {
  const modules = FASE_FLOWS[faseIndex] || FASE_FLOWS[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="relative py-3"
    >
      {/* Connecting line */}
      <div className="absolute top-[27px] left-[12.5%] right-[12.5%] h-[2px] bg-gray-200 z-0" />

      {/* Animated data packet (dot with glow) */}
      <motion.div
        className="absolute z-20"
        style={{ top: '23px' }}
        animate={{
          left: [
            STOPS[0], STOPS[0],  // arrive + pause at module 1
            STOPS[1], STOPS[1],  // travel + pause at module 2
            STOPS[2], STOPS[2],  // travel + pause at module 3
            STOPS[3], STOPS[3],  // travel + pause at module 4
          ],
          scale: [0, 1, 1, 1.3, 1, 1.3, 1, 0],
          opacity: [0, 1, 1, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.05, 0.22, 0.28, 0.47, 0.53, 0.72, 1],
          ease: 'easeInOut',
        }}
      >
        {/* Glow layer */}
        <div className="w-4 h-4 -ml-2 -mt-0.5 rounded-full bg-brand-green/20 blur-sm absolute" />
        {/* Core dot */}
        <div className="w-2.5 h-2.5 -ml-[5px] rounded-full bg-brand-green shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
      </motion.div>

      {/* Modules */}
      <div className="grid grid-cols-4 relative z-10">
        {modules.map((mod, i) => {
          const Icon = mod.icon;
          return (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full ${mod.bgClass} border-2 ${mod.borderClass} flex items-center justify-center shadow-sm`}>
                <Icon className={`w-4.5 h-4.5 ${mod.iconClass}`} />
              </div>
              <span className="text-[9px] text-gray-400 mt-1.5 text-center font-medium leading-tight">{mod.label}</span>
            </div>
          );
        })}
      </div>

      {/* Small arrows on the line between modules */}
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="absolute z-[5]"
          style={{ top: '24px', left: `${25 + i * 25}%`, transform: 'translateX(-50%)' }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-gray-300">
            <path d="M1 1 L5 4 L1 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ))}
    </motion.div>
  );
};
