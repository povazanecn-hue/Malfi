import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';

const SITE_PASSWORD = 'Malfi123456';
const STORAGE_KEY = 'malfi_site_unlocked';

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 2000);
    }
  };

  if (unlocked) return children;

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-5">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(107,124,94,0.07) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 30%, rgba(192,57,43,0.05) 0%, transparent 50%)`
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm text-center"
      >
        {/* Logo */}
        <div className="mb-8">
          <img
            src="https://media.base44.com/images/public/69b9c086f46636a7bdaa61f8/f1cd6fa78_malfi-logo.png"
            alt="MALFI"
            className="h-28 w-auto object-contain mx-auto"
          />
        </div>

        {/* Card */}
        <div className="bg-white border border-olive/15 rounded-3xl p-8 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-olive/10 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-5 h-5 text-olive" />
          </div>

          <h2 className="font-display text-2xl text-text-dark mb-2">Čoskoro online</h2>
          <p className="text-text-light text-sm mb-7 leading-relaxed">
            Stránka je momentálne v príprave.<br />Zadajte heslo pre vstup.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Heslo"
                autoFocus
                className={`c-input pr-12 text-center tracking-widest transition-all ${
                  error ? 'border-rosso bg-rosso-pale' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text-medium transition-colors"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-rosso text-xs"
              >
                Nesprávne heslo. Skúste znova.
              </motion.p>
            )}

            <button type="submit" className="btn-primary w-full py-3 font-semibold">
              Vstúpiť
            </button>
          </form>
        </div>

        <p className="text-text-light text-xs mt-6">© 2026 MALFI Talianska Reštaurácia</p>
      </motion.div>
    </div>
  );
}