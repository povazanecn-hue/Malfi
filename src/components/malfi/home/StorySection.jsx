import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function StorySection() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-malfi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="MALFI Interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl bg-olive flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="font-display text-3xl text-white font-bold">5+</div>
                <div className="label-caps text-white/70 text-[9px] mt-1">rokov v BA</div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-rosso/50 text-xs">✦</span>
              <span className="label-caps text-rosso">Náš príbeh</span>
              <span className="text-rosso/50 text-xs">✦</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-text-dark leading-tight">
              Príbeh <span className="italic text-olive">MALFI</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-rosso/50" />
              <span className="text-rosso/40 text-[8px]">✦</span>
              <div className="w-4 h-px bg-rosso/25" />
            </div>
            <p className="text-text-medium text-base leading-relaxed">
              MALFI vzniklo zo sna — preniesť ducha talianskej reštaurácie priamo do srdca Bratislavy.
              Každý recept, každá surovina, každý detail v interiéri odráža našu vášeň pre autentickú
              taliansku gastronómiu.
            </p>
            <p className="text-text-medium text-base leading-relaxed">
              Naše pinsy pečieme v špeciálnych peciach na dlhom kvasení — tak vzniká tá charakteristická
              krehkosť a chuť. Cestoviny si robíme každý deň čerstvé. Suroviny vyberáme od lokálnych
              farmárov a overených talianskych dodávateľov.
            </p>
            <Link to="/MalfiAbout" className="btn-outline px-7 py-3 inline-flex mt-2">
              Zistiť viac
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}