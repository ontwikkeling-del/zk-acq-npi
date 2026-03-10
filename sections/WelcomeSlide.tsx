import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { config } from '../clientConfig';
import { resolveTemplate } from '../types';

export const WelcomeSlide: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center">
      {/* Optional client background image */}
      {config.clientBackgroundImage && (
        <div className="absolute inset-0">
          <img
            src={config.clientBackgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/88 to-white/95" />
        </div>
      )}
      {/* Fallback: subtle gradient background */}
      {!config.clientBackgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f5ff] via-white to-[#f8f5ff]" />
      )}

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/85 backdrop-blur-md shadow-lg border border-gray-100 rounded-3xl p-8 md:p-12"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <img src="/zk-logo-full.png" alt="Zwarte Kraai" className="h-20 opacity-90" />
            {config.clientLogo && (
              <>
                <span className="text-brand-purple/20 text-2xl font-light">&times;</span>
                <img src={config.clientLogo} alt={config.clientName} className="h-16" />
              </>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 text-brand-purple">
              <span className="text-brand-green">{config.presentationTitle.split(' ')[0]}</span>{' '}
              {config.presentationTitle.split(' ').slice(1).join(' ')}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {resolveTemplate(config.presentationSubtitle, config)}
            </p>
          </div>

          {/* Questions removed per feedback */}
        </motion.div>
      </div>
    </section>
  );
};
