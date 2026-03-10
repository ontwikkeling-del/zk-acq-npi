import React from 'react';
import { motion } from 'framer-motion';
import { Eye, AlertTriangle, TrendingDown, Bell } from 'lucide-react';

export const ProactiveInsight: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-brand-green/3 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
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
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-brand-purple"
            >
              <span className="text-brand-green">Proactief</span> inzicht met slimme technologie
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed"
            >
              Op basis van jullie klantdata detecteert ons algoritme veranderingen in klantgedrag, zoals een daling in bestelbedrag of frequentie. Salesmedewerkers worden direct op de hoogte gesteld.
            </motion.p>
          </div>

          <div className="space-y-4">
            {[
              { icon: TrendingDown, text: 'Daling in bestelbedrag gedetecteerd', color: 'brand-pink' },
              { icon: AlertTriangle, text: 'Verandering in bestelfrequentie', color: 'brand-pink' },
              { icon: Bell, text: 'Automatische taak naar sales', color: 'brand-green' },
              { icon: Eye, text: 'Proactief inspelen op klantbehoeften', color: 'brand-green' },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.12 }}
                className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 bg-${item.color}/20 rounded-full flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-5 h-5 text-${item.color}`} />
                </div>
                <p className="text-gray-700 font-medium text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
