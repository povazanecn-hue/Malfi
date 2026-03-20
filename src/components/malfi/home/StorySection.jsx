import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Award, Heart } from 'lucide-react';

const PILLARS = [
  { icon: Leaf, label: 'Lokálne suroviny', desc: 'Od overených farmárov každý deň.' },
  { icon: Award, label: 'Autentické recepty', desc: 'Tradície prenesené priamo z Talianska.' },
  { icon: Heart, label: 'Vášeň pre chuť', desc: 'Každý tanier je malé umelecké dielo.' },
];

export default function StorySection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-28 bg-cream overflow-hidden">
      <div className="container-malfi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-olive/10">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="MALFI Interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            </div>
            {/* Authenticity stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-6 -right-4 w-32 h-32 sm:w-36 sm:h-36"
            >
              <div className="w-full h-full rounded-full border-[3px] border-rosso/70 flex items-center justify-center relative" style={{ borderStyle: 'double', borderWidth: '4px' }}>
                <div className="absolute inset-1 rounded-full border border-rosso/40" />
                <div className="text-center px-2">
                  <div className="font-display text-rosso font-bold text-[10px] sm:text-xs uppercase tracking-widest leading-tight">Autentica</div>
                  <div className="font-display text-rosso/90 font-bold text-lg sm:text-xl italic leading-none mt-0.5">Cucina</div>
                  <div className="font-display text-rosso font-bold text-[10px] sm:text-xs uppercase tracking-widest leading-tight mt-0.5">Italiana</div>
                  <div className="w-8 h-px bg-rosso/40 mx-auto mt-1.5 mb-1" />
                  <div className="text-rosso/60 text-[7px] sm:text-[8px] font-semibold tracking-wider uppercase">Bratislava</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-7 order-1 lg:order-2"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-rosso/40 text-xs">✦</span>
                <span className="label-caps text-rosso text-[10px]">Náš príbeh</span>
                <span className="text-rosso/40 text-xs">✦</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-text-dark leading-tight">
                Príbeh <span className="italic text-olive">MALFI</span>
              </h2>
            </div>

            <p className="text-text-medium text-base leading-relaxed">
              MALFI vzniklo zo sna — preniesť ducha talianskej reštaurácie priamo do srdca Bratislavy.
              Každý recept, každá surovina, každý detail v interiéri odráža našu vášeň pre autentickú
              taliansku gastronómiu.
            </p>
            <p className="text-text-medium text-base leading-relaxed">
              Naše pinsy pečieme v špeciálnych peciach na dlhom kvasení — tak vzniká tá charakteristická
              krehkosť a chuť. Cestoviny si robíme každý deň čerstvé.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-olive/8 hover:border-olive/20 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-olive/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-olive" />
                    </div>
                    <div>
                      <p className="text-text-dark font-semibold text-sm">{p.label}</p>
                      <p className="text-text-light text-xs">{p.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link to="/About" className="btn-outline px-7 py-3 inline-flex items-center gap-2 mt-2 min-h-[48px]">
              Zistiť viac
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}