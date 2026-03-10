import React from 'react';
import { motion } from 'framer-motion';
import { Shield, UserPlus, ShoppingBag, Clock, TrendingUp, Calculator } from 'lucide-react';
import { useBusinessCase } from '../BusinessCaseContext';

const fmt = (val: number) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const NumberInput: React.FC<{
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  wide?: boolean;
}> = ({ value, onChange, prefix, suffix, step = 1, min = 0, max, wide }) => (
  <div className="inline-flex items-center gap-0.5">
    {prefix && <span className="text-brand-purple/40 text-xs font-bold">{prefix}</span>}
    <input
      type="number"
      value={value}
      onChange={(e) => {
        const v = Number(e.target.value);
        if (!isNaN(v) && v >= (min ?? 0) && (max === undefined || v <= max)) onChange(v);
      }}
      step={step}
      min={min}
      max={max}
      className={`${wide ? 'w-[70px]' : 'w-[56px]'} bg-white border-b-2 border-brand-purple/20 text-brand-purple font-black text-sm text-center py-0.5 rounded-t-md focus:outline-none focus:border-brand-green transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
    />
    {suffix && <span className="text-brand-purple/40 text-xs font-bold">{suffix}</span>}
  </div>
);

interface CategoryProps {
  icon: React.ElementType;
  title: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  rows: Array<{
    label: string;
    inputKey: string;
    prefix?: string;
    suffix?: string;
    step?: number;
    min?: number;
    max?: number;
    wide?: boolean;
  }>;
  formula: string;
  subtotal: number;
  delay: number;
}

const CategoryCard: React.FC<CategoryProps> = ({
  icon: Icon, title, colorClass, bgClass, borderClass, rows, formula, subtotal, delay,
}) => {
  const { inputs, setInput } = useBusinessCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 ${bgClass} rounded-full flex items-center justify-center`}>
          <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
        </div>
        <h3 className={`${colorClass} font-black text-xs uppercase`}>{title}</h3>
      </div>

      <div className="space-y-2 mb-3">
        {rows.map((row) => (
          <div key={row.inputKey} className="flex items-center justify-between gap-2">
            <span className="text-gray-500 text-[11px] leading-tight">{row.label}</span>
            <NumberInput
              value={inputs[row.inputKey as keyof typeof inputs]}
              onChange={(v) => setInput(row.inputKey as keyof typeof inputs, v)}
              prefix={row.prefix}
              suffix={row.suffix}
              step={row.step}
              min={row.min}
              max={row.max}
              wide={row.wide}
            />
          </div>
        ))}
      </div>

      <p className="text-gray-400 text-[9px] italic mb-2">{formula}</p>

      <div className={`${bgClass} ${borderClass} border rounded-xl px-4 py-2.5 flex items-center justify-between`}>
        <span className={`${colorClass} font-black text-xs uppercase`}>Impact /jaar</span>
        <motion.span
          key={subtotal}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`${colorClass} font-black text-xl`}
        >
          {fmt(subtotal)}
        </motion.span>
      </div>
    </motion.div>
  );
};

export const BusinessCase: React.FC = () => {
  const { totals } = useBusinessCase();

  const categories: Omit<CategoryProps, 'delay'>[] = [
    {
      icon: Shield,
      title: 'Klantbehoud',
      colorClass: 'text-brand-green',
      bgClass: 'bg-brand-green/10',
      borderClass: 'border-brand-green/20',
      rows: [
        { label: 'Actieve klanten', inputKey: 'actieveKlanten', step: 50, wide: true },
        { label: 'Gem. jaaromzet/klant', inputKey: 'gemJaaromzet', prefix: '\u20AC', step: 100, wide: true },
        { label: 'Huidig klantverloop', inputKey: 'huidigChurn', suffix: '%', step: 1, max: 50 },
        { label: 'Klantverloop na samenwerking', inputKey: 'verbeterdChurn', suffix: '%', step: 1, max: 50 },
      ],
      formula: 'klanten \u00D7 jaaromzet \u00D7 (huidig% \u2212 nieuw%)',
      subtotal: totals.klantbehoud,
    },
    {
      icon: UserPlus,
      title: 'Nieuwe klanten',
      colorClass: 'text-brand-pink',
      bgClass: 'bg-brand-pink/10',
      borderClass: 'border-brand-pink/20',
      rows: [
        { label: 'Extra nieuwe klanten/jaar', inputKey: 'extraNieuweKlanten', step: 5 },
        { label: 'Gem. eerste jaaromzet', inputKey: 'gemEersteJaaromzet', prefix: '\u20AC', step: 100, wide: true },
      ],
      formula: 'extra klanten \u00D7 eerste jaaromzet',
      subtotal: totals.nieuweKlanten,
    },
    {
      icon: ShoppingBag,
      title: 'Cross- & upsell',
      colorClass: 'text-brand-accent',
      bgClass: 'bg-brand-accent/10',
      borderClass: 'border-brand-accent/20',
      rows: [
        { label: 'Klanten geschikt voor meer', inputKey: 'crossSellKlanten', step: 25, wide: true },
        { label: 'Extra omzet/klant/jaar', inputKey: 'extraOmzetPerKlant', prefix: '\u20AC', step: 50 },
      ],
      formula: 'klanten \u00D7 extra omzet per klant',
      subtotal: totals.crossSell,
    },
    {
      icon: Clock,
      title: 'Tijdsbesparing',
      colorClass: 'text-brand-purple',
      bgClass: 'bg-brand-purple/10',
      borderClass: 'border-brand-purple/20',
      rows: [
        { label: 'Uren/week bespaard', inputKey: 'urenPerWeek', step: 1, max: 80 },
        { label: 'Intern uurtarief', inputKey: 'uurtarief', prefix: '\u20AC', step: 5 },
      ],
      formula: 'uren/week \u00D7 52 weken \u00D7 uurtarief',
      subtotal: totals.efficientie,
    },
  ];

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-[#f8f5ff] flex items-center">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-brand-pink/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-center gap-3 mb-1"
        >
          <div className="inline-flex items-center gap-2 bg-brand-purple/10 border border-brand-purple/20 rounded-full px-4 py-1.5">
            <Calculator className="w-4 h-4 text-brand-purple" />
            <span className="text-brand-purple font-bold text-xs uppercase tracking-wider">Samen invullen</span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-black uppercase leading-tight mb-1 text-brand-purple"
        >
          Jullie <span className="text-brand-green">business case</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-gray-500 text-sm mb-4"
        >
          Vul jullie eigen cijfers in en we rekenen het samen door
        </motion.p>

        {/* 2x2 category grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} {...cat} delay={0.2 + i * 0.08} />
          ))}
        </div>

        {/* Grand total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-brand-purple rounded-2xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-green/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-brand-green" />
            </div>
            <div>
              <p className="text-white font-black text-base uppercase">Geschatte jaarlijkse impact</p>
              <p className="text-white/40 text-xs">Op basis van jullie ingevulde cijfers</p>
            </div>
          </div>
          <motion.p
            key={totals.total}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-brand-green font-black text-3xl md:text-4xl"
          >
            {fmt(totals.total)}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
