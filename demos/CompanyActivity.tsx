import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, FileText, MessageSquare, ClipboardList, Building2, Globe, User, ChevronRight, Plus, BarChart3 } from 'lucide-react';

interface Activity {
  id: number;
  type: 'call' | 'email' | 'order' | 'quote';
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

// Newest first: each new item appears at the top, pushing older ones down
const activities: Activity[] = [
  {
    id: 1,
    type: 'call',
    title: 'Oproep gelogd',
    description: 'Gebeld voor afspraak, voicemail achtergelaten',
    date: '7 feb 2026',
    icon: <Phone className="w-4 h-4" />,
    color: 'text-hs-blue',
    bgColor: 'bg-hs-blue-light',
  },
  {
    id: 2,
    type: 'email',
    title: 'E-mail verstuurd',
    description: 'Offerte follow-up verstuurd naar inkoop',
    date: '6 feb 2026',
    icon: <Mail className="w-4 h-4" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 3,
    type: 'order',
    title: 'Order geplaatst',
    description: 'Order 115066 - Wondverzorging assortiment',
    date: '5 feb 2026',
    icon: <ClipboardList className="w-4 h-4" />,
    color: 'text-hs-green',
    bgColor: 'bg-hs-green-light',
  },
  {
    id: 4,
    type: 'call',
    title: 'Oproep gelogd',
    description: 'Gesprek met inkoper, interesse in nieuw assortiment',
    date: '1 feb 2026',
    icon: <Phone className="w-4 h-4" />,
    color: 'text-hs-blue',
    bgColor: 'bg-hs-blue-light',
  },
  {
    id: 5,
    type: 'quote',
    title: 'Offerte verstuurd',
    description: 'Offerte Wondverzorging - €4.689',
    date: '29 jan 2026',
    icon: <FileText className="w-4 h-4" />,
    color: 'text-hs-orange',
    bgColor: 'bg-hs-orange-light',
  },
];

const contacts = [
  { name: 'Gerda Vermeer', role: 'Inkoper', email: 'g.vermeer@debeuken.nl', phone: '+31 6 1234 5678' },
  { name: 'Pieter Jansen', role: 'Facilitair Manager', email: 'p.jansen@debeuken.nl', phone: '+31 6 8765 4321' },
];

const deals = [
  { name: 'Wondverzorging pakket', amount: '€4.689', stage: 'Offerte', color: 'text-amber-600' },
  { name: 'Jaarcontract 2025', amount: '€12.500', stage: 'Gewonnen', color: 'text-hs-green' },
  { name: 'Incontinentie assortiment', amount: '€6.300', stage: 'In Contact', color: 'text-purple-600' },
];

export const CompanyActivity: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  // Auto-reveal activities one by one
  useEffect(() => {
    if (visibleCount >= activities.length) return;
    const delay = visibleCount === 0 ? 1200 : 1800;
    const t = setTimeout(() => setVisibleCount(c => c + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <section className="h-screen w-screen bg-hs-bg flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="bg-white border-b border-hs-border px-6 py-3 flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-hs-blue flex items-center justify-center">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-hs-dark">Verpleeghuis De Beuken</h1>
          <p className="text-xs text-hs-light">Bedrijf - Zorgsector</p>
        </div>
      </div>

      {/* 3-column layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-[280px] bg-white border-r border-hs-border p-5 flex flex-col gap-5 overflow-y-auto shrink-0"
        >
          {/* Quick actions */}
          <div className="flex items-center gap-2">
            {[
              { icon: <MessageSquare className="w-4 h-4" />, label: 'Opmerking', color: 'bg-gray-100 text-hs-medium' },
              { icon: <Mail className="w-4 h-4" />, label: 'E-mail', color: 'bg-gray-100 text-hs-medium' },
              { icon: <Phone className="w-4 h-4" />, label: 'Bellen', color: 'bg-gray-100 text-hs-medium' },
              { icon: <ClipboardList className="w-4 h-4" />, label: 'Taak', color: 'bg-gray-100 text-hs-medium' },
            ].map((action, i) => (
              <button key={i} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg ${action.color} hover:bg-gray-200 transition-colors`}>
                {action.icon}
                <span className="text-[10px] font-medium">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Company info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-hs-dark uppercase tracking-wider">Over dit bedrijf</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-hs-medium">
                <Globe className="w-3.5 h-3.5 text-hs-light" />
                <span className="text-hs-blue hover:underline cursor-pointer">debeuken.nl</span>
              </div>
              <div className="flex items-center gap-2 text-hs-medium">
                <Phone className="w-3.5 h-3.5 text-hs-light" />
                <span>+31 70 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-hs-medium">
                <Building2 className="w-3.5 h-3.5 text-hs-light" />
                <span>Den Haag, Zuid-Holland</span>
              </div>
            </div>
          </div>

          {/* Revenue stats */}
          <div className="bg-hs-bg rounded-lg p-3 space-y-2.5">
            <h3 className="text-xs font-bold text-hs-dark uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-hs-blue" />
              Omzet overzicht
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded p-2 text-center">
                <p className="text-[10px] text-hs-light font-semibold">Omzet 2026</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-base font-bold text-hs-green"
                >€142.890</motion.p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="text-[10px] text-hs-light font-semibold">Omzet 2025</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="text-base font-bold text-hs-medium"
                >€6.200</motion.p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="text-[10px] text-hs-light font-semibold">Orders 2026</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.1 }}
                  className="text-base font-bold text-hs-dark"
                >54</motion.p>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <p className="text-[10px] text-hs-light font-semibold">Orders 2025</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4 }}
                  className="text-base font-bold text-hs-medium"
                >7</motion.p>
              </div>
            </div>
            {/* Growth indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0 }}
              className="bg-hs-green-light border border-hs-green/20 rounded p-2 text-center"
            >
              <span className="text-hs-green font-bold text-sm">+2.205% groei</span>
              <span className="text-hs-green/70 text-[10px] block">t.o.v. vorig jaar</span>
            </motion.div>
          </div>

          {/* Owner */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-hs-dark uppercase tracking-wider">Bedrijfseigenaar</h3>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-hs-blue flex items-center justify-center text-white text-xs font-bold">ED</div>
              <span className="text-sm text-hs-dark font-medium">Erwin Dijkstra</span>
            </div>
          </div>
        </motion.div>

        {/* Middle — Activity stream */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-1 mb-5 border-b border-hs-border"
            >
              {['Activiteiten', 'E-mails', 'Oproepen', 'Taken'].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    i === 0
                      ? 'border-hs-blue text-hs-blue'
                      : 'border-transparent text-hs-light hover:text-hs-medium'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Activity items */}
            <div className="space-y-1">
              <AnimatePresence>
                {activities.slice(activities.length - visibleCount).map((activity, i, arr) => (
                  <motion.div
                    key={activity.id}
                    layout
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, type: 'spring', bounce: 0.1 }}
                    className="flex gap-3 py-3 group"
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center pt-1">
                      <div className={`w-8 h-8 rounded-full ${activity.bgColor} ${activity.color} flex items-center justify-center shrink-0`}>
                        {activity.icon}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 bg-hs-border mt-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-lg border border-hs-border p-4 shadow-sm group-hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold text-sm ${activity.color}`}>{activity.title}</h4>
                        <span className="text-[11px] text-hs-light">{activity.date}</span>
                      </div>
                      <p className="text-sm text-hs-medium mt-1">{activity.description}</p>
                      {activity.type === 'order' && (
                        <div className="mt-2 inline-flex items-center gap-1 bg-hs-green-light text-hs-green text-xs font-bold px-2 py-0.5 rounded-full">
                          €2.340
                        </div>
                      )}
                      {activity.type === 'quote' && (
                        <div className="mt-2 inline-flex items-center gap-1 bg-hs-orange-light text-hs-orange text-xs font-bold px-2 py-0.5 rounded-full">
                          €4.689
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {visibleCount >= activities.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center py-4 text-hs-light text-sm"
                >
                  Einde van de activiteitenstream
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-[260px] bg-white border-l border-hs-border p-5 flex flex-col gap-5 overflow-y-auto shrink-0"
        >
          {/* Contacts */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-hs-dark uppercase tracking-wider">Contactpersonen</h3>
              <Plus className="w-3.5 h-3.5 text-hs-blue cursor-pointer" />
            </div>
            {contacts.map((contact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.4 }}
                className="flex items-start gap-2.5 p-2 rounded hover:bg-hs-bg transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-bold shrink-0">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-hs-dark truncate">{contact.name}</p>
                  <p className="text-[11px] text-hs-light">{contact.role}</p>
                  <p className="text-[11px] text-hs-blue truncate">{contact.email}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="h-px bg-hs-border" />

          {/* Deals */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-hs-dark uppercase tracking-wider">Deals</h3>
              <Plus className="w-3.5 h-3.5 text-hs-blue cursor-pointer" />
            </div>
            {deals.map((deal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + i * 0.4 }}
                className="flex items-center justify-between p-2 rounded hover:bg-hs-bg transition-colors cursor-pointer group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-hs-dark truncate">{deal.name}</p>
                  <p className={`text-xs font-semibold ${deal.color}`}>{deal.stage}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-hs-dark">{deal.amount}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-hs-light opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
