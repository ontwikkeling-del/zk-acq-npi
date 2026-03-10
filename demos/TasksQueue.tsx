import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ListTodo, Filter, Clock, Building2, User, ChevronDown } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  queue: string;
  queueColor: string;
  company: string;
  contact: string;
  dueDate: string;
  dueDateColor: string;
  amount?: string;
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Bel nieuw prospect - websitebezoek gisteren',
    queue: 'Nieuwe leads',
    queueColor: 'bg-hs-green-light text-hs-green',
    company: 'Verpleeghuis De Beuken',
    contact: 'Gerda Vermeer',
    dueDate: 'Vandaag',
    dueDateColor: 'text-hs-red',
  },
  {
    id: 2,
    title: 'Offerte follow-up - 3 dagen geen reactie',
    queue: 'Opvolging',
    queueColor: 'bg-hs-orange-light text-hs-orange',
    company: 'Apotheek Centrum Delft',
    contact: 'Mark Bakker',
    dueDate: 'Vandaag',
    dueDateColor: 'text-hs-red',
    amount: '€4.689',
  },
  {
    id: 3,
    title: 'Welkomstgesprek inplannen - nieuw account',
    queue: 'Onboarding',
    queueColor: 'bg-purple-50 text-purple-600',
    company: 'Zorggroep Westland',
    contact: 'Anne de Vries',
    dueDate: 'Morgen',
    dueDateColor: 'text-hs-orange',
    amount: '€8.200',
  },
  {
    id: 4,
    title: 'Heractivatie bellen - 6 maanden geen order',
    queue: 'Slapende klanten',
    queueColor: 'bg-hs-yellow-light text-hs-yellow',
    company: 'Huisartsenpraktijk Noord',
    contact: 'Jan Pietersen',
    dueDate: 'Morgen',
    dueDateColor: 'text-hs-orange',
  },
  {
    id: 5,
    title: 'Cross-sell voorstel sturen - Wondverzorging',
    queue: 'Upsell',
    queueColor: 'bg-hs-blue-light text-hs-blue',
    company: 'Revalidatiecentrum Zuid',
    contact: 'Lisa Hendriks',
    dueDate: 'Deze week',
    dueDateColor: 'text-hs-medium',
    amount: '€3.450',
  },
  {
    id: 6,
    title: 'Jaarcontract verlenging bespreken',
    queue: 'Opvolging',
    queueColor: 'bg-hs-orange-light text-hs-orange',
    company: 'Tandartspraktijk Oost',
    contact: 'Sandra Mulder',
    dueDate: 'Deze week',
    dueDateColor: 'text-hs-medium',
    amount: '€12.500',
  },
  {
    id: 7,
    title: 'Demo inplannen - interesse via beurs',
    queue: 'Nieuwe leads',
    queueColor: 'bg-hs-green-light text-hs-green',
    company: 'Ziekenhuis Midden',
    contact: 'Robert Visser',
    dueDate: 'Deze week',
    dueDateColor: 'text-hs-medium',
  },
];

export const TasksQueue: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  // Auto-reveal tasks
  useEffect(() => {
    if (visibleCount >= tasks.length) return;
    const delay = visibleCount === 0 ? 1000 : 1500;
    const t = setTimeout(() => setVisibleCount(c => c + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount]);

  const toggleCheck = (id: number) => {
    setCheckedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completedCount = checkedIds.size;

  return (
    <section className="h-screen w-screen bg-hs-bg flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="bg-white border-b border-hs-border px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-hs-blue flex items-center justify-center">
            <ListTodo className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-hs-dark">Taken</h1>
            <p className="text-xs text-hs-light">Alle openstaande taken - Jouw Bedrijf</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.span
            key={visibleCount}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="bg-hs-blue-light text-hs-blue px-3 py-1 rounded-full font-bold text-sm"
          >
            {visibleCount} van {tasks.length} taken
          </motion.span>
          {completedCount > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-hs-green-light text-hs-green px-3 py-1 rounded-full font-bold text-sm"
            >
              {completedCount} afgerond
            </motion.span>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border-b border-hs-border px-8 py-2 flex items-center gap-4 shrink-0">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-hs-bg text-hs-dark text-sm font-medium">
          <Filter className="w-3.5 h-3.5" />
          Alle wachtrijen
          <ChevronDown className="w-3.5 h-3.5 text-hs-light" />
        </button>
        <div className="h-5 w-px bg-hs-border" />
        {['Vandaag', 'Deze week', 'Achterstallig'].map((tab, i) => (
          <button
            key={tab}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-hs-red-light text-hs-red'
                : 'text-hs-medium hover:bg-hs-bg'
            }`}
          >
            {tab}
            {i === 0 && <span className="ml-1.5 text-xs bg-hs-red text-white px-1.5 py-0.5 rounded-full">2</span>}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          {/* Table header */}
          <thead>
            <motion.tr
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-hs-bg border-b border-hs-border"
            >
              <th className="w-12 px-4 py-3" />
              <th className="text-left px-4 py-3 text-[11px] font-bold text-hs-light uppercase tracking-wider">Titel</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-hs-light uppercase tracking-wider">Wachtrij</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-hs-light uppercase tracking-wider">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> Gekoppeld bedrijf</span>
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-hs-light uppercase tracking-wider">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Vervaldatum</span>
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-hs-light uppercase tracking-wider">
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> Contact</span>
              </th>
            </motion.tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {tasks.slice(0, visibleCount).map((task, i) => {
                const isChecked = checkedIds.has(task.id);
                return (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, type: 'spring', bounce: 0.1 }}
                    className={`border-b border-hs-border transition-colors duration-500 ${
                      isChecked ? 'bg-hs-green-light/50' : 'bg-white hover:bg-hs-bg'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCheck(task.id); }}
                        className="focus:outline-none"
                      >
                        {isChecked ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', bounce: 0.5 }}
                          >
                            <CheckCircle2 className="w-5 h-5 text-hs-green" />
                          </motion.div>
                        ) : (
                          <Circle className="w-5 h-5 text-hs-border hover:text-hs-blue transition-colors" />
                        )}
                      </button>
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3.5">
                      <span className={`text-sm font-medium transition-all duration-300 ${
                        isChecked ? 'line-through text-hs-light' : 'text-hs-dark'
                      }`}>
                        {task.title}
                      </span>
                      {task.amount && (
                        <span className={`ml-2 text-xs font-bold ${isChecked ? 'text-hs-light' : 'text-hs-green'}`}>
                          {task.amount}
                        </span>
                      )}
                    </td>

                    {/* Queue */}
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${task.queueColor}`}>
                        {task.queue}
                      </span>
                    </td>

                    {/* Company */}
                    <td className="px-4 py-3.5">
                      <span className={`text-sm ${isChecked ? 'text-hs-light' : 'text-hs-blue hover:underline cursor-pointer'}`}>
                        {task.company}
                      </span>
                    </td>

                    {/* Due date */}
                    <td className="px-4 py-3.5">
                      <span className={`text-sm font-medium ${isChecked ? 'text-hs-light' : task.dueDateColor}`}>
                        {task.dueDate}
                      </span>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3.5">
                      <span className={`text-sm ${isChecked ? 'text-hs-light' : 'text-hs-medium'}`}>
                        {task.contact}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Empty state while loading */}
        {visibleCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-hs-light"
          >
            <ListTodo className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">Taken worden geladen...</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
