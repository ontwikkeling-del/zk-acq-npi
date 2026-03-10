import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DealsPipeline } from './DealsPipeline';
import { CompanyActivity } from './CompanyActivity';
import { TasksQueue } from './TasksQueue';

const demos = [
  { label: 'Deals Pipeline', component: DealsPipeline },
  { label: 'Bedrijfspagina', component: CompanyActivity },
  { label: 'Taken', component: TasksQueue },
];

export const HubSpotDemoViewer: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="w-full h-full flex flex-col bg-[#f5f8fa]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Demo tab navigation */}
      <div className="flex items-center justify-center gap-2 py-3 bg-white border-b border-[#cbd6e2] shrink-0">
        {demos.map((demo, i) => (
          <button
            key={i}
            onClick={() => setActiveDemo(i)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              i === activeDemo
                ? 'bg-[#0091ae] text-white shadow-md'
                : 'text-[#516f90] hover:text-[#33475b] hover:bg-[#f5f8fa]'
            }`}
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border-2 border-current">
              {i + 1}
            </span>
            {demo.label}
          </button>
        ))}
      </div>

      {/* Active demo */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
