import { ALL_SLIDE_KEYS, TOOL_SLIDES, TEAM_MEMBERS, type ClientConfig } from '../types';

export const zonderCrmPreset: ClientConfig = {
  // === VUL IN PER KLANT ===
  clientName: '[Klantnaam]',
  clientLogo: '/client-logo.svg',
  clientBackgroundImage: '',
  presentationTitle: 'Van Excel naar Groei',
  presentationSubtitle: 'Voordat we iets laten zien, zijn wij vooral benieuwd naar jullie. Want dit gesprek gaat over [Klantnaam] — niet over ons.',

  // CRM & ERP context
  crmSystem: 'HubSpot',
  erpSystem: '[ERP-systeem]',
  hasCRM: false,

  // Branch & client type
  branch: '',
  hasResellers: false,
  clientTypeLabel: 'zakelijke klanten',

  // Welcome slide questions
  welcomeQuestions: [
    'Hoe houden jullie nu klantgegevens bij — Excel, Outlook, een gedeelde map?',
    'Als een collega ziek is of weggaat — hoe makkelijk is het dan om lopende klanten over te nemen?',
    'Weten jullie precies welke klanten al een tijd niet besteld hebben, of gaat dat op gevoel?',
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
    { icon: 'Phone', text: 'Salesteam op het juiste moment bij de juiste klant — met inzicht uit HubSpot' },
  ],

  // Repeat purchases
  repeatPurchaseText: 'Klantdata in HubSpot koppelen aan slimme AI. Automatisch bepalen wanneer er contact opgenomen moet worden voor een herhalingsaankoop.',
  dataSourceLabel: 'HubSpot',

  // Approach phases — fase 2 = HubSpot implementatie
  approachPhases: [
    {
      title: 'Analyse',
      subtitle: 'Situatie in kaart brengen',
      items: [
        'Waar lekt omzet? Waar zit de inefficientie?',
        'Huidige werkwijze en databronnen in kaart brengen',
        'Quick wins en prioriteiten bepalen',
      ],
    },
    {
      title: 'HubSpot Implementatie',
      subtitle: 'CRM inrichten en vullen',
      items: [
        'HubSpot inrichten: pipelines, properties, dashboards',
        'Bestaande data migreren vanuit Excel/Outlook',
        'Workflows en automatische acties configureren',
      ],
    },
    {
      title: 'Training',
      subtitle: 'Team leert HubSpot en de methodiek',
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

  // All slides enabled except tool slides and AIAnalysis (requires CRM)
  enabledSlides: ALL_SLIDE_KEYS.filter(key =>
    !TOOL_SLIDES.includes(key as any) && key !== 'AIAnalysis'
  ),
};
