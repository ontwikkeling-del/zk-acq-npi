import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, AlertTriangle, TrendingDown, Bell, TrendingUp, Users, Euro, Target, Activity } from 'lucide-react';

const healthMetrics = [
  { label: 'Pipeline Health', value: '87%', trend: '+12%', icon: Activity, color: 'brand-green' },
  { label: 'Actieve Klanten', value: '342', trend: '+8', icon: Users, color: 'brand-accent' },
  { label: 'Maand Omzet', value: '€128K', trend: '+23%', icon: Euro, color: 'brand-green' },
  { label: 'Conversie', value: '34%', trend: '+5%', icon: Target, color: 'brand-pink' },
];

const signals = [
  { icon: TrendingDown, text: 'Klant X bestelt 40% minder dan vorig kwartaal', type: 'Risico', severity: 'brand-pink' },
  { icon: AlertTriangle, text: 'Key account Y heeft al 8 weken niet besteld', type: 'Alert', severity: 'brand-pink' },
  { icon: Bell, text: 'Rayonmanager Jan: 3 klanten toe aan herbestelling', type: 'Kans', severity: 'brand-green' },
  { icon: TrendingUp, text: 'Segment "Horeca" groeit 15% vs vorig kwartaal', type: 'Trend', severity: 'brand-accent' },
];

const barData = [35, 55, 40, 70, 50, 85, 65, 80, 55, 90, 72, 95];
const potentialData = [55, 70, 60, 85, 72, 95, 82, 95, 78, 98, 88, 100];
const barLabels = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

// Build SVG line paths
const currentLinePoints = barData.map((val, i) => {
  const x = (i / (barData.length - 1)) * 100;
  const y = 100 - val;
  return `${x},${y}`;
}).join(' ');

const potentialLinePoints = potentialData.map((val, i) => {
  const x = (i / (potentialData.length - 1)) * 100;
  const y = 100 - val;
  return `${x},${y}`;
}).join(' ');

export const Dashboarding: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-brand-purple">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-1.5 mb-3"
          >
            <BarChart3 className="w-4 h-4 text-brand-green" />
            <span className="text-brand-green font-bold text-xs uppercase tracking-wider">Data Driven</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black uppercase leading-tight mb-2 text-white"
          >
            Zien wat je <span className="text-brand-pink">laat liggen</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-white/40 text-sm"
          >
            Real-time inzicht in potentie, signalen en gemiste kansen
          </motion.p>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-2xl"
        >
          {/* Health metrics row */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {healthMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="bg-white/[0.06] border border-white/10 rounded-xl p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 text-${metric.color}`} />
                    <span className="text-brand-green text-[10px] font-bold">{metric.trend}</span>
                  </div>
                  <p className="text-white font-black text-xl">{metric.value}</p>
                  <p className="text-white/40 text-[10px]">{metric.label}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-5 gap-4">
            {/* Chart area - 3 cols */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="col-span-3 bg-white/[0.04] border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/60 font-bold text-xs uppercase">Omzet vs Potentie</p>
                <div className="flex gap-3 items-center">
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-0.5 bg-brand-green rounded-full" />
                    <span className="text-white/30 text-[10px]">Huidig</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-0.5 bg-brand-pink rounded-full border-t border-dashed border-brand-pink" />
                    <span className="text-white/30 text-[10px]">Potentie</span>
                  </span>
                </div>
              </div>
              <div className="relative h-24 px-1">
                {/* Bars */}
                <div className="flex items-end gap-1.5 h-full">
                  {barData.map((h, i) => (
                    <div key={i} className="flex-1">
                      <div className="w-full bg-brand-green/30 rounded-t-md" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
                {/* Line overlays */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{ overflow: 'visible' }}
                >
                  {/* Current revenue line (solid green) */}
                  <polyline
                    points={currentLinePoints}
                    fill="none"
                    stroke="rgb(91, 214, 117)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Potential line (dashed pink) */}
                  <polyline
                    points={potentialLinePoints}
                    fill="none"
                    stroke="rgb(255, 138, 252)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray="4 3"
                  />
                </svg>
                {/* Gap label */}
                <div className="absolute top-1 right-2 bg-brand-pink/20 border border-brand-pink/30 rounded-md px-2 py-0.5">
                  <p className="text-brand-pink text-[9px] font-bold">↑ Gemiste omzet</p>
                </div>
              </div>
              <div className="flex justify-between px-1 mt-1.5">
                {barLabels.map((label) => (
                  <span key={label} className="text-[8px] text-white/20 flex-1 text-center">{label}</span>
                ))}
              </div>
            </motion.div>

            {/* Signals area - 2 cols */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="col-span-2 bg-white/[0.04] border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-brand-pink rounded-full animate-pulse" />
                <p className="text-white/60 font-bold text-xs uppercase">Wat laat je liggen?</p>
              </div>

              <div className="space-y-2">
                {signals.map((signal, index) => (
                  <motion.div
                    key={signal.text}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.08 }}
                    className={`bg-${signal.severity}/5 border border-${signal.severity}/15 rounded-lg p-2.5 flex items-start gap-2`}
                  >
                    <signal.icon className={`w-3.5 h-3.5 text-${signal.severity} shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-[10px] font-medium leading-snug">{signal.text}</p>
                    </div>
                    <span className={`text-${signal.severity} text-[8px] font-bold uppercase shrink-0`}>{signal.type}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Custom dashboard callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-5 bg-white/[0.06] border border-brand-green/20 rounded-xl p-4 flex items-center gap-4 max-w-2xl mx-auto"
        >
          <div className="w-10 h-10 bg-brand-green/15 rounded-full flex items-center justify-center shrink-0">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <BarChart3 className="w-5 h-5 text-brand-green" />
            </motion.div>
          </div>
          <div>
            <p className="text-white font-bold text-sm">100% op maat gebouwd</p>
            <p className="text-white/40 text-xs">
              Dit dashboard is een voorbeeld. Jullie bepalen wat je wilt zien: wij bouwen het.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
