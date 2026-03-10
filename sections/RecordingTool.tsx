import React from 'react';
import { motion } from 'framer-motion';
import { Mic, FileText, Brain, TrendingUp, Users } from 'lucide-react';

const features = [
  { icon: Mic, text: 'Automatische gespreksopname vanuit het CRM' },
  { icon: FileText, text: 'AI transcriptie van elk klantgesprek' },
  { icon: Brain, text: 'Slimme samenvattingen en actiepunten' },
  { icon: TrendingUp, text: 'Coaching insights voor rayonmanagers' },
  { icon: Users, text: 'Gedeelde kennisbank voor het hele team' },
];

export const RecordingTool: React.FC = () => {
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
              <span className="text-brand-accent">Gespreksopname</span> tool
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-base md:text-lg leading-relaxed mb-6"
            >
              Elk klantgesprek automatisch vastgelegd, getranscribeerd en samengevat. Zo gaat geen informatie verloren en verbetert elk gesprek het volgende.
            </motion.p>

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
            className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-brand-accent" />
            </div>
            <p className="text-brand-purple font-bold text-lg mb-2">AI Gespreksassistent</p>
            <p className="text-gray-400 text-sm mb-6">Automatisch na elk gesprek</p>
            <div className="space-y-3 text-left">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Samenvatting</p>
                <p className="text-gray-600 text-sm">Klant wil 3 nieuwe productvarianten testen in Q2...</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Actiepunten</p>
                <p className="text-gray-600 text-sm">Sample pakket versturen voor 15 maart</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
