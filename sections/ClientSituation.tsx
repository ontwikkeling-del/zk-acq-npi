// @personalization: HIGH: bullets = feiten uit B2B vragenlijst/briefing. GEEN aannames, GEEN conclusies. Feiten die vragen oproepen.
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, ShoppingCart, Package, Database, Globe, TrendingDown } from 'lucide-react';

const bullets = [
  { icon: Users, text: '350 unieke klanten (2025)' },
  { icon: ShoppingCart, text: '3.500 orders per jaar, gemiddeld 10 orders per klant' },
  { icon: TrendingDown, text: '130 klanten hebben maar 1 aankoop gedaan (37%)' },
  { icon: Package, text: '3 productlijnen: Folieoplossingen (35%), Tuinbouw (37%), Wateropslag (28%)' },
  { icon: Globe, text: 'Actief in Sri Lanka en Bangkok naast de Nederlandse markt' },
  { icon: Database, text: 'Klantdata staat in Cash ERP. Webshop: 11% van orders, 1% van omzet' },
];

const discussionPoints = [
  {
    label: 'Bestelpatroon',
    value: '37% bestelde 1x',
    detail: '130 van 350 klanten kwamen nooit meer terug. 46% bestelt regelmatig (3+).',
  },
  {
    label: 'Offertedoorlooptijd',
    value: '~3 weken',
    detail: 'Gemiddelde doorlooptijd per offerte op dit moment.',
  },
  {
    label: 'Dewi Agriservice',
    value: '2019 geintegreerd',
    detail: 'Fruitteelt-klanten overgenomen bij overname. Hoe zijn die nu bijgehouden?',
  },
];

export const ClientSituation: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-[45vw] h-full bg-brand-accent/5 skew-x-6 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Facts */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full px-4 py-1.5 mb-6"
            >
              <AlertTriangle className="w-4 h-4 text-brand-accent" />
              <span className="text-brand-accent font-bold text-xs uppercase tracking-wider">Huidige Situatie</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-black uppercase leading-none mb-8"
            >
              NPI BV
              <br />
              <span className="text-brand-accent">in cijfers</span>
            </motion.h2>

            <div className="space-y-4">
              {bullets.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 bg-brand-accent/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-brand-accent" />
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right - Discussion points (all facts) */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-purple font-black text-xs uppercase tracking-wider mb-2"
            >
              Punten om te bespreken
            </motion.p>
            {discussionPoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.15 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-brand-purple font-black text-sm uppercase tracking-wide">{point.label}</p>
                  <span className="bg-brand-accent/10 text-brand-accent font-black text-sm px-3 py-1 rounded-full">{point.value}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{point.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
