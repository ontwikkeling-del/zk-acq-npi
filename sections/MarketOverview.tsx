// @personalization: HIGH: 4 stat-kaarten (marktcijfers + bron), segmenttabel (klant's eigen klanttypen), bronvermelding onderaan.
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Building2, Users, Globe, Euro } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';

const marketStats = [
  { icon: Building2, value: 18000, suffix: '+', label: 'Hoveniersbedrijven NL', source: 'CBS 2024', color: 'brand-green' },
  { icon: Users, value: 9000, suffix: '+', label: 'Tuinbouwbedrijven NL', source: 'CBS 2024', color: 'brand-accent' },
  { icon: Globe, value: 20, suffix: '+', label: 'Exportlanden actief', source: 'NPI intern', color: 'brand-pink' },
  { icon: Euro, value: 180, suffix: 'M+', label: 'Agri-folie markt NL', source: 'Eurostat 2024', color: 'brand-purple' },
];

const segments = [
  { name: 'Hoveniers & Tuinarchitecten', count: '~8.000–10.000', frequency: 'Seizoensgebonden', potential: 'Hoog', barWidth: '70%' },
  { name: 'Kwekerijen & Glastuinbouw', count: '~3.000–4.000', frequency: 'Structureel', potential: 'Hoog', barWidth: '75%' },
  { name: 'Vijver & Wateropslag spec.', count: '~1.500–2.500', frequency: 'Hoogfrequent', potential: 'Zeer hoog', barWidth: '90%' },
  { name: 'Agrarische bedrijven', count: '~5.000+', frequency: 'Bulkafname', potential: 'Midden', barWidth: '50%' },
  { name: 'Internationale distributeurs', count: '~200–500', frequency: 'Grote orders', potential: 'Premium', barWidth: '85%' },
];

export const MarketOverview: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-white flex items-center">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-brand-purple/3 rounded-full z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 bg-brand-purple/5 border border-brand-purple/10 rounded-full px-4 py-1.5 mb-4"
          >
            <TrendingUp className="w-4 h-4 text-brand-purple" />
            <span className="text-brand-purple font-bold text-xs uppercase tracking-wider">De Markt</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black uppercase leading-none"
          >
            Tuinbouw & Agri <span className="text-brand-green">in Nederland</span>
          </motion.h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {marketStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center"
              >
                <div className={`w-10 h-10 bg-${stat.color}/10 rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <p className={`text-${stat.color} font-black text-2xl md:text-3xl`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={0} />
                </p>
                <p className="text-gray-600 font-medium text-xs mt-1">{stat.label}</p>
                <p className="text-gray-400 text-[10px]">{stat.source}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Segment table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-50 border border-gray-100 rounded-2xl p-5"
        >
          <p className="text-brand-purple font-black text-sm uppercase tracking-wider mb-4">
            Segmentatie: waar zit het potentieel?
          </p>

          <div className="space-y-3">
            {segments.map((seg, index) => (
              <motion.div
                key={seg.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.08 }}
                className="flex items-center gap-4"
              >
                <div className="w-[220px] shrink-0">
                  <p className="text-gray-700 text-sm font-medium truncate">{seg.name}</p>
                </div>
                <div className="w-[100px] shrink-0 text-right">
                  <p className="text-gray-500 text-xs">{seg.count}</p>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: seg.barWidth }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                    className="h-full bg-brand-green rounded-full"
                  />
                </div>
                <div className="w-[80px] shrink-0">
                  <p className="text-brand-green text-xs font-bold">{seg.potential}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-400 text-[10px] mt-4 text-right">Bron: CBS Landbouwtelling 2024, Eurostat, NPI intern</p>
        </motion.div>
      </div>
    </section>
  );
};
