import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="min-h-screen pt-20 flex items-center relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-bg-primary">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(ellipse at 70% 50%, rgba(194,149,107,0.15) 0%, transparent 60%)`
        }} />
      </div>

      <div className="container-malfi relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
          
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-[rgba(194,149,107,0.3)] rounded-full px-4 py-2"
            >
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span className="label-caps text-gold">Hurbanovo námestie 1 · Bratislava</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05]"
            >
              Moderné<br />
              <span className="text-gold italic">talianske</span><br />
              bistro
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted text-lg leading-relaxed max-w-md"
            >
              Autentické talianské recepty, lokálne suroviny a vášeň pre každý tanier. 
              Vitajte v MALFI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/MalfiReservation" className="btn-gold px-8 py-4 text-center font-semibold">
                Rezervovať stôl
              </Link>
              <Link to="/MalfiOrder" className="btn-outline-gold px-8 py-4 text-center font-semibold">
                Objednať online
              </Link>
            </motion.div>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <Clock className="w-4 h-4 text-gold" />
                <span>Po–Pi 11:00–22:00</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+421900000000" className="hover:text-gold transition-colors">+421 900 000 000</a>
              </div>
            </motion.div>
          </div>

          {/* Right: Image + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main hero image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                alt="MALFI Italian Bistro"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
            </div>

            {/* Floating review badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-bg-secondary border border-[rgba(194,149,107,0.3)] rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <div className="text-text-primary font-bold text-2xl font-display">4.8</div>
              <div className="text-text-muted text-xs">z 340 hodnotení</div>
            </motion.div>

            {/* Floating pinsa card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="absolute -top-4 -right-4 bg-bg-secondary border border-[rgba(194,149,107,0.3)] rounded-2xl p-4 shadow-2xl max-w-[160px]"
            >
              <div className="text-xs text-gold label-caps mb-1">Bestseller</div>
              <div className="text-text-primary font-semibold text-sm font-display">Pinsa Classica</div>
              <div className="text-gold text-sm font-bold mt-1">€12.90</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}