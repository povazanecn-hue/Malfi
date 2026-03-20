import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CATEGORIES = [
{ name: 'Pinsa', slug: 'pinsa', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80' },
{ name: 'Pizza', slug: 'pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80' },
{ name: 'Pasta', slug: 'pasta', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80' },
{ name: 'Risotto', slug: 'risotto', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80' },
{ name: 'Dezerty', slug: 'dezerty', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80' },
{ name: 'Nápoje', slug: 'napoje', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80' }];


export default function CategoryTiles() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container-malfi">
        <div className="text-center mb-6 md:mb-12">
          <div className="label-caps text-olive mb-2">Naše špeciality</div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-text-dark">Prezrite si naše menu</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.map((cat, idx) =>
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}>
            
              <Link
              to={`/Menu`}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden block group">
              
                <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end p-3 sm:p-4 md:p-5">
                   <h3 className="font-display text-white text-lg sm:text-xl md:text-2xl font-bold">{cat.name}</h3>
                 </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}