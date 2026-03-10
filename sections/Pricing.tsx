import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, BarChart3, Users, TrendingUp } from 'lucide-react';
import { config } from '../clientConfig';
import { calculatePrice } from '../types';
import { useBusinessCase } from '../BusinessCaseContext';

const fmt = (val: number) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const fullFeatures = [
  '8 uur training per maand',
  'Volledige CRM automation & inrichting',
  'Data dashboards & signalen',
  'Maandelijkse nieuwe automatiseringen',
  'On-site Q1 tweewekelijks',
  'On-site Q2-Q4 maandelijks',
  '12 maanden samenwerking',
];

const liteFeatures = [
  '8 uur training per kwartaal',
  '6 extra CRM automations',
  'Data dashboards & signalen',
  'Maandelijkse nieuwe automatiseringen',
  'Remote support',
  'On-site op aanvraag',
  '12 maanden samenwerking',
];

const marketRates = [
  { service: 'Sales training', market: '€1.500 – €3.000/dag', source: 'Kenneth Smit, Sandler' },
  { service: 'CRM implementatie', market: '€15.000 – €50.000 eenmalig', source: 'HubSpot Partners, Salesforce' },
  { service: 'AI & Automation', market: '€150 – €250/uur', source: 'Consultancy bureaus' },
];

const tiers = [
  { range: '1-3', salesCount: 3, label: '1-3 medewerkers', price: '€3.495' },
  { range: '4-5', salesCount: 5, label: '4-5 medewerkers', price: '€4.495' },
  { range: '6-7', salesCount: 7, label: '6-7 medewerkers', price: '€5.495' },
  { range: '7+', salesCount: 8, label: '7+ medewerkers', price: 'Op maat' },
];

export const Pricing: React.FC = () => {
  const pkg = config.package || 'full';
  const [selectedTier, setSelectedTier] = useState(
    tiers.findIndex(t => t.salesCount >= (config.salesCount || 3)) >= 0
      ? tiers.findIndex(t => t.salesCount >= (config.salesCount || 3))
      : 0
  );
  const activeTier = tiers[selectedTier];
  const price = calculatePrice(pkg, activeTier.salesCount);
  const features = pkg === 'full' ? fullFeatures : liteFeatures;
  const { totals } = useBusinessCase();
  const yearlyInvestment = price * 12;
  const roi = yearlyInvestment > 0 ? totals.total / yearlyInvestment : 0;

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-3 text-center"
        >
          Jouw investering
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black uppercase leading-tight mb-6 text-center text-brand-purple"
        >
          Transparant en <span className="text-brand-green">eerlijk</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: price block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-brand-purple rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="inline-block bg-brand-green/20 rounded-full px-4 py-1 mb-4">
                <span className="text-brand-green font-bold text-xs uppercase">
                  {pkg === 'full' ? 'Full pakket' : 'Lite pakket'}
                </span>
              </div>

              <div className="mb-2">
                <motion.span
                  key={price}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="text-white font-black text-5xl"
                >
                  {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(price)}
                </motion.span>
                <span className="text-white/50 text-lg"> /mnd</span>
              </div>

              <p className="text-white/40 text-xs mb-3">
                Berekend voor {activeTier.label}
              </p>

              {/* Employee tiers - clickable */}
              {pkg === 'full' && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-3.5 h-3.5 text-white/60" />
                    <p className="text-white/60 text-xs font-bold uppercase">Kies teamgrootte</p>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {tiers.map((tier, index) => (
                      <button
                        key={tier.range}
                        onClick={() => setSelectedTier(index)}
                        className={`rounded-lg px-2 py-2 text-center transition-all cursor-pointer ${
                          index === selectedTier
                            ? 'bg-brand-green/20 border border-brand-green/30 scale-105'
                            : 'bg-white/5 border border-white/5 hover:bg-white/10'
                        }`}
                      >
                        <p className={`text-[10px] font-medium ${index === selectedTier ? 'text-brand-green' : 'text-white/40'}`}>
                          {tier.label}
                        </p>
                        <p className={`text-sm font-black ${index === selectedTier ? 'text-brand-green' : 'text-white/70'}`}>
                          {tier.price}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Market comparison */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-3.5 h-3.5 text-white/60" />
                <p className="text-white/60 text-xs font-bold uppercase">Marktprijzen vergelijking</p>
              </div>
              <div className="space-y-1.5">
                {marketRates.map((rate) => (
                  <div key={rate.service} className="flex items-center justify-between">
                    <p className="text-white/50 text-[10px]">{rate.service}</p>
                    <p className="text-white/70 text-[10px] font-bold">{rate.market}</p>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-[9px] mt-2 italic">
                Bronnen: Kenneth Smit, HubSpot Partner Directory, Consultancy.nl
              </p>
            </div>
          </motion.div>

          {/* Right: features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6"
          >
            <p className="text-brand-purple font-black text-lg uppercase mb-5">Wat zit erin</p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-brand-green/10 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-brand-green" />
                  </div>
                  <p className="text-gray-700 text-sm">{feature}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-gray-400 text-xs">
                6 specialisten aan jouw zijde: CRM, Data, AI, Automation, Sales Training & Strategie
              </p>
            </div>
          </motion.div>
        </div>

        {/* ROI comparison bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 bg-white border border-brand-green/20 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="text-brand-purple font-black text-sm uppercase">Return on Investment</p>
                <p className="text-gray-400 text-[10px]">Op basis van jullie business case</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-gray-400 text-[10px] uppercase font-bold">Geschatte impact</p>
                <motion.p key={totals.total} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-brand-green font-black text-xl">{fmt(totals.total)}</motion.p>
                <p className="text-gray-400 text-[9px]">per jaar</p>
              </div>
              <div className="text-gray-300 text-2xl font-light">vs</div>
              <div className="text-center">
                <p className="text-gray-400 text-[10px] uppercase font-bold">Investering</p>
                <motion.p key={yearlyInvestment} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-brand-purple font-black text-xl">{fmt(yearlyInvestment)}</motion.p>
                <p className="text-gray-400 text-[9px]">per jaar</p>
              </div>
              <div className="text-center bg-brand-green/10 border border-brand-green/20 rounded-xl px-4 py-2">
                <motion.p key={roi.toFixed(1)} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-brand-green font-black text-2xl">{roi.toFixed(1)}&times;</motion.p>
                <p className="text-brand-green/70 text-[9px] font-bold uppercase">ROI</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
