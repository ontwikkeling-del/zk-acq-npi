import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, Calendar, Camera } from 'lucide-react';

const takeaways = [
  '90% van bedrijven benut niet alle commerciele kansen - jullie hoeven daar niet bij te horen',
  'CRM + AI + Training: drie pijlers die samen meer doen dan apart',
  'Bewezen bij 15+ B2B bedrijven: gemiddeld \u20AC8 terug per \u20AC1 ge\u00EFnvesteerd in CRM',
  'Risicovrij starten met een 90-dagen pilot',
  'Data is het nieuwe goud - maar alleen als je het activeert',
];

export const TakeHome: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden bg-gray-50 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(204,255,0,0.08)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Key takeaways */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase leading-none mb-4">
                Key <span className="text-brand-green">Takeaways</span>
              </h2>
              <p className="text-gray-600">Maak gerust een foto van deze slide</p>
            </motion.div>

            <div className="space-y-4">
              {takeaways.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Contact + QR */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* QR Code placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-xl mb-6 text-center w-full max-w-sm">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="mb-4"
              >
                {/* QR Code as styled div - replace with actual QR image */}
                <div className="w-48 h-48 mx-auto bg-brand-purple rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-2 bg-white rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 text-brand-purple mx-auto mb-2" />
                      <p className="text-brand-purple font-black text-xs uppercase">Plan gesprek</p>
                      <p className="text-gray-500 text-[10px]">Scan QR code</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <p className="text-brand-purple font-black text-sm uppercase">Plan een strategiegesprek</p>
              <p className="text-gray-600 text-xs mt-1">30 minuten, vrijblijvend, op jullie locatie</p>
            </div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-brand-purple/5 border border-brand-purple/20 rounded-xl p-5 w-full max-w-sm"
            >
              <p className="text-brand-purple font-black text-sm uppercase mb-3">Contact</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-green" />
                  <span className="text-gray-700 text-sm">+31 6 12 34 56 78</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-green" />
                  <span className="text-gray-700 text-sm">erwin@zwartekraai.nl</span>
                </div>
              </div>
            </motion.div>

            {/* Camera hint */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-2 mt-4"
            >
              <Camera className="w-4 h-4 text-gray-400" />
              <p className="text-gray-400 text-xs italic">Deel deze slide met je collega's</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 w-full text-center text-gray-600 text-sm uppercase tracking-widest">
        &copy; 2025 Zwarte Kraai. All rights reserved.
      </div>
    </section>
  );
};
