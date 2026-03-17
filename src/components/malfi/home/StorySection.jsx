import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function StorySection() {
  return (
    <section className="section-pad">
      <div className="container-malfi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="label-caps text-gold">Náš príbeh</div>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Príbeh <span className="italic text-gold">MALFI</span>
            </h2>
            <div className="w-12 h-0.5 bg-gold" />
            <p className="text-text-muted text-base leading-relaxed">
              MALFI vzniklo zo sna — preniesť ducha talianskeho bistra priamo do srdca Bratislavy. 
              Každý recept, každá surovina, každý detail v interiéri odráža našu vášeň pre autentickú 
              taliansku gastronómiu.
            </p>
            <p className="text-text-muted text-base leading-relaxed">
              Naše pinsy pečieme v špeciálnych peciach na dlhom kvasení — tak vzniká tá charakteristická 
              krehkosť a chuť. Cestoviny si robíme každý deň čerstvé. Suroviny vyberáme od lokálnych 
              farmárov a overených talianskych dodávateľov.
            </p>
            <Link to="/MalfiAbout" className="btn-outline-gold px-7 py-3 inline-block mt-2">
              Zistiť viac
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="MALFI Interior"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl border border-[rgba(194,149,107,0.3)] bg-bg-secondary flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-3xl text-gold font-bold">5+</div>
                <div className="label-caps text-text-muted text-[10px] mt-1">rokov v BA</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}