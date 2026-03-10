import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, Clock, Trophy, User } from 'lucide-react';

const stages = [
  'Eerste Contact',
  'Account Aangemaakt',
  'Offerte',
  'In Contact',
  'Gewonnen',
];

interface Deal {
  id: number;
  name: string;
  amount: number;
  owner: string;
  closeDate: string;
  stageIndex: number;
  targetStage: number;
}

const initialDeals: Deal[] = [
  { id: 1, name: 'Verpleeghuis De Beuken', amount: 12500, owner: 'Erwin D.', closeDate: '15 feb', stageIndex: 0, targetStage: 4 },
  { id: 2, name: 'Zorggroep Westland', amount: 8200, owner: 'Frank V.', closeDate: '22 feb', stageIndex: 0, targetStage: 3 },
  { id: 3, name: 'Apotheek Centrum Delft', amount: 3800, owner: 'Erwin D.', closeDate: '28 feb', stageIndex: 0, targetStage: 2 },
  { id: 4, name: 'Revalidatiecentrum Zuid', amount: 22000, owner: 'Frank V.', closeDate: '10 mrt', stageIndex: 0, targetStage: 4 },
];

const stageColors = [
  'bg-hs-blue/10 border-hs-blue/30',
  'bg-blue-50 border-blue-200',
  'bg-amber-50 border-amber-200',
  'bg-purple-50 border-purple-200',
  'bg-hs-green-light border-hs-green/30',
];

const stageHeaderColors = [
  'text-hs-blue',
  'text-blue-600',
  'text-amber-600',
  'text-purple-600',
  'text-hs-green',
];

function formatCurrency(n: number) {
  return '€' + n.toLocaleString('nl-NL');
}

function AnimatedCounter({ end, duration = 2.5, prefix = '' }: { end: number; duration?: number; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let startTime: number;
    let frame: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / (duration * 1000), 1);
      setCount(Math.round(end * p));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString('nl-NL')}</span>;
}

