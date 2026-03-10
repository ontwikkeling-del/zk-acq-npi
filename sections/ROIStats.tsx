import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, DollarSign, BarChart3, ShieldCheck, Crosshair, Users, Zap } from 'lucide-react';
import { config } from '../clientConfig';

// Variant: Zonder CRM: focus on CRM value
const statsNoCrm = [
  {
    value: '29%',
    label: 'meer omzet met CRM',
    source: 'Salesforce, State of Sales 2023',
    color: 'brand-green',
    borderColor: '#4ade80',
  },
  {
    value: '65%',
    label: 'van sales-tijd gaat naar niet-verkopen',
    source: 'Salesforce, State of Sales 2022',
    color: 'brand-accent',
    borderColor: '#f59e0b',
  },
  {
    value: '€8,71',
    label: 'return per geïnvesteerde euro in CRM',
    source: 'Nucleus Research, 2014',
    color: 'brand-pink',
    borderColor: '#ec4899',
  },
  {
    value: '28%',
    label: 'meer omzet met gestructureerd salesproces',
    source: 'Harvard Business Review, 2015',
    color: 'brand-green',
    borderColor: '#4ade80',
  },
];

// Variant: Met CRM: focus on optimization & integration
const statsWithCrm = [
  {
    value: '<50%',
    label: 'van CRM-functies wordt daadwerkelijk benut',
    source: 'Gartner, CRM Strategy & Implementation 2023',
    color: 'brand-green',
    borderColor: '#4ade80',
  },
  {
    value: '65%',
    label: 'van sales-tijd gaat naar niet-verkopen',
    source: 'Salesforce, State of Sales 2022',
    color: 'brand-accent',
    borderColor: '#f59e0b',
  },
  {
    value: '41%',
    label: 'hogere omzet per verkoper met geïntegreerde data',
    source: 'Nucleus Research, CRM ROI Report 2023',
    color: 'brand-pink',
    borderColor: '#ec4899',
  },
  {
    value: '28%',
    label: 'meer omzet met gestructureerd salesproces',
    source: 'Harvard Business Review, 2015',
    color: 'brand-green',
    borderColor: '#4ade80',
  },
];

const benefits = [
  { icon: Crosshair, title: 'Grip', desc: 'Altijd weten wat er speelt bij elke klant' },
  { icon: Eye, title: 'Voorspelbaarheid', desc: 'Van gokken naar data-gedreven forecasting' },
  { icon: Users, title: 'Team', desc: 'Iedereen werkt met dezelfde informatie' },
  { icon: ShieldCheck, title: 'Risico', desc: 'Geen omzet meer die door de vingers glipt' },
];

export const ROIStats: React.FC = () => {
  const stats = config.hasCRM ? statsWithCrm : statsNoCrm;

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black uppercase leading-tight mb-8 text-center text-brand-purple"
        >
          De feiten <span className="text-brand-green">op een rij</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: stats */}
          <div className="space-y-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-start gap-4"
                style={{ borderLeft: `4px solid ${stat.borderColor}` }}
              >
                <div>
                  <span className={`text-${stat.color} font-black text-2xl`}>{stat.value}</span>
                  <p className="text-gray-700 text-sm font-medium">{stat.label}</p>
                  <p className="text-gray-400 text-[10px] italic mt-1">{stat.source}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: benefits */}
          <div className="space-y-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-brand-purple font-black text-sm uppercase">{benefit.title}</p>
                    <p className="text-gray-500 text-xs">{benefit.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* No Cure No Pay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-brand-purple rounded-xl p-4 text-center"
            >
              <Zap className="w-6 h-6 text-brand-green mx-auto mb-2" />
              <p className="text-white font-black text-sm uppercase">No Cure No Pay</p>
              <p className="text-white/60 text-xs">Geen resultaat? Dan geen factuur.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
