import { motion } from 'framer-motion';
import { Smartphone, Download, Star, Zap } from 'lucide-react';

const APP_URL = 'https://malfi.base44.app';

// QR code using a free QR API
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(APP_URL)}&color=4A5840&bgcolor=FAF7F0&margin=12`;

const FEATURES = [
  { icon: Zap, text: 'Rýchla objednávka jedla' },
  { icon: Star, text: 'Rezervácia stola online' },
  { icon: Download, text: 'Funguje aj offline' },
];

export default function AppDownloadSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-olive-dark relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/4 pointer-events-none" />

      <div className="container-malfi relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
              <Smartphone className="w-3.5 h-3.5 text-white/70" />
              <span className="label-caps text-white/70 text-[10px]">Mobilná aplikácia</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Objednajte MALFI<br />
              <span className="italic text-rosso-light">priamo z telefónu</span>
            </h2>

            <p className="text-white/65 text-base leading-relaxed max-w-md">
              Stiahnite si našu appku — objednávajte jedlo, rezervujte stoly a sledujte stav objednávky odkiaľkoľvek. Žiadne čakanie, žiadna fronta.
            </p>

            <ul className="space-y-3">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-white/75 text-sm">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-rosso-light" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            {/* Install instructions */}
            <div className="bg-white/10 border border-white/15 rounded-2xl p-5 space-y-3">
              <p className="label-caps text-white/50 text-[10px]">Ako nainštalovať</p>
              <div className="space-y-2 text-white/70 text-sm">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-rosso/60 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span><strong className="text-white">iPhone:</strong> Otvor Safari → zdieľaj → "Pridať na plochu"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-rosso/60 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span><strong className="text-white">Android:</strong> Otvor Chrome → menu → "Nainštalovať aplikáciu"</span>
                </div>
              </div>
            </div>

            <a
              href={APP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-7 py-4 min-h-[48px]"
            >
              <Download className="w-4 h-4" />
              Otvoriť appku
            </a>
          </motion.div>

          {/* Right: QR + Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center gap-6"
          >
            {/* QR Card */}
            <div className="bg-cream rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl text-center max-w-xs w-full">
              <p className="label-caps text-olive mb-4 text-[10px]">Naskenuj QR kód</p>
              <div className="rounded-2xl overflow-hidden border border-olive/20 inline-block">
                <img
                  src={QR_URL}
                  alt="QR kód na stiahnutie MALFI appky"
                  className="w-48 h-48 block"
                />
              </div>
              <p className="text-text-medium text-xs mt-4 leading-relaxed">
                Namier kameru na kód<br />a appka sa otvorí okamžite
              </p>
              <div className="mt-4 flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-olive/40" />
                <div className="w-2 h-2 rounded-full bg-olive/40" />
                <div className="w-2 h-2 rounded-full bg-olive/40" />
                <span className="text-text-light text-[10px] ml-1 label-caps">malfi.base44.app</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { value: '4.8★', label: 'Hodnotenie' },
                { value: '500+', label: 'Zákazníkov' },
                { value: '100%', label: 'Zadarmo' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl text-white font-bold">{s.value}</div>
                  <div className="label-caps text-white/45 text-[9px] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}