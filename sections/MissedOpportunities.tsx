import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Users, Clock, TrendingDown } from 'lucide-react';

const impacts = [
  {
    icon: Users,
    stat: '48%',
    text: 'van verkopers doet nooit een follow-up na eerste contact',
    source: 'Invesp Research',
    color: 'text-brand-pink',
  },
  {
    icon: Clock,
    stat: '70%',
    text: 'van de werktijd gaat op aan niet-verkoop taken',
    source: 'Salesforce State of Sales, 2024',
    color: 'text-brand-pink',
  },
  {
    icon: TrendingDown,
    stat: '67%',
    text: 'van klantverloop is voorkoombaar bij tijdig ingrijpen',
    source: 'ThinkJar/Kolsky Research',
    color: 'text-brand-pink',
  },
];

export const MissedOpportunities: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Background accent */}
      <motion.div
        initial={{ y: '-100%' }}
        whileInView={{ y: '0%' }}
        transition={{ duration: 0.8, ease: 'circOut' }}
        className="absolute top-0 right-0 w-full h-[30vh] bg-gradient-to-b from-brand-pink/15 to-transparent z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Big number */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="font-black text-[10rem] md:text-[14rem] leading-none text-transparent bg-clip-text bg-gradient-to-br from-brand-pink to-brand-pink/60"
            >
              <AnimatedCounter end={77} />
            </motion.div>
            <p className="text-xl text-gray-600 font-bold uppercase tracking-widest mt-[-1.5rem] ml-4">
              Van B2B bedrijven
            </p>
            <p className="text-gray-400 text-xs ml-4 mt-1">Accenture B2B CX Study, 2015</p>
          </div>

          {/* Right - Statement + team impact stats */}
          <div className="text-left">
            <motion.h2
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-black leading-tight uppercase"
            >
              Mist <span className="text-brand-pink">omzet</span> door
              <br />
              <span className="text-brand-green">gebrekkige klantervaring</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 text-lg text-gray-600 leading-relaxed max-w-lg mb-6"
            >
              Dit is niet alleen een persoonlijk probleem &mdash; het raakt je hele team en je omzet.
            </motion.p>

            {/* Team impact stats - escalation */}
            <div className="space-y-3">
              {impacts.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.15, duration: 0.4 }}
                  className="flex items-center gap-3 bg-brand-purple/5 border border-brand-purple/10 rounded-lg p-3"
                >
                  <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
                  <div>
                    <span className={`${item.color} font-black text-sm`}>{item.stat}</span>
                    <span className="text-gray-600 text-sm"> {item.text}</span>
                    <p className="text-gray-400 text-[10px] mt-0.5">{item.source}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
