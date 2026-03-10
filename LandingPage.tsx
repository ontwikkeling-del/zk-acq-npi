import React from 'react';
import { Presentation, FileText, BookOpen } from 'lucide-react';

const cards = [
  {
    title: 'Sales Deck',
    description: 'Korte overzichtspresentatie voor print en direct versturen.',
    icon: FileText,
    href: '/salesdeck/personalizer.html',
    color: 'brand-accent',
    gradient: 'from-brand-accent/20 to-brand-accent/5',
    iconBg: 'bg-brand-accent/15',
    iconColor: 'text-brand-accent',
  },
  {
    title: 'Acquisitie Presentatie',
    description: 'Interactieve presentatie met alle slides, settings en PDF export.',
    icon: Presentation,
    href: '/acquisitie',
    color: 'brand-green',
    gradient: 'from-brand-green/20 to-brand-green/5',
    iconBg: 'bg-brand-green/15',
    iconColor: 'text-brand-green',
  },
  {
    title: 'Samenvattingen',
    description: 'Gepersonaliseerde follow-up PDF generator per klant.',
    icon: BookOpen,
    href: '/samenvatting/',
    color: 'brand-pink',
    gradient: 'from-brand-pink/20 to-brand-pink/5',
    iconBg: 'bg-brand-pink/15',
    iconColor: 'text-brand-pink',
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-16">
        <img
          src="/zk-logo-full.png"
          alt="Zwarte Kraai"
          className="h-32 mx-auto mb-8"
        />
        <h1 className="text-4xl md:text-5xl font-black text-brand-purple tracking-tight">
          PRESENTATIE HUB
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Kies een presentatie om te openen
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.title}
              href={card.href}
              className="group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className={`relative z-10 w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-8 h-8 ${card.iconColor}`} />
              </div>

              <h2 className="relative z-10 text-xl font-bold text-brand-purple mb-2">
                {card.title}
              </h2>
              <p className="relative z-10 text-sm text-gray-500 leading-relaxed">
                {card.description}
              </p>

              {/* Arrow indicator */}
              <div className="relative z-10 mt-6 text-gray-300 group-hover:text-brand-purple transition-colors">
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <p className="mt-16 text-xs text-gray-300 tracking-widest uppercase">
        Zwarte Kraai &mdash; CRM & Sales Consultancy
      </p>
    </div>
  );
};
