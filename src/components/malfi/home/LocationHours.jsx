import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

const HOURS = [
  { day: 'Pondelok – Štvrtok', time: '11:00 – 22:00' },
  { day: 'Piatok', time: '11:00 – 23:00' },
  { day: 'Sobota', time: '12:00 – 23:00' },
  { day: 'Nedeľa', time: '12:00 – 21:00' },
];

export default function LocationHours() {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-28" style={{ background: 'var(--cream-dark)' }}>
      <div className="container-malfi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl md:rounded-3xl overflow-hidden h-64 sm:h-80 lg:h-full min-h-[280px] sm:min-h-[380px] border border-olive/10 shadow-sm relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.0!2d17.1057!3d48.1441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89530cb0b1f7%3A0x1b1b1b1b1b1b1b1b!2sHurbanovo+n%C3%A1mestie+1%2C+Bratislava!5e0!3m2!1ssk!2ssk!4v1000000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(15%) contrast(95%)' }}
              allowFullScreen
              loading="lazy"
              title="MALFI mapa"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="space-y-7"
          >
            <div>
              <div className="label-caps text-olive mb-2">Kde nás nájdete</div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-text-dark">Adresa & hodiny</h2>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              {[
                { icon: MapPin, label: 'Hurbanovo námestie 1', sub: '811 03 Bratislava, Staré Mesto', href: null },
                { icon: Phone, label: '+421 900 000 000', sub: null, href: 'tel:+421900000000' },
                { icon: Mail, label: 'malfi@malfi.sk', sub: null, href: 'mailto:malfi@malfi.sk' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-olive/8 hover:border-olive/20 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-rosso/8 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-rosso" />
                    </div>
                    <div>
                      {item.href ? (
                        <a href={item.href} className="text-text-dark font-medium text-sm hover:text-rosso transition-colors">{item.label}</a>
                      ) : (
                        <p className="text-text-dark font-medium text-sm">{item.label}</p>
                      )}
                      {item.sub && <p className="text-text-light text-xs mt-0.5">{item.sub}</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl border border-olive/8 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-olive/10 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-olive" />
                </div>
                <span className="label-caps text-olive text-[10px]">Otváracie hodiny</span>
              </div>
              <div className="space-y-2">
                {HOURS.map(h => (
                  <div key={h.day} className="flex items-center justify-between py-2 border-b border-olive/8 last:border-0">
                    <span className="text-text-light text-sm">{h.day}</span>
                    <span className="text-text-dark text-sm font-semibold">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 btn-olive px-6 py-3 text-sm min-h-[48px]"
            >
              <Navigation className="w-4 h-4" />
              Navigovať sem
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}