import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { config } from '../clientConfig';

function getPresenterContent(name: string) {
  if (name.startsWith('Migilio')) {
    return {
      quote: (
        <>
          <span className="text-brand-green font-black text-2xl">20 jaar ervaring</span> als sales trainer.
        </>
      ),
      stat: '20+',
      statLabel: 'Jaar sales ervaring',
    };
  }
  if (name.startsWith('Danny')) {
    return {
      quote: (
        <>
          Specialisatie in het <span className="text-brand-green font-black text-2xl">ondersteunen van bedrijven</span> op technologisch vlak.
        </>
      ),
      stat: 'Mens & Tech',
      statLabel: 'Brug tussen mens en techniek',
    };
  }
  // Default: Erwin
  return {
    quote: (
      <>
        Van <span className="text-brand-green font-black text-2xl">0 naar 2 miljoen</span> per maand met deze methode!
      </>
    ),
    stat: '€2M+',
    statLabel: 'Per maand bereikt',
  };
}

export const TrackRecord: React.FC = () => {
  const presenter = config.presenter;
  const content = getPresenterContent(presenter.name);

  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-[#f8f5ff]">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-4"
            >
              Wie wij zijn
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black uppercase leading-tight mb-6 text-brand-purple"
            >
              Proven <span className="text-brand-green">trackrecord</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 mb-6"
            >
              <p className="text-gray-700 text-lg leading-relaxed">
                {content.quote}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 text-center"
            >
              <TrendingUp className="w-10 h-10 text-brand-green mx-auto mb-4" />
              <p className="text-brand-green font-black text-4xl md:text-5xl mb-2">{content.stat}</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">{content.statLabel}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-brand-purple/10 shadow-lg">
              <img src={presenter.photo} alt={presenter.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <p className="text-brand-purple font-bold text-xl">{presenter.name}</p>
              <p className="text-gray-400 text-sm">{presenter.role}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
