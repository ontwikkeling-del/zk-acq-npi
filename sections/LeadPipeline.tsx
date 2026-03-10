import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, MousePointer, Send, Filter, GitBranch, Users } from 'lucide-react';
import { config } from '../clientConfig';
import { resolveTemplate } from '../types';

const sources = [
  { icon: Globe, label: 'Website bezoek', desc: 'Pagina\'s, tijd, formulieren', color: 'brand-green' },
  { icon: Mail, label: 'Email interactie', desc: 'Opens, clicks, replies', color: 'brand-accent' },
  { icon: MousePointer, label: 'Offerteaanvragen', desc: 'Formulier submissions', color: 'brand-pink' },
  { icon: Send, label: 'Campagne respons', desc: 'Mailings en follow-ups', color: 'brand-green' },
];

export const LeadPipeline: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block bg-brand-accent/10 border border-brand-accent/20 rounded-full px-4 py-1.5 mb-3"
        >
          <span className="text-brand-accent font-bold text-xs uppercase tracking-wider">CRM</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-3 text-brand-purple"
        >
          Het begint met <span className="text-brand-green">overzicht</span> en juiste data
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base mb-8 max-w-2xl"
        >
          {resolveTemplate(`Website en mailaanvragen komen automatisch in een pijplijn terecht, gekoppeld aan jullie ${config.hasCRM ? config.crmSystem : 'CRM'}. Op basis van voorwaarden wordt bepaald hoe leads worden verdeeld.`, config)}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: data sources */}
          <div className="space-y-3">
            {sources.map((src, index) => (
              <motion.div
                key={src.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 bg-${src.color}/15 rounded-full flex items-center justify-center shrink-0`}>
                  <src.icon className={`w-5 h-5 text-${src.color}`} />
                </div>
                <div>
                  <p className="text-brand-purple font-bold text-sm">{src.label}</p>
                  <p className="text-gray-400 text-xs">{src.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: pipeline visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              <p className="text-brand-purple font-bold text-sm uppercase">Live pipeline overzicht</p>
            </div>

            {/* Funnel steps */}
            <div className="space-y-2 mb-4">
              {[
                { label: 'Website bezoekers', count: '2.340', width: '100%', color: 'bg-brand-green/15' },
                { label: 'Geidentificeerde leads', count: '186', width: '65%', color: 'bg-brand-accent/15' },
                { label: 'Gekwalificeerd', count: '47', width: '35%', color: 'bg-brand-pink/15' },
                { label: 'In pipeline', count: '23', width: '20%', color: 'bg-brand-green/20' },
              ].map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  style={{ width: step.width, originX: 0 }}
                  className={`${step.color} rounded-lg px-3 py-2 flex items-center justify-between`}
                >
                  <span className="text-gray-600 text-xs font-medium">{step.label}</span>
                  <span className="text-brand-purple font-bold text-xs">{step.count}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
              {[
                { icon: Filter, label: 'Auto-kwalificatie', value: 'Actief' },
                { icon: GitBranch, label: 'Lead verdeling', value: config.leadDistributionLabel },
                { icon: Users, label: 'Toewijzing', value: 'Direct' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-4 h-4 text-brand-green mx-auto mb-1" />
                  <p className="text-brand-purple font-bold text-xs">{stat.value}</p>
                  <p className="text-gray-400 text-[10px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
