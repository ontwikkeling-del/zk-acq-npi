import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, MessageSquare } from 'lucide-react';

export const TrainingPillar: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-white flex items-center">
      <motion.div
        initial={{ x: '100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 right-0 w-[60vw] h-full bg-brand-pink/5 -skew-x-12 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-flex items-center gap-3 bg-brand-pink/10 border-2 border-brand-pink/30 rounded-full px-6 py-3 mb-6"
            >
              <GraduationCap className="w-6 h-6 text-brand-pink" />
              <span className="text-brand-pink font-black text-lg uppercase tracking-wider">Pijler 3: Training</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-black uppercase leading-none mb-6"
            >
              Zonder <span className="text-brand-pink">adoptie</span>
              <br />
              net zo goed
              <br />
              <span className="text-brand-green">niet doen</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-lg leading-relaxed mb-4"
            >
              Veel partijen leveren een CRM, zeggen "succes ermee" en dat is het. Resultaat: niemand gebruikt het. Wij blijven erbij tot het team het écht omarmt.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-base leading-relaxed mb-6"
            >
              Maar... hoe voer je een kwalitatief sales gesprek? De juiste technieken zorgen voor hogere conversie in minder tijd.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-brand-pink mt-1 shrink-0" />
                <p className="text-gray-600"><strong className="text-brand-purple">Sales:</strong> intensieve begeleiding, conversie verhogen</p>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-brand-pink mt-1 shrink-0" />
                <p className="text-gray-600"><strong className="text-brand-purple">CRM:</strong> Haal het maximale uit het systeem</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Training photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-brand-pink/10">
              <img
                src="/training-foto.png"
                alt="Training sessie"
                className="w-full h-auto max-h-[60vh] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
