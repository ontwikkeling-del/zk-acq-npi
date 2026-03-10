import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Building2, UserCheck, ArrowRight } from 'lucide-react';

export const WebsiteTracker: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">AI</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 text-brand-purple"
        >
          Website <span className="text-brand-green">Lead Tracker</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-6"
        >
          Van anonieme naar geidentificeerde bezoekers
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Deze tool identificeert automatisch welke bedrijven je site bezoeken en koppelt dit aan concrete contactpersonen. De data stroomt direct door naar je CRM.
        </motion.p>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          {[
            { icon: Eye, label: 'Bezoeker', color: 'brand-pink' },
            { icon: Building2, label: 'Bedrijf', color: 'brand-accent' },
            { icon: UserCheck, label: 'Contact', color: 'brand-green' },
          ].map((item, index) => (
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
                <p className="text-gray-600 font-bold text-sm">{item.label}</p>
              </motion.div>
              {index < 2 && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} transition={{ delay: 0.7 + index * 0.2 }}>
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
