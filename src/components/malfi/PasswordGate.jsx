import { useState } from 'react';
import { motion } from 'framer-motion';

const CORRECT_PASSWORD = 'Malfi123456';

export default function PasswordGate({ children }) {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('malfi_unlocked') === '1');
  const [error, setError] = useState(false);

  if (unlocked) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem('malfi_unlocked', '1');
      setUnlocked(true);
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-5 relative overflow-hidden">
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
        <div className="mb-8">
          <img
            src="https://media.base44.com/images/public/69b9c086f46636a7bdaa61f8/f1cd6fa78_malfi-logo.png"
            alt="MALFI"
            className="h-28 w-auto object-contain mx-auto"
          />
        </div>

        <div className="bg-white border border-olive/15 rounded-3xl p-8 shadow-sm">
          <h2 className="font-display text-3xl text-text-dark mb-2">Čoskoro online</h2>
          <p className="text-text-light text-sm mb-8 leading-relaxed">
            Pracujeme na niečom výnimočnom.<br />
            Zadajte heslo pre vstup.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              placeholder="Heslo"
              className="w-full bg-cream border border-olive/20 rounded-2xl px-4 py-3 text-text-dark text-sm text-center focus:outline-none focus:border-olive transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-rosso text-xs">Nesprávne heslo. Skúste znova.</p>
            )}
            <button
              type="submit"
              className="btn-primary w-full py-3 font-semibold"
            >
              Vstúpiť
            </button>
          </form>
        </div>

        <p className="text-text-light text-xs mt-6">© 2026 MALFI Talianska Reštaurácia</p>
      </motion.div>
    </div>
  );
}