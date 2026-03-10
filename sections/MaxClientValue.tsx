// @personalization: HIGH: strategies (4x) en description aanpassen per klant. Gebruik echte churn/LTV/upsell data. Geen generieke bullets.
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, ShoppingCart, Heart } from 'lucide-react';

const strategies = [
  { icon: RefreshCw, text: 'Folie-klanten ook tuinbouwmaterialen aanbieden: en andersom', color: 'brand-green' },
  { icon: ShoppingCart, text: 'Wateropslag-klanten kopen ook vijverfolie: logische combo, nu gemist', color: 'brand-accent' },
  { icon: TrendingUp, text: 'Seizoenssignalen: lente is hoogsezoen: wie belt welke klant wanneer?', color: 'brand-pink' },
  { icon: Heart, text: 'Internationale accounts (Sri Lanka, Bangkok) structureel opvolgen via HubSpot', color: 'brand-green' },
];

export const MaxClientValue: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block bg-brand-pink/10 border border-brand-pink/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="text-brand-pink font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Klanten voller maken
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-brand-purple"
            >
              Klanten <span className="text-brand-pink">voller maken</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-base leading-relaxed"
            >
              Jullie klanten kopen vaak maar 1 van de 3 productlijnen. Via data zien we wie ook folie, tuinbouw of wateropslag nodig heeft: en zorgen we dat het verkoopteam op het juiste moment belt.
            </motion.p>
          </div>

          <div className="space-y-4">
            {strategies.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:border-brand-pink/30 transition-all"
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
