import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Phone, Mail, BarChart3, AlertTriangle, CheckCircle, XCircle, Zap } from 'lucide-react';

const timelineItems = [
  {
    time: '09:00',
    without: { icon: Mail, text: 'Inbox doorploegen op zoek naar orders', color: 'text-red-400' },
    with: { icon: Zap, text: 'Dashboard toont 3 nieuwe orders, automatisch verwerkt', color: 'text-brand-green' },
  },
  {
    time: '10:30',
    without: { icon: Phone, text: 'Bellen: "Heeft u onze offerte ontvangen?"', color: 'text-red-400' },
    with: { icon: CheckCircle, text: 'CRM alert: klant opende offerte 3x - bel NU', color: 'text-brand-green' },
  },
  {
    time: '13:00',
    without: { icon: XCircle, text: 'Zorggroep stilletjes overgestapt naar concurrent', color: 'text-red-400' },
    with: { icon: AlertTriangle, text: 'AI detecteert 40% daling - proactief gesprek ingepland', color: 'text-brand-green' },
  },
  {
    time: '15:30',
    without: { icon: BarChart3, text: 'Excel-rapport bouwen voor management', color: 'text-red-400' },
    with: { icon: BarChart3, text: 'Realtime dashboard al klaar, 2 uur bespaard', color: 'text-brand-green' },
  },
];

export const DayInLife: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(204,255,0,0.05)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-brand-green" />
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-none">
              Een dag bij <span className="text-brand-green">jouw organisatie</span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg">Hoe verandert jullie werkdag?</p>
        </motion.div>

        {/* Split screen header */}
        <div className="grid grid-cols-[80px_1fr_1fr] gap-4 mb-4">
          <div />
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="bg-red-100 text-red-600 font-black text-sm uppercase px-4 py-2 rounded-full">
              Zonder Zwarte Kraai
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="bg-brand-green/20 text-brand-green font-black text-sm uppercase px-4 py-2 rounded-full">
              Met Zwarte Kraai
            </span>
          </motion.div>
        </div>

        {/* Timeline rows */}
        <div className="space-y-3">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="grid grid-cols-[80px_1fr_1fr] gap-4 items-center"
            >
              {/* Time */}
              <div className="text-brand-purple font-black text-lg text-right">{item.time}</div>

              {/* Without */}
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 0.97 : 1,
                  opacity: hoveredIndex === index ? 0.7 : 1,
                }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
              >
                <item.without.icon className={`w-5 h-5 ${item.without.color} shrink-0`} />
                <p className="text-gray-700 text-sm">{item.without.text}</p>
              </motion.div>

              {/* With */}
              <motion.div
                animate={{
                  scale: hoveredIndex === index ? 1.03 : 1,
                }}
                className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4 flex items-center gap-3"
              >
                <item.with.icon className={`w-5 h-5 ${item.with.color} shrink-0`} />
                <p className="text-gray-700 text-sm font-medium">{item.with.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 grid grid-cols-[80px_1fr_1fr] gap-4"
        >
          <div />
          <div className="text-center bg-red-100 rounded-xl p-3">
            <p className="text-red-600 font-black text-sm">Reactief, handmatig, verlies</p>
          </div>
          <div className="text-center bg-brand-green/20 rounded-xl p-3">
            <p className="text-brand-green font-black text-sm">Proactief, automatisch, groei</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
