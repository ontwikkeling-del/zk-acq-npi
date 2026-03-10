// Shared types and constants for the presentation config

export interface Presenter {
  name: string;
  role: string;
  email: string;
  phone: string;
  photo: string;
}

export interface ClientConfig {
  // Basics
  clientName: string;
  clientLogo: string;
  clientBackgroundImage: string;
  presentationTitle: string;
  presentationSubtitle: string;

  // CRM & ERP context
  crmSystem: string;
  erpSystem: string;
  hasCRM: boolean;

  // Branch & client type
  branch: string;
  hasResellers: boolean;
  clientTypeLabel: string; // "zakelijke klanten", "dealers en resellers", etc.

  // Welcome slide questions
  welcomeQuestions: string[];

  // B2B Value segments
  segments: Array<{
    icon: 'ShoppingBag' | 'Building2' | 'Factory' | 'Store' | 'Truck' | 'Globe';
    label: string;
    sublabel: string;
  }>;

  // New clients steps
  newClientSteps: Array<{
    icon: 'Search' | 'Target' | 'Mail' | 'Phone';
    text: string;
  }>;

  // Repeat purchases
  repeatPurchaseText: string;
  dataSourceLabel: string;

  // Approach phases (Packages slide)
  approachPhases: Array<{
    title: string;
    subtitle: string;
    items: string[];
  }>;

  // Quote automation subtitle
  quoteAutomationSubtitle: string;

  // Lead pipeline stats label
  leadDistributionLabel: string;

  // Presenter on closing slide
  presenter: Presenter;

  // Package & pricing
  package: 'full' | 'lite';
  salesCount: number;

  // Slide visibility
  enabledSlides: string[];
}

// --- Template resolution ---
// Replaces [CRM-systeem], [ERP-systeem], [Klantnaam] placeholders at render time
export function resolveTemplate(text: string, cfg: ClientConfig): string {
  return text
    .replace(/\[CRM-systeem\]/g, cfg.crmSystem || '[CRM-systeem]')
    .replace(/\[ERP-systeem\]/g, cfg.erpSystem || '[ERP-systeem]')
    .replace(/\[Klantnaam\]/g, cfg.clientName || '[Klantnaam]');
}

// --- Branch system ---
export interface BranchOption {
  value: string;
  label: string;
}

export const BRANCHES: BranchOption[] = [
  { value: '', label: 'Overig / Handmatig' },
  { value: 'food', label: 'Food & Beverages' },
  { value: 'productie', label: 'Productie & Industrie' },
  { value: 'bouw', label: 'Bouw & Installatie' },
  { value: 'techniek', label: 'Techniek & Electronica' },
  { value: 'handel', label: 'Handel & Wholesale' },
  { value: 'agri', label: 'Agri & Tuinbouw' },
  { value: 'dienstverlening', label: 'Zakelijke Dienstverlening' },
];

export interface BranchDefaults {
  segments: ClientConfig['segments'];
  clientTypeLabel: string;
}

export const BRANCH_DEFAULTS: Record<string, BranchDefaults> = {
  food: {
    segments: [
      { icon: 'ShoppingBag', label: 'Horeca', sublabel: 'Restaurants, hotels, catering' },
      { icon: 'Building2', label: 'Retail & Supermarkten', sublabel: 'Supermarkten, speciaalzaken' },
      { icon: 'Factory', label: 'Foodservice & Groothandel', sublabel: 'Groothandels, distributeurs' },
    ],
    clientTypeLabel: 'zakelijke klanten',
  },
  productie: {
    segments: [
      { icon: 'Factory', label: 'OEM Klanten', sublabel: 'Original Equipment Manufacturers' },
      { icon: 'Truck', label: 'Distributeurs', sublabel: 'Groothandels en tussenhandel' },
      { icon: 'Building2', label: 'Eindklanten', sublabel: 'Directe afnemers en projecten' },
    ],
    clientTypeLabel: 'zakelijke klanten',
  },
  bouw: {
    segments: [
      { icon: 'Building2', label: 'Aannemers', sublabel: 'Hoofd- en onderaannemers' },
      { icon: 'Globe', label: 'Architecten & Adviseurs', sublabel: 'Ontwerpbureaus, adviseurs' },
      { icon: 'Factory', label: 'Projectontwikkelaars', sublabel: 'Vastgoed en gebiedsontwikkeling' },
    ],
    clientTypeLabel: 'zakelijke klanten',
  },
  techniek: {
    segments: [
      { icon: 'Store', label: 'Resellers', sublabel: 'Value Added Resellers, dealers' },
      { icon: 'Building2', label: 'Systeemintegratoren', sublabel: 'Technische implementatiepartners' },
      { icon: 'Factory', label: 'Eindgebruikers', sublabel: 'Directe klanten en projecten' },
    ],
    clientTypeLabel: 'zakelijke klanten',
  },
  handel: {
    segments: [
      { icon: 'Store', label: 'Retailers', sublabel: 'Fysieke winkels en ketens' },
      { icon: 'Globe', label: 'Online kanalen', sublabel: 'Webshops en marketplaces' },
      { icon: 'Building2', label: 'B2B Accounts', sublabel: 'Zakelijke grootafnemers' },
    ],
    clientTypeLabel: 'zakelijke klanten',
  },
  agri: {
    segments: [
      { icon: 'Factory', label: 'Kwekerijen', sublabel: 'Teelt en productie' },
      { icon: 'Store', label: 'Dealers & Tuincentra', sublabel: 'Verkooppunten en dealers' },
      { icon: 'Truck', label: 'Hoveniers & Aannemers', sublabel: 'Groenvoorziening en aanleg' },
    ],
    clientTypeLabel: 'zakelijke klanten',
  },
  dienstverlening: {
    segments: [
      { icon: 'Building2', label: 'MKB', sublabel: 'Midden- en kleinbedrijf' },
      { icon: 'Factory', label: 'Enterprise', sublabel: 'Grote organisaties' },
      { icon: 'Globe', label: 'Overheid & Non-profit', sublabel: 'Publieke sector' },
    ],
    clientTypeLabel: 'zakelijke klanten',
  },
};

