import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, RotateCcw, ChevronDown, ChevronRight, User, Building2, Layers, Upload, Download, FileUp, Briefcase, FileDown, DollarSign, Target } from 'lucide-react';
import { ALL_SLIDE_KEYS, SLIDE_LABELS, SLIDE_CATEGORIES, TEAM_MEMBERS, BRANCHES, BRANCH_DEFAULTS, compressImage, resizeImage, calculatePrice, type SlideKey, type ClientConfig } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  enabledSlides: string[];
  onToggleSlide: (slideKey: string) => void;
  onPresetChange: (preset: 'met-crm' | 'zonder-crm' | 'npi') => void;
  onReset: () => void;
  activePreset: 'met-crm' | 'zonder-crm' | 'npi';
  configValues: ClientConfig;
  onConfigChange: (updates: Partial<ClientConfig>) => void;
  onExport: () => void;
  onImport: (data: ClientConfig) => void;
}

function TextInput({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-gray-400 text-[10px] font-bold uppercase block mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-purple placeholder-gray-300 focus:outline-none focus:border-brand-green/50 transition-colors"
      />
    </div>
  );
}

function ImageUploadField({ label, value, onChange, maxWidth, compress }: {
  label: string; value: string; onChange: (v: string) => void; maxWidth?: number; compress?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const hasImage = value && (value.startsWith('data:') || value.startsWith('http') || value.startsWith('/'));

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = compress
        ? await compressImage(file, maxWidth || 800, 0.7)
        : await resizeImage(file, maxWidth || 400);
      onChange(dataUrl);
    } catch {
      // Fallback: read as-is
      const reader = new FileReader();
      reader.onload = (ev) => onChange(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  return (
    <div>
      <label className="text-gray-400 text-[10px] font-bold uppercase block mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value?.startsWith('data:') ? '(geupload)' : value}
          onChange={e => onChange(e.target.value)}
          placeholder="URL of upload een bestand"
          readOnly={value?.startsWith('data:')}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-purple placeholder-gray-300 focus:outline-none focus:border-brand-green/50 transition-colors"
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="px-3 py-2 bg-brand-green/10 border border-brand-green/20 rounded-lg text-brand-green hover:bg-brand-green/20 transition-colors"
          title="Upload afbeelding"
        >
          <Upload className="w-3.5 h-3.5" />
        </button>
        {hasImage && (
          <button
            onClick={() => onChange('')}
            className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-red-400 hover:bg-red-100 transition-colors"
            title="Verwijder"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {hasImage && (
        <div className="mt-2 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 h-16 flex items-center justify-center">
          <img src={value} alt="Preview" className="max-h-full max-w-full object-contain" />
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

function SegmentEditor({ segments, onChange }: {
  segments: ClientConfig['segments'];
  onChange: (segments: ClientConfig['segments']) => void;
}) {
  const update = (index: number, field: 'label' | 'sublabel', value: string) => {
    const updated = [...segments];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <label className="text-gray-400 text-[10px] font-bold uppercase block">Klantsegmenten</label>
      {segments.map((seg, i) => (
        <div key={i} className="grid grid-cols-2 gap-1.5">
          <input
            type="text"
            value={seg.label}
            onChange={e => update(i, 'label', e.target.value)}
            placeholder={`Segment ${String.fromCharCode(65 + i)}`}
            className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-brand-purple placeholder-gray-300 focus:outline-none focus:border-brand-green/50"
          />
          <input
            type="text"
            value={seg.sublabel}
            onChange={e => update(i, 'sublabel', e.target.value)}
            placeholder="Omschrijving"
            className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 placeholder-gray-300 focus:outline-none focus:border-brand-green/50"
          />
        </div>
      ))}
    </div>
  );
}

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false }: {
  title: string; icon: React.FC<{ className?: string }>; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 py-3 px-1 text-left hover:bg-gray-50/50 transition-colors"
      >
        <Icon className="w-4 h-4 text-brand-purple/50" />
        <span className="text-brand-purple font-bold text-xs uppercase flex-1">{title}</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-gray-300" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
      </button>
      {isOpen && <div className="pb-4 space-y-3">{children}</div>}
    </div>
  );
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  enabledSlides,
  onToggleSlide,
  onPresetChange,
  onReset,
  activePreset,
  configValues,
  onConfigChange,
  onExport,
  onImport,
}) => {
  const enabledCount = enabledSlides.length;
  const importRef = useRef<HTMLInputElement>(null);

  const handleDownloadPdf = async () => {
    onClose();
    // Wait for panel close animation
    await new Promise(r => setTimeout(r, 400));
    const { generatePresentationPdf } = await import('../utils/generatePdf');
    await generatePresentationPdf();
  };

  const handlePresenterChange = (name: string) => {
    const member = TEAM_MEMBERS.find(m => m.name === name);
    if (member) {
      onConfigChange({ presenter: member });
    }
  };

  const handleBranchChange = (branchValue: string) => {
    const updates: Partial<ClientConfig> = { branch: branchValue };
    const defaults = BRANCH_DEFAULTS[branchValue];
    if (defaults) {
      updates.segments = defaults.segments;
      updates.clientTypeLabel = defaults.clientTypeLabel;
    }
    onConfigChange(updates);
  };

  const handleResellersToggle = (checked: boolean) => {
    onConfigChange({
      hasResellers: checked,
      clientTypeLabel: checked ? 'dealers en resellers' : 'zakelijke klanten',
    });
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as ClientConfig;
        onImport(data);
      } catch {
        alert('Ongeldig configuratiebestand');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-[420px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-brand-purple" />
                  <h2 className="text-brand-purple font-black text-lg uppercase">Instellingen</h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Preset selector */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => onPresetChange('met-crm')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                    activePreset === 'met-crm'
                      ? 'bg-brand-purple text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  Met CRM
                </button>
                <button
                  onClick={() => onPresetChange('zonder-crm')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                    activePreset === 'zonder-crm'
                      ? 'bg-brand-purple text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  Zonder CRM
                </button>
              </div>

              {/* Export/Import buttons */}
              <div className="flex gap-2">
                <button
                  onClick={onExport}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-brand-green/10 border border-brand-green/20 rounded-lg text-brand-green text-xs font-bold hover:bg-brand-green/20 transition-colors"
                >
                  <Download className="w-3 h-3" /> Exporteer
                </button>
                <button
                  onClick={() => importRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-brand-accent/10 border border-brand-accent/20 rounded-lg text-brand-accent text-xs font-bold hover:bg-brand-accent/20 transition-colors"
                >
                  <FileUp className="w-3 h-3" /> Importeer
                </button>
                <input ref={importRef} type="file" accept=".json" onChange={handleImportFile} className="hidden" />
              </div>

              {/* PDF Download */}
              <button
                onClick={handleDownloadPdf}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 mt-2 bg-brand-purple/10 border border-brand-purple/20 rounded-lg text-brand-purple text-xs font-bold hover:bg-brand-purple/20 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" /> Download als PDF
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-3">

              {/* Klantgegevens section */}
              <CollapsibleSection title="Klantgegevens" icon={Building2} defaultOpen={true}>
                <TextInput
                  label="Klantnaam"
                  value={configValues.clientName}
                  onChange={v => onConfigChange({ clientName: v })}
                  placeholder="Bijv. Oliehoorn"
                />
                <ImageUploadField
                  label="Klant logo"
                  value={configValues.clientLogo}
                  onChange={v => onConfigChange({ clientLogo: v })}
                  maxWidth={400}
                />
                <ImageUploadField
                  label="Achtergrond afbeelding (slide 1)"
                  value={configValues.clientBackgroundImage}
                  onChange={v => onConfigChange({ clientBackgroundImage: v })}
                  maxWidth={1600}
                  compress
                />
                <TextInput
                  label="Presentatie titel"
                  value={configValues.presentationTitle}
                  onChange={v => onConfigChange({ presentationTitle: v })}
                  placeholder="Data-gedreven Groei"
                />
              </CollapsibleSection>

              {/* Systemen section */}
              <CollapsibleSection title="Systemen" icon={Settings} defaultOpen={true}>
                <TextInput
                  label="CRM-systeem"
                  value={configValues.crmSystem}
                  onChange={v => onConfigChange({ crmSystem: v })}
                  placeholder="Bijv. Salesforce, HubSpot, Dynamics"
                />
                <TextInput
                  label="ERP-systeem"
                  value={configValues.erpSystem}
                  onChange={v => onConfigChange({ erpSystem: v })}
                  placeholder="Bijv. SAP, Exact, AFAS, Unit4"
                />
                <p className="text-gray-300 text-[10px]">
                  Gebruik [CRM-systeem] en [ERP-systeem] als placeholder in tekstvelden. Deze worden automatisch vervangen in de slides.
                </p>
              </CollapsibleSection>

              {/* Branche section */}
              <CollapsibleSection title="Branche & Klanttype" icon={Briefcase} defaultOpen={true}>
                <div>
                  <label className="text-gray-400 text-[10px] font-bold uppercase block mb-1">Branche</label>
                  <select
                    value={configValues.branch}
                    onChange={e => handleBranchChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-purple focus:outline-none focus:border-brand-green/50 transition-colors"
                  >
                    {BRANCHES.map(b => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                  <p className="text-gray-300 text-[10px] mt-1">Branche selecteren vult de segmenten automatisch in</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleResellersToggle(!configValues.hasResellers)}
                    className={`rounded-full flex items-center transition-all shrink-0 ${
                      configValues.hasResellers ? 'bg-brand-green justify-end' : 'bg-gray-300 justify-start'
                    }`}
                    style={{ width: '32px', height: '18px' }}
                  >
                    <div className="bg-white rounded-full shadow-sm mx-0.5" style={{ width: '14px', height: '14px' }} />
                  </button>
                  <div>
                    <p className="text-brand-purple text-xs font-bold">Werkt met dealers / resellers</p>
                    <p className="text-gray-400 text-[10px]">Past terminologie aan: "dealers en resellers" i.p.v. "zakelijke klanten"</p>
                  </div>
                </div>

                <TextInput
                  label="Klanttype label"
                  value={configValues.clientTypeLabel}
                  onChange={v => onConfigChange({ clientTypeLabel: v })}
                  placeholder="zakelijke klanten"
                />

                <SegmentEditor
                  segments={configValues.segments}
                  onChange={segments => onConfigChange({ segments })}
                />
              </CollapsibleSection>

              {/* Business Cases section */}
              <CollapsibleSection title="Business Cases" icon={Target} defaultOpen={false}>
                {configValues.businessCases && configValues.businessCases.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-gray-300 text-[10px]">
                      Business cases worden automatisch ingevuld op basis van de branche. Je kunt ze hier aanpassen.
                    </p>
                    {configValues.businessCases.map((bc, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1">
                            <select
                              value={bc.fase}
                              onChange={e => {
                                const updated = [...configValues.businessCases];
                                updated[i] = { ...updated[i], fase: parseInt(e.target.value) };
                                onConfigChange({ businessCases: updated });
                              }}
                              className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-[10px] font-bold uppercase text-gray-500 focus:outline-none focus:border-brand-green/50"
                            >
                              <option value={1}>Fase 1</option>
                              <option value={2}>Fase 2</option>
                              <option value={3}>Fase 3</option>
                              <option value={4}>Fase 4</option>
                            </select>
                            <select
                              value={bc.pillar}
                              onChange={e => {
                                const updated = [...configValues.businessCases];
                                updated[i] = { ...updated[i], pillar: e.target.value as 'ai' | 'crm' | 'training' };
                                onConfigChange({ businessCases: updated });
                              }}
                              className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-[10px] font-bold uppercase text-gray-500 focus:outline-none focus:border-brand-green/50"
                            >
                              <option value="ai">AI</option>
                              <option value="crm">CRM</option>
                              <option value="training">Training</option>
                            </select>
                          </div>
                          <button
                            onClick={() => {
                              const updated = configValues.businessCases.filter((_, idx) => idx !== i);
                              onConfigChange({ businessCases: updated });
                            }}
                            className="text-red-300 hover:text-red-500 transition-colors"
                            title="Verwijder"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div>
                          <label className="text-gray-400 text-[9px] font-bold uppercase block mb-0.5">Uitdaging</label>
                          <textarea
                            value={bc.uitdaging}
                            onChange={e => {
                              const updated = [...configValues.businessCases];
                              updated[i] = { ...updated[i], uitdaging: e.target.value };
                              onConfigChange({ businessCases: updated });
                            }}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-brand-purple placeholder-gray-300 focus:outline-none focus:border-brand-green/50 resize-none"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-[9px] font-bold uppercase block mb-0.5">Oplossing</label>
                          <textarea
                            value={bc.oplossing}
                            onChange={e => {
                              const updated = [...configValues.businessCases];
                              updated[i] = { ...updated[i], oplossing: e.target.value };
                              onConfigChange({ businessCases: updated });
                            }}
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-brand-purple placeholder-gray-300 focus:outline-none focus:border-brand-green/50 resize-none"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 text-[9px] font-bold uppercase block mb-0.5">Impact (optioneel)</label>
                          <input
                            type="text"
                            value={bc.impact || ''}
                            onChange={e => {
                              const updated = [...configValues.businessCases];
                              updated[i] = { ...updated[i], impact: e.target.value || undefined };
                              onConfigChange({ businessCases: updated });
                            }}
                            placeholder="Bijv. €6.000/jaar behouden"
                            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-brand-green font-bold placeholder-gray-300 focus:outline-none focus:border-brand-green/50"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = [...(configValues.businessCases || []), {
                          uitdaging: '',
                          oplossing: '',
                          fase: 1,
                          pillar: 'crm' as const,
                        }];
                        onConfigChange({ businessCases: updated });
                      }}
                      className="w-full py-2 border border-dashed border-brand-green/30 rounded-lg text-brand-green text-xs font-bold hover:bg-brand-green/5 transition-colors"
                    >
                      + Business case toevoegen
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-300 text-xs mb-3">Geen business cases. Selecteer een branche of voeg er handmatig toe.</p>
                    <button
                      onClick={() => {
                        onConfigChange({ businessCases: [{
                          uitdaging: '',
                          oplossing: '',
                          fase: 1,
                          pillar: 'crm' as const,
                        }] });
                      }}
                      className="py-2 px-4 border border-dashed border-brand-green/30 rounded-lg text-brand-green text-xs font-bold hover:bg-brand-green/5 transition-colors"
                    >
                      + Business case toevoegen
                    </button>
                  </div>
                )}
              </CollapsibleSection>

              {/* Presentator section */}
              <CollapsibleSection title="Presentator" icon={User} defaultOpen={false}>
                <div>
                  <label className="text-gray-400 text-[10px] font-bold uppercase block mb-2">Wie presenteert?</label>
                  <div className="space-y-1.5">
                    {TEAM_MEMBERS.map(member => (
                      <button
                        key={member.name}
                        onClick={() => handlePresenterChange(member.name)}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left ${
                          configValues.presenter.name === member.name
                            ? 'bg-brand-green/10 border border-brand-green/20'
                            : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-200">
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${configValues.presenter.name === member.name ? 'text-brand-purple' : 'text-gray-600'}`}>
                            {member.name}
                          </p>
                          <p className="text-[10px] text-gray-400 truncate">{member.role}</p>
                        </div>
                        {configValues.presenter.name === member.name && (
                          <div className="w-2 h-2 bg-brand-green rounded-full shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CollapsibleSection>

              {/* Pakket & Investering */}
              <CollapsibleSection title="Pakket & Investering" icon={DollarSign} defaultOpen={true}>
                <div>
                  <label className="text-gray-400 text-[10px] font-bold uppercase block mb-2">Pakket</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onConfigChange({ package: 'full' });
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                        configValues.package === 'full'
                          ? 'bg-brand-green text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      Full
                    </button>
                    <button
                      onClick={() => {
                        if (configValues.salesCount >= 3) {
                          alert('Lite pakket is alleen beschikbaar bij minder dan 3 sales medewerkers');
                          return;
                        }
                        onConfigChange({ package: 'lite' });
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all ${
                        configValues.package === 'lite'
                          ? 'bg-brand-green text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      Lite
                    </button>
                  </div>
                  {configValues.package === 'lite' && (
                    <p className="text-brand-accent text-[10px] mt-1">Lite pakket: alleen voor teams met max 2 sales medewerkers</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-[10px] font-bold uppercase block mb-1">Sales medewerkers</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={configValues.salesCount}
                    onChange={e => {
                      const count = Math.max(1, Math.min(20, parseInt(e.target.value) || 1));
                      const updates: Partial<ClientConfig> = { salesCount: count };
                      if (count >= 3 && configValues.package === 'lite') {
                        updates.package = 'full';
                      }
                      onConfigChange(updates);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-brand-purple focus:outline-none focus:border-brand-green/50 transition-colors"
                  />
                </div>

                {/* Price preview */}
                <div className="bg-brand-purple rounded-xl p-4 text-center">
                  <p className="text-white/50 text-[10px] uppercase mb-1">Berekende investering</p>
                  <p className="text-white font-black text-2xl">
                    {new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(
                      calculatePrice(configValues.package || 'full', configValues.salesCount || 3)
                    )}
                    <span className="text-white/50 text-sm font-normal"> /mnd</span>
                  </p>
                  {configValues.package === 'full' && configValues.salesCount > 5 && (
                    <p className="text-white/40 text-[10px] mt-1">
                      Basis + {Math.ceil((configValues.salesCount - 5) / 2)} extra blokken
                    </p>
                  )}
                </div>
              </CollapsibleSection>

              {/* Slide toggles by category */}
              <CollapsibleSection title={`Slides (${enabledCount}/${ALL_SLIDE_KEYS.length})`} icon={Layers} defaultOpen={false}>
                <div className="flex items-center justify-end mb-2">
                  <button
                    onClick={onReset}
                    className="flex items-center gap-1 text-gray-400 hover:text-brand-purple text-xs transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset naar preset
                  </button>
                </div>

                {SLIDE_CATEGORIES.map(category => (
                  <div key={category.label} className="mb-4 last:mb-0">
                    <p className="text-gray-300 text-[10px] font-bold uppercase mb-1.5 px-1">{category.label}</p>
                    <div className="space-y-0.5">
                      {category.slides.map(key => {
                        const isEnabled = enabledSlides.includes(key);
                        const globalIndex = ALL_SLIDE_KEYS.indexOf(key);
                        return (
                          <button
                            key={key}
                            onClick={() => onToggleSlide(key)}
                            className={`w-full flex items-center gap-2.5 p-2 rounded-lg transition-all text-left ${
                              isEnabled
                                ? 'bg-brand-green/5 hover:bg-brand-green/10'
                                : 'hover:bg-gray-50 opacity-40'
                            }`}
                          >
                            <div
                              className={`rounded-full flex items-center transition-all shrink-0 ${
                                isEnabled ? 'bg-brand-green justify-end' : 'bg-gray-300 justify-start'
                              }`}
                              style={{ width: '32px', height: '18px' }}
                            >
                              <div className="bg-white rounded-full shadow-sm mx-0.5" style={{ width: '14px', height: '14px' }} />
                            </div>
                            <p className={`text-xs font-medium truncate ${isEnabled ? 'text-brand-purple' : 'text-gray-400'}`}>
                              <span className="text-gray-300 mr-1">{globalIndex + 1}.</span>
                              {SLIDE_LABELS[key as SlideKey]}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CollapsibleSection>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 shrink-0">
              <p className="text-gray-300 text-[10px] text-center">
                Wijzigingen worden automatisch opgeslagen en toegepast
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
};