export const DealsPipeline: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [animStep, setAnimStep] = useState(0);
  const [columnsVisible, setColumnsVisible] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play: reveal columns then move deals
  useEffect(() => {
    // First reveal columns one by one
    if (columnsVisible < stages.length) {
      const t = setTimeout(() => setColumnsVisible(c => c + 1), 600);
      return () => clearTimeout(t);
    }
  }, [columnsVisible]);

  // After columns are visible, start moving deals
  useEffect(() => {
    if (columnsVisible < stages.length) return;
    if (animStep > 0) return; // already started

    const t = setTimeout(() => {
      setAnimStep(1);
    }, 1200);
    return () => clearTimeout(t);
  }, [columnsVisible, animStep]);

  // Progress deals one by one through stages
  useEffect(() => {
    if (animStep === 0) return;

    // Queue of moves: [dealIndex, newStageIndex]
    const moves: [number, number][] = [];
    const dealsCopy = initialDeals.map(d => ({ ...d }));

    // Build the full sequence: deal 1 moves all steps, then deal 2, etc.
    for (const deal of dealsCopy) {
      for (let s = 1; s <= deal.targetStage; s++) {
        moves.push([deal.id, s]);
      }
    }

    let moveIndex = 0;
    timerRef.current = setInterval(() => {
      if (moveIndex >= moves.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }
      const [dealId, newStage] = moves[moveIndex];
      setDeals(prev => prev.map(d =>
        d.id === dealId ? { ...d, stageIndex: newStage } : d
      ));
      moveIndex++;
    }, 1200);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [animStep]);

  // Compute stats
  const totalAmount = deals.reduce((s, d) => s + d.amount, 0);
  const wonAmount = deals.filter(d => d.stageIndex === 4).reduce((s, d) => s + d.amount, 0);
  const openAmount = totalAmount - wonAmount;
  const wonDeals = deals.filter(d => d.stageIndex === 4).length;

  return (
    <section className="h-screen w-screen bg-hs-bg flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="bg-white border-b border-hs-border px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-hs-orange flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-hs-dark">Deals</h1>
            <p className="text-xs text-hs-light">Jouw Bedrijf - Jouw Branche</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-hs-medium">
          <span className="bg-hs-blue-light text-hs-blue px-3 py-1 rounded-full font-semibold text-xs">
            Board weergave
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-white border-b border-hs-border px-8 py-3 flex items-center gap-8 shrink-0">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-hs-light" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-hs-light font-semibold">Totaal</p>
            <p className="text-lg font-bold text-hs-dark">
              <AnimatedCounter end={totalAmount} prefix="€" />
            </p>
          </div>
        </div>
        <div className="w-px h-8 bg-hs-border" />
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-hs-green" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-hs-light font-semibold">Gewonnen</p>
            <p className="text-lg font-bold text-hs-green">
              <AnimatedCounter end={wonAmount} prefix="€" />
            </p>
          </div>
        </div>
        <div className="w-px h-8 bg-hs-border" />
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-hs-orange" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-hs-light font-semibold">Open</p>
            <p className="text-lg font-bold text-hs-orange">
              <AnimatedCounter end={openAmount} prefix="€" />
            </p>
          </div>
        </div>
        <div className="w-px h-8 bg-hs-border" />
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-hs-blue" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-hs-light font-semibold">Deals gewonnen</p>
            <p className="text-lg font-bold text-hs-dark">{wonDeals} / {deals.length}</p>
          </div>
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex-1 px-6 py-5 flex gap-4 overflow-hidden">
        {stages.map((stage, si) => {
          const stageDeals = deals.filter(d => d.stageIndex === si);
          const stageTotal = stageDeals.reduce((s, d) => s + d.amount, 0);

          return (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 30 }}
              animate={si < columnsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: si * 0.12 }}
              className="flex-1 flex flex-col min-w-0"
            >
              {/* Stage header */}
              <div className={`rounded-t-lg border-t-[3px] ${si === 4 ? 'border-hs-green' : si === 0 ? 'border-hs-blue' : si === 1 ? 'border-blue-400' : si === 2 ? 'border-amber-400' : 'border-purple-400'} bg-white px-3 py-2.5 shadow-sm`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-sm ${stageHeaderColors[si]}`}>{stage}</h3>
                  <span className="bg-gray-100 text-hs-medium text-xs font-semibold px-2 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
                <p className="text-[11px] text-hs-light mt-0.5">
                  {formatCurrency(stageTotal)}
                </p>
              </div>

              {/* Cards container */}
              <div className={`flex-1 rounded-b-lg ${stageColors[si]} border border-t-0 p-2 space-y-2 overflow-y-auto`}>
                <AnimatePresence mode="popLayout">
                  {stageDeals.map((deal) => (
                    <motion.div
                      key={deal.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8, x: -30 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        ...(deal.stageIndex === 4 ? {} : {}),
                      }}
                      exit={{ opacity: 0, scale: 0.8, x: 30 }}
                      transition={{ duration: 0.7, type: 'spring', bounce: 0.15 }}
                      className={`bg-white rounded-lg shadow-sm border border-hs-border p-3 cursor-pointer hover:shadow-md transition-shadow ${
                        deal.stageIndex === 4 ? 'animate-won-glow border-hs-green/40' : ''
                      }`}
                    >
                      <p className="font-semibold text-sm text-hs-dark leading-tight">{deal.name}</p>
                      <p className={`text-lg font-bold mt-1 ${deal.stageIndex === 4 ? 'text-hs-green' : 'text-hs-blue'}`}>
                        {formatCurrency(deal.amount)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-hs-light text-[11px]">
                          <User className="w-3 h-3" />
                          {deal.owner}
                        </div>
                        <span className="text-[11px] text-hs-light">{deal.closeDate}</span>
                      </div>
                      {deal.stageIndex === 4 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3, type: 'spring' }}
                          className="mt-2 text-center"
                        >
                          <span className="inline-flex items-center gap-1 bg-hs-green-light text-hs-green text-xs font-bold px-2 py-0.5 rounded-full">
                            <Trophy className="w-3 h-3" /> Gewonnen!
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
