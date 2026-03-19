export function OliveBranchDivider() {
  return (
    <div className="flex items-center justify-center py-6 px-8 gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-olive/25" />
      <span className="text-olive/50 text-xl select-none">🫒</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-olive/25" />
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
    <div className="flex items-center justify-center py-10 px-8 gap-5">
      <div className="flex-1 h-px bg-olive/15" />
      <p className="font-display text-2xl italic text-olive/60 tracking-wide">{text}</p>
      <div className="flex-1 h-px bg-olive/15" />
    </div>
  );
}