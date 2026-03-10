import { ALL_SLIDE_KEYS, TOOL_SLIDES, TEAM_MEMBERS, type ClientConfig } from '../types';

export const metCrmPreset: ClientConfig = {
  // === VUL IN PER KLANT ===
  clientName: '[Klantnaam]',
  clientLogo: '',
  clientBackgroundImage: '',
  presentationTitle: 'Data-gedreven Groei',
  presentationSubtitle: 'Voordat we iets laten zien, zijn wij vooral benieuwd naar jullie. Want dit gesprek gaat over [Klantnaam] — niet over ons.',

  // CRM & ERP context
  crmSystem: '[CRM-systeem]',
  erpSystem: '[ERP-systeem]',
  hasCRM: true,

  // Branch & client type
  branch: '',
  hasResellers: false,
  clientTypeLabel: 'zakelijke klanten',

  // Welcome slide questions
  welcomeQuestions: [
    'Hoe ervaren jullie het werken met [CRM-systeem] op dit moment — wat gaat goed, waar lopen jullie tegenaan?',
    'Hoe meten jullie nu het effect van jullie salesactiviteiten bij eindklanten?',
    'Bij langlopende offertetrajecten — hoe houden jullie daar nu grip op?',
  ],

  // B2B Value segments — pas aan per klant
  segments: [
    { icon: 'ShoppingBag', label: 'Klantsegment A', sublabel: 'Omschrijving segment A' },
    { icon: 'Building2', label: 'Klantsegment B', sublabel: 'Omschrijving segment B' },
    { icon: 'Factory', label: 'Klantsegment C', sublabel: 'Omschrijving segment C' },
  ],

  // New clients steps
  newClientSteps: [
    { icon: 'Search', text: 'Nieuwe zakelijke klanten identificeren via data — proactief in plaats van reactief' },
    { icon: 'Target', text: 'Gerichte outreach naar key accounts met gepersonaliseerde benadering' },
    { icon: 'Mail', text: 'Geautomatiseerde opvolging na beurzen, events en eerste contactmomenten' },
    { icon: 'Phone', text: 'Salesteam op het juiste moment bij de juiste klant — met de juiste data uit [CRM-systeem]' },
  ],

  // Repeat purchases
  repeatPurchaseText: 'Jullie data uit [CRM-systeem] en [ERP-systeem] koppelen aan slimme AI. Automatisch bepalen wanneer er contact opgenomen moet worden voor een herhalingsaankoop.',
  dataSourceLabel: 'CRM',

  // Approach phases
  approachPhases: [
    {
      title: 'Analyse',
      subtitle: 'Situatie in kaart brengen',
      items: [
        'Waar lekt omzet? Waar zit de inefficientie?',
        'Huidige processen en systemen doorlichten',
        'Quick wins en prioriteiten bepalen',
      ],
    },
    {
      title: 'Inrichting',
      subtitle: 'Koppelingen en workflows',
      items: [
        '[CRM-systeem] koppelen aan dashboards en signalen',
        'Data uit [ERP-systeem] ontsluiten en synchroniseren',
        'Workflows en automatische acties inrichten',
      ],
    },
    {
      title: 'Training',
      subtitle: 'Team leert de methodiek',
      items: [
        'Praktisch, direct toepasbaar',
        'Op de werkvloer, niet in een zaaltje',
        'Salesteam en binnendienst',
      ],
    },
    {
      title: 'Optimalisatie',
      subtitle: 'Continu verbeteren',
      items: [
        'Data analyseren en bijsturen',
        'Scripts, flows en dashboards optimaliseren',
        'Continue begeleiding tot het resultaat er staat',
      ],
    },
  ],

  // Quote automation
  quoteAutomationSubtitle: 'Geautomatiseerd offerteproces voor zakelijke klanten',

  // Lead pipeline
  leadDistributionLabel: 'Per regio',

  // Package & pricing
  package: 'full',
  salesCount: 3,

  // Presenter on closing slide
  presenter: TEAM_MEMBERS[0], // Erwin Dijkstra default

  // All slides enabled except individual tool slides (accessible via FlowsAutomation)
  enabledSlides: ALL_SLIDE_KEYS.filter(key => !TOOL_SLIDES.includes(key as any)),
};
