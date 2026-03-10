import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Bot, GraduationCap, BarChart3 } from 'lucide-react';

const pillars = [
  {
    icon: Database,
    title: 'CRM',
    subtitle: 'Danny & Erwin',
    description: 'Data omzetten naar signalen. Taken op basis van klantgedrag. Proactief klantbeheer.',
    color: 'bg-brand-green',
  },
  {
    icon: Bot,
    title: 'AI & Automatisering',
    subtitle: 'Dennis & David',
    description: 'Orderverwerking automatiseren. Lead verrijking. Slimme notificaties en triggers.',
    color: 'bg-brand-pink',
  },
  {
    icon: GraduationCap,
    title: 'Sales Training',
    subtitle: 'Migilio',
    description: 'Gesprekstechnieken. Conversie optimalisatie. Proactief klantbeheer aanleren.',
    color: 'bg-brand-green',
  },
  {
    icon: BarChart3,
    title: 'Data',
    subtitle: 'David',
    description: 'Data inzichtelijk maken. Analyseren wat er uit te halen valt. Dashboard en rapportages.',
    color: 'bg-brand-pink',
  },
];

const team = [
  { name: 'Erwin', role: 'CEO', image: 'https://zwartekraai.nl/assets/erwin-dijkstra-new-CBI4auj_.jpg' },
  { name: 'Dennis', role: 'CTO', image: 'https://zwartekraai.nl/assets/dennis-nijborg-updated-DwIKalt5.jpg' },
  { name: 'Hoger', role: 'Tech Lead', image: 'https://zwartekraai.nl/assets/hoger-hamo-JBd-9InU.jpg' },
  { name: 'Migilio', role: 'Sales Trainer', image: 'https://zwartekraai.nl/assets/migilio-tirtosentono-updated-C55K0N-i.jpg' },
  { name: 'David', role: 'Head of AI', image: 'https://zwartekraai.nl/assets/david-pantophlet-updated-fqoY03LJ.jpg' },
  { name: 'Danny', role: 'CRM Consultant', image: '/foto-danny.jpeg' },
];

export const SolutionOverview: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      {/* Background shape */}
      <motion.div
        initial={{ x: '100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute top-0 right-0 w-[60vw] h-full bg-white/[0.02] -skew-x-12 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-2">
            <span className="text-brand-green">Zwarte Kraai</span>
          </h2>
          <p className="text-lg text-gray-600">Klik op een pijler om meer te leren</p>
        </motion.div>

        {/* 4 Pillars with progressive disclosure */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {pillars.map((pillar, index) => {
            const isActive = activePillar === index;
            const isDimmed = activePillar !== null && !isActive;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.12, duration: 0.6 }}
                onClick={() => setActivePillar(isActive ? null : index)}
                className={`bg-white rounded-xl p-5 text-center shadow-xl cursor-pointer transition-all duration-500 ${
                  isActive ? 'scale-105 ring-2 ring-brand-green ring-offset-2' : ''
                } ${isDimmed ? 'opacity-40 scale-95' : 'hover:scale-105'}`}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className={`${pillar.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 transition-all ${
                    isDimmed ? 'grayscale' : ''
                  }`}
                >
                  <pillar.icon className="w-6 h-6 text-black" />
                </motion.div>
                <h3 className="text-brand-purple font-black text-lg mb-1">{pillar.title}</h3>
                <p className="text-gray-600 text-xs font-bold mb-2">{pillar.subtitle}</p>

                {/* Description - progressive disclosure */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 text-xs leading-relaxed pt-2 border-t border-gray-100 mt-1">
                    {pillar.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Team Faces */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center items-center gap-4"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
              className="text-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 border-brand-green/50 mx-auto mb-2 hover:border-brand-green transition-colors">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-brand-purple font-bold text-xs">{member.name}</p>
              <p className="text-gray-600 text-xs">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
