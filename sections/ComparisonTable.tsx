import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, MinusCircle, ArrowRight } from 'lucide-react';

const rows = [
  {
    aspect: 'Aanpak',
    zk: 'Data-gedreven strategie + implementatie',
    bureau: 'Adviesrapporten, zelf implementeren',
    zelf: 'Trial & error, ad hoc',
  },
  {
    aspect: 'Doorlooptijd',
    zk: '2-4 weken tot eerste resultaat',
    bureau: '3-6 maanden tot eerste advies',
    zelf: '6-12 maanden, als het lukt',
  },
  {
    aspect: 'CRM implementatie',
    zk: 'Volledig ingericht + adoptie-begeleiding',
    bureau: 'Alleen configuratie, adoptie is jullie probleem',
    zelf: 'Basis-setup zonder strategie',
  },
  {
    aspect: 'AI & Automatisering',
    zk: 'Werkende flows in Make.com + AI-integratie',
    bureau: 'PowerPoint over "AI mogelijkheden"',
    zelf: 'ChatGPT prompts Googlen',
  },
  {
    aspect: 'Sales training',
    zk: 'Praktijk-coaching door ervaren trainers',
    bureau: 'Niet inbegrepen',
    zelf: 'YouTube-video\'s',
  },
  {
    aspect: 'Zorg-expertise',
    zk: 'Specifieke kennis van B2B zorgtoeleveranciers',
    bureau: 'Generieke B2B-kennis',
    zelf: 'Eigen branchekennis, geen best practices',
  },
  {
    aspect: 'Support',
    zk: 'Dedicated team, directe lijnen',
    bureau: 'Ticketsysteem, 48h responstijd',
    zelf: 'Alles zelf uitzoeken',
  },
];

const getIcon = (col: 'zk' | 'bureau' | 'zelf') => {
  switch (col) {
    case 'zk': return <CheckCircle className="w-4 h-4 text-brand-green shrink-0" />;
    case 'bureau': return <MinusCircle className="w-4 h-4 text-orange-400 shrink-0" />;
    case 'zelf': return <XCircle className="w-4 h-4 text-red-400 shrink-0" />;
  }
};

export const ComparisonTable: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(204,255,0,0.05)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-none mb-3">
            Waarom <span className="text-brand-green">Zwarte Kraai?</span>
          </h2>
          <p className="text-gray-600 text-lg">Vergelijk de opties</p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header row */}
          <div className="grid grid-cols-4 gap-0">
            <div className="p-4 bg-gray-50 border-b border-r border-gray-100" />
            <div className="p-4 bg-brand-green/10 border-b border-r border-brand-green/20 text-center">
              <p className="text-brand-green font-black text-sm uppercase">Zwarte Kraai</p>
              <p className="text-gray-600 text-xs">All-in-one partner</p>
            </div>
            <div className="p-4 bg-orange-50 border-b border-r border-orange-100 text-center">
              <p className="text-orange-500 font-black text-sm uppercase">CRM-bureau</p>
              <p className="text-gray-600 text-xs">Typisch adviesbureau</p>
            </div>
            <div className="p-4 bg-red-50 border-b border-gray-100 text-center">
              <p className="text-red-500 font-black text-sm uppercase">Zelf doen</p>
              <p className="text-gray-600 text-xs">Intern oplossen</p>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, index) => (
            <motion.div
              key={row.aspect}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`grid grid-cols-4 gap-0 ${index < rows.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="p-3 border-r border-gray-100 flex items-center">
                <p className="text-brand-purple font-bold text-xs uppercase">{row.aspect}</p>
              </div>
              <div className="p-3 border-r border-gray-100 bg-brand-green/5 flex items-start gap-2">
                {getIcon('zk')}
                <p className="text-gray-700 text-xs leading-relaxed">{row.zk}</p>
              </div>
              <div className="p-3 border-r border-gray-100 flex items-start gap-2">
                {getIcon('bureau')}
                <p className="text-gray-600 text-xs leading-relaxed">{row.bureau}</p>
              </div>
              <div className="p-3 flex items-start gap-2">
                {getIcon('zelf')}
                <p className="text-gray-600 text-xs leading-relaxed">{row.zelf}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
