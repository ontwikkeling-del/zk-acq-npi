import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Upload, Mail, Phone } from 'lucide-react';

export const TradeShows: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto">
            <QrCode className="w-8 h-8 text-brand-pink" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-6 text-brand-purple"
        >
          Efficientie op <span className="text-brand-pink">beurzen</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          Scan een QR code op vakbeurzen en importeer prospects direct in het CRM. Versnelt follow ups na elke beurs of evenement.
        </motion.p>

        <div className="flex justify-center gap-4 md:gap-8">
          {[
            { icon: QrCode, label: 'QR Scan' },
            { icon: Upload, label: 'CRM Import' },
            { icon: Mail, label: 'Mail Follow up' },
            { icon: Phone, label: 'Bel Follow up' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.12 }}
              className="flex flex-col items-center"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-purple/5 border border-brand-purple/10 rounded-2xl flex items-center justify-center mb-3">
                <item.icon className="w-7 h-7 text-brand-pink" />
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
