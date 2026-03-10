import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Settings, StickyNote } from 'lucide-react';
import { FeedbackPanel } from './components/FeedbackPanel';
import { Navigation } from './components/Navigation';
import { DiscussionPrompt } from './components/DiscussionPrompt';
import { PresenterNotes } from './components/PresenterNotes';
import { SettingsPanel } from './components/SettingsPanel';
import { PasswordGate, useShareAuth } from './components/PasswordGate';
import { BusinessCaseProvider } from './BusinessCaseContext';
import { config, ALL_SLIDE_KEYS } from './clientConfig';
import { metCrmPreset, zonderCrmPreset, npiPreset } from './presets';
import type { ClientConfig } from './types';

import { WelcomeSlide } from './sections/WelcomeSlide';
import { IntroHook } from './sections/IntroHook';
import { TrackRecord } from './sections/TrackRecord';
import { ClientSituation } from './sections/ClientSituation';
import { MarketOverview } from './sections/MarketOverview';
import { ClientBusinessCase } from './sections/ClientBusinessCase';
import { ThreePillars } from './sections/ThreePillars';
import { CRMPillar } from './sections/CRMPillar';
import { TrainingPillar } from './sections/TrainingPillar';
import { AIAutomationPillar } from './sections/AIAutomationPillar';
import { BusinessCase } from './sections/BusinessCase';
import { TeamExpertise } from './sections/TeamExpertise';
import { B2BValue } from './sections/B2BValue';
import { NewClients } from './sections/NewClients';
import { MaxClientValue } from './sections/MaxClientValue';
import { ActivePipeline } from './sections/ActivePipeline';
import { SleepingClients } from './sections/SleepingClients';
import { FlowsAutomation } from './sections/FlowsAutomation';
import { TradeShows } from './sections/TradeShows';
import { LeadPipeline } from './sections/LeadPipeline';
import { ContactEnricher } from './sections/ContactEnricher';
import { AIEnrichment } from './sections/AIEnrichment';
import { QRSample } from './sections/QRSample';
import { WebsiteTracker } from './sections/WebsiteTracker';
import { AIAnalysis } from './sections/AIAnalysis';
import { QuoteAutomation } from './sections/QuoteAutomation';
import { LeadGeneration } from './sections/LeadGeneration';
import { AudioBuitendienst } from './sections/AudioBuitendienst';
import { Packages } from './sections/Packages';
import { Pricing } from './sections/Pricing';
import { Security } from './sections/Security';
import { ClientLogos } from './sections/ClientLogos';
import { ClosingCTA } from './sections/ClosingCTA';

// Map slide keys to components
const slideComponentMap: Record<string, React.FC> = {
  WelcomeSlide, IntroHook, TrackRecord,
  ClientSituation, MarketOverview, ClientBusinessCase,
  ThreePillars, CRMPillar, TrainingPillar, AIAutomationPillar, BusinessCase,
  TeamExpertise, Packages,
  B2BValue, ActivePipeline, SleepingClients, NewClients, MaxClientValue,
  FlowsAutomation, TradeShows, LeadPipeline, ContactEnricher,
  AIEnrichment, QRSample, WebsiteTracker, AIAnalysis, QuoteAutomation,
  LeadGeneration, AudioBuitendienst,
  Pricing, Security, ClientLogos, ClosingCTA,
};

const STORAGE_KEY = 'v5-slide-config';
const PRESET_KEY = 'v5-active-preset';
const CONFIG_KEY = 'v5-config-overrides';

