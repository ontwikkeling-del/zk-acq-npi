import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Users, DollarSign, Zap } from 'lucide-react';

const presets = [
  { label: 'Klein', subtitle: '50 zorginstellingen', klanten: 50, omzet: 4000, sales: 2 },
  { label: 'Middel', subtitle: '150 zorginstellingen', klanten: 150, omzet: 5000, sales: 4 },
  { label: 'Groot', subtitle: '300+ zorginstellingen', klanten: 300, omzet: 6000, sales: 8 },
];

export const ROICalculator: React.FC = () => {
  const [klanten, setKlanten] = useState(150);
  const [omzetPerKlant, setOmzetPerKlant] = useState(5000);
  const [salesMedewerkers, setSalesMedewerkers] = useState(4);
  const [activePreset, setActivePreset] = useState<number | null>(1);

  const totaleOmzet = klanten * omzetPerKlant;
  const extraUitKlanten = totaleOmzet * 0.10;
  const idealeRatio = 60;
  const huidigeRatio = klanten / salesMedewerkers;
  const nieuweKlantenPercentage = Math.min(0.10, 0.10 * (idealeRatio / huidigeRatio));
  const extraNieuweKlanten = (klanten * nieuweKlantenPercentage) * omzetPerKlant;
  const totaalExtra = extraUitKlanten + extraNieuweKlanten;

  // FTE savings calculation
  const bespaardeFTE = Math.max(0.5, (salesMedewerkers * 0.32 * 0.6));

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  const applyPreset = (index: number) => {
    const p = presets[index];
    setKlanten(p.klanten);
    setOmzetPerKlant(p.omzet);
    setSalesMedewerkers(p.sales);
    setActivePreset(index);
  };

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(204,255,0,0.05)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <Calculator className="w-10 h-10 text-brand-green mx-auto mb-2" />
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-none">
            Bereken je <span className="text-brand-green">winst</span>
          </h2>
        </motion.div>

        {/* Preset buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-4"
        >
          {presets.map((preset, index) => (
            <button
              key={preset.label}
              onClick={() => applyPreset(index)}
              className={`px-4 py-2 rounded-xl text-sm font-bold uppercase transition-all border-2 ${
                activePreset === index
                  ? 'bg-brand-green text-black border-brand-green shadow-lg'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-green/50'
              }`}
            >
              <div className="text-xs">{preset.label}</div>
              <div className="text-[9px] font-normal opacity-70">{preset.subtitle}</div>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-brand-purple font-black text-base mb-4 uppercase">Jouw cijfers</h3>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-xs font-bold uppercase flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Aantal zorginstellingen
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={klanten}
                  onChange={(e) => { setKlanten(Number(e.target.value)); setActivePreset(null); }}
                  className="w-full mt-1 accent-brand-purple"
                />
                <div className="text-brand-purple font-black text-xl mt-1">{klanten}</div>
              </div>

              <div>
                <label className="text-gray-600 text-xs font-bold uppercase flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5" /> Gem. jaaromzet per instelling
                </label>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={omzetPerKlant}
                  onChange={(e) => { setOmzetPerKlant(Number(e.target.value)); setActivePreset(null); }}
                  className="w-full mt-1 accent-brand-purple"
                />
                <div className="text-brand-purple font-black text-xl mt-1">{formatCurrency(omzetPerKlant)}</div>
              </div>

              <div>
                <label className="text-gray-600 text-xs font-bold uppercase flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Aantal sales medewerkers
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={salesMedewerkers}
                  onChange={(e) => { setSalesMedewerkers(Number(e.target.value)); setActivePreset(null); }}
                  className="w-full mt-1 accent-brand-purple"
                />
                <div className="text-brand-purple font-black text-xl mt-1">{salesMedewerkers}</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <div className="bg-brand-purple/5 backdrop-blur border border-brand-purple/20 rounded-xl p-4">
              <p className="text-gray-600 text-xs font-bold uppercase mb-1">Totale omzet</p>
              <p className="text-brand-purple font-black text-2xl">{formatCurrency(totaleOmzet)}</p>
            </div>

            <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-brand-green" />
                <p className="text-brand-green text-xs font-bold uppercase">10% meer uit bestaande instellingen</p>
              </div>
              <p className="text-brand-green font-black text-2xl">{formatCurrency(extraUitKlanten)}</p>
            </div>

            <div className="bg-brand-pink/10 border border-brand-pink/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-brand-pink" />
                <p className="text-brand-pink text-xs font-bold uppercase">{Math.round(nieuweKlantenPercentage * 100)}% meer nieuwe klanten</p>
              </div>
              <p className="text-brand-pink font-black text-2xl">{formatCurrency(extraNieuweKlanten)}</p>
              <p className="text-brand-pink/60 text-[10px] mt-1">Ratio: {Math.round(huidigeRatio)} instellingen per medewerker</p>
            </div>

            {/* FTE savings */}
            <div className="bg-brand-purple/10 border border-brand-purple/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-brand-purple" />
                <p className="text-brand-purple text-xs font-bold uppercase">Bespaarde FTE door automatisering</p>
              </div>
              <p className="text-brand-purple font-black text-2xl">{bespaardeFTE.toFixed(1)} FTE</p>
              <p className="text-brand-purple/60 text-[10px] mt-1">Geschatte besparing: {formatCurrency(bespaardeFTE * 55000)}/jaar</p>
            </div>

            <div className="bg-brand-green rounded-xl p-4">
              <p className="text-black text-xs font-bold uppercase mb-1">Extra omzet potentieel</p>
              <p className="text-black font-black text-3xl">{formatCurrency(totaalExtra)}</p>
              <p className="text-black/60 text-[10px] mt-1">Per jaar, door proactief salesbeleid</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
