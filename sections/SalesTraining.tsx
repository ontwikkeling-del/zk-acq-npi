import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp, Target } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';

export const SalesTraining: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      {/* Background */}
      <motion.div
        initial={{ x: '100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 right-0 w-[60vw] h-full bg-brand-pink/5 -skew-x-12 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Stats + Statement */}
          <div>
            {/* Migilio avatar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-pink">
                <img
                  src="https://zwartekraai.nl/assets/migilio-tirtosentono-updated-C55K0N-i.jpg"
                  alt="Migilio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-brand-purple font-black text-lg">Migilio Tirtosentono</p>
                <p className="text-brand-pink text-sm font-bold">o.a. Sales Manager Nederland Disaronno</p>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-black uppercase leading-none mb-6"
            >
              <span className="text-brand-pink">100%</span> van MKB
              <br />
              kan conversie en marges
              <br />
              <span className="text-brand-green">verhogen</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Door goede sales training. Praktisch, hands-on, en direct toepasbaar in het dagelijks werk.
            </motion.p>
          </div>

          {/* Right - Big stat + visual */}
          <div className="flex flex-col items-center">
            {/* 90% stat */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="bg-white rounded-2xl p-8 shadow-xl text-center mb-8 w-full max-w-sm"
            >
              <div className="font-black text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-brand-pink to-brand-pink/60 mb-2">
                <AnimatedCounter end={70} />
              </div>
              <p className="text-brand-purple font-bold text-lg uppercase">Van de werktijd</p>
              <p className="text-gray-600 text-sm mt-2">gaat op aan niet-verkopen taken</p>
              <p className="text-gray-400 text-[10px] mt-1">Salesforce State of Sales, 2024</p>
            </motion.div>

            {/* Training benefits */}
            <div className="space-y-3 w-full max-w-sm">
              {[
                { icon: GraduationCap, text: 'Gesprekstechnieken & scripts' },
                { icon: TrendingUp, text: 'Conversie optimalisatie' },
                { icon: Target, text: 'Proactief klantbeheer' },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 bg-brand-purple/5 border border-brand-purple/20 rounded-lg p-3"
                >
                  <item.icon className="w-5 h-5 text-brand-pink shrink-0" />
                  <span className="text-gray-600 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
