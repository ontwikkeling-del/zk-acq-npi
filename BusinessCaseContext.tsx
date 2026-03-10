import React, { createContext, useContext, useState, type ReactNode } from 'react';

// NPI BV defaults — gebaseerd op B2B vragenlijst + briefing
// 350 klanten, €10.4M omzet, gem. €29.700/klant/jaar, 130 slapende klanten
const DEFAULTS = {
  // Klantbehoud (5% churnverbetering = €520K+ behoud)
  actieveKlanten: 350,
  gemJaaromzet: 15000,
  huidigChurn: 20,
  verbeterdChurn: 10,
  // Slapende klanten reactiveren (20% van 130 = 26 klanten)
  extraNieuweKlanten: 26,
  gemEersteJaaromzet: 29700,
  // Cross-sell folie ↔ tuinbouw ↔ wateropslag
  crossSellKlanten: 60,
  extraOmzetPerKlant: 5000,
  // Tijdsbesparing (Hanneke + binnendienst, alles handmatig via Cash)
  urenPerWeek: 8,
  uurtarief: 40,
};

type Inputs = typeof DEFAULTS;

interface BusinessCaseTotals {
  klantbehoud: number;
  nieuweKlanten: number;
  crossSell: number;
  efficientie: number;
  total: number;
}

interface BusinessCaseContextType {
  inputs: Inputs;
  setInput: <K extends keyof Inputs>(key: K, value: number) => void;
  totals: BusinessCaseTotals;
}

const BusinessCaseContext = createContext<BusinessCaseContextType | null>(null);

export const useBusinessCase = () => {
  const ctx = useContext(BusinessCaseContext);
  if (!ctx) throw new Error('useBusinessCase must be used within BusinessCaseProvider');
  return ctx;
};

export const BusinessCaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const setInput = <K extends keyof Inputs>(key: K, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const klantbehoud = Math.max(0, inputs.actieveKlanten * inputs.gemJaaromzet * ((inputs.huidigChurn - inputs.verbeterdChurn) / 100));
  const nieuweKlanten = inputs.extraNieuweKlanten * inputs.gemEersteJaaromzet;
  const crossSell = inputs.crossSellKlanten * inputs.extraOmzetPerKlant;
  const efficientie = inputs.urenPerWeek * 52 * inputs.uurtarief;
  const total = klantbehoud + nieuweKlanten + crossSell + efficientie;

  return (
    <BusinessCaseContext.Provider value={{
      inputs,
      setInput,
      totals: { klantbehoud, nieuweKlanten, crossSell, efficientie, total },
    }}>
      {children}
    </BusinessCaseContext.Provider>
  );
};
