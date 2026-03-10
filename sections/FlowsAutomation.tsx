import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Ticket, GitBranch, UserCheck, Brain, QrCode, Globe, Mic, FileText, Wrench, ArrowRight, X, UserPlus, Headphones, Layers, Repeat } from 'lucide-react';
import { TradeShows } from './TradeShows';
import { LeadPipeline } from './LeadPipeline';
import { ContactEnricher } from './ContactEnricher';
import { AIEnrichment } from './AIEnrichment';
import { QRSample } from './QRSample';
import { WebsiteTracker } from './WebsiteTracker';
import { AIAnalysis } from './AIAnalysis';
import { QuoteAutomation } from './QuoteAutomation';
import { LeadGeneration } from './LeadGeneration';
import { AudioBuitendienst } from './AudioBuitendienst';
import { CustomerSegmentation } from './CustomerSegmentation';
import { MarketingSales } from './MarketingSales';

const tools = [
  { icon: Ticket, title: 'Beurzen & Events', benefit: 'Lead direct in CRM na scan', color: 'brand-green', slideKey: 'TradeShows' },
  { icon: GitBranch, title: 'Lead Pipeline', benefit: 'Aanvragen direct naar pipeline', color: 'brand-accent', slideKey: 'LeadPipeline' },
  { icon: UserCheck, title: 'Contact Verrijker', benefit: 'Automatisch complete profielen', color: 'brand-pink', slideKey: 'ContactEnricher' },
  { icon: Brain, title: 'AI Bedrijfsverrijking', benefit: 'Branche, omzet & kansen in 1 klik', color: 'brand-green', slideKey: 'AIEnrichment' },
  { icon: QrCode, title: 'QR Sample Activatie', benefit: 'Fysiek sample → digitale lead', color: 'brand-accent', slideKey: 'QRSample' },
  { icon: Globe, title: 'Website Lead Tracker', benefit: 'Anonieme bezoekers → bedrijfsnaam', color: 'brand-pink', slideKey: 'WebsiteTracker' },
  { icon: Mic, title: 'AI Gespreksanalyse', benefit: 'Auto-samenvatting & coaching tips', color: 'brand-green', slideKey: 'AIAnalysis' },
  { icon: FileText, title: 'Offerte Automatisering', benefit: 'Snellere opvolging, hogere conversie', color: 'brand-accent', slideKey: 'QuoteAutomation' },
  { icon: UserPlus, title: 'Lead Generatie', benefit: 'Automatisch leads op aanvraag', color: 'brand-pink', slideKey: 'LeadGeneration' },
  { icon: Headphones, title: 'Audio Buitendienst', benefit: 'Spraaknotities direct op klantkaart', color: 'brand-green', slideKey: 'AudioBuitendienst' },
  { icon: Layers, title: 'Klanten Segmenteren', benefit: 'A/B/C-klanten automatisch indelen', color: 'brand-accent', slideKey: 'CustomerSegmentation' },
  { icon: Repeat, title: 'Marketing × Sales', benefit: 'Sales data verbetert marketing', color: 'brand-pink', slideKey: 'MarketingSales' },
];

const slideComponentMap: Record<string, React.FC> = {
  TradeShows, LeadPipeline, ContactEnricher, AIEnrichment,
  QRSample, WebsiteTracker, AIAnalysis, QuoteAutomation,
  LeadGeneration, AudioBuitendienst, CustomerSegmentation, MarketingSales,
};

export const FlowsAutomation: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<string | null>(null);
  const ActiveComponent = activeSlide ? slideComponentMap[activeSlide] : null;

  return (
    <>
      <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px]" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              className="mb-3"
            >
              <div className="w-14 h-14 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-7 h-7 text-brand-accent" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black uppercase leading-tight mb-2 text-brand-purple"
            >
              Onze <span className="text-brand-accent">tools</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm max-w-2xl mx-auto mb-1"
            >
              Eigengebouwde modules die we direct kunnen aanzetten. Klik voor meer info.
            </motion.p>
          </div>

          {/* Tools grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  onClick={() => tool.slideKey && setActiveSlide(tool.slideKey)}
                  className={`bg-white border border-gray-100 rounded-xl p-4 transition-all group hover:shadow-md ${
                    tool.slideKey ? 'cursor-pointer hover:border-' + tool.color + '/30' : ''
                  }`}
                >
                  <div className={`w-10 h-10 bg-${tool.color}/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 text-${tool.color}`} />
                  </div>
                  <p className="text-brand-purple font-bold text-xs mb-1">{tool.title}</p>
                  <p className={`text-${tool.color} font-bold text-[10px] flex items-center gap-1`}>
                    {tool.slideKey && <ArrowRight className="w-3 h-3" />} {tool.benefit}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Custom tools CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-5 flex items-center justify-center gap-3"
          >
            <div className="w-8 h-8 bg-brand-purple/10 rounded-full flex items-center justify-center">
              <Wrench className="w-4 h-4 text-brand-purple" />
            </div>
            <p className="text-brand-purple font-bold text-sm">
              + tools op maat ontwikkelen we samen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full-screen modal overlay with original tool slide */}
      <AnimatePresence>
        {activeSlide && ActiveComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveSlide(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveSlide(null)}
              className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
            >
              <X className="w-5 h-5 text-brand-purple" />
            </button>

            {/* Slide content in a centered card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, type: 'spring', damping: 25 }}
              className="absolute inset-4 md:inset-8 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ActiveComponent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
