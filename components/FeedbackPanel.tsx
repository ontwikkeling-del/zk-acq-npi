import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquarePlus, X, Download, Trash2, Check } from 'lucide-react';

const FEEDBACK_KEY = 'v4-slide-feedback';

interface FeedbackPanelProps {
  currentSlideKey: string;
  slideIndex: number;
  totalSlides: number;
}

function loadFeedback(): Record<string, string> {
  try {
    const saved = localStorage.getItem(FEEDBACK_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveFeedback(data: Record<string, string>) {
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(data));
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ currentSlideKey, slideIndex, totalSlides }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, string>>(loadFeedback);
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  // Load existing feedback for current slide when opening or switching slides
  useEffect(() => {
    setText(feedback[currentSlideKey] || '');
    setSaved(false);
  }, [currentSlideKey, isOpen]);

  const feedbackCount = Object.values(feedback).filter(v => (v as string).trim()).length;

  const handleSave = () => {
    const updated = { ...feedback };
    if (text.trim()) {
      updated[currentSlideKey] = text.trim();
    } else {
      delete updated[currentSlideKey];
    }
    setFeedback(updated);
    saveFeedback(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleExport = () => {
    const entries = Object.entries(feedback).filter(([, v]) => (v as string).trim());
    if (entries.length === 0) return;

    const lines = entries.map(([key, val]) => `=== ${key} (slide) ===\n${val}`).join('\n\n');
    const header = `Feedback presentatie - ${new Date().toLocaleDateString('nl-NL')}\n${'='.repeat(50)}\n\n`;
    const blob = new Blob([header + lines + '\n'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-presentatie-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setFeedback({});
    setText('');
    saveFeedback({});
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-32 w-10 h-10 backdrop-blur-sm shadow-lg border rounded-full flex items-center justify-center z-40 hover:scale-110 transition-all ${
          feedbackCount > 0
            ? 'bg-brand-yellow/20 border-brand-yellow/40'
            : 'bg-white/80 border-gray-200 hover:bg-white'
        }`}
        title="Feedback geven"
      >
        <MessageSquarePlus className={`w-4 h-4 ${feedbackCount > 0 ? 'text-brand-yellow' : 'text-brand-purple'}`} />
        {feedbackCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-yellow text-brand-purple text-[9px] font-black rounded-full flex items-center justify-center">
            {feedbackCount}
          </span>
        )}
      </button>

      {/* Panel overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-purple border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h3 className="text-white font-bold text-sm">Feedback</h3>
                  <p className="text-white/40 text-xs">Slide {slideIndex + 1}/{totalSlides}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Current slide */}
              <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
                <div>
                  <p className="text-brand-green font-bold text-xs uppercase tracking-wider mb-2">
                    {currentSlideKey}
                  </p>
                  <textarea
                    value={text}
                    onChange={e => { setText(e.target.value); setSaved(false); }}
                    placeholder="Typ hier je feedback voor deze slide..."
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm placeholder-white/30 resize-none focus:outline-none focus:border-brand-green/50 transition"
                  />
                  <button
                    onClick={handleSave}
                    className={`mt-2 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition ${
                      saved
                        ? 'bg-brand-green/20 text-brand-green'
                        : 'bg-brand-green text-brand-purple hover:bg-brand-green/90'
                    }`}
                  >
                    {saved ? <><Check className="w-3 h-3" /> Opgeslagen</> : 'Opslaan'}
                  </button>
                </div>

                {/* All feedback overview */}
                {feedbackCount > 0 && (
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white/60 font-bold text-xs uppercase tracking-wider mb-3">
                      Alle feedback ({feedbackCount} slides)
                    </p>
                    <div className="space-y-2">
                      {Object.entries(feedback)
                        .filter(([, v]) => (v as string).trim())
                        .map(([key, val]) => (
                          <div key={key} className="bg-white/5 rounded-lg p-3">
                            <p className="text-brand-accent text-[10px] font-bold uppercase">{key}</p>
                            <p className="text-white/70 text-xs mt-1 whitespace-pre-wrap">{val}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer actions */}
              <div className="p-4 border-t border-white/10 flex gap-2">
                <button
                  onClick={handleExport}
                  disabled={feedbackCount === 0}
                  className="flex-1 px-4 py-2.5 bg-brand-green text-brand-purple rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-green/90 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .txt
                </button>
                <button
                  onClick={handleClear}
                  disabled={feedbackCount === 0}
                  className="px-4 py-2.5 bg-white/10 text-white/60 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 hover:text-red-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Wis
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
