import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BarChart3, RefreshCw, Check } from 'lucide-react';
import { config } from '../clientConfig';

const trainingItems = [
  { icon: Users, title: 'Op de werkvloer', text: 'Training naast het team, niet in een zaaltje. Direct toepasbaar in de dagelijkse praktijk.' },
  { icon: BarChart3, title: 'Strategische sessies', text: 'Maandelijkse sessies over commerciële strategie, pipeline reviews en data-analyse.' },
  { icon: RefreshCw, title: 'Continue coaching', text: 'Geen eenmalig project. Doorlopende begeleiding totdat het team zelfstandig werkt.' },
];

const outcomes = [
  'Salesteam dat zelfstandig met dashboards en signalen werkt',
  'Gestructureerde klantgesprekken op basis van data',
  'Geen afhankelijkheid van individuele verkopers',
  'Kennis geborgd in processen, niet in hoofden',
];

export const TrainingDev: React.FC = () => {
  const pkg = config.package || 'full';

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-brand-pink/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-pink font-bold text-sm uppercase tracking-wider mb-3 text-center"
        >
          Wat ons uniek maakt
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black uppercase leading-tight mb-3 text-center text-brand-purple"
        >
          Training en <span className="text-brand-pink">strategie</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-gray-400 text-sm text-center mb-8 max-w-2xl mx-auto"
        >
          Technologie werkt pas als je team het omarmt. Daarom investeren wij evenveel in mensen als in systemen.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: training approach */}
          <div className="space-y-4">
            {trainingItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-brand-pink/10 rounded-full flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-pink" />
                  </div>
                  <div>
                    <p className="text-brand-purple font-black text-sm uppercase mb-1">{item.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: outcomes + trainer photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-brand-purple rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-pink/30 shrink-0">
                  <img
                    src="https://zwartekraai.nl/assets/migilio-tirtosentono-updated-C55K0N-i.jpg"
                    alt="Migilio Tirtosentono: Sales Trainer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Migilio Tirtosentono</p>
                  <p className="text-brand-pink text-xs">Senior Sales Trainer</p>
                </div>
              </div>
              <p className="text-white font-black text-lg uppercase mb-4">Resultaat na 12 maanden</p>
              <div className="space-y-3">
                {outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-green" />
                    </div>
                    <p className="text-white/80 text-sm">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs">
                {pkg === 'full' ? '8 uur training per maand, on site' : '8 uur training per kwartaal, remote en on site'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
