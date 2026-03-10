import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

// Only SHA-256 hashes stored — no plaintext passwords in source
const SHARE_HASH = '094dcc48a1a72f4ea1fcd4f6a58fad20cc8fdbcd02919c8576c553c24fc5fa55';
const PRESENTER_HASH = '3915d55fbc048ad078d39826d1224e3ef3a25b5bb523646e240d71756a6464b5';
const SESSION_KEY = 'zk-auth';

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function useShareAuth() {
  const isShareMode = new URLSearchParams(window.location.search).has('share') || window.location.pathname.startsWith('/share');
  const authLevel = sessionStorage.getItem(SESSION_KEY);
  const isAuthenticated = isShareMode
    ? authLevel === 'share' || authLevel === 'presenter'
    : authLevel === 'presenter';
  return { isShareMode, isAuthenticated };
}

interface PasswordGateProps {
  clientName: string;
  clientLogo: string;
  isShareMode: boolean;
  onAuthenticated: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ clientName, clientLogo, isShareMode, onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [checking, setChecking] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);

    const inputHash = await sha256(password.trim());

    // Presenter password grants access to everything
    if (inputHash === PRESENTER_HASH) {
      sessionStorage.setItem(SESSION_KEY, 'presenter');
      setChecking(false);
      onAuthenticated();
      return;
    }

    // Share password only grants access in share mode
    if (isShareMode && inputHash === SHARE_HASH) {
      sessionStorage.setItem(SESSION_KEY, 'share');
      setChecking(false);
      onAuthenticated();
      return;
    }

    setChecking(false);
    setError(true);
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
    setTimeout(() => setError(false), 3000);
  };

  return (
    <div className="h-screen w-screen bg-brand-purple flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className={`relative z-10 w-full max-w-sm mx-4 ${shaking ? 'animate-shake' : ''}`}>
        <div className="text-center mb-8">
          {clientLogo && !logoError && (
            <img
              src={clientLogo}
              alt={clientName}
              className="h-16 mx-auto mb-4 object-contain brightness-0 invert"
              onError={() => setLogoError(true)}
            />
          )}
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/zk-logo-full.png"
              alt="Zwarte Kraai"
              className="h-6 object-contain brightness-0 invert opacity-60"
            />
            <span className="text-white/20 text-sm">x</span>
            <span className="text-white/60 text-sm font-bold">{clientName}</span>
          </div>
          <p className="text-white/30 text-xs">Persoonlijke presentatie</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Toegangscode"
              autoFocus
              disabled={checking}
              className={`w-full bg-white/[0.08] border ${
                error ? 'border-red-400/50' : 'border-white/10'
              } rounded-xl px-4 py-3 pl-11 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-green/50 transition-colors disabled:opacity-50`}
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">Onjuiste toegangscode</p>
          )}

          <button
            type="submit"
            disabled={checking}
            className="w-full bg-brand-green hover:bg-brand-green/90 text-brand-purple font-bold text-sm rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {checking ? 'Controleren...' : 'Bekijk presentatie'}
            {!checking && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-white/15 text-[10px] text-center mt-8">
          Zwarte Kraai — CRM & Sales Consultancy
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};
