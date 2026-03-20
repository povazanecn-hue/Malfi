import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, ArrowUpRight } from 'lucide-react';

const WOLT_URL = 'https://wolt.com';
const BOLT_URL = 'https://bolt.food';

// Wolt SVG logo
const WoltIcon = () => (
  <svg viewBox="0 0 60 60" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="#009DE0"/>
    <path d="M18 20l5 14 5-14 5 14 5-14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Bolt SVG logo
const BoltIcon = () => (
  <svg viewBox="0 0 60 60" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="30" fill="#34D186"/>
    <path d="M35 14L22 32h10l-7 14 21-22H34L35 14z" fill="white"/>
  </svg>
);

export default function OrderingCTA() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container-malfi">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="label-caps text-olive mb-3">Online objednávanie</div>
          <h2 className="font-display text-4xl md:text-5xl text-text-dark">Ako chcete objednať?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Osobný odber — featured */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="relative bg-olive rounded-3xl p-8 overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: `radial-gradient(circle at 80% 20%, white 0%, transparent 60%)` }} />
            <div className="absolute top-5 right-5">
              <span className="label-caps text-[9px] bg-white/20 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                Populárne
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-7">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display text-2xl text-white mb-2">Osobný odber</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Objednajte online a vyzdvihnite si osobne. Bez čakania, hotové presne načas.
            </p>
            <div className="flex items-center justify-between">
              <span className="label-caps text-white/60 text-[10px]">Zadarmo</span>
              <Link to="/Order?type=pickup"
                className="flex items-center gap-1.5 bg-white text-olive font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-cream transition-all duration-200 hover:scale-105">
                Objednať <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Wolt */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-olive/10 rounded-3xl p-8 hover:shadow-lg hover:shadow-olive/6 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#009de0]/8 flex items-center justify-center mb-7">
              <WoltIcon />
            </div>
            <h3 className="font-display text-2xl text-text-dark mb-2">Rozvoz cez Wolt</h3>
            <p className="text-text-light text-sm leading-relaxed mb-8">
              Objednajte si doručenie priamo cez platformu Wolt. Rýchle a spoľahlivé doručenie.
            </p>
            <div className="flex items-center justify-between">
              <span className="label-caps text-text-light text-[10px]">Doručenie</span>
              <a href={WOLT_URL} target="_blank" rel="noreferrer"
               className="flex items-center gap-1.5 border border-olive/25 text-text-dark font-semibold text-sm px-5 py-2.5 rounded-full hover:border-olive hover:text-olive transition-all duration-200">
               Objednať cez WOLT <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Bolt */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-olive/10 rounded-3xl p-8 hover:shadow-lg hover:shadow-olive/6 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#34d186]/8 flex items-center justify-center mb-7">
              <BoltIcon />
            </div>
            <h3 className="font-display text-2xl text-text-dark mb-2">Rozvoz cez Bolt</h3>
            <p className="text-text-light text-sm leading-relaxed mb-8">
              Dostupné aj cez Bolt Food. Objednajte si jedlo z pohodlia domova.
            </p>
            <div className="flex items-center justify-between">
              <span className="label-caps text-text-light text-[10px]">Doručenie</span>
              <a href={BOLT_URL} target="_blank" rel="noreferrer"
               className="flex items-center gap-1.5 border border-olive/25 text-text-dark font-semibold text-sm px-5 py-2.5 rounded-full hover:border-olive hover:text-olive transition-all duration-200">
               Objednať cez BOLT <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}