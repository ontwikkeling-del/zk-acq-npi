import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Bell, Eye, Package } from 'lucide-react';

export const QRSample: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block bg-brand-pink/10 border border-brand-pink/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="text-brand-pink font-bold text-xs uppercase tracking-wider">Unieke benadering</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-brand-purple"
            >
              QR Sample <span className="text-brand-pink">Activatie</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed"
            >
              Stuur proefpakketten of samples met impact. Automatisch QR codes genereren die activaties koppelen aan realtime alerts. Je weet precies welke prospect interesse toont en het salesteam krijgt direct een seintje.
            </motion.p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Package, text: 'Fysieke sample verstuurd', color: 'brand-pink' },
              { icon: QrCode, text: 'QR code gescand door prospect', color: 'brand-accent' },
              { icon: Bell, text: 'Realtime alert naar salesteam', color: 'brand-green' },
              { icon: Eye, text: 'Volledige tracking in CRM', color: 'brand-green' },
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
