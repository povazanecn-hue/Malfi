import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Leaf } from 'lucide-react';
import AuthenticityStamp from '@/components/malfi/decorative/AuthenticityStamp';

const HERO_IMG = 'https://media.base44.com/images/public/69b9c086f46636a7bdaa61f8/e1c974915_generated_image.png';

export default function HeroSection() {
  return (
    <section className="min-h-[100svh] flex items-center relative overflow-hidden">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Overlay — stronger on mobile for readability, softer on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/85 to-cream/50 md:from-cream/90 md:via-cream/70 md:to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </div>

      {/* Authenticity stamp — positioned absolutely on the right */}
      <div className="absolute top-28 right-4 sm:top-32 sm:right-8 md:top-40 md:right-12 lg:right-20 z-20">
        <AuthenticityStamp size="lg" />
      </div>

      <div className="container-malfi relative z-10 w-full">
        <div className="py-6 md:py-20 lg:py-24 pt-24 md:pt-36 lg:pt-40 max-w-xl lg:max-w-2xl">

          {/* Content */}
          <div className="space-y-7 sm:space-y-8">
            <Link
              to="/Contact"
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-olive/20 rounded-full px-4 py-2 hover:bg-white/90 hover:border-olive/35 transition-all duration-300"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-olive" />
                <span className="label-caps text-olive text-[10px]">Hurbanovo námestie 1 · Bratislava</span>
              </motion.div>
            </Link>

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
              className="text-text-medium text-sm sm:text-base md:text-lg leading-relaxed max-w-md"
            >
              Autentické talianske recepty, lokálne suroviny a vášeň pre každý tanier.
              Vitajte v MALFI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/Reservation" className="btn-primary px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-sm sm:text-base text-center min-h-[48px] flex items-center justify-center">
                Rezervovať stôl
              </Link>
              <Link to="/Order" className="btn-outline px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-sm sm:text-base text-center min-h-[48px] flex items-center justify-center bg-white/60 backdrop-blur-sm">
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
              <div className="flex items-center gap-2 text-text-medium text-sm">
                <Clock className="w-4 h-4 text-olive" />
                <span>Po–Pi 11:00–22:00</span>
              </div>
              <div className="flex items-center gap-2 text-text-medium text-sm">
                <Leaf className="w-4 h-4 text-olive" />
                <span>Čerstvé suroviny denne</span>
              </div>
            </motion.div>

            {/* Floating badges — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden md:flex items-center gap-4 pt-4"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-olive/10 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <div>
                  <div className="text-text-dark font-bold text-lg font-display leading-none">4.8</div>
                  <div className="text-text-light text-[10px]">z 340 hodnotení</div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-olive/10">
                <div className="label-caps text-rosso text-[9px] mb-0.5">Bestseller</div>
                <div className="text-text-dark font-semibold text-sm font-display">Pinsa Classica · <span className="text-olive">€12.90</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}