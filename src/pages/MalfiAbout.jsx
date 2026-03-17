import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Award, Heart } from 'lucide-react';

const VALUES = [
  { icon: Leaf, title: 'Lokálne suroviny', desc: 'Spolupracujeme s lokálnymi farmármi a overenými talianskymi dodávateľmi. Každá surovina má príbeh.' },
  { icon: Award, title: 'Kulinárska excelencia', desc: 'Naše receptúry vznikali roky. Každé jedlo je výsledkom vášne a remeselnej zručnosti.' },
  { icon: Heart, title: 'Vrelá pohostinnosť', desc: 'U nás sa každý hosť cíti ako doma. Srdečnosť a starostlivosť sú základom nášho prístupu.' },
];

export default function MalfiAbout() {
  return (
    <div className="min-h-screen bg-bg-primary pt-20 pb-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" alt="O nás" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
        </div>
        <div className="relative z-10 container-malfi text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="label-caps text-gold mb-4">Náš príbeh</div>
            <h1 className="font-display text-5xl md:text-6xl text-text-primary font-bold mb-4">O nás</h1>
            <p className="text-text-muted max-w-xl mx-auto">Moderné talianske bistro v srdci Bratislavy</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="container-malfi">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
              <div className="label-caps text-gold">Kde to všetko začalo</div>
              <h2 className="font-display text-4xl text-text-primary leading-tight">Príbeh <span className="italic text-gold">MALFI</span></h2>
              <div className="w-12 h-0.5 bg-gold" />
              <p className="text-text-muted leading-relaxed">
                MALFI vzniklo z lásky k talianskej gastronómii a snu o mieste, kde sa moderná estetika stretáva s autentickými chuťami. Naši zakladatelia strávili roky v talianskych kuchyniach — od Ríma po Neapol, od Milána po Sicíliu.
              </p>
              <p className="text-text-muted leading-relaxed">
                Výsledkom je bistro, kde každý tanier odráža túto cestu. Pinsy pečieme na dlhom kvasení, cestoviny robíme denne čerstvé, omáčky varíme pomaly, s trpezlivosťou a láskou.
              </p>
              <p className="text-text-muted leading-relaxed">
                Hurbanovo námestie v Bratislave nám dalo domov — a my chceme, aby sa každý hosť cítil ako doma.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="Interiér" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-3xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80" alt="Jedlo" className="w-full h-full object-cover" />
                  </div>
                  <div className="card-dark p-4 text-center">
                    <div className="font-display text-3xl text-gold font-bold">5+</div>
                    <div className="label-caps text-text-muted text-[10px] mt-1">rokov v Bratislave</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-bg-secondary">
        <div className="container-malfi">
          <div className="text-center mb-12">
            <div className="label-caps text-gold mb-3">Naše hodnoty</div>
            <h2 className="font-display text-4xl text-text-primary">Čo nás definuje</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-dark p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-bg-tertiary border border-[rgba(194,149,107,0.2)] flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-xl text-text-primary mb-3">{val.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad">
        <div className="container-malfi">
          <div className="text-center mb-10">
            <div className="label-caps text-gold mb-3">Interiér</div>
            <h2 className="font-display text-4xl text-text-primary">Atmosféra MALFI</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
              'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80',
            ].map((url, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="aspect-square rounded-2xl overflow-hidden group"
              >
                <img src={url} alt="Interiér" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-bg-secondary">
        <div className="container-malfi text-center">
          <h2 className="font-display text-4xl text-text-primary mb-4">Príďte nás navštíviť</h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">Zarezervujte si stôl a zažite autentickú taliansku atmosféru v srdci Bratislavy.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/MalfiReservation" className="btn-gold px-8 py-4">Rezervovať stôl</Link>
            <Link to="/MalfiContact" className="btn-outline-gold px-8 py-4">Kontakt</Link>
          </div>
        </div>
      </section>
    </div>
  );
}