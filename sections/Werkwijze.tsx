import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Target, BarChart3, ArrowRight, Play } from 'lucide-react';
import { FullscreenOverlay } from '../components/FullscreenOverlay';
import { HubSpotDemoViewer } from '../demos/HubSpotDemoViewer';

const steps = [
  {
    num: '1',
    title: 'Adoptie',
    subtitle: 'CRM & Data Platform',
    description: 'Fundament leggen: CRM implementeren, data opschonen, team onboarden.',
    bullets: ['Data migratie & opschonen', 'HubSpot inrichten', 'Eerste automatiseringen', 'Team onboarden & trainen'],
    icon: Database,
    color: 'bg-brand-green',
  },
  {
    num: '2',
    title: 'Versnelling',
    subtitle: 'Effici\u00ebntie & Sales Training',
    description: 'Processen automatiseren, sales vaardigheden trainen, eerste quick wins.',
    bullets: ['Slapende klanten activeren', 'Geavanceerde automatiseringen', 'Sales training', 'Quick wins realiseren'],
    icon: Zap,
    color: 'bg-brand-pink',
  },
  {
    num: '3',
    title: 'Leadgeneratie & Outreach',
    subtitle: 'Pipeline & Nieuwe Klanten',
    description: 'Actief nieuwe klanten aantrekken, outreach opzetten en pipeline vullen.',
    bullets: ['Outreach flows opzetten', 'Leadlijsten samenstellen', 'Prospecting tools inzetten', 'Pipeline structureel vullen'],
    icon: Target,
    color: 'bg-brand-green',
  },
  {
    num: '4',
    title: 'Strategisch',
    subtitle: 'Proactieve Organisatie',
    description: 'Data-gedreven beslissingen, volledige proactieve organisatie, schaalbaar groeimodel.',
    bullets: ['Dashboards & rapportages', 'Data-gedreven beslissingen', 'Schaalbaar groeimodel', 'Continue optimalisatie'],
    icon: BarChart3,
    color: 'bg-brand-pink',
  },
];

export const Werkwijze: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
        {/* Background */}
        <motion.div
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-0 right-0 w-full h-[30vh] bg-brand-green/10 z-0"
        />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-black uppercase leading-none mb-4 text-center"
          >
            Onze <span className="text-brand-green">werkwijze</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-xl text-center mb-10"
          >
            Van reactief naar proactief in 4 fases
          </motion.p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                  className="bg-white rounded-2xl p-5 shadow-xl relative group hover:scale-105 transition-transform"
                >
                  {/* Step number */}
                  <div className={`${step.color} rounded-full w-10 h-10 flex items-center justify-center font-black text-black text-lg mb-3`}>
                    {step.num}
                  </div>

                  <step.icon className="w-7 h-7 text-brand-purple mb-2" />
                  <h3 className="text-brand-purple font-black text-base mb-1">{step.title}</h3>
                  <p className={`text-xs font-bold mb-2 ${index % 2 === 0 ? 'text-green-600' : 'text-pink-600'}`}>{step.subtitle}</p>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{step.description}</p>

                  {/* Concrete bullets */}
                  <ul className="space-y-1">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-1.5 text-[10px] text-gray-500">
                        <div className={`w-1 h-1 rounded-full ${step.color} shrink-0`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Arrow to next (hidden on last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <ArrowRight className="w-5 h-5 text-brand-green" />
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
          </div>

          {/* Video placeholder + Result */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: 'spring' }}
              onClick={() => setShowDemo(true)}
              className="bg-brand-purple/5 border border-brand-purple/20 rounded-xl px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-brand-purple/10 hover:scale-105 transition-all"
            >
              <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-black ml-0.5" />
              </div>
              <div>
                <p className="text-brand-purple font-bold text-sm">Bekijk HubSpot in actie</p>
                <p className="text-gray-500 text-xs">Demo walkthrough</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              <div className="inline-block bg-brand-green text-black rounded-xl px-8 py-4 font-black text-xl uppercase">
                = Proactieve Organisatie
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HubSpot Demo Popup */}
      <FullscreenOverlay isOpen={showDemo} onClose={() => setShowDemo(false)} title="HubSpot CRM Demo">
        <HubSpotDemoViewer />
      </FullscreenOverlay>
    </>
  );
};
