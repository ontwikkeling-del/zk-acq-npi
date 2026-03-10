import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingCart, AlertTriangle, Bell, CheckCircle, Package, ArrowRight, Layers } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter';

const kpis = [
  { label: 'Unieke B2B-klanten', value: 847, icon: Users, trend: 'up', change: '+12%' },
  { label: 'B2B-orders 2025', value: 3241, icon: ShoppingCart, trend: 'up', change: '+8%' },
  { label: 'Gem. bestelfrequentie', value: 3.8, icon: BarChart3, trend: 'up', change: '+0.4', decimals: 1 },
];

const segments = [
  { label: '1 bestelling', count: 312, pct: 37, color: 'bg-red-400' },
  { label: '2 bestellingen', count: 245, pct: 29, color: 'bg-orange-400' },
  { label: '3+ bestellingen', count: 290, pct: 34, color: 'bg-brand-green' },
];

// Live notification feed
const notifications = [
  { type: 'alert', icon: AlertTriangle, text: 'Slapende klant gedetecteerd: Zorggroep Oost', color: 'text-red-500', delay: 2500 },
  { type: 'action', icon: Bell, text: 'Notificatie verstuurd naar sales medewerker Danny', color: 'text-orange-500', delay: 4000 },
  { type: 'done', icon: CheckCircle, text: 'Taak aangemaakt: Bel Zorggroep Oost', color: 'text-brand-green', delay: 5500 },
];

// Monthly order trend data for chart
const monthlyOrders = [
  { month: 'Jul', value: 240 },
  { month: 'Aug', value: 210 },
  { month: 'Sep', value: 280 },
  { month: 'Okt', value: 310 },
  { month: 'Nov', value: 290 },
  { month: 'Dec', value: 350 },
  { month: 'Jan', value: 320 },
  { month: 'Feb', value: 380 },
];

// Upsell example
const upsellProducts = {
  current: ['Incontinentie inleggers', 'Wegwerphandschoenen', 'Desinfectiemiddel'],
  potential: ['Beschermende bedonderleggers', 'Huidverzorging', 'Wasbare producten'],
};

export const DataDashboard: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeNotifications, setActiveNotifications] = useState<number[]>([]);
  const [liveKpis, setLiveKpis] = useState(kpis.map(k => k.value));
  const [showChart, setShowChart] = useState(false);

  // Live number updates
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setLiveKpis(prev => prev.map((val, i) => {
          if (i === 0) return val + Math.floor(Math.random() * 3);
          if (i === 1) return val + Math.floor(Math.random() * 5);
          return val;
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Sequential notifications
  useEffect(() => {
    if (isInView) {
      const timers = notifications.map((n, i) =>
        setTimeout(() => setActiveNotifications(prev => [...prev, i]), n.delay)
      );
      setTimeout(() => setShowChart(true), 1500);
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  const maxOrder = Math.max(...monthlyOrders.map(m => m.value));

  return (
    <section ref={ref} className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      {/* Background */}
      <motion.div
        initial={{ y: '-100%' }}
        whileInView={{ y: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute top-0 left-0 w-full h-[35vh] bg-gray-50-light/20 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* David avatar + title */}
        <div className="flex items-center gap-12 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-green">
              <img
                src="https://zwartekraai.nl/assets/david-pantophlet-updated-fqoY03LJ.jpg"
                alt="David"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-brand-purple font-black">David Pantophlet</p>
              <p className="text-brand-green text-xs font-bold">Head of AI | Scale-up 0-80 medewerkers</p>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-black uppercase leading-none"
          >
            Data is het nieuwe <span className="text-brand-green">goud</span>
          </motion.h2>
        </div>

        {/* Structure emphasis banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-3 mb-4 flex items-center gap-4"
        >
          <Layers className="w-6 h-6 text-brand-green shrink-0" />
          <div className="flex-1">
            <p className="text-brand-purple font-black text-sm">Wij brengen structuur in je data</p>
            <p className="text-gray-600 text-xs">Dashboards &bull; Rapportages &bull; Klant-segmentatie &bull; Slimme alerts</p>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-center justify-between mb-1">
                <kpi.icon className="w-4 h-4 text-gray-600" />
                <span className={`text-xs font-bold flex items-center gap-1 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
              <motion.div
                key={liveKpis[index]}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="text-brand-purple font-black text-2xl"
              >
                {kpi.decimals ? liveKpis[index].toFixed(kpi.decimals) : liveKpis[index].toLocaleString('nl-NL')}
              </motion.div>
              <p className="text-gray-600 text-xs font-bold uppercase mt-1">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom row - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Bar Chart - Besteltrends */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-4 shadow-lg"
          >
            <p className="text-brand-purple font-black text-xs mb-3 uppercase">Besteltrends per maand</p>
            <div className="flex items-end justify-between gap-1" style={{ height: '100px' }}>
              {monthlyOrders.map((m, index) => (
                <div key={m.month} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: showChart ? `${(m.value / maxOrder) * 80}px` : 0 }}
                    transition={{ delay: 0.6 + index * 0.08, duration: 0.5 }}
                    className={`w-full rounded-t-sm ${index >= 6 ? 'bg-brand-green' : 'bg-brand-green/40'}`}
                  />
                  <span className="text-gray-500 text-[8px] mt-1">{m.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upsell Example */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-brand-pink" />
              <p className="text-brand-purple font-black text-xs uppercase">Upsell Potentie</p>
            </div>
            <p className="text-gray-600 text-[10px] mb-2 font-bold">Verpleeghuis De Beuken</p>
            <div className="space-y-1 mb-2">
              {upsellProducts.current.map(p => (
                <div key={p} className="flex items-center gap-1.5 text-[10px]">
                  <CheckCircle className="w-3 h-3 text-brand-green shrink-0" />
                  <span className="text-gray-700">{p}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 my-1.5">
              <ArrowRight className="w-3 h-3 text-brand-pink" />
              <span className="text-brand-pink font-bold text-[10px] uppercase">Potentie</span>
            </div>
            <div className="space-y-1">
              {upsellProducts.potential.map(p => (
                <div key={p} className="flex items-center gap-1.5 text-[10px]">
                  <div className="w-3 h-3 rounded-full border-2 border-brand-pink/40 shrink-0" />
                  <span className="text-brand-pink font-medium">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live notification feed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl p-4 shadow-lg relative overflow-hidden"
          >
            <p className="text-brand-purple font-black text-xs mb-3 uppercase">Live Signalen & Acties</p>

            <div className="space-y-2">
              <AnimatePresence>
                {notifications.map((notif, index) => (
                  activeNotifications.includes(index) && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ type: 'spring', damping: 20 }}
                      className="flex items-start gap-2 bg-gray-50 rounded-lg p-2"
                    >
                      <notif.icon className={`w-3.5 h-3.5 ${notif.color} shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-gray-700 text-[10px] font-medium">{notif.text}</p>
                        <p className="text-gray-400 text-[8px] mt-0.5">Zojuist</p>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>

              {activeNotifications.length === 0 && (
                <div className="flex items-center justify-center h-20">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-gray-600 text-xs"
                  >
                    Analyseren van klantdata...
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
