import { ALL_SLIDE_KEYS, TOOL_SLIDES, TEAM_MEMBERS, type ClientConfig } from '../types';

export const npiPreset: ClientConfig = {
  clientName: 'NPI BV',
  clientLogo: 'https://www.npibv.com/app/themes/npi/assets/img/logo.svg',
  clientBackgroundImage: '',
  presentationTitle: 'Van Klantdata naar Groei',
  presentationSubtitle: 'Voordat we iets laten zien, zijn wij vooral benieuwd naar jullie. Want dit gesprek gaat over NPI — niet over ons.',

  // CRM & ERP context
  crmSystem: 'HubSpot',
  erpSystem: 'Cash',
  hasCRM: false,

  // Branch & client type
  branch: 'handel',
  hasResellers: false,
  clientTypeLabel: 'zakelijke klanten',

  // Welcome slide questions — direct gebaseerd op HubSpot & vragenlijst data
  welcomeQuestions: [
    'Van jullie 350 klanten hebben er 130 maar 1x besteld. Weten jullie wie dat zijn?',
    'Als Hanneke morgen weggaat — hoe makkelijk is het dan om haar klantkennis over te dragen?',
    'Jullie leveren in Sri Lanka en Bangkok — hoe volgen jullie die internationale accounts nu op?',
  ],

  // B2B Value segments — gebaseerd op NPI productportfolio
  segments: [
    { icon: 'Factory', label: 'Folieoplossingen', sublabel: '35% omzet — vijverfolies, bassinfolies, landbouwfolie' },
    { icon: 'Globe', label: 'Tuinbouwproducten', sublabel: '37% omzet — grondcover, bindmateriaal, gereedschap' },
    { icon: 'Building2', label: 'Wateropslag', sublabel: '28% omzet — silo linings, tank covers, waterbekkens' },
  ],

  // New clients steps
  newClientSteps: [
    { icon: 'Search', text: 'Nieuwe zakelijke klanten identificeren via data — proactief in plaats van reactief' },
    { icon: 'Target', text: 'Gerichte outreach naar key accounts in Friesland en internationaal' },
    { icon: 'Mail', text: 'Geautomatiseerde opvolging na beurzen, events en eerste contactmomenten' },
    { icon: 'Phone', text: 'Salesteam op het juiste moment bij de juiste klant — met inzicht uit HubSpot' },
  ],

  // Repeat purchases
  repeatPurchaseText: 'Klantdata uit Cash koppelen aan HubSpot. Automatisch signaleren wanneer een klant wegdrijft of wanneer een herhalingsaankoop logisch is.',
  dataSourceLabel: 'Cash',

  // Approach phases
  approachPhases: [
    {
      title: 'Analyse',
      subtitle: 'Situatie in kaart brengen',
      items: [
        'Cash data analyseren: klantgedrag, slapende accounts, omzetpatronen',
        'Huidige werkwijze Hanneke & team in kaart brengen',
        'Quick wins bepalen: de 130 slapende klanten als startpunt',
      ],
    },
    {
      title: 'HubSpot Implementatie',
      subtitle: 'CRM inrichten en vullen',
      items: [
        'HubSpot inrichten: pipelines per segment (Folie, Tuinbouw, Wateropslag)',
        'Cash data migreren: alle 350 klanten met orderhistorie',
        '3CX-integratie: alle gesprekken automatisch gelogd in HubSpot',
      ],
    },
    {
      title: 'Training',
      subtitle: 'Team leert HubSpot en de methodiek',
      items: [
        'Praktisch, direct toepasbaar op de vloer in Tzummarum',
        'Hanneke als CRM-verantwoordelijke centraal',
        'Salesteam en binnendienst meegenomen',
      ],
    },
    {
      title: 'Optimalisatie',
      subtitle: 'Continu verbeteren',
      items: [
        'Slapende klanten campagnes draaien en bijsturen',
        'Internationale accounts (Sri Lanka, Bangkok) in aparte pipeline',
        'Continue begeleiding tot het resultaat er staat',
      ],
    },
  ],

  // Quote automation
  quoteAutomationSubtitle: 'Geautomatiseerd offerteproces voor zakelijke klanten',

  // Lead pipeline
  leadDistributionLabel: 'Per segment',

  // Package & pricing
  package: 'full',
  salesCount: 3,

  // Presenter: Erwin — hij heeft het gesprek gevoerd met Hanneke
  presenter: TEAM_MEMBERS[0], // Erwin Dijkstra

  // Slides: zonder-crm set (geen AIAnalysis want die vereist bestaand CRM)
  enabledSlides: ALL_SLIDE_KEYS.filter(key =>
    !TOOL_SLIDES.includes(key as any) && key !== 'AIAnalysis'
  ),
};
