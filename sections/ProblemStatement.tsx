import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const painPoints = [
  {
    text: 'Klanten vertrekken zonder dat je het doorhebt',
    detail: 'Zwarte Kraai detecteert dalend bestelgedrag automatisch en stuurt alerts naar je sales team.',
  },
  {
    text: 'Follow-ups worden vergeten of te laat gedaan',
    detail: 'CRM-taken worden automatisch aangemaakt op basis van klantgedrag, niet op basis van geheugen.',
  },
  {
    text: 'Geen inzicht in welke klanten aandacht nodig hebben',
    detail: 'Real-time dashboard toont klant-segmentatie, bestelfrequentie en afwijkingen.',
  },
  {
    text: 'Nieuwe zorginstellingen worden te laat benaderd',
    detail: 'AI monitort de markt en signaleert nieuwe prospects voordat je concurrent dat doet.',
  },
  {
    text: 'Sales team besteedt te veel tijd aan administratie',
    detail: 'Automatisering neemt orderverwerking, rapportage en data-entry over. Meer tijd voor verkopen.',
  },
];

export const ProblemStatement: React.FC = () => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [showDetail, setShowDetail] = useState<number | null>(null);

  const toggleSelect = (index: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(index)) {
      newSelected.delete(index);
      setShowDetail(null);
    } else {
      newSelected.add(index);
      setShowDetail(index);
    }
    setSelected(newSelected);
  };

  const selectedCount = selected.size;

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Red/warm gradient overlay for urgency */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,100,0.08)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Warning icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-6 text-center"
        >
          <AlertTriangle className="w-12 h-12 text-brand-pink mx-auto" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-black uppercase leading-tight text-center mb-3"
        >
          Herken je deze <span className="text-brand-pink">pijnpunten?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-center mb-8"
        >
          Klik op de punten die jullie herkennen
        </motion.p>

        {/* Interactive pain points */}
        <div className="space-y-3 mb-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
            >
              <div
                onClick={() => toggleSelect(index)}
                className={`rounded-xl p-4 cursor-pointer transition-all duration-300 border-2 flex items-center gap-4 ${
                  selected.has(index)
                    ? 'bg-brand-pink/10 border-brand-pink/40 shadow-md'
                    : 'bg-white border-gray-200 hover:border-brand-pink/30 hover:shadow-sm'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  selected.has(index) ? 'bg-brand-pink text-white' : 'bg-gray-100'
                }`}>
                  {selected.has(index) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-gray-400 text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <p className={`text-sm md:text-base font-medium transition-colors ${
                  selected.has(index) ? 'text-brand-purple' : 'text-gray-600'
                }`}>
                  {point.text}
                </p>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {showDetail === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-brand-green/5 border border-brand-green/20 rounded-xl p-4 mt-2 ml-12">
                      <p className="text-brand-green font-bold text-xs uppercase mb-1">Hoe Zwarte Kraai dit oplost:</p>
                      <p className="text-gray-700 text-sm">{point.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Selection summary */}
        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-red-50 border-2 border-red-300 rounded-xl p-5 text-center"
            >
              <p className="text-red-600 font-black text-2xl mb-1">
                {selectedCount}/{painPoints.length} pijnpunten herkend
              </p>
              <p className="text-red-500 text-sm">
                {selectedCount >= 4 ? 'Jullie laten significant potentieel liggen.' :
                 selectedCount >= 2 ? 'Er is ruimte voor verbetering.' :
                 'Elk pijnpunt is een kans om te groeien.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
