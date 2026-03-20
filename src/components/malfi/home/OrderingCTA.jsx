import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, ExternalLink } from 'lucide-react';

const WOLT_URL = 'https://wolt.com';
const BOLT_URL = 'https://bolt.food';

export default function OrderingCTA() {
  return (
    <section className="section-pad">
      <div className="container-malfi">
        <div className="text-center mb-12">
          <div className="label-caps text-olive mb-3">Online objednávanie</div>
          <h2 className="font-display text-4xl text-text-dark">Ako chcete objednať?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Osobný odber */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="c-card relative border-olive/30 ring-1 ring-olive/15 p-8"
          >
            <div className="absolute top-4 right-4 label-caps text-[10px] bg-olive text-white px-2.5 py-1 rounded-full">
              Populárne
            </div>
            <div className="w-12 h-12 rounded-2xl bg-olive/10 flex items-center justify-center mb-6">
              <ShoppingBag className="w-5 h-5 text-olive" />
            </div>
            <h3 className="font-display text-xl text-text-dark mb-2">Osobný odber</h3>
            <p className="text-text-light text-sm leading-relaxed mb-6">Objednajte online a vyzdvihnite si osobne. Bez čakania, hotové presne načas.</p>
            <div className="flex items-center justify-between">
              <span className="label-caps text-olive text-[10px]">Zadarmo</span>
              <Link to="/Order?type=pickup" className="btn-primary px-5 py-2 text-xs">Objednať</Link>
            </div>
          </motion.div>

          {/* Wolt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="c-card p-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#009de0]/10 flex items-center justify-center mb-6">
              <span className="font-bold text-[#009de0] text-sm">W</span>
            </div>
            <h3 className="font-display text-xl text-text-dark mb-2">Rozvoz cez Wolt</h3>
            <p className="text-text-light text-sm leading-relaxed mb-6">Objednajte si doručenie priamo cez platformu Wolt. Rýchle a spoľahlivé doručenie.</p>
            <div className="flex items-center justify-between">
              <span className="label-caps text-text-light text-[10px]">Doručenie</span>
              <a href={WOLT_URL} target="_blank" rel="noreferrer" className="btn-outline px-5 py-2 text-xs flex items-center gap-1">
                Otvoriť <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Bolt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="c-card p-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#34d186]/10 flex items-center justify-center mb-6">
              <span className="font-bold text-[#34d186] text-sm">B</span>
            </div>
            <h3 className="font-display text-xl text-text-dark mb-2">Rozvoz cez Bolt</h3>
            <p className="text-text-light text-sm leading-relaxed mb-6">Dostupné aj cez Bolt Food. Objednajte si jedlo z pohodlia domova.</p>
            <div className="flex items-center justify-between">
              <span className="label-caps text-text-light text-[10px]">Doručenie</span>
              <a href={BOLT_URL} target="_blank" rel="noreferrer" className="btn-outline px-5 py-2 text-xs flex items-center gap-1">
                Otvoriť <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}