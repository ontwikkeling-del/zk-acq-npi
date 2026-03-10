import React from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '../types';

export const CaseStudyWovar: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-brand-purple">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-brand-green/5 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-green font-bold text-xs uppercase tracking-[0.2em] mb-3 text-center"
        >
          Het Team
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black uppercase leading-tight mb-2 text-center text-white"
        >
          Wat maakt ons{' '}
          <span className="text-brand-green">uniek?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-white/50 text-sm text-center mb-8 max-w-2xl mx-auto"
        >
          Grip op Groei door specialistische kennis
        </motion.p>

        {/* Team grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-xs">{member.name}</p>
                <p className="text-white/40 text-[10px]">{member.role}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-white/60 text-sm italic max-w-xl mx-auto">
            "De combinatie van sales training, CRM-implementatie en AI-automatisering maakt ons uniek in Nederland."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
