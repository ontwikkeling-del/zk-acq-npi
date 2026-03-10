import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface CTAProps {
  engagementData?: Record<string, number>;
}

const clients = [
  { name: 'FLOER', logo: '/logos/floer-logo-D86of5Xo.png' },
  { name: 'BMTEC', logo: '/logos/bmtec-logo-B-7ZPvKy.png' },
  { name: 'Wovar', logo: '/logos/Wovar-logo-zwart.png' },
  { name: 'JC-Electronics', logo: '/logos/jc-logo-hNkYV-H9.png' },
  { name: 'No Boring Suitcases', logo: '/logos/noboringsuitcases logo.png' },
  { name: 'Scholma', logo: '/logos/scholma-logo-CzDUu-0H.webp' },
  { name: 'Fotocadeau.nl', logo: '/logos/fotocadeau logo.png' },
  { name: 'Horecabier.nl', logo: '/logos/horecabier logo.png', large: true },
  { name: 'Chocolade Bezorgd', logo: '/logos/chocobezorgd-logo-B5U2XKA9.png' },
  { name: 'Marlan', logo: '/logos/marlan logo.png' },
  { name: 'Royal De Vries', logo: '/logos/royal-de-vries-logo-DE5HruD_.png' },
  { name: 'De Vries Trappen', logo: '/logos/de vries trappen.svg' },
  { name: 'Repos', logo: '/logos/reposlogo.svg' },
  { name: 'Kunstgras-online.nl', logo: '/logos/kunstgrasonline logo.svg' },
];

// --- CUSTOMIZE PER CLIENT ---
const CLIENT_NAME = 'Jouw Bedrijf';
const CONTACT_PERSON = 'Contactpersoon';
const CLIENT_LOGO = '/placeholder-logo.svg';
const CORE_PROMISE = 'Van reactief naar proactief. Klaar om te starten?';
// --- END CUSTOMIZE ---

export const CTA: React.FC<CTAProps> = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex flex-col" style={{ background: '#2a0042' }}>
      {/* Main content - centered */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* ZK Logo large */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <img
              src="/zk-logo-full.png"
              alt="Zwarte Kraai"
              className="h-36 mx-auto"
              style={{ filter: 'invert(1)' }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl font-black uppercase mb-4 text-white leading-tight"
          >
            {CONTACT_PERSON}, samen maken we<br />
            <span style={{ color: '#5bd675' }}>{CLIENT_NAME}</span> onverslaanbaar.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-8"
            style={{ color: '#d1d5db' }}
          >
            {CORE_PROMISE}
          </motion.p>

          {/* Erwin contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 mb-6"
          >
            <img
              src="https://zwartekraai.nl/assets/erwin-dijkstra-new-CBI4auj_.jpg"
              className="w-20 h-20 rounded-full object-cover"
              style={{ border: '4px solid #5bd675' }}
            />
            <div className="text-left text-white">
              <p className="font-black text-2xl">Erwin Dijkstra</p>
              <p className="font-bold" style={{ color: '#5bd675' }}>CEO</p>
            </div>
          </motion.div>

          {/* Contact buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 mb-8"
          >
            <div
              className="font-black px-8 py-4 rounded-xl uppercase text-lg"
              style={{ background: '#5bd675', color: '#2a0042' }}
            >
              +31 6 38 40 86 84
            </div>
            <div
              className="font-black px-8 py-4 rounded-xl uppercase text-lg"
              style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #5bd675', color: '#5bd675' }}
            >
              erwin@zwartekraai.nl
            </div>
          </motion.div>

          {/* Logo footer with slogan */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex justify-center items-center gap-5 mb-4">
              <img src="/zk-logo-full.png" alt="Zwarte Kraai" className="h-20" style={{ filter: 'invert(1)' }} />
              <span className="text-2xl font-light" style={{ color: '#6b7280' }}>&times;</span>
              <img src={CLIENT_LOGO} alt={CLIENT_NAME} className="h-14" />
            </div>
            <p className="text-sm uppercase font-black tracking-widest" style={{ color: '#5bd675' }}>
              Jouw groei. Ons vak.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Client logos bar - bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-8 pb-6"
      >
        <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
          <p className="text-xs font-bold uppercase tracking-wider text-center mb-3" style={{ color: '#6b7280' }}>
            <Users className="w-3.5 h-3.5 inline mr-1" />
            15+ B2B klanten vertrouwen op ons
          </p>
          <div className="grid grid-cols-7 gap-3 items-center">
            {clients.map((client) => (
              <div
                key={client.name}
                className="rounded-xl p-2 flex items-center justify-center h-16"
                style={{ background: 'rgba(255,255,255,0.08)', overflow: client.large ? 'visible' : 'hidden' }}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className={`w-auto object-contain ${client.large ? 'h-24' : 'h-10'}`}
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
