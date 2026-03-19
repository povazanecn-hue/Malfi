import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Users, Calendar, Clock, Home, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const TIME_SLOTS = ['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30',
  '18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];
const OCCASIONS = [
  { id: 'none', label: 'Žiadna' },
  { id: 'birthday', label: '🎂 Narodeniny' },
  { id: 'anniversary', label: '💍 Výročie' },
  { id: 'business', label: '💼 Biznis' },
  { id: 'date', label: '❤️ Rande' },
  { id: 'other', label: 'Iné' },
];

export default function MalfiReservation() {
  const urlParams = new URLSearchParams(window.location.search);
  const [form, setForm] = useState({
    guests: parseInt(urlParams.get('guests')) || 2,
    date: urlParams.get('date') || '',
    time: '',
    seating: 'indoor',
    occasion: 'none',
    name: '', email: '', phone: '', requests: '',
  });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(null);

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.Reservation.create(data),
    onSuccess: (res) => setSubmitted(res),
  });

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAutoApprove = form.guests <= 5;
    mutation.mutate({
      reservation_number: `RES-${Date.now().toString(36).toUpperCase()}`,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      party_size: form.guests,
      date: form.date,
      time: form.time,
      duration_minutes: 90,
      status: isAutoApprove ? 'confirmed' : 'pending',
      special_requests: form.requests,
      occasion: form.occasion,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container-malfi max-w-md text-center py-16"
        >
          <div className="w-20 h-20 rounded-full bg-olive/20 border border-olive/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-olive" />
          </div>
          <div className="label-caps text-olive mb-3">Ďakujeme!</div>
          <h1 className="font-display text-4xl text-text-dark mb-4">
            {submitted.status === 'confirmed' ? 'Rezervácia potvrdená' : 'Rezervácia prijatá'}
          </h1>
          <div className="card-dark p-6 text-left mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Meno</span>
              <span className="text-text-primary">{submitted.customer_name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Dátum</span>
              <span className="text-text-primary">{submitted.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Čas</span>
              <span className="text-text-primary">{submitted.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Počet hostí</span>
              <span className="text-text-primary">{submitted.party_size}</span>
            </div>
          </div>
          {submitted.status === 'pending' && (
            <p className="text-text-muted text-sm mb-6">Pre väčšie skupiny potvrdíme rezerváciu do 24 hodín.</p>
          )}
          <a href="/MalfiHome" className="btn-primary px-8 py-3 inline-block">Späť na domov</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-24">
      <div className="container-malfi max-w-2xl py-10">
        <div className="label-caps text-olive mb-2">Rezervácia stola</div>
        <h1 className="font-display text-4xl text-text-dark mb-8">Zarezervujte si stôl</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guests */}
          <div className="card-dark p-6">
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-4 h-4 text-gold" />
              <h3 className="font-display text-lg text-text-primary">Počet hostí</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => update('guests', n)}
                  className={`w-11 h-11 rounded-xl text-sm font-semibold transition-all ${
                    form.guests === n ? 'bg-olive text-white' : 'border border-olive/25 text-text-medium bg-white hover:border-olive hover:text-olive'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="card-dark p-6">
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-4 h-4 text-gold" />
              <h3 className="font-display text-lg text-text-primary">Dátum a čas</h3>
            </div>
            <div className="mb-5">
              <label className="label-caps text-text-muted text-[10px] mb-1.5 block">Dátum</label>
              <input
                type="date"
                value={form.date}
                onChange={e => update('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full bg-white border border-olive/20 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-olive placeholder:text-text-light"
              />
            </div>
            <div>
              <label className="label-caps text-text-muted text-[10px] mb-2 block">Čas</label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => update('time', slot)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                      form.time === slot ? 'bg-olive text-white' : 'border border-olive/25 text-text-medium bg-white hover:border-olive hover:text-olive'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Seating preference */}
          <div className="card-dark p-6">
            <div className="flex items-center gap-2 mb-5">
              <Home className="w-4 h-4 text-gold" />
              <h3 className="font-display text-lg text-text-primary">Sedenie</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'indoor', label: '🏠 Interiér' },
                { id: 'outdoor', label: '🌿 Terasa' },
                { id: 'no_preference', label: 'Bez preferencie' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => update('seating', opt.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    form.seating === opt.id ? 'bg-olive text-white' : 'border border-olive/25 text-text-medium bg-white hover:border-olive hover:text-olive'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div className="card-dark p-6">
            <h3 className="font-display text-lg text-text-primary mb-5">Príležitosť</h3>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map(occ => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => update('occasion', occ.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    form.occasion === occ.id ? 'bg-rosso text-white' : 'border border-olive/25 text-text-medium bg-white hover:border-rosso hover:text-rosso'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="card-dark p-6">
            <h3 className="font-display text-lg text-text-primary mb-5">Vaše údaje</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Meno a priezvisko', type: 'text', full: true, required: true },
                { key: 'email', label: 'Email', type: 'email', required: true },
                { key: 'phone', label: 'Telefón', type: 'tel', required: true },
              ].map(field => (
                <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
                  <label className="label-caps text-text-muted text-[10px] mb-1.5 block">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={e => update(field.key, e.target.value)}
                    required={field.required}
                    className="w-full bg-white border border-olive/20 rounded-xl px-4 py-3 text-text-dark text-sm placeholder:text-text-light focus:outline-none focus:border-olive"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="label-caps text-text-muted text-[10px] mb-1.5 block">Špeciálne požiadavky</label>
                <textarea
                  value={form.requests}
                  onChange={e => update('requests', e.target.value)}
                  rows={3}
                  placeholder="Alergie, špeciálne nastavenie stola, detská stolička..."
                  className="w-full bg-white border border-olive/20 rounded-xl px-4 py-3 text-text-dark text-sm placeholder:text-text-light resize-none focus:outline-none focus:border-olive"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!form.date || !form.time || !form.name || !form.email || mutation.isPending}
            className="btn-primary w-full py-4 font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? 'Spracovávam...' : 'Potvrdiť rezerváciu'}
          </button>

          {form.guests > 5 && (
            <p className="text-center text-text-muted text-xs">Pre skupiny nad 5 osôb potvrdíme rezerváciu do 24 hodín.</p>
          )}
        </form>
      </div>
    </div>
  );
}