import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Building2, Globe, MapPin, DollarSign } from 'lucide-react';

const dataPoints = [
  { icon: Building2, label: 'Branche' },
  { icon: Globe, label: 'Website' },
  { icon: MapPin, label: 'Locatie' },
  { icon: DollarSign, label: 'Omzet' },
];

export const AIEnrichment: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto">
            <Bot className="w-8 h-8 text-brand-green" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-4"
        >
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">AI</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 text-brand-purple"
        >
          AI <span className="text-brand-green">Bedrijfsverrijking</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-6"
        >
          Slim verkopen begint met volledige informatie
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Nieuwe klant of prospect? Binnen seconden weet je alles. Deze AI vult automatisch jullie CRM aan zodat je meteen gericht kunt verkopen.
        </motion.p>

        <div className="flex justify-center gap-4 md:gap-6">
          {dataPoints.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 w-28 md:w-32"
            >
              <item.icon className="w-7 h-7 text-brand-green mx-auto mb-3" />
              <p className="text-gray-600 font-bold text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
