import React from 'react';
import { motion } from 'framer-motion';

const team = [
  { name: 'Erwin Dijkstra', role: 'Founder & CEO', photo: 'https://zwartekraai.nl/assets/erwin-dijkstra-new-CBI4auj_.jpg' },
  { name: 'Dennis Nijborg', role: 'Founder & CTO', photo: 'https://zwartekraai.nl/assets/dennis-nijborg-updated-DwIKalt5.jpg' },
  { name: 'Migilio Tirtosentono', role: 'Senior Sales Professional & Trainer', photo: 'https://zwartekraai.nl/assets/migilio-tirtosentono-updated-C55K0N-i.jpg' },
  { name: 'David Pantophlet', role: 'Head of AI', photo: 'https://zwartekraai.nl/assets/david-pantophlet-updated-fqoY03LJ.jpg' },
  { name: 'Hoger Hamo', role: 'AI Automation Specialist', photo: 'https://zwartekraai.nl/assets/hoger-hamo-JBd-9InU.jpg' },
  { name: 'Danny Hoekstra', role: 'RevOps Specialist', photo: '/foto-danny.jpeg' },
];

export const TeamExpertise: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-2"
        >
          Jullie team
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-black uppercase leading-tight mb-2 text-brand-purple"
        >
          Geen consultants, <span className="text-brand-green">teamleden</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-gray-400 text-sm mb-6 max-w-2xl mx-auto"
        >
          Specialisten die onderdeel worden van jullie team. Technologie werkt pas als je team het omarmt.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-5 mb-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-brand-green/30 mb-2 bg-gray-100">
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-brand-purple font-bold text-xs">{member.name}</p>
              <p className="text-gray-400 text-[10px]">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white shadow-sm border border-brand-green/20 rounded-xl px-6 py-5 max-w-2xl mx-auto"
        >
          <p className="text-gray-600 text-sm md:text-base font-medium italic leading-relaxed">
            "De kracht zit in de <span className="text-brand-green font-bold">combinatie</span>. Technologie werkt pas als je team het <span className="text-brand-green font-bold">omarmt</span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
};
