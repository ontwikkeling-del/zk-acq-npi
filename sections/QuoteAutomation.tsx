import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Phone, Filter, Bell } from 'lucide-react';
import { config } from '../clientConfig';

const steps = [
  { icon: FileText, label: 'Offerte aanvraag', text: 'Automatisch in zakelijke pijplijn', color: 'brand-green' },
  { icon: Phone, label: 'Inventarisatie', text: 'Beltaak met vaste vragen', color: 'brand-accent' },
  { icon: Filter, label: 'Prioritering', text: 'Op basis van urgentie', color: 'brand-pink' },
  { icon: Bell, label: 'Follow up', text: 'Beltaak en herinneringsmail', color: 'brand-green' },
];

export const QuoteAutomation: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block bg-brand-accent/10 border border-brand-accent/20 rounded-full px-4 py-1.5 mb-3"
        >
          <span className="text-brand-accent font-bold text-xs uppercase tracking-wider">CRM</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 text-brand-purple"
        >
          Offerte <span className="text-brand-green">aanvragen</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-12"
        >
          {config.quoteAutomationSubtitle}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.12 }}
              className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 bg-${step.color}/20 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <step.icon className={`w-6 h-6 text-${step.color}`} />
              </div>
              <p className="text-brand-purple font-bold text-sm mb-1">{step.label}</p>
              <p className="text-gray-400 text-xs">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
