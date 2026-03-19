export function OliveBranchDivider() {
  return (
    <div className="flex items-center justify-center py-8 px-8 gap-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-olive/30" />
      <div className="flex items-center gap-2 text-olive/40 select-none">
        <span className="text-sm">✦</span>
        <span className="text-lg">🫒</span>
        <span className="text-sm">✦</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-olive/30" />
    </div>
  );
}

export function WaveDivider() {
  return (
    <div className="overflow-hidden leading-none">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10 fill-cream-dark">
        <path d="M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z" />
      </svg>
    </div>
  );
}

export function WaveDividerReverse() {
  return (
    <div className="overflow-hidden leading-none">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10 fill-cream">
        <path d="M0,30 C300,0 900,60 1200,30 L1200,0 L0,0 Z" />
      </svg>
    </div>
  );
}

export function ItalianQuote({ text = "La dolce vita" }) {
  return (
    <div className="flex items-center justify-center py-12 px-8 gap-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-olive/25" />
        <span className="text-olive/30 text-xs">✦</span>
      </div>
      <p className="font-display text-3xl italic text-olive/55 tracking-wide">{text}</p>
      <div className="flex items-center gap-3">
        <span className="text-olive/30 text-xs">✦</span>
        <div className="w-8 h-px bg-olive/25" />
      </div>
    </div>
  );
}

export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-rosso/60 text-xs">✦</span>
      <span className="label-caps text-rosso">{children}</span>
      <span className="text-rosso/60 text-xs">✦</span>
    </div>
  );
}

export function ItalianCornerDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top-left olive branch */}
      <svg className="absolute top-6 left-6 w-20 h-20 text-olive/15" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20,80 Q30,60 35,40 Q38,20 40,10" strokeLinecap="round" />
        <circle cx="35" cy="30" r="2" fill="currentColor" />
        <circle cx="38" cy="50" r="2" fill="currentColor" />
        <circle cx="40" cy="70" r="2" fill="currentColor" />
        <path d="M35,30 L28,25 M35,30 L42,28" strokeLinecap="round" />
        <path d="M38,50 L32,46 M38,50 L44,48" strokeLinecap="round" />
        <path d="M40,70 L34,66 M40,70 L46,68" strokeLinecap="round" />
      </svg>
      {/* Top-right olive branch */}
      <svg className="absolute top-6 right-6 w-20 h-20 text-olive/15" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" style={{transform:'scaleX(-1)'}}>
        <path d="M20,80 Q30,60 35,40 Q38,20 40,10" strokeLinecap="round" />
        <circle cx="35" cy="30" r="2" fill="currentColor" />
        <circle cx="38" cy="50" r="2" fill="currentColor" />
        <circle cx="40" cy="70" r="2" fill="currentColor" />
        <path d="M35,30 L28,25 M35,30 L42,28" strokeLinecap="round" />
        <path d="M38,50 L32,46 M38,50 L44,48" strokeLinecap="round" />
        <path d="M40,70 L34,66 M40,70 L46,68" strokeLinecap="round" />
      </svg>
    </div>
  );
}