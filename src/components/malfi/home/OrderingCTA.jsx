import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, ShoppingBag, Calendar } from 'lucide-react';

const MODES = [
  {
    icon: Truck,
    title: 'Rozvoz',
    description: 'Doručíme až k vašim dverám. Minimálna objednávka €15, rozvoz do 30 min.',
    badge: 'od €1.99',
    type: 'delivery',
  },
  {
    icon: ShoppingBag,
    title: 'Osobný odber',
    description: 'Objednajte online a vyzdvihnite si osobne. Bez čakania, hotové presne načas.',
    badge: 'Zadarmo',
    type: 'pickup',
    featured: true,
  },
  {
    icon: Calendar,
    title: 'Predobjednávka',
    description: 'Naplánujte objednávku vopred. Ideálne pre firemné obedy a skupiny.',
    badge: 'Naplánuj',
    type: 'prebook',
  },
];

export default function OrderingCTA() {
  return (
    <section className="section-pad">
      <div className="container-malfi">
        <div className="text-center mb-12">
          <div className="label-caps text-gold mb-3">Online objednávanie</div>
          <h2 className="font-display text-4xl text-text-primary">Ako chcete objednať?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MODES.map((mode, idx) => {
            const Icon = mode.icon;
            return (
              <motion.div
                key={mode.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`card-dark p-8 relative ${mode.featured ? 'border-gold/40 ring-1 ring-gold/20' : ''}`}
              >
                {mode.featured && (
                  <div className="absolute top-4 right-4 label-caps text-[10px] bg-gold text-bg-primary px-2.5 py-1 rounded-full">
                    Populárne
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl bg-bg-tertiary border border-[rgba(194,149,107,0.2)] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-xl text-text-primary mb-2">{mode.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">{mode.description}</p>
                <div className="flex items-center justify-between">
                  <span className="label-caps text-gold">{mode.badge}</span>
                  <Link
                    to={`/MalfiOrder?type=${mode.type}`}
                    className="btn-gold px-5 py-2 text-xs"
                  >
                    Vybrať
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}