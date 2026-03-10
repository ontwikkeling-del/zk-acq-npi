import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface DiscussionPromptProps {
  currentSection: number;
  isEnabled?: boolean;
}

interface PollOption {
  label: string;
  emoji?: string;
}

interface Prompt {
  type: 'reflection' | 'poll';
  text: string;
  options?: PollOption[];
}

// Strategic prompts mapped to slide indices
const prompts: Record<number, Prompt> = {
  1: {
    type: 'reflection',
    text: 'Hoe ziet jullie huidige salesproces eruit? Is dat meer proactief of reactief?',
  },
  4: {
    type: 'reflection',
    text: 'Als je kijkt naar jullie huidige systemen en processen, wat werkt goed en wat kan beter?',
  },
  8: {
    type: 'reflection',
    text: 'Hoe houden jullie nu bij wanneer een klant toe is aan een herbestelling?',
  },
  10: {
    type: 'reflection',
    text: 'Welke cijfers zou je het liefst elke maandag op je bureau hebben liggen?',
  },
  11: {
    type: 'poll',
    text: 'Wat kost jullie salesteam nu de meeste tijd?',
    options: [
      { label: 'Handmatig opvolgen van leads en beurzen', emoji: '📋' },
      { label: 'Klantinfo opzoeken in het CRM', emoji: '🔍' },
      { label: 'Offertes en samples coordineren', emoji: '📦' },
    ],
  },
  13: {
    type: 'reflection',
    text: 'Via welke kanalen komen nieuwe leads nu binnen? Website, beurzen, netwerk?',
  },
  15: {
    type: 'reflection',
    text: 'Als een prospect een aanvraag doet, hoe snel wordt die nu opgepakt?',
  },
  19: {
    type: 'poll',
    text: 'Hoe verloopt het offerteproces bij jullie nu?',
    options: [
      { label: 'Grotendeels handmatig', emoji: '✍️' },
      { label: 'Deels geautomatiseerd', emoji: '⚙️' },
      { label: 'We willen dit verbeteren', emoji: '🚀' },
    ],
  },
};

export const DiscussionPrompt: React.FC<DiscussionPromptProps> = ({ currentSection, isEnabled = false }) => {
  const prompt = prompts[currentSection];
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [dismissed, setDismissed] = useState<Record<number, boolean>>({});

  if (!isEnabled || !prompt || dismissed[currentSection]) return null;

  const handleSelect = (label: string) => {
    setSelectedOptions(prev => ({ ...prev, [currentSection]: label }));
  };

  const selected = selectedOptions[currentSection];

  return (
    <AnimatePresence>
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="fixed bottom-6 right-24 z-40 max-w-xs"
      >
        <div className="bg-white/95 backdrop-blur-md border border-brand-purple/15 rounded-2xl p-5 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle className="w-4 h-4 text-brand-green" />
              </motion.div>
              <span className="text-brand-green font-bold text-xs uppercase tracking-wider">
                {prompt.type === 'poll' ? 'Vraag voor Oliehoorn' : 'Bespreekpunt'}
              </span>
            </div>
            <button
              onClick={() => setDismissed(prev => ({ ...prev, [currentSection]: true }))}
              className="text-gray-300 hover:text-gray-500 text-xs transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Question */}
          <p className="text-brand-purple font-medium text-sm leading-relaxed mb-3">
            {prompt.text}
          </p>

          {/* Poll options */}
          {prompt.type === 'poll' && prompt.options && (
            <div className="space-y-2">
              {prompt.options.map((option) => (
                <motion.button
                  key={option.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option.label)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    selected === option.label
                      ? 'bg-brand-green/15 border border-brand-green/40 text-brand-green'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-brand-purple/20'
                  }`}
                >
                  <span>{option.emoji}</span>
                  <span>{option.label}</span>
                  {selected === option.label && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </motion.button>
              ))}
            </div>
          )}

          {/* Spacer for reflection prompts */}
          {prompt.type === 'reflection' && (
            <div className="h-1" />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
