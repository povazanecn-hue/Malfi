import { motion } from 'framer-motion';

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', alt: 'Interiér' },
  { url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80', alt: 'Jedlo' },
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', alt: 'Atmosféra' },
  { url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', alt: 'Pinsa' },
  { url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80', alt: 'Risotto' },
  { url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', alt: 'Dezert' },
  { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', alt: 'Tanier' },
  { url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80', alt: 'Bar' },
];

export default function GallerySection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-cream-dark">
      <div className="container-malfi">
        <div className="text-center mb-8 md:mb-12">
          <div className="label-caps text-olive mb-2">Galéria</div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-text-dark">Atmosféra MALFI</h2>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {GALLERY.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="overflow-hidden rounded-lg sm:rounded-xl group cursor-pointer aspect-square"
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}