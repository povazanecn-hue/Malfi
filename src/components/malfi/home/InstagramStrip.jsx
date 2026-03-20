import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const IG_POSTS = [
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80',
  'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80',
  'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
  'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
];

export default function InstagramStrip() {
  return (
    <section className="section-pad">
      <div className="container-malfi">
        <div className="text-center mb-8 md:mb-10">
          <div className="label-caps text-gold mb-2 md:mb-3">Sociálne siete</div>
          <h2 className="font-display text-2xl md:text-3xl text-text-primary mb-2">@malfi_bratislava</h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-gold transition-colors"
          >
            <Instagram className="w-4 h-4" />
            Sledujte nás na Instagrame
          </a>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {IG_POSTS.map((url, idx) => (
            <motion.a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl overflow-hidden group relative"
            >
              <img src={url} alt="Instagram post" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}