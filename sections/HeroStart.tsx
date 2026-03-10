import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// --- CUSTOMIZE PER CLIENT ---
const CLIENT_LOGO = '/placeholder-logo.svg';
// --- END CUSTOMIZE ---

const FloatingParticle = ({ delay, x, size }: { delay: number; x: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-brand-green/20"
    style={{ left: x, width: size, height: size }}
    initial={{ y: '100vh', opacity: 0 }}
    animate={{ y: '-20vh', opacity: [0, 1, 1, 0] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: 'linear' }}
  />
);

export const HeroStart: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingParticle delay={0} x="10%" size={8} />
        <FloatingParticle delay={2} x="25%" size={12} />
        <FloatingParticle delay={4} x="45%" size={6} />
        <FloatingParticle delay={1} x="65%" size={10} />
        <FloatingParticle delay={3} x="80%" size={8} />
        <FloatingParticle delay={5} x="90%" size={14} />
      </div>

      {/* Green corner shape */}
      <motion.div
        initial={{ x: '100%', y: '-100%' }}
        whileInView={{ x: '0%', y: '0%' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-gradient-to-bl from-brand-green/20 via-brand-green/10 to-transparent z-0"
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 80%, 0 0)' }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
          }}
        >
          {/* Dual Logo: Zwarte Kraai x Klant */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, type: 'spring' } }
            }}
            className="mb-4 flex items-center gap-4"
          >
            <img
              src="/zk-logo-full.png"
              alt="Zwarte Kraai"
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
            <span className="text-brand-purple text-3xl md:text-4xl font-light">&times;</span>
            <img
              src={CLIENT_LOGO}
              alt="Klant logo"
              className="h-14 md:h-18 lg:h-22 w-auto"
            />
          </motion.div>

          {/* Main Title */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-purple leading-tight uppercase">
              Laat jouw<br />
              organisatie<br />
              <span className="text-brand-green relative inline-block">
                vliegen
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 h-3 bg-brand-green/50"
                />
              </span>
            </h1>
          </motion.div>

          {/* Healthcare-specific insight (#1) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5 } }
            }}
            className="mt-3 mb-2"
          >
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl">
              Jouw sales medewerkers besteden slechts <span className="text-brand-pink font-black">30% van hun tijd</span> aan verkopen.
              Wij zorgen dat ze weer doen waar ze goed in zijn &mdash; met slimme tools, structuur en data.
            </p>
            <p className="text-gray-400 text-xs mt-1">Bron: Salesforce State of Sales Report, 2024</p>
          </motion.div>

          {/* ROI Stats Row - Updated with healthcare context */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }
            }}
            className="mt-4 flex flex-wrap gap-6"
          >
            <div className="bg-brand-purple/5 backdrop-blur border border-brand-purple/20 rounded-xl px-6 py-4">
              <div className="text-brand-green font-black text-3xl md:text-4xl">&uarr;</div>
              <p className="text-gray-600 text-sm font-bold uppercase tracking-wider mt-1">Omzetgroei bij vergelijkbare bedrijven</p>
            </div>
            <div className="bg-brand-purple/5 backdrop-blur border border-brand-purple/20 rounded-xl px-6 py-4">
              <div className="text-brand-pink font-black text-3xl md:text-4xl">&#9201;</div>
              <p className="text-gray-600 text-sm font-bold uppercase tracking-wider mt-1">Tijdsbesparing door automatisering</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-sm uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-6 h-6 text-brand-green" />
        </motion.div>
      </motion.div>
    </section>
  );
};
