import { motion } from 'framer-motion';

export default function AuthenticityStamp({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
  };

  const textSizes = {
    sm: { top: 'text-[7px] sm:text-[8px]', main: 'text-sm sm:text-base', bottom: 'text-[7px] sm:text-[8px]', city: 'text-[5px] sm:text-[6px]' },
    md: { top: 'text-[9px] sm:text-[10px]', main: 'text-lg sm:text-xl', bottom: 'text-[9px] sm:text-[10px]', city: 'text-[7px] sm:text-[8px]' },
    lg: { top: 'text-[10px] sm:text-[12px]', main: 'text-xl sm:text-2xl', bottom: 'text-[10px] sm:text-[12px]', city: 'text-[8px] sm:text-[9px]' },
  };

  const t = textSizes[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 180, damping: 14 }}
      className={`${sizes[size]} ${className}`}
    >
      <div
        className="w-full h-full rounded-full border-rosso/70 flex items-center justify-center relative bg-white/80 backdrop-blur-sm shadow-lg"
        style={{ borderStyle: 'double', borderWidth: '4px', borderColor: 'rgba(192,57,43,0.65)' }}
      >
        <div className="absolute inset-1.5 rounded-full border border-rosso/30" />
        <div className="text-center px-2">
          <div className={`font-display text-rosso font-bold uppercase tracking-widest leading-tight ${t.top}`}>Autentica</div>
          <div className={`font-display text-rosso/90 font-bold italic leading-none mt-0.5 ${t.main}`}>Cucina</div>
          <div className={`font-display text-rosso font-bold uppercase tracking-widest leading-tight mt-0.5 ${t.bottom}`}>Italiana</div>
          <div className="w-6 sm:w-8 h-px bg-rosso/40 mx-auto mt-1 mb-0.5" />
          <div className={`text-rosso/50 font-semibold tracking-wider uppercase ${t.city}`}>Garantovaná kvalita</div>
        </div>
      </div>
    </motion.div>
  );
}