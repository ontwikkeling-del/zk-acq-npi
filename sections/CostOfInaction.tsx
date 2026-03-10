import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Calculator, Users, TrendingDown, DollarSign } from 'lucide-react';

export const CostOfInaction: React.FC = () => {
  const [slapendeKlanten, setSlapendeKlanten] = useState(80);
  const [gemOrderwaarde, setGemOrderwaarde] = useState(3500);
  const [verloopPercentage, setVerloopPercentage] = useState(15);

  const jaarlijksVerlies = slapendeKlanten * gemOrderwaarde * (verloopPercentage / 100);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Urgent background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,100,0.06)_0%,_transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-brand-pink" />
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-none">
              De kosten van <span className="text-brand-pink">niets doen</span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg">Vul jullie situatie in en bereken het verlies</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Calculator inputs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <div className="space-y-6">
              <div>
                <label className="text-gray-600 text-sm font-bold uppercase flex items-center gap-2">
                  <Users className="w-4 h-4" /> Slapende klanten (geen order laatste 6 maanden)
                </label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={slapendeKlanten}
                  onChange={(e) => setSlapendeKlanten(Number(e.target.value))}
                  className="w-full mt-2 accent-brand-pink"
                />
                <div className="text-brand-purple font-black text-2xl mt-1">{slapendeKlanten} klanten</div>
              </div>

              <div>
                <label className="text-gray-600 text-sm font-bold uppercase flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Gemiddelde jaarlijkse orderwaarde
                </label>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={gemOrderwaarde}
                  onChange={(e) => setGemOrderwaarde(Number(e.target.value))}
                  className="w-full mt-2 accent-brand-pink"
                />
                <div className="text-brand-purple font-black text-2xl mt-1">{formatCurrency(gemOrderwaarde)}</div>
              </div>

              <div>
                <label className="text-gray-600 text-sm font-bold uppercase flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" /> Verwacht verloop (%) zonder actie
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={verloopPercentage}
                  onChange={(e) => setVerloopPercentage(Number(e.target.value))}
                  className="w-full mt-2 accent-brand-pink"
                />
                <div className="text-brand-purple font-black text-2xl mt-1">{verloopPercentage}%</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Results */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col justify-center"
          >
            {/* Calculation breakdown */}
            <div className="bg-brand-purple/5 border border-brand-purple/20 rounded-xl p-6 mb-4">
              <p className="text-gray-600 text-sm font-bold uppercase mb-3">Berekening</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{slapendeKlanten} slapende klanten</span>
                  <span className="text-brand-purple font-bold">&times;</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{formatCurrency(gemOrderwaarde)} gem. waarde</span>
                  <span className="text-brand-purple font-bold">&times;</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{verloopPercentage}% verloop</span>
                  <span className="text-brand-purple font-bold">=</span>
                </div>
              </div>
            </div>

            {/* Big result */}
            <motion.div
              key={jaarlijksVerlies}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 text-center"
            >
              <p className="text-red-600 text-sm font-bold uppercase mb-2">Jaarlijks verlies door inactie</p>
              <p className="text-red-600 font-black text-5xl md:text-6xl">{formatCurrency(jaarlijksVerlies)}</p>
              <p className="text-red-400 text-sm mt-3">
                Elke maand dat je wacht kost je {formatCurrency(jaarlijksVerlies / 12)}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-4 text-gray-600 text-sm italic"
            >
              Dit bedrag is te voorkomen met proactief klantbeheer
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
