import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Target, Users, TrendingUp, Repeat } from 'lucide-react';

const loopSteps = [
  {
    icon: Users,
    title: 'Sales sluit deals',
    description: 'Accountmanagers werken leads, sluiten deals, loggen resultaten in HubSpot',
    color: 'brand-green',
  },
  {
    icon: BarChart3,
    title: 'Data wordt geanalyseerd',
    description: 'Welke leads converteren? Welke branche, omvang, bron levert het meeste op?',
    color: 'brand-accent',
  },
  {
    icon: Target,
    title: 'Marketing wordt bijgestuurd',
    description: 'Campagnes, targeting en lead scoring worden automatisch geoptimaliseerd op basis van echte salesdata',
    color: 'brand-pink',
  },
  {
    icon: TrendingUp,
    title: 'Betere leads komen binnen',
    description: 'Hogere kwaliteit leads, betere match met ideaal klantprofiel, hogere conversie',
    color: 'brand-green',
  },
];

export const MarketingSales: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 bg-brand-pink/10 border border-brand-pink/20 rounded-full px-4 py-1.5 mb-4"
          >
            <Repeat className="w-4 h-4 text-brand-pink" />
            <span className="text-brand-pink font-bold text-xs uppercase tracking-wider">Closed-Loop Feedback</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black uppercase leading-tight mb-3 text-brand-purple"
          >
            Marketing <span className="text-brand-pink">&times;</span> Sales
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base max-w-2xl mx-auto"
          >
            Sales resultaten uit HubSpot worden teruggeschoten naar marketing. Het algoritme leert welke leads converteren en stuurt campagnes automatisch bij.
          </motion.p>
        </div>

        {/* Feedback loop visual */}
        <div className="grid md:grid-cols-4 gap-4">
          {loopSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="relative"
              >
                <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 h-full">
                  <div className={`w-10 h-10 bg-${step.color}/10 rounded-full flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 text-${step.color}`} />
                  </div>
                  <p className="text-brand-purple font-bold text-sm mb-2">{step.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow between cards */}
                {index < loopSteps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-brand-purple/30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Loop-back arrow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex items-center justify-center mt-5 gap-3"
        >
          <Repeat className="w-5 h-5 text-brand-purple/40" />
          <p className="text-brand-purple/60 font-bold text-sm">
            Continue loop — elke deal maakt de volgende campagne slimmer
          </p>
        </motion.div>
      </div>
    </section>
  );
};
