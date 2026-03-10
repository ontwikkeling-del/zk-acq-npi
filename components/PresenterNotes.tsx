import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MessageSquare } from 'lucide-react';

interface PresenterNotesProps {
  currentSection: number;
  currentSlideKey: string;
  isVisible: boolean;
  onClose: () => void;
}

interface SlideNote {
  title: string;
  timing: string;
  introQuestions?: string[];
  notes: string[];
  questions: string[];
}

const slideNotes: Record<string, SlideNote> = {
  WelcomeSlide: {
    title: 'Welkom & Kennismaking',
    timing: '3 min',
    notes: [
      'Begin met persoonlijke begroeting',
      'Laat de drie vragen even staan, vraag of ze herkenbaar zijn',
      'Dit is LUISTEREN, niet presenteren',
      'Maak aantekeningen van antwoorden',
    ],
    questions: ['Hoe ziet jullie huidige salesproces eruit?', 'Waar lopen jullie medewerkers tegenaan?'],
  },
  IntroHook: {
    title: 'Opening Hook',
    timing: '1 min',
    notes: [
      '90% statistiek: laat even inwerken',
      'Benadruk: proactief vs reactief is de kern',
      'Koppel aan wat ze net verteld hebben',
    ],
    questions: [],
  },
  TrackRecord: {
    title: 'Proven Track Record',
    timing: '1 min',
    notes: [
      'Van 0 naar 2 miljoen per maand: concrete cijfers',
      '15+ B2B klanten: brede ervaring',
      'Noem een paar klanten die vergelijkbaar zijn',
    ],
    questions: ['Wat zou zulke groei voor jullie betekenen?'],
  },
  CaseStudyWovar: {
    title: 'Klantverhaal Wovar',
    timing: '3 min',
    notes: [
      'Speel de video af — laat Jesse het verhaal vertellen',
      'Wovar: van online schroeven naar €30M+ internationale B2B-webshop',
      'Probleem: wisten niet wie hun klanten waren, team was reactief',
      'Zwarte Kraai pakte het integraal aan: eerst CRM basis, dan automatisering, dan sales training',
      'Resultaat: B2B-omzet verdubbeld, +39,5% herhaalaankopen',
      'Elke klant wordt nu proactief opgevolgd, team weet precies wie er bestelt en wanneer te bellen',
      'Het team werkt met meer focus en werkplezier',
    ],
    questions: [
      'Herkennen jullie het probleem dat Wovar had?',
      'Hoe pakken jullie dat nu aan?',
    ],
  },
  ClientSituation: {
    title: 'Huidige Situatie FysioSupplies',
    timing: '2 min',
    notes: [
      'Laat de bullets staan — deze zijn uit HUN eigen woorden (het gesprek met Jeroen)',
      '"Wij benaderen eigenlijk niet" — direct citaat',
      'Fysiopraktijk Groningen-anekdote: concrete klant die weg is gelopen',
      'Kernvraag: hoeveel praktijken zijn er nog meer?',
    ],
    questions: [
      'Hoeveel klanten zijn er het afgelopen jaar gestopt met bestellen?',
      'Weten jullie waarom klanten weglopen?',
    ],
  },
  MarketOverview: {
    title: 'De Fysiotherapie Markt',
    timing: '2 min',
    notes: [
      'Laat de grote getallen even inwerken — 8.354 praktijken',
      'Focus op het segment "interessante praktijken" (3+ kamers)',
      'Vergelijk met hun huidige klantenbestand — hoeveel hebben ze er nu?',
    ],
    questions: [
      'Hoeveel actieve B2B klanten hebben jullie op dit moment?',
      'Welk percentage van de markt bedienen jullie?',
    ],
  },
  ClientBusinessCase: {
    title: 'De Potentie — Waar ligt de ruimte?',
    timing: '3 min',
    introQuestions: [
      'Hoeveel besteedt een gemiddelde praktijk per jaar bij jullie?',
      'Weten jullie hoeveel producten een klant NIET bij jullie koopt?',
    ],
    notes: [
      'Dit is een POTENTIE-slide — nog geen harde cijfers benoemen',
      'Loop door verbruiksmateriaal per praktijk: tape, olie, papier — herkenbaar',
      'Marktpotentieel laten inwerken: 8.354 praktijken × gemiddeld verbruik',
      'Rechts de 5 focusgebieden tonen — ZONDER bedragen',
      '"Concrete cijfers volgen verderop" — dit is om richting te geven, niet om te rekenen',
      'Doel: laten zien dat er VEEL ruimte is die ze nu laten liggen',
    ],
    questions: [
      'Herkennen jullie dat klanten vaak maar een deel bij jullie kopen?',
      'Waar denken jullie dat de meeste ruimte zit?',
    ],
  },
  SegmentStrategy: {
    title: 'Segmentatie & Signalen',
    timing: '3 min',
    introQuestions: [
      'Weten jullie welke klanten alleen tape kopen maar nooit apparatuur?',
      'Krijgen jullie AM-ers een signaal als een klant stopt met bestellen?',
      'Hoe bepalen jullie nu wie ze moeten bellen?',
    ],
    notes: [
      'BEGIN MET VRAGEN — laat ze zelf het probleem benoemen',
      'Klik door de signaalkaarten: maak het concreet',
      '"Een klant van €500 met 8 behandelkamers koopt 90% ergens anders — die is JUIST interessant"',
      'Vergelijk: 2 AM-ers handmatig vs. 2 AM-ers met automatisering',
    ],
    questions: [
      'Hoe bepalen jullie nu welke klanten prioriteit krijgen?',
      'Wat als jullie AM-ers elke ochtend precies wisten wie ze moesten bellen en waarom?',
    ],
  },
  ThreePillars: {
    title: 'Drie Pijlers',
    timing: '2 min',
    notes: [
      'Dit is het KERNVERHAAL — neem hier de tijd voor',
      'CRM: structuur zodat medewerkers weten wat ze moeten doen → hoogste omzet per medewerker',
      'AI & Automatisering: 70% admin, 30% sales → wij draaien dat om',
      'Training: vertrouwen in het gesprek + CRM adoptie (anders net zo goed niet doen)',
      'Alles draait om: meer omzet per medewerker',
    ],
    questions: [],
  },
  CRMPillar: {
    title: 'CRM — Signalen & Structuur',
    timing: '3 min',
    introQuestions: [
      'Wanneer heeft een klant weer iets nodig?',
      'Wie is er weggelopen en waarom?',
      'Welke prospects moeten NU benaderd worden?',
      'Waar lekt omzet weg?',
      'Weet je wat je medewerkers doen qua acquisitie?',
    ],
    notes: [
      'BEGIN MET VRAGEN STELLEN — nog niet de oplossing laten zien',
      'Gebaseerd op hoe multinationals het doen, toepasbaar voor MKB',
      'Focus: hoeveel laat je op dit moment liggen?',
      'Klik door de signaalvoorbeelden — maak ze concreet voor hun situatie',
      'Dit is een business case: elke slapende klant = gemiste omzet',
    ],
    questions: [
      'Weten jullie nu hoeveel slapende klanten er zijn?',
      'Krijg je een signaal als een klant niet meer bestelt?',
      'Kun je zien wanneer een klant een offerte opent?',
      'Weet je de omzet per medewerker?',
    ],
  },
  TrainingPillar: {
    title: 'Training — Adoptie & Conversie',
    timing: '3 min',
    introQuestions: [
      'Worden huidige systemen optimaal gebruikt door het team?',
      'Worden medewerkers structureel getraind op sales?',
      'Hebben ze een duidelijk belscript?',
      'Is er een helder salesproces?',
    ],
    notes: [
      'BEGIN MET VRAGEN STELLEN — nog niet de oplossing laten zien',
      'CRM Training: MUST. Zonder goede adoptie net zo goed niet doen',
      'Veel partijen leveren CRM, zeggen "succes ermee" en dat is het — wij doen het anders',
      'Sales Training: mensen weten vaak niet wat ze moeten zeggen → missen de durf om te bellen',
      'Wij geven vertrouwen en verhogen de conversie per gesprek',
      'Business case: 5% betere gesprekken → wat levert dat op?',
    ],
    questions: [
      'Hoe goed wordt jullie huidige CRM gebruikt door het team?',
      'Heeft jullie salesteam ooit gerichte sales training gehad?',
      'Wat als jullie conversie met 5% omhoog gaat?',
    ],
  },
  AIAutomationPillar: {
    title: 'AI & Automatisering — Tijdwinst',
    timing: '3 min',
    introQuestions: [
      'Kopiëren jullie data handmatig tussen systemen?',
      'Maken jullie notities van gesprekken handmatig?',
      'Houdt iedereen eigen Excel-lijstjes bij?',
      'Hoe lang duurt het om een offerte op te maken?',
    ],
    notes: [
      'BEGIN MET VRAGEN STELLEN — nog niet de oplossing laten zien',
      'We implementeren MAANDELIJKS — niet alles in één keer',
      'Maand 1: orderverwerking. Maand 2: data verrijking. Maand 3: taken. Etc.',
      'Zo verdient elke maand zich al terug',
      'Concrete voorbeelden doorlopen met tijdberekeningen:',
      '- Klantonderzoek: 5 min per klant → 367 uur/jaar bespaard',
      '- Data kopiëren: 30 min/dag → 110 uur/jaar bespaard',
      '- Offertes: 15 min → 3 min = 96 uur/jaar bespaard',
      'Totaal: 573 uur per medewerker per jaar',
    ],
    questions: [
      'Hoeveel tijd besteedt jullie team nu aan klantonderzoek?',
      'Wordt er handmatig data gekopieerd tussen systemen?',
      'Hoe lang duurt het nu om een offerte op te maken?',
    ],
  },
  BusinessCase: {
    title: 'Business Case — Totaaloverzicht',
    timing: '3 min',
    notes: [
      'Dit is het MOMENT — hier wordt het concreet',
      'Loop door de drie subtotalen: CRM, Training, AI',
      'Laat het grote getal even inwerken',
      'Vraag: "Wat als we hier maar 10% van realiseren?"',
      'Transitie naar investering: "En wat is jullie investering hiervoor?"',
    ],
    questions: [
      'Wat zou dit voor jullie organisatie betekenen?',
      'Stel we realiseren maar de helft — is dat interessant?',
    ],
  },
  TeamExpertise: {
    title: 'Specialistische Kennis',
    timing: '1 min',
    notes: [
      'Loop kort door het team',
      'Benadruk: dit is geen eenmanszaak maar een team van specialisten',
      'Koppel disciplines aan hun specifieke behoeften',
    ],
    questions: [],
  },
  Packages: {
    title: 'Onze Aanpak',
    timing: '2 min',
    notes: [
      '4 fases doorlopen: Analyse, Inrichting, Training, Optimalisatie',
      '12 maanden samenwerking, tweewekelijks in Q1, maandelijks daarna',
      'Wij doen het werk, jullie zien het resultaat',
    ],
    questions: ['Waar willen jullie het snelst resultaat zien?'],
  },
  SetupSuccess: {
    title: 'Opzet voor Succes',
    timing: '1 min',
    notes: [
      'Quote: technologie + team = resultaat',
      'Benadruk: wij zijn geen consultants maar extra teamleden',
      'Transitie naar de concrete tools en features',
    ],
    questions: ['Wat is jullie ervaring met eerdere trajecten?'],
  },
  B2BValue: {
    title: '4 Fases naar Meer Omzet',
    timing: '2 min',
    notes: [
      'Dit is het OVERZICHT — neem de tijd om alle 4 fases door te lopen',
      'Benadruk: niet alles tegelijk, maar stap voor stap',
      'Fase 1 (Maand 1-3): eerst je bestaande pipeline op orde brengen',
      'Fase 2 (Maand 2-5): slapende klanten weer activeren — het laaghangende fruit',
      'Fase 3 (Maand 4-8): klanten voller maken via cross-sell en upsell',
      'Fase 4 (Maand 6-12): pas als je fundament staat, nieuwe klanten erbij',
      'Elke fase levert direct resultaat EN bouwt voort op de vorige → compound groei',
    ],
    questions: [
      'Waar zien jullie de meeste ruimte: bestaande klanten opvolgen of nieuwe werven?',
      'In welke fase herkennen jullie de grootste quick win?',
    ],
  },
  ActivePipeline: {
    title: 'Fase 1 — Proactief Opvolgen',
    timing: '2 min',
    introQuestions: [
      'Hoeveel openstaande offertes hebben jullie op dit moment?',
      'Weten jullie hoeveel daarvan nooit worden opgevolgd?',
    ],
    notes: [
      'Dit is Fase 1 — het fundament. Begin ALTIJD hier',
      'Kernboodschap: geen offerte meer die tussen wal en schip valt',
      'CRM als je beste verkoper: elke ochtend weet sales wie ze moeten bellen',
      'Automatische herinneringen bij openstaande offertes → geen handwerk',
      'Pipeline dashboard met conversie per fase → inzicht waar leads vastlopen',
      'Concreet voorbeeld: "Een offerte die 2 weken open staat krijgt automatisch een beltaak"',
    ],
    questions: [
      'Wat gebeurt er nu als een offerte 2 weken open staat?',
      'Heeft jullie team overzicht in welke leads prioriteit hebben?',
    ],
  },
  SleepingClients: {
    title: 'Fase 2 — Slapende Klanten Activeren',
    timing: '2 min',
    introQuestions: [
      'Weten jullie hoeveel klanten de afgelopen 6 maanden NIET hebben besteld?',
      'Krijgen jullie een signaal als een klant stopt met bestellen?',
    ],
    notes: [
      'Dit is vaak de GROOTSTE quick win — slapende klanten kosten geld',
      'Signaal: automatisch alert als een klant buiten zijn bestelpatroon valt',
      'De accountmanager krijgt een beltaak MET klantcontext — weet precies wat er speelt',
      'Win-back campagne: gepersonaliseerde aanbieding op het juiste moment',
      'Escalatie: als klant na 2 weken niet reageert, gaat het naar manager',
      'Voorbeeld: "Klant X bestelde elke 3 maanden, nu al 5 maanden niets → bel vandaag"',
    ],
    questions: [
      'Hoeveel klanten zijn er het afgelopen jaar weggelopen zonder dat jullie het wisten?',
      'Wat zou het opleveren als je 10% van de slapende klanten reactiveert?',
    ],
  },
  MaxClientValue: {
    title: 'Fase 3 — Klanten Voller Maken',
    timing: '2 min',
    introQuestions: [
      'Weten jullie welke klanten maar 1 productlijn kopen terwijl ze meer nodig hebben?',
      'Hoe identificeren jullie nu cross-sell kansen?',
    ],
    notes: [
      'Bestaande klanten kopen vaak maar een fractie van wat ze zouden kunnen',
      'Data laat zien: welke klant koopt alleen tape maar nooit apparatuur?',
      'Herhalingsaankopen stimuleren: slimme signalen bij verbruiksproducten',
      'Upsell: op basis van data naar hogere productlijnen adviseren',
      'LTV verhogen door proactief relatieonderhoud — niet wachten tot ze bellen',
      'Dit is de fase waar de echte marge zit: bestaande relatie, lage acquisitiekosten',
    ],
    questions: [
      'Wat is de gemiddelde orderwaarde per klant op dit moment?',
      'Hoeveel zou het opleveren als elke klant 20% meer koopt?',
    ],
  },
  NewClients: {
    title: 'Fase 4 — Nieuwe Klanten Aantrekken',
    timing: '2 min',
    notes: [
      'Pas in Fase 4 beginnen met actieve acquisitie — als het fundament staat',
      'Data-gedreven: we weten precies welk type praktijk het beste past (ICP)',
      'Lookalike targeting: zoek praktijken die lijken op je beste klanten',
      'Geautomatiseerde outreach met lead scoring — geen koud bellen in het wilde weg',
      'Benadruk: dit is waar de meeste bedrijven BEGINNEN, maar dat is achterlijk',
      'Eerst bestaande klanten maximaliseren, dan pas nieuwe erbij',
    ],
    questions: [
      'Hoeveel nieuwe klanten werven jullie nu per maand?',
      'Wat is het huidige acquisitieproces?',
    ],
  },
  Dashboarding: {
    title: 'Data Driven Dashboard',
    timing: '2 min',
    notes: [
      'Dit dashboard is een VOORBEELD — benadruk dat het 100% op maat wordt gebouwd',
      'Vraag de klant: "Wat willen JULLIE elke ochtend zien als je het CRM opent?"',
      'De groene lijn = huidige omzet, de roze stippellijn = potentie',
      'Het gat ertussen = wat ze laten liggen — DIT is waarom we bestaan',
      'Live signalen rechts: concrete acties die het team elke dag krijgt',
      'Pipeline Health, Actieve Klanten, Omzet, Conversie — alles real-time',
      'Data uit HubSpot + ERP gekoppeld: één bron van waarheid',
      'BELANGRIJK: vraag wat ZIJ willen meten en monitoren',
    ],
    questions: [
      'Wat zouden jullie elke ochtend willen zien in een dashboard?',
      'Welke KPI\'s zijn voor jullie het belangrijkst?',
      'Hebben jullie nu inzicht in omzet per klant, per medewerker?',
    ],
  },
  FlowsAutomation: {
    title: 'Onze Tools',
    timing: '3 min',
    notes: [
      'Dit is het TOOL-OVERZICHT — klik op een tool om de details te laten zien',
      'Alle tools zijn eigengebouwd door ons team — geen third-party black boxes',
      'Klik door de tools die het meest relevant zijn voor deze klant',
      'Benadruk: dit zijn bewezen tools die al bij 15+ klanten draaien',
      'Custom tools ontwikkelen we samen — als jullie iets specifieks nodig hebben, bouwen wij het',
      'Niet alles tegelijk aanzetten — per fase de juiste tools activeren',
    ],
    questions: [
      'Welke van deze tools spreken jullie het meest aan?',
      'Zijn er specifieke processen die jullie zouden willen automatiseren?',
    ],
  },
  TrainingDev: {
    title: 'Training & Strategie',
    timing: '2 min',
    notes: [
      'Migilio Tirtosentono is onze Senior Sales Trainer — 15+ jaar ervaring',
      'Training op de werkvloer, NIET in een zaaltje — direct toepasbaar',
      'Strategische sessies: maandelijks over pipeline, conversie, commerciële strategie',
      'Continue coaching: geen eenmalig project maar doorlopende begeleiding',
      'Resultaat na 12 maanden: team werkt zelfstandig met dashboards en signalen',
      'Kennis geborgd in processen, niet in individuele hoofden',
      'Full pakket: 8 uur training per maand, on site',
    ],
    questions: [
      'Heeft jullie team ooit gerichte sales training gehad?',
      'Hoe worden nieuwe medewerkers nu ingewerkt op het verkoopproces?',
    ],
  },
  Pricing: {
    title: 'Jouw Investering',
    timing: '3 min',
    notes: [
      'Laat het bedrag even landen — geef ze tijd',
      'Vergelijk met marktprijzen: sales training alleen al kost €1.500-3.000/dag',
      'CRM implementatie: €15.000-50.000 eenmalig bij partijen als Salesforce/HubSpot Partners',
      'Wij doen ALLES in één pakket: CRM, training, AI, automation',
      'No Cure No Pay: geen resultaat = geen factuur. Zo zeker zijn wij',
      'Staffel per teamgrootte: transparant en eerlijk',
      '6 specialisten aan hun zijde: CRM, Data, AI, Automation, Sales Training & Strategie',
      'Transitie: "En wat levert dit op? Laten we naar de business case kijken"',
    ],
    questions: [
      'Wat investeren jullie nu aan sales ondersteuning en CRM?',
      'Hoe kijken jullie naar No Cure No Pay?',
    ],
  },
  Security: {
    title: 'Beveiliging & Compliance',
    timing: '1 min',
    notes: [
      'Kort en zakelijk — dit is een vertrouwensslide',
      'Alle tools ISO 27001 en SOC 2 gecertificeerd: HubSpot, Make.com, Google',
      'Volledige AVG-compliance met Data Processing Agreements',
      'Versleuteld dataverkeer: SSL/TLS voor alles',
      'Anticipeer op de vraag: "Hoe zit het met onze data?" — dit is het antwoord',
    ],
    questions: [],
  },
  ClientLogos: {
    title: 'Onze Klanten',
    timing: '1 min',
    notes: [
      'Laat de logo\'s even voor zich spreken',
      'Noem 2-3 klanten die qua profiel vergelijkbaar zijn met deze prospect',
      'Bied aan: "Neem gerust contact op met onze klanten ter referentie"',
      'Benoem diversiteit: van online retailer (Wovar) tot scheepsbouwer (Royal de Vries)',
      'Alle klanten zijn B2B — net als zij',
    ],
    questions: ['Kennen jullie hier bedrijven van?'],
  },
  ClosingCTA: {
    title: 'Afsluiting',
    timing: '3 min',
    notes: [
      'Dit is het CLOSE-moment — wees stil na de kernvraag',
      '"Haal meer uit jouw team, haal meer uit jouw klanten" — laat dit landen',
      'Deel je contactgegevens, vraag naar de volgende stap',
      'Concreet voorstel: "Zullen we een verdiepend gesprek inplannen?"',
      'Geen druk — laat ze het idee absorberen',
      'Als ze twijfelen: herinner aan No Cure No Pay',
      'Mogelijke vervolgstap: een data-scan van hun CRM/ERP om de potentie te kwantificeren',
    ],
    questions: [
      'Wat is jullie gevoel bij wat we hebben laten zien?',
      'Wat zou een logische volgende stap zijn?',
    ],
  },
};

