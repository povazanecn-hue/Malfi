import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const HOURS = [
  { day: 'Pondelok – Štvrtok', time: '11:00 – 22:00' },
  { day: 'Piatok', time: '11:00 – 23:00' },
  { day: 'Sobota', time: '12:00 – 23:00' },
  { day: 'Nedeľa', time: '12:00 – 21:00' },
];

export default function LocationHours() {
  return (
    <section className="section-pad bg-cream-dark">
      <div className="container-malfi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden h-80 lg:h-full min-h-[320px] border border-olive/10 relative shadow-sm"
          >
            {/* Map embed placeholder */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.0!2d17.1057!3d48.1441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89530cb0b1f7%3A0x1b1b1b1b1b1b1b1b!2sHurbanovo+n%C3%A1mestie+1%2C+Bratislava!5e0!3m2!1ssk!2ssk!4v1000000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(20%) contrast(95%)' }}
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
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="label-caps text-olive mb-3">Kde nás nájdete</div>
              <h2 className="font-display text-3xl text-text-dark mb-6">Adresa & hodiny</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rosso mt-0.5 shrink-0" />
                <div>
                  <div className="text-text-dark font-semibold">Hurbanovo námestie 1</div>
                  <div className="text-text-light text-sm">811 03 Bratislava, Staré Mesto</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rosso shrink-0" />
                <a href="tel:+421900000000" className="text-text-dark hover:text-rosso transition-colors">+421 900 000 000</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rosso shrink-0" />
                <a href="mailto:info@malfi.sk" className="text-text-dark hover:text-rosso transition-colors">info@malfi.sk</a>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-olive" />
                <span className="label-caps text-olive">Otváracie hodiny</span>
              </div>
              <div className="space-y-2.5">
                {HOURS.map(h => (
                  <div key={h.day} className="flex items-center justify-between py-2 border-b border-olive/10 last:border-0">
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
              className="btn-outline px-6 py-3 inline-block text-sm"
            >
              Navigovať sem
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}