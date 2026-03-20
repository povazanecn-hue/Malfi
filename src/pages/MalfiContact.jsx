import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Navigation } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RESTAURANT_LAT = 48.1441;
const RESTAURANT_LNG = 17.1057;
const ADDRESS = 'Hurbanovo námestie 1, 811 03 Bratislava';

const HOURS = [
  { day: 'Pondelok', time: '11:00 – 22:00' },
  { day: 'Utorok', time: '11:00 – 22:00' },
  { day: 'Streda', time: '11:00 – 22:00' },
  { day: 'Štvrtok', time: '11:00 – 22:00' },
  { day: 'Piatok', time: '11:00 – 23:00' },
  { day: 'Sobota', time: '12:00 – 23:00' },
  { day: 'Nedeľa', time: '12:00 – 21:00' },
];

export default function MalfiContact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: 'malfi@malfi.sk',
      subject: `Kontakt: ${form.subject} — od ${form.name}`,
      body: `Od: ${form.name} (${form.email})\n\n${form.message}`,
    });
    setSent(true);
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24">
      {/* Hero */}
      <section className="pb-12 container-malfi text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-5xl text-text-primary font-bold">Spojte sa s nami</h1>
        </motion.div>
      </section>

      <div className="container-malfi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Info */}
          <div className="space-y-8">
            <div className="card-dark p-6 space-y-5">
              <h3 className="font-display text-xl text-text-primary">Kontaktné informácie</h3>
              {[
                { icon: MapPin, label: 'Adresa', value: 'Hurbanovo námestie 1\n811 03 Bratislava, Staré Mesto', href: 'https://maps.google.com' },
                { icon: Phone, label: 'Telefón', value: '+421 900 000 000', href: 'tel:+421900000000' },
                { icon: Mail, label: 'Email', value: 'malfi@malfi.sk', href: 'mailto:malfi@malfi.sk' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <div className="label-caps text-text-muted text-[10px] mb-0.5">{item.label}</div>
                      <a href={item.href} className="text-text-primary text-sm hover:text-gold transition-colors whitespace-pre-line">{item.value}</a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hours */}
            <div className="card-dark p-6">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-4 h-4 text-gold" />
                <h3 className="font-display text-xl text-text-primary">Otváracie hodiny</h3>
              </div>
              <div className="space-y-2">
                {HOURS.map(h => (
                  <div key={h.day} className="flex justify-between py-2 border-b border-[rgba(194,149,107,0.1)] last:border-0">
                    <span className="text-text-muted text-sm">{h.day}</span>
                    <span className="text-text-primary text-sm font-semibold">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="flex-1 card-dark p-4 flex items-center gap-3 hover:border-gold/40 transition-all group">
                <Instagram className="w-5 h-5 text-gold" />
                <span className="text-text-muted text-sm group-hover:text-gold transition-colors">@malfi_bratislava</span>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="card-dark p-8">
            <h3 className="font-display text-xl text-text-primary mb-6">Napíšte nám</h3>
            {sent ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">✉️</div>
                <div className="font-display text-xl text-text-primary mb-2">Správa odoslaná!</div>
                <p className="text-text-muted text-sm">Odpovieme vám do 24 hodín.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name', label: 'Meno', type: 'text', required: true },
                  { key: 'email', label: 'Email', type: 'email', required: true },
                  { key: 'subject', label: 'Predmet', type: 'text', required: true },
                ].map(field => (
                  <div key={field.key}>
                    <label className="label-caps text-text-muted text-[10px] mb-1.5 block">{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={e => update(field.key, e.target.value)}
                      required={field.required}
                      className="w-full bg-bg-tertiary border border-[rgba(194,149,107,0.2)] rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                ))}
                <div>
                  <label className="label-caps text-text-muted text-[10px] mb-1.5 block">Správa</label>
                  <textarea
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    required
                    rows={5}
                    className="w-full bg-bg-tertiary border border-[rgba(194,149,107,0.2)] rounded-xl px-4 py-3 text-text-primary text-sm resize-none focus:outline-none focus:border-gold"
                  />
                </div>
                <button type="submit" disabled={sending} className="btn-gold w-full py-4 font-semibold disabled:opacity-60">
                  {sending ? 'Odosielam...' : 'Odoslať správu'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="label-caps text-olive mb-1">Kde nás nájdete</div>
              <p className="text-text-medium text-sm">{ADDRESS}</p>
            </div>
            <div className="flex gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT_LAT},${RESTAURANT_LNG}`}
                target="_blank"
                rel="noreferrer"
                className="btn-olive px-4 py-2.5 text-sm flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Google Maps
              </a>
              <a
                href={`https://waze.com/ul?ll=${RESTAURANT_LAT},${RESTAURANT_LNG}&navigate=yes`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline px-4 py-2.5 text-sm flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Waze
              </a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-olive/15 h-96 shadow-sm">
            <MapContainer
              center={[RESTAURANT_LAT, RESTAURANT_LNG]}
              zoom={16}
              style={{ width: '100%', height: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[RESTAURANT_LAT, RESTAURANT_LNG]}>
                <Popup>
                  <div className="text-center">
                    <strong>MALFI Italian Bistro</strong><br />
                    {ADDRESS}
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}