export const PresenterNotes: React.FC<PresenterNotesProps> = ({ currentSection, currentSlideKey, isVisible, onClose }) => {
  const note = slideNotes[currentSlideKey];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed top-0 right-0 h-screen w-[380px] bg-white/95 backdrop-blur-md shadow-2xl z-[100] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-brand-purple text-white p-4 flex items-center justify-between">
            <div>
              <p className="font-black text-sm uppercase">Presenter Notes</p>
              <p className="text-brand-green text-xs">Slide {currentSection + 1} — Alleen voor jou</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {note ? (
            <div className="p-5 space-y-6">
              {/* Slide title + timing */}
              <div className="flex items-center justify-between">
                <h3 className="text-brand-purple font-black text-lg">{note.title}</h3>
                <div className="flex items-center gap-1 bg-brand-green/10 px-3 py-1 rounded-full">
                  <Clock className="w-3 h-3 text-brand-green" />
                  <span className="text-brand-green font-bold text-xs">{note.timing}</span>
                </div>
              </div>

              {/* Intro questions - ask BEFORE showing the slide */}
              {note.introQuestions && note.introQuestions.length > 0 && (
                <div className="bg-brand-accent/5 border-2 border-brand-accent/30 rounded-xl p-4">
                  <p className="text-brand-accent font-black text-xs uppercase tracking-wider mb-3">
                    Stel eerst deze vragen
                  </p>
                  <div className="space-y-2">
                    {note.introQuestions.map((q, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold text-sm mt-0.5 shrink-0">{i + 1}.</span>
                        <p className="text-gray-700 text-sm font-medium">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <p className="text-gray-600 font-bold text-xs uppercase mb-2">Spreeknotities</p>
                <div className="space-y-2">
                  {note.notes.map((n, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full mt-1.5 shrink-0" />
                      <p className="text-gray-700 text-sm">{n}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Questions */}
              {note.questions.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-brand-pink" />
                    <p className="text-brand-pink font-bold text-xs uppercase">Gespreksvragen</p>
                  </div>
                  <div className="space-y-2">
                    {note.questions.map((q, i) => (
                      <div key={i} className="bg-brand-pink/5 border border-brand-pink/20 rounded-lg p-3">
                        <p className="text-gray-700 text-sm italic">"{q}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-5 text-center text-gray-400">
              <p className="text-sm">Geen notities voor deze slide</p>
            </div>
          )}

          {/* Keyboard hint */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-3 text-center">
            <p className="text-gray-400 text-xs">Druk <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">N</kbd> of gebruik de knop om te verbergen</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