function loadSavedSlides(): string[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function loadSavedPreset(): 'met-crm' | 'zonder-crm' | 'npi' {
  try {
    const saved = localStorage.getItem(PRESET_KEY);
    if (saved === 'met-crm') return 'met-crm';
    if (saved === 'zonder-crm') return 'zonder-crm';
    return 'npi'; // NPI is default for this deployment
  } catch {
    return 'npi';
  }
}

function loadSavedConfig(): Partial<ClientConfig> | null {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// Apply active preset on startup, then user overrides on top
const _startupPreset = loadSavedPreset();
if (_startupPreset === 'npi') {
  Object.assign(config, npiPreset);
} else if (_startupPreset === 'zonder-crm') {
  Object.assign(config, zonderCrmPreset);
} else {
  Object.assign(config, metCrmPreset);
}
const savedOverrides = loadSavedConfig();
if (savedOverrides) {
  Object.assign(config, savedOverrides);
}

export default function App({ viewMode = 'presenter' }: { viewMode?: 'share' | 'presenter' }) {
  const isViewOnly = viewMode === 'share';
  const { isShareMode, isAuthenticated } = useShareAuth();
  const [shareAuthed, setShareAuthed] = useState(isAuthenticated);
  const [currentSection, setCurrentSection] = useState(0);
  const [showPresenterNotes, setShowPresenterNotes] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activePreset, setActivePreset] = useState<'met-crm' | 'zonder-crm' | 'npi'>(loadSavedPreset);
  const [enabledSlides, setEnabledSlides] = useState<string[]>(
    () => loadSavedSlides() || config.enabledSlides
  );
  // Counter to force re-render when config object is mutated
  const [configVersion, setConfigVersion] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Engagement tracking
  const engagementRef = useRef<Record<string, number>>({});
  const lastSectionTime = useRef<number>(Date.now());

  // Filter sections based on enabled slides
  const activeSections = useMemo(() => {
    // configVersion dependency ensures re-computation on config changes
    void configVersion;
    return ALL_SLIDE_KEYS
      .filter(key => enabledSlides.includes(key))
      .map(key => ({ key, Component: slideComponentMap[key] }))
      .filter(s => s.Component);
  }, [enabledSlides, configVersion]);

  const totalSections = activeSections.length;

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enabledSlides));
  }, [enabledSlides]);

  useEffect(() => {
    localStorage.setItem(PRESET_KEY, activePreset);
  }, [activePreset]);

  const handleToggleSlide = (slideKey: string) => {
    setEnabledSlides(prev => {
      if (prev.includes(slideKey)) {
        return prev.filter(k => k !== slideKey);
      } else {
        const newEnabled = [...prev, slideKey];
        return ALL_SLIDE_KEYS.filter(k => newEnabled.includes(k));
      }
    });
  };

  const handlePresetChange = (preset: 'met-crm' | 'zonder-crm' | 'npi') => {
    setActivePreset(preset);
    const presetConfig = preset === 'met-crm' ? metCrmPreset : preset === 'npi' ? npiPreset : zonderCrmPreset;
    setEnabledSlides([...presetConfig.enabledSlides]);
    Object.assign(config, presetConfig);
    localStorage.removeItem(CONFIG_KEY);
    setConfigVersion(v => v + 1);
    setCurrentSection(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  };

  const handleReset = () => {
    const presetConfig = activePreset === 'met-crm' ? metCrmPreset : activePreset === 'npi' ? npiPreset : zonderCrmPreset;
    setEnabledSlides([...presetConfig.enabledSlides]);
  };

  const handleConfigChange = (updates: Partial<ClientConfig>) => {
    Object.assign(config, updates);
    // Save overrides to localStorage
    const currentOverrides = loadSavedConfig() || {};
    const merged = { ...currentOverrides, ...updates };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(merged));
    setConfigVersion(v => v + 1);
  };

  const handleExport = () => {
    const exportData = { ...config, enabledSlides };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const clientSlug = config.clientName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    a.href = url;
    a.download = `zk-presentatie-${clientSlug || 'config'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (data: ClientConfig) => {
    // Apply all config values
    Object.assign(config, data);
    // Update slides if present
    if (data.enabledSlides) {
      setEnabledSlides([...data.enabledSlides]);
    }
    // Detect preset based on hasCRM
    const detectedPreset = data.hasCRM ? 'met-crm' : 'zonder-crm';
    setActivePreset(detectedPreset);
    // Save everything to localStorage
    localStorage.setItem(CONFIG_KEY, JSON.stringify(data));
    localStorage.setItem(PRESET_KEY, detectedPreset);
    setConfigVersion(v => v + 1);
    setCurrentSection(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPosition = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPosition / windowHeight);
      if (index !== currentSection && index < totalSections) {
        const timeSpent = Date.now() - lastSectionTime.current;
        const sectionName = activeSections[currentSection]?.key;
        if (sectionName) {
          engagementRef.current[sectionName] = (engagementRef.current[sectionName] || 0) + timeSpent;
        }
        lastSectionTime.current = Date.now();
        setCurrentSection(index);
      }
    }
  };

  const navigateToSection = useCallback((index: number) => {
    if (containerRef.current && index >= 0 && index < totalSections) {
      const target = index * window.innerHeight;
      containerRef.current.scrollTo({
        top: target,
        behavior: 'smooth'
      });
    }
  }, [totalSections]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSettings) return;

      if (e.key === 'n' || e.key === 'N') {
        if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
        e.preventDefault();
        setShowPresenterNotes(prev => !prev);
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToSection(currentSection - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateToSection(totalSections - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, navigateToSection, totalSections, showSettings]);

  // Password gate for all access
  if (!shareAuthed) {
    return (
      <PasswordGate
        clientName={config.clientName}
        clientLogo={config.clientLogo}
        isShareMode={isShareMode}
        onAuthenticated={() => setShareAuthed(true)}
      />
    );
  }

  return (
    <BusinessCaseProvider>
    <div className="relative bg-gray-50 text-brand-purple overflow-hidden">
      <Navigation
        currentSection={currentSection}
        totalSections={totalSections}
        onNavigate={navigateToSection}
      />

      {!isViewOnly && <DiscussionPrompt currentSection={currentSection} isEnabled={showPresenterNotes} />}

      {!isViewOnly && <PresenterNotes
        currentSection={currentSection}
        currentSlideKey={activeSections[currentSection]?.key || ''}
        isVisible={showPresenterNotes}
        onClose={() => setShowPresenterNotes(false)}
      />}

      {/* Feedback panel - hidden in share mode */}
      {!isViewOnly && <FeedbackPanel
        currentSlideKey={activeSections[currentSection]?.key || ''}
        slideIndex={currentSection}
        totalSlides={totalSections}
      />}

      {/* Notes toggle button - hidden in share mode */}
      {!isViewOnly && <button
        onClick={() => setShowPresenterNotes(prev => !prev)}
        className={`fixed bottom-8 right-20 w-10 h-10 backdrop-blur-sm shadow-lg border rounded-full flex items-center justify-center z-40 hover:scale-110 transition-all ${
          showPresenterNotes
            ? 'bg-brand-green/20 border-brand-green/40'
            : 'bg-white/80 border-gray-200 hover:bg-white'
        }`}
        title="Presentatie notities (N)"
      >
        <StickyNote className={`w-4 h-4 ${showPresenterNotes ? 'text-brand-green' : 'text-brand-purple'}`} />
      </button>}

      {!isViewOnly && <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-8 right-8 w-10 h-10 bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200 rounded-full flex items-center justify-center z-40 hover:bg-white hover:scale-110 transition-all"
        title="Instellingen"
      >
        <Settings className="w-4 h-4 text-brand-purple" />
      </button>}

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        enabledSlides={enabledSlides}
        onToggleSlide={handleToggleSlide}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        activePreset={activePreset}
        configValues={config}
        onConfigChange={handleConfigChange}
        onExport={handleExport}
        onImport={handleImport}
      />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {activeSections.map(({ key, Component }) => (
          <div key={`${key}-${configVersion}`} className="snap-start w-full h-screen">
            <Component />
          </div>
        ))}
      </div>
    </div>
    </BusinessCaseProvider>
  );
}
