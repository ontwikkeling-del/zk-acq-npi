import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, Server, CheckCircle } from 'lucide-react';

const items = [
  { icon: FileCheck, title: 'ISO 27001 & SOC 2', text: 'Alle tools die wij inzetten zijn volledig ISO 27001 en SOC 2 gecertificeerd', color: 'brand-green' },
  { icon: Shield, title: 'AVG compliant', text: 'Volledige naleving van de AVG en Europese privacywetgeving met Data Processing Agreements', color: 'brand-accent' },
  { icon: Lock, title: 'Versleuteld dataverkeer', text: 'SSL/TLS versleuteling en moderne beveiligingsprotocollen voor al het dataverkeer', color: 'brand-green' },
];

const certifications = [
  'HubSpot: ISO 27001, SOC 2 Type II',
  'Make.com: ISO 27001, SOC 2 Type II',
  'Google Workspace: ISO 27001, SOC 2/3',
];

export const Security: React.FC = () => {
  return (
    <section className="h-screen w-screen snap-start relative overflow-hidden flex items-center justify-center bg-white">
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[130px]" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="mb-6"
        >
          <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto">
            <Server className="w-8 h-8 text-brand-green" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight mb-4 text-brand-purple"
        >
          Gecertificeerde <span className="text-brand-green">tools</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base mb-10 max-w-2xl mx-auto"
        >
          Alle tools en platformen die wij inzetten zijn volledig ISO en SOC 2 gecertificeerd. Jullie data is in veilige handen.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 bg-${item.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}`} />
              </div>
              <h3 className="text-brand-purple font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-2 bg-brand-green/5 border border-brand-green/15 rounded-full px-4 py-2">
              <CheckCircle className="w-3.5 h-3.5 text-brand-green shrink-0" />
              <span className="text-gray-500 text-xs font-medium">{cert}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
