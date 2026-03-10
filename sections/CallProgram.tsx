import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, BarChart3, FileText, Users } from 'lucide-react';

const features = [
  { icon: Phone, text: 'Snel en eenvoudig bellen' },
  { icon: Clock, text: 'Inzicht in gesprekstijd en aantal' },
  { icon: BarChart3, text: 'Gespreksanalyse voor verbetering' },
  { icon: FileText, text: 'Duidelijke klantgeschiedenis en notities' },
  { icon: Users, text: 'Transparante samenwerking met collega\'s' },
];

export const CallProgram: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-brand-purple"
            >
              <span className="text-brand-accent">Belprogramma</span> in klantkaart
            </motion.h2>

            <div className="space-y-3">
              {features.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-brand-accent/20 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-brand-accent" />
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white shadow-sm border border-gray-100 rounded-2xl p-4"
          >
            <img src="https://zwartekraai.nl/assets/data-hub-alerts-DYcxkcUv.png" alt="Belprogramma" className="w-full rounded-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
