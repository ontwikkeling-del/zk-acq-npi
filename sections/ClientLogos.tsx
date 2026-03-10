import React from 'react';
import { motion } from 'framer-motion';

const clients = [
  { name: 'FLOER', logo: '/logos/floer-logo-D86of5Xo.png', url: 'https://floer.nl' },
  { name: 'Royal De Vries', logo: '/logos/royal-de-vries-logo-DE5HruD_.png', url: 'https://royaldevries.com' },
  { name: 'BMTEC', logo: '/logos/bmtec-logo-B-7ZPvKy.png', url: 'https://bmtec.nl' },
  { name: 'Repos', logo: '/logos/reposlogo.svg', url: 'https://repos.energy' },
  { name: 'No Boring Suitcases', logo: '/logos/noboringsuitcases logo.png', url: 'https://noboringsuitcases.com' },
  { name: 'Chocolade Bezorgd', logo: '/logos/chocobezorgd-logo-B5U2XKA9.png', url: 'https://chocoladebezorgd.nl' },
  { name: 'De Vries Trappen', logo: '/logos/de vries trappen.svg', url: 'https://devriestrappen.nl' },
  { name: 'JC-Electronics', logo: '/logos/jc-logo-hNkYV-H9.png', url: 'https://jc-electronics.com' },
  { name: 'Kunstgras-online.nl', logo: '/logos/kunstgrasonline logo.svg', url: 'https://kunstgras-online.nl' },
  { name: 'Wovar', logo: '/logos/Wovar-logo-zwart.png', url: 'https://wovar.nl' },
  { name: 'Horecabier.nl', logo: '/logos/horecabier logo.png', url: 'https://horecabier.nl' },
  { name: 'Marlan', logo: '/logos/marlan logo.png', url: 'https://marlan.nl' },
  { name: 'Scholma', logo: '/logos/scholma-logo-CzDUu-0H.webp', url: 'https://scholma.nl' },
  { name: 'Fotocadeau.nl', logo: '/logos/fotocadeau logo.png', url: 'https://fotocadeau.nl' },
];

export const ClientLogos: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 text-brand-purple"
        >
          Wij werken met trots <span className="text-brand-green">voor</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base mb-4"
        >
          Neem gerust contact op met onze klanten ter referentie
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-brand-purple/5 border border-brand-purple/10 rounded-2xl p-8"
        >
          <div className="flex flex-wrap justify-center items-center gap-5">
            {clients.map((client, index) => (
              <motion.a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.03 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white shadow-sm border border-gray-100 rounded-xl px-5 py-4 cursor-pointer hover:border-brand-green/30 transition-all flex items-center justify-center"
                style={{ minWidth: '130px', height: '55px' }}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className={`w-auto object-contain opacity-70 ${client.name === 'Horecabier.nl' ? 'h-20 max-w-[160px]' : 'h-7 max-w-[110px]'}`}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
