import React from 'react';
import { motion } from 'framer-motion';
import { Mic, FileText, DatabaseZap, ArrowRight, Clock } from 'lucide-react';

const steps = [
  { icon: Mic, label: 'Inspreken', desc: 'Na een klantbezoek spreek je je notities in via de app', color: 'brand-green' },
  { icon: FileText, label: 'Transcriptie', desc: 'AI zet spraak om naar tekst met structuur en actiepunten', color: 'brand-accent' },
  { icon: DatabaseZap, label: 'In CRM', desc: 'Samenvatting verschijnt automatisch op de juiste klantkaart', color: 'brand-pink' },
];

export const AudioBuitendienst: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="text-brand-green font-bold text-xs uppercase tracking-wider">Buitendienst</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black uppercase leading-tight mb-4 text-brand-purple"
        >
          Audio <span className="text-brand-green">Buitendienst</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Geen administratie meer na een lang klantbezoek. Spreek je notities in, en de rest gaat automatisch: transcriptie, samenvatting en opslaan op de juiste klantkaart in het CRM.
        </motion.p>

        {/* Visual flow */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
          {steps.map((item, index) => (
            <React.Fragment key={item.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
                className="flex flex-col items-center"
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 bg-${item.color}/10 border-2 border-${item.color}/30 rounded-2xl flex items-center justify-center mb-3`}>
                  <item.icon className={`w-10 h-10 text-${item.color}`} />
                </div>
                <p className="text-brand-purple font-bold text-sm">{item.label}</p>
                <p className="text-gray-400 text-xs max-w-[120px]">{item.desc}</p>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} transition={{ delay: 0.7 + index * 0.2 }}>
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Benefit callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="inline-flex items-center gap-3 bg-brand-green/5 border border-brand-green/20 rounded-xl px-6 py-3"
        >
          <Clock className="w-5 h-5 text-brand-green" />
          <p className="text-gray-700 text-sm"><span className="font-bold text-brand-green">30 min/dag bespaard</span> — geen notities meer uitwerken na klantbezoeken</p>
        </motion.div>
      </div>
    </section>
  );
};
