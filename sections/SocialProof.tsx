import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { TrendingUp, Shield, Play, VolumeX } from 'lucide-react';

const milestones = [
  { year: '2020', revenue: '€0M', label: 'Start', color: 'bg-brand-green/20' },
  { year: '2021', revenue: '€2M', label: 'Product-market fit', color: 'bg-brand-green/30' },
  { year: '2022', revenue: '€5M', label: 'Eerste scale-up', color: 'bg-brand-green/50' },
  { year: '2023', revenue: '€10M', label: 'Versnelling', color: 'bg-brand-green/70' },
  { year: '2024', revenue: '€25M', label: 'Marktleider', color: 'bg-brand-green' },
];

const clientLogos = [
  { name: 'FLOER', logo: '/logos/floer-logo-D86of5Xo.png' },
  { name: 'Wovar', logo: '/logos/Wovar-logo-zwart.png' },
  { name: 'Repos', logo: '/logos/reposlogo.svg' },
  { name: 'BMTEC', logo: '/logos/bmtec-logo-B-7ZPvKy.png' },
  { name: 'Royal De Vries', logo: '/logos/royal-de-vries-logo-DE5HruD_.png' },
  { name: 'JC-Electronics', logo: '/logos/jc-logo-hNkYV-H9.png' },
  { name: 'Scholma', logo: '/logos/scholma-logo-CzDUu-0H.webp' },
  { name: 'Marlan', logo: '/logos/marlan logo.png' },
];

export const SocialProof: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [activeTimeline, setActiveTimeline] = useState(0);

  // Eigen bedrijf timeline animation
  useEffect(() => {
    if (isInView) {
      const timers = milestones.map((_, i) =>
        setTimeout(() => setActiveTimeline(i + 1), 1000 + i * 600)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  // Auto-play preview muted
  useEffect(() => {
    if (isInView && previewRef.current) {
      previewRef.current.currentTime = 0;
      previewRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center">
      {/* Background shape */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-0 left-0 w-[50vw] h-[40vh] bg-brand-green/10 z-0"
        style={{ clipPath: 'polygon(0 100%, 0 30%, 80% 100%)' }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-black uppercase leading-none mb-4"
        >
          Bewezen <span className="text-brand-green">resultaat</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-xl mb-8 max-w-xl"
        >
          Onze klanten spreken voor zich. Meetbare groei, keer op keer.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Video testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer" onClick={() => setShowVideo(true)}>
              {/* Auto-play preview (first 10 sec, muted) */}
              <video
                ref={previewRef}
                src="/ZWARTEKRAAI_WOVAR_FINAL_SUBS.mp4"
                muted
                playsInline
                className="w-full aspect-video object-cover"
                onTimeUpdate={(e) => {
                  if ((e.target as HTMLVideoElement).currentTime > 10) {
                    (e.target as HTMLVideoElement).currentTime = 0;
                  }
                }}
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-brand-green rounded-full flex items-center justify-center shadow-lg"
                >
                  <Play className="w-8 h-8 text-black ml-1" />
                </motion.div>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <VolumeX className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-xs">Klik voor geluid</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="bg-brand-pink rounded-full px-3 py-1">
                <span className="text-black font-bold text-xs uppercase">Case Study: Wovar</span>
              </div>
              <span className="text-gray-600 text-sm">Omzet verdubbeld met Zwarte Kraai</span>
            </div>
          </motion.div>

          {/* Right - Eigen bedrijf Timeline + Stats */}
          <div>
            {/* Eigen bedrijf growth timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-xl mb-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-brand-green" />
                <span className="text-brand-purple font-black text-sm uppercase">Eigen Bedrijf Groei-tijdlijn</span>
              </div>

              {/* Horizontal timeline */}
              <div className="relative">
                {/* Progress line */}
                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${(activeTimeline / milestones.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-brand-green rounded-full"
                  />
                </div>

                <div className="flex justify-between relative">
                  {milestones.map((m, index) => (
                    <motion.div
                      key={m.year}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: activeTimeline > index ? 1 : 0.3,
                        y: activeTimeline > index ? 0 : 10,
                      }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className={`w-7 h-7 rounded-full ${activeTimeline > index ? m.color : 'bg-gray-200'} flex items-center justify-center mb-2 transition-colors`}>
                        <span className="text-black text-[10px] font-black">&euro;</span>
                      </div>
                      <p className="text-brand-purple font-black text-sm">{m.revenue}</p>
                      <p className="text-gray-600 text-xs font-bold">{m.year}</p>
                      <p className="text-gray-500 text-[10px] mt-1">{m.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 15+ klanten with logo strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-4 shadow-lg"
            >
              <div className="text-brand-purple font-black text-3xl text-center mb-2">15+</div>
              <p className="text-gray-600 text-xs font-bold text-center mb-3">Klanten geholpen</p>
              {/* Client logo thumbnail strip */}
              <div className="flex flex-wrap justify-center items-center gap-2">
                {clientLogos.map((client, index) => (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="bg-gray-50 rounded-lg px-2 py-1.5 flex items-center justify-center"
                    style={{ minWidth: '60px', height: '32px' }}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-5 max-w-[55px] w-auto object-contain opacity-70"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Security & Compliance Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-brand-purple/5 border border-brand-purple/20 rounded-xl px-4 py-3 mt-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-brand-green" />
                <p className="text-brand-purple font-bold text-sm">Beveiliging & Compliance</p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <p className="text-gray-600 text-[10px]"><span className="text-brand-green font-bold">NDA</span> &mdash; Strikte geheimhouding</p>
                <p className="text-gray-600 text-[10px]"><span className="text-brand-green font-bold">AVG</span> &mdash; Privacy & regelgeving</p>
                <p className="text-gray-600 text-[10px]"><span className="text-brand-green font-bold">ISO 27001</span> &mdash; Informatiebeveiliging</p>
                <p className="text-gray-600 text-[10px]"><span className="text-brand-green font-bold">SSL</span> &mdash; Versleuteld dataverkeer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src="/ZWARTEKRAAI_WOVAR_FINAL_SUBS.mp4"
                className="w-full rounded-2xl shadow-2xl"
                autoPlay
                onEnded={() => setShowVideo(false)}
                controls
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
