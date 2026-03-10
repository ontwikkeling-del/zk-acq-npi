import React, { createContext, useContext, useState, type ReactNode } from 'react';

// FysioSupplies defaults — gebaseerd op B2B vragenlijst data
// 46.873 klanten in 3 jaar, €13,9M omzet, 69,5% koopt maar 1 keer
const DEFAULTS = {
  // Klantbehoud (focus: 14.287 herhalers behouden)
  actieveKlanten: 14000,
  gemJaaromzet: 600,
  huidigChurn: 15,
  verbeterdChurn: 10,
  // Nieuwe klanten (heractivatie eenmalige kopers)
  extraNieuweKlanten: 50,
  gemEersteJaaromzet: 400,
  // Cross-sell & upsell (12.000+ producten, klanten kopen maar 1 categorie)
  crossSellKlanten: 500,
  extraOmzetPerKlant: 300,
  // Tijdsbesparing (geen CRM, alles handmatig)
  urenPerWeek: 15,
  uurtarief: 35,
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