// --- Image utilities ---
export function compressImage(file: File, maxWidth = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// For logos: keep PNG transparency, just resize
export function resizeImage(file: File, maxWidth = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Small enough? Use original
        if (img.width <= maxWidth) {
          resolve(e.target?.result as string);
          return;
        }
        const canvas = document.createElement('canvas');
        const height = (img.height * maxWidth) / img.width;
        canvas.width = maxWidth;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, maxWidth, height);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Pricing calculation
export function calculatePrice(pkg: 'full' | 'lite', salesCount: number): number {
  if (pkg === 'lite') return 2500;
  if (salesCount <= 3) return 3495;
  if (salesCount <= 5) return 4495;
  if (salesCount <= 7) return 5495;
  return 5495;
}

// Team members available as presenters
export const TEAM_MEMBERS: Presenter[] = [
  { name: 'Erwin Dijkstra', role: 'Founder & CEO', email: 'erwin@zwartekraai.nl', phone: '+31 6 38 40 86 84', photo: 'https://zwartekraai.nl/assets/erwin-dijkstra-new-CBI4auj_.jpg' },
  { name: 'Dennis Nijborg', role: 'Founder & CTO', email: 'dennis@zwartekraai.nl', phone: '+31 6 46 36 64 41', photo: 'https://zwartekraai.nl/assets/dennis-nijborg-updated-DwIKalt5.jpg' },
  { name: 'Hoger Hamo', role: 'AI Automation Specialist', email: 'hoger@zwartekraai.nl', phone: '', photo: 'https://zwartekraai.nl/assets/hoger-hamo-JBd-9InU.jpg' },
  { name: 'Migilio Tirtosentono', role: 'Senior Sales Professional & Trainer', email: 'migilio@zwartekraai.nl', phone: '+31 6 23 94 58 09', photo: 'https://zwartekraai.nl/assets/migilio-tirtosentono-updated-C55K0N-i.jpg' },
  { name: 'David Pantophlet', role: 'Head of AI', email: 'david@zwartekraai.nl', phone: '', photo: 'https://zwartekraai.nl/assets/david-pantophlet-updated-fqoY03LJ.jpg' },
  { name: 'Danny Hoekstra', role: 'RevOps Specialist', email: 'danny@zwartekraai.nl', phone: '+31 6 21 57 35 59', photo: '/foto-danny.jpeg' },
];

// All available slide keys in order
export const ALL_SLIDE_KEYS = [
  // Intro & bewijs
  'WelcomeSlide',
  'IntroHook',
  'TrackRecord',
  // Klant-specifiek & framework
  'ClientSituation',
  'MarketOverview',
  'ClientBusinessCase',
  'ThreePillars',
  // Pijlers uitdieping (CRM → AI → Training)
  'CRMPillar',
  'AIAutomationPillar',
  'TrainingPillar',
  // 4 speerpunten
  'B2BValue',
  'ActivePipeline',
  'SleepingClients',
  'MaxClientValue',
  'NewClients',
  // Tools
  'FlowsAutomation',
  // Individuele tools (beschikbaar via FlowsAutomation/B2BValue klik)
  'TradeShows',
  'LeadPipeline',
  'ContactEnricher',
  'AIEnrichment',
  'QRSample',
  'WebsiteTracker',
  'AIAnalysis',
  'QuoteAutomation',
  'LeadGeneration',
  'AudioBuitendienst',
  // Team
  'TeamExpertise',
  // Aanpak & investering
  'Packages',
  'BusinessCase',
  'Pricing',
  // Afsluiting
  'Security',
  'ClientLogos',
  'ClosingCTA',
] as const;

// Tool slides that should be hidden from main scroll (accessible via popups)
export const TOOL_SLIDES: SlideKey[] = [
  'TradeShows', 'LeadPipeline', 'ContactEnricher', 'AIEnrichment',
  'QRSample', 'WebsiteTracker', 'AIAnalysis', 'QuoteAutomation',
  'LeadGeneration', 'AudioBuitendienst',
  'ActivePipeline', 'SleepingClients', 'MaxClientValue', 'NewClients',
  'CRMPillar', 'AIAutomationPillar', 'TrainingPillar',
];

export type SlideKey = typeof ALL_SLIDE_KEYS[number];

// Human-readable names for the settings panel
export const SLIDE_LABELS: Record<SlideKey, string> = {
  WelcomeSlide: 'Welkom & Kennismaking',
  IntroHook: 'Opening Hook',
  TrackRecord: 'Track Record',
  ClientSituation: 'Huidige Situatie',
  MarketOverview: 'De Markt',
  ClientBusinessCase: 'Verhoog de waarde',
  ThreePillars: 'Drie Pijlers',
  CRMPillar: 'CRM — Signalen & Structuur',
  AIAutomationPillar: 'AI & Automatisering',
  TrainingPillar: 'Training — Adoptie & Conversie',
  B2BValue: '4 Speerpunten',
  ActivePipeline: 'Speerpunt 1 — Actief Opvolgen',
  SleepingClients: 'Speerpunt 2 — Slapende Klanten',
  MaxClientValue: 'Speerpunt 3 — Klanten Voller Maken',
  NewClients: 'Speerpunt 4 — Nieuwe Klanten',
  FlowsAutomation: 'Onze Tools',
  TradeShows: 'Beurzen & Events',
  LeadPipeline: 'Lead Pipeline',
  ContactEnricher: 'Contact Verrijker',
  AIEnrichment: 'AI Bedrijfsverrijking',
  QRSample: 'QR Sample Activatie',
  WebsiteTracker: 'Website Lead Tracker',
  AIAnalysis: 'AI Gespreksanalyse',
  QuoteAutomation: 'Offerte Automatisering',
  LeadGeneration: 'Lead Generatie',
  AudioBuitendienst: 'Audio Buitendienst',
  TeamExpertise: 'Specialistische Kennis',
  Packages: '12-Maanden Plan',
  BusinessCase: 'Business Case — Calculator',
  Pricing: 'Jouw Investering',
  Security: 'Beveiliging & Compliance',
  ClientLogos: 'Onze Klanten',
  ClosingCTA: 'Afsluiting',
};

// Slide categories for grouped display in settings
export interface SlideCategory {
  label: string;
  slides: SlideKey[];
}

export const SLIDE_CATEGORIES: SlideCategory[] = [
  {
    label: 'Introductie & Bewijs',
    slides: ['WelcomeSlide', 'IntroHook', 'TrackRecord'],
  },
  {
    label: 'Klant & Framework',
    slides: ['ClientSituation', 'MarketOverview', 'ClientBusinessCase', 'ThreePillars'],
  },
  {
    label: 'Pijlers',
    slides: ['CRMPillar', 'AIAutomationPillar', 'TrainingPillar'],
  },
  {
    label: '4 Speerpunten',
    slides: ['B2BValue', 'ActivePipeline', 'SleepingClients', 'MaxClientValue', 'NewClients'],
  },
  {
    label: 'Tools & Data',
    slides: ['FlowsAutomation', 'TradeShows', 'LeadPipeline', 'ContactEnricher', 'AIEnrichment', 'QRSample', 'WebsiteTracker', 'AIAnalysis', 'QuoteAutomation'],
  },
  {
    label: 'Team',
    slides: ['TeamExpertise'],
  },
  {
    label: 'Aanpak & Investering',
    slides: ['Packages', 'BusinessCase', 'Pricing'],
  },
  {
    label: 'Afsluiting',
    slides: ['Security', 'ClientLogos', 'ClosingCTA'],
  },
];
