import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertCircle, Phone, Mail } from 'lucide-react';

const signals = [
  { icon: AlertCircle, text: 'Automatisch signaal wanneer klant buiten bestelpatroon valt', color: 'red-500' },
  { icon: Phone, text: 'Beltaak naar accountmanager met klantcontext erbij', color: 'brand-accent' },
  { icon: Mail, text: 'Win-back campagne met gepersonaliseerde aanbieding', color: 'brand-pink' },
  { icon: Bell, text: 'Escalatie als klant na 2 weken niet reageert', color: 'brand-green' },
];

export const SleepingClients: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-red-500/3 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block bg-brand-accent/10 border border-brand-accent/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="text-brand-accent font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Bell className="w-3.5 h-3.5" /> Slapende klanten
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-brand-purple"
            >
              Slapende klanten <span className="text-brand-accent">activeren</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed"
            >
              Klanten die wegdrijven kosten je geld. Wij bouwen automatische signalen zodat je op tijd ingrijpt — voordat de concurrent het doet.
            </motion.p>
          </div>

          <div className="space-y-4">
            {signals.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-brand-accent/30 transition-all"
                >
                  <div className={`w-10 h-10 bg-${item.color}/15 rounded-full flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 text-${item.color}`} />
                  </div>
                  <p className="text-gray-700 font-medium text-sm">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
