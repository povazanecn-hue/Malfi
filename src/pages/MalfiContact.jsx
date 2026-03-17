import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { base44 } from '@/api/base44Client';

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
      to: 'info@malfi.sk',
      subject: `Kontakt: ${form.subject} — od ${form.name}`,
      body: `Od: ${form.name} (${form.email})\n\n${form.message}`,
    });
    setSent(true);
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-20 pb-24">
      {/* Hero */}
      <section className="py-20 container-malfi text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="label-caps text-gold mb-4">Kontakt</div>
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
                { icon: Mail, label: 'Email', value: 'info@malfi.sk', href: 'mailto:info@malfi.sk' },
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

        {/* Map */}
        <div className="rounded-3xl overflow-hidden border border-[rgba(194,149,107,0.15)] h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.0!2d17.1057!3d48.1441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89530cb0b1f7%3A0x1b1b1b1b1b1b1b1b!2sHurbanovo+n%C3%A1mestie+1%2C+Bratislava!5e0!3m2!1ssk!2ssk!4v1000000000000"
            width="100%" height="100%"
            style={{ border: 0, filter: 'grayscale(50%) invert(90%) contrast(80%)' }}
            allowFullScreen loading="lazy" title="MALFI mapa"
          />
        </div>
      </div>
    </div>
  );
}