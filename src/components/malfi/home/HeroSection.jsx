import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Leaf } from 'lucide-react';
import { ItalianCornerDecor } from '@/components/malfi/decorative/ItalianDividers';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-cream">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `radial-gradient(ellipse at 80% 20%, rgba(107,124,94,0.1) 0%, transparent 50%),
                            radial-gradient(ellipse at 20% 80%, rgba(192,57,43,0.06) 0%, transparent 50%)`
        }} />
      </div>
      <ItalianCornerDecor />

      <div className="container-malfi relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-12 md:py-20 lg:py-24 pt-20 md:pt-28 lg:pt-32">

          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-olive/10 border border-olive/20 rounded-full px-4 py-2"
            >
              <MapPin className="w-3.5 h-3.5 text-olive" />
              <span className="label-caps text-olive text-[10px]">Hurbanovo námestie 1 · Bratislava</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-dark leading-[1.05]">
                Il cuore<br />
                <span className="text-rosso italic">italiano</span><br />
                <span className="text-olive-dark">di Bratislava</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-medium text-base sm:text-lg leading-relaxed max-w-md"
            >
              Autentické talianske recepty, lokálne suroviny a vášeň pre každý tanier.
              Vitajte v MALFI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/Reservation" className="btn-primary px-8 py-4 font-semibold text-base">
                Rezervovať stôl
              </Link>
              <Link to="/Order" className="btn-outline px-8 py-4 font-semibold text-base">
                Objednať online
              </Link>
            </motion.div>

            {/* Info row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-5 pt-2"
            >
              <div className="flex items-center gap-2 text-text-light text-sm">
                <Clock className="w-4 h-4 text-olive" />
                <span>Po–Pi 11:00–22:00</span>
              </div>
              <div className="flex items-center gap-2 text-text-light text-sm">
                <Leaf className="w-4 h-4 text-olive" />
                <span>Čerstvé suroviny denne</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Image composition */}
          <motion.div
           initial={{ opacity: 0, x: 40 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative hidden lg:block"
          >
            {/* Main hero image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://media.base44.com/images/public/69b9c086f46636a7bdaa61f8/e1c974915_generated_image.png"
                alt="MALFI Talianska Reštaurácia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-[rgba(107,124,94,0.15)]"
            >
              <div className="flex items-center gap-1.5 mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <div className="text-text-dark font-bold text-2xl font-display">4.8</div>
              <div className="text-text-light text-xs">z 340 hodnotení</div>
            </motion.div>

            {/* Bestseller badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-[rgba(107,124,94,0.15)] max-w-[160px]"
            >
              <div className="label-caps text-rosso text-[9px] mb-1">Bestseller</div>
              <div className="text-text-dark font-semibold text-sm font-display">Pinsa Classica</div>
              <div className="text-olive font-bold text-sm mt-1">€12.90</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}